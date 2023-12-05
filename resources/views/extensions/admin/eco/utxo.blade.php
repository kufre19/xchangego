@extends('layouts.admin')

@section('content')
    @if (!$isPrivateKeyEncrypted && $wallet !== null)
        <div class="alert alert-danger">
            {{ __('Before encrypting any of your wallet information, please make sure you have a backup of your private key. If you lose access to your private key, you will not be able to access your UTXO wallet') }}.
        </div>
    @endif
    <div class="card mb-5">
        <div class="card-header">
            <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300">{{ __('Details') }}</h4>
        </div>
        <div class="card-body">
            @if ($wallet !== null)
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-5">
                        <div>
                            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ __('Address') }}:</p>
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ $wallet->address }}</p>
                        </div>
                        @if (!$isPrivateKeyEncrypted)
                            <div>
                                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ __('Private Key') }}:</p>
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {{ $isPrivateKeyEncrypted ? decrypt($wallet->private_key) : $wallet->private_key }}</p>
                            </div>
                        @endif
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ __('Balance') }}:</p>
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ $wallet->balance }}
                            {{ $wallet->chain }}
                            (<span
                                class="text-warning">~{{ getAmount(getRate($wallet->chain . 'USDT') * $wallet->balance, 2) }}
                                USDT</span>)</p>
                    </div>
                </div>
            @else
                <form action="{{ route('admin.eco.blockchain.utxo.store', $chain) }}" method="POST">
                    @csrf
                    <button type="submit"
                        class="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        {{ __('Create Wallet') }}
                    </button>
                </form>
            @endif
        </div>
    </div>

    @if ($utxos !== null && $wallet !== null)
        <div class="card mt-5">
            <div class="card-header">
                <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300">{{ __('Transactions') }}</h4>
                <form action="{{ route('admin.eco.blockchain.utxo.clean', $chain) }}" method="POST">
                    @csrf
                    <button type="submit" class="btn btn-outline-danger">
                        {{ __('Remove Spent') }} UTXOs
                    </button>
                </form>
            </div>
            <div class="bg-white dark:bg-gray-800">
                <table class="table-auto w-full">
                    <thead>
                        <tr class="text-left font-medium text-gray-700 dark:text-gray-300">
                            <th class="px-4 py-2">{{ __('Transaction ID') }}</th>
                            <th class="px-4 py-2">{{ __('Amount') }}</th>
                            <th class="px-4 py-2">{{ __('Status') }}</th>
                            <th class="px-4 py-2">{{ __('Date') }}</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700 dark:text-gray-300">
                        @foreach ($utxos as $utxo)
                            <tr class="border-t border-gray-200 dark:border-gray-700">
                                <td class="px-4 py-2">{{ $utxo->txHash }}</td>
                                <td class="px-4 py-2">{{ $utxo->value }}</td>
                                <td class="px-4 py-2">{{ $utxo->status }}</td>
                                <td class="px-4 py-2">{{ $utxo->created_at->format('Y-m-d H:i:s') }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endif
@endsection


@push('breadcrumb-plugins')
    @if (!$isPrivateKeyEncrypted && $wallet !== null)
        <button class="btn btn-outline-primary" onclick="encryptInput()">{{ __('Encrypt') }}</button>
    @endif
    <a href="{{ route('admin.eco.blockchain.index', $chain) }}" class="btn btn-outline-secondary">
        <i class="bi bi-chevron-left"></i> {{ __('Back') }}
    </a>
@endpush
@if ($wallet !== null)
    @section('page-scripts')
        <script>
            function encryptInput() {
                $.ajax({
                    method: "post",
                    headers: {
                        "X-CSRF-TOKEN": "{{ csrf_token() }}",
                    },
                    url: "{{ route('admin.eco.blockchain.utxo.encryptData', $chain) }}",
                    success: function(response) {
                        notify(response.type, response.message)
                        if (response.type == 'success') {
                            window.location.reload();
                        }
                    },
                    error: function(error) {
                        console.error(error)
                        notify('error', 'An error occurred while encrypting the input value.');
                    }
                });
            }
        </script>
    @endsection
@endif
