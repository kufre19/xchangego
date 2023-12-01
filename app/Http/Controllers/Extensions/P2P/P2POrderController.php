<?php

namespace App\Http\Controllers\Extensions\P2P;

use App\Http\Controllers\Controller;
use App\Models\AdminNotification;
use App\Models\P2P\P2POffer;
use App\Models\P2P\P2POrder;
use App\Models\P2P\P2PSeller;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class P2POrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(P2POrder::with('offer', 'buyer', 'seller')->where('status', 1)->get());
    }

    public function orders()
    {
        $orders = P2POrder::with([
            'offer',
            'buyer',
            'method',
        ])
            ->where(function ($query) {
                $query->where('buyer_id', auth()->id())
                    ->orWhere('seller_id', auth()->id());
            })
            ->get();

        return response()->json($orders);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = Auth::user();
        try {
            // find order where user is buyer or seller
            $order = P2POrder::with([
                'offer',
                'buyer',
                'seller.user',
                'method',
            ])
                ->where(function ($query) use ($user) {
                    $query->where('buyer_id', $user->id)
                        ->orWhere('seller_id', $user->id);
                })
                ->findOrFail($id);

            $orders = P2POrder::with('buyer')->where('seller_id', $order->seller->user_id)->orders()->get();
            $allTrades = $orders->count();

            $now = Carbon::now();
            $thirtyDaysAgo = $now->clone()->subDays(30);
            $trades30d = $orders->where('created_at', '>=', $thirtyDaysAgo)->count();
            $completed30d = $orders->where('created_at', '>=', $thirtyDaysAgo)
                ->where('status', 'completed')->count();
            $completionRate30d = $trades30d > 0 ? ($completed30d / $trades30d) * 100 : 0;
            $order->seller->allTrades = $allTrades;
            $order->seller->completionRate30d = $completionRate30d;

            return response()->json($order);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Order #' . $id . ' not found.'], 404);
        }
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the request data
        try {
            $validatedData = $request->validate([
                'offer_id' => 'required|integer|exists:p2p_offers,id',
                'amount' => 'required|numeric|min:0',
            ], [
                'offer_id.required' => 'The offer ID is required.',
                'offer_id.integer' => 'The offer ID must be an integer.',
                'offer_id.exists' => 'The selected offer is invalid.',
                'amount.required' => 'The amount is required.',
                'amount.numeric' => 'The amount must be a number.',
                'amount.min' => 'The amount must be at least :min.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $exception) {
            return response()->json([
                'errors' => $exception->errors(),
            ], 422);
        }

        try {
            $offer = P2POffer::findOrFail($validatedData['offer_id']);

            if ($offer->user_id == auth()->id()) {
                return response()->json([
                    'message' => 'You can\'t buy your own offer.',
                    'type' => 'error',
                ], 200);
            }

            $seller = P2PSeller::where('user_id', $offer->user_id)->firstOrFail();

            // Create a new order
            $order = new P2POrder();
            $order->offer_id = $validatedData['offer_id'];
            $order->price = $offer->price;
            $order->amount = $validatedData['amount'];
            $order->buyer_id = auth()->id();
            $order->seller_id = $offer->user_id;
            $order->status = 'open';
            $order->currency = $offer->currency;
            $order->fiat = $offer->method->fiat;
            $order->payment_method_id = $offer->payment_method_id;
            $order->save();

            // Return a success response
            return response()->json([
                'message' => 'Order created successfully',
                'type' => 'success',
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $exception) {
            // Return an error response if the offer or seller is not found
            return response()->json([
                'error' => $exception->getModel() === P2POffer::class
                    ? 'The selected offer is invalid.'
                    : 'The selected seller is invalid.',
            ], 422);
        } catch (\Exception $exception) {
            // Return a generic error response for any other exceptions
            return response()->json([
                'error' => 'An error occurred while processing your request.',
                'details' => $exception->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'buyer_id' => 'integer|exists:users,id',
            'seller_id' => 'integer|exists:users,id',
            'amount' => 'numeric|min:0',
            'price' => 'numeric|min:0',
            'status' => Rule::in([0, 1, 2]), // Assuming 0 = closed, 1 = open, 2 = processing
        ]);

        // Update the specified order
        $order = P2POrder::findOrFail($id);
        $order->update($request->all());
        return response()->json($order);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Delete the specified order
        $order = P2POrder::findOrFail($id);
        $order->delete();
        return response()->json(null, 204);
    }


    /**
     * Submit a review for the order.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function submitReview(Request $request, $id)
    {
        $request->validate([
            'review' => 'required|numeric|min:1|max:5',
        ]);

        $order = P2POrder::findOrFail($id);

        if ($order->status !== 'completed') {
            return response()->json(['error' => 'Cannot submit review for an order that is not completed'], 400);
        }

        if (!is_null($order->review)) {
            return response()->json(['error' => 'Review already submitted for this order'], 400);
        }

        // Add the review to the order
        $order->review = $request->review;
        $order->save();

        // Calculate the seller's average review rating
        $seller = $order->seller;
        $completedOrders = $seller->orders()->where('status', 'completed')->get();

        if ($completedOrders->count() > 0) {
            $totalReviews = $completedOrders->sum('review');
            $seller->rating = $totalReviews / $completedOrders->count();
        } else {
            $seller->rating = 0;
        }

        $seller->save();

        return response()->json(['message' => 'Review submitted successfully']);
    }

    /**
     * Submit a transaction ID for the order.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function submitTransactionId(Request $request, P2POrder $order)
    {
        if ($order->status !== 'open') {
            return response()->json(['message' => 'You can only submit a transaction ID for an open order.', 'type' => 'error']);
        }

        $request->validate([
            'transaction_id' => 'required|string',
        ]);

        $transactionId = $request->input('transaction_id');

        $order->update([
            'trx' => $transactionId,
            'status' => 'paid',
        ]);

        return response()->json(['message' => 'Transaction ID submitted and order status updated.', 'type' => 'success']);
    }


    public function confirmPayment(P2POrder $order)
    {
        if ($order->status === 'completed' || $order->status === 'cancelled') {
            return response()->json(['message' => 'Order cannot be confirmed in its current state.', 'type' => 'error']);
        }

        // Calculate the total cost (amount + network fee)
        $fee = json_decode(getGen()->p2p)->network_fee / 100;
        $feed = $order->amount * $fee;
        $totalCost = $order->amount + $feed;

        // Get the seller's wallet
        $sellerWallet = getWallet($order->seller_id, 'funding', $order->currency, 'funding');

        // Check if the seller has enough balance
        if ($sellerWallet->balance < $totalCost) {
            $order->update([
                'moderation_status' => 'open',
                'note' => 'Seller don\'t have enough balance to complete the transaction.',
            ]);
            return response()->json(['message' => 'You don\'t have enough balance to complete the transaction, order sent to moderation', 'type' => 'error']);
        }

        // Deduct the total cost from the seller's wallet
        $sellerWallet->balance -= $totalCost;
        $sellerWallet->save();

        // Create a transaction record for the seller
        $details = 'P2P payment confirmation. Amount: ' . $order->amount . ', Network fee: ' . $fee;
        $trx = getTrx();
        $this->transaction($sellerWallet, $totalCost, '-', $details, $trx);

        $order->update([
            'status' => 'completed',
            'moderation_status' => 'completed',
        ]);


        // Create an admin notification
        $adminNotification = new AdminNotification();
        $adminNotification->user_id = $order->seller_id;
        $adminNotification->title = 'P2P payment confirmed, ' . number_format($order->amount, 4) . ' ' . $order->currency . ' sent to buyer.';
        $adminNotification->click_url = route('admin.p2p.orders.show', $order->id);
        $adminNotification->save();

        return response()->json(['message' => 'Payment confirmed and order status updated.', 'type' => 'success']);
    }


    public function transaction($wallet, $amount, $side, $details, $trx)
    {
        $transaction = new Transaction();
        $transaction->user_id = $wallet->user_id;
        $transaction->amount = $amount;
        $transaction->currency = $wallet->symbol;
        $transaction->post_balance = $wallet->balance;
        $transaction->trx_type = $side;
        $transaction->details = $details;
        $transaction->trx = $trx;
        $transaction->save();
    }

    public function cancelOrder(Request $request, P2POrder $order)
    {
        if (!$order) {
            return response()->json(['message' => 'Order not found.', 'type' => 'error'], 404);
        }

        // Check if the user is authorized to cancel the order
        if (auth()->id() !== $order->buyer_id && auth()->id() !== $order->seller_id) {
            return response()->json(['message' => 'You are not authorized to cancel this order.', 'type' => 'error'], 403);
        }

        // If the order is already cancelled, completed, or paid, return an error message
        if ($order->status === 'cancelled' || $order->status === 'completed') {
            return response()->json(['message' => 'This order is ' . $order->status . ' already.', 'type' => 'error']);
        }

        // If the order is under moderation, show a message that the request is already submitted
        if ($order->moderation_status === 'open') {
            return response()->json(['message' => 'Your request for cancellation is already under moderation.', 'type' => 'warning']);
        }

        // if user is buyer and moderation status is not open and order status is not paid then change order status to cancelled
        if ($order->buyer_id === auth()->id() && $order->moderation_status !== 'open' && $order->status === 'open') {
            $order->update([
                'status' => 'cancelled',
                'moderation_status' => 'completed',
            ]);

            return response()->json(['message' => 'Order cancelled successfully.', 'type' => 'success']);
        }

        $order->update([
            'moderation_status' => 'open',
            'note' => $request->input('reason'),
        ]);

        if ($order->buyer_id === auth()->id()) {
            return response()->json(['message' => 'Order moderation requested successfully.', 'type' => 'success']);
        } else {
            return response()->json(['message' => 'Order cancellation requested successfully.', 'type' => 'success']);
        }
    }
}
