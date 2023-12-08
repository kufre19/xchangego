@extends('layouts.admin')

@section('content')
    <div class="row" id="table-hover-row" x-data="marketStatus()" x-init="init">
        <div class="col-12">
            <div class="card">
                <div class="card-header flex justify-between items-center">
                    <h4 class="card-title">{{ __('Markets') }}</h4>
                    <div class="flex space-x-2">
                        <button id="bulkEnable" class="btn btn-success" x-show="selectAll"
                            @click="bulkToggle('#bulkActivateModal')" data-modal-target="bulkActivateModal"
                            data-modal-toggle="bulkActivateModal">
                            {{ __('Enable') }}
                        </button>
                        <button id="bulkDisable" class="btn btn-danger" x-show="selectAll"
                            @click="bulkToggle('#bulkDeactivateModal')" data-modal-target="bulkDeactivateModal"
                            data-modal-toggle="bulkDeactivateModal">
                            {{ __('Disable') }}
                        </button>

                        <div class="relative">
                            <form action="{{ route('admin.provider.markets.index', $id) }}" method="GET"
                                class="input-group-btn">
                                <input type="text" name="searchTerm" value="{{ $searchTerm ?? '' }}"
                                    placeholder="{{ __('Search') }}">

                                <!-- Show the "X" icon only if there is a search term -->
                                @if ($searchTerm)
                                    <button type="button"
                                        onclick="event.preventDefault(); location.href='{{ route('admin.provider.markets.index', $id) }}';">
                                        <i class="bi bi-x-lg text-danger"></i>
                                    </button>
                                @else
                                    <button type="submit"><i class="bi bi-search"></i></button>
                                @endif
                            </form>
                        </div>
                    </div>
                </div>


                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    <input type="checkbox" id="selectAllCheckbox"
                                        class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        x-model="selectAll" @click="selectAllToggle">
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    {{ __('Market') }}</th>
                                <th scope="col" class="px-6 py-3">
                                    {{ __('Status') }}
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    {{ __('Action') }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($markets as $market)
                                <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <td class="px-6 py-4">
                                        <input type="checkbox" class="market-checkbox"
                                            data-market-symbol="{{ $market['symbol'] ?? '' }}"
                                            data-market-status="{{ $market['active'] ?? true }}"
                                            x-model="checkboxStates[{{ $loop->index }}]"
                                            @click="updateBulkActionButtons()">

                                    </td>

                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <span class="fw-bold fs-6">{{ $market['symbol'] ?? '' }}</span>
                                    </th>

                                    <td class="px-6 py-4">
                                        <span x-text="getMarketStatus({{ $market['active'] }})"
                                            :class="getMarketStatusClass({{ $market['active'] }})"></span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <button type="button" class="btn btn-icon btn-outline-success btn-sm activateBtn"
                                            @click="toggleModal('#activateModal', '{{ $market['symbol'] }}')"
                                            data-modal-target="activateModal" data-modal-toggle="activateModal"
                                            title="{{ __('Enable') }}">
                                            <i class="bi bi-eye"></i>
                                        </button>

                                        <button type="button" class="btn btn-icon btn-outline-danger btn-sm deactivateBtn"
                                            @click="toggleModal('#deactivateModal', '{{ $market['symbol'] }}')"
                                            data-modal-target="deactivateModal" data-modal-toggle="deactivateModal"
                                            title="{{ __('Disable') }}">
                                            <i class="bi bi-eye-slash"></i>
                                        </button>

                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td class="text-muted text-center" colspan="100%">{{ __($empty_message) }}</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
                <div class="mt-5">
                    {{ $markets->links() }}
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
            <p>
                {{ __('Are you sure to activate') }}
                <span class="fw-bold market-name"></span>
                {{ __('market') }}?
            </p>
        </div>
    </x-partials.modals.default-modal>

    <x-partials.modals.default-modal title="{{ __('Provider Market Deactivation Confirmation') }}" btn="danger"
        action="{{ route('admin.provider.market.deactivate') }}" submit="{{ __('Deactivate') }}" id="deactivateModal"
        done="reload">
        <div>
            <input type="hidden" name="symbol">
            <input type="hidden" name="provider_id" value="{{ $id }}">
            <p>
                {{ __('Are you sure to deactivate') }}
                <span class="fw-bold market-name"></span>
                {{ __('market') }}?
            </p>
        </div>
    </x-partials.modals.default-modal>
@endpush

@push('breadcrumb-plugins')
    <a href="{{ route('admin.provider.market.delete') }}" class="btn btn-outline-danger"><i class="bi bi-x-lg"></i>
        {{ __('Delete All') }}</a>
    <a href="{{ route('admin.provider.index') }}" class="btn btn-outline-secondary"><i class="bi bi-chevron-left"></i>
        {{ __('Back') }}</a>
@endpush

@section('page-scripts')
    <script>
        function marketStatus() {
            return {
                selectAll: false,
                marketCheckboxes: null,
                checkedCheckboxes: [],
                selectedSymbols: '',
                selectedSymbol: '',
                checkboxStates: [],

                init() {},

                getMarketStatus(status) {
                    return status == true ? '{{ __('Active') }}' : '{{ __('Disabled') }}';
                },

                getMarketStatusClass(status) {
                    return status == true ? 'badge bg-success' : 'badge bg-warning';
                },

                selectAllToggle() {
                    this.selectAll = !this.selectAll;
                    this.checkboxToggle();
                    this.updateBulkActionButtons();
                },

                checkboxToggle() {
                    if (!this.marketCheckboxes) {
                        this.marketCheckboxes = document.querySelectorAll('input[type="checkbox"].market-checkbox');
                        this.checkboxStates = Array.from(this.marketCheckboxes).map(checkbox => checkbox.checked);
                    }

                    this.marketCheckboxes.forEach((checkbox, i) => {
                        this.checkboxStates[i] = this.selectAll;
                        checkbox.checked = this.selectAll;
                    });
                },

                toggleModal(modalId, symbol) {
                    $(modalId).find('input[name="symbol"]').val(symbol);
                    $('.market-name').text(symbol);
                },

                bulkToggle(modalId) {
                    $(modalId).find('input[name="symbols"]').val(this.selectedSymbols);
                },

                updateBulkActionButtons() {
                    this.checkedCheckboxes = Array.from(this.marketCheckboxes).filter((checkbox) => checkbox.checked);
                    this.selectedSymbols = this.checkedCheckboxes
                        .map((checkbox) => checkbox.getAttribute('data-market-symbol'))
                        .join(',');
                    console.log(this.selectedSymbols);
                },
            };
        }
    </script>
@endsection
