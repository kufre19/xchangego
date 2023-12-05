<?php

namespace App\Http\Controllers;

use App\Models\PracticeLog;
use App\Models\TradeLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BinaryController extends Controller
{
    public $api;
    public $provider;
    public function __construct()
    {
        $thirdparty = getProvider();
        if ($thirdparty) {
            $exchange_class = "\\ccxt\\$thirdparty->title";
            if ($thirdparty->title == 'binance' || $thirdparty->title == 'binanceus') {
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
            $this->provider = null;
        }
        #$this->api->set_sandbox_mode('enable');
    }


    public function index()
    {
        $user = Auth::user();
        $logs = (new TradeLog)->getCacheByUser($user->id);
        $practice_log = (new PracticeLog())->getCacheByUser($user->id);

        $trade = $this->calculateTradeStats($logs, $practice_log);
        $perc = $this->calculatePercentages($logs, $practice_log, $trade);

        return response()->json([
            'funding_wallets' => getWallet($user->id, 'funding', 'USDT', 'funding')->balance ?? null,
            'perc' => $perc,
            'trade' => $trade,
            'tradelogs' => (new TradeLog)->getCacheByUserWithLimit($user->id, 10),
            'practicelogs' => $trade['practice_logs'],
            'deposit' => $user->deposits()->sum('amount'),
            'withdraw' => $user->withdrawals()->sum('amount'),
            'transaction' => $user->transactions()->count(),
        ]);
    }

    private function calculateTradeStats($logs, $practice_log)
    {
        $user = Auth::user();

        return [
            'Won' => $logs->where('result', 1)->sum('margin'),
            'Log' => $logs->count(),
            'Win' => $logs->where('result', 1)->count(),
            'Lose' => $logs->where('result', 2)->count(),
            'Draw' => $logs->where('result', 3)->count(),
            'practice_Won' => $practice_log->where('result', 1)->sum('margin'),
            'practice_Log' => $practice_log->count(),
            'practice_Win' => $practice_log->where('result', 1)->count(),
            'practice_Lose' => $practice_log->where('result', 2)->count(),
            'practice_Draw' => $practice_log->where('result', 3)->count(),
            'practice_logs' => $user->practice_log_limit(10),
        ];
    }



    private function calculatePercentages($logs, $practice_log, $trade)
    {
        $won_last_week = $logs->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->where('result', 1)->sum('margin');
        $practice_won_last_week = $practice_log->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->where('result', 1)->sum('margin');

        return [
            'tradeWon_last_week' => $won_last_week,
            'tradeWon_last_week_percentage' => $this->calculatePercentage($won_last_week, $trade['Win']),
            'practiceWon_last_week' => $practice_won_last_week,
            'practiceWon_last_week_percentage' => $this->calculatePercentage($practice_won_last_week, $trade['practice_Win']),
        ];
    }

    private function calculatePercentage($value, $total)
    {
        if ($total > 0) {
            return $value > 0 ? ceil(($value * 100) / $total) : 0;
        }

        return 0;
    }

    public function practice()
    {
        if ($this->provider == 'coinbasepro') {
            $provide = 'COINBASE';
            $provider = 'coinbasepro';
        } else if ($this->provider != 'coinbasepro' && $this->provider != null) {
            $provide = strtoupper($this->provider);
            $provider = $this->provider;
        } else {
            $provide = 'KUCOIN';
            $provider = 'kucoin';
        }
        return response()->json([
            'limit' => json_decode(getGen()->limits),
            'provide' => $provide,
        ]);
    }

    public function addPracticeBalance()
    {
        try {
            $gnl = getGen();
            $user = Auth::user();
            $user->practice_balance = $gnl->practice_balance;
            $user->save();
            return response()->json(
                [
                    'success' => true,
                    'type' => 'success',
                    'message' => 'Practice Balance Add Successfully'
                ]
            );
        } catch (\Throwable $th) {
            return response()->json(
                [
                    'success' => true,
                    'type' => 'error',
                    'message' => $th
                ]
            );
        }
    }

    public function trade($symbol, $currency)
    {
        if ($this->provider == 'coinbasepro') {
            $provide = 'COINBASE';
            $provider = 'coinbasepro';
        } else if ($this->provider != 'coinbasepro' && $this->provider != null) {
            $provide = strtoupper($this->provider);
            $provider = $this->provider;
        } else {
            $provide = 'KUCOIN';
            $provider = 'kucoin';
        }
        return response()->json([
            'user' => Auth::user(),
            'limit' => json_decode(getGen()->limits),
            'provider' => $provider,
            'provide' => $provide,
        ]);
    }


    public function fetch_wallet(Request $request)
    {
        $user = Auth::user();
        if (isWallet($user->id, 'funding', $request->currency, 'funding') == true) {
            $wallet = getWallet($user->id, 'funding', $request->currency, 'funding')->balance;
        } else {
            $wallet = null;
        }

        return response()->json([
            'wallet' => $wallet,
        ]);;
    }

    public function binary_practice_log()
    {
        $user = Auth::user();
        $contracts = PracticeLog::where('user_id', $user->id)->get();
        if (!file_exists(public_path('data/practice/u00' . $user->id . '.json'))) {
            if (!file_exists(public_path('data'))) {
                mkdir(public_path('data'));
            }
            if (!file_exists(public_path('data/practice'))) {
                mkdir(public_path('data/practice'));
            }
            $json_data = '{"' . $user->id . '": {"1": []}}';
            file_put_contents(public_path('data/practice/u00' . $user->id . '.json'), $json_data);
        }
        $jsonString = file_get_contents(public_path('data/practice/u00' . $user->id . '.json'));
        $datas = json_decode($jsonString, true);
        return response()->json([
            'contracts' => $contracts,
            'datas' => $datas,
        ]);
    }

    public function binary_practice_orders()
    {
        $user = Auth::user();
        $orders = PracticeLog::where('user_id', $user->id)->latest()->get();
        return response()->json([
            'orders' => $orders,
        ]);
    }

    public function binary_trade_log()
    {
        $user = Auth::user();
        $contracts = TradeLog::where('user_id', $user->id)->get();
        if (!file_exists(public_path('data/trade/u00' . $user->id . '.json'))) {
            if (!file_exists(public_path('data'))) {
                mkdir(public_path('data'));
            }
            if (!file_exists(public_path('data/trade'))) {
                mkdir(public_path('data/trade'));
            }
            $json_data = '{"' . $user->id . '": {"1": []}}';
            file_put_contents(public_path('data/trade/u00' . $user->id . '.json'), $json_data);
        }
        $jsonString = file_get_contents(public_path('data/trade/u00' . $user->id . '.json'));
        $datas = json_decode($jsonString, true);
        return response()->json([
            'contracts' => $contracts,
            'datas' => $datas,
        ]);
    }

    public function binary_trade_orders()
    {
        $user = Auth::user();
        $orders = TradeLog::where('user_id', $user->id)->latest()->get();
        return response()->json([
            'orders' => $orders,
        ]);
    }

    public function preview($type, $id)
    {
        $user = Auth::user();
        if ($type == 'trade') {
            $contract = TradeLog::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        } else {
            $contract = PracticeLog::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        }
        if (!file_exists(public_path('data/' . $type . '/u00' . $user->id . '.json'))) {
            $json_data = '{"' . $user->id . '": {"1": []}}';
            file_put_contents(public_path('data/' . $type . '/u00' . $user->id . '.json'), $json_data);
        }
        $jsonString = file_get_contents(public_path('data/' . $type . '/u00' . $user->id . '.json'));
        $datas = json_decode($jsonString, true);
        $data = $datas[$user->id][$id];
        $duration = Carbon::parse($contract->in_time)
            ->addSeconds($contract->duration)
            ->format('Y-m-d H:i:s');
        return response()->json([
            'contract' => $contract,
            'data' => $data,
            'duration' => $duration,
        ]);
    }
}
