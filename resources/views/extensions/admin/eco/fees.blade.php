@extends('layouts.admin')

@section('content')
    <livewire:ext.eco.eco-fees-table :chain="$chain" />

    <div class="mt-5">
        <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-md shadow-md">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ __('') }}Important Information:</h2>
            <ul class="list-disc list-inside text-gray-800 dark:text-gray-200 mt-2">
                <li>{{ __('Minimum balance to activate withdrawal is 50') }}.</li>
                <li>{{ __('It\'s advised to stake all fees in blockchains without withdrawing them until the exchange gains highprofits') }}

                    .</li>
                <li>{{ __('It\'s advised to withdraw when at least $1,000 in fees are collected') }}.</li>
            </ul>
        </div>
    </div>
@endsection

@push('modals')
    <x-partials.modals.default-modal title="{{ __('Withdraw Funds') }}"
        action="{{ route('admin.eco.blockchain.fees.withdraw', $chain) }}" submit="{{ __('Withdraw') }}" id="withdrawFunds">
        <div>
            <input type="hidden" name="id">
            <div class="form-group">
                <label for="withdraw_amount">{{ __('Amount') }}</label>
                <div class="input-group">
                    <input type="number" min="0" max="" step="any" name="amount" id="withdraw_amount"
                        class="form-control" required>
                    <button type="button" id="set_max_amount"
                        class="btn btn-outline-secondary">{{ __('Max') }}</button>
                </div>
            </div>
            <div class="form-group" style="padding-top: 10px;">
                <label for="address">{{ __('Address') }}</label>
                <input type="text" name="address" id="address" class="form-control" required
                    placeholder="{{ __('Enter withdrawal address') }}">
            </div>
        </div>
    </x-partials.modals.default-modal>
@endpush


@push('breadcrumb-plugins')
    <a href="{{ route('admin.eco.blockchain.index') }}" class="btn btn-outline-secondary"><i
            class="bi bi-chevron-left"></i>
        {{ __('Back') }}</a>
@endpush

@section('page-scripts')
    <script>
        $(document).ready(function() {
            $('#set_max_amount').on('click', function() {
                let maxAmount = $('#withdraw_amount').attr('max');
                $('#withdraw_amount').val(maxAmount);
            });
        });
    </script>
@endsection
