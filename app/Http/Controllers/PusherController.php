<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Pusher\Pusher;

class PusherController extends Controller
{
    public function authenticate(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $socket_id = $request->input('socket_id');
        $channel_name = $request->input('channel_name');

        $pusher = new Pusher(
            config('broadcasting.connections.pusher.key'),
            config('broadcasting.connections.pusher.secret'),
            config('broadcasting.connections.pusher.app_id'),
            config('broadcasting.connections.pusher.options')
        );

        $presence_data = [
            'user_id' => $user->id,
            'user_info' => [
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->profile_photo_path,
            ]
        ];

        // Change socket_auth to presence_auth
        $auth = $pusher->presence_auth($channel_name, $socket_id, $user->id, $presence_data);

        return response(json_decode($auth, true));
    }
}
