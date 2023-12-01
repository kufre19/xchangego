<?php

namespace App\Http\Controllers\Admin\Extensions\Eco;

use App\Http\Controllers\Controller;
use App\Models\Eco\EcoMainnetTokens;
use App\Models\Eco\EcoTokens;
use App\Models\Eco\EcoWallet;
use Tatum\Sdk;

class RpcController extends Controller
{
    protected $eco;
    protected $net;
    protected $api;
    const SUPPORTED_CHAINS = ["BSC", "ETH", "KLAY", "ONE", "CELO", "MATIC", "SOL", "LTC", "BTC", "TRON", "DOGE", "ADA"];

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

    public function getWalletBalance($id)
    {
        $balance = 0;
        try {
            $result = $this->api->account()->getAccountBalance($id);
            $balance = $result->getAvailableBalance();
        } catch (\Throwable $th) {
            //throw $th;
        }
        return $balance;
    }

    public function tronGetTokenBalance($wallet, $token)
    {
        $balance = 0;
        $decimals = $this->createDecimalString($token->decimals);
        try {
            if ($wallet->symbol == 'TRON') {
                $result = $this->api->tron()->tronGetAccount($wallet->address);
                $balance = $result->getBalance();
            } else {
                $result = $this->api->tron()->tronGetAccount($wallet->address);
                $balance = $result->getTrc20Balance($token->address, $decimals);
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
        return $balance;
    }

    public function getTokenBalance($wallet)
    {
        $symbol = $wallet->currency ?? $wallet->symbol;
        $chain = $wallet->chain;

        $token = EcoTokens::where('symbol', $symbol)
            ->where('chain', $chain)
            ->first();

        if (!$token) {
            $token = EcoMainnetTokens::where('symbol', $symbol)
                ->where('chain', $chain)
                ->first();
        }

        if (!$token) {
            return null;
        }

        $balance = 0;

        switch ($wallet->chain) {
            case 'BSC':
            case 'ETH':
            case 'CELO':
            case 'MATIC':
                $balance = $this->ethGetTokenBalance($wallet, $token);
                break;
            case 'TRON':
                $balance = $this->tronGetTokenBalance($wallet, $token);
                break;
            case 'SOL':
                if ($wallet->symbol == 'SOL') {
                    $result = $this->api->solana()->solanaGetBalance($wallet->address);
                    $balance = $result->getBalance();
                } else {
                    $result = $this->api->fungibleTokensERC20OrCompatible()->erc20GetBalanceAddress($wallet->chain, $wallet->address);
                    foreach ($result as $address) {
                        if ($address->getContractAddress() == $token->address) {
                            return $balance = $address->getAmount();
                        }
                    }
                }
                break;
        }

        return $balance;
    }

    public function getClientWalletBalance($id)
    {
        $wallet = EcoWallet::findOrFail($id);
        switch ($wallet->chain) {
            case 'ETH':
                if ($wallet->symbol == 'ETH') {
                    return $this->getWalletBalance($wallet->account_id);
                } else {
                    return $this->getTokenBalance($wallet);
                }
                break;
            case 'BSC':
                if ($wallet->symbol == 'BSC') {
                    return $this->getWalletBalance($wallet->account_id);
                } else {
                    return $this->getTokenBalance($wallet);
                }
                break;
            case 'TRON':
                return $this->getWalletBalance($wallet);
                break;
            case 'MATIC':
                if ($wallet->symbol == 'MATIC') {
                    return $this->getWalletBalance($wallet->account_id);
                } else {
                    return $this->getTokenBalance($wallet);
                }
                break;
            case 'KLAY':
                return $this->getWalletBalance($wallet->account_id);
                break;
            case 'CELO':
                if ($wallet->symbol == 'CELO') {
                    return $this->getWalletBalance($wallet->account_id);
                } else {
                    return $this->getTokenBalance($wallet);
                }
                break;
            case 'BTC':
                return $this->api->bitcoin()->btcGetBalanceOfAddress($wallet->address)->getIncoming();
                break;
            case 'SOL':
                $result = $this->api->solana()->solanaGetBalance($wallet->address);
                return $result->getBalance();
                break;
            default:
                return 0;
                break;
        }
    }

    function getChainNameBySymbol(string $symbol): ?string
    {
        $chainNames = [
            'ETH' => 'ethereum-mainnet',
            'ROPSTEN' => 'ethereum-sepolia',
            'RINKEBY' => 'ethereum-mainnet',
            'GOERLI' => 'ethereum-goerli',
            'KOVAN' => 'ethereum-mainnet',
            'MATIC' => 'polygon-mainnet',
            'MUMBAI' => 'polygon-mumbai',
            'KLAY' => 'klaytn-cypress',
            'KCT' => 'klaytn-baobab',
            'SOL' => 'solana-mainnet',
            'DEV' => 'solana-devnet',
            'CELO' => 'celo-mainnet',
            'ALGO' => 'algorand-mainnet-algod',
            'TESTNET' => 'algorand-testnet-algod',
            'ALGODE' => 'algorand-mainnet-algod',
            'TESTNET-ALGODE' => 'algorand-testnet-algod',
            'IDX' => 'algorand-mainnet-indexer',
            'TESTNET-IDX' => 'algorand-testnet-indexer',
            'BTC' => 'bitcoin-mainnet',
            'TESTNET' => 'bitcoin-testnet',
            'LTC' => 'litecoin-core-mainnet',
            'TESTNET' => 'litecoin-core-testnet',
            'KCS' => 'kcs-mainnet',
            'KCS-TESTNET' => 'kcs-testnet',
            'ADA' => 'cardano-mainnet',
            'CARDANO-TESTNET' => 'cardano-preprod',
            'VET' => 'vechain-mainnet',
            'VET-TESTNET' => 'vechain-testnet',
            'XRP' => 'ripple-mainnet',
            'XRP-TESTNET' => 'ripple-testnet',
            'FLOW' => 'flow-mainnet',
            'FLOW-TESTNET' => 'flow-testnet',
            'XDC' => 'xdc-mainnet',
            'XDC-TESTNET' => 'xdc-testnet',
            'TRX' => 'tron-mainnet',
            'TRX-TESTNET' => 'tron-testnet',
            'BSC' => 'bsc-mainnet',
            'BSC-TESTNET' => 'bsc-testnet',
            'BCH' => 'bch-mainnet',
            'BCH-TESTNET' => 'bch-testnet',
            'XLM' => 'stellar-mainnet',
            'XLM-TESTNET' => 'stellar-testnet',
            'BNB' => 'bnb-mainnet',
            'BNB-TESTNET' => 'bnb-testnet',
            'EGLD' => 'egld-mainnet',
            'EGLD-TESTNET' => 'egld-testnet',
            'DOGE' => 'doge-mainnet',
            'DOGE-TESTNET' => 'doge-testnet',
            'ONE' => 'one-mainnet-s0',
            'ONE-TESTNET' => 'one-testnet-s0',
            'EOS' => 'eos-mainnet',
            'EOS-TESTNET' => 'eos-testnet',
            'AVAX' => 'avax-mainnet',
            'AVAX-TESTNET' => 'avax-testnet',
            'AVAX-X-TESTNET' => 'avalanche-x-testnet',
            'AVAX-P' => 'avalanche-p',
            'AVAX-P-TESTNET' => 'avalanche-p-chain-testnet',
            'FTM' => 'fantom',
            'FTM-TESTNET' => 'fantom-testnet',
            'ARB' => 'arbitrum-one',
            'ARB-TESTNET' => 'arbitrum-rinkeby',
            'OVM' => 'optimism',
            'OVM-TESTNET' => 'optimism-kovan',
            'NEAR' => 'near',
            'NEAR-TESTNET' => 'near-testnet',
            'CRO' => 'crypto-com',
            'CRO-TESTNET' => 'crypto-com-testnet',
            'RSK' => 'rsk',
            'RSK-TESTNET' => 'rsk-testnet',
            'AURORA' => 'aurora',
            'AURORA-TESTNET' => 'aurora-testnet',
            'GNO' => 'gnosis',
            'GNO-TESTNET' => 'gnosis-testnet',
            'DOT' => 'polkadot',
            'DOT-TESTNET' => 'polkadot-cc1',
            'KSM' => 'kusama',
            'KSM-TESTNET' => 'kusama-cc3',
            'OASIS' => 'oasis',
            'OASIS-TESTNET' => 'oasis-testnet',
            'XTZ' => 'tezos',
            'XTZ-TESTNET' => 'tezos-testnet',
            'ZEC' => 'zcash',
            'ZEC-TESTNET' => 'zcash-testnet',
            'PALM' => 'palm',
            'PALM-TESTNET' => 'palm-testnet',
            'ZIL' => 'zilliqa',
            'ZIL-TESTNET' => 'zilliqa-testnet',
            'ETC' => 'ethereum-classic-mainnet'
        ];

        return $chainNames[$symbol] ?? null;
    }

    private function ethGetTokenBalance($wallet, $token)
    {
        $decimals = $this->createDecimalString($token->decimals);
        $data = '0x70a08231000000000000000000000000' . substr(strtolower($wallet->address), 2);

        $payload = [
            'to' => $token->address,
            'data' => $data,
        ];

        $response = $this->callEthRpc($this->getChainNameBySymbol($wallet->chain), $payload);

        if (isset($response->result) && $response->result !== "0x") {
            return hexdec($response->result) * $decimals;
        }

        return 0;
    }

    private function callEthRpc($chain, $payload)
    {
        try {
            $response = $this->api
                ->nodeRPC()
                ->nodeJsonPostRpcDriver(
                    $chain,
                    [
                        'jsonrpc' => '2.0',
                        'id' => 1,
                        'method' => 'eth_call',
                        'params' => [
                            $payload,
                            'latest',
                        ],
                    ]
                );

            return $response;
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            echo sprintf(
                "API Exception when calling api()->nodeRPC()->nodeJsonPostRpcDriver(): %s\n",
                var_export($apiExc->getResponseObject(), true)
            );
        } catch (\Exception $exc) {
            echo sprintf(
                "Exception when calling api()->nodeRPC()->nodeJsonPostRpcDriver(): %s\n",
                $exc->getMessage()
            );
        }

        return null;
    }


    private function createDecimalString($decimalsCount)
    {
        $decimalValue = pow(10, -$decimalsCount);
        return number_format($decimalValue, $decimalsCount, '.', '');
    }
}
