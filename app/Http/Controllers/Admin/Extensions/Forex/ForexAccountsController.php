<?php

namespace App\Http\Controllers\Admin\Extensions\Forex;

use App\Http\Controllers\Controller;
use App\Models\Forex\ForexAccounts;
use App\Models\Forex\ForexLogs;
use App\Models\Forex\ForexSignals;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;

class ForexAccountsController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('forex_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $page_title = 'Forex Accounts';
        $signals = (new ForexSignals)->getCache()->where('status', 1);

        $usersWithoutForexAccount = User::whereDoesntHave('forex_account')->get();

        return view('extensions.admin.forex.index', compact('page_title', 'signals', 'usersWithoutForexAccount'));
    }

    public function edit($id)
    {
        abort_if(Gate::denies('forex_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $account = ForexAccounts::findOrFail($id);
        $signals = ForexSignals::where('status', 1)->get();
        $page_title = 'Forex Account Editor';
        return view('extensions.admin.forex.edit', compact('page_title', 'account', 'signals'));
    }

    public function store(Request $request)
    {

        $account = new ForexAccounts();
        $account->user_id = $request->user_id;
        $account->save();
        $notify[] = ['success', 'Forex Account has been created successfully'];

        return responseJson($notify[0][0], $notify[0][1]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'password' => 'required|max:80',
            'number' => 'required|numeric',
            'balance' => 'required|numeric',
            'broker' => 'required',
            'mt' => 'required',
        ]);

        $account = ForexAccounts::findOrFail($request->id);
        $account->update([
            'number' => $request->number,
            'password' => $request->password,
            'balance' => $request->balance,
            'broker' => $request->broker,
            'mt' => $request->mt,
            'signal1_id' => $request->signal1_id,
            'signal2_id' => $request->signal2_id,
            'signal3_id' => $request->signal3_id,
            'signal4_id' => $request->signal4_id,
            'signal5_id' => $request->signal5_id,
            'status' => $request->status,
        ]);

        $notify[] = ['success', 'Forex Account has been Updated'];
        return back()->withNotify($notify);
    }

    public function verify(Request $request)
    {
        $log = ForexLogs::findOrFail($request->id);
        $account = ForexAccounts::where('user_id', $log->user_id)->first();
        $wallet = Wallet::where('user_id', $log->user_id)->where('symbol', $log->wallet_symbol)->where('provider', 'funding')->first();
        if (!$account) {
            return responseJson('error', 'Account not found');
        }

        if (!$wallet) {
            return responseJson('error', 'Wallet not found');
        }

        try {
            if ($log->type == 1) {
                $account->balance += $log->amount;
            } else if ($log->type == 2) {
                $wallet->balance += $log->amount / getCoinRate($log->wallet_symbol);
            }
            $account->save();
            $wallet->save();
            $log->status = 1;
            $log->save();

            $notify[] = ['success', 'Transaction has been approved successfully'];
        } catch (\Throwable $th) {
            return responseJson('error', $th->getMessage());
        }

        return responseJson($notify[0][0], $notify[0][1]);
    }



    public function log()
    {
        abort_if(Gate::denies('forex_log'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = "Forex Logs";
        return view('extensions.admin.forex.log', compact('page_title'));
    }
}
