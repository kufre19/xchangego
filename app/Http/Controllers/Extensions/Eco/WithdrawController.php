<?php

namespace App\Http\Controllers\Extensions\Eco;

use App\Http\Controllers\Admin\Extensions\Eco\MasterWalletController;
use App\Http\Controllers\Admin\Extensions\Eco\RpcController;
use App\Http\Controllers\Controller;
use App\Models\Eco\EcoLog;
use App\Models\Eco\EcoRealWallets;
use App\Models\Eco\EcoTokens;
use App\Models\Eco\EcoUTXO;
use App\Models\Eco\EcoUTXOWallet;
use App\Models\Eco\EcoWallet;
use App\Models\Eco\EcoWithdraw;
use App\Models\Tokens;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tatum\Model\BtcTransactionFromUTXO;
use Tatum\Model\DogeTransactionUTXO;
use Tatum\Model\LtcTransactionUTXO;
use Tatum\Sdk;

class WithdrawController extends Controller
{
    const WITHDRAWAL_CHAINS = ["ETH", "BSC", "MATIC", "KLAY", "CELO", "XDC", "ONE", "TRON", "BTC", "DOGE", "LTC", "ADA", "SOL"];
    const GAS_PUMP_CHAINS = ["ETH", "BSC", "MATIC", "KLAY", "CELO", "XDC", "ONE", "TRON"];
    const ESTIMATE_FEE_CHAINS = ["ETH", "BSC", "MATIC", "KLAY", "CELO", "XDC", "ONE"];
    const UTXO_CHAINS = ["BTC", "DOGE", "LTC", "ADA"];
    const PRIVATE_CHAINS = ["SOL"];
    const MAX_RETRIES = 3;
    const MAX_VERIFICATIONS = 3;
    const DEFAULT_FEE_RATE = 1;



    private $eco;
    protected $api;
    private $net;
    private $rpc;
    private $master;

    public function __construct()
    {
        $this->eco = new Sdk();
        $this->rpc = new RpcController();
        $this->master = new MasterWalletController();
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

    public function refreshBalance($wallet)
    {
        $rpc = new RpcController();
        $free_balance = $rpc->getTokenBalance($wallet);
        if ($free_balance != null) {
            $wallet->free_balance = $free_balance;
        } else {
        }
        if ($wallet->account_id != null) {
            try {
                $wallet->balance = $rpc->getWalletBalance($wallet->account_id);
                $wallet->save();
            } catch (\Throwable $th) {
                //throw $th;
            }
        }
        $wallet->save();
    }

    /**
     * Process a withdrawal request for a user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function withdraw(Request $request)
    {
        // Validate input data
        $request->validate([
            'chain' => 'required|string',
            'symbol' => 'required|string',
            'amount' => 'required|numeric|min:0',
            'withdraw_address' => 'required|string',
            'token' => 'string',
        ]);

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

        $client_wallet = getClientWallet($request->chain, $user->id, $request->symbol, $this->net);

        if (!in_array($client_wallet->chain, self::WITHDRAWAL_CHAINS)) {
            return responseJson('error', 'Chain does not support withdrawal yet.');
        }
        $client_wallet = $this->updateClientWalletBalance($client_wallet);

        $token = getToken($request->symbol, $client_wallet->chain);

        if (!$token) {
            return responseJson('error', 'Token not found');
        }

        $token->type = $token instanceof EcoTokens ? 0 : $token->type;
        if ($token->withdraw_fee !== null && $token->withdraw_fee > 0) {
            $fee = $request->amount * $token->withdraw_fee / 100;
            $feed = $request->amount + $fee;
        } else {
            $fee = 0;
            $feed = $request->amount;
        }

        if ($client_wallet->balance < $feed) {
            return responseJson('error', 'Insufficient balance for withdrawal');
        }

        $ecoFeesAccount = getEcoFeesAccount($client_wallet->chain, $token->symbol, $this->net);

        if (!$ecoFeesAccount) {
            createAdminNotification(
                $user->id,
                $request->chain . ' fees account not found.',
                route('admin.eco.blockchain.wallet.index', $request->chain)
            );
            return responseJson('error', 'Failed to withdraw, Please contact support. Error code: FA-404');
        }

        if (in_array($request->chain, self::UTXO_CHAINS)) {
            $utxoWallet = EcoUTXOWallet::where('chain', $request->chain)->first();
            if (!$utxoWallet) {
                createAdminNotification(
                    $user->id,
                    $request->chain . ' UTXO wallet not found.',
                    route('admin.eco.blockchain.utxo.index', $request->chain)
                );
                return responseJson('error', 'Failed to withdraw, Please contact support. Error code: UW-404');
            }
            return $this->utxoWithdraw($request, $client_wallet, $fee, $feed, $utxoWallet);
        }

        $this->refreshBalance($client_wallet);

        // Get the master wallet that has the lowest balance but can still cover the withdrawal amount
        $wallet = $client_wallet->free_balance > $feed ? $client_wallet : EcoWallet::where('chain', $client_wallet->chain)
            ->where('symbol', $client_wallet->symbol)
            ->where('status', 1)
            ->where('network', $client_wallet->network)
            ->where('free_balance', '>=', $request->amount + $token->withdraw_fee)
            ->orderBy('free_balance', 'asc')
            ->first();

        if (!$wallet) {
            createAdminNotification(
                $user->id,
                $request->chain . ' addresses free balance is insufficient for withdrawal.',
                route('admin.eco.blockchain.wallet.index', $request->chain)
            );
            return responseJson('error', 'Insufficient balance for withdrawal, Please contact support. Error code: FB-001');
        }

        if ($request->chain == 'SOL') {
            $masterWallet = getClientWallet($request->chain, $user->id, $request->chain, $this->net);
            $estimatedFee = $this->getSolanaFee();

            if ($client_wallet->free_balance === null || $client_wallet->free_balance < $estimatedFee + $feed) {
                createAdminNotification(
                    $user->id,
                    $request->chain . ' master wallet does not have sufficient balance to cover the withdrawal fees.',
                    route('admin.eco.blockchain.wallet.index', $request->chain)
                );
                return responseJson('error', 'Withdrawal failed, Please contact support. Error code: WF-001');
            }
        } else {
            // Get the real wallet
            $masterWallet = EcoRealWallets::where('chain', $wallet->chain)->first();
            if (!$masterWallet) {
                createAdminNotification(
                    $user->id,
                    $request->chain . ' master wallet don\'t exists.',
                    route('admin.eco.blockchain.wallet.index', $request->chain)
                );
                return responseJson('error', 'Withdrawal failed, Please contact support. Error code: MW-404');
            }

            // Get the real wallet balance
            $masterWallet_balance = $this->master->getBalance($masterWallet->chain, $masterWallet->address);

            // Call the EstimateFee function to get the estimated fee
            if (in_array($client_wallet->chain, self::ESTIMATE_FEE_CHAINS)) {
                $estimatedFee = $this->EstimateFee(
                    $client_wallet->chain,
                    $client_wallet->address,
                    $request->withdraw_address,
                    $masterWallet->address,
                    $token->type,
                    $request->amount,
                    $token
                );
            } else if ($client_wallet->chain == 'TRON') {
                $estimatedFee = $this->estimateTronFee($masterWallet->address);
            } else {
                $estimatedFee = 0;
            }

            if ($masterWallet_balance === null || $masterWallet_balance < $estimatedFee) {
                createAdminNotification(
                    $user->id,
                    $request->chain . ' master wallet does not have sufficient balance to cover the withdrawal fees.',
                    route('admin.eco.blockchain.wallet.index', $request->chain)
                );
                return responseJson('error', 'Withdrawal failed, Please contact support. Error code: WF-001');
            }
        }

        $withdraw = $this->storeWithdrawTransaction($client_wallet->account_id, $request->withdraw_address, $request->amount, $fee);

        return $this->handleWithdraw($client_wallet, $token, $wallet, $masterWallet, $withdraw, $request, $ecoFeesAccount->account_id, $fee);
    }

    public function updateClientWalletBalance($client_wallet)
    {
        $balance = $this->rpc->getClientWalletBalance($client_wallet->id);
        if ($balance !== null) {
            $client_wallet->free_balance = $balance;
            $client_wallet->save();
        }

        return $client_wallet;
    }

    public function estimateFee(
        string $chain,
        string $sender,
        string $recipient,
        string $custodialAddress,
        int $tokenType,
        float $amount,
        object $token
    ) {
        $supportedChains = ['ETH', 'BSC', 'MATIC', 'CELO', 'KLAY'];

        $estimateFeeModel = null;
        $estimateFeeTransferFromCustodial = null;

        if (in_array($chain, $supportedChains)) {
            $className = $chain === 'MATIC'
                ? '\\Tatum\\Model\\PolygonEstimateGas'
                : sprintf('\\Tatum\\Model\\%sEstimateGas', ucfirst(strtolower($chain)));

            if ($chain === 'ETH' || $chain === 'BSC') {
                $className = '\\Tatum\\Model\\EthEstimateGas';
            }
            if ($chain === 'KLAY') {
                $className = '\\Tatum\\Model\\klaytnEstimateGas';
            }
            $estimateFeeModel = new $className();
        } else {
            $estimateFeeTransferFromCustodial = new \Tatum\Model\EstimateFeeTransferFromCustodial();
        }

        if ($estimateFeeModel) {
            $estimateFeeModel
                ->setFrom($sender)
                ->setTo($recipient)
                ->setAmount((string)$amount);

            if (!in_array($chain, ['MATIC', 'KLAY'])) {
                $estimateFeeModel->setContractAddress($token->address);
            }
        } else {
            $estimateFeeTransferFromCustodial
                ->setChain($chain)
                ->setType('TRANSFER_CUSTODIAL')
                ->setSender($sender)
                ->setRecipient($recipient)
                ->setCustodialAddress($custodialAddress)
                ->setTokenType($tokenType)
                ->setAmount((string)$amount);

            if ($tokenType === 0) {
                $estimateFeeTransferFromCustodial->setContractAddress($token->address);
            }
        }

        try {
            if ($estimateFeeModel) {
                if ($chain === 'MATIC') {
                    $response = $this->api->blockchainFees()->polygonEstimateGas($estimateFeeModel);
                } else if ($chain === 'KLAY') {
                    $response = $this->api->blockchainFees()->klaytnEstimateGas($estimateFeeModel);
                } else {
                    $methodName = strtolower($chain) . 'EstimateGas';
                    $response = $this->api->blockchainFees()->$methodName($estimateFeeModel);
                }
            } else {
                $response = $this->api->blockchainFees()->estimateFeeTransferFromCustodial($estimateFeeTransferFromCustodial);
            }
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            $responseObj = $apiExc->getResponseObject();
            $errorMessage = is_array($responseObj) && isset($responseObj['message']) ? $responseObj['message'] : 'An unknown error occurred';
            responseJson('error', $errorMessage);
        } catch (\Exception $exc) {
            return responseJson('error', $exc->getMessage());
        }

        $gasPriceInGwei = floatval($response->getGasPrice());
        $gasLimit = floatval($response->getGasLimit());

        // Define token symbols and conversion rates from Gwei
        $conversionRates = [
            'ETH' => 1000000000000000000,
            'BSC' => 1000000000000000000,
            'BNB' => 1000000000000000000,
            'MATIC' => 1000000000000000000,
            'CELO' => 1000000000000000000,
            'KLAY' => 1000000000000000000
        ];

        // Calculate gas fee in token
        $conversionRate = $conversionRates[$chain];
        $gasFee = $gasPriceInGwei * $gasLimit / $conversionRate;

        return $gasFee;
    }

    function getSolanaFee()
    {
        $solanaRpcUrl = "https://api.mainnet-beta.solana.com";
        $method = "getRecentBlockhash";
        $params = [];

        $payload = json_encode([
            "jsonrpc" => "2.0",
            "id" => 1,
            "method" => $method,
            "params" => $params
        ]);

        $ch = curl_init($solanaRpcUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

        $response = curl_exec($ch);
        curl_close($ch);

        $responseObj = json_decode($response, true);
        $feeCalculator = $responseObj["result"]["value"]["feeCalculator"];
        $feeLamports = $feeCalculator["lamportsPerSignature"];

        // Convert lamports to SOL
        $feeSol = $feeLamports / 1000000000;

        return $feeSol;
    }

    function estimateTronFee($address)
    {
        $apiUrl = "https://api.trongrid.io/v1/accounts/$address";

        // Fetch the account information
        $response = file_get_contents($apiUrl);
        $data = json_decode($response, true);

        $freeAssetNetUsage = $data['data'][0]['free_asset_net_usageV2'][0]['value'];

        // Assuming an average transaction size of 250 bytes
        $transactionSize = 250;

        // Calculate the bandwidth cost
        $bandwidthCost = $transactionSize;

        // If the cost exceeds the available bandwidth, calculate the cost in TRX
        if ($bandwidthCost > $freeAssetNetUsage) {
            $costInTRX = ($bandwidthCost - $freeAssetNetUsage) * 10 / 1000000; // convert SUN to TRX
        } else {
            $costInTRX = 0;
        }

        return $costInTRX;
    }

    function handleWithdraw($client_wallet, $token, $wallet, $masterWallet, $withdraw, $request, $ecoFeesAccountId, $fee)
    {
        if (!isset($withdraw->errorCode)) {
            // Transfer the funds
            $transferData = $this->createTransferData($token, $wallet, $masterWallet, $request);

            try {
                if ($request->chain === 'SOL') {
                    if ($request->symbol === 'SOL') {
                        $transfer = $this->api->solana()->transferSolanaBlockchain($transferData);
                    } else {
                        $transfer = $this->api->fungibleTokensERC20OrCompatible()->chainTransferSolanaSpl($transferData);
                    }
                } else {
                    $transfer = $this->api->gasPump()->transferCustodialWallet($transferData);
                }
            } catch (\Tatum\Sdk\ApiException $apiExc) {
                $responseObj = $apiExc->getResponseObject();
                $errorMessage = is_array($responseObj) && isset($responseObj['message']) ? $responseObj['message'] : 'An unknown error occurred';
                responseJson('error', $errorMessage);
            } catch (\Exception $exc) {
                createAdminNotification('1', 'Transfer failed', 'Transfer failed for user ' . $client_wallet->user->name . ' (' . $client_wallet->user->email . '). Please check the logs for more details.', '#');
                $this->cancelWithdraw($withdraw->getId());
                return responseJson('error', 'Transfer failed. Please try again later.');
            }


            // Check if the transfer was successful
            if ($transfer->getTxId() != null) {
                if ($token->withdraw_fee != 0) {
                    if ($this->processFees($ecoFeesAccountId, $client_wallet, $transfer, $fee)) {
                        $withdraw_fee = $token->withdraw_fee;
                    } else {
                        // Cancel the withdrawal due to fee processing failure
                        $this->cancelWithdraw($withdraw->getId());

                        return responseJson('error', 'Fee processing failed. Please try again later.');
                    }
                } else {
                    $withdraw_fee = 0;
                }

                // Create and save the withdrawal log after fees are processed
                createEcoLog($client_wallet, $request->amount, $withdraw_fee, $withdraw->getId(), $transfer->getTxId(), 2);

                // Complete the withdrawal
                try {
                    $this->api->withdrawal()->completeWithdrawal($withdraw->getId(), $transfer->getTxId());
                } catch (\Tatum\Sdk\ApiException $apiExc) {
                    $responseObj = $apiExc->getResponseObject();
                    $errorMessage = is_array($responseObj) && isset($responseObj['message']) ? $responseObj['message'] : 'An unknown error occurred';
                    responseJson('error', $errorMessage);
                } catch (\Exception $exc) {
                    responseJson('error', $exc->getMessage());
                }

                createAdminNotification(
                    $client_wallet->user_id,
                    $request->amount . " " . $request->symbol . " withdraw is processing",
                    route('admin.eco.blockchain.wallet.index', $request->chain)
                );
                return responseJson('success', $request->amount . " " . $request->symbol . " withdraw is processing");
            } else {
                // Cancel the withdrawal due to transfer failure
                $this->cancelWithdraw($withdraw->getId());

                return responseJson('error', 'Transfer failed. Please try again later.');
            }
        }

        return responseJson('error', $withdraw->message);
    }

    function processFees($ecoFeesAccountId, EcoWallet $client_wallet, $transfer, $fee)
    {
        $feeFormatted = number_format($fee, 8, '.', '');
        $feesData = (new \Tatum\Model\CreateTransaction())
            ->setSenderAccountId($client_wallet->account_id)
            ->setRecipientAccountId($ecoFeesAccountId)
            ->setAmount("$feeFormatted");

        try {
            $feesResult = $this->api->transaction()->sendTransaction($feesData);
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            return false;
        } catch (\Exception $exc) {
            return false;
        }



        if ($feesResult->getReference()) {
            try {
                createEcoFeesLog($client_wallet, $fee, $transfer->getTxId(), 2, $feesResult->getReference(), $transfer->getTxId(), 1);
            } catch (\Throwable $th) {
                return false;
            }
            return true;
        }
        return false;
    }


    public function cancelWithdraw($txId)
    {
        try {
            $this->api->withdrawal()->cancelInProgressWithdrawal($txId, false);
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            return responseJson('error', 'API Exception when cancelling withdrawal: ' . var_export($apiExc->getResponseObject(), true));
        } catch (\Exception $exc) {
            return responseJson('error', 'Exception when cancelling withdrawal: ' . $exc->getMessage());
        }
    }

    function createTransferData($token, $wallet, $masterWallet, $request)
    {

        if ($wallet->chain === 'TRON') {
            $transferData = new \Tatum\Model\TransferCustodialWalletTron();
            $transferData
                ->setChain($wallet->chain)
                ->setCustodialAddress($wallet->address)
                ->setRecipient($request->withdraw_address)
                ->setContractType($token->type)
                ->setTokenAddress($token->address)
                ->setAmount("$request->amount")
                ->setFromPrivateKey(isEncrypted($masterWallet->private_key) ? decrypt($masterWallet->private_key) : $masterWallet->private_key)
                ->setFeeLimit(60);
        } elseif ($wallet->chain === 'CELO') {
            $transferData = new \Tatum\Model\TransferCustodialWalletCelo();
            $transferData
                ->setChain($wallet->chain)
                ->setCustodialAddress($wallet->address)
                ->setRecipient($request->withdraw_address)
                ->setContractType($token->type)
                ->setTokenAddress($token->address)
                ->setAmount("$request->amount")
                ->setFromPrivateKey(isEncrypted($masterWallet->private_key) ? decrypt($masterWallet->private_key) : $masterWallet->private_key)
                ->setFeeCurrency('CELO');
        } elseif ($wallet->chain === 'SOL') {
            if ($wallet->symbol === 'SOL') {
                $transferData = new \Tatum\Model\TransferSolanaBlockchain();
                $transferData
                    ->setFrom($wallet->address)
                    ->setTo($request->withdraw_address)
                    ->setAmount("$request->amount")
                    ->setFromPrivateKey(isEncrypted($masterWallet->private_key) ? decrypt($masterWallet->private_key) : $masterWallet->private_key)
                    ->setFeePayer($masterWallet->address)
                    ->setFeePayerPrivateKey(isEncrypted($masterWallet->private_key) ? decrypt($masterWallet->private_key) : $masterWallet->private_key);
            } else {
                $transferData = (new \Tatum\Model\ChainTransferSolanaSpl())
                    ->setChain('SOL')
                    ->setFrom($wallet->address)
                    ->setTo($request->withdraw_address)
                    ->setContractAddress($token->address)
                    ->setAmount("$request->amount")
                    ->setDigits($token->decimals)
                    ->setFromPrivateKey(isEncrypted($masterWallet->private_key) ? decrypt($masterWallet->private_key) : $masterWallet->private_key)
                    ->setFeePayer($masterWallet->address)
                    ->setFeePayerPrivateKey(isEncrypted($masterWallet->private_key) ? decrypt($masterWallet->private_key) : $masterWallet->private_key);
            }
        } else {
            $transferData = new \Tatum\Model\TransferCustodialWallet();
            $transferData
                ->setChain($wallet->chain)
                ->setCustodialAddress($wallet->address)
                ->setRecipient($request->withdraw_address)
                ->setContractType($token->type)
                ->setTokenAddress($token->address)
                ->setAmount("$request->amount")
                ->setFromPrivateKey(isEncrypted($masterWallet->private_key) ? decrypt($masterWallet->private_key) : $masterWallet->private_key);
        }

        return $transferData;
    }

    public function utxoWithdraw($request, $wallet, $fee, $amountNeeded, $utxoWallet)
    {
        switch ($request->chain) {
            case 'BTC':
                $fee = $fee < 0.00001 ? 0.00001 : $fee;
                break;
            case 'LTC':
                $fee = $fee < 0.0001 ? 0.0001 : $fee;
                break;
            case 'DOGE':
                $fee = $fee < 1 ? 1 : $fee;
                break;
        }

        // Step 1: Store withdrawal information
        $withdrawal = $this->storeWithdrawalInfo($wallet->user_id, $request->chain, $request->chain, $wallet->account_id, $wallet->id, $wallet->address, $request->withdraw_address, $request->amount, $fee, 'requested');

        // Step 2: Check the Virtual Account balance or UTXO balance
        try {
            (new WalletController)->fetchUTXO($utxoWallet);
        } catch (\Throwable $th) {
            //throw $th;
        }
        $balanceCheckResult = $this->checkUTXOBalance($withdrawal, $request->amount, $fee, $amountNeeded);
        if (isset($balanceCheckResult['type']) && $balanceCheckResult['type'] == 'error') {
            $withdrawal->delete();
            return $balanceCheckResult;
        }

        // Step 3: Decrease the amount and fees from the Virtual Account
        $processVA = $this->decreaseVirtualAccountBalance($withdrawal);
        if (isset($processVA['type']) && $processVA['type'] == 'error') {
            return $processVA;
        }

        // Steps 4 and 5: Prepare the transaction and perform the blockchain transfer
        $transactionResult = $this->prepareAndPerformTransaction($withdrawal, $balanceCheckResult['fromUtxo'], $utxoWallet);
        if (isset($transactionResult['type']) && $transactionResult['type'] == 'error') {
            return $transactionResult;
        }

        // Step 6: Update the withdrawal status to completed
        createEcoLog($wallet, $request->amount, $withdrawal->fee, $withdrawal->withdraw_id, $withdrawal->tx_id, 2, 0);

        return [
            'type' => 'success',
            'message' => 'Withdrawal request has been successfully processed.',
        ];
    }

    // STEP 1: Implement the following methods based on your application's requirements:
    private function storeWithdrawalInfo($userId, $symbol, $chain, $accountId, $walletId, $clientAddress, $to, $amount, $fee, $status)
    {
        return EcoWithdraw::create([
            'user_id' => $userId,
            'symbol' => $symbol,
            'chain' => $chain,
            'account_id' => $accountId,
            'wallet_id' => $walletId,
            'address' => $clientAddress,
            'to' => $to,
            'amount' => $amount,
            'fee' => $fee,
            'status' => $status,
        ]);
    }

    // STEP 2: get the UTXOs for the client address
    private function checkUTXOBalance($withdrawal, $amount, $fee, $amountNeeded)
    {
        $amountNeeded = $amount + ($amount * $fee);
        $utxos = EcoUTXO::with(['wallet', 'utxoWallet'])->where('chain', $withdrawal->chain)->where('status', 'unspent')->get();
        if ($utxos->sum('value') < $amountNeeded) {
            return ['type' => 'error', 'message' => 'Withdrawal failed. Please contact support. Error code: 403', 'step' => 'checkUTXOBalance'];
        }

        // Calculate required UTXOs and the total balance
        list($fromUtxo, $totalBalance) = $this->calculateRequiredUtxos($utxos, $amountNeeded);

        if ($totalBalance < $amountNeeded) {
            return ['type' => 'error', 'message' => 'Insufficient balance.', 'step' => 'checkUTXOBalance'];
        }

        $this->updateWithdrawStatus($withdrawal, 'processing');

        return ['type' => 'success', 'fromUtxo' => $fromUtxo];
    }

    private function calculateRequiredUtxos($utxos, $amount)
    {
        $fromUtxo = [];
        $totalBalance = 0;
        foreach ($utxos as $utxo) {
            $query = $this->checkUTXO($utxo);
            if (isset($query['type']) && $query['type'] == 'success') {
                $totalBalance += $utxo->value;

                $fromUtxo[] = [
                    'txHash' => $utxo->txHash,
                    'value' => $utxo->value,
                    'address' => $utxo->type == 'utxo' ? $utxo->utxoWallet->address : $utxo->wallet->address,
                    'index' => $utxo->index,
                    'privateKey' => $utxo->type == 'utxo' ? (isEncrypted($utxo->utxoWallet->private_key) ? decrypt($utxo->utxoWallet->private_key) : $utxo->utxoWallet->private_key) : ($utxo->wallet->activation_trx ??  (isEncrypted($utxo->wallet->private_key) ? decrypt($utxo->wallet->private_key) : $utxo->wallet->private_key)),
                ];

                if ($totalBalance >= $amount) {
                    break;
                }
            }
        }

        return [$fromUtxo, $totalBalance];
    }

    private function checkUTXO($utxo)
    {
        try {
            switch ($utxo->chain) {
                case 'BTC':
                    $transaction = $this->api->bitcoin()->btcGetUTXO($utxo->txHash, $utxo->index);
                    if ($transaction->getAddress()) {
                        return ['type' => 'success', 'message' => 'UTXO is unspent.'];
                    }
                    break;
                case 'LTC':
                    $transaction = $this->api->litecoin()->ltcGetUTXO($utxo->txHash, $utxo->index);
                    if ($transaction->getAddress()) {
                        return ['type' => 'success', 'message' => 'UTXO is unspent.'];
                    }
                    break;
                case 'DOGE':
                    $transaction = $this->api->dogecoin()->dogeGetUTXO($utxo->txHash, $utxo->index);
                    foreach ($transaction->getScriptPubKey()->getAddresses() as $input) {
                        if ($input == $utxo->wallet->address) {
                            return ['type' => 'success', 'message' => 'UTXO is unspent.'];
                        }
                    }
                    break;
            }

            $utxo->status = 'spent';
            $utxo->save();
            return ['type' => 'error', 'message' => 'UTXO is spent.', 'step' => 'checkUTXO'];
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            return ['type' => 'error', 'message' => $apiExc->getResponseObject(), 'step' => 'checkUTXO'];
        } catch (\Exception $exc) {
            return ['type' => 'error', 'message' => $exc->getMessage(), 'step' => 'checkUTXO'];
        }
    }

    // STEP 3: Decrease the amount and fees from the Virtual Account
    private function decreaseVirtualAccountBalance($withdrawal)
    {
        $result = $this->storeWithdrawTransaction($withdrawal->account_id, $withdrawal->to, $withdrawal->amount, $withdrawal->fee);
        if (isset($result['type']) && $result['type'] == 'error') {
            return $result;
        }
        $this->updateWithdrawStatus($withdrawal, 'transaction_prepared');
        $withdrawal->withdraw_id = $result->getId();
        $withdrawal->save();

        return ['type' => 'success', 'message' => 'Transaction prepared.', 'result' => $result];
    }

    // STEP 4: Prepare the transaction and perform the blockchain transfer
    private function prepareAndPerformTransaction($withdrawal, $fromUtxo, $utxoWallet)
    {
        $masterWallet = EcoRealWallets::where('chain', $withdrawal->chain)->first();
        if (!$masterWallet) {
            return ['type' => 'error', 'message' => 'Master wallet not found.', 'step' => 'prepareAndPerformTransaction'];
        }

        try {
            $estimatedFee = $this->estimateBroadcastFee($withdrawal->chain, $fromUtxo);
        } catch (\Throwable $th) {
            return ['type' => 'error', 'message' => $th->getMessage(), 'step' => 'prepareAndPerformTransaction'];
        }
        $toAmount = floatval(bcdiv(strval($withdrawal->amount), '1', 8));
        $toFee = floatval(bcdiv(strval($withdrawal->fee), '1', 8));

        $query = null;
        switch ($withdrawal->chain) {
            case 'BTC':
                $estimatedFee = $estimatedFee;
                $query = (new BtcTransactionFromUTXO());
                break;
            case 'DOGE':
                $estimatedFee = $estimatedFee;
                $query = (new DogeTransactionUTXO());
                break;
            case 'LTC':
                $estimatedFee = $estimatedFee < $withdrawal->fee ? $withdrawal->fee : $estimatedFee;
                $query = (new LtcTransactionUTXO());
                break;
            default:
                throw new \Exception("Unsupported chain: {$withdrawal->chain}");
        }

        $query->setFromUtxo($fromUtxo)
            ->setTo([
                ['address' => $withdrawal->to, 'value' => $toAmount],
                ['address' => $masterWallet->address, 'value' => $toFee],
            ])
            ->setFee(sprintf('%.8f', $estimatedFee))
            ->setChangeAddress($utxoWallet->address);

        try {
            // Perform the withdrawal
            $transaction = null;
            switch ($withdrawal->chain) {
                case 'BTC':
                    $transaction = $this->api->bitcoin()->btcTransactionFromUTXO($query);
                    break;
                case 'DOGE':
                    $transaction = $this->api->dogecoin()->dogeTransactionUTXO($query);
                    break;
                case 'LTC':
                    $transaction = $this->api->litecoin()->ltcTransactionUTXO($query);
                    break;
                default:
                    throw new \Exception("Unsupported chain: {$withdrawal->chain}");
            }

            $this->updateWithdrawStatus($withdrawal, 'transaction_performed');
            $withdrawal->tx_id = $transaction->getTxId();
            $withdrawal->save();

            foreach ($fromUtxo as $utxo) {
                EcoUTXO::where('txHash', $utxo['txHash'])->update(['status' => 'spent']);
            }

            // Return the transaction information
            return ['type' => 'success', 'message' => 'Transaction successful.'];
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            $this->cancelWithdraw($withdrawal->withdraw_id);
            $withdrawal->delete();
            return ['type' => 'error', 'message' => $apiExc->getResponseObject()['message'], 'step' => 'prepareAndPerformTransaction'];
        } catch (\Exception $exc) {
            $this->cancelWithdraw($withdrawal->withdraw_id);
            $withdrawal->delete();
            return ['type' => 'error', 'message' => $exc->getMessage(), 'step' => 'prepareAndPerformTransaction'];
        }
    }

    public function storeWithdrawTransaction($account_id, $withdraw_address, $amount, $fee)
    {
        // Build the Withdrawal object with the necessary properties
        $feeFormatted = number_format($fee, 8, '.', '');
        $arg_withdrawal = (new \Tatum\Model\Withdrawal())
            ->setSenderAccountId($account_id)
            ->setAddress($withdraw_address)
            ->setAmount("$amount")
            ->setFee("$feeFormatted");

        try {
            // Call the storeWithdrawal method with the Withdrawal object
            return $this->api
                ->withdrawal()
                ->storeWithdrawal($arg_withdrawal);
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            return ['type' => 'error', 'message' => $apiExc->getResponseObject()['message'], 'step' => 'storeWithdrawTransaction'];
        } catch (\Exception $exc) {
            return ['type' => 'error', 'message' => $exc->getMessage(), 'step' => 'storeWithdrawTransaction'];
        }
    }

    // Verify the transaction and complete the withdrawal or rollback the transaction
    public function verifyTransfers()
    {
        $withdrawals = EcoWithdraw::where('status', 'transaction_performed')->where('withdraw_id', '!=', null)->get();
        $currentTime = Carbon::now();

        foreach ($withdrawals as $withdrawal) {
            if ($currentTime->diffInHours($withdrawal->created_at) >= 24) {
                $this->rollbackTransaction($withdrawal);
                continue;
            }

            $log = EcoLog::where('ref_id', $withdrawal->withdraw_id)->first();
            $result = $this->verifyTransferResult($withdrawal);
            if (!isset($result['type']) || $result['type'] === 'error') {
                $log->status = 2;
                $log->save();
                $this->rollbackTransaction($withdrawal);
                continue;
            }

            $token = getToken($withdrawal->symbol, $withdrawal->chain);

            if (!$token) {
                continue;
            }

            $log->status = 1;
            $log->save();
            $this->completeTransaction($withdrawal);
        }

        $this->refreshUTXOWallet();

        cronLastRun('utxo_verify_transaction');
    }

    public function refreshUTXOWallet()
    {
        $wallets = EcoUTXOWallet::get();
        if ($wallets) {
            foreach ($wallets as $wallet) {
                (new WalletController)->fetchUTXO($wallet, 'utxo');
            }
        }
    }


    // Verify the transfer result
    private function verifyTransferResult($withdrawal)
    {
        $apis = [
            'BTC' => 'https://api.blockcypher.com/v1/btc/main/txs/[tx_hash]',
            'DOGE' => 'https://api.blockcypher.com/v1/doge/main/txs/[tx_hash]',
            'LTC' => 'https://api.blockcypher.com/v1/ltc/main/txs/[tx_hash]'
        ];

        try {
            $url = str_replace('[tx_hash]', $withdrawal->tx_id, $apis[$withdrawal->chain]);
            $response = file_get_contents($url);
            $transaction = json_decode($response, true);

            switch ($withdrawal->chain) {
                case 'BTC':
                case 'LTC':
                    $confirmations = $transaction['confirmations'] > 0;
                    $fee = $transaction['fees'] / 1e8;
                    break;
                case 'DOGE':
                    $confirmations = $transaction['confirmations'] > 0;
                    $inputAmount = array_sum(array_map(function ($input) {
                        return $input['output_value'];
                    }, $transaction['inputs']));
                    $outputAmount = array_sum(array_map(function ($output) {
                        return $output['value'];
                    }, $transaction['outputs']));
                    $fee = ($inputAmount - $outputAmount) / 1e8;
                    break;
                default:
                    throw new Exception('Invalid blockchain type');
            }

            if ($confirmations) {
                $withdrawal->fee += $fee;
                $withdrawal->save();
                $this->updateWithdrawStatus($withdrawal, 'transaction_confirmed');
                return ['type' => 'success', 'message' => 'Transaction confirmed.'];
            } else {
                return ['type' => 'success', 'message' => 'Transaction is processing.'];
            }
        } catch (\Exception $exc) {
            return ['type' => 'error', 'message' => $exc->getMessage()];
        }
    }

    // Complete or rollback the transaction
    private function completeTransaction($withdrawal)
    {
        try {
            $this->api->withdrawal()->completeWithdrawal($withdrawal->withdraw_id, $withdrawal->tx_id);
        } catch (\Tatum\Sdk\ApiException $apiExc) {
            return ['type' => 'error', 'message' => $apiExc->getResponseObject()['message']];
        } catch (\Exception $exc) {
            return ['type' => 'error', 'message' => $exc->getMessage()];
        }

        createAdminNotification(
            $withdrawal->user_id,
            $withdrawal->amount . " " . $withdrawal->symbol . " withdraw is processing",
            route('admin.eco.blockchain.wallet.index', $withdrawal->chain)
        );
        $this->updateWithdrawStatus($withdrawal, 'completed');
    }

    private function rollbackTransaction($withdrawal)
    {
        $this->cancelWithdraw($withdrawal->withdraw_id);
        $this->updateWithdrawStatus($withdrawal, 'failed');
    }

    // update withdraw status
    private function updateWithdrawStatus($withdrawal, $status)
    {
        $withdrawal->status = $status;
        $withdrawal->save();
    }

    private function estimateBroadcastFee($chain, $utxos)
    {

        // Calculate the size of the inputs and outputs
        $inputSize = 148 * count($utxos); // 148 bytes per input
        $outputSize = 2 * 34; // 34 bytes per output (assuming 2 outputs: recipient and change)

        // Calculate the transaction size: base size (10 bytes) + input size + output size
        $transactionSize = 10 + $inputSize + $outputSize;

        // Calculate the transaction fee based on the estimated fee rate (in cryptocurrency units)
        if ($chain === 'ADA') {
            $fee = $this->calculateAdaFee($transactionSize, count($utxos), 2);
        } else {
            $estimatedFeeRate = $this->getEstimatedFeeRate($chain);
            $fee = $transactionSize * $estimatedFeeRate;
        }

        return $fee;
    }

    private function getEstimatedFeeRate($chain)
    {
        switch ($chain) {
            case 'BTC':
                $url = 'https://api.blockchair.com/bitcoin/stats';
                $key = 'suggested_transaction_fee_per_byte_sat';
                $response = $this->fetchData($url);
                $feeRate = $response['data'][$key] / 100000000; // Convert satoshis to BTC
                break;
            case 'DOGE':
                $url = 'https://api.blockchair.com/dogecoin/stats';
                $key = 'suggested_transaction_fee_per_byte_sat';
                $response = $this->fetchData($url);
                $feeRate = $response['data'][$key] / 100000000; // Convert satoshis to DOGE
                break;
            case 'LTC':
                $url = 'https://api.blockchair.com/litecoin/stats';
                $key = 'suggested_transaction_fee_per_byte_sat';
                $response = $this->fetchData($url);
                $feeRate = $response['data'][$key] / 100000000; // Convert litoshis to LTC
                break;
            default:
                return self::DEFAULT_FEE_RATE;
        }

        return $feeRate;
    }

    private function fetchData($url)
    {
        try {
            $response = file_get_contents($url);
            $data = json_decode($response, true);
            return $data;
        } catch (\Exception $e) {
            // In case of an error, throw an exception
            throw new \Exception("Failed to fetch data from API");
        }
    }
    private function fetchCardanoProtocolParameters()
    {
        $apiKey = 'mainnetLlkBDpRtZosdbSMPs93uLpVCq4zXUJJA';
        $url = 'https://cardano-mainnet.blockfrost.io/api/v0/epochs/latest/parameters';
        $options = [
            'http' => [
                'header' => "Content-type: application/json\r\n" .
                    "project_id: $apiKey\r\n",
                'method' => 'GET'
            ]
        ];
        $context = stream_context_create($options);
        $response = file_get_contents($url, false, $context);
        $data = json_decode($response, true);

        return $data;
    }

    private function calculateAdaFee($transactionSize, $numInputs, $numOutputs)
    {
        $protocolParameters = $this->fetchCardanoProtocolParameters();

        // Get the protocol parameters required for fee calculation
        $minUtxoValue = $protocolParameters['min_utxo_value'];
        $minFeeA = $protocolParameters['min_fee_a'];
        $minFeeB = $protocolParameters['min_fee_b'];

        // Convert lovelaces (the smallest unit of ADA) to ADA
        $minUtxoValueAda = $minUtxoValue / 1000000;
        $minFeeAAda = $minFeeA / 1000000;
        $minFeeBAda = $minFeeB / 1000000;

        // Cardano fee calculation formula
        $fee = $minFeeAAda + $minFeeBAda * $transactionSize;

        return $fee;
    }
}
