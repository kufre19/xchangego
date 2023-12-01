@extends('layouts.admin')

@section('content')
    <livewire:ext.peer.orders-table :userid="$id ?? null" :offerid="$offer_id ?? null" />
@endsection

@if ($id || $offer_id)
    @push('breadcrumb-plugins')
        <a href="{{ $id !== null && $offer_id === null ? route('admin.p2p.sellers.index') : route('admin.p2p.offers.index') }}"
            class="btn btn-outline-primary"><i class="bi bi-chevron-left"></i>
            {{ __('Back') }}</a>
    @endpush
@endif
