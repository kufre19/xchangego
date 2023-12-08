@extends('layouts.admin')

@section('content')
    <div class="row" id="table-hover-row">
        <div class="col-12">
            <div class="card">
                <div class="card-header flex justify-between items-center">
                    <h4 class="card-title">{{ __('Markets') }}</h4>
                    <div>
                        <button id="bulkEnable" class="btn btn-success d-none"
                            data-modal-toggle="bulkActivateModal">{{ __('Enable') }}</button>
                        <button id="bulkDisable" class="btn btn-danger d-none"
                            data-modal-toggle="bulkDeactivateModal">{{ __('Disable') }}</button>
                    </div>
                </div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    <input type="checkbox" id="selectAllCheckbox"
                                        class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">

                                </th>
                                <th scope="col" class="px-6 py-3">
                                    {{ __('Market') }} </th>
                                <th scope="col" class="px-6 py-3">
                                    {{ __('Status') }}
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    {{ __('Action') }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($markets as $pairs)
                                @forelse($pairs as $market)
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <td class="px-6 py-4">
                                            <input type="checkbox" class="market-checkbox"
                                                data-market-symbol="{{ $market['symbol'] ?? '' }}"
                                                data-market-status="{{ $market['active'] ?? true }}">
                                        </td>
                                        <th scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <span class="fw-bold fs-6">{{ $market['symbol'] ?? '' }}</span>
                                        </th>

                                        <td class="px-6 py-4">
                                            @if ($market['active'])
                                                <span class="badge bg-success">{{ __('Active') }}</span>
                                            @else
                                                <span class="badge bg-warning">{{ __('Disabled') }}</span>
                                            @endif
                                        </td>
                                        <td class="px-6 py-4">
                                            @if (!$market['active'])
                                                <button type="button"
                                                    class="btn btn-icon btn-outline-success btn-sm activateBtn"
                                                    onclick="
                                                    $('#activateModal').find('.market-name').text('{{ $market['symbol'] }}');
                                                    $('#activateModal').find('input[name=symbol]').val('{{ $market['symbol'] }}');"
                                                    data-modal-toggle="activateModal" title="{{ __('Enable') }}">
                                                    <i class="bi bi-eye"></i>
                                                </button>
                                            @else
                                                <button type="button"
                                                    class="btn btn-icon btn-outline-danger btn-sm deactivateBtn"
                                                    onclick="
                                                    $('#deactivateModal').find('.market-name').text('{{ $market - ['symbol'] }}');
                                                    $('#deactivateModal').find('input[name=symbol]').val('{{ $market['symbol'] }}');"
                                                    data-modal-toggle="deactivateModal" title="{{ __('Disable') }}">
                                                    <i class="bi bi-eye-slash"></i>
                                                </button>
                                            @endif
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td class="text-muted text-center" colspan="100%">{{ __($empty_message) }}</td>
                                    </tr>
                                @endforelse
                            @empty
                                <tr>
                                    <td class="text-muted text-center" colspan="100%">{{ __($empty_message) }}</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('modals')
    <x-partials.modals.default-modal title="{{ __('Bulk Market Activation Confirmation') }}"
        action="{{ route('admin.provider.market.bulk.activate') }}" submit="{{ __('Activate') }}" id="bulkActivateModal"
        done="reload">
        <div>
            <input type="hidden" name="symbols" id="bulkActivateSymbols">
            <input type="hidden" name="provider_id" value="{{ $id }}">
            <p>{{ __('Are you sure to activate the selected markets?') }}</p>
        </div>
    </x-partials.modals.default-modal>
    <x-partials.modals.default-modal title="{{ __('Bulk Market Deactivation Confirmation') }}" btn="danger"
        action="{{ route('admin.provider.market.bulk.deactivate') }}" submit="{{ __('Deactivate') }}"
        id="bulkDeactivateModal" done="reload">
        <div>
            <input type="hidden" name="symbols" id="bulkDeactivateSymbols">
            <input type="hidden" name="provider_id" value="{{ $id }}">
            <p>{{ __('Are you sure to deactivate the selected markets?') }}</p>
        </div>
    </x-partials.modals.default-modal>
    <x-partials.modals.default-modal title="{{ __('Provider Market Activation Confirmation') }}"
        action="{{ route('admin.provider.market.activate') }}" submit="{{ __('Activate') }}" id="activateModal"
        done="reload">
        <div>
            <input type="hidden" name="symbol">
            <input type="hidden" name="provider_id" value="{{ $id }}">
            <p>{{ __('Are you sure to activate') }} <span class="fw-bold market-name"></span>
                {{ __('market') }}?</p>
        </div>
    </x-partials.modals.default-modal>

    <x-partials.modals.default-modal title="{{ __('Provider Market Deactivation Confirmation') }}" btn="danger"
        action="{{ route('admin.provider.market.deactivate') }}" submit="{{ __('Deactivate') }}" id="deactivateModal"
        done="reload">
        <div>
            <input type="hidden" name="symbol">
            <input type="hidden" name="provider_id" value="{{ $id }}">
            <p>{{ __('Are you sure to deactivate') }} <span class="fw-bold market-name"></span>
                {{ __('market') }}?</p>
        </div>
    </x-partials.modals.default-modal>
@endpush

@push('breadcrumb-plugins')
    <a href="{{ route('admin.futures.provider.market.delete') }}" class="btn btn-outline-danger"><i
            class="bi bi-x-lg"></i>
        {{ __('Delete All') }}</a>

    {{-- <a href="{{ route('admin.futures.provider.refresh') }}" class="btn btn-icon btn-outline-success" title="Refresh">
        <i class="bi bi-arrow-repeat pr-1"></i> {{ __('Refresh') }}
    </a> --}}
    <a href="{{ route('admin.provider.index') }}" class="btn btn-outline-secondary"><i class="bi bi-chevron-left"></i>
        {{ __('Back') }}</a>
@endpush

@section('page-scripts')
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const bulkActivateBtn = document.querySelector('#bulkEnable');
            const bulkDeactivateBtn = document.querySelector('#bulkDisable');

            const marketCheckboxes = document.querySelectorAll('input[type="checkbox"].market-checkbox');

            const selectAllCheckbox = document.querySelector('#selectAllCheckbox');

            selectAllCheckbox.addEventListener('change', () => {
                marketCheckboxes.forEach(checkbox => checkbox.checked = selectAllCheckbox.checked);
                updateBulkActionButtons();
            });

            marketCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    updateBulkActionButtons();
                });
            });

            function updateBulkActionButtons() {
                const checkedCheckboxes = Array.from(marketCheckboxes).filter(checkbox => checkbox.checked);
                bulkActivateBtn.style.display = checkedCheckboxes.length > 0 ? 'inline-block' : 'none';
                bulkDeactivateBtn.style.display = checkedCheckboxes.length > 0 ? 'inline-block' : 'none';
            }

            bulkActivateBtn.addEventListener('click', () => {
                const symbols = Array.from(marketCheckboxes)
                    .filter(checkbox => checkbox.checked && parseInt(checkbox.getAttribute(
                        'data-market-status')) === 0)
                    .map(checkbox => checkbox.getAttribute('data-market-symbol'))
                    .join(',');

                document.querySelector('#bulkActivateSymbols').value = symbols;
            });

            bulkDeactivateBtn.addEventListener('click', () => {
                const symbols = Array.from(marketCheckboxes)
                    .filter(checkbox => checkbox.checked && parseInt(checkbox.getAttribute(
                        'data-market-status')) === 1)
                    .map(checkbox => checkbox.getAttribute('data-market-symbol'))
                    .join(',');

                document.querySelector('#bulkDeactivateSymbols').value = symbols;
            });
        });
    </script>
@endsection
