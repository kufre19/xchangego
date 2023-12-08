<div>
    <div class="sm:hidden">
        <select
            class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            wire:model="activeTab">
            @foreach ($withdrawals as $status => $withdrawalList)
                <option value="{{ $status }}">{{ $status }}</option>
            @endforeach
        </select>
    </div>
    <div class="hidden sm:block">
        <div class="tab-list flex space-x-2 mb-4">
            @php
                $statusColors = [
                    'Done' => 'green',
                    'InProgress' => 'yellow',
                    'Cancelled' => 'red',
                ];
                
                $glowColors = [
                    'green' => '#2d8a2d',
                    'yellow' => '#b8b800',
                    'red' => '#b80000',
                ];
                
                $glowIntensities = [
                    'green' => '15px',
                    'yellow' => '15px',
                    'red' => '20px',
                ];
                
                $statusText = [
                    'Done' => 'Completed',
                    'InProgress' => 'Pending',
                    'Cancelled' => 'Cancelled',
                ];
            @endphp
            @foreach ($withdrawals as $status => $withdrawalList)
                @php
                    $statusColor = $statusColors[$status] ?? '';
                    $glowColor = $glowColors[$statusColor] ?? '';
                    $glowIntensity = $glowIntensities[$statusColor] ?? '';
                @endphp

                <button
                    class="tab-button relative px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300  rounded focus:outline-none bg-gray-100 dark:bg-gray-700  {{ $status === $activeTab ? 'shadow-inner border-glow' : 'shadow-lg' }}"
                    wire:click="changeTab('{{ $status }}')">
                    <div
                        class="border-l-4 border-{{ $statusColor }}-500 absolute top-0 bottom-0 left-0 rounded-l-md {{ $status === $activeTab ? 'glow-' . $status : '' }}">
                    </div>
                    <span class="pl-4">{{ $statusText[$status] }}</span>
                </button>
            @endforeach
        </div>
    </div>

    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead class="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-600 overflow-x-auto overflow-y-hidden">
                <tr>
                    <th scope="col" class="th">
                        {{ __('Currency') }}
                    </th>
                    <th scope="col" class="th">
                        {{ __('Transaction ID') }}
                    </th>
                    <th scope="col" class="th">
                        {{ __('Account ID') }}
                    </th>
                    <th scope="col" class="th">
                        {{ __('Address') }}
                    </th>
                    <th scope="col" class="th">
                        {{ __('Amount') }}
                    </th>
                    <th scope="col" class="th">
                        {{ __('Fee') }}
                    </th>
                    <th scope="col" class="th">
                        {{ __('Date') }}
                    </th>
                    @if ($activeTab === 'InProgress')
                        <th scope="col" class="th">
                            {{ __('Action') }}
                        </th>
                    @endif
                </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-600">
                @forelse ($withdrawals[$activeTab] as $withdrawal)
                    <tr class="tr">
                        <td class="td">
                            <div class="flex justify-start items-center">
                                @if (strpos($symbol, '_') !== false)
                                    @php
                                        $splitSymbols = explode('_', $symbol);
                                    @endphp
                                    <img class="avatar-content mr-2 h-12"
                                        src="{{ getImage('assets/images/cryptoCurrency/' . strtolower($splitSymbols[0]) . '.png') }}" />
                                    <div class="text-center">
                                        <div>{{ $splitSymbols[0] }}</div>
                                        <div class="badge bg-info ml-2">{{ $splitSymbols[1] }}</div>
                                    </div>
                                @else
                                    <img class="avatar-content mr-2 h-12"
                                        src="{{ getImage('assets/images/cryptoCurrency/' . strtolower($symbol) . '.png') }}" />
                                    {{ $symbol }}
                                @endif
                            </div>
                        </td>

                        <td class="td">
                            @if ($withdrawal['tx_id'] == null)
                                <span class="badge bg-warning">{{ __('Pending') }}</span>
                            @else
                                @if ($this->net == 'mainnet' && $chain == 'ETH')
                                    <a target="_blank" class="underline"
                                        href="https://etherscan.io/tx/{{ $withdrawal['tx_id'] }}">{{ cut_char($withdrawal['tx_id'], 15) }}</a>
                                @elseif ($this->net == 'mainnet' && $chain == 'BSC')
                                    <a target="_blank" class="underline"
                                        href="https://bscscan.com/tx/{{ $withdrawal['tx_id'] }}">{{ cut_char($withdrawal['tx_id'], 15) }}</a>
                                @elseif ($this->net == 'mainnet' && $chain == 'TRON')
                                    <a target="_blank" class="underline"
                                        href="https://tronscan.org/#/transaction/{{ $withdrawal['tx_id'] }}">{{ cut_char($withdrawal['tx_id'], 15) }}</a>
                                @elseif ($this->net == 'mainnet' && $chain == 'MATIC')
                                    <a target="_blank" class="underline"
                                        href="https://polygonscan.com/tx/{{ $withdrawal['tx_id'] }}">{{ cut_char($withdrawal['tx_id'], 15) }}</a>
                                @elseif ($this->net == 'mainnet' && $chain == 'KLAY')
                                    <a target="_blank" class="underline"
                                        href="https://scope.klaytn.com/tx/{{ $withdrawal['tx_id'] }}">{{ cut_char($withdrawal['tx_id'], 15) }}</a>
                                @elseif ($this->net == 'mainnet' && $chain == 'CELO')
                                    <a target="_blank" class="underline"
                                        href="https://celoscan.io/tx/{{ $withdrawal['tx_id'] }}">{{ cut_char($withdrawal['tx_id'], 15) }}</a>
                                @elseif ($this->net == 'mainnet' && $chain == 'SOL')
                                    <a target="_blank" class="underline"
                                        href="https://solscan.io/tx/{{ $withdrawal['tx_id'] }}">{{ cut_char($withdrawal['tx_id'], 15) }}</a>
                                @else
                                    {{ cut_char($withdrawal['tx_id'], 15) }}
                                @endif
                            @endif
                        </td>
                        <td class="td">
                            @if (isset($withdrawal['user']['id']))
                                <a class="badge bg-primary"
                                    href="{{ route('admin.users.detail', $withdrawal['user']['id']) }}">{{ $withdrawal['user']['username'] ?? $withdrawal['account_id'] }}</a>
                            @else
                                {{ $withdrawal['account_id'] }}
                            @endif
                        </td>
                        <td class="td">
                            @if ($withdrawal['address'] != null && $this->net == 'testnet' && getenv('TESTNET_TYPE') == 'ethereum-sepolia')
                                <a target="_blank" class="underline"
                                    href="https://sepolia.etherscan.io/token/{{ $withdrawal['address'] }}">{{ cut_char($withdrawal['address'], 15) }}</a>
                            @elseif ($withdrawal['address'] != null && $this->net == 'mainnet' && $chain == 'ETH')
                                <a target="_blank" class="underline"
                                    href="https://etherscan.io/token/{{ $withdrawal['address'] }}">{{ cut_char($withdrawal['address'], 15) }}</a>
                            @elseif ($withdrawal['address'] != null && $this->net == 'mainnet' && $chain == 'BSC')
                                <a target="_blank" class="underline"
                                    href="https://bscscan.com/token/{{ $withdrawal['address'] }}">{{ cut_char($withdrawal['address'], 15) }}</a>
                            @elseif ($withdrawal['address'] != null && $this->net == 'mainnet' && $chain == 'TRON')
                                <a target="_blank" class="underline"
                                    href="https://tronscan.org/#/address/{{ $withdrawal['address'] }}">{{ cut_char($withdrawal['address'], 15) }}</a>
                            @elseif ($withdrawal['address'] != null && $this->net == 'mainnet' && $chain == 'MATIC')
                                <a target="_blank" class="underline"
                                    href="https://polygonscan.com/token/{{ $withdrawal['address'] }}">{{ cut_char($withdrawal['address'], 15) }}</a>
                            @elseif ($withdrawal['address'] != null && $this->net == 'mainnet' && $chain == 'KLAY')
                                <a target="_blank" class="underline"
                                    href="https://scope.klaytn.com/token/{{ $withdrawal['address'] }}">{{ cut_char($withdrawal['address'], 15) }}</a>
                            @elseif ($withdrawal['address'] != null && $this->net == 'mainnet' && $chain == 'CELO')
                                <a target="_blank" class="underline"
                                    href="https://celoscan.io/token/{{ $withdrawal['address'] }}">{{ cut_char($withdrawal['address'], 15) }}</a>
                            @elseif ($withdrawal['address'] != null && $this->net == 'mainnet' && $chain == 'SOL')
                                <a target="_blank" class="underline"
                                    href="https://solscan.io/token/{{ $withdrawal['address'] }}">{{ cut_char($withdrawal['address'], 15) }}</a>
                            @else
                                {{ cut_char($withdrawal['address'], 15) }}
                            @endif
                        </td>

                        <td class="td">{{ $withdrawal['amount'] }}</td>
                        <td class="td">{{ $withdrawal['fee'] }}</td>
                        <td class="td">{{ date('Y-m-d', $withdrawal['date'] / 1000) }}
                        </td>
                        @if ($activeTab === 'InProgress')
                            <td class="td text-center">
                                <button
                                    class="disabled:opacity-75 inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    wire:click="cancelWithdrawal('{{ $withdrawal['id'] }}', '{{ $withdrawal['fee'] }}')"
                                    wire:loading.attr="disabled"
                                    wire:target="cancelWithdrawal('{{ $withdrawal['id'] }}', '{{ $withdrawal['fee'] }}')">
                                    <span wire:loading.remove
                                        wire:target="cancelWithdrawal('{{ $withdrawal['id'] }}', '{{ $withdrawal['fee'] }}')">{{ __('Cancel') }}</span>
                                    <span wire:loading
                                        wire:target="cancelWithdrawal('{{ $withdrawal['id'] }}', '{{ $withdrawal['fee'] }}')"
                                        class="animate-spin">⟳</span>
                                </button>
                                @if ($withdrawal['tx_id'] != null)
                                    <button
                                        class="disabled:opacity-75 inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        wire:click="completeWithdrawal('{{ $withdrawal['id'] }}', '{{ $withdrawal['tx_id'] }}')"
                                        wire:loading.attr="disabled"
                                        wire:target="completeWithdrawal('{{ $withdrawal['id'] }}', '{{ $withdrawal['tx_id'] }}')">
                                        <span wire:loading.remove
                                            wire:target="completeWithdrawal('{{ $withdrawal['id'] }}', '{{ $withdrawal['tx_id'] }}')">{{ __('Complete') }}</span>
                                        <span wire:loading
                                            wire:target="completeWithdrawal('{{ $withdrawal['id'] }}', '{{ $withdrawal['tx_id'] }}')"
                                            class="animate-spin">⟳</span>
                                    </button>
                                @endif


                            </td>
                        @endif
                    </tr>
                @empty
                    <tr>
                        <td colspan="8" class="text-center py-5">{{ __('No withdrawals found') }}</td>
                    </tr>

                @endforelse
            </tbody>
        </table>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            Livewire.on('withdrawalUpdated', (result) => {
                window.livewire.emit('refresh');
                notify(result.class, result.message);
            });
        });
    </script>

    <style>
        .glow-Done {
            box-shadow: 0 0 10px #2d8a2d;
        }

        @keyframes glow-animation-Done {
            from {
                box-shadow: 0 0 10px #2d8a2d;
            }

            to {
                box-shadow: 0 0 15px #2d8a2d;
            }
        }

        .glow-Done {
            animation: glow-animation-Done 1s ease-in-out infinite alternate;
        }

        .glow-InProgress {
            box-shadow: 0 0 10px #b8b800;
        }

        @keyframes glow-animation-InProgress {
            from {
                box-shadow: 0 0 10px #b8b800;
            }

            to {
                box-shadow: 0 0 15px #b8b800;
            }
        }

        .glow-InProgress {
            animation: glow-animation-InProgress 1s ease-in-out infinite alternate;
        }

        .glow-Cancelled {
            box-shadow: 0 0 10px #b80000;
        }

        @keyframes glow-animation-Cancelled {
            from {
                box-shadow: 0 0 10px #b80000;
            }

            to {
                box-shadow: 0 0 20px #b80000;
            }
        }

        .glow-Cancelled {
            animation: glow-animation-Cancelled 1s ease-in-out infinite alternate;
        }
    </style>

</div>
