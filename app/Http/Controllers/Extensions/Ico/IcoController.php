<?php

namespace App\Http\Controllers\Extensions\Ico;

use App\Http\Controllers\Controller;
use App\Models\Ico\ICO;
use App\Models\Ico\IcoLogs;
use App\Models\UserMeta;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class IcoController extends Controller
{

    public function fetch_info()
    {
        $user = Auth::user();
        $icos = (new ICO)->getCache();
        $meta = $user->user_meta ?? 'Not Added Yet';
        $wallets = Wallet::where('user_id', $user->id)->where('type', 'funding')->get();
        $ico_logs = (new IcoLogs())->getCached($user->id);
        $ico_balance = $ico_logs->where('status', 1)->sum('amount') ?? '0';

        return response()->json([
            'user' => $user,
            'icos' => $icos,
            'meta' => $meta,
            'wallets' => $wallets,
            'ico_logs' => $ico_logs,
            'ico_balance' => $ico_balance,
        ]);
    }

    public function fetch_ico_info($symbol)
    {
        $user = Auth::user();
        $ico = ICO::where('symbol', $symbol)->first();
        $wallet = Wallet::where('user_id', $user->id)->where('symbol', $ico->network_symbol)->where('type', 'funding')->first();
        $balance = $wallet->balance ?? null;
        $meta = UserMeta::firstOrNew(['user_id' => $user->id]);

        return response()->json([
            'user' => $user,
            'ico' => $ico,
            'rec_wallet' => $meta->rec_wallet,
            'balance' => $balance
        ]);
    }

    public function store_rec_wallet(Request $request)
    {
        $user = Auth::user();

        try {
            $meta = UserMeta::firstOrNew(['user_id' => $user->id]);
            $meta->rec_wallet = $request->rec_wallet;
            $meta->network_symbol = $request->network_symbol;
            $meta->save();

            return responseJson('success', 'Receiving Wallet Address Updated Successfully');
        } catch (\Throwable $th) {
            return responseJson('error', $th->getMessage());
        }
    }


    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'amount' => 'required|numeric',
            'ico_id' => 'required|exists:icos,id',
            'symbol' => 'required|exists:wallets,symbol',
        ]);

        if ($validate->fails()) {
            $notify[] = ['warning', 'Some Missing Data, Please Try Again.'];
            return back()->withNotify($notify);
        }

        $user = Auth::user();
        $wallet = getWallet($user->id, 'funding', $request->symbol, 'funding');
        if (!$wallet) {
            $notify[] = ['warning', 'You Don\'t Have ' . $request->symbol . ' Wallet'];
            return back()->withNotify($notify);
        }

        $ico = ICO::where('id', $request->ico_id)->first();
        if (!$ico) {
            $notify[] = ['warning', 'Invalid ICO'];
            return back()->withNotify($notify);
        }

        if ($request->ico_symbol != $ico->symbol) {
            $notify[] = ['warning', 'Invalid ICO'];
            return back()->withNotify($notify);
        }

        $existing_logs = IcoLogs::where('user_id', $user->id)->where('ico_id', $request->ico_id);
        $ico_purchased = $existing_logs->sum('amount');

        if ($ico_purchased >= $ico->client_max) {
            return responseJson('error', 'You Have Already Purchased Maximum Amount of Token');
        }

        if ($request->amount < $ico->client_min) {
            return responseJson('error', 'Minimum Amount: ' . getAmount($ico->client_min) . ' ' . $ico->symbol);
        }

        if ($request->amount > $ico->client_max) {
            return responseJson('error', 'Maximum Amount: ' . getAmount($ico->client_max) . ' ' . $ico->symbol);
        }

        if ($request->cost > $wallet->balance) {
            return responseJson('error', 'Insufficient Balance');
        }

        $wallet->decrement('balance', $request->cost);

        $ico_log = new IcoLogs([
            'user_id' => $user->id,
            'ico_id' => $request->ico_id,
            'network_symbol' => $wallet->symbol,
            'rec_wallet' => $request->rec_wallet,
            'amount' => $request->amount,
            'cost' => $request->cost,
            'status' => 0,
        ]);
        $ico_log->save();

        $ico->increment(($ico->stage == 1) ? 'soft_raised' : 'hard_raised', $ico_log->amount);
        $ico->increment('owner_recieved', $request->cost);
        $ico->increment('contributors');
        $ico->save();

        createAdminNotification($user->id, 'New ICO Token Purchase from ' . $user->username, route('admin.ico.log.list'), $user->username . ' Purchased ' . getAmount($request->amount) . ' ' . $ico->symbol . ' Token using ' . $wallet->symbol . ' Wallet');
        createTransaction($wallet, -$request->cost, '-', $request->ico_symbol . ' Token Purchase', getTrx());

        return responseJson('success', 'Token Purchase Request Sent Successfully');
    }
}
