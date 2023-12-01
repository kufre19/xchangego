<?php

namespace App\Http\Controllers\Admin\Extensions\Eco;

use App\Http\Controllers\Controller;
use App\Models\Eco\EcoMarkets;
use App\Models\Eco\EcoMainnetTokens;
use App\Models\Eco\EcoNetworks;
use App\Models\Eco\EcoTokens;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MarketsController extends Controller
{
    protected $net;

    public function __construct()
    {
        $this->net = getNativeNetwork();
    }

    public function index()
    {
        $page_title = 'Ecosystem Markets';
        $net = getNativeNetwork();
        $tokens = [];
        $currencies = EcoTokens::where('network', $net)
            ->where('status', 1)
            ->select('chain', 'symbol', 'network')
            ->get();
        $networks = EcoNetworks::where('status', 1)->get();

        // Collect mainnet tokens if the native network is mainnet
        if ($net === 'mainnet') {
            $mainnetTokens = EcoMainnetTokens::where('status', 1)
                ->select('chain', 'symbol', 'network', 'postfix')
                ->get();

            // Add tokens from each active network
            foreach ($networks as $network) {
                $networkTokens = $mainnetTokens->where('chain', $network->chain);

                if ($networkTokens->count() > 0) {
                    $tokens = array_merge($tokens, $networkTokens->toArray());
                }
            }
        }

        return view('extensions.admin.eco.markets', compact('page_title', 'currencies', 'tokens', 'networks', 'net'));
    }

    public function store(Request $request)
    {
        // Validate request inputs
        $validate = Validator::make($request->all(), [
            'currency' => 'required|string',
            'pair' => 'required|string',
            'taker' => 'required|numeric',
            'maker' => 'required|numeric',
            'minimum' => 'required|numeric',
            'maximum' => 'required|numeric'
        ]);

        // Handle validation errors
        if ($validate->fails()) {
            $errors = $validate->errors();
            $notify[] = ['error', $errors->first()];

            return response()->json([
                'type' => $notify[0][0],
                'message' => $notify[0][1]
            ]);
        }

        try {
            $tokens = [];
            $tokens_postfixed = [];
            $networks = EcoNetworks::where('status', 1)->get();

            // Collect tokens from active networks
            foreach ($networks as $network) {
                $tokensQuery = EcoMainnetTokens::where('chain', $network->chain)
                    ->where('status', 1)
                    ->select('chain', 'symbol', 'network', 'postfix');

                if ($tokensQuery->exists()) {
                    $datas[] = $tokensQuery->get();
                }
            }

            // Separate tokens with and without postfix
            foreach ($datas as $data) {
                foreach ($data as $item) {
                    if ($item->postfix !== null) {
                        $tokens_postfixed[] = $item->symbol;
                    } else {
                        $tokens[] = $item->symbol;
                    }
                }
            }

            // Process request data and create market entry
            list($currency_symbol, $currency_chain) = explode('|', $request->currency);
            list($pair_symbol, $pair_chain) = explode('|', $request->pair);
            $market = new EcoMarkets();

            // Set market properties
            $market->currency = in_array($currency_symbol, $tokens_postfixed)
                ? $currency_symbol . ($currency_chain !== 'ETH' ? "_{$currency_chain}" : '')
                : $currency_symbol;
            $market->currency_chain = $currency_chain;
            $market->pair = in_array($pair_symbol, $tokens_postfixed)
                ? $pair_symbol . ($pair_chain !== 'ETH' ? "_{$pair_chain}" : '')
                : $pair_symbol;
            $market->pair_chain = $pair_chain;
            $market->symbol = "{$market->currency}/{$market->pair}";
            $market->taker = $request->taker;
            $market->maker = $request->maker;
            $market->min_amount = $request->minimum;
            $market->max_amount = $request->maximum;
            $market->type = $request->type ?? 'spot';
            $market->network = getNativeNetwork();
            $market->status = 1;

            // Save market and clear cache
            $market->save();
            $market->clearCache();

            $notify[] = ['success', "{$market->symbol} has been created successfully"];
        } catch (\Throwable $th) {
            return response()->json([
                'type' => 'error',
                'message' => $th
            ]);
        }

        return response()->json([
            'type' => $notify[0][0],
            'message' => $notify[0][1]
        ]);
    }

    public function update(Request $request)
    {
        // Validate request inputs
        $validate = Validator::make($request->all(), [
            'market_id' => 'required|integer',
            'maker' => 'required|numeric',
            'taker' => 'required|numeric',
            'min_amount' => 'required|numeric',
            'max_amount' => 'required|numeric'
        ]);

        // Handle validation errors
        if ($validate->fails()) {
            $errors = $validate->errors();
            $notify[] = ['error', $errors->first()];

            return response()->json([
                'type' => $notify[0][0],
                'message' => $notify[0][1]
            ]);
        }

        try {
            // Find the market to update
            $market = EcoMarkets::findOrFail($request->market_id);

            // Update market properties
            $market->taker = $request->taker;
            $market->maker = $request->maker;
            $market->min_amount = $request->min_amount;
            $market->max_amount = $request->max_amount;

            // Save updated market and clear cache
            $market->save();
            $market->clearCache();

            $notify[] = ['success', "{$market->symbol} has been updated successfully"];
        } catch (\Throwable $th) {
            return response()->json([
                'type' => 'error',
                'message' => $th
            ]);
        }

        return response()->json([
            'type' => $notify[0][0],
            'message' => $notify[0][1]
        ]);
    }
}
