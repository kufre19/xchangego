<?php

namespace App\Http\Livewire\Ext\Eco;

use App\Models\Eco\EcoWallet;
use Livewire\Component;
use Tatum\Sdk;
use Tatum\Sdk\ApiException;

class WithdrawalsTable extends Component
{
    public $withdrawals;
    public $symbol;
    public $chain;
    public $activeTab;
    public $loadingWithdrawalId = null;
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

    protected $listeners = ['refresh' => 'refresh'];

    public function refresh()
    {
        $this->withdrawals = $this->fetchAllWithdrawals($this->symbol);
    }

    public function mount()
    {
        $this->withdrawals = $this->fetchAllWithdrawals($this->symbol);
        $this->activeTab = array_key_first($this->withdrawals);
    }

    public function render()
    {
        $withdrawals = $this->withdrawals;
        $symbol = $this->symbol;
        $chain = $this->chain;
        return view('livewire.ext.eco.withdrawals-table', compact('withdrawals', 'symbol', 'chain'));
    }

    public function changeTab($tab)
    {
        $this->activeTab = $tab;
    }

    public function cancelWithdrawal($id, $fee)
    {
        $this->loadingWithdrawalId = $id;
        $revert = $fee != '0';
        try {
            $this->api
                ->withdrawal()
                ->cancelInProgressWithdrawal($id, $revert);

            $this->emit('withdrawalUpdated', [
                'type' => 'success',
                'class' => 'success',
                'icon' => 'check-circle',
                'header' => 'Success',
                'message' => 'Withdrawal cancelled successfully.'
            ]);
        } catch (ApiException $apiExc) {
            $this->emit('withdrawalUpdated', [
                'type' => 'alert',
                'class' => 'danger',
                'icon' => 'exclamation-triangle',
                'header' => 'Error',
                'message' => 'API error: ' . $apiExc->getMessage()
            ]);
        } catch (\Exception $exc) {
            $this->emit('withdrawalUpdated', [
                'type' => 'alert',
                'class' => 'danger',
                'icon' => 'exclamation-triangle',
                'header' => 'Error',
                'message' => 'Error: ' . $exc->getMessage()
            ]);
        }
    }

    public function completeWithdrawal($id, $tx_id)
    {
        $this->loadingWithdrawalId = $id;
        try {
            $this->api
                ->withdrawal()
                ->completeWithdrawal($id, $tx_id);

            $this->emit('withdrawalUpdated', [
                'type' => 'success',
                'class' => 'success',
                'icon' => 'check-circle',
                'header' => 'Success',
                'message' => 'Withdrawal completed successfully.'
            ]);
        } catch (ApiException $apiExc) {
            $this->emit('withdrawalUpdated', [
                'type' => 'alert',
                'class' => 'danger',
                'icon' => 'exclamation-triangle',
                'header' => 'Error',
                'message' => 'API error: ' . $apiExc->getMessage()
            ]);
        } catch (\Exception $exc) {
            $this->emit('withdrawalUpdated', [
                'type' => 'alert',
                'class' => 'danger',
                'icon' => 'exclamation-triangle',
                'header' => 'Error',
                'message' => 'Error: ' . $exc->getMessage()
            ]);
        }
    }


    public function getWithdrawalStatuses()
    {
        $withdrawalObject = new \Tatum\Model\WithdrawalObject();
        $statuses = $withdrawalObject->getStatusAllowableValues();
        return $statuses;
    }

    public function fetchAllWithdrawals($currency, $pageSize = 50, $offset = 0)
    {
        $statuses = $this->getWithdrawalStatuses();
        $withdrawals = [];

        // fetch accounts from EcoWallet model
        $wallets = EcoWallet::with(['user'])->where('currency', $currency)->where('chain', $this->chain)->get();

        foreach ($statuses as $status) {
            try {
                $response = $this->api->withdrawal()->getWithdrawals($pageSize, $currency, $status, $offset);
                $formattedResponse = [];

                foreach ($response as $withdrawal) {
                    $user = $wallets->where('account_id', $withdrawal->getAccountId())->first()->user ?? null;
                    $formattedResponse[] = [
                        'id' => $withdrawal->getId(),
                        'tx_id' => $withdrawal->getTxId(),
                        'account_id' => $withdrawal->getAccountId(),
                        'address' => $withdrawal->getAddress(),
                        'amount' => $withdrawal->getAmount(),
                        'fee' => $withdrawal->getFee(),
                        'date' => $withdrawal['date'],
                        'status' => $withdrawal->getStatus(),
                        'user' => $user,
                    ];
                }

                $withdrawals[$status] = $formattedResponse;
            } catch (\Tatum\Sdk\ApiException $apiExc) {
                // Handle the API exception
            } catch (\Exception $exc) {
            }
        }

        return $withdrawals;
    }
}
