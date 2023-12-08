<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChartDataRequested
{
    use Dispatchable, SerializesModels;

    public $symbol;
    public $currency;
    public $timeframe;

    public function __construct($symbol, $currency, $timeframe)
    {
        $this->symbol = $symbol;
        $this->currency = $currency;
        $this->timeframe = $timeframe;
    }
}
