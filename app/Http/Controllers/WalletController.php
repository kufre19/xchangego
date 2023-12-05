<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Extensions\Futures\WalletController as FuturesWalletController;
use App\Http\Controllers\Providers\ExtendedBitget;
use App\Models\Binance\BinanceCurrencies;
use App\Models\Bitget\BitgetCurrencies;
use App\Models\CoinbaseCurrencies;
use App\Models\Futures\FutureWallets;
use App\Models\GatewayCurrency;
use App\Models\Kucoin\KucoinCurrencies;
use App\Models\ThirdpartyOrders;
use App\Models\ThirdpartyTransactions;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletsTransactions;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Throwable;

class WalletController extends Controller
{
    public $api;
    public $extendedApi;
    public $provider;
    public $futuresProvider;
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
            if ($this->provider === 'bitget') {
                $this->extendedApi = new ExtendedBitget([
                    'apiKey' => $thirdparty->api,
                    'secret' => $thirdparty->secret,
                    'password' => $thirdparty->password,
                ]);
            }
        } else {
            $this->provider = 'funding';
        }
        $futuresThirdparty = getProviderFutures();
        if ($futuresThirdparty) {
            $this->futuresProvider = $futuresThirdparty->title;
        } else {

            $this->futuresProvider = null;
        }
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
        } elseif ($this->provider == 'kucoin' || $this->provider == 'funding') {
            $currencies = (new KucoinCurrencies)->getEnabled();
        } elseif ($this->provider == 'binance' || $this->provider == 'binanceus') {
            $currencies = (new BinanceCurrencies)->getEnabled();
        } elseif ($this->provider == 'bitget') {
            $currencies = (new BitgetCurrencies())->getEnabled();
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

        $futureCurrenciesWithWallets = collect();
        if (getExt(15) === 1) {
            $futureCurrenciesWithWallets = (new FuturesWalletController)->wallets($user->id);
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
            'futureCurrencies' => $futureCurrenciesWithWallets->values(),
            'api' => $this->provider != 'funding' ? 1 : 0,
        ]);
    }

    public function fetch_wallet($type, $symbol, $address)
    {
        $user = Auth::user();
        $wal = Wallet::where('user_id', $user->id)
            ->where('address', $address)
            ->where('symbol', $symbol)
            ->where('type', $type)
            ->first();
        $wal_trx = WalletsTransactions::where('user_id', $user->id)
            ->where('symbol', $symbol)
            ->where('wallet_type', $type)
            ->whereIn('type', $wal->type == 'trading' ? ['1', '2', '3', '4', '5', '6', 'FUT', 'TFU', 'TF', 'FT'] : ['1', '2', '3', '4', '5', '6', 'FUF', 'FFU', 'TF', 'FT'])
            ->latest()
            ->get();
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
                if (is_string($wal->addresses)) {
                    $addressesData = json_decode($wal->addresses, true);
                } else {
                    $addressesData = $wal->addresses;
                }


                $chainss = json_decode($curr->networks, true);
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
                if (is_string($wal->addresses)) {
                    $addressesData = json_decode($wal->addresses, true);
                } else {
                    $addressesData = $wal->addresses;
                }

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
                            $adr = (object) $value;
                            $adr->chain = $chains[$key];
                            $adr->network = $chains[$key]['chainName'];
                            $addresses[$key] = $adr;
                        }
                    }
                }
                $curr = KucoinCurrencies::where('symbol', $wal->symbol)->first();
            } else if ($this->provider == 'bitget') {
                $curr = BitgetCurrencies::where('symbol', $wal->symbol)->first();
                if (is_string($wal->addresses)) {
                    $addressesData = json_decode($wal->addresses, true);
                } else {
                    $addressesData = $wal->addresses;
                }


                $chainss = json_decode($curr->networks, true);
                $chains = array_filter($chainss, function ($chain) {
                    return $chain['withdraw'] == true;
                });

                $addresses = null;
                if (is_array($addressesData)) {
                    foreach ($addressesData as $key => $value) {
                        if (array_key_exists($key, $chains)) {
                            $value['chain'] = $chains[$key];
                            $value['network'] = $chains[$key]['network'];
                            $addresses[$key] = $value;
                        }
                    }
                }
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
                'dp' => $dp ?? 0,
            ]);
        }
    }

    public function fetch_wallet_balance(Request $request)
    {
        $type = $request->type;
        $symbol = $request->symbol;
        $provider = $type === 'trading' ? $this->provider : 'funding';

        if (!isWallet(auth()->user()->id, $type, $symbol, $provider)) {
            return response()->json([
                'symbol' => null,
                'balance' => null
            ]);
        }

        $wallet = getWallet(auth()->user()->id, $type, $symbol, $provider);

        return response()->json([
            'symbol' => $wallet->symbol,
            'balance' => $wallet->balance
        ]);
    }


    public function store(Request $request)
    {
        if (isset($request->user_id)) {
            $user = User::find($request->user_id);
        } else {
            $user = auth()->user();
        }

        if ($this->walletExists($user, $request)) {
            return response()->json([
                'type' => 'warning',
                'message' => 'You Have ' . $request->symbol . ' Wallet Already!'
            ]);
        }

        if ($request->type === 'funding') {
            $wallet = $this->createFundingWallet($user, $request);
            return response()->json([
                'type' => 'success',
                'message' => 'Your ' . $wallet->symbol . ' Wallet Created Successfully'
            ]);
        }

        $wallet = $this->createTradingWallet($user, $request);
        $response = $this->generateWalletAddress($wallet, $request);
        if ($response['type'] === 'success') {
            $wallet->save();
        }
        return response()->json($response);
    }

    private function walletExists($user, $request)
    {
        return Wallet::where('provider', $this->provider)
            ->where('user_id', $user->id)
            ->where('type', $request->type)
            ->where('symbol', $request->symbol)
            ->exists();
    }

    private function createTradingWallet($user, $request)
    {
        $wallet = new Wallet();
        $wallet->user_id = $user->id;
        $wallet->symbol = $request->symbol;
        $wallet->type = $request->type;
        $wallet->provider = $this->provider;
        return $wallet;
    }

    private function createFundingWallet($user, $request)
    {
        $wallet = new Wallet();
        $wallet->user_id = $user->id;
        $wallet->symbol = $request->symbol;
        $wallet->address = grs(34);
        $wallet->type = 'funding';
        $wallet->provider = 'funding';
        $wallet->save();
        return $wallet;
    }

    private function generateWalletAddress($wallet, $request)
    {
        try {
            switch ($this->provider) {
                case 'coinbasepro':
                    return $this->generateCoinbaseProAddress($wallet, $request);
                case 'binance':
                case 'binanceus':
                    return $this->generateBinanceAddress($wallet, $request);
                case 'kucoin':
                    return $this->generateKucoinAddress($wallet, $request);
                case "bitget":
                    return $this->generateBitgetAddress($wallet, $request);
                default:
                    return $this->unsupportedProviderError();
            }
        } catch (Throwable $e) {
            return $this->handleError($e);
        }
    }

    private function generateCoinbaseProAddress($wallet, $request)
    {
        try {
            $wallet->address = $this->api->create_deposit_address($request->symbol)['address'];
            $wallet->save();
            return [
                'type' => 'success',
                'message' => 'Your ' . $wallet->symbol . ' Wallet Created Successfully'
            ];
        } catch (Throwable $e) {
            return [
                'type' => 'warning',
                'message' => 'Wallet Generation Failed, Please report to support'
            ];
        }
    }

    private function generateBinanceAddress($wallet, $request)
    {
        $curr = BinanceCurrencies::where('symbol', $request->symbol)->first();
        $chainss = json_decode($curr->networks, true);
        $chains = [];
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
                    return $this->handleError($e);
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
                return $this->handleError($e);
            }
            if (!isset($results)) {
                $results = array();
            }
            $results[$chainName] = $address;
        }
        $results = array_filter($results);
        $addr = json_encode($results);
        $wallet->addresses = $addr;
        try {
            $wallet->address = reset($results)['address'];
            $wallet->save();
            return [
                'type' => 'success',
                'message' => 'Your ' . $wallet->symbol . ' Wallet Created Successfully'
            ];
        } catch (Throwable $e) {
            return $this->handleError($e);
        }
    }

    private function generateKucoinAddress($wallet, $request)
    {
        $response = $this->api->public_get_currencies_currency(array('currency' => $request->symbol));
        $currency = $this->api->safe_value($response, 'data');
        $results = array();
        if ($currency) {
            $chains = $this->api->safe_value($currency, 'chains');
            if ((count($chains) > 1) && ($request->symbol !== 'BNB')) {
                foreach ($chains as $chain) {
                    try {
                        $chainName = $this->api->safe_string($chain, 'chainName');
                        $address = $this->fetch_create_deposit_address($this->api, $request->symbol, $chainName, $chainName);
                        if (!isset($results)) {
                            $results = array();
                        }
                        $results[$chainName] = $address;
                    } catch (\Throwable $th) {
                        //throw $th;
                    }
                }
            } else {
                try {
                    $chain = $this->api->safe_value($chains, 0);
                    $chainName = $this->api->safe_string($chain, 'chainName');
                    $address = $this->fetch_create_deposit_address($this->api, $request->symbol, $chainName);
                    if (!isset($results)) {
                        $results = array();
                    }
                    $results[$chainName] = $address;
                } catch (\Throwable $th) {
                    //throw $th;
                }
            }
            $results = array_filter($results);
            $addr = json_encode($results);
            $wallet->addresses = $addr;
            try {
                $wallet->address = reset($results)['address'];
                $wallet->save();
                return [
                    'type' => 'success',
                    'message' => 'Your ' . $wallet->symbol . ' Wallet Created Successfully'
                ];
            } catch (Throwable $e) {
                return [
                    'type' => 'error',
                    'message' => 'Connection Failed'
                ];
            }
        } else {
            return [
                'type' => 'warning',
                'message' => 'Wallet Generation Failed, Please report to support'
            ];
        }
    }

    private function generateBitgetAddress($wallet, $request)
    {
        $currency = BitgetCurrencies::where('symbol', $request->symbol)->first();
        if (!$currency) {
            return [
                'type' => 'warning',
                'message' => 'Currency not supported: ' . $request->symbol,
            ];
        }
        $networks = json_decode($currency->networks, true);
        $chains = array_filter($networks, function ($network) {
            return $network['withdraw'] == true;
        });
        $results = [];
        foreach ($chains as $chain) {
            $chainName = $chain['network'];
            try {
                $address = $this->api->fetch_deposit_address($request->symbol, ['network' => $chainName]);
            } catch (Throwable $e) {
                return $this->handleError($e);
            }
            $results[$chainName] = $address;
        }
        $results = array_filter($results);
        $results = array_map(function ($address) {
            unset($address['info']);
            return $address;
        }, $results);
        $addr = json_encode($results);
        $wallet->addresses = $addr;
        try {
            $wallet->address = reset($results)['address'];
            $wallet->save();
            return [
                'type' => 'success',
                'message' => 'Your ' . $wallet->symbol . ' Wallet Created Successfully',
            ];
        } catch (Throwable $e) {
            return $this->handleError($e);
        }
    }

    private function unsupportedProviderError()
    {
        return [
            'type' => 'warning',
            'message' => 'Unsupported provider: ' . $this->provider
        ];
    }

    private function handleError(Throwable $e)
    {
        $msg = str_replace($this->provider . ' ', '', $e->getMessage());
        if (in_array($this->provider, ['binance', 'binanceus'])) {
            $decodedMsg = json_decode($msg);
            if ($decodedMsg !== null) {
                $msg = $decodedMsg->msg;
            }
        }
        return [
            'type' => 'warning',
            'message' => 'An error occurred: ' . $msg,
        ];
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
        }

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
                'message' => 'Deposit rejected',
                'deposit_status' => 'rejected',
                'status' => 'rejected'
            ]);
        }

        if ($transaction->status == 3) {
            return response()->json([
                'status' => 'confirmed',
                'deposit_status' => 'completed',
                'message' => 'Deposit confirmed successfully',
                'type' => 'success'
            ]);
        }

        // Get deposits/transactions from provider API
        $collections = collect([]);
        switch ($this->provider) {
            case 'kucoin':
            case 'binance':
            case 'binanceus':
            case 'bitget':
                $collections = collect($this->api->fetch_deposits($transaction->symbol));
                break;
            case 'coinbasepro':
                $collections = collect($this->api->fetch_transactions());
                break;
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
            "charge" => $trx->charge ?? 0,
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

        $fee = (getGen() && isset(getGen()->withdrawResponse_fee)) ? getGen()->withdrawResponse_fee / 100 : 0;
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
            $params = array();
            switch ($this->provider) {
                case 'coinbasepro':
                    try {
                        $withdrawResponse = $this->api->withdraw($request->symbol, $request->amount, $request->recieving_address);
                    } catch (\Throwable $th) {
                        return $this->handleWithdrawalError($user, $request, $wallet, 'Internal error, please try again after 12h');
                    }
                    $withdraw->fee = $withdrawResponse['info']['fee'];
                    $withdraw->trx_id = $withdrawResponse['info']['id'];
                    break;
                case 'binance':
                case 'binanceus':
                    try {
                        if (isset($request->chain)) {
                            $params['network'] = $request->chain;
                            $params['chain'] = $request->chain;
                        }
                        if (isset($request->memo)) {
                            $tag = $request->memo;
                        } else {
                            $tag = null;
                        }
                        $withdrawResponse = $this->api->withdraw($request->symbol, $request->amount, $request->recieving_address, $tag, $params);
                    } catch (\Throwable $th) {
                        preg_match('/"msg":"(.*?)"/', $th->getMessage(), $matches);
                        $message = isset($matches[1]) ? $matches[1] : 'An unknown error occurred.';
                        return $this->handleWithdrawalError($user, $request, $wallet, $message);
                    }
                    $withdraw->trx_id = $withdrawResponse['id'];
                    break;
                case 'bitget':
                    try {
                        if (isset($request->chain)) {
                            $params['network'] = $request->chain;
                            $params['chain'] = $request->chain;
                        }
                        if (isset($request->memo)) {
                            $tag = $request->memo;
                        } else {
                            $tag = null;
                        }
                        $withdrawResponse = $this->extendedApi->withdraw_v2($request->symbol, $request->amount, $request->recieving_address, $tag, $params);
                    } catch (\Throwable $th) {
                        preg_match('/"msg":"(.*?)"/', $th->getMessage(), $matches);
                        $message = isset($matches[1]) ? $matches[1] : 'An unknown error occurred.';
                        return $this->handleWithdrawalError($user, $request, $wallet, $message);
                    }
                    $withdraw->trx_id = $withdrawResponse['id'];
                    break;
                case 'kucoin':
                    $withdraw->memo = $request->memo;
                    $withdraw->chain = $request->chain;

                    try {
                        $transfer_process = $this->api->transfer($request->symbol, $request->amount, 'trade', 'main');
                    } catch (\Throwable $th) {
                        return $this->handleWithdrawalError($user, $request, $wallet, 'Internal error, please try again after 12h');
                    }

                    if (isset($transfer_process['id'])) {
                        if (isset($request->chain)) {
                            $params['network'] = $request->chain;
                        }
                        try {
                            $withdrawResponse = $this->api->withdraw($request->symbol, $request->amount, $request->recieving_address, $request->memo, $params);
                        } catch (\Throwable $th) {
                            return $this->handleWithdrawalError($user, $request, $wallet, 'Internal error, please try again after 12h');
                        }

                        if (isset($withdrawResponse['id'])) {
                            try {
                                $withdrawData = collect($this->api->fetch_withdrawals())->where('id', $withdrawResponse['id'])->first();
                                $withdraw->trx_id = $withdrawResponse['id'];
                                $withdraw->fee = ($request->amount * $fee) + $withdrawData['fee']['cost'];
                            } catch (\Throwable $th) {
                                $withdraw->fee = $fee;
                            }
                        }
                    }
                    break;
                default:
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
            if ($this->provider == 'binance' || $this->provider == 'binanceus' || $this->provider == 'bitget') {
                $wallet_new_trx->fees = ($request->amount * $fee) + $request->fee;
            } else {
                $wallet_new_trx->fees = $withdraw->fee;
            }
            $wallet_new_trx->save();
            $wallet_new_trx->clearCache();

            createAdminNotification($user->id, 'New Withdraw From ' . $user->username, route('admin.withdraw.log'));

            try {
                notify($user, 'withdrawResponse', [
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

    public function transfer(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'symbol' => 'required',
            'target' => 'required',
            'source' => 'required',
        ], [
            'amount.required' => 'Amount is required',
            'symbol.required' => 'Symbol is required',
        ]);

        $user = Auth::user();

        switch ($request->source) {
            case 'funding':
                $from = Wallet::where('user_id', $user->id)->where('provider', 'funding')->where('type', $request->source)->where('symbol', $request->symbol)->first();
                $transactionType = 'F';
                break;
            case 'trading':
                $from = Wallet::where('user_id', $user->id)->where('provider', $this->provider)->where('type', $request->source)->where('symbol', $request->symbol)->first();
                $transactionType = 'T';
                break;
            case 'futures':
                $from = FutureWallets::where('user_id', $user->id)->where('provider', $this->futuresProvider)->where('symbol', $request->symbol)->first();
                $transactionType = 'FU';
                break;
            default:
                break;
        }

        switch ($request->target) {
            case 'funding':
                $to = Wallet::where('user_id', $user->id)->where('provider', 'funding')->where('type', $request->target)->where('symbol', $request->symbol)->first();
                $transactionType .= 'F';
                break;
            case 'trading':
                $to = Wallet::where('user_id', $user->id)->where('provider', $this->provider)->where('type', $request->target)->where('symbol', $request->symbol)->first();
                $transactionType .= 'T';
                break;
            case 'futures':
                $to = FutureWallets::where('user_id', $user->id)->where('symbol', $request->symbol)->first();
                $transactionType .= 'FU';
                break;
            default:
                break;
        }

        if (!$from || !$to) {
            return response()->json(
                [
                    'type' => 'error',
                    'message' => 'Invalid input'
                ]
            );
        }

        if ($request->amount > $from->balance) {
            return response()->json(
                [
                    'type' => 'error',
                    'message' => 'Amount is higher than your wallet balance'
                ]
            );
        }

        if (($request->source === 'futures' || $request->target === 'futures') && $this->futuresProvider == 'kucoinfutures') {
            try {
                $this->api->transfer($request->symbol, $request->amount, $request->source === 'futures' ? 'future' : 'spot', $request->target === 'futures' ? 'future' : 'main');
            } catch (Exception $e) {
                return response()->json(
                    [
                        'type' => 'error',
                        'message' => 'Transfer failed, Error code: ' . $transactionType . 'T'
                    ]
                );
            }
            if ($request->source === 'futures' && $request->target === 'trading') {
                try {
                    $this->api->transfer($request->symbol, $request->amount, 'main', 'trade');
                } catch (Exception $e) {
                    return response()->json(
                        [
                            'type' => 'error',
                            'message' => 'Transfer failed, Error code: MST'
                        ]
                    );
                }
            }
        }

        $transfer = new Transaction();
        $transfer->user_id = $user->id;
        $transfer->amount = getAmount($request->amount);
        $transfer->post_balance = getAmount($request->balance);
        $transfer->charge = 0;
        $transfer->trx_type = '-';
        $transfer->details = 'Transfer of ' . $request->amount . ' ' . $request->symbol . ' from ' . $request->source . ' to ' . $request->target . ' wallet';
        $transfer->trx = getTrx();
        $transfer->save();
        $transfer->clearCache();

        if ($request->source === 'funding' && $request->target === 'trading') {
            $status = 2;
        } else {
            $status = 1;
        }

        $wallet_new_trx = new WalletsTransactions();
        $wallet_new_trx->user_id = $transfer->user_id;
        $wallet_new_trx->symbol = $request->symbol;
        $wallet_new_trx->amount = $transfer->amount;
        $wallet_new_trx->amount_recieved = $transfer->amount;
        $wallet_new_trx->charge = 0;
        $wallet_new_trx->to = $to->address;
        $wallet_new_trx->type = $transactionType;
        $wallet_new_trx->status = $status;
        $wallet_new_trx->trx = $transfer->trx;
        $wallet_new_trx->wallet_type = $request->source;
        $wallet_new_trx->details = 'Transfer of ' . $request->amount . ' ' . $request->symbol . ' from ' . $request->source . ' to ' . $request->target . ' wallet';
        $wallet_new_trx->save();
        $wallet_new_trx->clearCache();

        $from->balance -= $request->amount;
        if ($request->source === 'futures') {
            $from->available -= $request->amount;
        }
        $from->save();

        if ($request->source !== 'funding' && $request->target !== 'trading') {
            $to->balance += $request->amount;
            if ($request->target === 'futures') {
                $to->available += $request->amount;
            }
            $to->save();
        }

        if ($request->target === 'trading') {
            createAdminNotification($user->id, 'New Transfer From ' . $user->username, route('admin.report.wallet'));
        }

        return response()->json(
            [
                'type' => 'success',
                'message' => 'Balance Transferred Successfully'
            ]
        );
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
