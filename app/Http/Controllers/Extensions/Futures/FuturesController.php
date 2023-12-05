<?php

namespace App\Http\Controllers\Extensions\Futures;

use App\Http\Controllers\Controller;
use App\Models\Futures\FutureOrder;
use App\Models\Futures\FuturePosition;
use App\Models\Futures\FutureWallets;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Throwable;

class FuturesController extends Controller
{
    public $api;
    public $provider;

    public function __construct()
    {
        $thirdparty = getProviderFutures();
        if ($thirdparty) {
            $exchange_class = "\\ccxt\\$thirdparty->title";
            $this->api = new $exchange_class([
                'apiKey' => $thirdparty->api,
                'secret' => $thirdparty->secret,
                'password' => $thirdparty->password,
                'options' => [
                    'adjustForTimeDifference' => true,
                    'recvWindow' => 30000,
                ],
            ]);
            $this->provider = $thirdparty->title;
        } else {
            $this->provider = null;
        }
    }

    public function store(Request $request)
    {
        $validationResult = $this->validateRequest($request);
        if ($validationResult) {
            return $validationResult;
        }

        $user = Auth::user();
        $price = $request->price;
        $amount = $request->amount;
        $size = $request->size;
        $currency = $request->currency;
        $cost = $amount * $price * $size;
        $fee = (getGen()->exchange_fee / 100) * $cost;

        $wallet = $this->findWallet($user->id, $currency);
        if (!$wallet) {
            return response()->json([
                'type' => 'error',
                'message' => $currency . ' Futures Wallet not found.',
            ]);
        }

        if ($wallet->balance < $cost + $fee) {
            return response()->json([
                'type' => 'error',
                'message' => 'Insufficient balance.',
            ]);
        }

        return $this->executeTrade($user, $wallet, $request, $cost, $fee);
    }

    private function executeTrade($user, $wallet, $request, $cost, $fee)
    {
        if (isset($request->leverage) && $request->leverage > 0) {
            $params['leverage'] = $request->leverage;
        }

        try {
            $order = $this->api->create_order($request->id, $request->type, $request->side, $request->amount, $request->price, $params);
            if (!isset($order['id'])) {
                throw new Exception('Order failed, please try again.');
            }
        } catch (\Throwable $e) {
            return $this->handleTradeError($e);
        }

        try {
            $orderResponse = $this->api->fetch_order($order['id']);

            if ($orderResponse['status'] == 'closed' && $orderResponse['filled'] == 0.0) {
                return response()->json(['error' => 'The order was closed without being executed. Please try again later or contact support.', 'type' => 'error']);
            }

            if ($request->type == 'limit' && $orderResponse['status'] != 'closed') {
                // Limit order is not yet closed, save the order and subtract balance
                $this->saveTrade($user, $orderResponse, $request, $cost, $fee);
                $this->updateWallet($wallet, $cost, $fee);

                return response()->json([
                    'type' => 'success',
                    'message' => ucfirst($orderResponse['side']) . ' Order of (' . $request->amount . ' Lot ' . $orderResponse['symbol'] . ') placed successfully',
                ]);
            }

            $position = FuturePosition::where('provider', $this->provider)
                ->where('symbol', $orderResponse['symbol'])
                ->where('user_id', $user->id)
                ->first();

            if (!$position) {
                $positionResponse = $this->api->fetch_position($request->id);

                if ($positionResponse['entryPrice'] == 0) {
                    return response()->json(['error' => 'The order was closed without being executed. Please try again later or contact support.', 'type' => 'error']);
                }

                $newPosition = [
                    "id" => $positionResponse["id"],
                    "symbol" => $positionResponse["symbol"],
                    "initialMargin" => $request->price,
                    "maintenanceMargin" => $positionResponse['maintenanceMargin'],
                    "entryPrice" => $request->price,
                    "leverage" => $request->leverage,
                    "contracts" => $request->amount,
                    'availableContracts' => $request->amount,
                    "contractSize" => $positionResponse["contractSize"],
                    "liquidationPrice" => $positionResponse["liquidationPrice"],
                    "marginMode" => $positionResponse["marginMode"],
                    "side" => $positionResponse["side"],
                ];

                $this->savePosition($user->id, $newPosition);
            } else {
                $position->leverage = $request->leverage > $position->leverage ? $request->leverage : $position->leverage;
                $position->contracts = $position->contracts + $request->amount;
                $position->save();
            }

            $log = $this->saveTrade($user, $orderResponse, $request, $cost, $fee);
            $this->updateWallet($wallet, $cost, $fee);

            return response()->json([
                'type' => 'success',
                'message' => ucfirst($log->side) . ' Order of (' . $request->amount . ' Lot ' . $orderResponse['symbol'] . ') placed successfully',
            ]);
        } catch (\Throwable $e) {
            return $this->handleTradeError($e);
        }
    }

    private function saveTrade($user, $orderResponse, $request, $cost, $fee)
    {
        $log = new FutureOrder();
        $log->fill([
            'user_id' => $user->id,
            'order_id' => $orderResponse['id'],
            'symbol' => $orderResponse['symbol'],
            'type' => $orderResponse['type'],
            'side' => $orderResponse['side'],
            'price' => $orderResponse['price'],
            'stopPrice' => $orderResponse['stopPrice'],
            'amount' => $request->amount,
            'cost' => $cost,
            'average' => $orderResponse['average'],
            'filled' => $orderResponse['filled'],
            'remaining' => $orderResponse['remaining'],
            'status' => $orderResponse['status'],
            'fee' => $fee,
            'provider' => $this->provider,
            'leverage' => $request->leverage,
        ]);
        $log->save();

        return $log;
    }

    private function savePosition($userId, $newPosition)
    {
        $position = FuturePosition::where('provider', $this->provider)
            ->where('symbol', $newPosition['symbol'])
            ->where('user_id', $userId)
            ->first();

        if (!$position) {
            $position = new FuturePosition();
            $position->symbol = $newPosition['symbol'];
            $position->user_id = $userId;
            $position->position_id = $newPosition['id'];
        }

        $position->fill([
            'initialMargin' => $newPosition['initialMargin'],
            'maintenanceMargin' => $newPosition['maintenanceMargin'],
            'entryPrice' => $newPosition['entryPrice'],
            'leverage' => $newPosition['leverage'],
            'contracts' => $newPosition['contracts'],
            'availableContracts' => $newPosition['contracts'],
            'contractSize' => $newPosition['contractSize'],
            'liquidationPrice' => $newPosition['liquidationPrice'],
            'marginMode' => $newPosition['marginMode'],
            'side' => $newPosition['side'],
            'provider' => $this->provider,
        ]);
        $position->save();
    }

    public function refresh(Request $request)
    {
        $user = Auth::user();
        $symbol = $request->symbol . '/' . $request->currency . ':' . $request->currency;

        $openOrders = FutureOrder::where('provider', $this->provider)
            ->where('status', '!=', 'closed')
            ->where('symbol', $request->symbol . '/' . $request->currency . ':' . $request->currency)
            ->where('user_id', $user->id)
            ->get();

        $isOrderStatusChanged = false;

        foreach ($openOrders as $order) {
            $orderResponse = $this->api->fetch_order($order->order_id, $request->id);

            if ($orderResponse['status'] !== $order->status) {

                $order->status = $orderResponse['status'];
                $order->filled = $orderResponse['filled'];
                $order->remaining = $orderResponse['remaining'];

                if ($orderResponse['status'] === 'closed' && $order->position_id !== null) {
                    $position = FuturePosition::where('provider', $this->provider)
                        ->where('position_id', $order->position_id)
                        ->where('user_id', $user->id)
                        ->first();

                    if ($position) {
                        $position->contracts = $position->availableContracts;
                        $position->save();

                        if ($position->contracts === 0) {
                            $position->delete();
                        }
                    }

                    $wallet = $this->findWallet($user->id, $request->currency);
                    $this->updateWallet($wallet, $order->cost, $order->fee, true);
                } else {
                    $openPosition = FuturePosition::where('provider', $this->provider)
                        ->where('user_id', $user->id)
                        ->where('symbol', $symbol)
                        ->first();

                    if (!$openPosition) {
                        try {
                            $positionData = $this->api->fetch_position($request->id);
                        } catch (\Throwable $th) {
                            $positionData = null;
                        }
                    } else {
                        $positionData = $openPosition;
                    }

                    $newPosition = [
                        "id" => $openPosition ? $positionData["position_id"] : $positionData["id"],
                        'symbol' => $positionData['symbol'],
                        'initialMargin' => $openPosition ? $order->price : $positionData['entryPrice'],
                        'maintenanceMargin' => $positionData['maintenanceMargin'],
                        'entryPrice' => $openPosition ? $order->price : $positionData['entryPrice'],
                        'leverage' => $openPosition ? $order->leverage : $positionData['leverage'],
                        'contracts' => $openPosition ? $positionData['contracts'] + $order->amount : $order->amount,
                        'availableContracts' => $openPosition ? $positionData['availableContracts'] + $order->amount : $order->amount,
                        'contractSize' => $positionData['contractSize'],
                        'liquidationPrice' => $positionData['liquidationPrice'],
                        'marginMode' => $positionData['marginMode'],
                        'side' => $order->side === 'buy' ? 'long' : 'short',
                    ];

                    $this->savePosition($user->id, $newPosition);
                }

                $order->save();

                $isOrderStatusChanged = true;
            }
        }

        if ($isOrderStatusChanged) {
            return response()->json([
                'success' => true,
            ]);
        } else {
            return response()->json([
                'success' => false,
            ]);
        }
    }

    public function sell(Request $request)
    {
        $validationResult = $this->validateRequest($request);
        if ($validationResult) {
            return $validationResult;
        }

        $user = Auth::user();
        $symbol = $request->symbol . '/' . $request->currency . ':' . $request->currency;
        $position = FuturePosition::where('provider', $this->provider)
            ->where('symbol', $symbol)
            ->where('user_id', $user->id)
            ->first();

        if (!$position) {
            return response()->json([
                'type' => 'error',
                'message' => 'Position not found.',
            ]);
        }

        $side = $position->side === 'long' ? 'sell' : 'buy';

        try {
            $oppositeOrder = $this->api->create_order($request->id, $request->type, $side, $request->amount, $request->price);
            if (!isset($oppositeOrder['id'])) {
                throw new Exception('Opposite order was not created successfully.');
            }
        } catch (Throwable $e) {
            return $this->handleTradeError($e);
        }

        try {
            $orderResponse = $this->api->fetch_order($oppositeOrder['id']);
        } catch (\Throwable $th) {
            return $this->handleTradeError($th);
        }

        if ($request->type === 'limit') {
            $position->availableContracts -= $request->amount;
            $position->save();
        } else {
            if ($position->contracts > $request->amount) {
                $position->contracts -= $request->amount;
                $position->save();
            } else {
                $position->delete();
            }
        }


        $log = new FutureOrder();
        $log->fill([
            'user_id' => $user->id,
            'order_id' => $orderResponse['id'],
            'position_id' => $request->type == 'limit' ? $position->position_id : null,
            'symbol' => $orderResponse['symbol'],
            'type' => $orderResponse['type'],
            'side' => $orderResponse['side'],
            'price' => $orderResponse['price'],
            'stopPrice' => $orderResponse['stopPrice'],
            'amount' => $orderResponse['amount'],
            'cost' => $orderResponse['cost'],
            'average' => $orderResponse['average'],
            'filled' => $orderResponse['filled'],
            'remaining' => $orderResponse['remaining'],
            'status' => $orderResponse['status'],
            'fee' => 0,
            'provider' => $this->provider,
        ]);
        $log->save();

        if ($request->type !== 'limit') {
            $wallet = $this->findWallet($user->id, $request->currency);
            $this->updateWallet($wallet, $orderResponse['cost'], 0, true);
        }

        return response()->json([
            'type' => 'success',
            'message' => ucfirst($log->side) . ' Order to close position (' . $request->amount . ' Lot ' . $position->symbol . ') placed successfully',
        ]);
    }

    public function addTakeProfitStopLoss(Request $request)
    {
        // Add implementation for adding take profit and stop loss orders
    }

    private function findWallet($userId, $currency)
    {
        return FutureWallets::where('user_id', $userId)
            ->where('symbol', $currency)
            ->where('provider', $this->provider)
            ->first();
    }

    private function updateWallet($wallet, $cost, $fee, $isDeposit = false)
    {
        if ($isDeposit) {
            $wallet->balance += $cost;
            $wallet->available += $cost;
            $wallet->save();
            return;
        }
        $wallet->balance -= $cost + $fee;
        $wallet->available -= $cost + $fee;
        $wallet->save();
    }

    private function handleTradeError($e)
    {
        $message = str_replace($this->provider . ' ', '', $e->getMessage());
        $message = !is_array($message) && $this->isJson($message) ? json_decode($message)->msg : $message;

        if ($e instanceof \GuzzleHttp\Exception\ClientException) {
            $statusCode = $e->getResponse()->getStatusCode();

            if ($statusCode === 429) {
                return response()->json(['error' => 'Too Many Requests. Please try again later.', 'type' => 'warning']);
            }
        }

        $responseType = ($this->provider === 'binance' || $this->provider === 'binanceus') ? 'warning' : 'error';

        return response()->json([
            'type' => $responseType,
            'message' => $message,
        ]);
    }


    private function isJson($string)
    {
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }

    private function validateRequest($request)
    {
        $validate = Validator::make($request->all(), [
            'amount' => 'required|numeric',
            'price' => 'numeric',
        ], [
            'amount.required' => 'Amount is required.',
            'amount.numeric' => 'Amount must be numeric.',
            'price.numeric' => 'Price must be numeric.',
        ]);

        if ($validate->fails()) {
            return response()->json($validate->errors());
        }

        return null;
    }

    public function cron()
    {
        $marketsPath = public_path('data/markets/futures.json');
        $dir = dirname($marketsPath);

        if (!file_exists($dir)) {
            mkdir($dir, 0777, true);
        }

        if (!file_exists($marketsPath)) {
            file_put_contents($marketsPath, "[]");
        }

        if ($this->provider !== null) {
            $markets = $this->api->fetch_markets();
            $datas = [];

            foreach ($markets as $market) {
                $marketData = [
                    'symbol' => $market['symbol'],
                    'base' => $market['base'],
                    'quote' => $market['quote'],
                    'type' => $market['type'],
                    'status' => 1
                ];

                $datas[$market['quote']][$market['symbol']] = $marketData;
            }

            $newJsonString = json_encode($datas, JSON_PRETTY_PRINT);
            file_put_contents($marketsPath, stripslashes($newJsonString));
        }

        cronLastRun('futures_to_table');
    }
}
