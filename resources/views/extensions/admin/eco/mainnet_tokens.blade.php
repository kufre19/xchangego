@extends('layouts.admin')

@section('content')
    <livewire:ext.eco.eco-mainnet-tokens-table :chain="$chain" />
@endsection
@push('modals')
    <x-partials.modals.default-modal title="{{ __('Upload Token Icon') }}"
        action="{{ route('admin.eco.blockchain.tokens.add.icon', $chain) }}" submit="{{ __('Upload') }}" id="addIcon">
        <div>
            <input type="hidden" name="symbol">
            <input class="upload" name="image" type="file" id="image" accept=".png, .jpg, .jpeg" required />
            <small><span
                    class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{{ __('Icon') }}
                    size: 64px * 64px</span></small>
        </div>
    </x-partials.modals.default-modal>
    <x-partials.modals.default-modal title="{{ __('Fees Account Creation Confirmation') }}"
        action="{{ route('admin.eco.blockchain.tokens.fees.account.create', $chain) }}" submit="{{ __('Create') }}"
        id="createFeesAccount">
        <div>
            <input type="hidden" name="symbol">
            <input type="hidden" name="postfix">
            <p>{{ __('Do you want to create a fees account for this token') }}?</p>
        </div>
    </x-partials.modals.default-modal>

    <x-partials.modals.default-modal title="{{ __('Withdraw Settings') }}"
        action="{{ route('admin.eco.blockchain.tokens.withdraw.settings', ['chain' => $chain, 'isMainnet' => 'true']) }}"
        submit="{{ __('Update') }}" id="editWithdraw">
        <div class="mb-1">
            <input type="hidden" name="id">
            <label class="form-label" for="withdraw_min">{{ __('Minimum Withdrawal Amount') }}</label>
            @php
                if ($chain == 'BTC') {
                    $min = 0.00001;
                    $step = 0.00001;
                } elseif ($chain == 'LTC') {
                    $min = 0.0001;
                    $step = 0.0001;
                } elseif ($chain == 'DOGE') {
                    $min = 1;
                    $step = 1;
                } else {
                    $min = 0;
                    $step = 0.00001;
                }
            @endphp

            <input type="number" class="form-control" name="withdraw_min" min="{{ $min }}"
                step="{{ $step }}" value="0" required>
            <small>{{ __('Min amount to complete transaction') }}: <span class="text-warning">
                    @if ($chain == 'BTC')
                        0.00001
                    @elseif($chain == 'LTC')
                        0.0001
                    @elseif($chain == 'DOGE')
                        1
                    @else
                        0
                    @endif
                </span> {{ $chain }}
            </small>
        </div>


        <div class="mb-1">
            <label class="form-label" for="withdraw_max">{{ __('Maximum Withdraw') }}</label>
            <input type="number" class="form-control" name="withdraw_max"min="0" step=".00000001" value="0"
                required>
        </div>
        <div class="mb-1">
            <label class="form-label" for="withdraw_fee">{{ __('Withdraw Fees') }}</label>
            <div class="input-group">
                <input type="number" name="withdraw_fee" value="1">
                <span>%</span>
            </div>
            <small>{{ __('Min fees to complete transaction') }}: <span class="text-warning">
                    @if ($chain == 'BTC')
                        0.00001
                    @elseif($chain == 'LTC')
                        0.0001
                    @elseif($chain == 'DOGE')
                        1
                    @else
                        0
                    @endif
                </span> {{ $chain }}
            </small>
        </div>

        @if (in_array($chain, ['BTC', 'LTC', 'DOGE']))
            <small>
                <span class="text-info">{{ __('Note') }}:</span> {{ __('Transaction fees consist of two parts: fees for miners and fees for the master wallet.The minimum fee user will see in withdrawal page for') }}
                <span class="text-warning">
                    @if ($chain == 'BTC')
                        Bitcoin (BTC)
                    @elseif($chain == 'LTC')
                        Litecoin (LTC)
                    @elseif($chain == 'DOGE')
                        Dogecoin (DOGE)
                    @endif
                </span> transactions is:
                <span class="text-warning">
                    @if ($chain == 'BTC')
                        0.00002 BTC
                    @elseif($chain == 'LTC')
                        0.0002 LTC
                    @elseif($chain == 'DOGE')
                        2 DOGE
                    @endif
                </span>
            </small>
        @endif


    </x-partials.modals.default-modal>
@endpush
@push('breadcrumb-plugins')
    <a href="{{ route('admin.eco.blockchain.index') }}" class="btn btn-outline-secondary"><i
            class="bi bi-chevron-left"></i>
        {{ __('Back') }}</a>
@endpush

@section('page-scripts')
    <script>
        "use strict";

        const tokenDecimals = 8;
        let chain = '';
        async function addTokenFunction(symbol, address, type, image) {
            if (type == 'ETH') {
                this.chain = 'ERC20';
            }
            try {
                const wasAdded = await ethereum.request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: this.chain,
                        options: {
                            address: address,
                            symbol: symbol,
                            decimals: tokenDecimals,
                            image: image,
                        },
                    },
                });
            } catch (error) {
                console.log(error);
            }
        }

        function openEditWithdrawModal(id, withdrawMin, withdrawMax, withdrawFee) {
            // Set the input field values
            $('#editWithdraw').find('input[name=id]').val(id);
            $('#editWithdraw').find('input[name=withdraw_min]').val(withdrawMin);
            $('#editWithdraw').find('input[name=withdraw_max]').val(withdrawMax);
            $('#editWithdraw').find('input[name=withdraw_fee]').val(withdrawFee);

            // Show the modal
            $('#editWithdraw').modal('show');
        }
    </script>
@endsection
