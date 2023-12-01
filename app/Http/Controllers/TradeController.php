<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Extension;
use App\Models\TradeLog;
use App\Models\GeneralSetting;
use App\Models\ScheduledOrders;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class TradeController extends Controller
{
    public function btcRate(Request $request)
    {
        $cryptoRate = getCoinRate($request->coinSymbol);
        return $cryptoRate;
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'amount' => 'required|numeric|gt:0',
            'OrderType' => 'required|in:1,2'
        ]);

        if ($validate->fails()) {
            return response()->json($validate->errors());
        }

        $user = Auth::user();
        $wallet = getWallet($user->id, 'funding', $request->currency, 'funding');

        if ($request->amount > $wallet->balance) {
            return response()->json([
                'success' => false,
                'type' => 'error',
                'value' => 2,
                'message' => 'Your Account Balance ' . getAmount($wallet->balance) . ' ' . $wallet->symbol . ' Not Enough! Please Deposit First'
            ]);
        }

        $wallet->balance -= $request->amount;
        $wallet->save();

        $orderType = ($request->OrderType == 1) ? 'High' : 'Low';

        $duration = $this->getDuration($request->duration, $request->unit);
        $time = Carbon::now()->addSeconds($duration);

        $tradeLog = TradeLog::create([
            'user_id' => $user->id,
            'symbol' => $request->symbol,
            'pair' => $request->currency,
            'amount' => $request->amount,
            'margin' => $request->amount * (GeneralSetting::first()->profit / 100),
            'hilow' => $request->OrderType,
            'price_was' => getCoinRate($request->symbol),
            'duration' => $duration,
            'in_time' => $time,
        ]);

        createTransaction($wallet, $tradeLog->amount, '-', 'Trade ' . $request->symbol . ' ' . $orderType, getTrx());


        if (Extension::where('id', 3)->first()->status == 1 && getPlatform('mlm')->trades == 1 && $user->ref_by != null) {
            BVstore($user, 4, getCoinRate($wallet->symbol) * $request->amount);
        }

        return response()->json([
            'success' => true,
            'tradeLogId' => $tradeLog->id,
            'type' => 'success',
            'value' => 1,
            'trade' => $tradeLog->price_was
        ]);
    }

    public function schedule(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|gt:0',
            'type' => 'required',
        ]);

        $user = Auth::user();
        $wallet = getWallet($user->id, 'funding', $request->currency, 'funding');
        $general = GeneralSetting::first();

        if ($request->amount > $wallet->balance) {
            return back()->with('warning', 'Your Account Balance ' . getAmount($wallet->balance) . ' ' . $wallet->symbol . ' Not Enough! Please Deposit Money');
        }

        $wallet->balance -= $request->amount;
        $wallet->save();

        $duration = $this->getDuration($request->duration, $request->unit);
        $inTime = Carbon::now()->addSeconds($duration);

        $tradeLog = ScheduledOrders::create([
            'user_id' => $user->id,
            'market' => $request->market,
            'pair' => $request->currency,
            'amount' => $request->amount,
            'margin' => $request->amount * ($general->profit / 100),
            'price' => $request->price,
            'duration' => $duration,
            'in_time' => $inTime,
            'account' => $request->account,
            'type' => $request->type,
            'method' => ($request->price > $request->current) ? '1' : '2',
            'status' => '0'
        ]);

        $tradeLog->save();

        return back()->with('success', 'Order Scheduled Successfully');
    }

    private function getDuration($duration, $unit)
    {
        $durationMultiplier = [
            'Sec' => 1,
            'Min' => 60,
            'Hour' => 3600
        ];

        $multiplier = $durationMultiplier[$unit] ?? 1;
        return $duration * $multiplier;
    }


    public function tradeResult(Request $request)
    {
        $request->validate([
            'tradeLogId' => 'required|exists:trade_logs,id'
        ]);

        $user = Auth::user();
        $wallet = getWallet($user->id, 'funding', $request->currency, 'funding');
        $tradeLog = TradeLog::where('id', $request->tradeLogId)->where('user_id', $user->id)->firstOrFail();

        $tradeDataFilePath = public_path('data/trade/u00' . $user->id . '.json');

        if (!file_exists($tradeDataFilePath)) {
            $json_data = '{"' . $user->id . '": {"1": []}}';
            file_put_contents($tradeDataFilePath, $json_data);
        }

        $jsonString = file_get_contents($tradeDataFilePath);
        $datas = json_decode($jsonString, true);

        $datas[$user->id][$request->tradeLogId] = $request->obj;
        $newJsonString = json_encode($datas, JSON_PRETTY_PRINT);
        file_put_contents($tradeDataFilePath, stripslashes($newJsonString));

        if (isset($request->obj[0]['value'])) {
            $tradeLog->price_was = $request->obj[0]['value'];
            $cryptoRate = $request->obj[count($request->obj) - 1]['value'];
        } else {
            $cryptoRate = getCoinRate($tradeLog->symbol);
        }

        if ($tradeLog->result == 0) {
            $result = null;
            $balanceAdjustment = 0;

            if (($tradeLog->hilow == 1 && $tradeLog->price_was < $cryptoRate) || ($tradeLog->hilow == 2 && $tradeLog->price_was > $cryptoRate)) {
                $result = 1;
                $balanceAdjustment = $tradeLog->amount + $tradeLog->margin;
                $details = "Trade " . $tradeLog->symbol . ' ' . "WIN";
            } elseif (($tradeLog->hilow == 1 && $tradeLog->price_was > $cryptoRate) || ($tradeLog->hilow == 2 && $tradeLog->price_was < $cryptoRate)) {
                $result = 2;
            } else {
                $result = 3;
                $balanceAdjustment = $tradeLog->amount;
                $details = "Trade " . $tradeLog->symbol . ' ' . "Refund";
            }

            if ($balanceAdjustment > 0) {
                $wallet->balance += $balanceAdjustment;
                $wallet->save();
                createTransaction($wallet, $balanceAdjustment, '+', $details, getTrx());
            }


            $tradeLog->result = $result;
            $tradeLog->status = 1;
            $tradeLog->save();
        }

        return response()->json([
            'success' => true,
            'result' => $tradeLog->result,
            'balance' => getAmount($wallet->balance),
        ]);
    }
    private function getTradeData($userId)
    {
        $tradeDataFilePath = public_path('data/trade/u00' . $userId . '.json');
        if (!file_exists($tradeDataFilePath)) {
            $json_data = '{"' . $userId . '": {"1": []}}';
            file_put_contents($tradeDataFilePath, $json_data);
        }
        $jsonString = file_get_contents($tradeDataFilePath);
        return json_decode($jsonString, true);
    }

    public function tradeContract()
    {
        $user = Auth::user();
        $page_title = "Trade History";
        $empty_message = "No Data Found";
        $contracts = TradeLog::where('user_id', $user->id)->latest()->paginate(getPaginate());
        $datas = $this->getTradeData($user->id);
        return view('user.contract.log', compact('page_title', 'empty_message', 'contracts', 'user', 'datas'));
    }

    public function ContractChart($tradeLogId)
    {
        $user = Auth::user();
        $page_title = "Trade Preview";
        $empty_message = "No Data Found";
        $contract = TradeLog::where('id', $tradeLogId)->where('user_id', $user->id)->firstOrFail();
        $datas = $this->getTradeData($user->id);
        $data = $datas[$user->id][$tradeLogId];
        $duration = Carbon::parse($contract->in_time)
            ->addSeconds($contract->duration)
            ->format('Y-m-d H:i:s');
        $fee = GeneralSetting::first()->profit / 100;
        return view('user.contract.preview', compact('page_title', 'empty_message', 'contract', 'data', 'tradeLogId', 'duration', 'user', 'fee'));
    }

    public function winingTradeContract()
    {
        return $this->tradeContractByResult(1, "Wining Trade History");
    }

    public function losingTradeContract()
    {
        return $this->tradeContractByResult(2, "Losing Trade History");
    }

    public function drawTradeContract()
    {
        return $this->tradeContractByResult(3, "Draw Trade History");
    }

    private function tradeContractByResult($result, $pageTitle)
    {
        $user = Auth::user();
        $page_title = $pageTitle;
        $empty_message = "No Data Found";
        $contracts = TradeLog::where('user_id', $user->id)->where('result', $result)->latest()->paginate(getPaginate());
        $datas = $this->getTradeData($user->id);
        return view('user.contract.log', compact('page_title', 'empty_message', 'contracts', 'user', 'datas'));
    }
}
