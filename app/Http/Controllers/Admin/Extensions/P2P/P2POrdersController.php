<?php

namespace App\Http\Controllers\Admin\Extensions\P2P;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Extensions\P2P\P2PChatController;
use App\Models\P2P\P2POffer;
use App\Models\P2P\P2POrder;
use App\Models\P2P\P2PSeller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class P2POrdersController extends Controller
{
    public function index()
    {
        $page_title = 'P2P Orders';
        $id = null;
        $offer_id = null;
        return view('extensions.admin.p2p.orders.index', compact('page_title', 'id', 'offer_id'));
    }

    public function show($id)
    {
        $seller = P2PSeller::where('user_id', $id)->first();
        if (!$seller) {
            $notify[] = ['error', 'Seller not found'];
            return back()->withNotify($notify);
        }
        $page_title = 'Seller ' . (isset($seller->user) ? $seller->user->username : $seller->user_id) . ' Orders';
        $offer_id = null;
        return view('extensions.admin.p2p.orders.index', compact('id', 'page_title', 'offer_id'));
    }

    public function offer($offer_id)
    {
        $offer = P2POffer::find($offer_id);
        $page_title = 'Offer ' . $offer->id . ' Orders';
        $id = null;
        return view('extensions.admin.p2p.orders.index', compact('id', 'page_title', 'offer_id'));
    }

    public function view($id)
    {
        abort_if(Gate::denies('p2p_moderate'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $order = P2POrder::with('messages')->findOrFail($id);
        $page_title = 'Order #' . $id;
        $user = Auth::user();
        return view('extensions.admin.p2p.orders.view', compact('order', 'page_title', 'user'));
    }

    public function message(Request $request)
    {
        $orderId = $request->input('order_id');
        $senderId = $request->input('sender_id');
        $senderName = $request->input('sender_name');
        $content = $request->input('content');
        $timestamp = $request->input('timestamp');

        $chatController = new P2PChatController;
        $newMessage = [
            'order_id' => $orderId,
            'sender_id' => $senderId,
            'sender_name' => $senderName,
            'content' => $content,
            'timestamp' => $timestamp
        ];
        $chatController->createMessage($orderId, new Request(['data' => $newMessage]));

        return response()->json(['status' => 'success']);
    }

    public function moderate(Request $request, $id)
    {
        abort_if(Gate::denies('p2p_moderate'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $request->validate([
            'status' => 'required|in:open,paid,completed,cancelled',
        ]);

        // Update the order status
        $order = P2POrder::findOrFail($id);
        $order->status = $request->input('status');
        $order->save();

        return response()->json(['type' => 'success', 'message' => 'Order status updated successfully.']);
    }
}
