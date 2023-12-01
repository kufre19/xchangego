@extends('layouts.admin')

@section('content')
    <div class="tabs">
        @livewire('ext.eco.withdrawals-table', ['symbol' => $symbol, 'chain' => $chain])
    </div>
@endsection

@push('breadcrumb-plugins')
    <a href="{{ route('admin.eco.blockchain.index') }}" class="btn btn-outline-secondary"><i class="bi bi-chevron-left"></i>
        {{ __('Back') }}</a>
@endpush
