@extends('layouts.admin')

@section('content')
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        @include('extensions.admin.p2p.orders.details')
        @include('extensions.admin.p2p.orders.chat')
    </div>
@endsection

@push('breadcrumb-plugins')
    <a href="{{ route('admin.p2p.orders.index') }}" class="btn btn-outline-primary"><i class="bi bi-chevron-left"></i>
        {{ __('Back') }}</a>
@endpush
