<?php

namespace App\Http\Controllers\Extensions\Futures;

use App\Http\Controllers\Controller;
use App\Models\Futures\FutureCurrencies;
use App\Models\Futures\FutureOrder;
use App\Models\Futures\FutureWallets;
use App\Models\WalletsTransactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WalletController extends Controller
{
    public $api;
    public $provider;
    public function __construct()
    {
        $futureProvider = getProviderFutures();
        if ($futureProvider != null) {

            $futureClass = "\\ccxt\\$futureProvider->title";
            if ($futureProvider->title == 'kucoinfutures') {
                $this->api = new $futureClass(array(
                    'apiKey' => $futureProvider->api,
                    'secret' => $futureProvider->secret,
                    'password' => $futureProvider->password,
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
            } else if ($futureProvider->title == 'binanceusdm' || $futureProvider->title == 'binancecoinm') {
                $this->api = new $futureClass(array(
                    'apiKey' => $futureProvider->api,
                    'secret' => $futureProvider->secret,
                    'password' => $futureProvider->password,
                    'options' => array(
                        'adjustForTimeDifference' => true,
                        'recvWindow' => 30000,
                    ),
                ));
            } else {
                $this->api = new $futureClass(array(
                    'apiKey' => $futureProvider->api,
                    'secret' => $futureProvider->secret,
                    'password' => $futureProvider->password,
                ));
            }
            $this->provider = $futureProvider->title;
        } else {
            $this->provider = null;
        }
    }

    public function fetch($symbol)
    {
        $user = Auth::user();
        $wallet = FutureWallets::where('user_id', $user->id)->where('symbol', $symbol)->first();

        // Fetch FutureOrder transactions
        $futureOrderTransactions = FutureOrder::where('user_id', $user->id)->where('symbol', $symbol)->get();

        // Fetch WalletsTransactions with specific types
        $walletTransactions = WalletsTransactions::where('user_id', $user->id)
            ->where('symbol', $symbol)
            ->whereIn('type', ['FUT', 'FUF', 'TFU', 'FFU'])
            ->latest()
            ->get();

        // Merging transactions
        $transactions = $futureOrderTransactions->concat($walletTransactions);

        return response()->json([
            'wallet' => $wallet,
            'transactions' => $transactions,
        ]);
    }

    public function balance(Request $request)
    {
        $user = Auth::user();
        $wallet = FutureWallets::where('user_id', $user->id)->where('symbol', $request->symbol)->first();
        if (!$wallet) {
            return response()->json([
                'symbol' => null,
                'balance' => null
            ]);
        }
        return response()->json([
            'symbol' => $wallet->symbol,
            'balance' => $wallet->available
        ]);
    }


    public function wallets($user_id)
    {
        $futureCurrencies = FutureCurrencies::where('status', 1)->where('provider', $this->provider)->get();
        $futureWallets = FutureWallets::where('user_id', $user_id)->get();

        $futureCurrenciesWithWallets = $futureCurrencies->map(function ($currency) use ($futureWallets) {
            $currencyWallet = $futureWallets->where('symbol', $currency->symbol)->first();
            if ($currencyWallet) {
                $currency->wallet = $currencyWallet;
            }
            return $currency;
        });

        return $futureCurrenciesWithWallets;
    }

    public function store(Request $request)
    {
        $request->validate([
            'symbol' => 'required',
        ], [
            'symbol.required' => 'Symbol is required',
        ]);

        $user = Auth::user();
        $futureWallet = FutureWallets::where('user_id', $user->id)->where('symbol', $request->symbol)->first();
        if ($futureWallet) {
            return response()->json(['type' => 'warning', 'message' => 'Wallet already exists']);
        } else {
            $currency = FutureCurrencies::where('symbol', $request->symbol)->where('provider', $this->provider)->first();
            if (!$currency) {
                return response()->json(['type' => 'error', 'message' => 'Currency not found']);
            }
            $futureWallet = new FutureWallets();
            $futureWallet->user_id = $user->id;
            $futureWallet->symbol = $request->symbol;
            $futureWallet->type = $currency->type;
            $futureWallet->provider = $this->provider;
            $futureWallet->save();
        }
        return response()->json(['type' => 'success', 'message' => 'Wallet updated successfully']);
    }
}
