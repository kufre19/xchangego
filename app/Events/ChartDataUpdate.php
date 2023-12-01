<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChartDataUpdate implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $data;

    public function __construct($symbol, $currency, $timeframe, $chartData)
    {
        $this->data = [
            'symbol' => $symbol,
            'currency' => $currency,
            'timeframe' => $timeframe,
            'chartData' => $chartData
        ];
    }

    public function broadcastOn(): Channel
    {
        return new PrivateChannel("chart-data.{$this->data['symbol']}.{$this->data['currency']}.{$this->data['timeframe']}");
    }

    public function broadcastWith()
    {
        return $this->data;
    }
}
