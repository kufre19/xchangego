@extends('layouts.admin')

@section('content')
    <livewire:ext.ecommerce.category-table />
@endsection
@push('breadcrumb-plugins')
    @can('category_create')
        <a class="btn btn-success" href="{{ route('admin.ecommerce.category.create') }}">
            {{ trans('Add Category') }}
        </a>
    @endcan
@endpush
