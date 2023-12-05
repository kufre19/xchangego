@extends('layouts.admin')

@section('content')
    <livewire:ext.ecommerce.products-table />
@endsection

@push('breadcrumb-plugins')
    <a href="{{ route('admin.ecommerce.product.create') }}" class="btn btn-outline-primary"><i class="bi bi-plus-lg mr-1"></i>
        {{ __('Create') }}</a>
@endpush
