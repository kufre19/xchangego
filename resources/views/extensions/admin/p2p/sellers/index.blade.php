@extends('layouts.admin')

@section('content')
    <livewire:ext.peer.sellers-table :userid="$id ?? null" />
@endsection

@if ($id)
    @push('breadcrumb-plugins')
        <a href="{{ route('admin.p2p.sellers.index') }}" class="btn btn-outline-primary"><i class="bi bi-chevron-left"></i>
            {{ __('Back') }}</a>
    @endpush
@endif
