<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SupportAttachment;
use App\Models\SupportMessage;
use App\Models\SupportTicket;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Throwable;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;
use Pusher\Pusher;

class SupportTicketController extends Controller
{
    public function tickets()
    {
        abort_if(Gate::denies('support_ticket_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = 'Support Tickets';
        return view('admin.support.tickets', compact('page_title'));
    }

    public function ticketReply($id)
    {
        abort_if(Gate::denies('support_ticket_reply'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $ticket = SupportTicket::with('user')->where('id', $id)->firstOrFail();
        $page_title = 'Support Tickets';
        $messages = SupportMessage::with('ticket')->where('supportticket_id', $ticket->id)->latest()->get();
        $user = Auth::user();
        return view('admin.support.reply', compact('ticket', 'messages', 'page_title', 'user'));
    }

    public function getMessages($id)
    {
        $chat = (new SupportTicket)->getCached($id);
        if (!$chat) {
            return response()->json([]);
        }
        return response()->json($chat->messages);
    }

    public function createMessage($id, Request $request)
    {
        $user = Auth::user();
        $content = $request->input('content');
        $timestamp = $request->input('timestamp');

        $ticket = SupportTicket::with('user')->where('id', $id)->firstOrFail();

        // Add your attachment handling logic here if necessary

        $message = [
            'ticket_id' => $id,
            'sender_id' => $user->id,
            'sender_name' => $user->name,
            'content' => $content,
            'type' => 'text',
            'timestamp' => $timestamp
        ];

        $messages = $ticket->messages;
        $messages[] = $message;
        $ticket->messages = $messages;
        $ticket->status = 1;
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

    public function close($id)
    {
        $ticket = SupportTicket::with('user')->where('id', $id)->firstOrFail();
        $ticket->status = 3;
        $ticket->save();
        return response()->json(['type' => 'success', 'message' => 'Ticket Closed Successfully']);
    }



    public function ticketReplySend(Request $request, $id)
    {
        $ticket = SupportTicket::with('user')->where('id', $id)->firstOrFail();
        $message = new SupportMessage();
        $user = Auth::user();
        if ($request->replayTicket == 1) {

            $imgs = $request->file('attachments');
            $allowedExts = array('jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx');

            $this->validate($request, [
                'attachments' => [
                    'max:4096',
                    function ($attribute, $value, $fail) use ($imgs, $allowedExts) {
                        foreach ($imgs as $img) {
                            $ext = strtolower($img->getClientOriginalExtension());
                            if (($img->getSize() / 1000000) > 2) {
                                return $fail("Images MAX  2MB ALLOW!");
                            }

                            if (!in_array($ext, $allowedExts)) {
                                return $fail("Only png, jpg, jpeg, pdf, doc, docx files are allowed");
                            }
                        }
                        if (count($imgs) > 5) {
                            return $fail("Maximum 5 files can be uploaded");
                        }
                    }
                ],
                'message' => 'required',
            ]);

            $message->supportticket_id = $ticket->id;
            $message->admin_id = $user->id;
            $message->message = $request->message;
            $message->save();

            if ($message) {
                $ticket->status = 1;
                $ticket->last_reply = Carbon::now();
                $ticket->save();
                try {
                    notify($ticket->user, 'ADMIN_SUPPORT_REPLY', [
                        "ticket_id" => $ticket->id,
                        "ticket_subject" => "Support ticket reply",
                        "reply" => $request->message,
                        "link" => route('user.ticket.view', $ticket->id)
                    ]);
                    $notify[] = ['success', 'Client Notified By Email Successfully'];
                } catch (Throwable $e) {
                    $notify[] = ['warning', 'Mail Not Properly Set'];
                }
            }

            $path = imagePath()['ticket']['path'];
            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $file) {
                    try {
                        $attachment = new SupportAttachment();
                        $attachment->support_message_id = $message->id;
                        $attachment->attachment = uploadFile($file, $path);
                        $attachment->save();
                    } catch (\Exception $exp) {
                        $notify[] = ['error', 'Could not upload your ' . $file];
                        return back()->withNotify($notify)->withInput();
                    }
                }
            }

            $notify[] = ['success', "Support ticket replied successfully"];
        } elseif ($request->replayTicket == 2) {
            $ticket->status = 3;
            $ticket->save();
            $notify[] = ['success', "Support ticket closed successfully"];
        }
        return back()->withNotify($notify);
    }


    public function ticketDownload($ticket_id)
    {
        $attachment = SupportAttachment::findOrFail(decrypt($ticket_id));
        $file = $attachment->attachment;


        $path = imagePath()['ticket']['path'];

        $full_path = $path . '/' . $file;
        $title = $attachment->supportMessage->ticket->subject . '-' . $file;
        $ext = pathinfo($file, PATHINFO_EXTENSION);
        $mimetype = mime_content_type($full_path);
        header('Content-Disposition: attachment; filename="' . $title);
        header("Content-Type: " . $mimetype);
        return readfile($full_path);
    }
    public function ticketDelete(Request $request)
    {
        abort_if(Gate::denies('support_ticket_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $message = SupportMessage::findOrFail($request->message_id);
        $path = imagePath()['ticket']['path'];
        if ($message->attachments()->count() > 0) {
            foreach ($message->attachments as $img) {
                @unlink($path . '/' . $img->image);
                $img->delete();
            }
        }
        $message->delete();
        $notify[] = ['success', "Delete Successfully"];
        return back()->withNotify($notify);
    }
}
