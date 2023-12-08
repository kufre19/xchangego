<?php

namespace App\Http\Controllers\Extensions\Futures;

use App\Http\Controllers\Controller;
use App\Models\Futures\FutureOrder;
use App\Models\Futures\FuturePosition;
use App\Models\Futures\FutureWallets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Throwable;

class OrderController extends Controller
{
    public $api;
    public $provider;
    public function __construct()
    {
        $futureProvider = getProviderFutures();
        if ($futureProvider != null) {

            $futureClass = "\\ccxt\\$futureProvider->title";
            if ($futureProvider->title == 'kucoinfutures') {
                $this->api = new $futureClass(array(
                    'apiKey' => $futureProvider->api,
                    'secret' => $futureProvider->secret,
                    'password' => $futureProvider->password,
                    'options' => array(
                        'versions' => array(
                            'public' => array(
                                'GET' => array(
                                    'currencies/{currency}' => 'v2',
                                ),
                            ),
                        ),
                    ),
                ));
            } else if ($futureProvider->title == 'binanceusdm' || $futureProvider->title == 'binancecoinm') {
                $this->api = new $futureClass(array(
                    'apiKey' => $futureProvider->api,
                    'secret' => $futureProvider->secret,
                    'password' => $futureProvider->password,
                    'options' => array(
                        'adjustForTimeDifference' => true,
                        'recvWindow' => 30000,
                    ),
                ));
            } else {
                $this->api = new $futureClass(array(
                    'apiKey' => $futureProvider->api,
                    'secret' => $futureProvider->secret,
                    'password' => $futureProvider->password,
                ));
            }
            $this->provider = $futureProvider->title;
        } else {
            $this->provider = null;
        }
    }

    public function orders($currency, $pair)
    {
        $user = Auth::user();
        $symbol = $currency . '/' . $pair . ':' . $pair;

        $orders = $this->getOrders($user->id, $symbol, 'closed');
        $openOrders = $this->getOrders($user->id, $symbol, 'open', 'limit',);
        $position = $this->getPosition($user->id, $symbol);

        return response()->json([
            'orders' => $orders,
            'openOrders' => $openOrders,
            'position' => $position,
        ]);
    }

    private function getOrders($userId, $symbol, $status, $type = null)
    {
        $query = FutureOrder::where('user_id', $userId)
            ->where('provider', $this->provider)
            ->where('symbol', $symbol)
            ->where('status', $status);

        if ($type !== null) {
            $query->where('type', $type);
        }

        return $query->latest()
            ->select(['order_id', 'symbol', 'type', 'side', 'price', 'amount', 'cost', 'filled', 'remaining', 'status', 'fee', 'created_at'])
            ->get();
    }

    private function getPosition($userId, $symbol)
    {
        return FuturePosition::where('provider', $this->provider)
            ->where('user_id', $userId)
            ->where('symbol', $symbol)
            ->first();
    }


    public function position($currency, $pair)
    {
        $symbol = $currency . '/' . $pair . ':' . $pair;
        $position = FuturePosition::where('provider', $this->provider)->where('user_id', auth()->user()->id)->where('symbol', $symbol)->first();
        if ($position) {
            $positionResponse = $this->api->fetch_positions([$symbol]);
            if (count($positionResponse) === 0) {
                $position->delete();
                return response()->json([
                    'position' => null,
                ]);
            }
        }

        return response()->json([
            'position' => $position,
        ]);
    }

    public function cancel(Request $request)
    {
        if ($this->provider == null) {
            return $this->createResponse('error', 'Something went wrong, Error code P404');
        }

        try {
            $order = $this->api->fetch_order($request->order_id);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            if ($e->getCode() === 429) {
                return $this->createResponse('warning', 'Too Many Requests. Please try again later.');
            }
            return $this->createResponse('error', 'Order cancellation failed, Please try again.');
        } catch (\Throwable $e) {
            return $this->createResponse('error', 'Order cancellation failed, Please report to support');
        }
        $log = FutureOrder::where('provider', $this->provider)->where('order_id', $request->order_id)->first();

        switch ($order['status']) {
            case 'canceled':
                $this->updateLogStatus($log, $order);
                return $this->createResponse('warning', 'Order canceled already.');

            case 'closed':
                $this->updateLogStatus($log, $order);
                if ($log->position_id !== null) {
                    $position = FuturePosition::where('provider', $this->provider)->where('position_id', $log->position_id)->first();
                    if ($position && $position->availableContracts === 0) {
                        $position->delete();
                    }
                    $parts = explode(':', $log->symbol);
                    $currency = end($parts);
                    $wallet = $this->findWallet($log->user_id, $currency);
                    $this->updateWallet($wallet, $log->cost, 0, true);
                }
                return $this->createResponse('error', 'Order cancellation failed, Order was filled already.');

            case 'filling':
                $this->updateLogStatus($log, $order);
                return $this->createResponse('error', 'Order cancellation failed, Order is getting filled already.');

            default:
                try {
                    $this->api->cancel_order($request->order_id, $request->id);
                } catch (Throwable $e) {
                    return $this->createResponse('error', 'Order cancellation failed, Please report to support');
                }

                $log->status = 'canceled';
                $log->save();


                if ($log->position_id !== null) {
                    $position = FuturePosition::where('provider', $this->provider)->where('position_id', $log->position_id)->first();
                    $position->availableContracts += $log->amount;
                    $position->save();
                    return $this->createResponse('success', 'Order cancelled successfully');
                }
                $this->refundUser($request, $log);

                return $this->createResponse('success', 'Order cancelled successfully');
        }
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

    private function updateLogStatus($log, $order)
    {
        $log->status = $order['status'];
        $log->filled = $order['filled'];
        $log->remaining = $order['remaining'];
        $log->save();
    }

    private function refundUser($request, $log)
    {
        $fee = (getGen()->exchange_fee / 100) * $log->cost;
        $wallet = FutureWallets::where('user_id', Auth::id())->where('provider', $this->provider)->where('symbol', $request->currency)->first();
        $wallet->balance += $log->cost + $fee;
        $wallet->save();
    }

    private function createResponse($type, $message)
    {
        return response()->json([
            'success' => true,
            'type' => $type,
            'message' => $message,
        ]);
    }
}
