<?php

namespace App\Http\Controllers\Admin\Extensions\Ico;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Extensions\Eco\EcoController;
use App\Http\Controllers\Extensions\Eco\WalletController;
use App\Http\Requests\Extensions\StoreIcoRequest;
use App\Models\Eco\EcoTokens;
use App\Models\Eco\EcoWallet;
use App\Models\Ico\ICO;
use App\Models\Ico\IcoLogs;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Throwable;

class ManageIcoController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('ico_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = 'ICO Manager';
        return view('extensions.admin.ico.index', compact('page_title'));
    }

    public function new()
    {
        abort_if(Gate::denies('ico_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = 'ICO Manager';
        return view('extensions.admin.ico.new', compact('page_title'));
    }
    public function edit($id)
    {
        abort_if(Gate::denies('ico_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $ico = ICO::findOrFail($id);
        $page_title = 'ICO Manager';
        return view('extensions.admin.ico.edit', compact('page_title', 'ico'));
    }

    public function store(StoreIcoRequest $request)
    {
        $validator = Validator::make($request->all(), $request->rules());

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $ico = new ICO();
        $ico->fill($request->only($ico->getFillable()));

        // Upload the image
        $path = imagePath()['ico']['path'];
        $size = imagePath()['ico']['size'];
        if ($request->hasFile('image')) {
            try {
                $filename = uploadImg($request->image, $path, $size);
                $ico->icon = $filename;
            } catch (\Exception $exp) {
                return back()->withErrors(['image' => 'Image could not be uploaded.']);
            }
        }

        $ico->save();
        (new ICO)->clearCache();

        $notify[] = ['success', 'New Token Added Successfully'];
        return redirect()->route('admin.ico.index')->withNotify($notify);
    }

    public function update(StoreIcoRequest $request)
    {
        $validator = Validator::make($request->all(), $request->rules());

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $ico = ICO::findOrFail($request->id);
        $ico->fill($request->only($ico->getFillable()));

        // Upload the image
        $path = imagePath()['ico']['path'];
        $size = imagePath()['ico']['size'];

        if (isset($request->image)) {
            if ($ico->image != null) {
                try {
                    unlink(public_path('/' . $path . '/' . $ico->image));
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
            $ico->icon = $filename;
        }

        $ico->save();
        (new ICO)->clearCache();

        $notify[] = ['success', 'Token has been Updated'];
        return back()->withNotify($notify);
    }

    public function log()
    {
        abort_if(Gate::denies('ico_log'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = "Token Offers Log";
        return view('extensions.admin.ico.log', compact('page_title'));
    }

    public function pay(Request $request): JsonResponse
    {
        try {
            $icoLog = IcoLogs::with('ico')->findOrFail($request->id);
            $user = User::findOrFail($icoLog->user_id);
            $ico = ICO::findOrFail($icoLog->ico_id);

            $notification = $request->type === 'eco'
                ? $this->handleEcosystemPayment($icoLog, $ico)
                : $this->handleRegularPayment($icoLog, $request);

            if ($notification['type'] === 'error') {
                return responseJson($notification['type'], $notification['message']);
            }

            $icoLog->recieved = $icoLog->amount;
            $icoLog->save();

            if (getExt(3) === 1 && isset(getPlatform('mlm')->ico_purchase) && getPlatform('mlm')->ico_purchase === 1 && $user->ref_by !== null) {
                BVstore($user, 6, $icoLog->amount);
            }

            $transaction = new Transaction();
            $transaction->user_id = $icoLog->user_id;
            $transaction->amount =  $icoLog->amount;
            $transaction->currency = $ico->symbol;
            $transaction->post_balance = $icoLog->amount;
            $transaction->trx_type = '+';
            $transaction->details = "{$ico->symbol} Token Purchase";
            $transaction->trx = getTrx();
            $transaction->save();
            $transaction->clearCache();

            try {
                notify($transaction->user, 'ICO_PURCHASE_SUCCESSFUL', [
                    "amount" => $icoLog->amount,
                    "currency" => $ico->symbol,
                    "trx" => $transaction->trx,
                    "post_balance" => $transaction->post_balance,
                    "cost" => $icoLog->cost,
                    "network_symbol" => $icoLog->network_symbol
                ]);
            } catch (Throwable $e) {
            }
        } catch (\Throwable $th) {
            return responseJson('error', $th->getMessage());
        }

        return responseJson($notification['type'], $notification['message']);
    }

    private function handleEcosystemPayment(IcoLogs $icoLog, ICO $ico): array
    {
        $token = EcoTokens::where('symbol', $ico->symbol)
            ->where('chain', $ico->chain)
            ->first();

        if (!$token) {
            return ['type' => 'danger', 'message' => 'Token not found in ecosystem'];
        }

        $client_wallet = EcoWallet::where('user_id', $icoLog->user_id)
            ->where('currency', $ico->symbol)
            ->where('chain', $ico->chain)
            ->first();

        if (!$client_wallet) {
            return ['type' => 'danger', 'message' => 'User wallet not found in ecosystem'];
        }

        $walletController = new WalletController();

        try {
            $walletController->transfer($token->account_id, $client_wallet->account_id, $icoLog->amount);
            $icoLog->status = 1;
            return ['type' => 'success', 'message' => 'Payment Successful'];
        } catch (\Throwable $th) {
            return ['type' => 'danger', 'message' => $th->getMessage()];
        }
    }

    private function handleRegularPayment(IcoLogs $icoLog, Request $request): array
    {
        $icoLog->fill([
            'txHash' => $request->txHash,
            'txUrl' => $request->txUrl,
            'status' => 1,
        ]);

        return ['type' => 'success', 'message' => 'Payment Successful'];
    }
}
