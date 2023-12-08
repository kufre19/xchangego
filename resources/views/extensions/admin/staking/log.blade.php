@extends('layouts.admin')
@section('content')
    <livewire:ext.staking.staking-log-table />
@endsection

@push('modals')
    <x-partials.modals.default-modal title="{{ __('Refund Investment') }}" action="{{ route('admin.staking.refund') }}"
        submit="{{ __('Refund') }}" id="stakeRefund">
        <div>
            <input type="hidden" id="staking_id" name="staking_id">
            <label class="form-control-label h6">{{ __('Refund Amount') }}</label>
            <input type="text" class="form-control" name="amount">
        </div>
    </x-partials.modals.default-modal>
@endpush
