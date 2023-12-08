<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ExchangeLogs;
use App\Models\ThirdpartyOrders;
use App\Models\Wallet;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Throwable;

class ExchangeController extends Controller
{
    public $provider;
    public $api;
    public function __construct()
    {
        $thirdparty = getProvider();
        if ($thirdparty) {
            $exchange_class = "\\ccxt\\$thirdparty->title";
            if ($thirdparty->title == 'binance' || $thirdparty->title == 'binanceus') {
                $this->api = new $exchange_class(array(
                    'apiKey' => $thirdparty->api,
                    'secret' => $thirdparty->secret,
                    'password' => $thirdparty->password,
                    'options' => array(
                        'adjustForTimeDifference' => true,
                        'recvWindow' => 30000,
                    ),
                ));
            } else {
                $this->api = new $exchange_class(array(
                    'apiKey' => $thirdparty->api,
                    'secret' => $thirdparty->secret,
                    'password' => $thirdparty->password,
                ));
            }
            $this->provider = $thirdparty->title;
        } else {
            $this->provider = null;
        }
    }

    public function btcRate(Request $request)
    {
        $cryptoRate = getCoinRate($request->coinSymbol);
        return $cryptoRate;
    }

    public function trading()
    {
        $fee = getGen()->exchange_fee;
        $pfee = $fee / 100;

        $provider = $this->provider ?? 'kucoin';
        $provide = $provider === 'coinbasepro' ? 'COINBASE' : strtoupper($provider);

        return response()->json([
            'provider' => $provider,
            'provide' => $provide,
            'fee' => $fee,
            'pfee' => $pfee,
        ]);
    }


    public function trading_orders()
    {
        $user = Auth::user();

        $wallets = $this->fetchTradingWallets($user->id);
        $orders['market'] = $this->fetchOrdersByType($user->id, 'market');
        $orders['limit'] = $this->fetchOrdersByType($user->id, 'limit');

        return response()->json([
            'wallets' => $wallets,
            'orders' => $orders
        ]);
    }

    private function fetchTradingWallets($userId)
    {
        $provider = $this->provider ?? 'funding';
        return Wallet::where('provider', $provider)
            ->where('user_id', $userId)
            ->where('type', 'trading')
            ->where('address', '!=', null)
            ->get();
    }

    private function fetchOrdersByType($userId, $type)
    {
        $model = $this->provider ? ThirdpartyOrders::class : ExchangeLogs::class;

        return $model::where('provider', $this->provider ?? 'local')
            ->where('user_id', $userId)
            ->where('type', $type)
            ->latest()
            ->get();
    }

    public function trading_market_orders($symbol, $currency)
    {
        $user = Auth::user();
        $orders['closed'] = $this->fetchOrdersByStatus($user->id, $symbol, $currency, ['closed', 'canceled']);
        $orders['open'] = $this->fetchOrdersByStatus($user->id, $symbol, $currency, ['open', 'filling']);

        return response()->json([
            'orders' => $orders
        ]);
    }

    private function fetchOrdersByStatus($userId, $symbol, $currency, $status)
    {
        $model = $this->provider ? ThirdpartyOrders::class : ExchangeLogs::class;

        return $model::where('user_id', $userId)
            ->where('provider', $this->provider ?? 'local')
            ->where('symbol', $symbol . '/' . $currency)
            ->whereIn('status', $status)
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $validationResult = $this->validateRequest($request);
        if ($validationResult) {
            return $validationResult;
        }

        $user = Auth::user();
        $fee = (getGen()->exchange_fee / 100) * $request->amount;
        $price = $request->price;
        $provider = $request->wallettype == 'funding' ? 'funding' : $this->provider;

        if (!$this->checkWallets($user->id, $request->wallettype, $request->currency, $request->symbol, $provider)) {
            return response()->json([
                'success' => false,
                'type' => 'error',
                'message' => 'Wallets not found.',
            ]);
        }

        if (!$this->walletHasEnoughBalance($user->id, $request->wallettype, $request->currency, $request->symbol, $provider, $fee, $price, $request->side, $request->amount)) {
            return response()->json([
                'success' => false,
                'type' => 'error',
                'message' => 'Insufficient balance.',
            ]);
        }

        return $this->handleTradeExecution($user, $request, $provider, $request->type, $request->side, $fee, $price);
    }



    private function validateRequest($request)
    {
        $validate = Validator::make($request->all(), [
            'amount' => 'required|numeric',
            'price' => 'numeric',
        ]);

        if ($validate->fails()) {
            return response()->json($validate->errors());
        }

        return null;
    }

    private function checkWallets($userId, $walletType, $currency, $symbol, $provider)
    {
        $hasCurrencyWallet = isWallet($userId, $walletType, $currency, $provider);
        $hasSymbolWallet = isWallet($userId, $walletType, $symbol, $provider);

        return $hasCurrencyWallet && $hasSymbolWallet;
    }

    private function walletHasEnoughBalance($userId, $walletType, $currency, $symbol, $provider, $fee, $price, $side, $amount)
    {
        $currencyWallet = getWallet($userId, $walletType, $currency, $provider);
        $symbolWallet = getWallet($userId, $walletType, $symbol, $provider);

        if ($side == 'buy') {
            return $currencyWallet->balance > ($price * $amount + $fee);
        } else {
            return $symbolWallet->balance > $amount + $fee;
        }
    }



    private function handleTradeExecution($user, $request, $provider, $tradeType, $side, $fee, $price)
    {
        if ($this->provider != null && getPlatform('trading')->practice != 1) {
            return $this->executeThirdPartyTrade($user, $request, $tradeType, $side, $fee, $price);
        } else {
            return $this->executeLocalTrade($user, $request, $provider, $tradeType, $side, $fee, $price);
        }
    }

    private function executeThirdPartyTrade($user, $request, $tradeType, $side, $fee, $price)
    {
        $exchangeLog = new ThirdpartyOrders();
        $exchangeLog->user_id = $user->id;
        try {
            $order = $tradeType == 'limit' ? $this->api->create_order($request->symbol . '/' . $request->currency, $tradeType, $side, $request->amount, $request->price) : $this->api->create_order($request->symbol . '/' . $request->currency, $tradeType, $side, $request->amount);
        } catch (Throwable $e) {
            return $this->handleTradeExecutionError($e);
        }

        $fetch_order = $this->api->fetch_order($order['id'], $request->symbol . '/' . $request->currency);

        if ($fetch_order['status'] == 'closed' && $fetch_order['filled'] == 0.0) {
            return response()->json(['error' => 'The order was closed without being executed. Please try again later or contact support.'], 400);
        }

        return $this->saveThirdPartyTrade($user, $request, $exchangeLog, $order, $fee, $price, $side);
    }



    private function handleTradeExecutionError($e)
    {
        $message = str_replace($this->provider . ' ', '', $e->getMessage());
        $message = !is_array($message) && $this->isJson($message) ? json_decode($message)->msg : $message;
        $responseType = ($this->provider == 'binance' || $this->provider == 'binanceus') ? 'warning' : 'error';

        return response()->json([
            'success' => true,
            'type' => $responseType,
            'message' => $message,
        ]);
    }

    private function isJson($string)
    {
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }

    private function saveThirdPartyTrade($user, $request, $exchangeLog, $order, $fee, $price, $side)
    {
        $fetch_order = $this->api->fetch_order($order['id'], $request->symbol . '/' . $request->currency);
        $exchangeLog = $this->fillExchangeLogWithOrderData($exchangeLog, $order, $fetch_order, $request, $fee);

        $wc = getWallet($user->id, $request->wallettype, $request->currency, $this->provider);
        $ws = getWallet($user->id, $request->wallettype, $request->symbol, $this->provider);
        $this->updateWalletBalancesAfterTrade($wc, $ws, $side, $fee, $price, $request, $fetch_order);

        return response()->json([
            'type' => 'success',
            'message' => ucfirst($exchangeLog->side) . ' Order of (' . $request->amount . ' ' . getPair($exchangeLog->symbol)[0] . ') placed successfully',
        ]);
    }

    private function executeLocalTrade($user, $request, $provider, $tradeType, $side, $fee, $price)
    {
        $exchangeLog = new ExchangeLogs();
        $exchangeLog->user_id = $user->id;
        $exchangeLog = $this->fillExchangeLogWithLocalData($exchangeLog, $request, $tradeType, $side, $fee);

        $wc = getWallet($user->id, $request->wallettype, $request->currency, $provider);
        $ws = getWallet($user->id, $request->wallettype, $request->symbol, $provider);
        $this->updateWalletBalancesAfterTrade($wc, $ws, $side, $fee, $price, $request, $exchangeLog);

        return response()->json([
            'type' => 'success',
            'message' => ucfirst($exchangeLog->side) . ' Order of (' . $request->amount . ' ' . getPair($exchangeLog->symbol)[0] . ') placed successfully',
        ]);
    }

    private function fillExchangeLogWithOrderData($exchangeLog, $order, $fetch_order, $request, $fee)
    {
        $exchangeLog->order_id = $order['id'];
        $exchangeLog->symbol = $order['symbol'];
        $exchangeLog->type = $request->type;
        $exchangeLog->side = $request->side;
        $exchangeLog->price = $fetch_order['price'];
        $exchangeLog->stopPrice = $fetch_order['stopPrice'];
        $exchangeLog->amount = $request->amount;
        $exchangeLog->cost = $fetch_order['cost'];
        $exchangeLog->average = $fetch_order['average'];
        $exchangeLog->filled = $fetch_order['filled'];
        $exchangeLog->remaining = $fetch_order['remaining'];
        $exchangeLog->status = $fetch_order['status'];

        $exchangeLog->fee = $fetch_order['fee']['cost'] !== null ? $fee : $fetch_order['fee']['cost'];

        $exchangeLog->provider = $this->provider;
        $exchangeLog->save();
        $exchangeLog->clearCache();

        return $exchangeLog;
    }


    private function fillExchangeLogWithLocalData($exchangeLog, $request, $tradeType, $side, $fee)
    {
        $exchangeLog->order_id = getTrx();
        $exchangeLog->symbol = $request->symbol . '/' . $request->currency;
        $exchangeLog->type = $tradeType;
        $exchangeLog->side = $side;
        $exchangeLog->price = $request->price;
        $exchangeLog->amount = $request->amount;
        $exchangeLog->cost = $request->price * $request->amount;
        $exchangeLog->average = $request->price;
        $exchangeLog->filled = $request->amount;
        $exchangeLog->remaining = 0;
        $exchangeLog->status = $tradeType == 'market' ? 'closed' : 'open';
        $exchangeLog->fee = $fee;
        $exchangeLog->provider = 'local';
        $exchangeLog->save();

        return $exchangeLog;
    }

    private function updateWalletBalancesAfterTrade($wc, $ws, $side, $fee, $price, $request, $order)
    {
        if ($side == 'buy') {
            $wc->balance -= ($request->amount * $price + $fee); // subtract the fee from the currency wallet balance
            $wc->save();
            if ($order['remaining'] == 0) {
                $ws->balance += $request->amount;
                $ws->save();
            }
        } else {
            $ws->balance -= ($request->amount + $fee); // subtract the fee from the symbol wallet balance
            $ws->save();
            if ($order['remaining'] == 0) {
                $wc->balance += $request->amount * $order['price'];
                $wc->save();
            }
        }
    }


    public function fetch_order(Request $request)
    {
        $order = $this->api->fetch_order($request->order_id, $request->symbol . '/' . $request->currency);
        $log = ThirdpartyOrders::where('provider', $this->provider)->where('order_id', $request->order_id)->first();
        $log->status = $order['status'];
        $log->filled = $order['filled'];
        $log->remaining = $order['remaining'];
        $log->save();
        return;
    }
    public function cancel(Request $request)
    {
        if ($this->provider == null) {
            return $this->createResponse('error', 'Something went wrong, please contact support er0x002');
        }

        $order = $this->api->fetch_order($request->order_id, $request->symbol . '/' . $request->currency);
        $log = ThirdpartyOrders::where('provider', $this->provider)->where('order_id', $request->order_id)->first();

        switch ($order['status']) {
            case 'canceled':
                $this->updateLogStatus($log, $order);
                return $this->createResponse('warning', 'Order canceled already.');

            case 'closed':
                $this->updateLogStatus($log, $order);
                return $this->createResponse('error', 'Order cancellation failed, Order was filled already.');

            case 'filling':
                $this->updateLogStatus($log, $order);
                return $this->createResponse('error', 'Order cancellation failed, Order is getting filled already.');

            default:
                try {
                    $this->api->cancel_order($request->order_id, $request->symbol . '/' . $request->currency);
                } catch (Throwable $e) {
                    // Add a log entry for the exception
                    Log::error('Order cancellation failed: ' . $e->getMessage());
                    return $this->createResponse('error', 'Order cancellation failed, Please report to support');
                }

                $log->status = 'canceled';
                $log->save();
                $this->refundUser($log, $request);

                return $this->createResponse('success', 'Order cancelled successfully');
        }
    }

    private function updateLogStatus($log, $order)
    {
        $log->status = $order['status'];
        $log->filled = $order['filled'];
        $log->remaining = $order['remaining'];
        $log->save();
    }

    private function refundUser($log, $request)
    {
        $fee = (getGen()->exchange_fee / 100) * $log->amount;
        $cost = $log->amount * $log->price;
        $from = getWallet($log->user_id, 'trading', $request->symbol, $this->provider);
        $to = getWallet($log->user_id, 'trading', $request->currency, $this->provider);
        Log::info('Refund user: ' . $log->user_id . ' ' . $log->symbol . ' ' . $log->amount . ' ' . $log->price . ' ' . $log->side . ' ' . $log->status);

        if ($log->side == 'buy') {
            $to->balance += $cost + $fee;
        } elseif ($log->side == 'sell') {
            $from->balance += $log->amount + $fee;
        }

        try {
            $from->save();
            $to->save();
        } catch (Throwable $e) {
            // Add a log entry for the exception
            Log::error('Refund user failed: ' . $e->getMessage());
        }
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
