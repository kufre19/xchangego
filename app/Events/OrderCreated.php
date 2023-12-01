<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderCreated
{
    use Dispatchable, SerializesModels;

    public $currency;
    public $pair;
    public $order;

    public function __construct($currency, $pair, $order)
    {
        $this->currency = $currency;
        $this->pair = $pair;
        $this->order = $order;
    }
}
