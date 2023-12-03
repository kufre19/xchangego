@extends('layouts.admin')

@section('content')
    <div class="grid xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

        <div class="xs:col-span-1 md:col-span-2 lg:col-span-3">
            <div class="row">
                <div class="col-xl-9 lg:col-span-7 md:col-span-7">
                    <div class="card">
                        <form action="{{ route('admin.users.update', [$user->id]) }}" method="POST"
                            enctype="multipart/form-data">
                            @csrf
                            <div class="card-body">
                                <div class="card-header">
                                    <h5 class="card-title border-bottom pb-2">{{ $user->fullname }} {{ __('Information') }}
                                    </h5>
                                </div>
                                <div class="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label for="firstname"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('First Name') }}</label>
                                        <input type="text"name="firstname"
                                            value="{{ isset($user->kyc_application) ? $user->kyc_application->firstName : $user->firstname }}"
                                            class="form-control">
                                    </div>
                                    <div>
                                        <label for="lastname"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Last Name') }}</label>
                                        <input type="text"name="lastname"
                                            value="{{ isset($user->kyc_application) ? $user->kyc_application->lastName : $user->lastname }}"
                                            class="form-control">
                                    </div>
                                    <div>
                                        <label for="email"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Email') }}</label>
                                        <input type="email" name="email"
                                            value="{{ isset($user->kyc_application) ? $user->kyc_application->email : $user->email }}"
                                            class="form-control">
                                    </div>
                                    <div>
                                        <label for="phone"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Phone Number') }}</label>
                                        <input name="phone" type="tel"
                                            value="{{ isset($user->kyc_application) ? $user->kyc_application->phone : $user->phone }}"
                                            placeholder=" {{ __('+1 202-555-0176') }}" class="form-control">
                                    </div>
                                    <div>
                                        <label for="address"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Address') }}</label>
                                        <input type="text"name="address"
                                            value="{{ isset($user->kyc_application) ? $user->kyc_application->address1 : $user->address }}"
                                            placeholder=" {{ __('House number, street address') }}" class="form-control">
                                    </div>
                                    <div>
                                        <label for="city"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('City') }}</label>
                                        <input type="text"name="city"
                                            value="{{ isset($user->kyc_application) ? $user->kyc_application->city : $user->city }}"
                                            class="form-control">
                                    </div>
                                    @if (isset($user->kyc_application))
                                        <div>
                                            <label for="city"
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('State') }}</label>
                                            <input type="text" name="state"
                                                value="{{ $user->kyc_application->state ?? '' }}" class="form-control">
                                        </div>
                                    @endif
                                    <div>
                                        <label for="zip"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Zip/Postal') }}</label>
                                        <input type="text" name="zip"
                                            value="{{ isset($user->kyc_application) ? $user->kyc_application->zip : $user->zip }}"
                                            class="form-control">
                                    </div>
                                    <div>
                                        <label for="country"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Country') }}</label>

                                        <select id="country" name="country" placeholder="Country"
                                            aria-describedby="country"
                                            value="{{ isset($user->kyc_application) ? $user->kyc_application->country : $user->country }}"
                                            class="form-control">
                                            @foreach (getCountries() as $country)
                                                <option value="{{ $country }}"
                                                    {{ (isset($user->kyc_application) ? $user->kyc_application->country : $user->country) === $country ? 'selected' : '' }}>
                                                    @lang($country)</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div>
                                        <label for="password"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            {{ __('Password') }}
                                        </label>
                                        <input type="password" id="password" name="password" class="form-control"
                                            placeholder="{{ __('Leave blank if you don\'t want to change') }}"
                                            autocomplete="new-password">
                                        <div id="password-requirements" class="mt-2 text-sm text-red-600"></div>
                                        <div id="password-strength" class="mt-2"></div>
                                    </div>

                                    <script>
                                        const passwordInput = document.getElementById('password');
                                        const passwordStrength = document.getElementById('password-strength');
                                        const passwordRequirements = document.getElementById('password-requirements');

                                        passwordInput.addEventListener('input', function() {
                                            const password = passwordInput.value;
                                            const strength = calculatePasswordStrength(password);

                                            if (password.length === 0) {
                                                passwordStrength.textContent = '';
                                                return;
                                            }

                                            if (password.length < 8) {
                                                passwordStrength.textContent = 'Password must be at least 8 characters long.';
                                                passwordStrength.style.color = 'red';
                                                return;
                                            }

                                            let requirements = [];

                                            if (!/[a-z]/.test(password)) {
                                                requirements.push('at least one lowercase letter');
                                            }

                                            if (!/[A-Z]/.test(password)) {
                                                requirements.push('at least one uppercase letter');
                                            }

                                            if (!/[0-9]/.test(password)) {
                                                requirements.push('at least one number');
                                            }

                                            if (!/[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/.test(password)) {
                                                requirements.push('at least one symbol');
                                            }

                                            if (requirements.length > 0) {
                                                passwordRequirements.textContent = 'Password must contain ' + requirements.join(', ') + '.';
                                                passwordRequirements.style.color = 'red';
                                                passwordStrength.textContent = '';
                                            } else {
                                                passwordRequirements.textContent = '';
                                                passwordStrength.textContent = 'Strong password.';
                                                passwordStrength.style.color = 'green';
                                            }
                                        });

                                        function calculatePasswordStrength(password) {
                                            return password.length / 10;
                                        }
                                    </script>

                                    @if (isset($user->kyc_application))
                                        <div>
                                            <label for="kyc"
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('KYC Status') }}</label>
                                            <div class="input-group">
                                                <input value="{{ $user->kyc_application->status }}">
                                                <span><a class="text-white"
                                                        href="{{ route('admin.kyc.view', [$user->kyc_application->id, 'kyc_details']) }}">{{ __('View') }}</a></span>
                                            </div>
                                        </div>
                                    @endif
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="submit" class="btn btn-outline-success">{{ __('Save Changes') }}</button>
                            </div>
                        </form>
                    </div>
                    <br>
                </div>
            </div>
        </div>
        <div class="col-span-1 space-y-4">
            <div class="card">
                <div class="card-body">
                    <a href="#">
                        <img src="{{ getImage(imagePath()['profileImage']['path'] . '/' . $user->profile_photo_path, imagePath()['profileImage']['size']) }}"
                            alt="{{ __('Profile Image') }}" class="rounded-full">
                    </a>
                    <div>

                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {{ $user->fullname }}
                        </h5>
                        <span class="text-small">{{ __('Joined At') }}
                            <strong>{{ showDateTime($user->created_at, 'd M, Y h:i A') }}</strong></span>

                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="flex items-center justify-between mb-4">
                        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                            {{ __('User information') }}
                        </h5>

                    </div>
                    <div class="flow-root">
                        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                            @if ($refer_by)
                                <li class="list-group-item flex justify-between items-center">
                                    <span class="float-start">{{ __('Referred By') }}</span>
                                    <span class="float-end text-muted">{{ __($refer_by->username) }}</span>
                                </li>
                            @endif
                            </p>

                        </ul>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        @switch($user->status)
                            @case(1)
                                <span class="badge rounded-pill bg-success">{{ __('Active') }}</span>
                            @break

                            @case(0)
                                <span class="badge rounded-pill bg-danger">{{ __('Banned') }}</span>
                            @break
                        @endswitch
                    </div>
                </div>
            </div>
        </div>

    </div>

    @if (getExt(10) === 1)
        <div class="alert alert-danger">
            <strong>{{ __('Warning') }}!</strong>
            {{ __('Primary wallets will not show in the table. You can only view them in the ecosystem addresses page') }}.
        </div>
    @endif
    <livewire:wallets-table :user="$user->id" />

    <br>

    <livewire:transactions-table :user="$user->id" />
@endsection

@push('modals')

    <x-partials.modals.default-modal title="{{ __('Create Wallet') }}" action="{{ route('admin.users.wallet.create') }}"
        submit="{{ __('Create') }}" id="createWallet">
        <div>
            <input type="hidden" name="user_id" class="hidden" value="{{ $user->id }}">
            <div>
                <label>{{ __('Type') }}<span class="text-danger">*</span></label>
                <select id="wallet_type" name="type" class="form-control">
                    <option selected>{{ __('Select Type') }}</option>
                    <option value="funding">{{ __('Funding') }}</option>
                    <option value="trading">{{ __('Trading') }}</option>
                    <option value="locked">{{ __('Locked') }}</option>
                    <option value="available">{{ __('Available') }}</option>

                    @if (getExt(10) === 1)
                        <option value="primary">{{ __('Primary') }}</option>
                    @endif
                </select>
            </div>
            <div>
                <label>{{ __('Symbol') }}<span class="text-danger">*</span></label>
                <select id="symbol_select" name="symbol" class="form-control">
                </select>
            </div>
        </div>
    </x-partials.modals.default-modal>

    <x-partials.modals.default-modal title="{{ __('Update Transaction Status') }}" action="{{ route('admin.users.transaction.update.status', ['transactionId' => '']) }}" submit="{{ __('Save Changes') }}" id="updateStatusModal">
        <div>
            <input type="hidden" name="transactionId" id="transactionId">
            <div>
                <label>{{ __('Status') }}<span class="text-danger">*</span></label>
                <select id="status" name="status" class="form-control">
                    <option value="1">{{ __('Success') }}</option>
                    <option value="2">{{ __('Pending') }}</option>
                    <option value="3">{{ __('Cancelled') }}</option>
                </select>
            </div>
        </div>
    </x-partials.modals.default-modal>
    





    <x-partials.modals.default-modal title="{{ __('Add / Subtract Balance') }}"
        action="{{ route('admin.users.addSubBalanceFrozen', $user->id) }}" submit="{{ __('Submit') }}"
        id="addSubModalFrozen">
        <div>
            <input type="hidden" name="symbol">
            <select id="act" name="act"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="1" checked>{{ __('Add Balance') }}</option>
                <option value="0">{{ __('Subtract Balance') }}</option>
            </select>
        </div>

        <div>
            <label>{{ __('Amount') }}<span class="text-danger">*</span></label>
            <div class="input-group">
                <input type="text" name="amount" placeholder="{{ __('Please provide positive amount') }}">
                <span id="input-symbol-frozen"></span>
            </div>
        </div>
    </x-partials.modals.default-modal>

    <x-partials.modals.default-modal title="{{ __('Create Frozen Wallet') }}"
        action="{{ route('admin.users.wallet.frozen.create') }}" submit="{{ __('Create') }}" id="createFrozenWallet">
        <div>
            <input type="hidden" name="user_id" class="hidden" value="{{ $user->id }}">
            <label>{{ __('Symbol') }}<span class="text-danger">*</span></label>
            <input type="text" name="symbol" class="form-control">
        </div>
        <div>
            <label>{{ __('Hover Text') }}<span class="text-danger">*</span></label>
            <textarea type="text" name="text" class="form-control"></textarea>
        </div>
    </x-partials.modals.default-modal>
    <x-partials.modals.default-modal title="{{ __('Add / Subtract Balance') }}"
        action="{{ route('admin.users.addSubBalance', $user->id) }}" submit="{{ __('Submit') }}" id="addSubModal">
        <div>
            <input type="hidden" name="address">
            <input type="hidden" name="symbol">
            <select id="act" name="act"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="1" checked>{{ __('Add Balance') }}</option>
                <option value="0">{{ __('Subtract Balance') }}</option>
            </select>
        </div>

        <div>
            <label>{{ __('Amount') }}<span class="text-danger">*</span></label>
            <div class="input-group">
                <input type="text" name="amount" placeholder="{{ __('Please provide positive amount') }}">
                <span id="input-symbol"></span>
            </div>
        </div>
    </x-partials.modals.default-modal>
@endpush
@push('breadcrumb-plugins')
    <a href="{{ route('admin.users.all') }}" class="btn btn-outline-secondary"><i class="bi bi-chevron-left mr-1"></i>
        {{ __('Back') }}</a>
@endpush

@section('page-scripts')
    <script>
        "use strict";

        $(document).ready(function() {
            const symbolsForWalletType = {
                "funding": [],
                "trading": [],
                "locked": [],
                "available": [],
                "primary": []
            };

            // fetch symbols from server for each wallet type
            $.getJSON("/admin/user/" + {{ $user->id }} + "/wallets/fetch", function(data) {
                ["funding", "trading","available","locked"].forEach(function(type) {
                    symbolsForWalletType[type] = data[type];
                    symbolsForWalletType["locked"] = data["funding"];
                    symbolsForWalletType["available"] = data["funding"];

                    console.log(symbolsForWalletType);
                });
            });

            $.getJSON("/admin/user/" + {{ $user->id }} + "/wallets/eco", function(data) {
                symbolsForWalletType["primary"] = data;
            });

            // populate symbol select box with symbols of selected wallet type
            $("#wallet_type").change(function() {
                let symbolSelect = $("#symbol_select");
                if ($(this).val() !== "Select Type") {
                    let selectedType = $(this).val();
                    let symbols = symbolsForWalletType[selectedType];

                    symbolSelect.empty();
                    symbols.forEach(function(symbol) {
                        symbolSelect.append(new Option(symbol, symbol));
                    });
                } else {
                    symbolSelect.empty();
                }
            });

            // trigger change event on page load to populate symbol select box
            $("#wallet_type").trigger("change");
        });
    </script>

    <script>
        function openStatusModal(transactionId, currentStatus) {
        // Set the value of hidden input field and select field
        document.getElementById('transactionId').value = transactionId;
        document.getElementById('status').value = currentStatus;

        // Set the action attribute for the form in the modal
        let updateForm = document.getElementById('updateStatusModal').querySelector('form');
        updateForm.action = "{{ route('admin.users.transaction.update.status', '') }}/" + transactionId;

        // Open the modal
        // $('#updateStatusModal').modal('show');
    }
    </script>
@endsection
