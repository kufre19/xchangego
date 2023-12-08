@extends('layouts.admin')
@section('content')
    <livewire:ext.ico.ico-log-table />
@endsection
@push('modals')
    <x-partials.modals.default-modal title="Pay Tokens" action="{{ route('admin.ico.pay') }}" submit="Pay" id="pay">

        <div>
            <input type="hidden" id="id" name="id">
            <input type="hidden" id="type" name="type">
            <label class="form-label" for="rec_wallet">{{ __('Client Recieving Wallet') }}</label>
            <input type="text" class="form-control" name="rec_wallet" disabled>
        </div>
        <div>
            <label class="form-label" for="txHash">{{ __('Transaction Hash') }}</label>
            <input type="text" class="form-control txHash" id="txHash" maxlength="80" name="txHash"
                value="{{ old('txHash') }}" placeholder="{{ __('TxHash') }}" required>
        </div>
        <div>
            <label class="form-label" for="txUrl">{{ __('Transaction Url') }}</label>
            <input type="text" class="form-control txUrl" id="txUrl" maxlength="80" name="txUrl"
                value="{{ old('txUrl') }}" placeholder="txUrl" required>
        </div>
    </x-partials.modals.default-modal>
    <x-partials.modals.default-modal title="Pay Tokens" action="{{ route('admin.ico.pay') }}" submit="Pay" id="payledger">
        <div>
            <input type="hidden" id="id" name="id">
            <input type="hidden" id="type" name="type" value="eco">
            <label class="form-label" for="rec_wallet">{{ __('Client Recieving Wallet') }}</label>
            <input type="text" class="form-control" name="rec_wallet" disabled>
        </div>
        <div>
            <label class="form-label" for="amount">{{ __('Amount') }}</label>
            <input type="text" class="form-control" name="amount" disabled>
        </div>
    </x-partials.modals.default-modal>
@endpush
