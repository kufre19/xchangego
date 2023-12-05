@extends('layouts.admin')

@section('content')
    <livewire:investment-plans-table />
@endsection

@push('breadcrumb-plugins')
    <a class="btn btn-outline-primary" href="{{ route('admin.investment.plans.create') }}"><i
            class="bi bi-plus-lg"></i>{{ __('Add New') }}</a>
@endpush
