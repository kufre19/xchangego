<?php

namespace App\Http\Controllers\Admin\Extensions\Eco;

use App\Http\Controllers\Controller;
use App\Models\Eco\EcoWallet;
use App\Models\Eco\EcoRealWallets;
use Tatum\Sdk;

class AddressesController extends Controller
{
    protected $eco;
    protected $net;
    protected $api;
    const SUPPORTED_CHAINS = ["BSC", "ETH", "KLAY", "CELO", "MATIC", "TRON"];

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

    public function index($chain, $symbol)
    {
        $page_title = $symbol . ' Addresses';
        return view('extensions.admin.eco.addresses', compact('page_title', 'chain', 'symbol'));
    }

    public function store($chain, $symbol)
    {
        $masterWallet = EcoRealWallets::where('chain', $chain)->first();

        if (!in_array($chain, self::SUPPORTED_CHAINS)) {
            return back()->withNotify(['error', 'Chain not supported']);
        }

        $last = EcoWallet::where('chain', $chain)->orderBy('index', 'DESC')->first()?->index + 1 ?? 0;

        $payload = [
            "chain" => $chain,
            "owner" => $masterWallet->address,
            "from" => $last,
            "to" => $last,
        ];

        $addresses = $this->api->gasPump()->precalculateGasPumpAddresses($payload);
        foreach ($addresses as $address) {
            $wallet = new EcoWallet();
            $wallet->index = getAmount($last++);
            $wallet->chain = $chain;
            $wallet->symbol = $symbol;
            $wallet->currency = $symbol;
            $wallet->address = $address;
            $wallet->network = $this->net;
            $wallet->save();
        }
        $notify[] = ['success', 'Wallets Created Successfully'];
        return back()->withNotify($notify);
    }

    public function activate($chain, $symbol, $id)
    {
        $masterWallet = EcoRealWallets::where('chain', $chain)->first();
        $wallet = EcoWallet::where('id', $id)->first();

        if ($wallet->chain === 'TRON') {
            $activateGasPump = (new \Tatum\Model\ActivateGasPumpTron())
                ->setChain($wallet->chain)
                ->setOwner($masterWallet->address)
                ->setFrom($wallet->index)
                ->setTo($wallet->index)
                ->setFeeLimit(600)
                ->setFromPrivateKey(isEncrypted($masterWallet->private_key) ? decrypt($masterWallet->private_key) : $masterWallet->private_key);
        } else {
            $activateGasPump = (new \Tatum\Model\ActivateGasPump())
                ->setChain($wallet->chain)
                ->setOwner($masterWallet->address)
                ->setFrom($wallet->index)
                ->setTo($wallet->index)
                ->setFromPrivateKey(isEncrypted($masterWallet->private_key) ? decrypt($masterWallet->private_key) : $masterWallet->private_key);
        }
        try {
            if ($wallet->chain === 'TRON') {
                $response = $this->api->gasPump()->activateGasPumpTron($activateGasPump);
            } else {
                $response = $this->api->gasPump()->activateGasPump($activateGasPump);
            }
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            $responseObj = $apiExc->getResponseObject();
            $notify[] = ['error', "{$responseObj['cause']}"];
            return back()->withNotify($notify);
        } catch (\Throwable $th) {
            $notify[] = ['error', get_class($th) . ': ' . $th->getMessage()];
            return back()->withNotify($notify);
        }

        $wallet->activation_trx = $response->getTxId();
        $wallet->save();
        $notify[] = ['success', 'Addresses Activation Sent'];
        return back()->withNotify($notify);
    }

    public function verify($chain, $symbol, $id)
    {
        $wallet = EcoWallet::where('id', $id)->first();
        $masterWallet = EcoRealWallets::where('chain', $chain)->first();

        if ($wallet->activation_trx !== null) {
            try {
                $response = $this->api->gasPump()->gasPumpAddressesActivatedOrNot($chain, $masterWallet->address, $wallet->index);

                if ($response['activated']) {
                    $notify[] = ['success', 'Gas pump address is activated'];
                    $wallet->status = 1;
                    $wallet->save();
                } else {
                    $notify[] = ['error', 'Gas pump address is not activated'];
                    $wallet->activation_trx = null;
                    $wallet->save();
                }
            } catch (\Exception $e) {
                $notify[] = ['error', $e->getMessage()];
            }
        } else {
            $notify[] = ['error', 'No TxId found, Activate First'];
        }

        return back()->withNotify($notify);
    }
}
