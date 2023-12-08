<x-guest-layout>
    <style>
        .alert {
            display: none;
            background-color: #f44336;
            color: white;
            padding: 15px;
            margin-bottom: 15px;
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 100;
            text-align: center;
        }
    </style>
    <div class="alert" id="alertBox">
        {{ __('Invalid CSRF token') }}. <a href="#" onclick="location.reload();">{{ __('Click here to refresh the page') }}.</a>
    </div>

    <script>
        function verifyCsrfToken(token) {
            fetch('/verify-csrf', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': token
                    },
                    body: JSON.stringify({
                        _token: token
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (!data.valid) {
                        var alertBox = document.getElementById('alertBox');
                        alertBox.style.display = 'block';
                    }
                })
                .catch(error => console.error('Error:', error));
        }

        document.addEventListener('DOMContentLoaded', () => {
            const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
            if (csrfTokenMeta && csrfTokenMeta.content) {
                verifyCsrfToken(csrfTokenMeta.content);
            }
        });
    </script>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div
            class="grid h-screen place-items-center max-w-screen-xl px-4 py-8 mx-auto lg:gap-20 lg:py-16 lg:grid-cols-12">
            <div class="w-full p-6 mx-auto bg-white rounded-lg shadow dark:bg-gray-800 sm:max-w-xl lg:col-span-6 sm:p-8">
                <x-slot class="inline-flex items-center mb-4 text-xl font-semibold text-gray-900 dark:text-white"
                    name="logo">
                    <x-jet-authentication-card-logo />
                </x-slot>

                <x-jet-validation-errors class="mb-4" />
                <h1 class="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                    {{ __('Create your Account') }}
                </h1>
                <p class="text-sm font-light text-gray-500 dark:text-gray-300">
                    {{ __('Start trading in seconds. Already have an account') }}? <a href="{{ route('login') }}"
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500">{{ __('Login here') }}</a>.
                </p>
                <form class="mt-4 space-y-6 sm:mt-6" method="POST" id="registerForm" action="{{ route('register') }}">
                    @csrf
                    <div class="grid gap-6 sm:grid-cols-2">
                        <div>
                            <div>
                                <x-jet-label for="firstname" value="{{ __('Firstname') }}" />
                                <x-jet-input id="firstname" class="block mt-1 w-full" type="text" name="firstname"
                                    :value="old('firstname')" required autofocus autocomplete="given-name" />
                            </div>
                            @error('firstname', 'register')
                                <span class="mt-2 text-sm text-red-600">{{ $message }}</span>
                            @enderror
                        </div>
                        <div>
                            <div>
                                <x-jet-label for="lastname" value="{{ __('Lastname') }}" />
                                <x-jet-input id="lastname" class="block mt-1 w-full" type="text" name="lastname"
                                    :value="old('lastname')" required autocomplete="family-name" />
                            </div>
                            @error('lastname', 'register')
                                <span class="mt-2 text-sm text-red-600">{{ $message }}</span>
                            @enderror
                        </div>
                        <div>
                            <div>
                                <x-jet-label for="username" value="{{ __('Username') }}" />
                                <x-jet-input id="username" class="block mt-1 w-full" type="text" name="username"
                                    :value="old('username')" required autocomplete="username" />
                            </div>
                            @error('username', 'register')
                                <span class="mt-2 text-sm text-red-600">{{ $message }}</span>
                            @enderror
                        </div>


                        <div>
                            <div>
                                <x-jet-label for="email" value="{{ __('Email') }}" />
                                <x-jet-input id="email" class="block mt-1 w-full" type="email" name="email"
                                    :value="old('email')" required />
                            </div>
                            @error('email', 'register')
                                <span class="mt-2 text-sm text-red-600">{{ $message }}</span>
                            @enderror
                        </div>

                        <div>
                            <div>
                                <x-jet-label for="password" value="{{ __('Password') }}" />
                                <x-jet-input id="password" class="block mt-1 w-full" type="password" name="password"
                                    required autocomplete="new-password" />
                            </div>
                            <div id="password-requirements" class="mt-2 text-sm text-red-600"></div>
                            <div id="password-strength" class="mt-2 text-sm"></div>
                            @error('password', 'register')
                                <span class="mt-2 text-sm text-red-600">{{ $message }}</span>
                            @enderror
                        </div>

                        <div>
                            <div>
                                <x-jet-label for="password_confirmation" value="{{ __('Confirm Password') }}" />
                                <x-jet-input id="password_confirmation" class="block mt-1 w-full" type="password"
                                    name="password_confirmation" required autocomplete="new-password" />
                            </div>
                            <div id="password-match" class="mt-2 text-sm"></div>
                            @error('password_confirmation', 'register')
                                <span class="mt-2 text-sm text-red-600">{{ $message }}</span>
                            @enderror
                        </div>

                        <script>
                            const passwordInput = document.getElementById('password');
                            const confirmPasswordInput = document.getElementById('password_confirmation');
                            const passwordRequirements = document.getElementById('password-requirements');
                            const passwordStrength = document.getElementById('password-strength');
                            const passwordMatch = document.getElementById('password-match');

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

                            confirmPasswordInput.addEventListener('input', function() {
                                const password = passwordInput.value;
                                const confirmPassword = confirmPasswordInput.value;

                                if (password === confirmPassword) {
                                    passwordMatch.textContent = 'Password matches.';
                                    passwordMatch.style.color = 'green';
                                } else {
                                    passwordMatch.textContent = 'Password does not match.';
                                    passwordMatch.style.color = 'red';
                                }
                            });

                            function calculatePasswordStrength(password) {
                                return password.length / 10;
                            }
                        </script>


                        @if ($plat->system->phone == 1)
                            <div>
                                <label for="country"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Country') }}</label>

                                <select id="country" name="country" placeholder="Country" aria-describedby="country"
                                    class="form-control" onchange="updatePhoneNumberPrefix();">
                                    @php
                                        $visitorCountry = getVisitorCountry(request());
                                    @endphp
                                    @foreach (getCountries() as $country)
                                        <option value="{{ $country }}"
                                            {{ $country == $visitorCountry ? 'selected' : '' }}>@lang($country)
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div>
                                <x-jet-label for="phone" value="{{ __('Phone Number') }}" />
                                <div>
                                    <div class="flex">
                                        <input id="phonePrefix" name="country_code" class="form-control" type="text"
                                            style="width: 60px !important;" disabled />
                                        <x-jet-input id="phone" class="block w-full ml-2" type="tel"
                                            name="phone" pattern="\d{1,4}[\s-]?\d{1,6}"
                                            placeholder="E.g. 123-456-7890" required />
                                    </div>
                                    @error('phone', 'register')
                                        <span class="mt-2 text-sm text-red-600">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>

                            <script>
                                @php
                                    $visitorCountry = getVisitorCountry(request());
                                    echo 'const visitorCountry = "' . addslashes($visitorCountry) . '";';

                                    $countryPhonePrefixes = getCountryPhonePrefixes();
                                    echo 'const countryPhonePrefixes = ' . json_encode($countryPhonePrefixes) . ';';
                                @endphp

                                function updatePhoneNumberPrefix() {
                                    const countrySelect = document.getElementById('country');
                                    const phonePrefixInput = document.getElementById('phonePrefix');
                                    const selectedCountry = countrySelect.value;

                                    if (countryPhonePrefixes.hasOwnProperty(selectedCountry)) {
                                        phonePrefixInput.value = countryPhonePrefixes[selectedCountry];
                                    } else {
                                        phonePrefixInput.value = '';
                                    }
                                }

                                // Initialize the phone number prefix when the page loads
                                document.addEventListener('DOMContentLoaded', () => {
                                    updatePhoneNumberPrefix();
                                });
                            </script>
                        @endif

                    </div>
                    <div class="space-y-3">
                        @if (Laravel\Jetstream\Jetstream::hasTermsAndPrivacyPolicyFeature())
                            <div>
                                <x-jet-label for="terms">
                                    <div class="flex items-center">
                                        <x-jet-checkbox name="terms" id="terms" required />

                                        <div class="ml-2">
                                            {!! __('I agree to the :terms_of_service and :privacy_policy', [
                                                'terms_of_service' =>
                                                    '<a target="_blank" href="' .
                                                    route('terms.show') .
                                                    '" class="underline text-sm text-gray-600 hover:text-gray-900">' .
                                                    __('Terms of Service') .
                                                    '</a>',
                                                'privacy_policy' =>
                                                    '<a target="_blank" href="' .
                                                    route('policy.show') .
                                                    '" class="underline text-sm text-gray-600 hover:text-gray-900">' .
                                                    __('Privacy Policy') .
                                                    '</a>',
                                            ]) !!}
                                        </div>
                                    </div>
                                </x-jet-label>

                                @error('terms', 'register')
                                    <span class="mt-2 text-sm text-red-600">{{ $message }}</span>
                                @enderror
                            </div>
                        @endif
                    </div>
                    <div id="registerBtn">
                        <x-jet-button
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <div role="status" id="spinner" class="hidden">
                                <svg class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor" />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                            {{ __('Create an account') }}
                        </x-jet-button>
                    </div>
                    <script>
                        let btn = document.querySelector('button');
                        let registerBtn = document.getElementById('registerBtn');
                        let registerForm = document.getElementById('registerForm');
                        let spinner = document.getElementById('spinner');
                        registerBtn.addEventListener('click', function() {
                            registerForm.submit();
                            spinner.classList.remove('hidden');
                            btn.disabled = true;
                            btn.form.firstElementChild.disabled = true;
                            window.setTimeout(function() {
                                spinner.classList.add('hidden');
                                btn.disabled = false;
                                btn.form.firstElementChild.disabled = false;
                            }, 4000);
                        }, false);
                    </script>
                </form>
            </div>
            <div class="mr-auto place-self-center lg:col-span-6">
                <img class="hidden mx-auto lg:flex scale-125" src="../assets/images/illustrations/register.svg"
                    alt="illustration">
            </div>
        </div>
    </section>

</x-guest-layout>
