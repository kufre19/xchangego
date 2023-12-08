@extends('layouts.admin')

@section('content')
    <div class="flex flex-wrap justify-center" x-data="{ activeTab: 'funding-deposits' }">
        <div class="w-full">
            <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a @click="activeTab = 'funding-deposits'"
                        class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer"
                        :class="{
                            'text-white bg-green-500 dark:bg-gray-800 border-l-4 border-green-500': activeTab ===
                                'funding-deposits',
                            'text-green-500 bg-white dark:bg-gray-700 dark:text-white border-l-4 border-gray-300 dark:border-gray-600': activeTab !==
                                'funding-deposits'
                        }">
                        {{ __('Funding Deposits') }}
                    </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a @click="activeTab = 'thirdparty-deposits'"
                        class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer"
                        :class="{
                            'text-white bg-green-500 dark:bg-gray-800 border-l-4 border-green-500': activeTab ===
                                'thirdparty-deposits',
                            'text-green-500 bg-white dark:bg-gray-700 dark:text-white border-l-4 border-gray-300 dark:border-gray-600': activeTab !==
                                'thirdparty-deposits'
                        }">
                        {{ __('Thirdparty Deposits') }}
                    </a>
                </li>
            </ul>
            <div class="flex-auto mt-10">
                <div class="tab-content tab-space">
                    <div x-show="activeTab === 'funding-deposits'">
                        <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
                            @if (request()->routeIs('admin.deposit.list') ||
                                    request()->routeIs('admin.deposit.method') ||
                                    request()->routeIs('admin.users.deposits') ||
                                    request()->routeIs('admin.deposit.dateSearch') ||
                                    request()->routeIs('admin.users.deposits.method'))
                                <div class="shadow rounded px-2 py-1 mb-1 bg-green-500">
                                    <div class="widget-two__content">
                                        <h2 class="text-white">
                                            {{ __($general->cur_sym) }}{{ $deposits->where('status', 1)->sum('amount') }}
                                        </h2>
                                        <p class="text-white">{{ __('Successful Deposit') }}</p>
                                    </div>
                                </div>
                                <div class="shadow rounded px-2 py-1 mb-1 bg-gray-600">
                                    <div class="widget-two__content">
                                        <h2 class="text-white">
                                            {{ __($general->cur_sym) }}{{ $deposits->where('status', 2)->sum('amount') }}
                                        </h2>
                                        <p class="text-white">{{ __('Pending Deposit') }}</p>
                                    </div>
                                </div>
                                <div class="shadow rounded px-2 py-1 mb-1 bg-pink-500">
                                    <div class="widget-two__content">
                                        <h2 class="text-white">
                                            {{ __($general->cur_sym) }}{{ $deposits->where('status', 3)->sum('amount') }}
                                        </h2>
                                        <p class="text-white">{{ __('Rejected Deposit') }}</p>
                                    </div>
                                </div>
                            @endif
                        </div>
                        <livewire:funding-deposit-log-table :type="$type ?? ''" :user="$userId ?? ''" />
                    </div>
                    <div x-show="activeTab === 'thirdparty-deposits'">
                        <livewire:thirdparty-transactions-table type="1" :user="$userId ?? ''" />
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('modals')
    <x-partials.modals.default-modal title="{{ __('Confirm Deposit') }}"
        action="{{ route('admin.deposit.thirdparty.confirm') }}" submit="{{ __('Confirm') }}" id="confirmDeposit">
        <div id="transaction-link-container">
            <label class="form-control-label h6">{{ __('Transaction Link') }}</label>
            <div class="input-group">
                <input type="text" class="form-control" id="transaction-link" readonly>
                <a id="transaction-link-btn" class="btn btn-sm btn-outline-primary ml-2"
                    target="_blank">{{ __('Visit') }}</a>
            </div>
        </div>
        <div>
            <input type="hidden" id="id" name="id">
            <label class="form-control-label h6">{{ __('Amount') }}</label>
            <div class="input-group">
                <input type="number" id="amount" name="amount" placeholder="Enter Amount" required>
                <span id="symbol"></span>
            </div>
        </div>
        <div>
            <label class="form-control-label h6">{{ __('Fee') }}</label>
            <div class="input-group">
                <input type="number" id="fee" name="fee" placeholder="Enter Fee" required>
                <span id="symbol2"></span>
            </div>
        </div>
    </x-partials.modals.default-modal>
@endpush

@section('page-scripts')
    <script>
        function setTransactionLink(trx, chain, symbol) {
            document.getElementById('symbol').innerText = symbol;
            document.getElementById('symbol2').innerText = symbol;
            let baseUrl;
            switch (chain) {
                case 'ETH':
                case 'ERC20':
                    baseUrl = 'https://etherscan.io/tx/';
                    break;
                case 'BSC':
                case 'BEP20':
                    baseUrl = 'https://bscscan.com/tx/';
                    break;
                case 'TRX':
                case 'TRON':
                case 'TRC20':
                    baseUrl = 'https://tronscan.org/#/transaction/';
                    break;
                case 'MATIC':
                case 'POLYGON':
                    baseUrl = 'https://polygonscan.com/tx/';
                    break;
                case 'KLAY':
                    baseUrl = 'https://scope.klaytn.com/tx/';
                    break;
                case 'CELO':
                    baseUrl = 'https://celoscan.io/tx/';
                    break;
                case 'SOL':
                    baseUrl = 'https://solscan.io/tx/';
                    break;
                case 'FTM':
                    baseUrl = 'https://ftmscan.com/tx/';
                    break;
                case 'HECO':
                    baseUrl = 'https://hecoinfo.com/tx/';
                    break;
                case 'AVAX':
                    baseUrl = 'https://cchain.explorer.avax.network/tx/';
                    break;
                case 'XDC':
                    baseUrl = 'https://explorer.xinfin.network/tx/';
                    break;
                case 'ALGO':
                    baseUrl = 'https://algoexplorer.io/tx/';
                    break;
                case 'XTZ':
                    baseUrl = 'https://tzkt.io/';
                    break;
                case 'ADA':
                    baseUrl = 'https://cardanoscan.io/transaction/';
                    break;
                case 'DOT':
                    baseUrl = 'https://polkadot.subscan.io/extrinsic/';
                    break;
                case 'TERRA':
                    baseUrl = 'https://finder.terra.money/columbus-4/tx/';
                    break;
                case 'NEAR':
                    baseUrl = 'https://explorer.near.org/transactions/';
                    break;
                case 'ICP':
                    baseUrl = 'https://dashboard.internetcomputer.org/transaction/';
                    break;
                case 'EOS':
                    baseUrl = 'https://bloks.io/transaction/';
                    break;
                case 'DOGE':
                    baseUrl = 'https://dogechain.info/tx/';
                    break;
                case 'LTC':
                    baseUrl = 'https://live.blockcypher.com/ltc/tx/';
                    break;
                case 'XMR':
                    baseUrl = 'https://www.exploremonero.com/transaction/';
                    break;
                case 'XRP':
                    baseUrl = 'https://xrpscan.com/tx/';
                    break;
                case 'BTC':
                    baseUrl = 'https://www.blockchain.com/btc/tx/';
                    break;
                case 'BCH':
                    baseUrl = 'https://explorer.bitcoin.com/bch/tx/';
                    break;
                case 'NEO':
                    baseUrl = 'https://neoscan.io/transaction/';
                    break;
                case 'ZEC':
                    baseUrl = 'https://explorer.zcha.in/transactions/';
                    break;
                default:
                    baseUrl = '';
            }

            const transactionLink = baseUrl + trx;
            document.getElementById('transaction-link').value = transactionLink;
            document.getElementById('transaction-link-btn').href = transactionLink;

        }
    </script>
@endsection
