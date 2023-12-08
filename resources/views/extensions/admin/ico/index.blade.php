@extends('layouts.admin')

@section('content')
    <livewire:ext.ico.ico-table />
@endsection

@push('breadcrumb-plugins')
    <a href="{{ route('admin.ico.new') }}" class="btn btn-outline-primary"><i class="bi bi-plus-lg"></i>
        {{ __('New Token') }}</a>
@endpush
