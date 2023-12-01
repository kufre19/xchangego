<?php

namespace App\Http\Controllers\Extensions\Eco;

use App\Events\ChartDataRequested;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Tatum\Sdk;
use Illuminate\Support\Facades\File;

class ChartController extends Controller
{
    const WITHDRAWAL_CHAINS = ["ETH", "BSC", "MATIC", "KLAY", "CELO", "XDC", "ONE", "TRON"];
    const ESTIMATE_FEE_CHAINS = ["ETH", "BSC", "MATIC", "KLAY", "CELO", "XDC", "ONE"];

    private $eco;
    protected $api;
    private $net;

    public function __construct()
    {
        $this->eco = new Sdk();
        $this->net = getNativeNetwork();
        $this->configureEco();
    }

    private function configureEco()
    {
        $config = $this->net === 'mainnet'
            ? $this->eco->mainnet()->config()
            : $this->eco->testnet()->config();

        $apiKey = $this->net === 'mainnet'
            ? env('TATUM_API_KEY')
            : env('TATUM_TESTNET_API_KEY');

        if (!$apiKey) {
            throw new Exception('API key is not set.');
        }

        $config->setApiKey($apiKey);

        $this->api = $this->net === 'mainnet'
            ? $this->eco->mainnet()->api()
            : $this->eco->testnet()->api();
    }

    public function getChartData(string $symbol, string $currency, string $timeframe)
    {
        try {
            $now = Carbon::now()->getPreciseTimestamp(3);
            $timeframes = $this->getTimeframes();
            $frame = $timeframes[$timeframe] ?? 300000;
        } catch (\Throwable $th) {
            return [
                'type' => 'error',
                'message' => $th->getMessage(),
            ];
        }

        return $this->sendChartRequest($symbol, $currency, $timeframe, $now - $frame * 199, $now);
    }

    public function getBarData(string $symbol, string $currency, string $timeframe)
    {
        $now = Carbon::now()->getPreciseTimestamp(3);
        $timeframes = $this->getTimeframes();
        $frame = $timeframes[$timeframe] ?? 300000;

        return $this->sendChartRequest($symbol, $currency, $timeframe, $now - $frame, $now);
    }

    public function sendChartRequest(string $symbol, string $currency, string $timeframe, int $from, int $to)
    {
        try {
            $chartRequest = (new \Tatum\Model\ChartRequest())
                ->setPair($symbol . '/' . $currency)
                ->setFrom($from)
                ->setTo($to)
                ->setTimeFrame($timeframe);

            try {
                $response = $this->api->orderBook()->chartRequest($chartRequest);
            } catch (\Tatum\Sdk\ApiException $apiExc) {
                $responseObj = $apiExc->getResponseObject();
                $errorMessage = is_array($responseObj) && isset($responseObj['message']) ? $responseObj['message'] : 'An unknown error occurred';
                return [
                    'type' => 'error',
                    'message' => $errorMessage,
                ];
            } catch (\Exception $exc) {
                return (object) [
                    'type' => 'error',
                    'message' => $exc->getMessage(),
                ];
            }

            foreach ($response as &$bar) {
                $bar['timestamp'] = (int) $bar['timestamp'];
            }
        } catch (\Throwable $th) {
            return (object) [
                'type' => 'error',
                'message' => $th->getMessage(),
            ];
        }

        return $response;
    }

    public function saveChartData(string $symbol, string $currency, string $timeframe, array $chartData): void
    {
        $folderPath = storage_path("app/public/charts");
        if (!file_exists($folderPath)) {
            mkdir($folderPath, 0755, true);
        }
        $filename = "{$folderPath}/{$symbol}_{$currency}_{$timeframe}.json";

        // Filter the chart data to only include items with a 'timestamp' key
        $filteredChartData = array_filter($chartData, function ($item) {
            return isset($item['timestamp']);
        });

        file_put_contents($filename, json_encode($filteredChartData));
    }


    public function saveLastBars(string $symbol, string $currency, string $timeframe, array $lastBars): void
    {
        try {
            // Convert Tatum\Model\Chart objects to associative arrays
            $lastBars = array_map(function ($bar) {
                if ($bar instanceof \Tatum\Model\Chart) {
                    // Manually convert the object to an associative array using its getter methods
                    return [
                        'timestamp' => $bar->getTimestamp(),
                        'high' => $bar->getHigh(),
                        'low' => $bar->getLow(),
                        'open' => $bar->getOpen(),
                        'close' => $bar->getClose(),
                        'volume' => $bar->getVolume(),
                    ];
                }
                return $bar;
            }, $lastBars);

            $folderPath = storage_path("app/public/charts");
            if (!file_exists($folderPath)) {
                mkdir($folderPath, 0755, true);
            }
            $filename = "{$folderPath}/{$symbol}_{$currency}_{$timeframe}.json";

            if (file_exists($filename)) {
                // If the JSON file already exists, load its contents
                $chartData = json_decode(file_get_contents($filename), true);

                if (!empty($chartData)) {
                    // If the JSON file already exists, load its contents
                    $chartData = json_decode(file_get_contents($filename), true);
                    $lastIndex = count($chartData) - 1;
                    $lastBar = $chartData[$lastIndex];
                    $timeframes = $this->getTimeframes();
                    $frame = $timeframes[$timeframe] ?? 300000;

                    foreach ($lastBars as $bar) {
                        if ($bar['timestamp'] >= $lastBar['timestamp'] && $bar['timestamp'] < $lastBar['timestamp'] + $frame) {
                            // If the bar is within the current timeframe, update high and low values and volume
                            $lastBar['high'] = max($lastBar['high'], $bar['high']);
                            $lastBar['low'] = min($lastBar['low'], $bar['low']);
                            $lastBar['volume'] += $bar['volume'];
                            $lastBar['close'] = $bar['close'];
                            $lastBar['timestamp'] = $bar['timestamp'];
                        } else {
                            // If the bar is outside the current timeframe, append it to the chart data array
                            $chartData[] = $bar;
                            $lastBar = $bar;
                        }
                    }
                } else {
                    // If the JSON file exists but $chartData is empty, set $chartData to $lastBars
                    $chartData = $lastBars;
                }
            } else {
                // If the JSON file does not exist, set $chartData to $lastBars
                $chartData = $lastBars;
            }


            // Save the updated chart data to the JSON file
            file_put_contents($filename, json_encode($chartData));
        } catch (\Throwable $th) {
        }
    }

    /**
     * Get chart data as a JSON object.
     *
     * @param string $currency The currency to get chart data for (e.g. BTC)
     * @param string $pair The pair to get chart data for (e.g. USD)
     * @param string $timeframe The timeframe to get chart data for (e.g. 1_HOUR)
     * @param int|null $fromTimestamp The start timestamp (in milliseconds) to filter the data, or null for no filter.
     * @param int|null $toTimestamp The end timestamp (in milliseconds) to filter the data, or null for no filter.
     * @return JsonResponse
     */
    public function getChartDataJson(string $currency, string $pair, string $timeframe, int $fromTimestamp = null, int $toTimestamp = null)
    {
        try {
            $path = storage_path("app/public/charts/{$currency}_{$pair}_{$timeframe}.json");
            if (!File::exists($path)) {
                // The JSON file does not exist, retrieve the chart data and save it
                $chartData = $this->getChartData($currency, $pair, $timeframe);
                if (isset($chartData['type']) && $chartData['type'] === 'error') {
                    return response()->json(['error' => $chartData['message']], 400);
                }
                $this->saveChartData($currency, $pair, $timeframe, $chartData);
                $content = json_encode($chartData);
            } else {
                // The JSON file exists, read the content and return it
                $chartData = json_decode(File::get($path), true);
                if (empty($chartData) || $chartData == '[]') {
                    // The JSON file is empty, retrieve the chart data and save it
                    $chartData = $this->getChartData($currency, $pair, $timeframe);
                    if (isset($chartData['type']) && $chartData['type'] === 'error') {
                        return response()->json(['error' => $chartData['message']], 400);
                    }
                    $this->saveChartData($currency, $pair, $timeframe, $chartData);
                }
            }

            // Filter the chart data by timestamp if necessary
            if ($fromTimestamp !== null || $toTimestamp !== null) {
                $chartData = array_filter($chartData, function ($item) use ($fromTimestamp, $toTimestamp) {
                    $timestamp = isset($item['timestamp']) ? (int)$item['timestamp'] : null;

                    if ($fromTimestamp !== null && $toTimestamp !== null) {
                        return $timestamp >= $fromTimestamp && $timestamp <= $toTimestamp;
                    } elseif ($fromTimestamp !== null) {
                        return $timestamp >= $fromTimestamp;
                    } elseif ($toTimestamp !== null) {
                        return $timestamp <= $toTimestamp;
                    }

                    return true;
                });
            }

            return response()->json($chartData);
        } catch (\Throwable $th) {
        }
    }



    public function getChartFilePath(string $symbol, string $currency, string $timeframe): string
    {
        $folderPath = storage_path("app/public/charts");
        return "{$folderPath}/{$symbol}_{$currency}_{$timeframe}.json";
    }

    public function requestChartData($symbol, $currency, $timeframe)
    {
        event(new ChartDataRequested($symbol, $currency, $timeframe));
    }

    private function getTimeframes(): array
    {
        return [
            'MIN_1' => 60000,
            'MIN_3' => 180000,
            'MIN_5' => 300000,
            'MIN_15' => 900000,
            'MIN_30' => 1800000,
            'HOUR_1' => 3600000,
            'HOUR_4' => 14400000,
            'HOUR_12' => 43200000,
            'DAY' => 86400000,
            'WEEK' => 604800000,
            'MONTH' => 2592000000,
            'YEAR' => 31536000000,
        ];
    }

    /**
     * Get chart data for the given timeframe.
     *
     * @param string $currency The currency to get chart data for (e.g. BTC)
     * @param string $pair The pair to get chart data for (e.g. USD)
     * @param string $timeframe The timeframe to get chart data for (e.g. MIN_1)
     * @param int $from The start timestamp (in milliseconds)
     * @param int $to The end timestamp (in milliseconds)
     * @return JsonResponse
     */
    public function getPartialChartData(string $currency, string $pair, string $timeframe, int $from, int $to)
    {
        // Fetch new chart data for the given range
        $newChartData = $this->sendChartRequest($currency, $pair, $timeframe, $from, $to);

        // If there is an error in the response, return an empty array
        if (isset($newChartData->message) && $newChartData->type === 'error') {
            return [];
        }

        // Get the existing chart data from the JSON file
        $jsonFilePath = $this->getChartFilePath($currency, $pair, $timeframe);
        $existingChartData = json_decode(file_get_contents($jsonFilePath), true);

        // Compare new bars with the existing bars and add them if not found
        $updatedChartData = $this->updateChartData($existingChartData, $newChartData);
        if (isset($updatedChartData['type']) && $updatedChartData['type'] === 'error') {
            return [];
        }

        // Save the updated chart data to the JSON file
        $this->saveChartData($currency, $pair, $timeframe, $updatedChartData);

        return $newChartData;
    }


    private function updateChartData(?array $existingChartData, array $newChartData)
    {
        if ($existingChartData === null) {
            $existingChartData = [];
        }

        $updatedChartData = $existingChartData;

        foreach ($newChartData as $newBar) {
            $barFound = false;

            // Check if the new bar exists in the existing data
            foreach ($existingChartData as $existingBar) {
                // Make sure both $newBar and $existingBar are arrays and have the 'timestamp' key
                if (is_array($newBar) && is_array($existingBar) && isset($newBar['timestamp']) && isset($existingBar['timestamp'])) {
                    if ($newBar['timestamp'] === $existingBar['timestamp']) {
                        $barFound = true;
                        break;
                    }
                }
            }

            // If the new bar is not found, add it to the updated data
            if (!$barFound) {
                $updatedChartData[] = $newBar;
            }
        }

        return $updatedChartData;
    }
}
