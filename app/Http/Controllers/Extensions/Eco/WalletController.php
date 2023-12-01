<?php

namespace App\Http\Controllers\Extensions\Eco;

use App\Http\Controllers\Controller;
use App\Http\Controllers\WalletController as ControllersWalletController;
use App\Models\Eco\EcoFeesAccount;
use App\Models\Eco\EcoLog;
use App\Models\Eco\EcoMainnetTokens;
use App\Models\Eco\EcoRealWallets;
use App\Models\Eco\EcoTokens;
use App\Models\Eco\EcoNetworks;
use App\Models\Eco\EcoSettings;
use App\Models\Eco\EcoUTXO;
use App\Models\Eco\EcoWallet;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletsTransactions;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tatum\Sdk;

class WalletController extends Controller
{
    const GAS_PUMP_CHAINS = ["ETH", "BSC", "MATIC", "KLAY", "CELO", "XDC", "ONE", "TRON"];
    const UTXO_CHAINS = ["BTC", "LTC", "ADA", "DOGE"];
    const PRIVATE_CHAINS = ["SOL"];
    const ESTIMATE_FEE_CHAINS = ["ETH", "BSC", "MATIC", "KLAY", "CELO", "XDC", "ONE"];

    private $eco;
    protected $api;
    private $net;

    public function __construct()
    {
        $this->eco = new Sdk();
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


    public function index($id = null)
    {
        if ($id !== null) {
            $user = User::find($id);
        } else {
            $user = auth()->user();
        }
        $networks = EcoNetworks::where('status', 1)->get();

        $currenciesAndTokens = collect();

        foreach ($networks as $network) {
            $chainCurrencies = EcoTokens::where('chain', $network->chain)
                ->where('status', 1)
                ->where('network', $this->net)
                ->select('chain', 'symbol', 'network')
                ->get();
            $currenciesAndTokens = $currenciesAndTokens->concat($chainCurrencies);

            $chainTokens = EcoMainnetTokens::where('chain', $network->chain)
                ->where('status', 1)
                ->where(function ($query) {
                    $query->whereNull('postfix')
                        ->orWhere('postfix', '');
                })
                ->select('chain', 'symbol', 'network', 'postfix')
                ->get();
            $currenciesAndTokens = $currenciesAndTokens->concat($chainTokens);
        }

        $wallets = EcoWallet::where('user_id', $user->id)
            ->where('network', $this->net)
            ->whereNotIn('symbol', ['_'])
            ->select(['id', 'chain', 'symbol', 'balance', 'postfix', 'balance', 'address', 'total_balance', 'network', 'currency'])
            ->get();

        $groupedWallets = $wallets->groupBy('currency');

        // Merge wallet data into currency and token data
        $currencies = $currenciesAndTokens->map(function ($item) use ($groupedWallets) {
            $item->postfix = $item->postfix ?? ''; // Set postfix to an empty string if it doesn't exist
            $currencyWallets = $groupedWallets->get($item->symbol);

            if ($currencyWallets) {
                $total_balance = $currencyWallets->sum('balance');
                $firstWallet = $currencyWallets->first();

                $firstWallet->total_balance = $total_balance;
                $firstWallet->save();

                $item->wallet = $firstWallet;
            }

            return $item;
        });

        $currencies = $currencies->filter(function ($item) {
            return isset($item->wallet);
        })->sortByDesc(function ($item) {
            return $item->wallet->balance;
        })->concat($currencies->filter(function ($item) {
            return !isset($item->wallet);
        }))->values();

        return response()->json([
            'currencies' => $currencies,
            'net' => $this->net
        ]);
    }

    public function show($symbol, $address)
    {
        $user = Auth::user();

        $mainnetTokens = EcoMainnetTokens::where('symbol', $symbol)->where('status', 1)->select('chain', 'symbol', 'postfix', 'withdraw_fee', 'withdraw_min', 'withdraw_max')->get();

        $tokens = EcoTokens::where('symbol', $symbol)
            ->where('network', $this->net)
            ->where('status', 1)
            ->select('chain', 'symbol', 'withdraw_fee', 'withdraw_min', 'withdraw_max')
            ->get();

        $tokens = $mainnetTokens->concat($tokens);

        $addresses = [];
        $logs = collect([]);
        $missing = [];
        $wal = null;

        foreach ($tokens as $token) {
            $wallet = EcoWallet::where('chain', $token['chain'])
                ->where('user_id', $user->id)
                ->where('symbol', $token['symbol'] . ($token['postfix'] ?? ''))
                ->where('network', $this->net)
                ->select(['id', 'chain', 'symbol', 'balance', 'postfix', 'balance', 'address'])
                ->first();

            if ($wallet) {
                $this->updateBalance($wallet);

                $addresses[$wallet->chain] = $wallet;
                $addresses[$wallet->chain]['withdraw_fee'] = $token['withdraw_fee'];
                $addresses[$wallet->chain]['withdraw_min'] = $token['withdraw_min'];
                $addresses[$wallet->chain]['withdraw_max'] = $token['withdraw_max'];
                $addresses[$wallet->chain]['withdraw_memo'] = $token['withdraw_memo'] ?? null;
                $addresses[$wallet->chain]['has_memo'] = $token['has_memo'] ?? null;

                $logs = $logs->concat($wallet->log->map(function ($value) use ($wallet) {
                    $value->chain = $wallet->chain;
                    return $value;
                }));

                if ($wal === null) {
                    $wal = $wallet;
                }
            } else {
                $missing[] = [
                    'chain' => $token['chain'],
                    'symbol' => $token['symbol'],
                    'postfix' => $token['postfix'] ?? '',
                    'network' => $this->net,
                ];
            }
        }

        return response()->json([
            'wal' => $wal,
            'addresses' => arrayToObject($addresses),
            'logs' => $logs,
            'missing' => $missing,
        ]);
    }



    public function logs($symbol, $address)
    {
        $user = Auth::user();
        $data = [];
        $log = [];

        $mainnetTokenQuery = EcoMainnetTokens::where('symbol', $symbol)
            ->where('status', 1)
            ->select('chain', 'symbol', 'postfix', 'withdraw_fee', 'withdraw_min', 'withdraw_max');

        $tokenQuery = EcoTokens::where('symbol', $symbol)
            ->where('network', $this->net)
            ->where('status', 1)
            ->select('chain', 'symbol', 'withdraw_fee', 'withdraw_min', 'withdraw_max');

        $tokens = $mainnetTokenQuery->get()->concat($tokenQuery->get());

        foreach ($tokens as $key => $token) {

            $wallet = EcoWallet::where('chain', $token->chain)
                ->where('user_id', $user->id)
                ->where('symbol', $token->symbol . ($token->postfix ?? ''))
                ->where('network', $this->net)
                ->first();

            if ($wallet) {
                $transactionFilter = (new \Tatum\Model\TransactionFilter())
                    ->setId("$wallet->account_id")
                    ->settransactionTypes(['CREDIT_DEPOSIT', 'DEBIT_PAYMENT', 'CREDIT_PAYMENT']);

                $response = $this->api->transaction()->getTransactionsByAccountId($transactionFilter, 50);

                $data[$token->chain] = $response->getData();

                if (in_array($token->chain, self::GAS_PUMP_CHAINS)) {
                    $this->updateWalletStatus($wallet, $token->chain, $data);
                }

                $this->updateWalletLogs($wallet, $data, $token->chain);

                if (in_array($token->chain, self::UTXO_CHAINS)) {
                    $this->fetchUTXO($wallet);
                }

                if (count($data[$token->chain]) > count($wallet->log)) {
                    $this->updateBalance($wallet);
                }

                $log[$token->chain] = $wallet->log;
            }
        }

        $logs = $this->flattenLogs($log);
        return response()->json([
            'logs' => $logs
        ]);
    }


    public function getTokens($symbol, $networks)
    {
        $tokens = EcoTokens::where('symbol', $symbol)
            ->where('network', $this->net)
            ->where('status', 1)
            ->whereIn('chain', ['ETH', 'CELO', 'BSC', 'ONE', 'KLAY', 'MATIC', 'TRON'])
            ->get(['chain', 'symbol'])
            ->toArray();

        $mainCurrencies = EcoMainnetTokens::where('symbol', $symbol)
            ->where('status', 1)
            ->whereIn('chain', $networks)
            ->get(['chain', 'symbol', 'postfix'])
            ->toArray();
        $tokens = array_merge($tokens, $mainCurrencies);

        return $tokens;
    }

    public function balance(Request $request)
    {
        $user = Auth::user();
        $wallet = EcoWallet::where('chain', $request->chain)
            ->where('user_id', $user->id)
            ->where('currency', $request->symbol)
            ->where('network', $this->net)
            ->first();

        if ($wallet && $wallet->account_id) {
            $this->updateBalance($wallet);
        }

        return response()->json([
            'symbol' => $wallet->symbol ?? null,
            'balance' => $wallet->balance ?? null
        ]);
    }

    public function updateBalance($wallet)
    {
        try {
            $balance = $this->api->account()->getAccountBalance($wallet->account_id);
            $wallet->balance = $balance->getAvailableBalance();
            $wallet->save();
        } catch (\Throwable $th) {
            //throw $th;
        }
    }


    private function updateWalletStatus($wallet, $chain, $data)
    {
        if (count($data[$chain]) > 0) {
            if ($wallet->status == 2) {
                $masterWallet = EcoRealWallets::where('chain', $chain)->first();
                try {
                    $response = $this->api->gasPump()->gasPumpAddressesActivatedOrNot($chain, $masterWallet->address, $wallet->index);
                    if ($response['activated']) {
                        $wallet->status = 1;
                        $wallet->save();
                    } else {
                        $wallet->activation_trx = null;
                        $wallet->save();
                    }
                } catch (\Exception $e) {
                }
            } elseif ($wallet->status == 0) {
                $this->activateWallet($wallet);
            }
        }
    }

    private function activateWallet($wallet)
    {
        $masterWallet = EcoRealWallets::where('chain', $wallet->chain)->first();

        if ($wallet->chain === 'TRON') {
            $activateGasPump = (new \Tatum\Model\ActivateGasPumpTron())
                ->setChain($wallet->chain)
                ->setOwner($masterWallet->address)
                ->setFrom($wallet->index)
                ->setTo($wallet->index)
                ->setFeeLimit(600)
                ->setFromPrivateKey(isEncrypted($masterWallet->private_key) ? decrypt($masterWallet->private_key) : $masterWallet->private_key);
        } elseif ($wallet->chain === 'CELO') {
            $activateGasPump = (new \Tatum\Model\ActivateGasPumpCelo())
                ->setChain($wallet->chain)
                ->setOwner($masterWallet->address)
                ->setFrom($wallet->index)
                ->setTo($wallet->index)
                ->setFeeCurrency('CELO') // or 'CUSD', or 'CEUR'
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
            } elseif ($wallet->chain === 'CELO') {
                $response = $this->api->gasPump()->activateGasPumpCelo($activateGasPump);
            } else {
                $response = $this->api->gasPump()->activateGasPump($activateGasPump);
            }

            $wallet->activation_trx = $response->getTxId();
            $wallet->status = 2;
            $wallet->save();
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            createAdminNotification(
                '1',
                'Wallet failed to activate by ' . $wallet->user->name,
                route('admin.eco.blockchain.wallet.index', $wallet->chain),
                $apiExc->getMessage(),
            );
        } catch (\Exception $exc) {
            // Handle the general exception if needed
        }
    }



    private function updateWalletLogs($wallet, $data, $chain)
    {
        foreach ($data[$chain] as $transaction) {
            if ($transaction->transactionType == 'CREDIT_DEPOSIT') {
                $type = 1;
                $txId = $transaction->txId;
            } else if ($transaction->transactionType == 'DEBIT_PAYMENT') {
                $type = 3;
                $txId = $transaction->reference;
            } else if ($transaction->transactionType == 'CREDIT_PAYMENT') {
                $type = 4;
                $txId = $transaction->reference;
            }
            if (!EcoLog::where('txid', $txId)->where('wallet_id', $wallet->id)->exists()) {
                createEcoLog($wallet, $transaction->amount, 0, $transaction->reference, $txId, $type, 1, $transaction->created);
                try {
                    $balance = $this->api->account()->getAccountBalance($wallet->account_id);
                    $wallet->balance = $balance->getAvailableBalance();
                    $wallet->save();
                } catch (\Throwable $th) {
                    //throw $th;
                }
            }
        }
    }

    public function fetchUTXO($wallet, $type = 'wallet')
    {
        $utxos = $this->getClientUtxos($wallet->address, $this->getChainNameBySymbol($wallet->chain));
        if (isset($utxos['type']) && $utxos['type'] == 'error') {
            return;
        }
        if (!is_array($utxos) || count($utxos) == 0) {
            return;
        }
        foreach ($utxos as $utxo) {
            if (!EcoUTXO::where('txHash', $utxo['txHash'])->where('index', $utxo['index'])->exists()) {
                EcoUTXO::create([
                    'type' => $type,
                    'wallet_id' => $wallet->id,
                    'txHash' => $utxo['txHash'],
                    'chain' => $wallet->chain,
                    'value' => $utxo['value'],
                    'index' => $utxo['index'],
                    'status' => 'unspent',
                ]);
            }
        }
    }


    public function getChainNameBySymbol(string $symbol): ?string
    {
        $chainNames = [
            'BTC' => 'bitcoin',
            'LTC' => 'litecoin',
            'ADA' => 'cardano',
            'DOGE' => 'doge',
        ];

        return $chainNames[$symbol] ?? null;
    }

    public function getClientUtxos($address, $chain)
    {
        try {
            switch ($chain) {
                case 'bitcoin':
                    return $this->api->bitcoin()->btcGetUnspentUtxosByAddress($address);
                    break;
                case 'doge':
                    return $this->api->dogecoin()->dogeGetUnspentUtxosByAddress($address);
                    break;
                case 'litecoin':
                    return $this->api->litecoin()->ltcGetUnspentUtxosByAddress($address);
                    break;
            }
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            return ['type' => 'error', 'message' => $apiExc->getResponseObject()];
        } catch (\Exception $exc) {
            return ['type' => 'error', 'message' => $exc->getMessage()];
        }
    }

    private function flattenLogs($log)
    {
        return array_reduce(array_keys($log), function ($logs, $chain) use ($log) {
            $chainLogs = $log[$chain]->toArray(); // Convert the Collection to an array
            return array_merge($logs, array_map(function ($value) use ($chain) {
                $value['chain'] = $chain;
                return $value;
            }, $chainLogs));
        }, []);
    }

    public function store(Request $request)
    {
        if (isset($request->user_id)) {
            $user = User::find($request->user_id);
        } else {
            $user = auth()->user();
        }
        $networks = EcoNetworks::where('status', 1)->pluck('chain')->toArray();
        $provider = EcoSettings::first();
        $tokens = $this->getTokens($request->symbol, $networks);
        $report = [];

        foreach ($tokens as $key => $token) {
            $masterWallet = EcoRealWallets::where('chain', $token['chain'])->first();

            if ($token['chain'] == 'SOL' && $request->symbol == 'USDC') {
                $sol_token = [
                    'chain' => 'SOL',
                    'symbol' => 'SOL',
                    'postfix' => ''
                ];
                $response = $this->createAndAssignWallet($user, $masterWallet, 'SOL', $provider, $sol_token);
                if (isset($response['wallet']) && $response['type'] != 'error') {
                    $sol_wallet = $response['wallet'];
                    $report[$key] = $this->createAndAssignWallet($user, $masterWallet, $token['symbol'], $provider, $token, $sol_wallet);
                } else {
                    $report[$key] = $response;
                }
            } else {
                // Create and assign the wallet for the current token
                $report[$key] = $this->createAndAssignWallet($user, $masterWallet, $token['symbol'], $provider, $token);
            }
        }

        return response()->json($report);
    }

    private function createAndAssignWallet($user, $masterWallet, $symbol, $provider, $token, $user_wallet = null)
    {
        // Get or create the wallet
        $wallet = $this->getOrCreateWallet($user, $masterWallet, $symbol, $token);

        if ($wallet && $wallet->assigned == 1 && $wallet->account_id != null) {
            return [
                'type' => 'error',
                'message' => $wallet->symbol . ' Wallet Already Exists',
                'wallet' => $wallet
            ];
        }

        // Create the account and assign the address
        $createAccount = $this->createAccount($user, $wallet, $provider, $token);
        if (isset($createAccount['success']) && $createAccount['success'] == false) {
            return [
                'type' => 'error',
                'message' => $createAccount['message']
            ];
        }

        $assignAddress = $this->assignAddress($wallet, $user_wallet);
        if (isset($assignAddress['success']) && $assignAddress['success'] == false) {
            return [
                'type' => 'error',
                'message' => $assignAddress['message']
            ];
        }

        $wallet->save();

        return [
            'type' => 'success',
            'message' =>  $wallet->symbol . ' Wallet Created Successfully',
            'wallet' => $wallet
        ];
    }

    private function getOrCreateWallet($user, $masterWallet, $symbol, $token)
    {
        $wallet = EcoWallet::where('chain', $token['chain'])
            ->where('user_id', $user->id)
            ->where('symbol', $symbol . ($token['postfix'] ?? ''))
            ->where('network', $this->net)
            ->first();

        if (!$wallet) {
            $wallet = EcoWallet::where('user_id', null)
                ->where('chain', $token['chain'])
                ->where('symbol', $symbol . ($token['postfix'] ?? ''))
                ->where('network', $this->net)
                ->first();

            if ($wallet) {
                $wallet->user_id = $user->id;
            }
        }

        if (!$wallet) {
            $newWallet = $this->createNewWallet($masterWallet, $user, $token);
            if (isset($newWallet['success']) && $newWallet['success'] == false) {
                return [
                    'type' => 'error',
                    'message' => $newWallet['message']
                ];
            }
            $wallet = $newWallet['wallet'];
        }

        return $wallet;
    }

    private function createNewWallet($masterWallet, $user, $token)
    {
        $walletMaxIndex = EcoWallet::where('chain', $token['chain'])->max('index');
        $index = $walletMaxIndex !== null && $walletMaxIndex >= 1 ? $walletMaxIndex + 1 : 2;

        try {
            if (in_array($token['chain'], self::GAS_PUMP_CHAINS)) {
                $address = $this->generateAddress($masterWallet, $index, $token['chain']);

                if (!$address) {
                    throw new \Exception('Failed to generate deposit address.');
                }
            } elseif ($token['chain'] === 'SOL' && $token['symbol'] === 'SOL') {
                $wallet = $this->api->solana()->solanaGenerateWallet();
                $address = $wallet->getAddress();
                $walletPrivateKey = $wallet->getPrivateKey();
                $walletMnemonic = $wallet->getMnemonic();
            } else {
                $address = $walletPrivateKey = null;

                if (in_array($token['chain'], self::UTXO_CHAINS)) {
                    $privateKeyQuery = (new \Tatum\Model\PrivKeyRequest())
                        ->setIndex($index)
                        ->setMnemonic(isEncrypted($masterWallet->mnemonic) ? decrypt($masterWallet->mnemonic) : $masterWallet->mnemonic);

                    $query = $privateKeyResponse = null;

                    switch ($token['chain']) {
                        case 'BTC':
                            $query = $this->api->bitcoin()->btcGenerateAddress(isEncrypted($masterWallet->xpub) ? decrypt($masterWallet->xpub) : $masterWallet->xpub, $index);
                            $privateKeyResponse = $this->api->bitcoin()->btcGenerateAddressPrivateKey($privateKeyQuery);
                            break;
                        case 'DOGE':
                            $query = $this->api->dogecoin()->dogeGenerateAddress(isEncrypted($masterWallet->xpub) ? decrypt($masterWallet->xpub) : $masterWallet->xpub, $index);
                            $privateKeyResponse = $this->api->dogecoin()->dogeGenerateAddressPrivateKey($privateKeyQuery);
                            break;
                        case 'LTC':
                            $query = $this->api->litecoin()->ltcGenerateAddress(isEncrypted($masterWallet->xpub) ? decrypt($masterWallet->xpub) : $masterWallet->xpub, $index);
                            $privateKeyResponse = $this->api->litecoin()->ltcGenerateAddressPrivateKey($privateKeyQuery);
                            break;
                    }

                    $address = $query->getAddress();
                    $walletPrivateKey = $privateKeyResponse->getKey();
                }
            }

            $wallet = $this->createWallet($user, $index, $token['chain'], $token['symbol'], $token['postfix'] ?? '', $address ?? null, $walletPrivateKey ?? null, $walletMnemonic ?? null);

            return [
                'success' => true,
                'wallet' => $wallet
            ];
        } catch (\Throwable $th) {
            return [
                'success' => false,
                'message' => $th->getMessage()
            ];
        }
    }

    private function createWallet($user, $index, $chain, $symbol, $postfix, $address = null, $privateKey = null, $mnemonic = null)
    {
        $walletData = [
            'user_id' => $user->id,
            'index' => $index,
            'chain' => $chain,
            'symbol' => $symbol . $postfix,
            'currency' => $symbol,
            'postfix' => $postfix,
            'network' => $this->net
        ];

        if ($address != null) {
            $walletData['address'] = $address;
        }

        if ($mnemonic != null) {
            $walletData['mnemonic'] = encrypt($mnemonic);
        }
        if ($privateKey != null) {
            $walletData['private_key'] = encrypt($privateKey);
        }

        return new EcoWallet($walletData);
    }

    public function assignAddress($wallet, $user_wallet = null)
    {
        try {
            if ($wallet->chain == 'SOL') {
                if ($wallet->symbol == 'SOL') {
                    $result = $this->api->blockchainAddresses()->assignSolanaAddress($wallet->account_id, $wallet->address);
                } else {
                    $result = $this->api->blockchainAddresses()->assignSolanaAddress($wallet->account_id, $user_wallet->address);
                }
            } else {
                $result = $this->api->blockchainAddresses()->assignAddress($wallet->account_id, $wallet->address);
            }
            $address = $result->getAddress();
        } catch (\Throwable $th) {
            if (strpos($th->getMessage(), 'address.used') === false) {
                return [
                    'success' => false,
                    'message' => $th->getMessage()
                ];
            }
            $address = $wallet->address;
        }

        $wallet->assigned = 1;
        $wallet->address = $address;
        $wallet->save();

        return [
            'success' => true,
        ];
    }

    public function createAccount($user, $wallet, $provider, $token)
    {
        $createAccountModal = $this->createAccountModal($user, $provider, $token);
        try {
            $account = $this->api->account()->createAccount($createAccountModal);
        } catch (\Throwable $th) {
            return [
                'success' => false,
                'message' => $th->getMessage()
            ];
        }
        $wallet->account_id = $account->getId();

        return [
            'success' => true
        ];
    }

    private function createAccountModal($user, $provider, $token)
    {
        $customerRegistration = (new \Tatum\Model\CustomerRegistration())
            ->setAccountingCurrency($provider->accounting_currency ?? 'USD')
            ->setCustomerCountry($user->client_country ?? 'US')
            ->setExternalId("$user->id")
            ->setProviderCountry($provider->provider_country ?? 'US');

        $createAccountModal = (new \Tatum\Model\CreateAccount())
            ->setCurrency($token['symbol'] . ($token['postfix'] ?? ''))
            ->setCustomer($customerRegistration)
            ->setAccountCode("AC_$user->id")
            ->setAccountingCurrency($user->accounting_currency ?? 'USD')
            ->setAccountNumber("$user->id");

        return $createAccountModal;
    }

    private function generateAddress($masterWallet, $index, $chain)
    {
        $payload = [
            "chain" => $chain,
            "owner" => $masterWallet->address,
            "from" => $index,
            "to" => $index,
        ];

        $gas_pumps = $this->api->gasPump()->precalculateGasPumpAddresses($payload);

        if (!empty($gas_pumps) && isset($gas_pumps[0])) {
            return $gas_pumps[0];
        } else {
            return false;
        }
    }

    public function transfer($sender_account_id, $target_account_id, $amount)
    {
        $createTransaction = (new \Tatum\Model\CreateTransaction())
            ->setSenderAccountId($sender_account_id)
            ->setRecipientAccountId($target_account_id)
            ->setAmount($amount);

        try {
            // Send the transaction
            $response = $this->api
                ->transaction()
                ->sendTransaction($createTransaction);
            return $response;
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            return [
                'success' => false,
                'message' => $apiExc->getMessage()
            ];
        } catch (\Exception $exc) {
            return [
                'success' => false,
                'message' => $exc->getMessage()
            ];
        }
    }


    public function transferFunds(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'target_wallet' => 'required|in:trading,funding',
            'currency' => 'required|string',
            'chain' => 'required|string',
        ]);

        $user = Auth::user();
        $target_wallet_provider = $request->target_wallet;

        $from = EcoWallet::where('user_id', $user->id)->where('chain', $request->chain)->where('currency', $request->currency)->first();
        if ($target_wallet_provider == 'funding') {
            $to = Wallet::where('user_id', $user->id)->where('symbol', $request->currency)->where('type', $target_wallet_provider)->first();
        } else {
            $walletController = new ControllersWalletController();
            $to = Wallet::where('user_id', $user->id)->where('symbol', $request->currency)->where('type', $target_wallet_provider)->where('provider', $walletController->provider)->first();
        }

        if (!$to) {
            return response()->json([
                'type' => 'error',
                'message' => 'Target wallet not found'
            ]);
        }

        if ($request->amount > $from->balance) {
            return response()->json([
                'type' => 'error',
                'message' => 'Amount is higher than your wallet balance'
            ]);
        }

        $fees_account = EcoFeesAccount::where('chain', $from->chain)->where('symbol', $request->currency)->first();
        $result = $this->transfer($from->account_id, $fees_account->account_id, $request->amount);
        if (isset($result['success']) && $result['success'] == false) {
            return response()->json([
                'type' => 'error',
                'message' => $result['message']
            ]);
        }

        $transfer = new Transaction();
        $transfer->user_id = $user->id;
        $transfer->amount = getAmount($request->amount);
        $transfer->post_balance = getAmount($request->balance);
        $transfer->charge = 0;
        $transfer->trx_type = '-';
        $transfer->details = 'Transfer of ' . $request->amount . ' ' . $request->currency . ' from primary to ' . $target_wallet_provider . ' wallet';
        $transfer->trx = $result->getReference();
        $transfer->txHash = $result->getReference();
        $transfer->save();
        $transfer->clearCache();

        $wallet_new_trx = new WalletsTransactions();
        $wallet_new_trx->user_id = $transfer->user_id;
        $wallet_new_trx->symbol = $request->currency;
        $wallet_new_trx->chain = $request->chain;
        $wallet_new_trx->amount = $transfer->amount;
        $wallet_new_trx->amount_recieved = $transfer->amount;
        $wallet_new_trx->charge = 0;
        $wallet_new_trx->to = $to->address;
        $wallet_new_trx->type = $target_wallet_provider == 'trading' ? 5 : 6;
        $wallet_new_trx->status = $target_wallet_provider == 'trading' ? 2 : 1;
        $wallet_new_trx->trx = $transfer->trx;
        $wallet_new_trx->wallet_type = $target_wallet_provider;
        $wallet_new_trx->details = 'Transfer of ' . $request->amount . ' ' . $request->currency . ' from primary to ' . $target_wallet_provider . ' wallet';
        $wallet_new_trx->save();
        $wallet_new_trx->clearCache();

        $from->balance -= $request->amount;
        $from->save();
        $to->balance += $request->amount;
        $to->save();

        return response()->json([
            'type' => 'success',
            'message' => 'Transfer Successful'
        ]);
    }
}
