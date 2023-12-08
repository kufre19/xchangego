@extends('layouts.admin')

@section('content')
    <livewire:ext.ecommerce.license-table :idx="$product->id" />
@endsection

@push('modals')
    <x-partials.modals.default-modal title="{{ __('New License') }}"
        action="{{ route('admin.ecommerce.product.license.store') }}" submit="{{ __('Submit') }}" id="newLicense">
        <div>
            <input type="hidden" name="id">
            <label for="license" class="block text-sm font-medium text-gray-700 dark:text-gray-300">License</label>
            <input type="text" id="license" name="license" class="form-control" required>
        </div>
    </x-partials.modals.default-modal>
    <x-partials.modals.default-modal title="{{ __('Edit License') }}"
        action="{{ route('admin.ecommerce.product.license.update') }}" submit="{{ __('Submit') }}" id="editLicense">
        <div>
            <input type="hidden" name="id">
            <label for="license" class="block text-sm font-medium text-gray-700 dark:text-gray-300">License</label>
            <input type="text" id="license" name="license" class="form-control" required>
        </div>
    </x-partials.modals.default-modal>
@endpush
@push('breadcrumb-plugins')
    <a href="{{ route('admin.ecommerce.product.index') }}" class="btn btn-outline-secondary"><i
            class="bi bi-chevron-left mr-1"></i>
        {{ __('Back') }}</a>
    <button class="btn btn-outline-primary" data-modal-toggle='newLicense'
        onclick="$('#newLicense').find('input[name=id]').val({{ $product->id }})">{{ __('New License') }}
    </button>
@endpush
