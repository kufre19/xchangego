<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Providers\ProviderInstallController;
use App\Http\Controllers\Controller;
use App\Models\ThirdpartyProvider;
use App\Models\ThirdpartyTransactions;
use App\Models\WalletsTransactions;
use Illuminate\Http\Request;
use Throwable;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;


class ThirdpartyController extends Controller
{
    public $api;
    public $provider;

    public function __construct()
    {
        $thirdparty = getProvider();
        if ($thirdparty) {
            $exchange_class = "\\ccxt\\$thirdparty->title";
            $this->api = new $exchange_class(array(
                'apiKey' => $thirdparty->api,
                'secret' => $thirdparty->secret,
                'password' => $thirdparty->password,
                'options' => array(
                    'adjustForTimeDifference' => True
                ),
            ));
            $this->provider = $thirdparty->title;
        } else {
            $this->provider = null;
        }
        #$this->api->set_sandbox_mode('enable');
    }

    public function index()
    {
        abort_if(Gate::denies('providers_manager_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = 'Providers';
        $providers = ThirdpartyProvider::get()->sortBy('development');
        $empty_message = 'No Provider Available';
        if ($this->provider != null) {
            try {
                $this->api->fetch_balance();
                $connection = "1";
            } catch (Throwable $e) {
                $connection = "0";
            }
        } else {
            $connection = "2";
        }
        $api = new ProviderInstallController;
        return view('admin.provider.index', compact('page_title', 'providers', 'empty_message', 'connection', 'api'));
    }

    public function edit($id)
    {
        abort_if(Gate::denies('provider_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $provider = ThirdpartyProvider::where('id', $id)->first();
        $page_title = $provider->title . ' Editor';
        if ($this->provider != null) {
            $api = $this->api;
        } else {
            $api = null;
        }
        return view('admin.provider.edit', compact('page_title', 'provider', 'api'));
    }

    public function balances($id)
    {
        abort_if(Gate::denies('provider_balances_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $provider = ThirdpartyProvider::where('id', $id)->first();
        $page_title = $provider->title . ' Balances';
        $empty_message = 'No Balance Yet';
        if ($this->provider != null) {
            $api = $this->api;
            $currencies = $api->fetch_balance();
            unset($currencies['info']);
        } else {
            $api = null;
        }
        return view('admin.provider.balance', compact('page_title', 'provider', 'currencies', 'api', 'empty_message'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'api' => 'required',
            'secret' => 'required',
        ]);

        $provider = ThirdpartyProvider::findOrFail($request->id);
        $provider->api = $request->api;
        $provider->secret = $request->secret;
        $provider->password = $request->password;
        $request->merge(['status' => isset($request->status) ? 1 : 0]);
        $provider->status = $request->status;
        $provider->save();
        $provider->clearCache();

        $notify[] = ['success', 'Provider has been Updated'];
        return back()->withNotify($notify);
    }

    public function activate(Request $request)
    {
        $provider = ThirdpartyProvider::where('id', $request->id)->first();
        if ($this->provider != null) {
            if ($provider->status != 1) {
                $active = ThirdpartyProvider::where('status', 1)->first();
                $active->status = 0;
                $active->save();
                $provider->clearCache();
            }
        }
        $provider->status = 1;
        $provider->save();
        $provider->clearCache();
        $notify[] = ['success', $provider->name . ' has been activated'];
        return response()->json(
            [
                'success' => true,
                'type' => $notify[0][0],
                'message' => $notify[0][1]
            ]
        );
    }

    public function deactivate(Request $request)
    {
        try {
            $provider = ThirdpartyProvider::where('id', $request->id)->first();
            $provider->status = 0;
            $provider->save();
            $provider->clearCache();
            $notify[] = ['success', $provider->name . ' has been deactivated'];
        } catch (\Throwable $th) {
            return response()->json(
                [
                    'success' => true,
                    'type' => 'error',
                    'message' => $th
                ]
            );
        }
        return response()->json(
            [
                'success' => true,
                'type' => $notify[0][0],
                'message' => $notify[0][1]
            ]
        );
    }

    public function currencies($id)
    {
        abort_if(Gate::denies('provider_currencies_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = 'Currencies';
        return view('admin.provider.currencies', compact('page_title', 'id'));
    }

    public function markets($id, Request $request)
    {
        abort_if(Gate::denies('provider_markets_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $page_title = 'Markets';
        $provider = ThirdpartyProvider::findOrFail($id)->title;
        $jsonString = file_get_contents(public_path('data/markets/markets.json'));
        $marketPairs = json_decode($jsonString, true);
        $empty_message = 'No Markets Available';

        // Convert the multidimensional $marketPairs array into a flat array
        $markets = array_reduce($marketPairs, function ($carry, $pair) {
            return array_merge($carry, $pair);
        }, []);

        // Get the search term from the request
        $searchTerm = $request->input('searchTerm');

        if ($searchTerm) {
            // Use array_filter to search the markets
            $markets = array_filter($markets, function ($market) use ($searchTerm) {
                return strpos($market['symbol'], $searchTerm) !== false;
            });
        }

        // Define how many items we want to be visible in each page
        $perPage = 50;

        // Slice the collection to get the items to display in current page
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $currentItems = array_slice($markets, ($currentPage * $perPage) - $perPage, $perPage);

        // Create our paginator and add it to the view
        $markets = new LengthAwarePaginator($currentItems, count($markets), $perPage, $currentPage, ['path' => $request->url(), 'query' => $request->query()]);

        return view('admin.provider.markets', compact('page_title', 'markets', 'empty_message', 'id', 'searchTerm'));
    }

    public function market_activate(Request $request)
    {
        $jsonString = file_get_contents(public_path('data/markets/markets.json'));
        $datas = json_decode($jsonString, true);
        $datas[getPair($request->symbol)[1]][$request->symbol]['active'] = true;
        $newJsonString = json_encode($datas, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        file_put_contents(public_path('data/markets/markets.json'), stripslashes($newJsonString));
        $notify[] = ['success', 'Market has been activated'];

        return response()->json(
            [
                'success' => true,
                'type' => $notify[0][0],
                'message' => $notify[0][1]
            ]
        );
    }

    public function market_deactivate(Request $request)
    {
        $jsonString = file_get_contents(public_path('data/markets/markets.json'));
        $datas = json_decode($jsonString, true);
        $datas[getPair($request->symbol)[1]][$request->symbol]['active'] = false;
        $newJsonString = json_encode($datas, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        file_put_contents(public_path('data/markets/markets.json'), stripslashes($newJsonString));
        $notify[] = ['success', 'Market has been deactivated'];

        return response()->json(
            [
                'success' => true,
                'type' => $notify[0][0],
                'message' => $notify[0][1]
            ]
        );
    }

    public function bulk_market_activate(Request $request)
    {
        $symbols = explode(',', $request->symbols);
        $jsonString = file_get_contents(public_path('data/markets/markets.json'));
        $datas = json_decode($jsonString, true);

        foreach ($symbols as $symbol) {
            if (!$datas[getPair($symbol)[1]][$symbol]['active']) {
                $datas[getPair($symbol)[1]][$symbol]['active'] = true;
            }
        }

        $newJsonString = json_encode($datas, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        file_put_contents(public_path('data/markets/markets.json'), stripslashes($newJsonString));

        return response()->json([
            'success' => true,
            'type' => 'success',
            'message' => 'Selected markets have been activated.'
        ]);
    }

    public function bulk_market_deactivate(Request $request)
    {
        $symbols = explode(',', $request->symbols);
        $jsonString = file_get_contents(public_path('data/markets/markets.json'));
        $datas = json_decode($jsonString, true);

        foreach ($symbols as $symbol) {
            if ($datas[getPair($symbol)[1]][$symbol]['active']) {
                $datas[getPair($symbol)[1]][$symbol]['active'] = false;
            }
        }

        $newJsonString = json_encode($datas, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        file_put_contents(public_path('data/markets/markets.json'), stripslashes($newJsonString));

        return response()->json([
            'success' => true,
            'type' => 'success',
            'message' => 'Selected markets have been deactivated.'
        ]);
    }


    public function refresh()
    {
        $curl3 = curl_init(route('provider.marketsToTable'));
        curl_setopt($curl3, CURLOPT_RETURNTRANSFER, true);
        curl_exec($curl3);
        $notify[] = ['success', 'Provider Markets Refreshed Successfully'];
        return back()->withNotify($notify);
    }

    public function removeDeposit($id)
    {
        $deposit = ThirdpartyTransactions::findOrFail($id);
        $deposit->delete();
        $notify[] = ['success', 'Deposit Removed Successfully'];
        return back()->withNotify($notify);
    }

    public function market_delete(Request $request)
    {
        $newJsonString = '{}';
        file_put_contents(public_path('data/markets/markets.json'), stripslashes($newJsonString));
        $notify[] = ['success', 'Markets has been cleaned'];

        return back()->withNotify($notify);
    }

    public function confirmDeposit(Request $request)
    {
        try {
            $transaction = ThirdpartyTransactions::findOrFail($request->id);

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
            $wallet_new_trx->amount = $request->amount;
            $wallet_new_trx->amount_recieved = $request->amount;
            $wallet_new_trx->charge = $request->fee;
            $wallet_new_trx->trx = $transaction->trx_id ?? $transaction->address;
            $wallet_new_trx->save();
            $wallet_new_trx->clearCache();

            $transaction->status = 3;
            $transaction->amount = $request->amount;
            $transaction->fee = $request->fee;
            $transaction->trx_id = $wallet_new_trx->trx;
            $transaction->save();

            $wallet = getWallet($transaction->user_id, 'trading', $transaction->symbol, $this->provider);
            $wallet->balance += $request->amount;
            $wallet->save();

            if ($this->provider == 'kucoin') {
                try {
                    $this->api->transfer($transaction->symbol, $request->amount, 'main', 'trade');
                } catch (\Throwable $th) {
                    createAdminNotification($transaction->user_id, $th->getMessage(), route('admin.report.wallet'));
                }
            }

            $trx = createTransaction($wallet, $transaction->amount, '+', 'Deposit of ' . $transaction->amount . ' ' . $transaction->symbol, $transaction->trx_id);
            createAdminNotification($transaction->user_id, 'Deposit Confirmed For ' . $trx->user->username, route('admin.report.wallet'));
            notify($trx->user, 'TRADING_WALLET_DEPOSIT_SUCCESSFUL', [
                'username' => $trx->user->username,
                'site_name' => getNotify()->site_name,
                "amount" => $trx->amount,
                "currency" => $trx->currency,
                "trx" => $trx->trx,
                "post_balance" => $trx->post_balance,
                "charge" => $trx->charge,
            ]);
        } catch (\Throwable $th) {
            return response()->json(
                [
                    'type' => 'error',
                    'message' => $th->getMessage()
                ]
            );
        }

        return response()->json(
            [
                'type' => 'success',
                'message' => 'Deposit Removed Successfully'
            ]
        );
    }
}
