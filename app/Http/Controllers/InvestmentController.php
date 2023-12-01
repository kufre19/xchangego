<?php

namespace App\Http\Controllers;

use App\Models\InvestmentLog;
use App\Models\InvestmentPlans;
use App\Models\Transaction;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class InvestmentController extends Controller
{


    public function index(): JsonResponse
    {
        $user = Auth::user();
        $logs = InvestmentLog::with('plan')->where('user_id', $user->id)->get();
        $totalInvested = $logs->where('status', '!=', 3)->sum('amount');
        $totalProfit = $logs->sum('profit');
        $todayProfit = $logs->sum(function ($log) {
            return $log->calculateDailyProfit();
        });

        return response()->json([
            'status' => 'success',
            'plans' => InvestmentPlans::where('status', 1)->get(),
            'logs' => $logs,
            'totalProfit' => number_format($totalProfit, 2, '.', ''),
            'todayProfit' => number_format($todayProfit, 2, '.', ''),
            'totalInvested' => $totalInvested,
            'wallet' => getWallet($user->id, 'funding', 'USDT', 'funding'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'investment_plan_id' => 'required',
            'amount' => 'required|numeric',
        ]);

        $user = Auth::user();
        $plan = InvestmentPlans::findOrFail($request->investment_plan_id);
        $wallet = getWallet($user->id, 'funding', 'USDT', 'funding');

        if ($wallet->balance < $request->amount) {
            return response()->json(['status' => false, 'message' => 'Insufficient balance', 'type' => 'error']);
        }

        if ($request->amount < $plan->min_amount || $request->amount > $plan->max_amount) {
            return response()->json(['type' => 'error', 'message' => 'Investment amount should be between ' . $plan->min_amount . ' and ' . $plan->max_amount]);
        }
        $log = new InvestmentLog();
        $log->investment_plan_id = $request->investment_plan_id;
        $log->user_id = $user->id;
        $log->wallet_id = $wallet->id;
        $log->amount = $request->amount;
        $log->status = 1;
        $log->end_date = now()->addDays($plan->duration_in_days);
        $log->trx = getTrx();
        $log->save();

        // Update the user's wallet balance
        $wallet->balance -= $request->amount;
        $wallet->save();

        // Create a new transaction log
        $details = 'Investment of ' . $request->amount . ' USDT in plan ' . $plan->name;
        createTransaction($wallet, $request->amount, "-", $details, $log->trx);

        $plan->increment('total_investors', 1);

        createAdminNotification($user->id, 'New Investment from ' . $user->username, route('admin.investment.logs.index'));

        notify($user, 'INVESTMENT_SUBSCRIBED_SUCCESSFUL', [
            "amount" => $log->amount,
            "currency" => $wallet->symbol,
            "title" => $plan->name,
            "trx" => $log->trx,
            "post_balance" => $wallet->balance,
            "duration" => $plan->duration_in_days,
            "end_date" => $log->end_date
        ]);

        return response()->json(['message' => 'Investment added successfully', 'type' => 'success']);
    }


    public function cancel(Request $request)
    {
        $log = InvestmentLog::where('id', $request->id)->first();

        if ($log && $log->status == 1) {
            try {
                // Refund wallet balance
                $wallet = getWallet($log->user_id, 'funding', 'USDT', 'funding');
                $wallet->increment('balance', $log->amount);
                $new_trx = getTrx();
                createTransaction($wallet, $log->amount, '+', 'Investment Cancelled & Refunded', $new_trx);

                $transaction = Transaction::where('trx', $log->trx)->first();
                $transaction->delete();

                $plan = InvestmentPlans::findOrFail($log->investment_plan_id);
                $plan->decrement('total_investors', 1);

                $log->status = 3;
                $log->save();

                createAdminNotification($log->user_id, 'Investment Cancelled & Refunded from ' . $log->user->username, route('admin.investment.logs.index'));

                return response()->json(['message' => 'Investment cancelled successfully', 'type' => 'success']);
            } catch (\Throwable $th) {
                return response()->json(['message' => $th->getMessage(), 'type' => 'error']);
            }
        }

        return response()->json(['message' => 'Unable to cancel investment', 'type' => 'error']);
    }



    public function destroy(Request $request, InvestmentLog $investment)
    {
        $investment->status = 3;
        $investment->save();
        return redirect()->route('investments.index')
            ->with('success', 'Investment deleted successfully.');
    }

    public function cron()
    {
        $now = Carbon::now();
        try {
            $logs = InvestmentLog::where('status', 1)->get();
            foreach ($logs as $log) {
                // If last_profit_calculation is null and end_date has passed
                if ($log->last_profit_calculation == null && $log->end_date <= $now) {
                    // Calculate the number of days between the created_at and end_date
                    $total_days = $log->created_at->diffInDays($log->end_date);

                    // Calculate the profit for the total_days
                    $profit = $log->amount * ($log->plan->interest_rate / 100) * $total_days;

                    // Save profit and last_profit_calculation to the log
                    $log->profit = $profit;
                    $log->last_profit_calculation = $now->toDateTimeString();
                    $log->status = 2; // Set status to completed
                    $log->save();

                    // Continue with the rest of the script...
                } else {
                    // Continue with the original script...
                    $last_calculation_date = $log->last_profit_calculation ? Carbon::parse($log->last_profit_calculation) : $log->created_at;

                    $next_calculation_date = $last_calculation_date->addDay();

                    if ($now >= $next_calculation_date) {
                        $profit = $log->amount * ($log->plan->interest_rate / 100);
                        $log->profit += $profit;
                        $log->last_profit_calculation = $now->toDateTimeString();
                        $log->save();
                    }
                }

                // Check if the investment has ended
                if ($log->end_date <= $now && $log->status != 2) {
                    $log->status = 2; // Set status to completed
                    $log->save();

                    $user = $log->user;
                    $wallet = getWallet($log->user_id, 'funding', 'USDT', 'funding');
                    $wallet->balance += $log->profit + $log->amount;
                    $wallet->save();

                    $details = 'Investment completed. Profit: ' . $log->profit . ', Amount returned: ' . ($log->amount + $log->profit);
                    $trx = getTrx();

                    createTransaction($wallet, $log->profit + $log->amount, '+', $details, $trx);

                    createAdminNotification($user->id, 'Investment Completed for ' . $user->username, route('admin.investment.logs.index'));
                }
            }
        } catch (Exception $e) {
            // Log the exception for debugging
            Log::error($e->getMessage());
        }

        cronLastRun('investment_returns');
    }
}
