@extends('layouts.admin')

@section('content')
    <div class="card">

        <div class="relative overflow-x-auto  shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            {{ __('Title') }}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ __('Icon') }}
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
                    @forelse($sidebars as $key => $sidebar)
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ $sidebar->name }}
                            </th>
                            <td class="px-6 py-4">
                                <i class="bi bi-{{ $sidebar->icon }}">
                            </td>
                            <td class="px-6 py-4">
                                @if ($sidebar->status == 1)
                                    <span class="badge bg-success">{{ __('Active') }}</span>
                                @else
                                    <span class="badge bg-warning">{{ __('Disabled') }}</span>
                                @endif
                            </td>

                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    <a href="javascript:void(0)" data-id="{{ $key }}"
                                        class="btn btn-icon btn-sm btn-outline-danger" data-modal-toggle="removeModal"
                                        title="{{ __('Remove') }}"
                                        onclick="$('#removeModal').find('input[name=id]').val('{{ $key }}');">
                                        <i class="bi bi-trash"></i>
                                    </a>
                                    <a href="{{ route('admin.builder.edit', $key) }}"
                                        class="btn btn-icon btn-outline-warning btn-sm" title="{{ __('Edit') }}">
                                        <i class="bi bi-pencil-square"></i>
                                    </a>
                                    @if ($sidebar->status == 0)
                                        <button type="button" class="btn btn-icon btn-sm btn-outline-success"
                                            data-modal-toggle="activateModal"
                                            onclick="
                                            $('#activateModal').find('.page-name').text('{{ __($sidebar->name) }}');
                                            $('#activateModal').find('input[name=id]').val('{{ $key }}');"
                                            title="{{ __('Enable') }}">
                                            <i class="bi bi-eye"></i>
                                        </button>
                                    @else
                                        <button type="button" class="btn btn-icon btn-sm btn-outline-danger"
                                            onclick="
                                        $('#deactivateModal').find('.page-name').text('{{ __($sidebar->name) }}');
                                        $('#deactivateModal').find('input[name=id]').val('{{ $key }}');"
                                            data-modal-toggle="deactivateModal" title="{{ __('Disable') }}">
                                            <i class="bi bi-eye-slash"></i>
                                        </button>
                                    @endif
                                </a>
                            </td>
                        </tr>

                    @empty
                        <tr>
                            <td class="text-muted text-center py-5" colspan="100%">{{ __($empty_message) }}</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

    </div><!-- card end -->
@endsection


@push('modals')
    <x-partials.modals.default-modal title="{{ __('Page Dectivation Confirmation') }}" btn="danger"
        action="{{ route('admin.builder.deactivate') }}" submit="{{ __('Disable') }}" id="deactivateModal" done="reload">
        <input type="hidden" name="id" id="id">
        <span class="font-medium">{{ __('Page will be deactivated.') }}</span>
    </x-partials.modals.default-modal>

    <x-partials.modals.default-modal title="{{ __('Page Activation Confirmation') }}"
        action="{{ route('admin.builder.activate') }}" submit="{{ __('Activate') }}" id="activateModal" done="reload">
        <input type="hidden" name="id" id="id">
        <span class="font-medium">{{ __('Page will be activated.') }}</span>
    </x-partials.modals.default-modal>

    <x-partials.modals.default-modal title="{{ __('Page Removal Confirmation') }}" btn="danger"
        action="{{ route('admin.builder.delete') }}" submit="{{ __('Remove') }}" id="removeModal" done="reload">
        <input type="hidden" name="id" id="id">
        <span class="font-medium">{{ __('Page will be removed.') }}</span>
    </x-partials.modals.default-modal>
@endpush
@push('breadcrumb-plugins')
    <a href="{{ route('admin.builder.new') }}" class="btn btn-outline-primary"><i class="bi bi-plus-lg"></i>
        {{ __('New Page') }}</a>
@endpush
