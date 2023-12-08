@extends('layouts.admin')

@section('content')
    <div class="card">
        <div class="card-header flex justify-between items-center">
            <h4 class="card-title">{{ __('Balances') }}</h4>

        </div>
        <div class="dark:bg-gray-800 dark:text-white">
            <table class="w-full table-auto">
                <thead>
                    <tr class="bg-gray-300 dark:bg-gray-700">
                        <th class="px-4 py-2">{{ __('Currency') }}</th>
                        <th class="px-4 py-2">{{ __('Available') }}</th>
                        <th class="px-4 py-2">{{ __('Used') }}</th>
                        <th class="px-4 py-2">{{ __('Total') }}</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($currencies as $key => $currency)
                        @if (isset($currency['free']) && isset($currency['used']) && isset($currency['total']))
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                                <td class="px-4 py-2 flex items-center">
                                    <img class="h-8 w-8 mr-2"
                                        src="{{ getImage('assets/images/cryptoCurrency/' . strtolower($key) . '.png') }}"
                                        alt="{{ $key }}">
                                    {{ $key }}
                                </td>
                                <td class="px-4 py-2">{{ number_format($currency['free'], 8) }}</td>
                                <td class="px-4 py-2">{{ number_format($currency['used'], 8) }}</td>
                                <td class="px-4 py-2">{{ number_format($currency['total'], 8) }}</td>
                            </tr>
                        @endif
                    @empty
                        <tr>
                            <td class="px-4 py-2 text-center text-gray-500 dark:text-gray-400" colspan="4">
                                {{ __($empty_message) }}</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

    </div>
@endsection

@push('breadcrumb-plugins')
    <a href="{{ route('admin.provider.index') }}" class="btn btn-outline-secondary"><i class="bi bi-chevron-left"></i>
        {{ __('Back') }}</a>
@endpush
