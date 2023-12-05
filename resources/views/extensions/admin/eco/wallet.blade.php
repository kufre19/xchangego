@extends('layouts.admin')

@section('page-style')
    <style>
        .qr-code-container {
            background-color: #ffffff;
            padding: 10px;
            max-width: 220px;
            margin: 0 auto;
        }

        .qr-code-wrapper img {
            width: 100%;
            height: auto;
        }
    </style>
@endsection
@section('content')
    @if (!$isMnemonicEncrypted && !$isXpubEncrypted && !$isPrivateKeyEncrypted)
        <div class="alert alert-danger">
            {{ __('Before encrypting any of your wallet information, please make sure you have a backup of your mnemonic, xpub and private key. If you lose access to your mnemonic, xpub and private key, you will not be able to access your wallet') }}.
        </div>
    @endif
    <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <div class="col-span-1 space-y-5">
            <div class="card rounded-2 overflow-hidden shadow">
                <div class="card-header">
                    <div class="card-title">
                        <h5 class="title-gradient">{{ __('Network information') }}</h5>
                    </div>
                </div>
                <div class="card-body">
                    <ul class="">
                        <li class=" flex justify-between items-center">
                            {{ __('Name') }}
                            <span class="h6 mt-1">{{ $network->name }}</span>
                        </li>
                        <li class=" flex justify-between items-center">
                            {{ __('Symbol') }}
                            <span class="h6 mt-1">{{ $network->chain }}</span>
                        </li>
                        <li class="flex justify-between items-center">
                            <span>{{ __('Status') }}</span>
                            <span
                                class="h6 mt-1 badge bg-{{ $network->status == 1 ? 'success' : 'danger' }}">{{ $network->status == 1 ? 'Active' : 'Disabled' }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            @if ($wallet != null)
                <div class="card rounded-2 overflow-hidden shadow pb-5">
                    <div class="card-header">
                        <div class="card-title">
                            <h5 class="title-gradient">{{ __('QR Code') }}</h5>
                        </div>
                    </div>
                    <div class="card-body text-center qr-code-container">
                        <div class="qr-code-wrapper">
                            {!! QrCode::size(200)->backgroundColor(255, 255, 255)->generate($wallet->address) !!}
                        </div>
                    </div>
                </div>
            @endif
        </div>
        <div class="xs:col-span-1 md:col-span-2 lg:col-span-3">
            <div class="card rounded-2 overflow-hidden shadow">
                <div class="card-header">
                    <div class="card-title">
                        <h5 class="title-gradient">{{ __('Wallet') }}</h5>
                    </div>
                </div>
                @if ($wallet != null)
                    <div class="card-body">
                        <ul class=" space-y-2">
                            <li class=" flex justify-between items-center">
                                <span class="mr-2">{{ __('Mnemonic') }}</span>
                                @if ($wallet->mnemonic != null)
                                    <input type="text" class="form-control mr-2" readonly
                                        value="{{ $isMnemonicEncrypted ? decrypt($wallet->mnemonic) : $wallet->mnemonic }}">
                                    @if (!$isMnemonicEncrypted)
                                        <button class="btn btn-outline-primary"
                                            onclick="encryptInput('mnemonic')">{{ __('Encrypt') }}</button>
                                    @endif
                                @else
                                    <button class="btn btn-outline-warning" data-modal-toggle="addMnemonic">
                                        {{ __('Add Mnemonic') }}
                                    </button>
                                @endif
                            </li>
                            @if ($wallet->chain !== 'SOL')
                                <li class=" flex justify-between items-center">
                                    <span class="mr-2">{{ __('Xpub') }}</span>
                                    @if ($wallet->xpub != null)
                                        <input type="text" class="form-control mr-2" readonly
                                            value="{{ $isXpubEncrypted ? decrypt($wallet->xpub) : $wallet->xpub }}">
                                        @if (!$isXpubEncrypted)
                                            <button class="btn btn-outline-primary"
                                                onclick="encryptInput('xpub')">{{ __('Encrypt') }}</button>
                                        @endif
                                    @else
                                        <button class="btn btn-outline-warning" data-modal-toggle="addXpub">
                                            {{ __('Add Xpub') }}
                                        </button>
                                    @endif
                                </li>
                            @endif
                            @if (!in_array($network->chain, ['ALGO', 'SOL']))
                                <li class=" flex justify-between items-center">
                                    <span class="mr-2">{{ __('Private Key') }}</span>
                                    @if ($wallet->private_key != null)
                                        <input type="text" class="form-control mr-2" readonly
                                            value="{{ $isPrivateKeyEncrypted ? decrypt($wallet->private_key) : $wallet->private_key }}">
                                        @if (!$isPrivateKeyEncrypted)
                                            <button class="btn btn-outline-primary"
                                                onclick="encryptInput('private_key')">{{ __('Encrypt') }}</button>
                                        @endif
                                    @else
                                        <button class="btn btn-outline-warning" data-modal-toggle="addPrivateKey">
                                            {{ __('Add Private Key') }}
                                        </button>
                                    @endif
                                </li>
                            @endif
                            <li class=" flex justify-between items-center">
                                <span class="mr-2">{{ __('Address') }}</span>
                                <input type="text" class="form-control" readonly value="{{ $wallet->address }}">
                            </li>
                            @if (!in_array($network->chain, ['BCH']))
                                <li class=" flex justify-between items-center">
                                    <span class="mr-2">{{ __('Balance') }}</span>
                                    <input type="text" class="form-control" readonly
                                        value="{{ $wallet->balance }} {{ $wallet->chain !== 'TRON' ? $wallet->chain : 'TRX' }}">
                                </li>
                            @endif
                        </ul>
                    </div>
                    <div class="card-footer text-end">
                        <button class="btn btn-outline-danger"
                            data-modal-toggle="removeWallet">{{ __('Remove Wallet') }}</button>
                    </div>
                    {{-- @endif --}}
                @else
                    <div class="card-footer">
                        @if ($network->chain != 'ALGO')
                            <a href="{{ route('admin.eco.blockchain.wallet.create', $network->chain) }}">
                                <button class="btn btn-outline-success mr-1">{{ __('Create Wallet') }}</button>
                            </a>
                        @endif
                        <button class="btn btn-outline-warning" data-modal-toggle="addWallet">
                            {{ __('Add Wallet') }}
                        </button>
                    </div>
                @endif
            </div>
        </div>
    </div>
    @if (isset($wallet) && $wallet->chain == 'BTC')
        <div class="transactions-table">
            <div class="card mt-5">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                        <tr class="text-gray-500 dark:text-gray-400">
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                {{ __('Date') }}
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                {{ __('Transaction ID') }}
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                {{ __('Amount') }}
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                {{ __('Status') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        @foreach ($transactions as $transaction)
                            <tr class="text-gray-700 dark:text-gray-300">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ date('Y-m-d H:i:s', $transaction['time'] / 1000) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <a href="https://www.blockchain.com/btc/tx/{{ $transaction['hash'] }}" target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                                        {{ $transaction['hash'] }}
                                    </a>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <!-- Display the sum of outputs -->
                                    {{ array_sum(array_map(function ($output) {return $output->getValue();}, $transaction['outputs'])) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            {{ $transaction['blockNumber'] !== null ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100' : 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100' }}">
                                        {{ $transaction['blockNumber'] !== null ? 'confirmed' : 'unconfirmed' }}
                                    </span>
                                </td>

                            </tr>
                        @endforeach

                    </tbody>
                </table>
            </div>
        </div>
    @endif
@endsection
@push('modals')
    <x-partials.modals.default-modal title="{{ __('Wallet Removal Confirmation') }}"
        action="{{ route('admin.eco.blockchain.wallet.remove', $network->chain) }}" submit="{{ __('Remove') }}"
        id="removeWallet" done="reload">
        <p><span class="fw-bold">{{ __('Are your sure you want to remove the wallet?') }}</span> </p>
        <ul class="">
            <li class=" -danger">{{ __('All') }} <span class="fw-bold">{{ __('main wallets') }} </span>
                {{ __('need to be removed that made after adding this wallet.') }}
            </li>
            <li class=" -danger">{{ __('All') }} <span class="fw-bold">{{ __('ledger') }} </span>
                {{ __('accounts need to be removed that made after adding this wallet.') }}
            </li>
            <li class=" -danger">{{ __('All') }} <span class="fw-bold">{{ __('fees') }}
                </span>{{ __('accounts need to be removed that made after adding this wallet.') }}
            </li>
            <li class=" -danger">{{ __('All') }} <span class="fw-bold">{{ __('Tokens') }} </span>
                {{ __('created on this wallet need to be removed.') }}
            </li>
        </ul>
    </x-partials.modals.default-modal>
    <x-partials.modals.default-modal title="{{ __('Add Wallet') }}"
        action="{{ route('admin.eco.blockchain.wallet.add', $network->chain) }}" submit="{{ __('Add') }}"
        id="addWallet">
        <div class="mb-1">
            <label class="form-label" for="address">{{ __('Wallet Address') }}</label>
            <input type="text" class="form-control" name="address">
        </div>
        <div class="mb-1">
            <label class="form-label" for="private_key">{{ __('Wallet Private Key') }}</label>
            <input type="text" class="form-control" name="private_key">
        </div>
        @if (in_array($network->chain, ['BNB', 'SOL']))
            <div class="mb-1">
                <label class="form-label" for="mnemonic">{{ __('Wallet Mnemonic') }}</label>
                <input type="text" class="form-control" name="mnemonic">
            </div>
        @else
            <div class="mb-1">
                <label class="form-label" for="xpub">{{ __('Wallet XPub') }}</label>
                <input type="text" class="form-control" name="xpub">
            </div>
        @endif
    </x-partials.modals.default-modal>\
    <x-partials.modals.default-modal title="{{ __('Add Mnemonic') }}"
        action="{{ route('admin.eco.blockchain.wallet.add.mnemonic', $network->chain) }}" submit="{{ __('Add') }}"
        id="addMnemonic" done="reload">
        <p>{{ __('Please enter the mnemonic:') }}</p>
        <input type="text" class="form-control" name="mnemonic" required>
    </x-partials.modals.default-modal>

    <x-partials.modals.default-modal title="{{ __('Add Xpub') }}"
        action="{{ route('admin.eco.blockchain.wallet.add.xpub', $network->chain) }}" submit="{{ __('Add') }}"
        id="addXpub" done="reload">
        <p>{{ __('Please enter the xpub:') }}</p>
        <input type="text" class="form-control" name="xpub" required>
    </x-partials.modals.default-modal>

    <x-partials.modals.default-modal title="{{ __('Add Private Key') }}"
        action="{{ route('admin.eco.blockchain.wallet.add.privateKey', $network->chain) }}" submit="{{ __('Add') }}"
        id="addPrivateKey" done="reload">
        <p>{{ __('Please enter the private key:') }}</p>
        <input type="text" class="form-control" name="private_key" required>
    </x-partials.modals.default-modal>
@endpush
@push('breadcrumb-plugins')
    <a href="{{ route('admin.eco.blockchain.index') }}" class="btn btn-outline-primary"><i
            class="bi bi-chevron-left"></i>
        {{ __('Back') }}</a>
@endpush

@section('page-scripts')
    <script>
        function encryptInput(inputName) {
            $.ajax({
                method: "post",
                headers: {
                    "X-CSRF-TOKEN": "{{ csrf_token() }}",
                },
                data: {
                    type: inputName
                },
                url: "{{ route('admin.eco.blockchain.wallet.encryptData', $network->chain) }}",
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
