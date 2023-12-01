<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderBookDeleted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $currency;
    public $pair;
    public $order;

    public function __construct($currency, $pair, $order)
    {
        $this->currency = $currency;
        $this->pair = $pair;
        $this->order = $order;
    }

    public function broadcastOn()
    {
        return new PrivateChannel("orderbook-data.{$this->currency}.{$this->pair}");
    }

    public function broadcastWith(): array
    {
        return [
            'currency' => $this->currency,
            'pair' => $this->pair,
            'order' => $this->order
        ];
    }

    public function broadcastAs(): string
    {
        return 'orderbook-deleted';
    }
}
