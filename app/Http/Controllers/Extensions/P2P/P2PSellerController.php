<?php

namespace App\Http\Controllers\Extensions\P2P;

use App\Http\Controllers\Controller;
use App\Models\Currencies;
use App\Models\P2P\P2POffer;
use App\Models\P2P\P2POrder;
use App\Models\P2P\P2PPaymentMethod;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use App\Models\P2P\P2PSeller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class P2PSellerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(): JsonResponse
    {
        $user_id = auth()->user()->id;
        $seller = P2PSeller::where('user_id', $user_id)->first();
        $gnl = getGen();
        $p2p = isset($gnl->p2p) ? json_decode($gnl->p2p) : null;
        if ($p2p != null && $p2p->application_wallet != null) {
            $wallet = getWallet($user_id, 'funding', $p2p->application_wallet, 'funding');
        } else {
            $wallet = null;
        }

        if (!$seller) {
            return response()->json([
                'is_seller' => false,
                'wallet' => $wallet,
                'p2p' => $p2p,
            ]);
        }

        $now = Carbon::now();
        $thirtyDaysAgo = $now->clone()->subDays(30);

        $offers = P2POffer::with('orders', 'user', 'method', 'openOrders', 'closedOrders')->where('user_id', $user_id)->get();

        $openOrders = P2POrder::with('buyer')->where('seller_id', $user_id)->open()->get();
        $closedOrders = P2POrder::with('buyer')->where('seller_id', $user_id)->closed()->get();


        $paymentMethods = P2PPaymentMethod::where('user_id', $user_id)->get();

        // 1. All Trades: Buy/Sell
        $allTrades = $closedOrders->count();

        // 2. 30d Trades
        $trades30d = $closedOrders->where('created_at', '>=', $thirtyDaysAgo)->count();

        // 3. 30d Completion Rate
        $completed30d = $closedOrders->where('created_at', '>=', $thirtyDaysAgo)
            ->where('status', 'completed')->count();
        $completionRate30d = $trades30d > 0 ? ($completed30d / $trades30d) * 100 : 0;

        // 4. Avg. Completion Time in Minute
        $averageCompletionTime = $closedOrders->where('status', 'completed')
            ->average('completion_time');

        // 5. Avg. Pay Time in Minute
        $averagePayTime = $closedOrders->where('status', 'completed')
            ->average('pay_time');

        // 6. Approx. 30d Volume
        $volume30d = $closedOrders->where('created_at', '>=', $thirtyDaysAgo)
            ->sum('amount');

        // 7. Approx. Total Volume: Buy/Sell
        $totalVolume = $closedOrders->sum('amount');

        $fiat = Currencies::get();

        return response()->json([
            'p2p' => $p2p,
            'is_seller' => true,
            'wallet' => $wallet,
            'offers' => $offers,
            'open_orders' => $openOrders,
            'closed_orders' => $closedOrders,
            'payment_methods' => $paymentMethods,
            'fiat' => $fiat,
            'statistics' => [
                [
                    'label' => 'All Trades',
                    'value' => $allTrades,
                    'tooltip' => 'Total number of completed trades.',
                ],
                [
                    'label' => '30d Trades',
                    'value' => $trades30d,
                    'tooltip' => 'Total number of trades completed in the past 30 days.',
                ],
                [
                    'label' => '30d Completion Rate',
                    'value' => round($completionRate30d, 2) . '%',
                    'tooltip' => 'Percentage of completed trades in the past 30 days.',
                ],
                [
                    'label' => 'Avg. Completion Time',
                    'value' => round($averageCompletionTime, 2) . ' minutes',
                    'tooltip' => 'Average time taken to complete a trade.',
                ],
                [
                    'label' => 'Avg. Pay Time',
                    'value' => round($averagePayTime, 2) . ' minutes',
                    'tooltip' => 'Average time taken to make a payment.',
                ],
                [
                    'label' => 'Approx. 30d Volume',
                    'value' => $volume30d,
                    'tooltip' => 'Total trading volume in the past 30 days.',
                ],
                [
                    'label' => 'Total Volume',
                    'value' => $totalVolume,
                    'tooltip' => 'Total trading volume.',
                ],
                [
                    'label' => 'Rating',
                    'value' => $seller->rating ?? 0,
                    'tooltip' => 'Seller rating.',
                ],
            ],
        ]);
    }
    public function storeOffer(Request $request)
    {
        $user_id = $request->user()->id;
        try {
            $validatedData = $request->validate([
                'price' => 'required|numeric|min:0',
                'currency' => [
                    'required',
                    'string',
                    Rule::unique('p2p_offers')->where(function ($query) use ($user_id) {
                        return $query->where('user_id', $user_id);
                    }),
                ],
                'payment_method_id' => 'required|integer|exists:p2p_payment_methods,id',
                'min' => 'required|numeric|min:0',
                'max' => 'required|numeric|min:0',
                'available' => 'required|numeric|min:0',
                'status' => 'required|in:0,1',
            ], [
                'price.required' => 'The price is required.',
                'price.numeric' => 'The price must be a number.',
                'price.min' => 'The price must be at least :min.',
                'currency.required' => 'The currency is required.',
                'currency.string' => 'The currency must be a string.',
                'currency.unique' => 'You already have an offer with this currency.',
                'payment_method_id.required' => 'The payment method ID is required.',
                'payment_method_id.integer' => 'The payment method ID must be an integer.',
                'payment_method_id.exists' => 'The selected payment method is invalid.',
                'min.required' => 'The minimum amount is required.',
                'min.numeric' => 'The minimum amount must be a number.',
                'min.min' => 'The minimum amount must be at least :min.',
                'max.required' => 'The maximum amount is required.',
                'max.numeric' => 'The maximum amount must be a number.',
                'max.min' => 'The maximum amount must be at least :min.',
                'available.required' => 'The available amount is required.',
                'available.numeric' => 'The available amount must be a number.',
                'available.min' => 'The available amount must be at least :min.',
                'status.required' => 'The status is required.',
                'status.in' => 'The selected status is invalid.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $exception) {
            return response()->json([
                'errors' => $exception->errors(),
            ], 422);
        }

        try {
            // Create the offer with the validated data
            $offer = P2POffer::create($validatedData + ['user_id' => $user_id]);

            // Return a success response
            return response()->json([
                'message' => 'Offer created successfully',
                'type' => 'success',
            ], 201);
        } catch (\Exception $exception) {
            // Return a generic error response for any other exceptions
            return response()->json([
                'error' => 'An error occurred while creating the offer.',
                'details' => $exception->getMessage(),
            ], 500);
        }
    }

    public function updateOffer(Request $request, P2POffer $offer)
    {
        // Validate the request data
        try {
            $validatedData = $request->validate([
                'price' => 'required|numeric|min:0',
                'currency' => 'required|string',
                'payment_method_id' => 'required|integer|exists:p2p_payment_methods,id',
                'min' => 'required|numeric|min:0',
                'max' => 'required|numeric|min:0',
                'available' => 'required|numeric|min:0',
                'status' => 'required|in:0,1',
            ], [
                'price.required' => 'The price is required.',
                'price.numeric' => 'The price must be a number.',
                'price.min' => 'The price must be at least :min.',
                'currency.required' => 'The currency is required.',
                'currency.string' => 'The currency must be a string.',
                'payment_method_id.required' => 'The payment method ID is required.',
                'payment_method_id.integer' => 'The payment method ID must be an integer.',
                'payment_method_id.exists' => 'The selected payment method is invalid.',
                'min.required' => 'The minimum amount is required.',
                'min.numeric' => 'The minimum amount must be a number.',
                'min.min' => 'The minimum amount must be at least :min.',
                'max.required' => 'The maximum amount is required.',
                'max.numeric' => 'The maximum amount must be a number.',
                'max.min' => 'The maximum amount must be at least :min.',
                'available.required' => 'The available amount is required.',
                'available.numeric' => 'The available amount must be a number.',
                'available.min' => 'The available amount must be at least :min.',
                'status.required' => 'The status is required.',
                'status.in' => 'The selected status is invalid.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $exception) {
            return response()->json([
                'errors' => $exception->errors(),
            ], 422);
        }

        try {
            // Update the offer with the validated data
            $offer->update($validatedData);

            // Return a success response
            return response()->json([
                'message' => 'Offer updated successfully',
                'type' => 'success',
            ], 200);
        } catch (\Exception $exception) {
            // Return a generic error response for any other exceptions
            return response()->json([
                'error' => 'An error occurred while updating the offer.',
                'details' => $exception->getMessage(),
            ], 500);
        }
    }

    public function deleteOffer(Request $request, P2POffer $offer)
    {
        try {
            // Delete the offer
            $offer->delete();

            // Return a success response
            return response()->json([
                'message' => 'Offer deleted successfully',
                'type' => 'success',
            ], 200);
        } catch (\Exception $exception) {
            // Return a generic error response for any other exceptions
            return response()->json([
                'error' => 'An error occurred while deleting the offer.',
                'details' => $exception->getMessage(),
            ], 500);
        }
    }

    public function storePaymentMethod(Request $request)
    {
        // Validate the request data
        try {
            $validatedData = $request->validate([
                'name' => 'required|string',
                'fiat' => 'required|string',
                'description' => 'required|string',
                'status' => 'required|in:0,1',
            ], [
                'name.required' => 'The name is required.',
                'name.string' => 'The name must be a string.',
                'fiat.required' => 'The fiat is required.',
                'fiat.string' => 'The fiat must be a string.',
                'description.required' => 'The description is required.',
                'description.string' => 'The description must be a string.',
                'status.required' => 'The status is required.',
                'status.in' => 'The selected status is invalid.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $exception) {
            return response()->json([
                'errors' => $exception->errors(),
            ], 422);
        }

        try {
            // Create the payment method with the validated data
            $paymentMethod = new P2PPaymentMethod();
            $paymentMethod->user_id = $request->user()->id;
            $paymentMethod->name = $validatedData['name'];
            $paymentMethod->fiat = $validatedData['fiat'];
            $paymentMethod->description = $validatedData['description'];
            $paymentMethod->status = $validatedData['status'];
            $paymentMethod->save();

            // Return a success response
            return response()->json([
                'message' => 'Payment method created successfully',
                'type' => 'success',
            ], 201);
        } catch (\Exception $exception) {
            // Return a generic error response for any other exceptions
            return response()->json([
                'error' => 'An error occurred while creating the payment method.',
                'details' => $exception->getMessage(),
            ], 500);
        }
    }

    public function updatePaymentMethod(Request $request, P2PPaymentMethod $paymentMethod)
    {

        $orders = $paymentMethod->orders()->whereIn('status', ['open', 'paid'])->count();

        if ($orders > 0) {
            return response()->json([
                'error' => 'Cannot delete payment method. It is used by open or paid orders.',
            ], 400);
        }

        try {
            $validatedData = $request->validate([
                'name' => 'required|string',
                'fiat' => 'required|string',
                'description' => 'required|string',
                'status' => 'required|in:0,1',
            ], [
                'name.required' => 'The name is required.',
                'name.string' => 'The name must be a string.',
                'fiat.required' => 'The fiat is required.',
                'fiat.string' => 'The fiat must be a string.',
                'description.required' => 'The description is required.',
                'description.string' => 'The description must be a string.',
                'status.required' => 'The status is required.',
                'status.in' => 'The selected status is invalid.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $exception) {
            return response()->json([
                'errors' => $exception->errors(),
            ], 422);
        }

        try {
            // Update the payment method with the validated data
            $paymentMethod->update($validatedData);

            // Return a success response
            return response()->json([
                'message' => 'Payment method updated successfully',
                'type' => 'success',
            ], 200);
        } catch (\Exception $exception) {
            // Return a generic error response for any other exceptions
            return response()->json([
                'error' => 'An error occurred while updating the payment method.',
                'details' => $exception->getMessage(),
            ], 500);
        }
    }

    public function destroyPaymentMethod(Request $request, P2PPaymentMethod $paymentMethod)
    {
        try {
            $orders = $paymentMethod->orders()->whereIn('status', ['open', 'paid'])->count();

            if ($orders > 0) {
                return response()->json([
                    'error' => 'Cannot delete payment method. It is used by open or paid orders.',
                ], 400);
            }

            // Delete the payment method
            $paymentMethod->delete();

            // Return a success response
            return response()->json([
                'message' => 'Payment method deleted successfully',
                'type' => 'success',
            ], 200);
        } catch (\Exception $exception) {
            // Return a generic error response for any other exceptions
            return response()->json([
                'error' => 'An error occurred while deleting the payment method.',
                'details' => $exception->getMessage(),
            ], 500);
        }
    }

    public function apply(Request $request)
    {
        $user = $request->user();

        $seller = P2PSeller::where('user_id', $user->id)->first();

        if ($seller) {
            return response()->json([
                'error' => 'You are already a seller.',
            ], 400);
        }

        $p2p = json_decode(getGen()->p2p);
        $wallet = getWallet($user->id, 'funding', $p2p->application_wallet, 'funding');

        if (!$wallet) {
            return response()->json([
                'error' => 'You do not have a funding wallet.',
            ], 400);
        }

        if ($wallet->balance < $p2p->application_balance) {
            return response()->json([
                'error' => 'You do not have enough funds to apply.',
            ], 400);
        }

        $seller = new P2PSeller();
        $seller->user_id = $user->id;
        $seller->status = 1;
        $seller->save();

        return response()->json([
            'message' => 'Your application has been approved. You can now create offers and payment methods.',
            'type' => 'success',
        ], 200);
    }
}
