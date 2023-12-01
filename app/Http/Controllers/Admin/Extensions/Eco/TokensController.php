<?php

namespace App\Http\Controllers\Admin\Extensions\Eco;

use App\Http\Controllers\Controller;
use App\Models\Eco\EcoFeesAccount;
use App\Models\Eco\EcoMainnetTokens;
use App\Models\Eco\EcoNetworks;
use App\Models\Eco\EcoRealWallets;
use App\Models\Eco\EcoSettings;
use App\Models\Eco\EcoTokens;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tatum\Sdk;

class TokensController extends Controller
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
            $this->api = $this->eco->testnet()->api();
        }
    }

    public function tokens($chain)
    {
        $page_title = 'Tokens';
        $network = EcoNetworks::where('chain', $chain)->first();
        $wallet = EcoRealWallets::where('chain', $chain)->first();
        return view('extensions.admin.eco.tokens', compact('page_title', 'network', 'wallet', 'chain'));
    }

    public function fees($chain, $symbol)
    {
        $page_title = $symbol . ' Fees Account';
        return view('extensions.admin.eco.fees', compact('page_title', 'chain', 'symbol'));
    }

    public function token_deploy(Request $request, $chain)
    {
        $validator = Validator::make($request->all(), [
            'symbol' => 'required|string|max:255|unique:eco_tokens,symbol',
            'name' => 'required|string|max:255',
            'cap' => 'required|numeric',
            'decimals' => 'required|numeric',
            'supply' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'type' => 'error',
                'message' => $validator->errors()->first()
            ]);
        }

        try {
            $wallet = EcoRealWallets::where('chain', $chain)->first();

            $tokenData = $this->getTokenData($request, $wallet, $chain);
            $token = $this->deployToken($chain, $tokenData, $request->type ?? null);
            if (isset($token['type']) && $token['type'] == 'error') {
                return response()->json([
                    'type' => 'error',
                    'message' => $token['message']
                ]);
            }
            $this->saveToken($request, $wallet, $chain, $token->getTxId());
            return response()->json([
                'type' => 'success',
                'message' => 'Token Deployed Successfully'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'type' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }


    private function getTokenData($request, $masterWallet, $chain)
    {
        $tokenData = [
            "chain" => $chain,
            "symbol" => $request->symbol,
            "name" => $request->name,
            "total_cap" => $request->cap,
            "supply" => $request->supply,
            "digits" => getAmount($request->decimals),
            "address" => $masterWallet->address,
            "from_private_key" => isEncrypted($masterWallet->private_key) ? decrypt($masterWallet->private_key) : $masterWallet->private_key,
        ];

        if ($chain == 'ETH') {
            $arg_estimate_fee = (new \Tatum\Model\EstimateFee())
                ->setChain('ETH')
                ->setType('DEPLOY_ERC20');

            try {
                $result = $this->api->blockchainFees()->estimateFee($arg_estimate_fee);
            } catch (\Tatum\Sdk\ApiException $apiExc) {
                $responseObj = $apiExc->getResponseObject();
                return [
                    'type' => 'error',
                    'message' => $responseObj['message']
                ];
            } catch (\Exception $exc) {
                return [
                    'type' => 'error',
                    'message' => $exc->getMessage()
                ];
            }

            $tokenData["fee"] = [
                "gasLimit" => $result->getGasLimit(),
                "gasPrice" => round($result->getGasPrice()),
            ];
        }

        return $tokenData;
    }


    private function deployToken($chain, $tokenData, $type = null)
    {
        switch ($chain) {
            case 'ETH':
            case 'BSC':
            case 'MATIC':
            case 'KLAY':
            case 'XDC':
            case 'ONE':
                $tokenDataModel = (new \Tatum\Model\ChainDeployErc20())
                    ->setChain($chain)
                    ->setSymbol($tokenData['symbol'])
                    ->setName($tokenData['name'])
                    ->setTotalCap($tokenData['total_cap'])
                    ->setSupply($tokenData['supply'])
                    ->setDigits((int)$tokenData['digits'])
                    ->setAddress($tokenData['address'])
                    ->setFromPrivateKey($tokenData['from_private_key']);

                if (isset($tokenData['fee'])) {
                    $customFee = (new \Tatum\Model\CustomFee())
                        ->setGasLimit($tokenData['fee']['gasLimit'])
                        ->setGasPrice($tokenData['fee']['gasPrice']);
                    $tokenDataModel->setFee($customFee);
                }

                try {
                    return $this->api->fungibleTokensERC20OrCompatible()->chainDeployErc20($tokenDataModel);
                } catch (\Tatum\Sdk\ApiException $apiExc) {
                    $responseObj = $apiExc->getResponseObject();
                    return [
                        'type' => 'error',
                        'message' => "{$responseObj['cause']}"
                    ];
                } catch (\Exception $exc) {
                    return [
                        'type' => 'error',
                        'message' => $exc->getMessage()
                    ];
                }
            case 'SOL':
                $formattedSupply = number_format($tokenData['supply'], 18, '.', '');
                $solanaTokenData = (new \Tatum\Model\ChainDeploySolanaSpl())
                    ->setChain('SOL')
                    ->setSupply((string)$formattedSupply)
                    ->setDigits((int)$tokenData['digits'])
                    ->setAddress($tokenData['address'])
                    ->setFrom($tokenData['address'])
                    ->setFromPrivateKey($tokenData['from_private_key']);

                try {
                    return $this->api->fungibleTokensERC20OrCompatible()->chainDeploySolanaSpl($solanaTokenData);
                } catch (\Tatum\Sdk\ApiException $apiExc) {
                    $responseObj = $apiExc->getResponseObject();
                    return [
                        'type' => 'error',
                        'message' => "{$responseObj['message']}"
                    ];
                } catch (\Exception $exc) {
                    return [
                        'type' => 'error',
                        'message' => $exc->getMessage()
                    ];
                }
            case 'CELO':
                $celoTokenData = (new \Tatum\Model\ChainDeployCeloErc20())
                    ->setChain('CELO')
                    ->setSymbol($tokenData['symbol'])
                    ->setName($tokenData['name'])
                    ->setTotalCap($tokenData['supply'])
                    ->setSupply($tokenData['supply'])
                    ->setDigits((int)$tokenData['digits'])
                    ->setAddress($tokenData['address'])
                    ->setFromPrivateKey($tokenData['from_private_key'])
                    ->setFeeCurrency('CELO');

                try {
                    return $this->api->fungibleTokensERC20OrCompatible()->chainDeployCeloErc20($celoTokenData);
                } catch (\Tatum\Sdk\ApiException $apiExc) {
                    $responseObj = $apiExc->getResponseObject();
                    return [
                        'type' => 'error',
                        'message' => "{$responseObj['message']}"
                    ];
                } catch (\Exception $exc) {
                    return [
                        'type' => 'error',
                        'message' => $exc->getMessage()
                    ];
                }
            case 'TRON':
                if ($type == 'trc10') {
                    $tronTokenData = (new \Tatum\Model\CreateTronTrc10Blockchain())
                        ->setFromPrivateKey($tokenData['from_private_key'])
                        ->setRecipient($tokenData['address'])
                        ->setName($tokenData['name'])
                        ->setAbbreviation($tokenData['symbol'])
                        ->setDescription($tokenData['name'] . ' Token')
                        ->setUrl(env('APP_URL'))
                        ->setTotalSupply((float)$tokenData['supply'])
                        ->setDecimals((int)$tokenData['digits']);
                    $deployFunction = 'createTronTrc10Blockchain';
                } elseif ($type == 'trc20') {
                    $tronTokenData = (new \Tatum\Model\CreateTronTrc20Blockchain())
                        ->setRecipient($tokenData['address'])
                        ->setFromPrivateKey($tokenData['from_private_key'])
                        ->setName($tokenData['name'])
                        ->setSymbol($tokenData['symbol'])
                        ->setDecimals((int)$tokenData['digits'])
                        ->setTotalSupply((float)$tokenData['supply']);
                    $deployFunction = 'createTronTrc20Blockchain';
                } else {
                    return [
                        'type' => 'error',
                        'message' => 'Invalid TRON token type. Must be trc10 or trc20.'
                    ];
                }

                try {
                    return $this->api->tron()->{$deployFunction}($tronTokenData);
                } catch (\Tatum\Sdk\ApiException $apiExc) {
                    $responseObj = $apiExc->getResponseObject();
                    return [
                        'type' => 'error',
                        'message' => "{$responseObj['cause']}"
                    ];
                } catch (\Exception $exc) {
                    return [
                        'type' => 'error',
                        'message' => $exc->getMessage()
                    ];
                }
            default:
                throw new \Exception('Unsupported chain for token deployment.');
        }
    }



    private function saveToken($request, $wallet, $chain, $txId)
    {
        $new_token = new EcoTokens();
        $new_token->chain = $chain;
        $new_token->symbol = strtoupper($request->symbol);
        $new_token->name = $request->name;
        $new_token->cap = $request->cap;
        $new_token->decimals = $request->decimals;
        $new_token->supply = $request->supply;
        $new_token->holder_address = $wallet->address;
        $new_token->actions = 1;
        $new_token->hash = $txId;

        if (getNativeNetwork() != 'mainnet') {
            $new_token->testnet = getenv('TESTNET_TYPE');
            $new_token->network = 'testnet';
        } else {
            $new_token->network = 'mainnet';
        }
        if ($request->has('type')) {
            $new_token->type = $request->type;
        }

        $new_token->save();
        $new_token->clearCache();

        return $new_token;
    }



    public function token_add(Request $request, $chain)
    {
        $validate = Validator::make($request->all(), [
            'symbol' => 'required|string|max:255|unique:eco_tokens,symbol',
            'name' => 'required|string|max:255',
            'cap' => 'required|numeric',
            'supply' => 'required|numeric',
            'hash' => 'required|string',
            'token_address' => 'required|string',
            'holder_address' => 'required|string',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'type' => 'error',
                'message' => $validate->errors()->first()
            ]);
        }

        try {
            $network = EcoNetworks::where('chain', $chain)->first();
            $new_token = new EcoTokens();
            $new_token->chain = $chain;
            $new_token->symbol = strtoupper($request->symbol);
            $new_token->name = $request->name;
            $new_token->cap = $request->cap;
            $new_token->decimals = $request->decimals;
            $new_token->supply = $request->supply;
            $new_token->address = $request->token_address;
            $new_token->holder_address = $request->holder_address;
            $new_token->actions = 2;
            $new_token->hash = $request->hash;
            $new_token->testnet = $network->testnet;
            if ($request->has('type')) {
                $new_token->type = $request->type;
            }
            $new_token->save();
            $new_token->clearCache();

            return response()->json([
                'type' => 'success',
                'message' => 'Token Deployed Successfully'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'type' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }


    public function token_smart_contract_fetch($chain, $id)
    {
        $token = EcoTokens::where('id', $id)->first();

        try {

            if ($chain === 'SOL') {
                $token->address = $this->getSolanaContractAddress($token->hash);
            } elseif ($chain === 'TRON') {
                $transactionResponse = $this->api->tron()->tronGetTransaction($token->hash);
                $transactionResponseArray = json_decode(json_encode($transactionResponse), true);
                if ($token->type === 'trc10') {
                    $token->address = $transactionResponseArray['rawData']['contract'][0]['parameter']['value']['ownerAddressBase58'];
                } elseif ($token->type === 'trc20') {
                    foreach ($transactionResponseArray['rawData']['contract'] as $contract) {
                        if ($contract['type'] === 'TriggerSmartContract') {
                            $token->address = $contract['parameter']['value']['contract_address'];
                            break;
                        }
                    }
                }
            } else {
                $contractAddressResponse = $this->api->blockchainUtils()->scGetContractAddress($chain, $token->hash);
                $token->address = $contractAddressResponse->getContractAddress();
            }

            $token->actions = 2;
            $token->save();
            $token->clearCache();
            $notify[] = ['success', 'Token Smart Contract Fetched Successfully'];
        } catch (\Throwable $th) {
            $notify[] = ['error', $th->getMessage()];
        }
        return back()->withNotify($notify);
    }

    function getSolanaContractAddress($transactionHash)
    {
        $solanaRpcUrl = 'https://api.mainnet-beta.solana.com';
        $data = [
            'jsonrpc' => '2.0',
            'id' => 1,
            'method' => 'getConfirmedTransaction',
            'params' => [
                $transactionHash,
                'jsonParsed'
            ]
        ];

        $ch = curl_init($solanaRpcUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json'
        ]);

        $response = curl_exec($ch);

        if ($response === false) {
            throw new Exception(curl_error($ch));
        }

        $decodedResponse = json_decode($response, true);

        if (isset($decodedResponse['error'])) {
            return new Exception($decodedResponse['error']['message']);
        }

        $contractAddress = $decodedResponse['result']['meta']['postTokenBalances'][0]['mint'];
        return $contractAddress;
    }

    public function token_smart_contract_add(Request $request, $chain)
    {
        $token = EcoTokens::where('id', $request->id)->first();
        $token->address = $request->smartContract;
        $token->actions = 2;
        $token->save();
        $token->clearCache();

        $notify[] = ['success', 'Token Smart Contract Address Added Successfully'];
        return response()->json(
            [
                'type' => $notify[0][0],
                'message' => $notify[0][1]
            ]
        );
    }

    public function token_register(Request $request, $chain)
    {
        $validate = Validator::make($request->all(), [
            'base_pair' => 'required|string',
        ]);
        if ($validate->fails()) {
            foreach (json_decode($validate->errors()) as $key => $error) {
                $notify[] = ['error', $error[0]];
            }
            return response()->json(
                [
                    'type' => $notify[0][0],
                    'message' => $notify[0][1]
                ]
            );
        }
        try {
            $token = EcoTokens::where('id', $request->id)->first();
            $wallet = EcoRealWallets::where('chain', $chain)->first();

            if (in_array($chain, ["ETH", "CELO", "MATIC", "KCS", "BSC", "ONE", "XDC", "KLAY", "SOL"])) {
                // Prepare the ERC20 token data
                $erc20Data = new \Tatum\Model\Erc20Address([
                    "symbol" => $token->symbol,
                    "supply" => strval($token->supply),
                    "decimals" => $token->decimals,
                    "description" => $token->name,
                    "base_pair" => $request->base_pair,
                    "address" => $wallet->address,
                ]);

                // Register the token using the new SDK method
                $req = $this->api->blockchainOperations()->erc20Address($chain, $erc20Data);
            } elseif ($chain == 'TRON') {
                $trcData = (new \Tatum\Model\TrcAddress())
                    ->setSymbol($token->symbol)
                    ->setSupply(strval($token->supply))
                    ->setDecimals($token->decimals)
                    ->setDescription($token->name)
                    ->setType($request->type)
                    ->setBasePair($request->base_pair)
                    ->setAddress($wallet->address);

                $req = $this->api->blockchainOperations()->trcAddress($trcData);
                $token->type = $request->type;
            } else {
                throw new \Exception("Unsupported chain: {$chain}");
            }

            if (!isset($req['statusCode'])) {
                $token->base_pair = $request->base_pair;
                $token->actions = 3;
                $token->account_id = $req->getAccountId();
                $token->save();
                $token->clearCache();
                $notify[] = ['success', 'Token Registered Successfully'];
            } else {
                $notify[] = ['warning', 'Token Registration Failed'];
            }
        } catch (\Throwable $th) {
            return response()->json(
                [
                    'type' => 'error',
                    'message' => get_class($th) . ': ' . $th->getMessage()
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


    public function token_sync($chain, $id)
    {
        $token = EcoTokens::where('id', $id)->first();
        try {
            if (in_array($chain, ["ETH", "CELO", "MATIC", "KCS", "BSC", "ONE", "XDC", "KLAY", "SOL", "TRON"])) {
                // Store the ERC20 token address
                $this->api->blockchainOperations()->storeTokenAddress($token->address, $token->symbol);

                $token->actions = 4;
                $token->save();
                $token->clearCache();
                $notify[] = ['success', 'Token Synced Successfully'];
            } else {
                throw new \Exception("Unsupported chain: {$chain}");
            }
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            $responseObj = $apiExc->getResponseObject();
            $notify[] = ['error', "{$responseObj['message']}"];
            if ($responseObj['message'] == 'Token address was already set.') {
                $token->actions = 4;
                $token->save();
                $token->clearCache();
            }
        } catch (\Throwable $th) {
            $notify[] = ['error', get_class($th) . ': ' . $th->getMessage()];
        }
        return back()->withNotify($notify);
    }



    public function add_icon(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'image' => 'mimes:jpeg,jpg,png,svg'
        ]);
        if ($validate->fails()) {
            foreach (json_decode($validate->errors()) as $key => $error) {
                $notify[] = ['error', $error[0]];
            }
            return response()->json(
                [

                    'type' => $notify[0][0],
                    'message' => $notify[0][1]
                ]
            );
        }
        $path = imagePath()['cryptoCurrency']['path'];
        $size = imagePath()['cryptoCurrency']['size'];
        if (isset($request->image)) {
            try {
                $filename = uploadimg($request->image, $path, $size, $request->symbol, strtolower($request->symbol . '.png'));
                $notify[] = ['success', $filename . ' Icon Uploaded Successfully'];
            } catch (\Exception $exp) {
                $notify[] = ['error', 'Icon could not be uploaded.'];
            }
        }
        return response()->json(
            [

                'type' => $notify[0][0],
                'message' => $notify[0][1]
            ]
        );
    }

    public function token_fees_account_create(Request $request, $chain)
    {
        $masterWallet = EcoRealWallets::where('chain', $request->chain)->first();
        $provider = EcoSettings::first();
        $user = Auth::user();
        $net = getNativeNetwork();
        $fees_account = EcoFeesAccount::where('chain', $request->chain)
            ->where('network', $net)
            ->where('symbol', $request->symbol)
            ->first();
        if ($fees_account) {
            return response()->json([
                'type' => 'error',
                'message' => 'Fees account already exists',
            ]);
        }
        try {
            $payload = [
                'currency' => $request->symbol . ($request->postfix ?? ''),
                'xpub' => $request->chain == 'BNB' ? $masterWallet->address : (isEncrypted($masterWallet->xpub) ? decrypt($masterWallet->xpub) : $masterWallet->xpub),
                'customer' => [
                    'accountingCurrency' => $provider->accounting_currency ?? 'USD',
                    'customerCountry' => $user->client_country ?? 'US',
                    'externalId' => "$user->id",
                    'providerCountry' => $provider->provider_country ?? 'US',
                ],
                'compliant' => false,
                'accountCode' => "AC_$user->id",
                'accountingCurrency' => $user->accounting_currency ?? 'USD',
                'accountNumber' => "$user->id",
            ];
            $account = $this->api->account()->createAccount($payload);
            $fees_account = new EcoFeesAccount();
            $fees_account->chain = $chain;
            $fees_account->network = $net;
            $fees_account->symbol = $request->symbol;
            $fees_account->postfix = $request->postfix;
            $fees_account->account_id = $account->getId();
            $fees_account->customer_id = $account->getCustomerId();
            $fees_account->save();
            $fees_account->clearCache();
            return response()->json([
                'type' => 'success',
                'message' => 'Wallet Created Successfully',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }


    public function token_withdraw_settings(Request $request, $chain, $isMainnet = 'false')
    {
        $isMainnet = filter_var($isMainnet, FILTER_VALIDATE_BOOLEAN);
        $validate = Validator::make($request->all(), [
            'withdraw_min' => 'required|numeric',
            'withdraw_max' => 'required|numeric',
            'withdraw_fee' => 'required|numeric',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'type' => 'error',
                'message' => $validate->errors()->first(),
            ]);
        }

        try {
            if ($isMainnet) {
                $token = EcoMainnetTokens::where('id', $request->id)->first();
            } else {
                $token = EcoTokens::where('id', $request->id)->firstOrFail();
            }

            $token->withdraw_min = $request->withdraw_min;
            $token->withdraw_max = $request->withdraw_max;
            $token->withdraw_fee = $request->withdraw_fee;
            $token->save();
            $token->clearCache();

            return response()->json([
                'type' => 'success',
                'message' => 'Token Withdraw Settings Updated Successfully',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function mainnet_tokens($chain)
    {
        $page_title = 'Tokens';
        return view('extensions.admin.eco.mainnet_tokens', compact('page_title', 'chain'));
    }
}
