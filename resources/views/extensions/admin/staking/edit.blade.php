@extends('layouts.admin')

@section('vendor-style')
    <!-- vendor css files -->
    <link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css" rel="stylesheet">
@endsection
@section('content')
    <div class="card">
        <div class="card-header flex justify-between items-center">
            <h4 class="card-title">{{ 'Editing ' . $coin->title . ' Staking Coin' }}</h4>

        </div>
        <form action="{{ route('admin.staking.update') }}" method="POST" enctype="multipart/form-data" id="accountUpdate">
            @csrf
            <input type="hidden" name="id" id="id" value="{{ $coin->id }}">
            <input type="hidden" name="status" id="status" value="{{ $coin->status }}">
            <div class="card-body">
                <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <label for="title"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Title') }}</label>
                        <input type="text"id="title" name="title" aria-label="Coin Title" aria-describedby="title"
                            value="{{ $coin->title }}" disabled class="form-control disabled:opacity-50">
                    </div>
                    <div>
                        <label for="symbol"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Symbol') }}</label>
                        <input type="text"id="symbol" name="symbol" aria-label="Coin Symbol"
                            aria-describedby="symbol" value="{{ $coin->symbol }}" disabled
                            class="form-control disabled:opacity-50">
                        <small><span
                                class="text-warning">{{ __('Make sure the token is found in funding wallets otherwise it will not be possible to use it to stake (until custom tokens supported in funding wallets)') }}</span></small>

                    </div>
                    <div>
                        <label for="network"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Chain') }}</label>
                        <input type="text" id="network" name="network" aria-label="Coin Chain"
                            aria-describedby="network" value="{{ $coin->network }}" required class="form-control">
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
                            <input type="number" step="0.0000001" id="price" name="price" aria-label="Coin Price"
                                aria-describedby="price" value="{{ $coin->price }}">
                            <span id="profit_missed" for="profit_missed">
                                USDT
                            </span>
                        </div>
                    </div>
                    <div>
                        <label for="period"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Duration (Days)') }}</label>
                        <input type="number" step="0.0000001" id="period" name="period" aria-label="Coin Period"
                            aria-describedby="period" value="{{ $coin->period }}" required class="form-control">
                    </div>
                    <div>
                        <label for="profit"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Profit') }}</label>
                        <div class="input-group">
                            <input type="number" step="0.0001" id="profit" name="profit" aria-label="Coin Profit"
                                aria-describedby="profit" value="{{ $coin->profit }}" required>
                            <span>%</span>
                        </div>
                    </div>
                    <div>
                        <label for="amount"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Total Amount') }}</label>
                        <input type="number" step="0.0000001" id="amount" name="amount" aria-label="Total Amount"
                            aria-describedby="amount" value="{{ $coin->amount }}" required class="form-control">
                    </div>
                    <div>
                        <label for="min_stake"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Minimum Stake') }}</label>
                        <input type="number" step="0.0000001" id="min_stake" name="min_stake" aria-label="Minimum Stake"
                            aria-describedby="min_stake" value="{{ $coin->min_stake }}" required class="form-control">
                    </div>
                    <div>
                        <label for="max_stake"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Maximum Stake') }}</label>
                        <input type="number" step="0.0000001" id="max_stake" name="max_stake"
                            aria-label="Maximum Stake" aria-describedby="max_stake" value="{{ $coin->max_stake }}"
                            required class="form-control">
                    </div>
                    <div>
                        <label for="staked"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Staked') }}</label>
                        <input type="number" step="0.0000001" id="staked" name="staked" aria-label="Coin Title"
                            aria-describedby="staked" value="{{ $coin->staked }}" required class="form-control">
                    </div>
                    <div>
                        <label for="apr"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Annual Percentage Rate (APR)') }}</label>
                        <div class="input-group">
                            <input type="number" step="0.0001" id="apr" name="apr" required
                                aria-label="Annual Percentage Rate (APR)" aria-describedby="apr"
                                value="{{ $coin->apr }}">
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
                            <input type="number" step="0.0001" id="daily_profit" name="daily_profit" required
                                aria-label="Daily Profit" aria-describedby="daily_profit"
                                value="{{ $coin->daily_profit }}">
                            <span>%</span>
                        </div>
                    </div>
                    <div>
                        <label for="profit_unit"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Method (Only Manual For Now)') }}</label>
                        <input type="text"id="method" name="method" aria-label="Method"
                            aria-describedby="method" value="manual" disabled class="form-control">
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
                <div class="my-5">
                    <div class=" justify-start items-top mb-1">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="title">{{ __('Select Image') }}</label>
                        <div class="flex">
                            <img class="img-thumbnail mb-1 mr-3"
                                src="{{ getImage(imagePath()['staking']['path'] . '/' . $coin->icon, imagePath()['staking']['size']) }}" />
                            <div>
                                <input class="upload" name="image" type="file" id="image"
                                    accept=".png, .jpg, .jpeg">
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="title">png, jpg, or
                                    jpeg
                                    (MAX. 64x64px).</p>
                            </div>
                        </div>

                    </div>

                </div>
                <div>
                    <label class="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" value="{{ $coin->status }}"
                            @if ($coin->status == 1) checked @endif class="sr-only peer"
                            data-on="{{ __('Active') }}" data-off="{{ __('Disabled') }}" name="status"
                            id="statusEdit">
                        <div onclick="$('#statusEdit').val($('#statusEdit').val() == 1 ? 0 : 1)" class="toggle peer">
                        </div>
                        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Status') }}</span>
                    </label>
                </div>


            </div>
            <div class="card-footer text-end">
                <button type="submit" class="btn btn-outline-success">
                    {{ __('Edit') }}
                </button>
            </div>
        </form>
    </div>
@endsection


@push('breadcrumb-plugins')
    <a href="{{ route('admin.staking.index') }}" class="btn btn-outline-secondary"><i
            class="bi bi-chevron-left mr-1"></i>
        {{ __('Back') }}</a>
@endpush
