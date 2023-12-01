<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GeneralSetting;
use App\Models\PracticeLog;
use App\Models\ScheduledOrders;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PracticeController extends Controller
{
    public function btcRate(Request $request)
    {
        $cryptoRate = getCoinRate($request->coinSymbol);
        return $cryptoRate;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|gt:0',
            'OrderType' => 'required|in:1,2'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = Auth::user();

        if ($request->amount > $user->practice_balance) {
            return response()->json([
                'success' => false,
                'type' => 'error',
                'value' => 2,
                'message' => 'Your Practice Balance ' . getAmount($user->practice_balance) . ' ' . $request->currency . ' Not Enough! Please Add Practice Amount'
            ]);
        }

        $user->practice_balance -= $request->amount;
        $user->save();

        $practiceLog = PracticeLog::create([
            'user_id' => $user->id,
            'symbol' => $request->symbol,
            'pair' => $request->currency,
            'amount' => $request->amount,
            'margin' => $request->amount * (GeneralSetting::first()->profit / 100),
            'hilow' => $request->OrderType,
            'price_was' => getCoinRate($request->symbol),
        ]);

        $durationMultiplier = [
            'Sec' => 1,
            'Min' => 60,
            'Hour' => 3600
        ];

        $multiplier = $durationMultiplier[$request->unit] ?? 1;
        $duration = $request->duration * $multiplier;
        $time = Carbon::now()->addSeconds($duration);

        $practiceLog->duration = $duration;
        $practiceLog->in_time = $time;
        $practiceLog->save();

        return response()->json([
            'success' => true,
            'tradeLogId' => $practiceLog->id,
            'type' => 'success',
            'value' => 1,
            'trade' => $practiceLog->price_was,
        ]);
    }

    public function schedule(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|gt:0',
        ]);

        $user = Auth::user();
        $general = GeneralSetting::first();

        if ($request->amount > $user->practice_balance) {
            $notify[] = ['warning', 'Your Practice Balance ' . getAmount($user->practice_balance) . ' ' . $request->pair . ' Not Enough! Please Add Practice Amount'];
        }

        $user->practice_balance -= $request->amount;
        $user->save();

        $practiceLog = ScheduledOrders::create([
            'user_id' => $user->id,
            'market' => $request->market,
            'pair' => $request->pair,
            'amount' => $request->amount,
            'price' => $request->price,
            'margin' => $request->amount * ($general->profit / 100),
            'account' => $request->account,
            'type' => $request->type,
            'method' => ($request->price > $request->current) ? '1' : '2',
            'status' => '0',
        ]);

        $durationMultiplier = [
            'sec' => 1,
            'min' => 60,
            'hour' => 3600
        ];

        $multiplier = $durationMultiplier[$request->unit] ?? 1;
        $duration = $request->duration * $multiplier;
        $time = Carbon::now()->addSeconds($duration);
        $practiceLog->duration = $duration;
        $practiceLog->in_time = $time;
        $practiceLog->save();

        if ($practiceLog->save()) {
            $notify[] = ['success', 'Order Scheduled Successfully'];
        }

        return back()->withNotify($notify);
    }

    public function tradeResult(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tradeLogId' => 'required|exists:practice_logs,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = Auth::user();
        $practiceLog = PracticeLog::where('id', $request->tradeLogId)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $datas = $this->getPracticeData($user->id);
        $datas[$user->id][$request->tradeLogId] = $request->obj;
        $this->savePracticeData($user->id, $datas);

        $priceWas = $request->obj[0]['value'] ?? null;
        $cryptoRate = $request->obj[count($request->obj) - 1]['value'] ?? getCoinRate($practiceLog->symbol);

        if ($priceWas !== null) {
            $practiceLog->price_was = $priceWas;
        }

        if ($practiceLog->result === 0) {
            $this->updatePracticeLogAndUserBalance($practiceLog, $cryptoRate, $user);
        }

        return response()->json([
            'success' => true,
            'result' => $practiceLog->result,
            'balance' => getAmount($user->practice_balance),
        ]);
    }

    private function updatePracticeLogAndUserBalance($practiceLog, $cryptoRate, $user)
    {
        $winningCondition = ($practiceLog->hilow === 1 && $practiceLog->price_was < $cryptoRate) || ($practiceLog->hilow === 2 && $practiceLog->price_was > $cryptoRate);
        $losingCondition = ($practiceLog->hilow === 1 && $practiceLog->price_was > $cryptoRate) || ($practiceLog->hilow === 2 && $practiceLog->price_was < $cryptoRate);

        if ($winningCondition) {
            $user->practice_balance += $practiceLog->amount + $practiceLog->margin;
            $practiceLog->result = 1;
        } elseif ($losingCondition) {
            $practiceLog->result = 2;
        } else {
            $user->practice_balance += $practiceLog->amount;
            $practiceLog->result = 3;
        }

        $user->save();
        $practiceLog->status = 1;
        $practiceLog->save();
    }

    private function savePracticeData($userId, $datas)
    {
        $filePath = public_path('data/practice/u00' . $userId . '.json');
        $newJsonString = json_encode($datas, JSON_PRETTY_PRINT);
        file_put_contents($filePath, stripslashes($newJsonString));
    }


    public function practiceLog()
    {
        $user = Auth::user();
        $page_title = "Practice Trade History";
        $empty_message = "No Data Found";
        $contracts = PracticeLog::where('user_id', $user->id)->latest()->paginate(getPaginate());
        $datas = $this->getPracticeData($user->id);
        return view('user.contract.log', compact('page_title', 'empty_message', 'contracts', 'user', 'datas'));
    }

    public function practiceLogChart($tradeLogId)
    {
        $user = Auth::user();
        $page_title = "Practice Trade Preview";
        $empty_message = "No Data Found";
        $contract = PracticeLog::where('id', $tradeLogId)->where('user_id', $user->id)->firstOrFail();
        $datas = $this->getPracticeData($user->id);
        $data = $datas[$user->id][$tradeLogId];
        $duration = Carbon::parse($contract->in_time)
            ->addSeconds($contract->duration)
            ->format('Y-m-d H:i:s');
        $fee = GeneralSetting::first()->profit / 100;
        return view('user.contract.preview', compact('page_title', 'empty_message', 'contract', 'data', 'tradeLogId', 'duration', 'fee'));
    }

    private function getPracticeData($userId)
    {
        $filePath = public_path('data/practice/u00' . $userId . '.json');
        if (!file_exists($filePath)) {
            $json_data = '{"' . $userId . '": {"1": []}}';
            file_put_contents($filePath, $json_data);
        }
        $jsonString = file_get_contents($filePath);
        return json_decode($jsonString, true);
    }
}
