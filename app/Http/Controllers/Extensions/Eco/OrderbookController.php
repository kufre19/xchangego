<?php

namespace App\Http\Controllers\Extensions\Eco;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Tatum\Sdk;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;


class OrderbookController extends Controller
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

    /**
     * Orderbook.
     *
     * @param Request $request The request object containing optional query parameters.
     * @param string $currency The trading currency (e.g., 'BTC').
     * @param string $pair The pair code (e.g., 'USD').
     * @return array The order book data including bids and asks.
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'currency' => 'required|string',
            'pair' => 'required|string',
            'size' => 'nullable|integer|min:1|max:50',
            'offset' => 'nullable|integer',
        ]);

        $pageSize = $request->input('size', 50);
        $offset = $request->input('offset', 0);
        $symbol = "{$request->currency}/{$request->pair}";

        $buyTrades = $this->getBuyTrades($pageSize, $offset, $symbol, null, 'PRICE_DESC');
        $sellTrades = $this->getSellTrades($pageSize, $offset, $symbol, null, 'PRICE_ASC');

        return response()->json([
            'bids' => $this->processTrades($buyTrades, 'PRICE_DESC'),
            'asks' => $this->processTrades($sellTrades, 'PRICE_ASC'),
        ]);
    }

    public function getOrderBookDataJson(Request $request): JsonResponse
    {
        $request->validate([
            'currency' => 'required|string',
            'pair' => 'required|string',
        ]);

        $currency = $request->currency;
        $pair = $request->pair;

        try {
            $path = storage_path("app/public/orderbooks/{$currency}_{$pair}.json");

            if (!File::exists($path)) {
                // Make a mock request to get order book data
                $orderBookData = $this->getOrderBookData($currency, $pair)->getData(true);

                if (isset($orderBookData['error'])) {
                    return response()->json(['error' => $orderBookData['error']], 400);
                }
            } else {
                $orderBookData = json_decode(File::get($path), true);
                if (empty($orderBookData) || $orderBookData == '[]') {
                    $orderBookData = $this->getOrderBookData($currency, $pair)->getData(true);

                    if (isset($orderBookData['error'])) {
                        return response()->json(['error' => $orderBookData['error']], 400);
                    }
                }
            }

            return response()->json($orderBookData, 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }

    public function getOrderBookData(string $currency, string $pair): JsonResponse
    {
        $pageSize = 50;
        $offset = 0;
        $symbol = "{$currency}/{$pair}";

        $buyTrades = $this->getBuyTrades($pageSize, $offset, $symbol, null, 'PRICE_DESC');
        $sellTrades = $this->getSellTrades($pageSize, $offset, $symbol, null, 'PRICE_ASC');

        $mergedOrderBookData = array_merge($buyTrades, $sellTrades);
        return response()->json($mergedOrderBookData);
    }

    public function getOrderBookDataHistory(Request $request): JsonResponse
    {
        $request->validate([
            'currency' => 'required|string',
            'pair' => 'required|string',
            'size' => 'nullable|integer|min:1|max:50',
        ]);

        $pageSize = $request->input('size', 50);
        $currency = $request->currency;
        $pair = $request->pair;

        // Get existing data
        $path = storage_path("app/public/orderbooks/{$currency}_{$pair}.json");
        $existingData = File::exists($path) ? json_decode(File::get($path), true) : [];

        $buyTrades = $this->getHistoricalTrades('BUY', $pageSize, $currency, $pair, $existingData ?? []);
        $sellTrades = $this->getHistoricalTrades('SELL', $pageSize, $currency, $pair, $existingData ?? []);

        $mergedOrderBookData = array_merge($buyTrades, $sellTrades);

        $this->saveOrderBookData($currency, $pair, $mergedOrderBookData);

        return response()->json($mergedOrderBookData);
    }

    private function getHistoricalTrades($type, $pageSize, $currency, $pair, array $existingTrades)
    {
        $offset = 0;
        $trades = $existingTrades; // Start with the existing trades
        $symbol = "{$currency}/{$pair}";

        while (true) {
            $result = $type === 'BUY' ?
                $this->getBuyTrades($pageSize, $offset, $symbol, null, 'PRICE_DESC') :
                $this->getSellTrades($pageSize, $offset, $symbol, null, 'PRICE_ASC');

            if (empty($result)) break; // Exit the loop if the result is empty.

            foreach ($result as $trade) {
                // If the trade id already exists in our trades array, continue to the next trade.
                if (array_key_exists($trade['id'], $trades)) {
                    // You can update the existing trade here if needed
                    // For example, you could update the amount of the trade:
                    // $trades[$trade['id']]['amount'] = $trade['amount'];
                    continue;
                }

                $trades[$trade['id']] = $trade; // Add the trade to the trades array using the id as the key.
            }

            $offset += $pageSize;
        }

        // Reset the array keys.
        $trades = array_values($trades);

        return $trades;
    }




    public function getBuyTrades(int $pageSize, int $offset, string $pair, string $accountId = null, string $sort = 'CREATED_DESC')
    {
        $query = (new \Tatum\Model\ListOderBookActiveBuyBody())
            ->setPageSize($pageSize)
            ->setOffset($offset)
            ->setPair($pair)
            ->setTradeType('BUY')
            ->setSort([$sort]);

        if ($accountId !== null) {
            $query->setId($accountId);
        }

        try {
            return $this->api->orderBook()->getBuyTradesBody($query);
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
    }

    public function getSellTrades(int $pageSize, int $offset, string $pair, string $accountId = null, string $sort = 'CREATED_DESC')
    {
        $query = (new \Tatum\Model\ListOderBookActiveSellBody())
            ->setPageSize($pageSize)
            ->setOffset($offset)
            ->setPair($pair)
            ->setTradeType('SELL')
            ->setSort([$sort]);

        if ($accountId !== null) {
            $query->setId($accountId);
        }

        try {
            return $this->api->orderBook()->getSellTradesBody($query);
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
    }


    public function saveOrderBookData(string $currency, string $pair, array $orderBookData): void
    {
        $folderPath = storage_path("app/public/orderbooks");
        if (!file_exists($folderPath)) {
            mkdir($folderPath, 0755, true);
        }
        $filename = "{$folderPath}/{$currency}_{$pair}.json";

        // Manually remove duplicate orders based on the 'id' field
        $uniqueOrderBookData = [];
        $seenIds = [];
        foreach ($orderBookData as $order) {
            if (!in_array($order['id'], $seenIds)) {
                $uniqueOrderBookData[] = $order;
                $seenIds[] = $order['id'];
            }
        }

        file_put_contents($filename, json_encode($uniqueOrderBookData));
    }

    public function saveOrderbook(string $currency, string $pair, array $newOrder): void
    {
        $folderPath = storage_path("app/public/orderbooks");
        $filename = "{$folderPath}/{$currency}_{$pair}.json";

        // Check if the order book file exists
        if (file_exists($filename)) {
            // Get the existing order book
            $orderbook = json_decode(file_get_contents($filename), true);
        } else {
            // If the order book file doesn't exist, initialize an empty order book
            $orderbook = [];
        }

        // Check if the order already exists in the order book
        foreach ($orderbook as $index => $existingOrder) {
            if ($existingOrder['id'] === $newOrder['id']) {
                // Update the existing order
                $orderbook[$index] = $newOrder;
            } else if ($existingOrder['price'] == $newOrder['price'] && $existingOrder['type'] != $newOrder['type']) {
                // If an existing order has the same price but opposite type, execute matchmaking
                $remaining = $existingOrder['amount'] - $existingOrder['fill'] - $newOrder['amount'];
                if ($remaining <= 0) {
                    // If the new order fully fills the existing one, remove the existing order
                    unset($orderbook[$index]);
                    $newOrder['amount'] = abs($remaining);
                    $newOrder['fill'] = 0;
                } else {
                    // If the new order partially fills the existing one, update the existing order
                    $orderbook[$index]['amount'] = $remaining;
                    $orderbook[$index]['fill'] = $existingOrder['amount'] - $remaining;
                    // The new order is completely filled, so set its amount to 0
                    $newOrder['amount'] = 0;
                    $newOrder['fill'] = $newOrder['amount'];
                }
            }
        }

        // If the new order still has amount left after matchmaking, add it to the order book
        if ($newOrder['amount'] > 0) {
            $orderbook[] = $newOrder;
        }

        // Write the updated order book back to the file
        file_put_contents($filename, json_encode($orderbook));
    }


    public function getTradeById(string $tradeId)
    {
        try {
            $trade = $this->api->orderBook()->getTradeById($tradeId);

            return $trade;
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
    }

    public function deleteOrder(string $currency, string $pair, string $orderId): void
    {
        $folderPath = storage_path("app/public/orderbooks");
        $filename = "{$folderPath}/{$currency}_{$pair}.json";

        if (file_exists($filename)) {
            // Get the existing order book
            $orderbook = json_decode(file_get_contents($filename), true);

            // Check if the order exists in the order book
            foreach ($orderbook as $index => $existingOrder) {
                if ($existingOrder['id'] === $orderId) {
                    // Remove the order
                    unset($orderbook[$index]);
                    break;
                }
            }

            // Write the updated order book back to the file
            file_put_contents($filename, json_encode($orderbook));
        }
    }
}
