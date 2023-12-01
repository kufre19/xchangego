<?php

namespace App\Http\Controllers\Extensions\Bot;

use App\Http\Controllers\Controller;
use App\Models\AdminNotification;
use App\Models\Bot\Bot;
use App\Models\Bot\BotContract;
use App\Models\Extension;
use App\Models\GeneralSetting;
use App\Models\ThirdpartyProvider;
use App\Models\Transaction;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BotController extends Controller
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
            ));
            $this->provider = $thirdparty->title;
        } else {
            $this->provider = null;
        }
        #$this->api->set_sandbox_mode('enable');
    }

    public function fetch_info()
    {
        $user = Auth::user();
        $bot_contracts = (new BotContract)->getCached($user->id);
        $profit = $bot_contracts->where('result', 1)->sum('profit');

        return response()->json([
            'bot_contracts' => $bot_contracts,
            'bot_contracts_count_running' => $bot_contracts->where('status', '!=', 1)->count(),
            'bot_contracts_count_completed' => $bot_contracts->where('status', 1)->count(),
            'bot_contracts_count_amount' => $bot_contracts->sum('amount'),
            'profit' => $profit,
        ]);
    }

    public function fetch_bot(Request $request)
    {
        $user = Auth::user();
        if (isWallet($user->id, 'funding', $request->currency, 'funding') == true) {
            $wallet = getWallet($user->id, 'funding', $request->currency, 'funding');
        } else {
            $wallet = null;
        }
        if (BotContract::where('user_id', $user->id)->where('symbol', $request->symbol)->where('status', '!=', '1')->exists()) {
            $runningBots = BotContract::where('user_id', $user->id)->where('symbol', $request->symbol)->where('status', '!=', '1')->get();
        } else {
            $runningBots = [];
        }
        if ($this->provider == 'coinbasepro') {
            $provide = 'COINBASE';
        } else if ($this->provider != 'coinbasepro' && $this->provider != null) {
            $provide = strtoupper($this->provider);
        } else {
            $provide = 'KUCOIN';
        }
        return response()->json([
            'wallet' => $wallet,
            'bot_type' => (new Bot)->getEnabled(),
            'runningBots' => $runningBots,
            'provider' => $this->provider,
            'provide' => $provide,
        ]);
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'amount' => 'required|numeric|gt:0',
            'botTime' => 'required|exists:bot_timings,duration',
            'bot_id' => 'required|exists:bots,id',
            'price' => 'required',
        ]);

        if ($validate->fails()) {
            return response()->json(
                [
                    'success' => true,
                    'type' => 'error',
                    'message' => 'Please select bot and time duration.'
                ]
            );
        }
        $user = Auth::user();
        $wallet = getWallet($user->id, 'funding', $request->currency, 'funding');
        $bot = Bot::where('id', $request->bot_id)->first();
        $general = GeneralSetting::first();
        if ($request->amount > $wallet->balance) {
            return response()->json(
                [
                    'success' => true,
                    'type' => 'error',
                    'message' => 'Your Account Balance ' . getAmount($wallet->balance) . ' ' . $general->cur_text . ' Not Enough! Please Deposit Money'
                ]
            );
        }
        $wallet->balance -= $request->amount;
        $wallet->save();

        $bot_contract = new BotContract();
        $bot_contract->user_id = $user->id;
        $bot_contract->bot_id = $request->bot_id;
        $bot_contract->bot_name = $bot->title;
        $bot_contract->symbol = $request->symbol;
        $bot_contract->pair = $request->currency;
        $bot_contract->amount = $request->amount;
        $bot_contract->min_profit = $bot->min_profit;
        $bot_contract->max_profit = $bot->max_profit;
        $bot_contract->status = '0';
        $bot_contract->start_price = $request->price;
        if ($request->type == "Min") {
            $time = Carbon::now()->addMinutes($request->botTime);
            $duration = $request->botTime * 60;
        } elseif ($request->type == "Hour") {
            $time = Carbon::now()->addHours($request->botTime);
            $duration = $request->botTime * 60 * 60;
        } elseif ($request->type == "Day") {
            $time = Carbon::now()->addDays($request->botTime);
            $duration = $request->botTime * 60 * 60 * 24;
        }

        $bot_contract->duration = $duration;
        $bot_contract->start_date = Carbon::now();
        $bot_contract->end_date = $time;
        $bot_contract->save();

        $transaction = new Transaction();
        $transaction->user_id = $user->id;
        $transaction->amount = $bot_contract->amount;
        $transaction->post_balance = $wallet->balance;
        $transaction->trx_type = "-";
        $transaction->details = 'Bot contract on ' . $request->symbol . $request->currency;
        $transaction->trx = getTrx();
        $transaction->save();


        notify($transaction->user, 'BOT_SUBSCRIBED_SUCCESSFUL', [
            "amount" => $bot_contract->amount,
            "currency" => $bot_contract->symbol . '/' . $bot_contract->pair,
            "pair" => $bot_contract->pair,
            "title" => $bot->title,
            "trx" => $transaction->trx,
            "post_balance" => $transaction->post_balance,
            "duration" => $request->botTime,
            "duration_type" => $request->type,
            "end_date" => $bot_contract->end_date
        ]);

        createAdminNotification($user->id, 'New bot subscription from ' . $user->username, 'New bot subscription from ' . $user->username, route('admin.bot.log.list'));


        if (Extension::where('id', 3)->first()->status == 1 && getPlatform('mlm')->bot_investment == 1 && $user->ref_by != null) {
            BVstore($user, 5, $request->amount);
        }

        return response()->json(
            [
                'success' => true,
                'type' => 'success',
                'message' => 'Your Contract Started Successfully'
            ]
        );
    }

    public function botResult()
    {
        // Fetch bot contracts that meet the specified conditions
        $bot_contracts = BotContract::where('status', 2)
            ->where('result', '>', 3)
            ->where('end_date', '<=', Carbon::now())
            ->get();

        // Update the last_cron_run timestamp in GeneralSetting
        $gnl = GeneralSetting::first();
        $gnl->last_cron_run = Carbon::now();
        $gnl->save();

        // Process each bot contract
        foreach ($bot_contracts as $bot_contract) {
            $wallet = getWallet($bot_contract->user_id, 'funding', $bot_contract->pair, 'funding');

            // Calculate the new wallet balance based on the bot contract result
            switch ($bot_contract->result) {
                case 4:
                    $wallet->balance += $bot_contract->amount + $bot_contract->profit;
                    $result = 1;
                    break;
                case 5:
                    $wallet->balance += $bot_contract->amount - $bot_contract->profit;
                    $result = 2;
                    break;
                case 6:
                    $wallet->balance += $bot_contract->amount;
                    $result = 3;
                    break;
                default:
                    throw new Exception("Invalid bot contract result: {$bot_contract->result}");
            }

            // Update the wallet and bot contract
            $wallet->save();
            $bot_contract->result = $result;
            $bot_contract->status = 1;
            $bot_contract->save();
        }
        cronLastRun('bot_returns');
    }

    public function botMissed()
    {
        // Fetch bot contracts with a status of 0 and a result less than 4
        $bot_contracts = BotContract::where('status', 0)
            ->where('result', 0)
            ->get();

        // Update the last_cron_run timestamp in GeneralSetting
        $gnl = GeneralSetting::first();
        $gnl->last_cron_run = Carbon::now();
        $gnl->save();

        // Process each bot contract
        foreach ($bot_contracts as $bot_contract) {
            $bot = Bot::where('id', $bot_contract->bot_id)->first();

            // Calculate the new bot contract result and profit based on the bot's result_missed property
            switch ($bot->result_missed) {
                case 0:
                    $new_result = 6;
                    $new_status = 2;
                    $new_profit = '0';
                    break;
                case 1:
                    $new_result = 4;
                    $new_status = 2;
                    $new_profit = $bot_contract->amount * ($bot->profit_missed / 100);
                    break;
                case 2:
                    $new_result = 5;
                    $new_status = 2;
                    $new_profit = $bot_contract->amount * ($bot->profit_missed / 100);
                    break;
                case 3:
                    $new_result = 6;
                    $new_status = 2;
                    $new_profit = '0';
                    break;
                default:
                    break;
            }

            // Update the bot contract
            $bot_contract->result = $new_result;
            $bot_contract->status = $new_status;
            $bot_contract->profit = $new_profit;
            $bot_contract->save();
        }

        // Clear the cache
        (new BotContract)->clearCache();

        cronLastRun('bot_missed');
    }
}
