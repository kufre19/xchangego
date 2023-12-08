<?php

namespace App\Http\Controllers\Extensions\Forex;

use App\Http\Controllers\Controller;
use App\Models\Extension;
use App\Models\Forex\ForexAccounts;
use App\Models\Forex\ForexInvestments;
use App\Models\Forex\ForexLogs;
use App\Models\Forex\ForexSignals;
use App\Models\GeneralSetting;
use App\Models\Wallet;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ForexController extends Controller
{
    public function fetch_info()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User not authenticated', 'type', 'error']);
        }

        $logs = (new ForexLogs)->getCached($user->id);
        $investment_logs = (new ForexLogs)->getCachedType($user->id, 3);
        $investments = (new ForexInvestments)->getEnabled();
        $account = ForexAccounts::where('user_id', $user->id)->first();

        if (!$account) {
            $account = new ForexAccounts();
            $account->user_id = $user->id;
            $account->balance = 0;
            $account->status = 0;
            $account->save();
        }

        $signals = [];
        for ($i = 1; $i < 6; $i++) {
            $signal = ForexSignals::where('id', $account['signal' . $i . '_id'])->first();
            if ($signal) {
                $signals[] = $signal;
            }
        }

        $account->signals = arrayToObject($signals);

        return response()->json([
            'account' => $account,
            'forex_logs' => (new ForexLogs)->getCacheLimit(10, $user->id),
            'forex_log' => $logs->sum('profit'),
            'forex_investment' => $investments,
            'investment' => $investment_logs->first(),
            'investment_logs' => $investment_logs,
            'investment_logs_amount' => $investment_logs->sum('amount'),
            'investment_logs_profit' => $investment_logs->where('status', 1)->sum('profit'),
            'wallets' => Wallet::where('user_id', $user->id)->where('type', 'funding')->get(),
            'wallet' => getWallet($user->id, 'funding', 'USDT', 'funding'),
        ]);
    }



    public function fetch_trade()
    {
        $page_title = '';
        $account = ForexAccounts::where('user_id', auth()->user()->id)->first();
        return view('user.forex.mt', compact('page_title', 'account'));
    }

    public function create()
    {
        $user = Auth::user();
        $account = new ForexAccounts();
        $account->user_id = $user->id;
        $account->balance = 0;
        $account->status = 0;
        $account->save();

        return response()->json(
            [
                'success' => true,
                'type' => 'success',
                'meta' => $account,
                'message' => 'Forex Account Created Successfully'
            ]
        );
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'amount' => 'required|numeric',
            'investment_id' => 'required|exists:forex_investments,id',
        ]);

        if ($validate->fails()) {
            $notify[] = ['warning', 'Please Select Investment Amount and Duration.'];
            return back()->withNotify($notify);
        }

        $user = Auth::user();
        $wallet = getWallet($user->id, 'funding', $request->symbol, 'funding');
        $investment = ForexInvestments::where('id', $request->investment_id)->first();

        if ($request->amount > $wallet->balance) {
            $notify[] = ['warning', 'Your Account Balance ' . getAmount($wallet->balance) . ' ' . $wallet->symbol . ' Not Enough! Please Deposit Money'];
            return back()->withNotify($notify);
        }

        $wallet->balance -= $request->amount;
        $wallet->save();

        $forex_log = $this->createForexInvestmentLog($user->id, $request, $investment);
        createAdminNotification($user->id, 'New Forex Investment from ' . $user->username, route('admin.forex.investment.log.list'));
        $transaction = createTransaction($wallet, $forex_log->amount, '-', 'Forex Investment', $forex_log->trx);

        notify($transaction->user, 'FOREX_INVESTMENT_SUBSCRIBED_SUCCESSFUL', [
            "amount" => $forex_log->amount,
            "currency" => $request->symbol,
            "title" => $investment->title,
            "trx" => $transaction->trx,
            "post_balance" => $transaction->post_balance,
            "duration" => $investment->duration,
            "end_date" => $forex_log->end_date
        ]);

        if (Extension::where('id', 3)->first()->status == 1 && getPlatform('mlm')->forex_investment == 1 && $user->ref_by != null) {
            if (getPlatform('mlm')->commission_type == 'daily') {
                BVstore($user, 8, getCoinRate($wallet->symbol) * $request->amount, $forex_log->id, $investment->duration, true);
            } else {
                BVstore($user, 8, getCoinRate($wallet->symbol) * $request->amount);
            }
        }

        return responseJson('success', 'Your Forex Investment Started Successfully', [
            'meta' => ForexLogs::where('user_id', $user->id)->latest()->limit(10)->get(),
        ]);
    }

    function createForexInvestmentLog($user_id, $request, $investment)
    {
        $forex_log = new ForexLogs();
        $forex_log->user_id = $user_id;
        $forex_log->investment_id = $request->investment_id;
        $forex_log->type = '3';
        $forex_log->amount = $request->amount * getCoinRate($request->symbol);
        $forex_log->status = '0';
        $forex_log->duration = $investment->duration;
        $forex_log->start_date = Carbon::now();
        $forex_log->end_date = Carbon::now()->addDays($investment->duration);
        $forex_log->trx = getTrx();
        $forex_log->save();

        return $forex_log;
    }

    public function deposit(Request $request)
    {
        $user = Auth::user();
        $wallet = getWallet($user->id, 'funding', $request->symbol, 'funding');
        $requestedAmount = $request->amount;

        if ($requestedAmount > $wallet->balance) {
            return responseJson('error', 'Your Account Balance ' . getAmount($wallet->balance) . ' ' . $wallet->symbol . ' Not Enough! Please Deposit Firstly');
        }

        $wallet->balance -= $requestedAmount;
        $wallet->save();

        $forex_log = $this->createForexLog($user->id, 1, $request->symbol, $requestedAmount);
        $forex_log->clearCache();

        createAdminNotification($user->id, 'New Forex Deposit from ' . $user->username, route('admin.forex.log.list'));
        $transaction = createTransaction($wallet, $forex_log->amount, '+', 'Forex Deposit', $forex_log->trx);


        notify($transaction->user, 'FOREX_DEPOSIT_SUCCESSFUL', [
            "amount" => $forex_log->amount,
            "currency" => getCurrency()->symbol,
            "trx" => $transaction->trx,
            "post_balance" => $transaction->post_balance
        ]);

        if (Extension::where('id', 3)->first()->status == 1 && getPlatform('mlm')->forex_deposit == 1 && $user->ref_by != null) {
            BVstore($user, 7, getCoinRate($wallet->symbol) * $requestedAmount);
        }

        return responseJson('success', 'Forex Deposited Successfully');
    }

    function createForexLog($user_id, $type, $currencySymbol, $amount)
    {
        $forex_log = new ForexLogs();
        $forex_log->user_id = $user_id;
        $forex_log->type = $type;
        $forex_log->wallet_symbol = $currencySymbol;
        $forex_log->amount = $type == 1 ? getCoinRate($currencySymbol) * $amount : $amount;
        $forex_log->status = '0';
        $forex_log->trx = getTrx();
        $forex_log->save();

        return $forex_log;
    }


    public function withdraw(Request $request)
    {
        $user = Auth::user();
        $wallet = getWallet($user->id, 'funding', $request->symbol, 'funding');
        $account = ForexAccounts::where('user_id', $user->id)->first();

        if ($request->amount > $account->balance) {
            return responseJson('error', 'Your Account Balance ' . getAmount($account->balance) . ' Not Enough! Please Deposit Firstly');
        }

        $forex_log = $this->createForexLog($user->id, 2, $request->symbol, $request->amount);
        createAdminNotification($user->id, 'New Forex Withdraw from ' . $user->username, route('admin.forex.log.list'));

        $transaction = createTransaction($wallet, $request->amount, "-", 'Forex Withdraw', $forex_log->trx);
        $account->balance -= $request->amount;
        $account->save();

        notify($transaction->user, 'FOREX_WITHDRAW_SUCCESSFUL', [
            "amount" => $forex_log->amount,
            "currency" => getCurrency()->symbol,
            "trx" => $transaction->trx,
            "post_balance" => $transaction->post_balance
        ]);

        return responseJson('success', 'Forex Withdraw Placed Successfully');
    }


    public function ForexResult()
    {
        $forex_logs = ForexLogs::where('status', 2)->where('result', '>', 3)->where('end_date', '<=', Carbon::now())->get();
        $gnl = GeneralSetting::first();
        $gnl->last_cron_run =  Carbon::now();
        $gnl->save();

        foreach ($forex_logs as $forex_log) {
            $account = $forex_log->user->forexAccount;
            $amount = $forex_log->amount;
            $profit = $forex_log->profit;

            switch ($forex_log->result) {
                case 4:
                    $account->balance += $amount + $profit;
                    $forex_log->result = 1;
                    break;
                case 5:
                    $account->balance += $amount - $profit;
                    $forex_log->result = 2;
                    break;
                case 6:
                    $account->balance += $amount;
                    $forex_log->result = 3;
                    break;
            }

            $account->save();
            $forex_log->status = 1;
            $forex_log->save();
        }

        cronLastRun('forex_returns');
    }

    public function ForexMissed()
    {
        $forex_logs = ForexLogs::where('status', 0)->where('result', '<', 4)->get();
        $gnl = GeneralSetting::first();
        $gnl->last_cron_run =  Carbon::now();
        $gnl->save();

        foreach ($forex_logs as $forex_log) {
            $forex = $forex_log->investment;
            $result_missed = $forex->result_missed;

            $forex_log->result = $result_missed + 3;
            $forex_log->status = 2;

            if ($result_missed !== 3) {
                $forex_log->profit = $forex_log->amount * ($forex->profit_missed / 100);
            } else {
                $forex_log->profit = 0;
            }

            $forex_log->save();
        }

        (new ForexLogs)->clearCache();

        cronLastRun('forex_missed');
    }
}
