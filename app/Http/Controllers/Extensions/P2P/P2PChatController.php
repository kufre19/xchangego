<?php

namespace App\Http\Controllers\Extensions\P2P;

use App\Events\NewMessage;
use App\Http\Controllers\Controller;
use App\Models\P2P\P2PChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Pusher\Pusher;
use Illuminate\Support\Facades\Broadcast;


class P2PChatController extends Controller
{
    /**
     * Get all chat messages for a given chat.
     *
     * @param int $orderId The order ID to retrieve messages for.
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMessages($id)
    {
        $chat = (new P2PChatMessage)->getCache($id);
        if (!$chat) {
            $chat = P2PChatMessage::create([
                'order_id' => $id,
                'messages' => [],
            ]);
        }
        return response()->json($chat->messages);
    }

    /**
     * Create a new chat message.
     *
     * @param int $orderId The order ID the message belongs to.
     * @param \Illuminate\Http\Request $request The HTTP request.
     * @return \Illuminate\Http\JsonResponse
     */
    public function createMessage($id, Request $request)
    {
        $chat = P2PChatMessage::where('order_id', $id)->first();

        if (!$chat) {
            $chat = P2PChatMessage::create([
                'order_id' => $id,
                'messages' => [],
            ]);
        }

        $message = $request->data;
        $message['sender_id'] = Auth::id();
        $messages = $chat->messages;
        $messages[] = $message;
        $chat->update(['messages' => $messages]);

        $pusher = new Pusher(
            config('broadcasting.connections.pusher.key'),
            config('broadcasting.connections.pusher.secret'),
            config('broadcasting.connections.pusher.app_id'),
            [
                'cluster' => config('broadcasting.connections.pusher.options.cluster'),
                'useTLS' => true,
                'curl_options' => [
                    CURLOPT_SSL_VERIFYHOST => false,
                    CURLOPT_SSL_VERIFYPEER => false,
                ],
            ]
        );

        try {
            $pusher->trigger('private-chat-' . $id, 'new_message', $message);
        } catch (\Throwable $e) {
        }

        (new P2PChatMessage)->clearCache($id);


        return response()->json([
            'status' => 'success',
            'message' => 'Message saved successfully',
            'data' => $message
        ]);
    }



    /**
     * Update an existing chat message.
     *
     * @param \Illuminate\Http\Request $request The HTTP request.
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateMessage(Request $request)
    {
        $id = $request->input('id');
        $message = $request->input('message');

        $existingMessage = P2PChatMessage::find($id);
        $existingMessage->message = $message;
        $existingMessage->save();

        (new P2PChatMessage)->clearCache($id);

        return response()->json(['status' => 'success']);
    }
}
