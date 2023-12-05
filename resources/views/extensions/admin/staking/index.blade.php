@extends('layouts.admin')

@section('content')
    <livewire:ext.staking.coins-table />
@endsection
@push('modals')
    <x-partials.modals.store-modal title="{{ __('New Staking Currency') }}" action="{{ route('admin.staking.store') }}"
        submit="{{ __('Submit') }}" id="newStaking">
        <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <input type="hidden" name="status" id="status">
            <div>
                <label for="title"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Title') }}</label>
                <input type="text"id="title" name="title" aria-label="Coin Title" aria-describedby="title"
                    value="{{ old('title') }}" required class="form-control">
            </div>
            <div>
                <label for="symbol"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Symbol') }}</label>
                <input type="text"id="symbol" name="symbol" aria-label="Coin Symbol" aria-describedby="symbol"
                    value="{{ old('symbol') }}" required class="form-control">
                <small><span
                        class="text-warning">{{ __('Make sure the token is found in funding wallets otherwise it will not be possible to use it to stake (until custom tokens supported in funding wallets)') }}</span></small>
            </div>
            <div>
                <label for="network"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Chain') }}</label>
                <input type="text" id="network" name="network" aria-label="Coin Chain" aria-describedby="network"
                    value="{{ old('network') }}" required class="form-control">
                @if (getExt(10) == 1)
                    <small><span
                            class="text-warning">{{ __('Make sure the token chain is correct and all in CAPITAL letters as listed in ecosystem chains otherwise it will fail to create the staking coin.') }}</span></small>
                @endif

            </div>
            <div>
                <div class="flex justify-between">
                    <label for="profit_missed"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Price') }}</label>

                </div>

                <div class="input-group">
                    <input type="number" class="form-control" step="0.0000001" id="price" name="price"
                        aria-label="Coin Price" aria-describedby="price" value="{{ old('price') }}" required>
                    <span id="profit_missed" for="profit_missed">
                        USDT
                    </span>
                </div>
            </div>
            <div>
                <label for="period"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Duration (Days)') }}</label>
                <input type="number" step="0.0000001" id="period" name="period" aria-label="Coin Period"
                    aria-describedby="period" value="{{ old('period') }}" required class="form-control">
            </div>
            <div>
                <label for="profit"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Profit') }}</label>


                <div class="input-group">
                    <input type="number" step="0.0001" id="profit" name="profit" aria-label="Coin Profit"
                        aria-describedby="profit" value="{{ old('profit') }}" required>
                    <span>%</span>
                </div>
            </div>
            <div>
                <label for="amount"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Total Amount') }}</label>
                <input type="number" step="0.0000001" id="amount" name="amount" aria-label="Total Amount"
                    aria-describedby="amount" value="{{ old('amount') }}" required class="form-control">
            </div>
            <div>
                <label for="min_stake"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Minimum Stake') }}</label>
                <input type="number" step="0.0000001" id="min_stake" name="min_stake" aria-label="Minimum Stake"
                    aria-describedby="min_stake" value="{{ old('min_stake') }}" required class="form-control">
            </div>
            <div>
                <label for="max_stake"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Maximum Stake') }}</label>
                <input type="number" step="0.0000001" id="max_stake" name="max_stake" aria-label="Maximum Stake"
                    aria-describedby="max_stake" value="{{ old('max_stake') }}" required class="form-control">
            </div>
            <div>
                <label for="staked"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Staked') }}</label>
                <input type="number" step="0.0000001" id="staked" name="staked" aria-label="Coin Title"
                    aria-describedby="staked" value="{{ old('staked') }}" required class="form-control">
            </div>
            <div>
                <label for="apr"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Annual Percentage Rate (APR)') }}</label>
                <div class="input-group">
                    <input type="number" step="0.0001" id="apr" name="apr" required
                        aria-label="Annual Percentage Rate (APR)" aria-describedby="apr" value="{{ old('apr') }}">
                    <span>%</span>
                </div>
            </div>
            <div>
                <label for="profit_unit"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Profit Gain (Only Daily for now)') }}</label>
                <input type="text" id="profit_unit" name="profit_unit" aria-label="Profit Gain"
                    aria-describedby="profit_unit" value="daily" disabled class="form-control">
            </div>
            <div>
                <label for="daily_profit"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Daily Profit') }}</label>
                <div class="input-group">
                    <input type="number" step="0.0001" id="daily_profit" name="daily_profit"
                        aria-label="Daily Profit" aria-describedby="daily_profit" value="{{ old('daily_profit') }}"
                        required>
                    <span>%</span>
                </div>
            </div>
            <div>
                <label for="profit_unit"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Method (Only Manual For Now)') }}</label>
                <input type="text"id="method" name="method" aria-label="Method" aria-describedby="method"
                    value="manual" disabled class="form-control">
            </div>
            <div>
                <label for="wallet_type"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Wallet Type') }}</label>
                <select class="form-select" id="wallet_type" name="wallet_type" required>
                    <option value="funding" selected>
                        {{ __('Funding Wallet') }}
                    </option>
                    <option value="primary" @if (getExt(10) != 1) disabled @endif>
                        {{ __('Primary Wallet') }}
                    </option>
                </select>
            </div>
        </div>
        <div>
            <div class="justify-start items-top mb-1">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="title">{{ __('Select Image') }}</label>
                <div class="mr-1">
                    <img class="img-thumbnail mb-1" style="max-width: 164px" src="" />
                </div>
                <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    name="image" type="file" id="image" accept=".png, .jpg, .jpeg">
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="title">png, jpg, or jpeg (MAX. 64x64px).
                </p>
            </div>

        </div>

        <div>
            <label class="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" value="0" class="sr-only peer" data-on="{{ __('Active') }}"
                    data-off="{{ __('Disabled') }}" name="status" id="statusNew">
                <div onclick="$('#statusNew').val($('#statusNew').val() == 1 ? 0 : 1)" class="toggle peer">
                </div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Status') }}</span>
            </label>
        </div>


    </x-partials.modals.store-modal>
@endpush

@push('breadcrumb-plugins')
    <button class="btn btn-outline-primary" data-modal-toggle="newStaking"><i class="bi bi-plus-lg"></i>
        {{ __('New Staking Currency') }}</button>
@endpush
