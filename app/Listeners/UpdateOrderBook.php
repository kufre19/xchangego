<?php

namespace App\Listeners;

use App\Events\OrderBookDeleted;
use App\Events\OrderBookUpdated;
use App\Events\OrderCreated;
use App\Events\OrderDeleted;
use App\Events\OrderUpdated;
use App\Http\Controllers\Extensions\Eco\OrderbookController;

class UpdateOrderBook
{
    protected $orderbookController;

    public function __construct(OrderbookController $orderbookController)
    {
        $this->orderbookController  = $orderbookController;
    }
    public function handle($event)
    {
        if ($event instanceof OrderCreated || $event instanceof OrderUpdated) {
            event(new OrderBookUpdated($event->currency, $event->pair, $event->order));
            $this->orderbookController->saveOrderbook($event->currency, $event->pair, $event->order);
        }

        if ($event instanceof OrderDeleted) {
            event(new OrderBookDeleted($event->currency, $event->pair, $event->order));
            $this->orderbookController->deleteOrder($event->currency, $event->pair, $event->order);
        }
    }
}
