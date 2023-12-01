<?php

namespace App\Http\Controllers\Extensions\Eco;

use App\Events\ChartDataUpdated;
use App\Events\OrderCreated;
use App\Events\OrderDeleted;
use App\Http\Controllers\Controller;
use App\Models\Eco\EcoWallet;
use App\Models\Tokens;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tatum\Sdk;
use Illuminate\Support\Facades\Event;

class OrderController extends Controller
{
    const WITHDRAWAL_CHAINS = ["ETH", "BSC", "MATIC", "KLAY", "CELO", "XDC", "ONE", "TRON"];
    const ESTIMATE_FEE_CHAINS = ["ETH", "BSC", "MATIC", "KLAY", "CELO", "XDC", "ONE"];

    private $eco;
    protected $api;
    private $net;

    public function __construct(Sdk $sdk)
    {
        $this->eco = $sdk;
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
     * Create a new trade order.
     *
     * @param Request $request
     * @param ChartController $chart
     * @return JsonResponse
     */
    public function store(Request $request, ChartController $chart)
    {
        $validate = Validator::make($request->all(), [
            'amount' => 'required|numeric',
            'price' => 'required|numeric',
            'symbol' => 'required|string',
            'symbol_chain' => 'required|string',
            'currency' => 'required|string',
            'currency_chain' => 'required|string',
            'tradeType' => 'required|string',
            'type' => 'required|in:BUY,SELL',
            'token' => 'string',
        ]);

        if ($validate->fails()) {
            return response()->json($validate->errors());
        }

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

        $symbolWallet = $this->getClientWallet($request->symbol_chain, $user->id, $request->symbol);
        $currencyWallet = $this->getClientWallet($request->currency_chain, $user->id, $request->currency);

        if (!$symbolWallet || !$currencyWallet) {
            return responseJson('warning', 'Create ' . ($symbolWallet ? $request->currency : $request->symbol) . ' Wallet First');
        }

        $symbolFeesAccount = getEcoFeesAccount($symbolWallet->chain, $symbolWallet->currency, $this->net);
        $currencyFeesAccount = getEcoFeesAccount($currencyWallet->chain, $currencyWallet->currency, $this->net);

        if (!$symbolFeesAccount || !$currencyFeesAccount) {
            return responseJson('error', ($symbolFeesAccount ? $request->currency : $request->symbol) . ' fees account not found');
        }

        $isBuyOrder = $request->type == 'BUY';
        $sufficientBalance = $isBuyOrder ? $currencyWallet->balance >= $request->amount * $request->price : $symbolWallet->balance >= $request->amount;

        if (!$sufficientBalance) {
            return responseJson('error', ($isBuyOrder ? $request->currency : $request->symbol) . ' balance less than order amount');
        }

        $query = (new \Tatum\Model\CreateTrade())
            ->setType($request->type)
            ->setPrice("$request->price")
            ->setAmount("$request->amount")
            ->setPair($request->symbol . '/' . $request->currency)
            ->setCurrency1AccountId($symbolWallet->account_id)
            ->setCurrency2AccountId($currencyWallet->account_id)
            ->setFee($isBuyOrder ? $request->taker : $request->maker)
            ->setFeeAccountId(($isBuyOrder ? $currencyFeesAccount : $symbolFeesAccount)->account_id);

        if (getPlatform('trading')->practice === 1) {
            return responseJson('warning', 'Trading Disabled, Practice only');
        }

        try {
            $create_order = $this->api->orderBook()->createTrade($query);
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            $responseObj = $apiExc->getResponseObject();
            $errorMessage = is_array($responseObj) && isset($responseObj['message']) ? $responseObj['message'] : 'An unknown error occurred';
            responseJson('error', $errorMessage);
        } catch (\Exception $exc) {
            responseJson('error', $exc->getMessage());
        }


        if (!$create_order->getId()) {
            return responseJson('error', 'Failed to create order');
        }

        $createOrderData = [
            "currency1AccountId" => $symbolWallet->account_id,
            "currency2AccountId" => $currencyWallet->account_id,
            "feeAccountId" => ($isBuyOrder ? $currencyFeesAccount : $symbolFeesAccount)->account_id,
            "id" => $create_order->getId(),
            "type" => $request->type,
            "price" => $request->price,
            "amount" => $request->amount,
            "pair" => $request->symbol . '/' . $request->currency,
            "fill" => "0", // Assuming fill is 0 for a new order
            "fee" => $isBuyOrder ? $request->taker : $request->maker,
            "created" => time() * 1000 // Current timestamp in milliseconds
        ];

        Event::dispatch(new OrderCreated($request->symbol, $request->currency, $createOrderData));

        $chartData = $chart->getBarData($request->symbol, $request->currency, $request->timeframe);

        if (!isset($chartData->type) || $chartData->type !== 'error') {
            Event::dispatch(new ChartDataUpdated($request->symbol, $request->currency, $request->timeframe, $chartData));
            $chart->saveLastBars($request->symbol, $request->currency, $request->timeframe, $chartData);
        }

        return responseJson('success', 'Order Placed Successfully: (' . $request->type . ' ' . $request->amount . ' ' . $request->symbol . ')');
    }

    function getClientWallet($chain, $userId, $symbol)
    {
        return EcoWallet::where('chain', $chain)
            ->where('user_id', $userId)
            ->where('symbol', $symbol)
            ->where('network', $this->net)
            ->first();
    }

    public function order_balance($id)
    {
        return json_decode($this->api->account()->getAccountBalance($id))->availableBalance;
    }

    /**
     * Cancel a trade order.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'required',
            'currency' => 'required',
            'pair' => 'required',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'type' => 'error',
                'message' => 'Validation failed. Please provide a valid ID, currency, and pair.',
            ]);
        }

        try {
            $this->api->orderBook()->deleteTrade($request->id);
            Event::dispatch(new OrderDeleted($request->currency, $request->pair, $request->id));
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

        return response()->json([
            'type' => 'success',
            'message' => 'Order Canceled Successfully',
        ]);
    }
}
