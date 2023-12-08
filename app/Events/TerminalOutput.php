<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TerminalOutput implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $data;

    public function __construct($type, $buffer)
    {
        $this->data = json_encode(['type' => $type, 'data' => $buffer]);
    }

    public function broadcastOn()
    {
        return new PrivateChannel('terminal');
    }

    public function broadcastWith()
    {
        return [
            'data' => $this->data,
        ];
    }
}
