@extends('layouts.admin')

@section('content')
    <div class="flex flex-wrap justify-center" x-data="{ activeTab: 'thirdpartyProviders' }">
        <div class="w-full">
            <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a @click="activeTab = 'thirdpartyProviders'"
                        class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer"
                        :class="{
                            'text-white bg-green-500 dark:bg-gray-800 border-l-4 border-green-500': activeTab ===
                                'thirdpartyProviders',
                            'text-green-500 bg-white dark:bg-gray-700 dark:text-white border-l-4 border-gray-300 dark:border-gray-600': activeTab !==
                                'thirdpartyProviders'
                        }">
                        {{ __('Providers') }}
                    </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    @if (getExt(15) === 1)
                        <a @click="activeTab = 'thirdpartyFuturesProviders'"
                            class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer"
                            :class="{
                                'text-white bg-green-500 dark:bg-gray-800 border-l-4 border-green-500': activeTab ===
                                    'thirdpartyFuturesProviders',
                                'text-green-500 bg-white dark:bg-gray-700 dark:text-white border-l-4 border-gray-300 dark:border-gray-600': activeTab !==
                                    'thirdpartyFuturesProviders'
                            }">
                            {{ __('Futures Providers') }}
                        </a>
                    @else
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer"
                            :class="{
                                'text-white bg-green-500 dark:bg-gray-800 border-l-4 border-green-500': activeTab ===
                                    'thirdpartyFuturesProviders',
                                'text-green-500 bg-white dark:bg-gray-700 dark:text-white border-l-4 border-gray-300 dark:border-gray-600': activeTab !==
                                    'thirdpartyFuturesProviders'
                            }">
                            {{ __('Futures Providers') }} <span class="text-danger">*Disabled</span>
                        </a>
                    @endif
                </li>
            </ul>

            <div class="alert alert-danger">
                <div class="flex-1">
                    <span>
                        {{ __('Note') }}:
                    </span>
                    <span>
                        {{ __('Ensure that you incorporate your API keys and whitelist the IP address of your VPS within the provider\'s API settings in order to establish a seamless connection with the service provider.') }}
                    </span>
                </div>
            </div>
            @if (getExt(15) === 1)
                <div class="alert alert-danger">
                    <div class="flex-1">
                        <span>
                            {{ __('Note') }}:
                        </span>
                        <span>
                            {{ __('The futures provider must correspond to the regular provider for compatibility. For instance, enabling the Kucoin provider is a required for accessing Kucoin Futures.') }}
                        </span>
                    </div>
                </div>
            @endif
            <div class="flex-auto">
                <div class="tab-content tab-space">
                    <div x-show="activeTab === 'thirdpartyProviders'">
                        <div class="card">
                            <div class="card-header flex justify-between items-center">
                                <h4 class="card-title">{{ __('Providers') }}</h4>
                            </div>
                            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead
                                        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                {{ __('Provider') }} </th>
                                            <th scope="col" class="px-6 py-3">
                                                {{ __('API Connection') }}
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                {{ __('Status') }}
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                {{ __('Action') }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @forelse($providers->where('type',null) as $provider)
                                            <tr
                                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                                <th scope="row"
                                                    class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div class="flex  items-center">
                                                        <img class="avatar-content mr-3" style="width:110px;height:35px"
                                                            src="{{ getImage('assets/images/providers/' . strtolower($provider->title) . '.jpg') }}" />
                                                        {{ $provider->name }}

                                                    </div>
                                                </th>

                                                <td class="px-6 py-2">
                                                    @if ($provider->status == 1)
                                                        @if ($connection == 1)
                                                            <span
                                                                class="badge bg-success">{{ __('Connected Successfully') }}</span>
                                                        @elseif($connection == 0)
                                                            <span
                                                                class="badge bg-danger">{{ __('Connection Failed') }}</span>
                                                        @endif
                                                    @endif
                                                </td>

                                                <td class="px-6 py-2">
                                                    @if ($provider->development != 1)
                                                        @if ($provider->status == 1)
                                                            <span class="badge bg-success">{{ __('Active') }}</span>
                                                        @else
                                                            <span class="badge bg-warning">{{ __('Disabled') }}</span>
                                                        @endif
                                                    @else
                                                        <span class="badge bg-secondary">{{ __('In Development') }}</span>
                                                    @endif
                                                </td>
                                                <td class="px-6 py-2 space-y-2">
                                                    @if ($provider->development == 1)
                                                    @else
                                                        @if ($provider->installed == 1)
                                                            @if ($provider->status == 1)
                                                                <div class="space-x-2">
                                                                    <a href="{{ route('admin.provider.currencies.index', $provider->id) }}"
                                                                        class="btn btn-info btn-sm"
                                                                        title="Enable/Disable Currencies">
                                                                        {{ __('Currencies') }}
                                                                    </a>
                                                                    <a href="{{ route('admin.provider.markets.index', $provider->id) }}"
                                                                        class="btn btn-info btn-sm"
                                                                        title="Enable/Disable Market Pairs">
                                                                        {{ __('Markets') }}
                                                                    </a>
                                                                    <a href="{{ route('admin.provider.balances', $provider->id) }}"
                                                                        class="btn btn-info btn-sm"
                                                                        title="Check balances and debug errors in provider api connection">
                                                                        {{ __('Debug') }}
                                                                    </a>
                                                                    <a href="{{ route('admin.provider.refresh') }}"
                                                                        class="btn btn-icon btn-primary btn-sm"
                                                                        title="Refresh">
                                                                        <i class="bi bi-arrow-repeat"></i>
                                                                    </a>
                                                                </div>
                                                                <a href="{{ route('admin.provider.edit', $provider->id) }}"
                                                                    class="btn btn-icon btn-warning btn-sm"
                                                                    title="{{ __('Edit') }}">
                                                                    <i class="bi bi-pencil-square"></i>
                                                                </a>
                                                            @endif
                                                            @if ($provider->status == 0)
                                                                <button type="button"
                                                                    onclick="
                                                    $('#activateModal').find('.provider-name').text('{{ __($provider->name) }}');
                                                    $('#activateModal').find('input[name=id]').val('{{ $provider->id }}');"
                                                                    class="btn btn-icon btn-outline-success btn-sm"
                                                                    data-modal-toggle="activateModal"
                                                                    title="{{ __('Enable') }}">
                                                                    <i class="bi bi-eye"></i>
                                                                </button>
                                                            @else
                                                                <span title="{{ __('Disable') }}">
                                                                    <button
                                                                        type="button"onclick="
                                                        $('#deactivateModal').find('.provider-name').text('{{ __($provider->name) }}');
                                                        $('#deactivateModal').find('input[name=id]').val('{{ $provider->id }}');"
                                                                        class="btn btn-icon btn-outline-danger btn-sm"
                                                                        data-modal-toggle="deactivateModal">
                                                                        <i class="bi bi-eye-slash"></i>
                                                                    </button>
                                                                </span>
                                                            @endif
                                                        @else
                                                            @if ($provider->activated == 0)
                                                                <a href="{{ route('admin.provider.activater', [$provider->product_id]) }}"
                                                                    class="btn btn-icon btn-success btn-sm ml-1"
                                                                    title="{{ __('Verify License') }}">
                                                                    <i class="bi bi-check-lg"></i>
                                                                </a>
                                                            @else
                                                                <a href="{{ route('admin.provider.install', [$provider->product_id]) }}"
                                                                    class="btn btn-icon btn-dark btn-sm ml-1"
                                                                    title="{{ __('Install') }}">
                                                                    <i class="bi bi-download"></i>
                                                                </a>
                                                            @endif
                                                        @endif
                                                    @endif
                                                </td>
                                            </tr>
                                        @empty
                                            <tr>
                                                <td class="text-muted text-center" colspan="100%">
                                                    {{ __($empty_message) }}
                                                </td>
                                            </tr>
                                        @endforelse

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    @if (getExt(15) === 1)
                        <div x-show="activeTab === 'thirdpartyFuturesProviders'">
                            <div class="card">
                                <div class="card-header flex justify-between items-center">
                                    <h4 class="card-title">{{ __('Futures Providers') }}</h4>
                                </div>
                                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead
                                            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">
                                                    {{ __('Provider') }} </th>
                                                <th scope="col" class="px-6 py-3">
                                                    {{ __('API Connection') }}
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    {{ __('Status') }}
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    {{ __('Action') }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @forelse($providers->where('type','futures') as $provider)
                                                <tr
                                                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                                    <th scope="row"
                                                        class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <div class="flex  items-center">
                                                            <img class="avatar-content mr-3"
                                                                style="width:110px;height:35px"
                                                                src="{{ getImage('assets/images/providers/' . strtolower($provider->title) . '.jpg') }}" />
                                                            {{ $provider->name }}

                                                        </div>
                                                    </th>

                                                    <td class="px-6 py-2">
                                                        @if ($provider->status == 1)
                                                            @if ($connection == 1)
                                                                <span
                                                                    class="badge bg-success">{{ __('Connected Successfully') }}</span>
                                                            @elseif($connection == 0)
                                                                <span
                                                                    class="badge bg-danger">{{ __('Connection Failed') }}</span>
                                                            @endif
                                                        @endif
                                                    </td>

                                                    <td class="px-6 py-2">
                                                        @if ($provider->title === 'kucoinfutures')
                                                            @if ($provider->status == 1)
                                                                <span class="badge bg-success">{{ __('Active') }}</span>
                                                            @else
                                                                <span class="badge bg-warning">{{ __('Disabled') }}</span>
                                                            @endif
                                                        @else
                                                            <span
                                                                class="badge bg-secondary">{{ __('In Development') }}</span>
                                                        @endif
                                                    </td>
                                                    <td class="px-6 py-2 space-y-2">
                                                        @if ($provider->title === 'kucoinfutures')
                                                            @if ($provider->status == 1)
                                                                <div class="space-x-2">
                                                                    <a href="{{ route('admin.futures.provider.currencies.index', $provider->id) }}"
                                                                        class="btn btn-info btn-sm"
                                                                        title="Enable/Disable Currencies">
                                                                        {{ __('Currencies') }}
                                                                    </a>
                                                                    <a href="{{ route('admin.futures.provider.markets.index', $provider->id) }}"
                                                                        class="btn btn-info btn-sm"
                                                                        title="Enable/Disable Market Pairs">
                                                                        {{ __('Markets') }}
                                                                    </a>
                                                                    <a href="{{ route('admin.futures.provider.refresh') }}"
                                                                        class="btn btn-icon btn-primary btn-sm"
                                                                        title="Refresh">
                                                                        <i class="bi bi-arrow-repeat"></i>
                                                                    </a>
                                                                </div>
                                                                <a href="{{ route('admin.provider.edit', $provider->id) }}"
                                                                    class="btn btn-icon btn-warning btn-sm"
                                                                    title="{{ __('Edit') }}">
                                                                    <i class="bi bi-pencil-square"></i>
                                                                </a>
                                                            @endif
                                                            @if ($provider->status == 0)
                                                                <button type="button"
                                                                    onclick="
                                                    $('#activateModal').find('.provider-name').text('{{ __($provider->name) }}');
                                                    $('#activateModal').find('input[name=id]').val('{{ $provider->id }}');"
                                                                    class="btn btn-icon btn-outline-success btn-sm"
                                                                    data-modal-toggle="activateModal"
                                                                    title="{{ __('Enable') }}">
                                                                    <i class="bi bi-eye"></i>
                                                                </button>
                                                            @else
                                                                <span title="{{ __('Disable') }}">
                                                                    <button
                                                                        type="button"onclick="
                                                        $('#deactivateModal').find('.provider-name').text('{{ __($provider->name) }}');
                                                        $('#deactivateModal').find('input[name=id]').val('{{ $provider->id }}');"
                                                                        class="btn btn-icon btn-outline-danger btn-sm"
                                                                        data-modal-toggle="deactivateModal">
                                                                        <i class="bi bi-eye-slash"></i>
                                                                    </button>
                                                                </span>
                                                            @endif
                                                        @endif
                                                    </td>
                                                </tr>
                                            @empty
                                                <tr>
                                                    <td class="text-muted text-center" colspan="100%">
                                                        {{ __($empty_message) }}
                                                    </td>
                                                </tr>
                                            @endforelse

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection

@push('modals')
    <x-partials.modals.default-modal title="{{ __('Provider Activation Confirmation') }}"
        action="{{ route('admin.provider.activate') }}" submit="{{ __('Activate') }}" id="activateModal"
        done="reload">
        <div>
            <input type="hidden" name="id">
            <p>{{ __('Are you sure to activate') }} <span class="fw-bold currency-name"></span>
                {{ __('provider') }}?</p>
        </div>
    </x-partials.modals.default-modal>

    <x-partials.modals.default-modal title="{{ __('Provider Deactivation Confirmation') }}" btn="danger"
        action="{{ route('admin.provider.deactivate') }}" submit="{{ __('Deactivate') }}" id="deactivateModal"
        done="reload">
        <div>
            <input type="hidden" name="id">
            <p>{{ __('Are you sure to deactivate') }} <span class="fw-bold provider-name"></span>
                {{ __('provider') }}?</p>
        </div>
    </x-partials.modals.default-modal>
@endpush
