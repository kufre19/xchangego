<?php

namespace App\Http\Controllers;

use App\Models\AdminNotification;
use App\Models\SupportTicket;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Pusher\Pusher;
use Throwable;

class TicketController extends Controller
{
    public function index()
    {
        return response()->json(SupportTicket::with('user')->where('user_id', Auth::id())->latest()->get());
    }

    public function store(Request $request)
    {
        $ticket = new SupportTicket();
        $this->validate($request, [
            'name' => 'required|max:191',
            'email' => 'required|email|max:191',
            'subject' => 'required|max:100',
        ]);

        $user = auth()->user();
        $ticket->user_id = $user->id;
        $ticket->name = $request->name;
        $ticket->email = $request->email;
        $ticket->subject = $request->subject;
        $ticket->last_reply = Carbon::now();
        $ticket->status = 0;
        $ticket->save();

        $adminNotification = new AdminNotification();
        $adminNotification->user_id = $user->id;
        $adminNotification->title = 'New support ticket has opened';
        $adminNotification->click_url = route('admin.ticket.view', $ticket->id);
        $adminNotification->save();

        return response()->json([
            'type' => 'success',
            'message' => 'Support Ticket Created Successfully',
            'id' => $ticket->id
        ]);
    }


    public function getMessages($id)
    {
        try {
            $ticket = SupportTicket::with('user')->where('id', $id)->firstOrFail();
        } catch (\Throwable $th) {
            return response()->json(['type' => 'error', 'message' => 'Ticket not found!']);
        }
        return response()->json(['type' => 'success', 'ticket' => $ticket]);
    }

    public function createMessage($id, Request $request)
    {
        $user = Auth::user();
        $content = $request->input('data.content');
        $timestamp = $request->input('data.timestamp');


        $ticket = SupportTicket::with('user')->where('id', $id)->firstOrFail();

        $message = [
            'ticket_id' => $id,
            'sender_id' => $user->id,
            'sender_name' => $user->name,
            'content' => $content,
            'timestamp' => $timestamp,
            'type' => $request->input('data.type', 'text'), // Set the default value to 'text'
        ];

        $messages = $ticket->messages;
        $messages[] = $message;
        $ticket->messages = $messages;
        $ticket->status = 2;
        $ticket->last_reply = Carbon::now();
        $ticket->save();
        try {
            notify($ticket->user, 'ADMIN_SUPPORT_REPLY', [
                "ticket_id" => $ticket->id,
                "ticket_subject" => "Support ticket reply",
                "reply" => $content,
                "link" => route('user.ticket.view', $ticket->id)
            ]);
            $notify[] = ['success', 'Client Notified By Email Successfully'];
        } catch (Throwable $e) {
            $notify[] = ['warning', 'Mail Not Properly Set'];
        }

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
            $pusher->trigger('support-private-chat-' . $id, 'new_message', $message);
        } catch (\Throwable $e) {
            $notify[] = ['warning', 'Pusher Not Properly Set'];
        }

        (new SupportTicket)->clearCached($id);



        return response()->json([
            'status' => 'success',
            'message' => 'Message sent successfully',
            'data' => $message
        ]);
    }

    public function updateMessage(Request $request)
    {
        $id = $request->input('id');
        $message = $request->input('message');

        $existingMessage = SupportTicket::find($id);
        $existingMessage->message = $message;
        $existingMessage->save();

        (new SupportTicket)->clearCached($id);

        return response()->json(['status' => 'success']);
    }

    public function uploadImage(Request $request)
    {
        $path = imagePath()['ticket']['path'];

        if ($request->hasFile('image')) {
            try {
                $filename = uploadImg($request->file('image'), $path);
            } catch (\Exception $exp) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Image could not be uploaded.',
                ]);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Image uploaded successfully.',
                'image_url' => asset($path . '/' . $filename),
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'No image was provided.',
            ]);
        }
    }
}
