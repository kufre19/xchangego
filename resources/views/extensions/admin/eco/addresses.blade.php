@extends('layouts.admin')

@section('content')
    <livewire:ext.eco.eco-addresses-table :chain="$chain" :symbol="$symbol" />
    <div class="card mt-5">
        <div class="card-header">
            <h4>{{ __('Guide') }}</h4>
        </div>
        <div class="card-body">
            <ul class="list-disc px-3">
                <li><span class="fw-bolder">{{ __('Index') }}</span> {{ __('is important to identify address
                    precalculated from master wallet') }}</li>
                <li><span class="fw-bolder">{{ __('Bulk Refresh Balances') }}</span> {{ __('button will fetch the balances on ledger account and blockchain free balance but blockchain balance can only be fetched if address is activated') }}</li>
                <li><span class="fw-bolder">{{ __('Balance') }}</span> {{ __('is the user balance on the ledger account that') }}
                    he can withdraw or trade with</li>
                <li><span class="fw-bolder">{{ __('Free Balance') }}</span> {{ __('is the wallet balance on the blockchain') }}</li>
                <li><span class="badge bg-success">{{ __('user') }}</span> {{ __('is an address created and assigned to user') }}

                    </li>
                <li><span class="badge bg-success">{{ __('Activation') }} TxId</span> {{ __('is an address activated and checked successfully') }}

                    </li>
            </ul>
        </div>
    </div>
@endsection

@push('breadcrumb-plugins')
    <div class="space-x-1">
        <a href="{{ route('admin.eco.blockchain.addresses.store', [$chain, $symbol]) }}" class="btn btn-outline-primary">
            <i class="bi bi-plus-lg"></i> {{ __('Create Addresses') }}
        </a>
        <a href="{{ route('admin.eco.blockchain.mainnet.tokens.index', $chain) }}" class="btn btn-outline-secondary">
            <i class="bi bi-chevron-left"></i> {{ __('Back') }}
        </a>
    </div>
@endpush
