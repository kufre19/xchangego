<?php

namespace App\Http\Controllers\Admin\Extensions\Staking;

use App\Http\Controllers\Controller;
use App\Models\Eco\EcoMainnetTokens;
use App\Models\Eco\EcoTokens;
use App\Models\Eco\EcoWallet;
use App\Models\Staking\StakingCurrency;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class ManageStakingController extends Controller
{

    public function index()
    {
        abort_if(Gate::denies('staking_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = 'Staking Coins';
        $coins = StakingCurrency::latest()->get();
        $empty_message = 'No Currency Found';
        return view('extensions.admin.staking.index', compact('page_title', 'coins', 'empty_message'));
    }

    public function edit($id)
    {
        abort_if(Gate::denies('staking_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $coin = StakingCurrency::findOrFail($id);
        $page_title = 'Staking Currency Editor';
        return view('extensions.admin.staking.edit', compact('page_title', 'coin'));
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'title' => 'required|unique:staking_currencies,title',
            'symbol' => 'required|unique:staking_currencies,symbol',
            'network' => 'required',
            'period' => 'required|numeric',
            'profit' => 'required|numeric',
            'price' => 'numeric',
            'amount' => 'required|numeric',
            'min_stake' => 'required|numeric',
            'max_stake' => 'required|numeric',
            'staked' => 'required|numeric',
            'apr' => 'required|numeric',
            'daily_profit' => 'required|numeric',
            'image' => 'mimes:jpeg,jpg,png,svg'
        ]);
        if ($validate->fails()) {
            foreach (json_decode($validate->errors()) as $key => $error) {
                $notify[] = ['error', $error[0]];
            }
            return response()->json(
                [
                    'success' => true,
                    'type' => $notify[0][0],
                    'message' => $notify[0][1]
                ]
            );
        }
        try {
            $coin = new StakingCurrency();
            $coin->title = $request->title;
            $coin->symbol = $request->symbol;
            $coin->network = $request->network;
            $coin->period = $request->period;
            $coin->price = $request->price;
            $coin->profit = $request->profit;
            $coin->amount = $request->amount;
            $coin->min_stake = $request->min_stake;
            $coin->max_stake = $request->max_stake;
            $coin->staked = $request->staked;
            $coin->apr = $request->apr;
            $coin->daily_profit = $request->daily_profit;
            $coin->profit_unit = $request->profit_unit;
            $coin->method = $request->method;
            $coin->status = $request->status;
            $coin->wallet_type = $request->wallet_type;
            if ($request->wallet_type == 'primary') {
                $token = EcoTokens::where('symbol', $coin->symbol)->where('chain', $request->network)->first();
                if ($token == null) {
                    $mainToken = EcoMainnetTokens::where('symbol', $coin->symbol)->where('chain', $request->network)->first();
                    if ($mainToken == null) {
                        $notify[] = ['error', 'Primary Token not found, Please check symbol and chain.'];
                        return back()->withNotify($notify);
                    }
                }
            }

            $path = imagePath()['staking']['path'];
            $size = imagePath()['staking']['size'];
            if (isset($request->image)) {
                try {
                    $filename = uploadImg($request->image, $path, $size);
                } catch (\Exception $exp) {
                    $notify[] = ['error', 'Image could not be uploaded.'];
                    return back()->withNotify($notify);
                }
                $coin->icon = $filename;
            }
            $coin->save();
            $coin->clearCache();

            $notify[] = ['success', 'New Staking Currency has been Added'];
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

    public function update(Request $request)
    {
        $request->validate([
            'network' => 'required',
            'period' => 'required|numeric',
            'profit' => 'required|numeric',
            'price' => 'numeric',
            'amount' => 'required|numeric',
            'min_stake' => 'required|numeric',
            'max_stake' => 'required|numeric',
            'staked' => 'required|numeric',
            'apr' => 'required|numeric',
            'daily_profit' => 'required|numeric',
            'image' => 'mimes:jpeg,jpg,png,svg'
        ]);

        $coin = StakingCurrency::where('id', $request->id)->first();
        $coin->network = $request->network;
        $coin->period = $request->period;
        $coin->profit = $request->profit;
        $coin->price = $request->price;
        $coin->amount = $request->amount;
        $coin->min_stake = $request->min_stake;
        $coin->max_stake = $request->max_stake;
        $coin->staked = $request->staked;
        $coin->apr = $request->apr;
        $coin->daily_profit = $request->daily_profit;
        $coin->profit_unit = $request->profit_unit;
        $coin->method = $request->method;
        $coin->status = $request->status;
        $coin->wallet_type = $request->wallet_type;
        if ($request->wallet_type == 'primary') {
            $token = EcoTokens::where('symbol', $coin->symbol)->where('chain', $request->network)->first();
            if ($token == null) {
                $mainToken = EcoMainnetTokens::where('symbol', $coin->symbol)->where('chain', $request->network)->first();
                if ($mainToken == null) {
                    $notify[] = ['error', 'Primary Token not found, Please check symbol and chain.'];
                    return back()->withNotify($notify);
                }
            }
        }
        $path = imagePath()['staking']['path'];
        $size = imagePath()['staking']['size'];

        if (isset($request->image)) {
            if ($coin->icon != null) {
                try {
                    unlink(public_path('/' . $path . '/' . $coin->icon));
                } catch (\Throwable $th) {
                    //throw $th;
                }
            }
            try {
                $filename = uploadImg($request->image, $path, $size);
            } catch (\Exception $exp) {
                $notify[] = ['error', 'Image could not be uploaded.'];
                return back()->withNotify($notify);
            }
            $coin->icon = $filename;
        }
        $coin->save();

        $notify[] = ['success', 'Staking Currency has been Updated'];
        return redirect()->route('admin.staking.index')->withNotify($notify);
    }

    public function refund(Request $request)
    {
        $log = StakingCurrency::where('id', $request->staking_id)->first();
        $log->status = 4;
        $log->save();

        $coin = StakingCurrency::where('id', $request->staking_id)->first();
        $coin->staked -= $log->staked;
        $coin->save();

        if ($log->coin->wallet_type == 'funding') {
            $wallet = getWallet($log->user_id, 'funding', $log->pair, 'funding');
        } else if ($log->coin->wallet_type == 'primary') {
            $wallet = EcoWallet::where('user_id', $log->user_id)->where('currency', $log->symbol)->where('chain', $log->coin->chain)->first();
        }
        $wallet->balance += $log->staked;
        $wallet->save();

        return response()->json(
            [
                'success' => true,
                'type' => 'success',
                'message' => 'Balance has been refunded successfully'
            ]
        );
    }

    public function remove(Request $request)
    {
        abort_if(Gate::denies('staking_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $coin = StakingCurrency::where('id', $request->id)->first();
        $coin->delete();

        $notify[] = ['success', 'Staking Currency has been Removed Successfully'];
        return back()->withNotify($notify);
    }

    public function log()
    {
        abort_if(Gate::denies('staking_log'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = 'Staking Logs';
        return view('extensions.admin.staking.log', compact('page_title'));
    }
}
