<?php

namespace App\Listeners;

use App\Events\ChartDataRequested;
use App\Events\ChartDataUpdated;
use App\Http\Controllers\Extensions\Eco\ChartController;

class FetchChartData
{
    protected $chart;

    public function __construct(ChartController $chart)
    {
        $this->chart = $chart;
    }

    public function handle(ChartDataRequested $event)
    {
        $chartData = $this->chart->getChartData($event->symbol, $event->currency, $event->timeframe);
        if (!isset($chartData->type) || $chartData->type !== 'error') {
            event(new ChartDataUpdated($event->symbol, $event->currency, $event->timeframe, $chartData));
            $this->chart->saveChartData($event->symbol, $event->currency, $event->timeframe, $chartData);
        }
    }
}
