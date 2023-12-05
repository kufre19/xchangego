<?php

namespace App\Http\Controllers\Extensions\Eco;

use App\Http\Controllers\Controller;
use App\Models\Eco\EcoWallet;
use App\Models\Tokens;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tatum\Sdk;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class EcoController extends Controller
{
    const WITHDRAWAL_CHAINS = ["ETH", "BSC", "MATIC", "KLAY", "CELO", "XDC", "ONE", "TRON"];
    const ESTIMATE_FEE_CHAINS = ["ETH", "BSC", "MATIC", "KLAY", "CELO", "XDC", "ONE"];

    private $eco;
    protected $api;
    private $net;
    private $markets;

    public function __construct()
    {
        $this->eco = new Sdk();
        $this->net = getNativeNetwork();
        $this->configureEco();
        $this->markets = getActiveEcoMarkets($this->net);
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
     * Market Details.
     *
     * @param string $currency The currency code (e.g., 'BTC').
     * @param string $pair The trading pair (e.g., 'USD').
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'currency' => 'required|string',
            'pair' => 'required|string',
        ]);

        try {
            $market = getMarketBySymbol($request->currency, $request->pair);

            if (!$market) {
                return response()->json([
                    'message' => 'Validation failed',
                    'error' => 'Market not found',
                ], 422);
            }

            return response()->json($market);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    /**
     * Open/Closed Orders.
     *
     * @param Request $request The request object containing optional query parameters.
     * @param string $currency The currency code (e.g., 'USDT').
     * @param string $currency_chain The trading currency chain (e.g., 'BSC').
     * @param string $pair The trading pair (e.g., 'BTC').
     * @param string $pair_chain The trading pair chain (e.g., 'ETH').
     * @return JsonResponse
     */
    public function orders(Request $request): JsonResponse
    {
        $request->validate([
            'currency' => 'required|string',
            'currency_chain' => 'required|string|in:ETH,BSC,MATIC,KLAY,CELO,ONE,TRON,BTC,DOGE,LTC,SOL',
            'pair' => 'required|string',
            'pair_chain' => 'required|string|in:ETH,BSC,MATIC,KLAY,CELO,ONE,TRON,BTC,DOGE,LTC,SOL',
            'size' => 'integer|min:1|max:50',
            'offset' => 'nullable|integer',
            'token' => 'string',
        ]);

        $user = null;

        if ($request->has('token')) {
            $token = Tokens::with('user')->where('token', $request->input('token'))->first();

            if (!$token) {
                return response()->json([
                    'type' => 'error',
                    'message' => 'Invalid token'
                ], 401);
            }
            $user = $token->user;
        } else {
            $user = Auth::user();
        }

        if (!$user) {
            return response()->json([
                'type' => 'error',
                'message' => 'User not authenticated'
            ], 401);
        }

        $wallet = EcoWallet::where('user_id', $user->id)
            ->where('chain', $request->input('currency_chain'))
            ->where('network', $this->net)
            ->where('symbol', $request->input('currency'))
            ->first();

        if (!$wallet) {
            return response()->json([
                'closed_orders' => null,
                'open_orders' => null,
            ]);
        }

        $pageSize = $request->input('size', 50);
        $offset = $request->input('offset', 0);
        $symbol = $request->input('currency') . '/' . $request->input('pair');

        try {
            $buyOrders = $this->getBuyTrades($pageSize, $offset, $symbol, $wallet->account_id);
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            $responseObj = $apiExc->getResponseObject();
            $errorMessage = is_array($responseObj) && isset($responseObj['message']) ? $responseObj['message'] : 'An unknown error occurred';
            return [
                'type' => 'error',
                'message' => $errorMessage,
            ];
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $exc) {
            return response()->json([
                'type' => 'error',
                'message' => $exc->getMessage(),
            ]);
        }
        try {
            $sellOrders = $this->getSellTrades($pageSize, $offset, $symbol, $wallet->account_id);
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            $responseObj = $apiExc->getResponseObject();
            $errorMessage = is_array($responseObj) && isset($responseObj['message']) ? $responseObj['message'] : 'An unknown error occurred';
            return [
                'type' => 'error',
                'message' => $errorMessage,
            ];
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $exc) {
            return response()->json([
                'type' => 'error',
                'message' => $exc->getMessage(),
            ]);
        }
        try {
            $closedOrders = $this->getHistorical($pageSize, $offset, $symbol, $wallet->account_id);
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            $responseObj = $apiExc->getResponseObject();
            $errorMessage = is_array($responseObj) && isset($responseObj['message']) ? $responseObj['message'] : 'An unknown error occurred';
            return [
                'type' => 'error',
                'message' => $errorMessage,
            ];
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $exc) {
            return response()->json([
                'type' => 'error',
                'message' => $exc->getMessage(),
            ]);
        }
        return response()->json([
            'closed_orders' => $closedOrders,
            'open_orders' => array_merge($buyOrders, $sellOrders),
        ]);
    }


    public function getBuyTrades(int $pageSize, int $offset, string $pair, string $accountId = null, string $sort = 'CREATED_DESC')
    {
        $query = (new \Tatum\Model\ListOderBookActiveBuyBody())
            ->setPageSize($sort !== 'CREATED_DESC' ? 20 : $pageSize)
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
            ->setSort(['CREATED_DESC']);

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


    public function getHistorical(int $pageSize, int $offset, string $pair, string $accountId = null)
    {
        $query = (new \Tatum\Model\ListOderBookHistoryBody())
            ->setPageSize($pageSize)
            ->setOffset($offset)
            ->setPair($pair)
            ->setTypes(['BUY', 'SELL'])
            ->setSort(['CREATED_DESC']);

        if ($accountId !== null) {
            $query->setId($accountId);
        }

        try {
            return $this->api->orderBook()->getHistoricalTradesBody($query);
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


    public function markets_by_symbol(): JsonResponse
    {
        return response()->json($this->markets->keyBy('symbol'));
    }

    public function markets_by_volume(): JsonResponse
    {
        $markets = $this->markets;

        // Calculate and add volume, high, and low for each market
        foreach ($markets as &$market) {
            $currency = $market['currency'];
            $pair = $market['pair'];
            $jsonFilePath = storage_path("app/public/charts/{$currency}_{$pair}_HOUR_1.json");

            if (file_exists($jsonFilePath)) {
                $jsonData = json_decode(file_get_contents($jsonFilePath), true);

                $volume = 0;
                $high = 0;
                $low = 0;

                foreach ($jsonData as $entry) {
                    $volume += floatval($entry['volume']);

                    $timestamp = $entry['timestamp'];
                    $currentTimestamp = time() * 1000; // Current timestamp in milliseconds
                    $twentyFourHoursAgo = $currentTimestamp - (24 * 60 * 60 * 1000); // 24 hours ago in milliseconds

                    if ($timestamp >= $twentyFourHoursAgo && $timestamp <= $currentTimestamp) {
                        $high = max($high, floatval($entry['high']));

                        if ($low === 0) {
                            $low = floatval($entry['low']);
                        } else {
                            $low = min($low, floatval($entry['low']));
                        }
                    }
                }
            } else {
                $volume = 0;
                $high = 0;
                $low = 0;
            }

            $market['volume'] = $volume;
            $market['high'] = $high;
            $market['low'] = $low;
        }

        // Convert the collection to an array
        $marketsArray = $markets->toArray();

        // Sort markets by volume in descending order
        usort($marketsArray, function ($a, $b) {
            return $b['volume'] <=> $a['volume'];
        });

        // Return only the top 10 markets with the highest volumes
        $topMarkets = array_slice($marketsArray, 0, 10);

        return response()->json($topMarkets);
    }

    public function markets_by_pair(): JsonResponse
    {
        $marketsByPair = [];
        foreach ($this->markets->where('type', 'spot') as $market) {
            $currency = $market->currency;
            $pair = $market->pair;
            $jsonFilePath = storage_path("app/public/charts/{$currency}_{$pair}_HOUR_1.json");

            if (file_exists($jsonFilePath)) {
                $jsonData = json_decode(file_get_contents($jsonFilePath), true);
                $lastEntry = end($jsonData);
                $price = $lastEntry['close'] ?? 0;

                $currentTimestamp = time() * 1000; // Current timestamp in milliseconds
                $twentyFourHoursAgo = $currentTimestamp - (24 * 60 * 60 * 1000); // 24 hours ago in milliseconds
                $change = 0;

                foreach ($jsonData as $entry) {
                    $timestamp = $entry['timestamp'];
                    if ($timestamp >= $twentyFourHoursAgo && $timestamp <= $currentTimestamp) {
                        $change = ($price !== 0) ? (($entry['close'] - $price) / $price) * 100 : 0;
                        break;
                    }
                }

                $market->price = $price;
                $market->change = $change;
            } else {
                $market->price = 0;
                $market->change = 0;
            }

            $marketsByPair[$pair][$market->symbol] = $market;
        }

        return response()->json([
            'markets' => $marketsByPair,
        ]);
    }


    /**
     * Historical Trades.
     *
     * @param Request $request The request object containing optional query parameters.
     * @param string $currency The trading currency (e.g., 'BTC').
     * @param string $pair The pair code (e.g., 'USD').
     * @return JsonResponse
     */
    public function trades(Request $request): JsonResponse
    {
        $request->validate([
            'symbol' => 'required|string',
            'currency' => 'required|string',
            'size' => 'integer|min:1|max:50',
            'offset' => 'nullable|integer',
        ]);

        $pageSize = $request->input('size', 50);
        $offset = $request->input('offset', 0);
        $pair = $request->input('symbol') . '/' . $request->input('currency');

        try {
            $trades = $this->getHistorical($pageSize, $offset, $pair);
            return response()->json($trades);
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            $responseObj = $apiExc->getResponseObject();
            $errorMessage = is_array($responseObj) && isset($responseObj['message']) ? $responseObj['message'] : 'An unknown error occurred';
            return response()->json([
                'type' => 'error',
                'message' => $errorMessage,
            ]);
        } catch (\Exception $exc) {
            return response()->json([
                'type' => 'error',
                'message' => $exc->getMessage(),
            ]);
        }
    }


    public function order_balance($id)
    {
        return json_decode($this->api->account()->getAccountBalance($id))->availableBalance;
    }
}
