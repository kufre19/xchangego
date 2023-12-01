@extends('layouts.admin')

@section('content')
    <livewire:ext.ecommerce.products-table />
@endsection

@push('breadcrumb-plugins')
    <a href="{{ route('admin.ecommerce.product.create') }}" class="btn btn-outline-primary"><i class="bi bi-plus-lg mr-1"></i>
        {{ __('Create') }}</a>
    <a href="{{ route('admin.ecommerce.product.index') }}" class="btn btn-outline-secondary"><i
            class="bi bi-chevron-left mr-1"></i>
        {{ __('Back') }}</a>
@endpush
