@extends('layouts.admin')
@section('content')
    <livewire:notifications-table />
@endsection

@push('breadcrumb-plugins')
    <a class="btn btn-outline-danger" href="{{ route('admin.notifications.clean') }}">
        {{ __('Clean All Notifications') }}
    </a>
    <a class="btn btn-outline-warning" href="{{ route('admin.notifications.clean.seen') }}">
        {{ __('Clean Viewed Notifications') }}
    </a>
@endpush
