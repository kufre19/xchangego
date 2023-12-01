<?php

namespace App\Http\Controllers;

use App\Models\Binance\BinanceCurrencies;
use App\Models\CoinbaseCurrencies;
use App\Models\GatewayCurrency;
use App\Models\Kucoin\KucoinCurrencies;
use App\Models\ThirdpartyOrders;
use App\Models\ThirdpartyTransactions;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletsTransactions;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Throwable;

class WalletController extends Controller
{
    public $api;
    public $provider;
    public function __construct()
    {
        $thirdparty = getProvider();
        if ($thirdparty != null) {

            $exchange_class = "\\ccxt\\$thirdparty->title";
            if ($thirdparty->title == 'kucoin') {
                $this->api = new $exchange_class(array(
                    'apiKey' => $thirdparty->api,
                    'secret' => $thirdparty->secret,
                    'password' => $thirdparty->password,
                    'options' => array(
                        'versions' => array(
                            'public' => array(
                                'GET' => array(
                                    'currencies/{currency}' => 'v2',
                                ),
                            ),
                        ),
                    ),
                    //'verbose'=> true
                ));
            } else if ($thirdparty->title == 'binance' || $thirdparty->title == 'binanceus') {
                $this->api = new $exchange_class(array(
                    'apiKey' => $thirdparty->api,
                    'secret' => $thirdparty->secret,
                    'password' => $thirdparty->password,
                    'options' => array(
                        'adjustForTimeDifference' => true,
                        'recvWindow' => 30000,
                    ),
                ));
            } else {
                $this->api = new $exchange_class(array(
                    'apiKey' => $thirdparty->api,
                    'secret' => $thirdparty->secret,
                    'password' => $thirdparty->password,
                ));
            }
            $this->provider = $thirdparty->title;
        } else {
            $this->provider = 'funding';
        }
        $this->provider = 'funding';
    }

    function fetch_create_deposit_address_helper($exchange, $code, $chain = null)
    {
        $response = null;
        try {
            $response = $exchange->fetch_deposit_address($code, $chain ? array('chain' => strtolower($chain)) : array());
            if ((!$response['address']) || (!strlen($response['address']))) {
                throw new \ccxt\ExchangeError($exchange->id);
            }
        } catch (\ccxt\ExchangeError $e) {
            $response = $exchange->create_deposit_address($code, $chain ? array('chain' => strtolower($chain)) : array());
        }
        return $response;
    }

    function fetch_create_deposit_address($exchange, $code, $chainName, $chain = null)
    {
        try {
            return $this->fetch_create_deposit_address_helper($exchange, $code, $chain);
        } catch (\ccxt\ExchangeError $e) {
        }
    }

    public function fetch_wallets()
    {
        $user = Auth::user();

        // Get the currencies based on the provider
        if ($this->provider == 'coinbasepro') {
            $currencies = (new CoinbaseCurrencies)->getEnabled();
        } elseif ($this->provider == 'kucoin') {
            $currencies = (new KucoinCurrencies)->getEnabled();
        } elseif ($this->provider == 'binance' || $this->provider == 'binanceus') {
            $currencies = (new BinanceCurrencies)->getEnabled();
        } else {
            return response()->json([
                'error' => 'Invalid provider',
                'currencies' => [],
                'api' => 0,
            ]);
        }

        // Get the wallets based on the provider
        if (Wallet::where('provider', '!=', 'local')->where('user_id', $user->id)->exists()) {
            $all_wallets = (new Wallet)->getCached($user->id);
            $wallets['trading'] = $all_wallets->where('provider', $this->provider);
            $wallets['funding'] = $all_wallets->where('provider', 'funding');
        } else {
            $wallets['trading'] = collect();
            $wallets['funding'] = collect();
        }


        // Merge wallet data into currency data
        $currenciesWithWallets = $currencies->map(function ($currency) use ($wallets) {
            foreach (['trading', 'funding'] as $walletType) {
                $currencyWallet = $wallets[$walletType]->where('symbol', $currency->symbol)->first();
                if ($currencyWallet) {
                    $currency->{$walletType . 'Wallet'} = $currencyWallet;
                }
            }
            return $currency;
        });

        // Filter and sort currenciesWithWallets
        $currenciesWithWallets = $currenciesWithWallets->filter(function ($currency) {
            return isset($currency->tradingWallet) || isset($currency->fundingWallet);
        })->sortByDesc(function ($currency) {
            return (isset($currency->tradingWallet) ? $currency->tradingWallet->balance : 0) + (isset($currency->fundingWallet) ? $currency->fundingWallet->balance : 0);
        })->concat($currenciesWithWallets->filter(function ($currency) {
            return !isset($currency->tradingWallet) && !isset($currency->fundingWallet);
        }));

        return response()->json([
            'currencies' => $currenciesWithWallets->values(),
            'api' => $this->provider != 'funding' ? 1 : 0,
        ]);
    }

    public function fetch_wallet($type, $symbol, $address)
    {
        $user = Auth::user();
        $wal = Wallet::where('user_id', $user->id)->where('address', $address)->where('symbol', $symbol)->where('type', $type)->first();
        $wal_trx = WalletsTransactions::where('user_id', $user->id)->where('symbol', $symbol)->latest()->get();
        if ($wal->type === 'trading') {
            // Fetch open and filling orders for the wallet
            $orders = ThirdpartyOrders::where('user_id', $user->id)
                ->where('symbol', $symbol)
                ->whereIn('status', ['open', 'filling'])
                ->get();

            // Calculate the in-order balance
            $in_order_balance = $orders->sum('amount');

            // Calculate the total balance
            $total_balance = $wal->balance + $in_order_balance;

            // Add the calculated values to the wallet object without saving them to the database
            $wal->in_order = $in_order_balance;
            $wal->total = $total_balance;
        }
        session()->put('Track', $wal);
        if ($this->provider != 'funding') {
            $chains = [];
            if ($this->provider == 'coinbasepro') {
                $curr = CoinbaseCurrencies::where('symbol', $wal->symbol)->first();
                $addresses = null;
                $chains = null;
            } else if ($this->provider == 'binance' || $this->provider == 'binanceus') {
                $curr = BinanceCurrencies::where('symbol', $wal->symbol)->first();
                $addressesData = json_decode($wal->addresses, true);

                $chainss = json_decode($curr->networks, True);
                foreach ($chainss as $chain) {
                    if ($chain['withdrawEnable'] == true) {
                        $chains[$chain['network']] = $chain;
                    }
                }

                if (is_array($addressesData)) {
                    foreach ($addressesData as $key => $value) {
                        if (array_key_exists($key, $chains)) {
                            $value['chain'] = $chains[$key];
                            $value['network'] = $chains[$key]['network'];
                            $addresses[$key] = $value;
                        }
                    }
                }
            } else if ($this->provider == 'kucoin') {
                $addressesData = json_decode($wal->addresses);
                $response = $this->api->public_get_currencies_currency(array('currency' => $symbol));
                $currency = $this->api->safe_value($response, 'data');
                if ($currency) {
                    $chainss = collect($this->api->safe_value($currency, 'chains'));
                    foreach ($chainss->where('isWithdrawEnabled', true)->where('isDepositEnabled', true) as $chain) {
                        $chains[$chain['chainName']] = $chain;
                    }
                }
                if ($addressesData != null) {
                    foreach ($addressesData as $key => $value) {
                        if (isset($chains[$key])) {
                            $adr = $value;
                            $adr->chain = $chains[$key];
                            $adr->network = $chains[$key]['chainName'];
                            $addresses[$key] = $adr;
                        }
                    }
                }
                $curr = KucoinCurrencies::where('symbol', $wal->symbol)->first();
            } else {
                $curr = null;
            }
            if (GatewayCurrency::whereHas('method', function ($gate) {
                $gate->where('status', 1);
            })->with('method')->exists()) {
                $dp = 1;
            }
            return response()->json([
                'wal' => $wal,
                'wal_trx' => $wal_trx,
                'addresses' => $addresses ?? null,
                'curr' => $curr,
                'currency' => getCurrency(),
                'api' => 1,
                'dp' => $dp ?? 0,
            ]);
        } else {
            if (GatewayCurrency::whereHas('method', function ($gate) {
                $gate->where('status', 1);
            })->with('method')->exists()) {
                $dp = 1;
            }
            return response()->json([
                'wal' => $wal,
                'wal_trx' => $wal_trx,
                'addresses' => null,
                'curr' => null,
                'currency' => getCurrency(),
                'chains' => null,
                'api' => 0,
                'dp' => $dp ?? 0,
            ]);
        }
    }

    public function fetch_wallet_balance(Request $request)
    {
        if ($request->type == 'funding') {
            if (isWallet(auth()->user()->id, 'funding', $request->symbol, 'funding') == false) {
                return response()->json([
                    'symbol' => null,
                    'balance' => null
                ]);
            } else {
                $wallet = getWallet(auth()->user()->id, 'funding', $request->symbol, 'funding');
                return response()->json([
                    'symbol' => $wallet->symbol,
                    'balance' => $wallet->balance
                ]);
            }
        } else {
            if (isWallet(auth()->user()->id, 'trading', $request->symbol, $this->provider) == false) {
                return response()->json([
                    'symbol' => null,
                    'balance' => null
                ]);
            } else {
                $wallet = getWallet(auth()->user()->id, 'trading', $request->symbol, $this->provider);
                return response()->json([
                    'symbol' => $wallet->symbol,
                    'balance' => $wallet->balance
                ]);
            }
        }
    }

    public function store(Request $request)
    {
        if (isset($request->user_id)) {
            $user = User::find($request->user_id);
        } else {
            $user = auth()->user();
        }
        if (Wallet::where('provider', $this->provider)->where('user_id', $user->id)->where('type', $request->type)->where('symbol', $request->symbol)->first()) {
            return response()->json(
                [
                    'success' => true,
                    'type' => 'warning',
                    'message' => 'You Have ' . $request->symbol . ' Wallet Already!'
                ]
            );
        } else {
            if ($request->type == 'trading') {
                $wallet = new Wallet();
                $wallet->user_id = $user->id;
                $wallet->provider = $this->provider;
                $wallet->symbol = $request->symbol;
                $wallet->type = $request->type;
                if ($this->provider == 'coinbasepro') {
                    try {
                        $wallet->address = $this->api->create_deposit_address($request->symbol)['address'];
                        $wallet->save();
                        return response()->json(
                            [
                                'success' => true,
                                'type' => 'success',
                                'message' => 'Your ' . $wallet->symbol . ' Wallet Created Successfully'
                            ]
                        );
                    } catch (Throwable $e) {
                        return response()->json(
                            [
                                'success' => true,
                                'type' => 'warning',
                                'message' => 'Wallet Generation Failed, Please report to support'
                            ]
                        );
                    }
                } else if ($this->provider == 'binance' || $this->provider == 'binanceus') {
                    $curr = BinanceCurrencies::where('symbol', $request->symbol)->first();
                    $chainss = json_decode($curr->networks, True);
                    foreach ($chainss as $chain) {
                        if ($chain['withdrawEnable'] == true) {
                            $chains[] = $chain;
                        }
                    }
                    $results = array();
                    if (count($chains) > 1) {
                        foreach ($chains as $chain) {
                            $chainName = $this->api->safe_string($chain, 'network');
                            try {
                                $address = $this->api->fetch_deposit_address($request->symbol, ["network" => $chainName]);
                            } catch (Throwable $e) {
                                return response()->json(
                                    [
                                        'success' => true,
                                        'type' => 'warning',
                                        'message' => str_replace($this->provider . ' ', '', $e->getMessage()),
                                    ]
                                );
                            }
                            if (!isset($results)) {
                                $results = array();
                            }
                            $results[$chainName] = $address;
                        }
                    } else {
                        $chain = $this->api->safe_value($chains, 0);
                        $chainName = $this->api->safe_string($chain, 'network');
                        try {
                            $address = $this->api->fetch_deposit_address($request->symbol, ["network" => $chainName]);
                        } catch (Throwable $e) {
                            return response()->json(
                                [
                                    'success' => true,
                                    'type' => 'warning',
                                    'message' => str_replace($this->provider . ' ', '', $e->getMessage()),
                                ]
                            );
                        }
                        if (!isset($results)) {
                            $results = array();
                        }
                        $results[$chainName] = $address;
                    }
                    $results = array_filter($results);
                    $wallet->addresses = json_encode($results);
                    try {
                        $wallet->address = reset($results)['address'];
                        $wallet->save();
                        return response()->json(
                            [
                                'success' => true,
                                'type' => 'success',
                                'message' => 'Your ' . $wallet->symbol . ' Wallet Created Successfully'
                            ]
                        );
                    } catch (Throwable $e) {
                        return response()->json(
                            [
                                'success' => true,
                                'type' => 'warning',
                                'message' => json_decode(str_replace($this->provider . ' ', '', $e->getMessage()))->msg,
                            ]
                        );
                    }
                } else if ($this->provider == 'bybit') {
                    try {
                        $wallet->address = $this->api->fetch_deposit_address($request->symbol)['address'];
                        $wallet->addresses = json_encode($this->api->fetch_deposit_addresses_by_network($request->symbol));
                        $wallet->save();
                        return response()->json(
                            [
                                'success' => true,
                                'type' => 'success',
                                'message' => 'Your ' . $wallet->symbol . ' Wallet Created Successfully'
                            ]
                        );
                    } catch (Throwable $e) {
                        return response()->json(
                            [
                                'success' => true,
                                'type' => 'warning',
                                'message' => str_replace($this->provider . ' ', '', $e->getMessage()),
                            ]
                        );
                    }
                } else if ($this->provider == 'kucoin') {
                    $response = $this->api->public_get_currencies_currency(array('currency' => $request->symbol));
                    $currency = $this->api->safe_value($response, 'data');
                    $results = array();
                    if ($currency) {
                        $chains = $this->api->safe_value($currency, 'chains');
                        if ((count($chains) > 1) && ($request->symbol !== 'BNB')) {
                            foreach ($chains as $chain) {
                                $chainName = $this->api->safe_string($chain, 'chainName');
                                $address = $this->fetch_create_deposit_address($this->api, $request->symbol, $chainName, $chainName);
                                if (!isset($results)) {
                                    $results = array();
                                }
                                $results[$chainName] = $address;
                            }
                        } else {
                            $chain = $this->api->safe_value($chains, 0);
                            $chainName = $this->api->safe_string($chain, 'chainName');
                            $address = $this->fetch_create_deposit_address($this->api, $request->symbol, $chainName);
                            if (!isset($results)) {
                                $results = array();
                            }
                            $results[$chainName] = $address;
                        }
                        $results = array_filter($results);
                        $wallet->addresses = json_encode($results);
                        try {
                            $wallet->address = reset($results)['address'];
                            $wallet->save();
                            return response()->json(
                                [
                                    'success' => true,
                                    'type' => 'success',
                                    'message' => 'Your ' . $wallet->symbol . ' Wallet Created Successfully'
                                ]
                            );
                        } catch (Throwable $e) {
                            return response()->json(
                                [
                                    'success' => true,
                                    'type' => 'error',
                                    'message' => 'API Connection Failed'
                                ]
                            );
                        }
                    } else {
                        return response()->json(
                            [
                                'success' => true,
                                'type' => 'warning',
                                'message' => 'Wallet Generation Failed, Please report to support'
                            ]
                        );
                    }
                }
            } else {
                if (Wallet::where('provider', 'funding')->where('user_id', $user->id)->where('type', $request->type)->where('symbol', $request->symbol)->first()) {
                    return response()->json(
                        [
                            'success' => true,
                            'type' => 'warning',
                            'message' => 'You Have ' . $request->symbol . ' Wallet Already!'
                        ]
                    );
                } else {
                    $wallet = new Wallet();
                    $wallet->user_id = $user->id;
                    $wallet->symbol = $request->symbol;
                    $wallet->address = grs(34);
                    $wallet->type = 'funding';
                    $wallet->provider = 'funding';
                    $wallet->save();
                    return response()->json(
                        [
                            'success' => true,
                            'type' => 'success',
                            'message' => 'Your ' . $wallet->symbol . ' Wallet Created Successfully'
                        ]
                    );
                }
            }
        }
    }

    public function deposit(Request $request)
    {
        $user = Auth::user();
        if (ThirdpartyTransactions::where('address', $request->address)->exists()) {
            return response()->json(
                [
                    'type' => 'error',
                    'message' => 'Transaction Hash Already Used',
                    'deposit_status' => 'invalid',
                    'status' => 'invalid'
                ]
            );
        } else {

            $deposit = new ThirdpartyTransactions();
            $deposit->user_id = $user->id;
            $deposit->symbol = $request->symbol;
            $deposit->recieving_address = $request->recieving_address;
            $deposit->address = $request->address;
            $deposit->chain = $request->chain;
            $deposit->type = 1;
            $deposit->status = 0;
            $deposit->save();
            $deposit->clearCache();

            createAdminNotification($user->id, 'New Deposit From ' . $user->username, route('admin.report.wallet'));

            return response()->json(
                [
                    'success' => true,
                    'type' => 'success',
                    'message' => 'Deposit order placed successfully',
                    'deposit_status' => 'pending'
                ]
            );
        }
    }


    /**
     * Verify deposit transaction and update user's wallet
     *
     * @param string $trx Transaction ID
     * @return Illuminate\Http\JsonResponse
     */
    public function verify(string $trx)
    {
        $user = Auth::user();
        // Check if provider is set
        if (!$this->provider) {
            return response()->json([]);
        }

        // Find third-party transaction by transaction ID
        $transaction = ThirdpartyTransactions::where('address', $trx)->first();

        // Return error response if transaction not found
        if (!$transaction) {
            return response()->json([
                'type' => 'error',
                'message' => 'Deposit order not found',
            ]);
        }

        // Get deposits/transactions from provider API
        $collections = collect([]);
        if ($this->provider == 'kucoin' || $this->provider == 'binance' || $this->provider == 'binanceus') {
            $collections = collect($this->api->fetch_deposits($transaction->symbol));
        } elseif ($this->provider == 'coinbasepro') {
            $collections = collect($this->api->fetch_transactions());
        }

        // Find deposit by transaction ID
        $deposit = $collections->where('txid', $transaction->address)->first();
        // Return empty response if deposit not found or has status other than "ok"
        if (!$deposit) {
            return response()->json([
                'type' => 'info',
                'message' => 'Deposit still pending',
            ]);
        }

        // Check deposit symbol/coin and network/chain match the transaction details
        if ($this->provider == 'kucoin') {
            if ($transaction->symbol !== $deposit['currency']) {
                $transaction->delete();
                return response()->json([
                    'type' => 'error',
                    'message' => 'Transaction hash belongs to another token',
                    'deposit_status' => 'failed',
                    'status' => 'failed'
                ]);
            }
        } elseif ($this->provider == 'binance' || $this->provider == 'binanceus') {
            if ($transaction->symbol !== $deposit['currency']) {
                $transaction->delete();
                return response()->json([
                    'type' => 'error',
                    'message' => 'Transaction hash belongs to another token',
                    'deposit_status' => 'failed',
                    'status' => 'failed'
                ]);
            }
        }

        // If transaction status is already confirmed, return empty response
        if ($transaction->status == 1) {
            return response()->json([
                'type' => 'error',
                'message' => 'Deposit already confirmed',
                'status' => 'failed',
                'deposit_status' => 'failed'
            ]);
        }

        $createdAt = $deposit['timestamp'] / 1000;
        $transactionCreatedAt = $transaction->created_at->timestamp;
        $timeDiff = Carbon::now()->diffInMinutes(Carbon::createFromTimestamp($createdAt));
        if ($createdAt < ($transactionCreatedAt - 900) || $createdAt > ($transactionCreatedAt + 900) || $timeDiff > 45) {
            return response()->json([
                'type' => 'error',
                'message' => 'Transaction timed out or invalid',
                'deposit_status' => 'failed',
                'status' => 'failed'
            ]);
        }

        // Update wallet transaction and user's wallet balance
        $wallet_new_trx = new WalletsTransactions();
        $wallet_new_trx->symbol = $transaction->symbol;
        $wallet_new_trx->user_id = $transaction->user_id;
        $wallet_new_trx->address = $transaction->address;
        $wallet_new_trx->to = $transaction->recieving_address;
        $wallet_new_trx->chain = $transaction->chain;
        $wallet_new_trx->type = 1;
        $wallet_new_trx->status = 1;
        $wallet_new_trx->details = 'Deposited To ' . $transaction->symbol . ' Wallet ';
        $wallet_new_trx->wallet_type = 'trading';
        $wallet_new_trx->amount = $deposit['amount'];
        $wallet_new_trx->amount_recieved = $deposit['amount'];
        $wallet_new_trx->charge = $deposit['amount'] + ($deposit['fee'] ? $deposit['fee']['cost'] : 0);
        $wallet_new_trx->trx = $transaction->trx_id ?? $transaction->address;
        $wallet_new_trx->save();
        $wallet_new_trx->clearCache();

        $transaction->status = 1;
        $transaction->amount = $deposit['amount'];
        $transaction->fee = $deposit['fee'] ? $deposit['fee']['cost'] : 0;
        $transaction->trx_id = $wallet_new_trx->trx;
        $transaction->save();

        $wallet = getWallet($transaction->user_id, 'trading', $transaction->symbol, $this->provider);
        $wallet->balance += $deposit['amount'];
        $wallet->save();

        // Transfer deposit to main wallet if using KuCoin
        if ($this->provider == 'kucoin') {
            try {
                $this->api->transfer($transaction->symbol, $deposit['amount'], 'main', 'trade');
            } catch (\Throwable $th) {
                createAdminNotification($user->id, $th->getMessage(), route('admin.report.wallet'));
            }
        }

        // Create user transaction and admin notification for successful deposit
        $trx = createTransaction($wallet, $transaction->amount, '+', 'Deposit of ' . $transaction->amount . ' ' . $transaction->symbol, $transaction->trx_id);
        createAdminNotification($user->id, 'Deposit Confirmed For ' . $trx->user->username, route('admin.report.wallet'));
        notify($trx->user, 'TRADING_WALLET_DEPOSIT_SUCCESSFUL', [
            'username' => $trx->user->username,
            'site_name' => getNotify()->site_name,
            "amount" => $trx->amount,
            "currency" => $trx->currency,
            "trx" => $trx->trx,
            "post_balance" => $trx->post_balance,
            "charge" => $trx->charge,
        ]);

        // Return response for completed deposit
        return response()->json([
            'status' => 'confirmed',
            'deposit_status' => 'completed',
            'message' => 'Deposit confirmed successfully',
            'type' => 'success'
        ]);
    }

    public function cancel($trx)
    {
        $user = Auth::user();
        $transaction = ThirdpartyTransactions::where('user_id', $user->id)->where('address', $trx)->first();
        $transaction->delete();

        return response()->json(
            [
                'status' => 'cancelled',
                'type' => 'success',
                'message' => 'Deposit order cancelled successfully',
                'deposit_status' => 'cancelled'
            ]
        );
    }




    public function withdraw(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'recieving_address' => 'required',
        ]);

        $user = Auth::user();
        $wallet = Wallet::where('user_id', $user->id)
            ->where('provider', $this->provider)
            ->where('type', 'trading')
            ->where('symbol', $request->symbol)
            ->first();

        if (!$wallet || !$request->amount || !$request->recieving_address) {
            return response()->json([
                'type' => 'error',
                'message' => 'Invalid input',
            ]);
        }

        $fee = (getGen() && isset(getGen()->provider_withdraw_fee)) ? getGen()->provider_withdraw_fee / 100 : 0;
        $withdrawAmount = $request->amount * (1 + $fee);

        if ($withdrawAmount > $wallet->balance) {
            return response()->json([
                'type' => 'error',
                'message' => 'Your withdraw amount including fees is higher than your balance',
            ]);
        }
        try {

            $wallet->balance -= $request->amount + ($request->amount * $fee);

            $withdraw = new ThirdpartyTransactions();
            $withdraw->user_id = $user->id;
            $withdraw->symbol = $request->symbol;
            $withdraw->recieving_address = $request->recieving_address;
            $withdraw->amount = $request->amount;
            switch ($this->provider) {
                case 'coinbasepro':
                    try {
                        $provider_withdraw = $this->api->withdraw($request->symbol, $request->amount, $request->recieving_address);
                    } catch (\Throwable $th) {
                        return $this->handleWithdrawalError($user, $request, $wallet, 'Internal error, please try again after 12h');
                    }
                    $withdraw->fee = $provider_withdraw['info']['fee'];
                    $withdraw->trx_id = $provider_withdraw['info']['id'];
                    break;
                case 'binance':
                case 'binanceus':
                    try {
                        $params = array();
                        if (isset($request->chain)) {
                            $params['network'] = $request->chain;
                        }
                        if (isset($request->memo)) {
                            $tag = $request->memo;
                        } else {
                            $tag = null;
                        }
                        $provider_withdraw = $this->api->withdraw($request->symbol, $request->amount, $request->recieving_address, $tag, $params);
                    } catch (\Throwable $th) {
                        preg_match('/"msg":"(.*?)"/', $th->getMessage(), $matches);
                        $message = isset($matches[1]) ? $matches[1] : 'An unknown error occurred.';
                        return $this->handleWithdrawalError($user, $request, $wallet, $message);
                    }
                    $withdraw->trx_id = $provider_withdraw['info']['id'];
                    break;
                default:
                    $withdraw->memo = $request->memo;
                    $withdraw->chain = $request->chain;

                    try {
                        $transfer_process = $this->api->transfer($request->symbol, $request->amount, 'trade', 'main');
                    } catch (\Throwable $th) {
                        return $this->handleWithdrawalError($user, $request, $wallet, 'Internal error, please try again after 12h');
                    }

                    if (isset($transfer_process['id'])) {
                        $params = array();
                        if (isset($request->chain)) {
                            $params['network'] = $request->chain;
                        }
                        try {
                            $provider_withdraw = $this->api->withdraw($request->symbol, $request->amount, $request->recieving_address, $request->memo, $params);
                        } catch (\Throwable $th) {
                            return $this->handleWithdrawalError($user, $request, $wallet, 'Internal error, please try again after 12h');
                        }

                        if (isset($provider_withdraw['id'])) {
                            try {
                                $withdraw_id = collect($this->api->fetch_withdrawals())->where('id', $provider_withdraw['id'])->first();
                                $withdraw->trx_id = $provider_withdraw['id'];
                                $withdraw->fee = ($request->amount * $fee) + $withdraw_id['fee']['cost'];
                            } catch (\Throwable $th) {
                                $withdraw->fee = $fee;
                            }
                        }
                    }
                    break;
            }

            $withdraw->type = '2';
            $withdraw->status = '0';
            $withdraw->save();
            $withdraw->clearCache();
            $wallet->save();


            $transaction = new Transaction();
            $transaction->user_id = $withdraw->user_id;
            $transaction->currency = $request->symbol;
            $transaction->amount = getAmount($withdraw->amount);
            $transaction->post_balance = getAmount($wallet->balance);
            $transaction->charge = getAmount($request->amount + ($request->amount * $fee));
            $transaction->trx_type = '-';
            $transaction->details = 'Withdraw of ' . $withdraw->amount . ' ' . $withdraw->symbol . ' From Wallet: ' . $withdraw->recieving_address;
            $transaction->trx =  $withdraw->trx_id;
            $transaction->save();
            $transaction->clearCache();

            $wallet_new_trx = new WalletsTransactions();
            $wallet_new_trx->user_id = $withdraw->user_id;
            $wallet_new_trx->symbol = $withdraw->symbol;
            $wallet_new_trx->amount = $withdraw->amount;
            if ($this->provider == 'kucoin') {
                $wallet_new_trx->chain = $request->chain;
            } else if ($this->provider == 'binance' || $this->provider == 'binanceus') {
                $wallet_new_trx->chain = $request->chain;
            }
            $wallet_new_trx->charge = getAmount($request->amount + ($request->amount * $fee));
            if ($this->provider == 'binance' || $this->provider == 'binanceus') {
                $wallet_new_trx->amount_recieved = $wallet_new_trx->amount - $request->fee;
            } else {
                $wallet_new_trx->amount_recieved = $wallet_new_trx->amount - $withdraw->fee;
            }
            $wallet_new_trx->to = $withdraw->recieving_address;
            $wallet_new_trx->type = '2';
            $wallet_new_trx->status = '1';
            $wallet_new_trx->trx = $withdraw->trx_id;
            $wallet_new_trx->wallet_type = 'trading';
            $wallet_new_trx->details = 'Withdraw of ' . $withdraw->amount . ' ' . $withdraw->symbol . ' From Wallet: ' . $withdraw->recieving_address;
            if ($this->provider == 'binance' || $this->provider == 'binanceus') {
                $wallet_new_trx->fees = ($request->amount * $fee) + $request->fee;
            } else {
                $wallet_new_trx->fees = $withdraw->fee;
            }
            $wallet_new_trx->save();
            $wallet_new_trx->clearCache();

            createAdminNotification($user->id, 'New Withdraw From ' . $user->username, route('admin.withdraw.log'));

            try {
                notify($user, 'PROVIDER_WITHDRAW', [
                    "amount" => $request->amount,
                    "currency" => $request->symbol,
                    "trx" => $transaction->trx_id,
                    "post_balance" => $transaction->post_balance,
                    "charge" => $wallet_new_trx->fees,
                    "recieving_address" => $request->recieving_address,
                    "recieved" => $wallet_new_trx->amount_recieved
                ]);
            } catch (\Throwable $th) {
                //throw $th;
            }

            return response()->json(
                [
                    'type' => 'success',
                    'message' => 'Withdraw order placed successfully',
                    'wal_trx' => WalletsTransactions::where('user_id', $user->id)->where('symbol', $request->symbol)->latest()->get(),
                    'wal' => $wallet,
                ]
            );
        } catch (\Throwable $th) {
            return response()->json([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }

    private function handleWithdrawalError($user, $request, $wallet, $message)
    {
        createAdminNotification($user->id, $request->amount . ' ' . $request->symbol . ' Withdraw Failed, add balance to ' . $this->provider . ' please.', '#');
        return response()->json(
            [
                'success' => true,
                'type' => 'error',
                'wal_trx' => WalletsTransactions::where('user_id', $user->id)->where('symbol', $request->symbol)->latest()->get(),
                'wal' => $wallet,
                'message' => $message
            ]
        );
    }

    public function transfer_from_trading(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
        ]);
        $user = Auth::user();

        if (Wallet::where('user_id', $user->id)->where('provider', 'funding')->where('symbol', $request->symbol)->exists() == true) {
            $from = Wallet::where('user_id', $user->id)->where('provider', $this->provider)->where('symbol', $request->symbol)->first();
            $to = Wallet::where('user_id', $user->id)->where('provider', 'funding')->where('symbol', $request->symbol)->first();
            if ($request->amount > $from->balance) {
                return response()->json(
                    [
                        'success' => true,
                        'type' => 'error',
                        'message' => 'Amount is higher than your wallet balance'
                    ]
                );
            } else {
                $transfer = new Transaction();
                $transfer->user_id = $user->id;
                $transfer->amount = getAmount($request->amount);
                $transfer->post_balance = getAmount($request->balance);
                $transfer->charge = 0;
                $transfer->trx_type = '-';
                $transfer->details = 'Transfer of ' . $request->amount . ' ' . $request->symbol . ' from trading to funding wallet';
                $transfer->trx = getTrx();
                $transfer->save();
                $transfer->clearCache();

                $wallet_new_trx = new WalletsTransactions();
                $wallet_new_trx->user_id = $transfer->user_id;
                $wallet_new_trx->symbol = $request->symbol;
                $wallet_new_trx->amount = $transfer->amount;
                $wallet_new_trx->amount_recieved = $transfer->amount;
                $wallet_new_trx->charge = 0;
                $wallet_new_trx->to = $to->address;
                $wallet_new_trx->type = '3';
                $wallet_new_trx->status = '1';
                $wallet_new_trx->trx = $transfer->trx;
                $wallet_new_trx->wallet_type = 'trading';
                $wallet_new_trx->details = 'Transfer of ' . $request->amount . ' ' . $request->symbol . ' from trading to funding wallet';
                $wallet_new_trx->save();
                $wallet_new_trx->clearCache();

                $from->balance -= $request->amount;
                $from->save();
                $to->balance += $request->amount;
                $to->save();

                return response()->json(
                    [
                        'success' => true,
                        'type' => 'success',
                        'wal_trx' => WalletsTransactions::where('user_id', $user->id)->where('symbol', $request->symbol)->latest()->get(),
                        'wal' => $from,
                        'message' => 'Balance Transferred Successfully'
                    ]
                );
            }
        } else {
            return response()->json(
                [
                    'success' => true,
                    'type' => 'error',
                    'message' => 'Create Funding Wallet first'
                ]
            );
        }
    }

    public function transfer_from_funding(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
        ]);
        $user = Auth::user();
        if (Wallet::where('user_id', $user->id)->where('provider', $this->provider)->where('symbol', $request->symbol)->exists() == true) {
            $from = Wallet::where('user_id', $user->id)->where('provider', 'funding')->where('symbol', $request->symbol)->first();
            $to = Wallet::where('user_id', $user->id)->where('provider', $this->provider)->where('symbol', $request->symbol)->first();
            if ($request->amount > $from->balance) {
                return response()->json(
                    [
                        'success' => true,
                        'type' => 'error',
                        'message' => 'Amount is higher than your wallet balance'
                    ]
                );
            } else {
                $transfer = new Transaction();
                $transfer->user_id = $user->id;
                $transfer->amount = getAmount($request->amount);
                $transfer->post_balance = getAmount($request->balance);
                $transfer->charge = 0;
                $transfer->trx_type = '-';
                $transfer->currency = $request->symbol;
                $transfer->details = 'Transfer of ' . $request->amount . ' ' . $request->symbol . ' from funding to trading wallet';
                $transfer->trx = getTrx();
                $transfer->save();
                $transfer->clearCache();
                $from->balance -= $request->amount;
                $from->save();

                $wallet_new_trx = new WalletsTransactions();
                $wallet_new_trx->user_id = $transfer->user_id;
                $wallet_new_trx->symbol = $request->symbol;
                $wallet_new_trx->amount = $transfer->amount;
                $wallet_new_trx->amount_recieved = $transfer->amount;
                $wallet_new_trx->charge = 0;
                $wallet_new_trx->to = $to->address;
                $wallet_new_trx->type = '4';
                $wallet_new_trx->status = '2';
                $wallet_new_trx->trx = $transfer->trx;
                $wallet_new_trx->wallet_type = 'funding';
                $wallet_new_trx->details = 'Transfer of ' . $request->amount . ' ' . $request->symbol . ' from funding to trading wallet';
                $wallet_new_trx->save();
                $wallet_new_trx->clearCache();

                createAdminNotification($user->id, 'New Transfer From ' . $user->username, route('admin.report.wallet') . '?table[filters][status]=2&table[filters][type]=4');

                return response()->json(
                    [
                        'success' => true,
                        'type' => 'success',
                        'wal_trx' => WalletsTransactions::where('user_id', $user->id)->where('symbol', $request->symbol)->latest()->get(),
                        'wal' => $from,
                        'message' => 'Balance Transfer Pending Approval'
                    ]
                );
            }
        } else {
            return response()->json(
                [
                    'success' => true,
                    'type' => 'error',
                    'message' => 'Create Funding Wallet first'
                ]
            );
        }
    }

    public function authenticate(Request $request)
    {
        if (User::where('eth_address', $request->ethAddress)->exists()) {
            $user = User::where('eth_address', $request->ethAddress)->first();
            auth()->login($user);
            return response()->json(
                [
                    'success' => true,
                    'type' => 'success',
                    'message' => 'Wallet Authenticated Successfully'
                ]
            );
        } else {
            return response()->json(
                [
                    'success' => false,
                    'type' => 'error',
                    'message' => 'Your Account Dont Have Connected Wallet'
                ]
            );
        }
    }

    public function connect(Request $request)
    {
        $user = Auth::user();
        $user->forceFill([
            'eth_Address' => $request->address,
        ])->save();
        return 1;
    }

    public function disconnect(Request $request)
    {
        $user = Auth::user();
        $user->forceFill([
            'eth_Address' => null,
        ])->save();
        return 1;
    }
}
