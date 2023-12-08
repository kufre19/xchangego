<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChartDataUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $symbol;
    public $currency;
    public $timeframe;
    public $chartData;

    public function __construct($symbol, $currency, $timeframe, array $chartData)
    {
        $this->symbol = $symbol;
        $this->currency = $currency;
        $this->timeframe = $timeframe;
        $this->chartData = $chartData;
    }

    public function broadcastOn()
    {
        return new PrivateChannel("chart-data.{$this->symbol}.{$this->currency}.{$this->timeframe}");
    }

    public function broadcastWith(): array
    {
        return [
            'symbol' => $this->symbol,
            'currency' => $this->currency,
            'timeframe' => $this->timeframe,
            'chartData' => $this->chartData
        ];
    }

    public function broadcastAs(): string
    {
        return 'candlestick';
    }
}
