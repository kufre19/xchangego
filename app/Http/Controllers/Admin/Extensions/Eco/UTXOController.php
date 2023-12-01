<?php

namespace App\Http\Controllers\Admin\Extensions\Eco;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Extensions\Eco\WalletController;
use App\Models\Eco\EcoRealWallets;
use App\Models\Eco\EcoSettings;
use App\Models\Eco\EcoUTXO;
use App\Models\Eco\EcoUTXOWallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tatum\Sdk;

class UTXOController extends Controller
{
    protected $eco;
    protected $net;
    protected $api;
    protected $walletController;
    protected $masterController;
    const SUPPORTED_CHAINS = ["BTC", "DOGE", "LTC", "ADA"];

    public function __construct()
    {
        $this->eco = new Sdk();
        $this->net = getNativeNetwork();
        $this->walletController = new WalletController();
        $this->masterController = new MasterWalletController();
        if ($this->net == 'mainnet') {
            $this->eco->mainnet()->config()->setApiKey(env('TATUM_API_KEY'));
            $this->api = $this->eco->mainnet()->api();
        } else {
            $this->eco->testnet()->config()->setApiKey(env('TATUM_TESTNET_API_KEY'));
            $this->eco->testnet()->config()->setDebug(true);
            $this->api = $this->eco->testnet()->api();
        }
    }

    public function index($chain)
    {
        $page_title = $chain . ' UTXO';
        $utxos = EcoUTXO::where('chain', $chain)->get();
        $wallet = EcoUTXOWallet::where('chain', $chain)->first();
        $isPrivateKeyEncrypted = false;
        if ($wallet) {
            $wallet = $this->updateWalletBalance($wallet);
            (new WalletController)->fetchUTXO($wallet, 'utxo');
            if ($wallet->private_key !== null) {
                $isPrivateKeyEncrypted = isEncrypted($wallet->private_key);
            }
        }
        return view('extensions.admin.eco.utxo', compact('page_title', 'chain', 'utxos', 'wallet', 'isPrivateKeyEncrypted'));
    }

    public function encryptData(Request $request, $chain)
    {
        $wallet = EcoUTXOWallet::where('chain', $chain)->first();
        $shouldEncrypt = false;

        if (!isEncrypted($wallet->private_key)) {
            $shouldEncrypt = true;
            $wallet->private_key = encrypt($wallet->private_key);
        }

        $wallet->save();
        if ($shouldEncrypt) {
            return response()->json(['type' => 'success', 'message' => 'Data encrypted successfully']);
        } else {
            return response()->json(['type' => 'warning', 'message' => 'Data is already encrypted']);
        }
    }

    public function updateWalletBalance($wallet)
    {
        $query = $this->getUTXOWalletBalance($wallet->id);
        if ($query->getIncoming() !== null) {
            $wallet->balance = $query->getIncoming();
            $wallet->save();
        }

        return $wallet;
    }

    public function getUTXOWalletBalance($id)
    {
        $wallet = EcoUTXOWallet::findOrFail($id);
        switch ($wallet->chain) {
            case 'BTC':
                return $this->api->bitcoin()->btcGetBalanceOfAddress($wallet->address);
                break;
            case 'DOGE':
                return $this->api->dogecoin()->dogeGetBalance($wallet->address);
                break;
            case 'LTC':
                return $this->api->litecoin()->ltcGetBalanceOfAddress($wallet->address);
                break;
            default:
                return 0;
                break;
        }
    }

    public function store($chain)
    {
        if (!in_array($chain, self::SUPPORTED_CHAINS)) {
            return back()->withNotify(['error', 'Chain not supported']);
        }

        $provider = EcoSettings::first();

        $result = $this->createWallet($chain, $provider);
        if (isset($result['type']) && $result['type'] == 'error') {
            return back()->withNotify(['error', $result['message']]);
        }

        $notify[] = ['success', 'Wallets Created Successfully'];
        return back()->withNotify($notify);
    }

    private function createWallet($chain, $provider)
    {

        $wallet = EcoUTXOWallet::where('chain', $chain)
            ->where('symbol', $chain)
            ->where('network', $this->net)
            ->first();

        if ($wallet && $wallet->account_id != null) {
            return [
                'type' => 'error',
                'message' => $chain . ' Wallet Already Exists'
            ];
        }

        if (!$wallet) {
            $masterWallet = EcoRealWallets::where('chain', $chain)->first();
            $index = 1;

            try {
                switch ($chain) {
                    case 'BTC':
                        $query = $this->api->bitcoin()->btcGenerateAddress(isEncrypted($masterWallet->xpub) ? decrypt($masterWallet->xpub) : $masterWallet->xpub, $index);
                        break;
                    case 'DOGE':
                        $query = $this->api->dogecoin()->dogeGenerateAddress(isEncrypted($masterWallet->xpub) ? decrypt($masterWallet->xpub) : $masterWallet->xpub, $index);
                        break;
                    case 'LTC':
                        $query = $this->api->litecoin()->ltcGenerateAddress(isEncrypted($masterWallet->xpub) ? decrypt($masterWallet->xpub) : $masterWallet->xpub, $index);
                        break;
                }
            } catch (\Throwable $th) {
                return [
                    'type' => 'error',
                    'message' => $th->getMessage()
                ];
            }

            try {
                $privateKeyQuery = (new \Tatum\Model\PrivKeyRequest())
                    ->setIndex($index)
                    ->setMnemonic(isEncrypted($masterWallet->mnemonic) ? decrypt($masterWallet->mnemonic) : $masterWallet->mnemonic);

                switch ($chain) {
                    case 'BTC':
                        $privateKeyResponse = $this->api->bitcoin()->btcGenerateAddressPrivateKey($privateKeyQuery);
                        break;
                    case 'DOGE':
                        $privateKeyResponse = $this->api->dogecoin()->dogeGenerateAddressPrivateKey($privateKeyQuery);
                        break;
                    case 'LTC':
                        $privateKeyResponse = $this->api->litecoin()->ltcGenerateAddressPrivateKey($privateKeyQuery);
                        break;
                }
                $privateKey = $privateKeyResponse->getKey();
            } catch (\Throwable $th) {
                return [
                    'type' => 'error',
                    'message' => $th->getMessage()
                ];
            }

            $wallet = new EcoUTXOWallet([
                'index' => $index,
                'chain' => $chain,
                'symbol' => $chain,
                'currency' => $chain,
                'postfix' => '',
                'address' => $query->getAddress(),
                'network' => $this->net,
                'status' => 1,
                'private_key' => encrypt($privateKey)
            ]);
        }
        $user = Auth::user();
        if ($wallet->account_id == null) {
            $createAccount = $this->walletController->createAccount($user, $wallet, $provider, ['symbol' => $chain]);
            if (isset($createAccount['success']) && $createAccount['success'] == false) {
                return [
                    'type' => 'error',
                    'message' => $createAccount['message']
                ];
            }
        }

        if ($wallet->assigned != 1) {
            $assignAddress = $this->walletController->assignAddress($wallet);
            if (isset($assignAddress['success']) && $assignAddress['success'] == false) {
                return [
                    'type' => 'error',
                    'message' => $assignAddress['message']
                ];
            }
        }

        $wallet->save();

        return [
            'type' => 'success',
            'message' => $chain . ' Wallet Created Successfully'
        ];
    }

    public function clean($chain)
    {
        $utxos = EcoUTXO::where('chain', $chain)->where('status', 'spent')->get();
        foreach ($utxos as $utxo) {
            $utxo->delete();
        }
        return back()->withNotify(['success', 'UTXO Cleaned Successfully']);
    }
}
