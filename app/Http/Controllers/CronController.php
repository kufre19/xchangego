<?php

namespace App\Http\Controllers;

use App\Models\Binance\BinanceCurrencies;
use App\Models\BybitCurrencies;
use App\Models\CoinbaseCurrencies;
use App\Models\TradeLog;
use App\Models\User;
use Carbon\Carbon;
use App\Models\PracticeLog;
use App\Models\Transaction;
use App\Models\GeneralSetting;
use App\Models\Kucoin\KucoinCurrencies;
use App\Models\Pairs;
use App\Models\ScheduledOrders;
use App\Models\ThirdpartyOrders;
use App\Models\ThirdpartyProvider;
use App\Http\Controllers\Admin\UpdateController;
use App\Models\Bitget\BitgetCurrencies;
use Throwable;

class CronController extends Controller
{
    public $api;
    public $provider;
    public $gnl;

    public function __construct()
    {
        $thirdparty = getProvider();
        if ($thirdparty) {
            $exchange_class = "\\ccxt\\$thirdparty->title";
            $this->api = new $exchange_class(array(
                'apiKey' => $thirdparty->api,
                'secret' => $thirdparty->secret,
                'password' => $thirdparty->password,
            ));
            $this->provider = $thirdparty->title;
        } else {
            $this->provider = null;
        }
        $this->gnl = GeneralSetting::first();
    }

    public function view()
    {
        $page_title = 'Cron Jobs';
        return view('admin.setting.cron', compact('page_title'));
    }


    public function check_update()
    {
        $api = new UpdateController;
        $res = $api->get_latest_version();
        $gnl = getGen();
        $gnl->new_version = $res['latest_version'];
        $gnl->save();

        cronLastRun('check_update');
    }

    public function trade_results()
    {
        $tradeLogs = TradeLog::where('status', 0)->where('in_time', '<', Carbon::now())->get();

        foreach ($tradeLogs as $tradeLog) {
            $cryptoRate = getCoinRate($tradeLog->symbol);
            $wallet = getWallet($tradeLog->user_id, 'funding', $tradeLog->pair, 'funding');

            if ($tradeLog->result == 0) {
                $isRise = $tradeLog->hilow == 1;
                $isWinning = ($isRise && $tradeLog->price_was < $cryptoRate) || (!$isRise && $tradeLog->price_was > $cryptoRate);
                $isDraw = $tradeLog->price_was == $cryptoRate;

                if ($isWinning) {
                    $wallet->balance += $tradeLog->amount + $tradeLog->margin;
                    $tradeLogAmount = $tradeLog->amount + $tradeLog->margin;
                    $details = 'Trade ' . $tradeLog->symbol . ' WIN';
                    $tradeLog->result = 1;
                } elseif ($isDraw) {
                    $wallet->balance += $tradeLog->amount;
                    $tradeLogAmount = $tradeLog->amount;
                    $details = 'Trade ' . $tradeLog->symbol . ' Refund';
                    $tradeLog->result = 3;
                } else {
                    $tradeLog->result = 2;
                }

                if ($isWinning || $isDraw) {
                    $wallet->save();
                    $this->transactions($wallet, $tradeLogAmount, $details);
                }

                $tradeLog->status = 1;
                $tradeLog->save();
                $tradeLog->clearCache();
            }
        }

        cronLastRun('trade_results');
    }


    public function transactions($wallet, $tradeLogAmount, $details)
    {
        $transaction = new Transaction();
        $transaction->user_id = $wallet->user_id;
        $transaction->amount = $tradeLogAmount;
        $transaction->post_balance = $wallet->balance;
        $transaction->trx_type = "+";
        $transaction->details = $details;
        $transaction->trx = getTrx();
        $transaction->save();
        $transaction->clearCache();
    }

    public function practice_results()
    {
        $practiceLogs = PracticeLog::where('status', 0)->where('in_time', '<', Carbon::now())->get();

        foreach ($practiceLogs as $practiceLog) {
            $cryptoRate = getCoinRate($practiceLog->symbol);
            $user = User::find($practiceLog->user_id);

            if ($practiceLog->result == 0) {
                $isRise = $practiceLog->hilow == 1;
                $isWinning = ($isRise && $practiceLog->price_was < $cryptoRate) || (!$isRise && $practiceLog->price_was > $cryptoRate);
                $isDraw = $practiceLog->price_was == $cryptoRate;

                if ($isWinning) {
                    $user->practice_balance += $practiceLog->amount + (($practiceLog->amount / 100) * $this->gnl->profit);
                    $practiceLog->result = 1;
                } elseif ($isDraw) {
                    $user->practice_balance += $practiceLog->amount;
                    $practiceLog->result = 3;
                } else {
                    $practiceLog->result = 2;
                }

                $user->save();
                $practiceLog->status = 1;
                $practiceLog->save();
                $practiceLog->clearCache();
            }
        }
        cronLastRun('practice_results');
    }


    public function schedule_orders()
    {
        $logs = ScheduledOrders::where('status', 0)->get();

        foreach ($logs as $log) {
            $marketRate = getCoinRate($log->market);
            $pairRate = getCoinRate($log->pair);
            $currentRate = $marketRate / $pairRate;

            $shouldExecuteOrder = ($log->method == 1 && $currentRate > $log->price) ||
                ($log->method != 1 && $currentRate < $log->price);

            if (!$shouldExecuteOrder) {
                continue;
            }

            if ($log->account == 1) {
                $tradeLog = new PracticeLog();
            } else {
                $tradeLog = new TradeLog();
            }

            $tradeLog->user_id = $log->user_id;
            $tradeLog->symbol = $log->symbol;
            $tradeLog->pair = $log->pair;
            $tradeLog->amount = $log->amount;
            $tradeLog->margin = $log->margin;
            $tradeLog->duration = $log->duration;
            $tradeLog->in_time = $log->in_time;
            $tradeLog->hilow = $log->type;
            $tradeLog->price_was = $marketRate;
            $tradeLog->save();

            $scheduled = ScheduledOrders::where('id', $log->id)->first();
            $scheduled->status = '1';
            $scheduled->save();
        }

        cronLastRun('schedule_orders');
    }


    public function markets_to_table()
    {
        $marketsPath = public_path('data/markets/markets.json');

        if (!file_exists($marketsPath)) {
            mkdir(public_path('data/markets'));
            file_put_contents($marketsPath, "[]");
        }

        if ($this->provider !== null) {
            $markets = $this->api->fetch_markets();
            $datas = [];

            // Load existing markets
            $existingMarkets = json_decode(file_get_contents($marketsPath), true);

            if ($existingMarkets === null) {
                $existingMarkets = [];
            }

            foreach ($markets as $market) {
                if ($market['spot'] == false) continue;

                $quote = $market['quote'];
                $symbol = $market['symbol'];

                if (!isset($existingMarkets[$quote][$symbol]) || !isset($existingMarkets[$quote][$symbol]['active'])) {
                    $marketData = $market;
                    unset(
                        $marketData['type'],
                        $marketData['spot'],
                        $marketData['margin'],
                        $marketData['info'],
                        $marketData['settle'],
                        $marketData['baseId'],
                        $marketData['quoteId'],
                        $marketData['settleId'],
                        $marketData['swap'],
                        $marketData['future'],
                        $marketData['option'],
                        $marketData['contract'],
                        $marketData['linear'],
                        $marketData['inverse'],
                        $marketData['contractSize'],
                        $marketData['expiry'],
                        $marketData['expiryDatetime'],
                        $marketData['strike'],
                        $marketData['optionType']
                    );
                    $datas[$quote][$symbol] = $marketData;
                }
            }

            // Merge new markets with existing markets
            $datas = array_merge_recursive($existingMarkets, $datas);

            $newJsonString = json_encode($datas, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            file_put_contents($marketsPath, $newJsonString);
        }

        cronLastRun('markets_to_table');
    }


    public function pairs_to_table()
    {
        if ($this->provider !== null) {
            $pairs = Pairs::where('provider', $this->provider)->pluck('symbol');

            foreach ($pairs as $pair) {
                $currency = Pairs::where('provider', $this->provider)->where('symbol', $pair)->first();

                if ($currency !== null) {
                    $currency->symbol = $pair;

                    try {
                        $currency->status = 1;
                        $currency->save();
                    } catch (Throwable $e) {
                        $currency->status = 0;
                        $currency->save();
                    }
                }
            }
        }

        cronLastRun('pairs_to_table');
    }


    public function currencies()
    {
        if ($this->provider === null) {
            return;
        }

        $pairs =  Pairs::where('provider', $this->provider)->get();
        if ($this->provider == 'coinbasepro') {
            $currencies = CoinbaseCurrencies::get();
        } else if ($this->provider == 'binance' || $this->provider == 'binanceus') {
            $currencies = BinanceCurrencies::get();
        } else if ($this->provider == 'kucoin') {
            $currencies = KucoinCurrencies::get();
        } else if ($this->provider == 'bybit') {
            $currencies = BybitCurrencies::get();
        } else if ($this->provider == 'bitget') {
            $currencies = BitgetCurrencies::get();
        }

        foreach ($pairs as $pair) {
            foreach ($currencies as $currency) {
                if ($currency->symbol == $pair->symbol) {
                    $currency->status = $pair->status;
                    $currency->save();
                }
            }
        }

        cronLastRun('currencies');
    }


    public function currencies_to_table()
    {
        if ($this->provider === null) {
            return;
        }

        // Step 1: Get all currencies from the database.
        $currencyModel = $this->getCurrencyModel();
        $currencies = $currencyModel::all();

        // Step 2: Fetch all available markets from the provider API.
        $markets = $this->api->fetch_currencies();

        // Step 3: Loop through each currency in the database and check if its symbol is empty or null. If so, delete the currency.
        foreach ($currencies as $currency) {
            if (empty($currency->symbol)) {
                $currency->delete();
            }
        }

        // Step 4: Loop through each market returned by the API and check if a currency with the same symbol already exists in the database. If it does, update the currency data. If it doesn't, create a new currency.
        foreach ($markets as $market) {
            $currency = $currencyModel::where('symbol', $market['code'])->first() ?? new $currencyModel;
            $currency = $this->updateCurrencyData($currency, $market);
            $currency->save();
        }

        // Step 5: Loop through all remaining currencies in the database and delete any that were not found in the API market data.
        $currencies = $currencyModel::all();
        foreach ($currencies as $currency) {
            if (!in_array($currency->symbol, array_column($markets, 'code'))) {
                $currency->delete();
            }
        }

        cronLastRun('currencies_to_table');
    }


    private function getCurrencyModel()
    {
        $models = [
            'coinbasepro' => CoinbaseCurrencies::class,
            'bybit' => BybitCurrencies::class,
            'binance' => BinanceCurrencies::class,
            'binanceus' => BinanceCurrencies::class,
            'kucoin' => KucoinCurrencies::class,
            'bitget' => BitgetCurrencies::class,
        ];

        return $models[$this->provider] ?? null;
    }

    private function updateCurrencyData($currency, $market)
    {
        switch ($this->provider) {
            case 'coinbasepro':
                $currency->symbol = $market['code'];
                $currency->name = $market['info']['name'];
                $currency->status = ($market['info']['status'] == 'online') ? '1' : '0';
                $currency->type = $market['info']['details']['type'];
                $currency->network_confirmations = $market['info']['details']['network_confirmations'];
                $currency->sort_order = $market['info']['details']['sort_order'];
                $currency->crypto_address_link = $market['info']['details']['crypto_address_link'];
                $currency->crypto_transaction_link = $market['info']['details']['crypto_transaction_link'];
                $currency->min_withdrawal_amount = $market['info']['details']['min_withdrawal_amount'];
                $currency->max_withdrawal_amount = $market['info']['details']['max_withdrawal_amount'];
                break;

            case 'bybit':
                $currency->symbol = $market['code'];
                $currency->name = $market['name'];
                $currency->status = 1;
                $currency->networks = json_encode($market['networks']);
                break;

            case 'binance':
            case 'binanceus':
                $currency->symbol = $market['code'];
                $currency->name = $market['name'];
                $currency->status = $market['active'] ? '1' : '0';
                $currency->deposit = $market['deposit'] ? '1' : '0';
                $currency->withdraw = $market['withdraw'] ? '1' : '0';
                $currency->fees = json_encode($market['fees']);
                $currency->networks = json_encode($market['networks']);
                break;

            case 'kucoin':
                $currency->symbol = $market['code'];
                $currency->name = $market['name'];
                $currency->type = 'crypto';
                $currency->network_confirmations = $market['info']['confirms'];
                $currency->min_withdrawal_amount = $market['info']['withdrawalMinSize'];
                $currency->fee = $market['info']['withdrawalMinFee'];
                $currency->status = $market['active'] ? '1' : '0';
                $currency->deposit = $market['deposit'] ? '1' : '0';
                $currency->withdraw = $market['withdraw'] ? '1' : '0';
                break;

            case 'bitget':
                $currency->symbol = $market['code'];
                $currency->name = $market['code'];
                $currency->networks = json_encode($market['networks']);

                $withdrawEnabled = false;
                $depositEnabled = false;

                foreach ($market['networks'] as $network) {
                    if ($network['withdraw']) {
                        $withdrawEnabled = true;
                    }

                    if ($network['deposit']) {
                        $depositEnabled = true;
                    }
                }

                $currency->withdraw = $withdrawEnabled;
                $currency->status = $withdrawEnabled;
                $currency->deposit = $depositEnabled;
                break;
        }

        return $currency;
    }


    public function fetch_order()
    {
        if ($this->provider === null) {
            return;
        }

        $transactions = ThirdpartyOrders::where('provider', $this->provider)
            ->where('status', '!=', 'closed')
            ->get();

        foreach ($transactions as $transaction) {
            if (($this->provider == 'binance' || $this->provider == 'binanceus') && strpos($transaction->symbol, '/') === false) {
                continue;
            }

            try {
                $trx = $this->api->fetch_order($transaction->order_id, $transaction->symbol);
            } catch (\Throwable $th) {
                continue;
            }

            if ($trx === null || $trx['price'] === null) {
                continue;
            }

            if ($transaction->status == 'open' || $transaction->status == 'filling') {
                $transaction->status = $trx['status'];
                $transaction->filled = $trx['filled'];
                $transaction->remaining = $trx['remaining'];
                $transaction->price = $trx['price'];
                $transaction->cost = $trx['cost'];
                $transaction->fee = isset($trx['fee']) ? $trx['fee']['cost'] : 0;
                $transaction->save();

                $balanceModifier = ($trx['side'] == 'buy') ? $trx['amount'] : $trx['cost'];
                $currencyIndex = ($trx['side'] == 'buy') ? 0 : 1;

                try {
                    $wal = getWallet($transaction->user_id, 'trading', getPair($transaction->symbol)[$currencyIndex], $transaction->provider);
                    if ($wal) {
                        $wal->balance += $balanceModifier;
                        $wal->save();
                    }
                } catch (\Throwable $th) {
                }
            } elseif ($trx['status'] == 'canceled') {
                $transaction->status = 'canceled';
                $transaction->save();
            }
        }

        cronLastRun('fetch_order');
    }
}
