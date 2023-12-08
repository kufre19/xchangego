<?php

namespace App\Http\Controllers\Admin\Extensions\Eco;

use App\Http\Controllers\Controller;
use App\Models\Eco\EcoNetworks;
use Illuminate\Http\Request;
use Tatum\Sdk;

class EcosystemController extends Controller
{
    protected $eco;
    protected $net;
    protected $api;
    const SUPPORTED_CHAINS = ["BSC", "ETH", "KLAY", "ONE", "CELO", "MATIC", "SOL", "LTC", "BTC", "TRON"];

    public function __construct()
    {
        $this->eco = new Sdk();
        $this->net = getNativeNetwork();
        if ($this->net == 'mainnet') {
            $this->eco->mainnet()->config()->setApiKey(env('TATUM_API_KEY'));
            $this->api = $this->eco->mainnet()->api();
        } else {
            $this->eco->testnet()->config()->setApiKey(env('TATUM_TESTNET_API_KEY'));
            $this->eco->testnet()->config()->setDebug(true);
            $this->api = $this->eco->testnet()->api();
        }
    }

    public function blockchain()
    {
        $page_title = 'Blockchains';
        $blockchains = EcoNetworks::paginate(getPaginate(20));

        return view('extensions.admin.eco.blockchains', compact('page_title', 'blockchains'));
    }

    public function blockchain_update_status(Request $request)
    {
        $blockchain = EcoNetworks::where('id', $request->id)->first();
        $blockchain->status = $request->status;
        $blockchain->save();

        return response()->json([
            'type' => 'success',
            'message' => 'Blockchain Status Changed Successfully',
        ]);
    }

    public function transactions()
    {
        $page_title = 'Transactions';

        return view('extensions.admin.eco.transactions', compact('page_title'));
    }

    public function wallets($chain)
    {
        $page_title = $chain . ' Wallets';

        return view('extensions.admin.eco.wallets', compact('page_title', 'chain'));
    }
}
