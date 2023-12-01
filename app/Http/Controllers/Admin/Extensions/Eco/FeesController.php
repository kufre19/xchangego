<?php

namespace App\Http\Controllers\Admin\Extensions\Eco;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Extensions\Eco\WithdrawController;
use App\Models\Eco\EcoFeesAccount;
use App\Models\Eco\EcoRealWallets;
use App\Models\Eco\EcoTokens;
use App\Models\Eco\EcoWallet;
use Illuminate\Http\Request;
use Tatum\Sdk;

class FeesController extends Controller
{
    protected $eco;
    protected $net;
    protected $api;
    protected $withdrawController;
    const SUPPORTED_CHAINS = ["BSC", "ETH", "KLAY", "ONE", "CELO", "MATIC", "SOL", "LTC", "BTC", "TRON"];
    const WITHDRAWAL_CHAINS = ["ETH", "BSC", "MATIC", "KLAY", "CELO", "XDC", "ONE", "TRON"];

    public function __construct()
    {
        $this->eco = new Sdk();
        $this->withdrawController = new WithdrawController();
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

    public function index($chain)
    {
        $page_title = $chain . ' Fees Accounts';
        return view('extensions.admin.eco.fees', compact('page_title', 'chain'));
    }

    public function withdraw(Request $request)
    {
        $fees_account = EcoFeesAccount::where('id', $request->id)->first();

        if (!in_array($fees_account->chain, self::WITHDRAWAL_CHAINS)) {
            return responseJson('error', 'Chain does not support withdrawal yet.');
        }

        $token = getFeeToken($fees_account->symbol, $fees_account->postfix, $fees_account->chain);

        if (!$token) {
            return responseJson('error', 'Token not found');
        }

        $token->type = $token instanceof EcoTokens ? 0 : $token->type;

        if ($fees_account->balance < $request->amount) {
            return responseJson('error', 'Insufficient balance for withdrawal');
        }

        // Get the master wallet that has the lowest balance but can still cover the withdrawal amount
        $wallet = EcoWallet::where('chain', $fees_account->chain)
            ->where('symbol', $fees_account->symbol . $fees_account->postfix)
            ->where('status', 1)
            ->where('network', $fees_account->network)
            ->where('free_balance', '>=', $request->amount)
            ->orderBy('free_balance', 'asc')
            ->first();

        if (!$wallet) {
            return responseJson('error', 'Insufficient free balance for withdrawal, Please try again later.');
        }

        // Get the real wallet
        $masterWallet = EcoRealWallets::where('chain', $wallet->chain)->first();
        if (!$masterWallet) {
            return responseJson('error', $fees_account->chain . ' master wallet don\'t exists.');
        }

        $withdraw = $this->withdrawController->storeWithdrawTransaction($fees_account->account_id, $request->address, $request->amount, 0);

        return $this->handleWithdraw($fees_account, $token, $wallet, $masterWallet, $withdraw, $request->amount, $request->address);
    }

    function handleWithdraw($fees_account, $token, $wallet, $masterWallet, $withdraw, $amount, $address)
    {
        if (!isset($withdraw->errorCode)) {
            // Transfer the funds
            $transferData = $this->createTransferData($token, $wallet, $masterWallet, $amount, $address);

            try {
                $transfer = $this->api->gasPump()->transferCustodialWallet($transferData);
            } catch (\Tatum\Sdk\ApiException $apiExc) {
                $responseObj = $apiExc->getResponseObject();
                $errorMessage = is_array($responseObj) && isset($responseObj['message']) ? $responseObj['message'] : 'An unknown error occurred';
                responseJson('error', $errorMessage);
            } catch (\Exception $exc) {
                $this->withdrawController->cancelWithdraw($withdraw['id']);
                return responseJson('error', $exc->getMessage());
            }

            // Check if the transfer was successful
            if ($transfer->getTxId() != null) {
                createEcoLog($fees_account, $amount, 0, $withdraw['id'], $transfer->getTxId(), 3);

                // Complete the withdrawal
                try {
                    $this->api->withdrawal()->completeWithdrawal($withdraw['id'], $transfer->getTxId());
                } catch (\Tatum\Sdk\ApiException $apiExc) {
                    $responseObj = $apiExc->getResponseObject();
                    $errorMessage = is_array($responseObj) && isset($responseObj['message']) ? $responseObj['message'] : 'An unknown error occurred';
                    responseJson('error', $errorMessage);
                } catch (\Exception $exc) {
                    responseJson('error', $exc->getMessage());
                }

                $fees_account->balance -= $amount;
                $fees_account->save();

                return responseJson('success', $amount . " " . $fees_account->symbol . $fees_account->postfix . " withdraw is processing");
            } else {
                // Cancel the withdrawal due to transfer failure
                $this->withdrawController->cancelWithdraw($withdraw['id']);

                return responseJson('error', 'Transfer failed. Please try again later.');
            }
        }

        return responseJson('error', $withdraw->message);
    }


    function createTransferData($token, $wallet, $masterWallet, $amount, $address)
    {

        if ($wallet->chain === 'TRON') {
            $transferData = new \Tatum\Model\TransferCustodialWalletTron();
            $transferData
                ->setChain($wallet->chain)
                ->setCustodialAddress($wallet->address)
                ->setRecipient($address)
                ->setContractType($token->type)
                ->setTokenAddress($token->address)
                ->setAmount("$amount")
                ->setFromPrivateKey(isEncrypted($masterWallet->private_key) ? decrypt($masterWallet->private_key) : $masterWallet->private_key)
                ->setFeeLimit(20);
        } elseif ($wallet->chain === 'CELO') {
            $transferData = new \Tatum\Model\TransferCustodialWalletCelo();
            $transferData
                ->setChain($wallet->chain)
                ->setCustodialAddress($wallet->address)
                ->setRecipient($address)
                ->setContractType($token->type)
                ->setTokenAddress($token->address)
                ->setAmount("$amount")
                ->setFromPrivateKey(isEncrypted($masterWallet->private_key) ? decrypt($masterWallet->private_key) : $masterWallet->private_key)
                ->setFeeCurrency('CELO');
        } else {
            $transferData = new \Tatum\Model\TransferCustodialWallet();
            $transferData
                ->setChain($wallet->chain)
                ->setCustodialAddress($wallet->address)
                ->setRecipient($address)
                ->setContractType($token->type)
                ->setTokenAddress($token->address)
                ->setAmount("$amount")
                ->setFromPrivateKey(isEncrypted($masterWallet->private_key) ? decrypt($masterWallet->private_key) : $masterWallet->private_key);
        }

        return $transferData;
    }
}
