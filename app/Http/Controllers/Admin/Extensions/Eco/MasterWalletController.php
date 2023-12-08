<?php

namespace App\Http\Controllers\Admin\Extensions\Eco;

use App\Http\Controllers\Controller;
use App\Models\Eco\EcoWallet;
use App\Models\Eco\EcoMainnetTokens;
use App\Models\Eco\EcoNetworks;
use App\Models\Eco\EcoRealWallets;
use App\Models\Eco\EcoTokens;
use Illuminate\Http\Request;
use Tatum\Sdk;

class MasterWalletController extends Controller
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

    public function wallet($chain)
    {
        $network = EcoNetworks::where('chain', $chain)->first();
        $page_title = $network->name . ' Ecosystem Wallet';
        $wallet = EcoRealWallets::where('chain', $chain)->first();
        $tokens = EcoTokens::where('chain', $chain)->get();
        if ($wallet != null) {
            $wallet->balance = $this->getBalance($chain, $wallet->address);
        }

        $isMnemonicEncrypted = isEncrypted($wallet->mnemonic ?? '');
        $isPrivateKeyEncrypted = isEncrypted($wallet->private_key ?? '');
        $isXpubEncrypted = isEncrypted($wallet->xpub ?? '');

        $transactions = [];
        $internal_transactions = [];

        if ($chain == 'BTC') {
            try {
                $address = $wallet->address;
                $page_size = 50; // You can adjust this value as needed
                $offset = 0; // You can adjust this value as needed

                $transactions_raw = $this->api->bitcoin()->btcGetTxByAddress($address, $page_size, $offset);

                foreach ($transactions_raw as $transaction_raw) {
                    $transaction = [
                        'hash' => $transaction_raw->getHash(),
                        'time' => $transaction_raw->getTime(),
                        'inputs' => $transaction_raw->getInputs(),
                        'outputs' => $transaction_raw->getOutputs(),
                        'blockNumber' => $transaction_raw->getBlockNumber(),
                    ];


                    $transactions[] = $transaction;
                }
            } catch (\Tatum\Sdk\ApiException $apiExc) {
                // Handle API exception
                $transactions = [];
            } catch (\Exception $exc) {
                // Handle general exception
                $transactions = [];
            }
        }


        return view('extensions.admin.eco.wallet', compact('page_title', 'wallet', 'network', 'tokens', 'transactions', 'internal_transactions', 'isMnemonicEncrypted', 'isPrivateKeyEncrypted', 'isXpubEncrypted'));
    }


    public function encryptData(Request $request, $chain)
    {
        $type = $request->input('type');
        $wallet = EcoRealWallets::where('chain', $chain)->first();

        $shouldEncrypt = false;

        if ($type == 'mnemonic' && !isEncrypted($wallet->mnemonic)) {
            $shouldEncrypt = true;
            $wallet->mnemonic = encrypt($wallet->mnemonic);
        } else if ($type == 'private_key' && !isEncrypted($wallet->private_key)) {
            $shouldEncrypt = true;
            $wallet->private_key = encrypt($wallet->private_key);
        } else if ($type == 'xpub' && !isEncrypted($wallet->xpub)) {
            $shouldEncrypt = true;
            $wallet->xpub = encrypt($wallet->xpub);
        }

        $wallet->save();
        if ($shouldEncrypt) {
            return response()->json(['type' => 'success', 'message' => 'Data encrypted successfully']);
        } else {
            return response()->json(['type' => 'warning', 'message' => 'Data is already encrypted']);
        }
    }




    public function store($chain)
    {
        try {
            $apiMethod = $this->getApiMethod($chain);
            $methodNames = $this->getMethodNames($chain);
            $wallet = $this->api->{$apiMethod}()->{$methodNames['generateWallet']}();
            if ($chain == 'SOL') {
                $walletAddress = $wallet->getAddress();
                $walletPrivateKey = $wallet->getPrivateKey();
            } else {
                $walletAddress = $this->api->{$apiMethod}()->{$methodNames['generateAddress']}($wallet->getXpub(), 0)->getAddress();
                $walletPrivateKey = $this->api->{$apiMethod}()->{$methodNames['generateAddressPrivateKey']}(
                    [
                        "index" => 0,
                        "mnemonic" => $wallet->getMnemonic(),
                    ]
                )->getKey();
            }

            $masterWallet = new EcoRealWallets();
            $masterWallet->chain = $chain;
            if ($chain !== 'SOL') {
                $masterWallet->xpub = $wallet->getXpub();
            }
            $masterWallet->mnemonic = $wallet->getMnemonic();
            $masterWallet->private_key = $walletPrivateKey;
            $masterWallet->address = $walletAddress;
            $masterWallet->save();
            $notify[] = ['success', 'Wallet Generated Successfully'];
        } catch (\Throwable $th) {
            $notify[] = ['error', $th->getMessage()];
        }
        return back()->withNotify($notify);
    }

    public function add(Request $request, $chain)
    {
        try {
            $masterWallet = new EcoRealWallets();
            $masterWallet->chain = $chain;
            if (in_array($chain, ["ALGO", "SOL"])) {
                $masterWallet->mnemnic = $request->mnemnic;
            } else {
                $masterWallet->xpub = $request->xpub;
                $masterWallet->private_key = $request->private_key;
            }
            $masterWallet->address = $request->address;
            $masterWallet->save();
            $notify[] = ['success', 'Wallet Added Successfully'];
        } catch (\Throwable $th) {
            return response()->json(
                [

                    'type' => 'error',
                    'message' => $th
                ]
            );
        }
        return response()->json(
            [

                'type' => $notify[0][0],
                'message' => $notify[0][1]
            ]
        );
    }

    public function addMnemonic(Request $request, $chain)
    {
        try {
            $wallet = EcoRealWallets::where('chain', $chain)->firstOrFail();

            $wallet->mnemonic = $request->mnemonic;
            $wallet->save();

            $notify[] = ['success', 'Mnemonic Added Successfully'];
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

    public function addXpub(Request $request, $chain)
    {
        try {
            $wallet = EcoRealWallets::where('chain', $chain)->firstOrFail();

            $wallet->xpub = $request->xpub;
            $wallet->save();

            $notify[] = ['success', 'Xpub Added Successfully'];
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

    public function addPrivateKey(Request $request, $chain)
    {
        try {
            $wallet = EcoRealWallets::where('chain', $chain)->firstOrFail();

            $wallet->private_key = $request->private_key;
            $wallet->save();

            $notify[] = ['success', 'Private Key Added Successfully'];
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


    public function delete($chain)
    {
        try {
            $masterWallet = EcoRealWallets::where('chain', $chain)->first();
            $masterWallet->delete();
            $notify[] = ['success', 'Wallet Removed Successfully'];
        } catch (\Throwable $th) {
            return response()->json(
                [

                    'type' => 'error',
                    'message' => $th
                ]
            );
        }
        return response()->json(
            [

                'type' => $notify[0][0],
                'message' => $notify[0][1]
            ]
        );
    }


    public function findToken(int $walletId)
    {
        $wallet = EcoWallet::findOrFail($walletId);
        $symbol = $wallet->currency ?: $wallet->symbol;
        $chain = $wallet->chain;

        $token = EcoTokens::where('symbol', $symbol)
            ->where('chain', $chain)
            ->first();

        if (!$token) {
            $token = EcoMainnetTokens::where('symbol', $symbol)
                ->where('chain', $chain)
                ->first();
        }

        return $token ? ($token->type = $token instanceof EcoMainnetTokens ? 1 : 0) : null;
    }

    public function getBalance($chain, $address)
    {
        $balance = 0;
        switch ($chain) {
            case 'BSC':
                $result = $this->api->bNBSmartChain()->bscGetBalance($address);
                $balance = $result->getBalance();
                break;
            case 'ETH':
                $result = $this->api->ethereum()->ethGetBalance($address);
                $balance = $result->getBalance();
                break;
            case 'KLAY':
                $result = $this->api->klaytn()->klaytnGetBalance($address);
                $balance = $result->getBalance();
                break;
            case 'CELO':
                $result = $this->api->celo()->celoGetBalance($address);
                $balance = $result->getCelo();
                break;
            case 'MATIC':
                $result = $this->api->polygon()->polygonGetBalance($address);
                $balance = $result->getBalance();
                break;
            case 'KLAY':
                $result = $this->api->klaytn()->klaytnGetBalance($address);
                $balance = $result->getBalance();
                break;
            case 'BTC':
                $result = $this->api->bitcoin()->btcGetBalanceOfAddress($address);
                $balance = $result->getIncoming();
                break;
            case 'DOGE':
                $result = $this->api->dogecoin()->dogeGetBalance($address);
                $balance = $result->getIncoming();
                break;
            case 'LTC':
                $result = $this->api->litecoin()->ltcGetBalanceOfAddress($address);
                $balance = $result->getIncoming();
                break;
            case 'SOL':
                $result = $this->api->solana()->solanaGetBalance($address);
                $balance = $result->getBalance();
                break;
            case 'TRON':
                try {
                    $mainnetToken = EcoMainnetTokens::where('symbol', 'TRON')->where('chain', $chain)->first();
                    $decimals = '0.';
                    for ($i = 1; $i < $mainnetToken->decimals; $i++) {
                        $decimals .= 0;
                    }
                    $decimals = $decimals . '1';
                    $balance = $this->api->tron()->tronGetAccount($address)['balance'] * $decimals;
                } catch (\Throwable $th) {
                    $balance = 0;
                }
                break;
        }

        return $balance;
    }

    private function getApiMethod($chain)
    {
        $apiMethods = [
            'ETH' => 'ethereum',
            'BTC' => 'bitcoin',
            'BSC' => 'bNBSmartChain',
            'TRON' => 'tron',
            'MATIC' => 'polygon',
            'KLAY' => 'klaytn',
            'CELO' => 'celo',
            'DOGE' => 'dogecoin',
            'BCH' => 'bitcoinCash',
            'LTC' => 'litecoin',
            'BNB' => 'bNBBeaconChain',
            'SOL' => 'solana'
        ];

        return $apiMethods[$chain] ?? null;
    }

    private function getMethodNames($chain)
    {
        $methodNames = [
            'ETH' => [
                'generateWallet' => 'ethGenerateWallet',
                'generateAddress' => 'ethGenerateAddress',
                'generateAddressPrivateKey' => 'ethGenerateAddressPrivateKey',
            ],
            'BSC' => [
                'generateWallet' => 'bscGenerateWallet',
                'generateAddress' => 'bscGenerateAddress',
                'generateAddressPrivateKey' => 'bscGenerateAddressPrivateKey',
            ],
            'TRON' => [
                'generateWallet' => 'generateTronwallet',
                'generateAddress' => 'tronGenerateAddress',
                'generateAddressPrivateKey' => 'tronGenerateAddressPrivateKey',
            ],
            'MATIC' => [
                'generateWallet' => 'polygonGenerateWallet',
                'generateAddress' => 'polygonGenerateAddress',
                'generateAddressPrivateKey' => 'polygonGenerateAddressPrivateKey',
            ],
            'CELO' => [
                'generateWallet' => 'celoGenerateWallet',
                'generateAddress' => 'celoGenerateAddress',
                'generateAddressPrivateKey' => 'celoGenerateAddressPrivateKey',
            ],
            'KLAY' => [
                'generateWallet' => 'klaytnGenerateWallet',
                'generateAddress' => 'klaytnGenerateAddress',
                'generateAddressPrivateKey' => 'klaytnGenerateAddressPrivateKey',
            ],
            'BTC' => [
                'generateWallet' => 'btcGenerateWallet',
                'generateAddress' => 'btcGenerateAddress',
                'generateAddressPrivateKey' => 'btcGenerateAddressPrivateKey',
            ],
            'DOGE' => [
                'generateWallet' => 'dogeGenerateWallet',
                'generateAddress' => 'dogeGenerateAddress',
                'generateAddressPrivateKey' => 'dogeGenerateAddressPrivateKey',
            ],
            'LTC' => [
                'generateWallet' => 'ltcGenerateWallet',
                'generateAddress' => 'ltcGenerateAddress',
                'generateAddressPrivateKey' => 'ltcGenerateAddressPrivateKey',
            ],
            'SOL' => [
                'generateWallet' => 'solanaGenerateWallet',
            ],
        ];

        return $methodNames[$chain] ?? null;
    }
}
