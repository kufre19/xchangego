@extends('layouts.admin')
@section('content')
    <form action="{{ route('admin.ico.store') }}" method="POST" enctype="multipart/form-data" id="editToken" class="my-5"
        x-data="{ step: 1, tokenSymbol: '', networkSymbol: '', type: '' }">
        @csrf
        <div class="w-full flex justify-center">
            <ol
                class="flex items-center mb-3 text-sm font-medium text-center text-gray-500 dark:text-gray-400 lg:mb-6 sm:text-base">
                <li :class="step == 1 ? 'text-primary-600 dark:text-primary-500' : ''"
                    class="flex items-center sm:after:content-[''] after:w-40 after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                    <div
                        class="flex items-center sm:block after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
                        <div x-show="step == 1" class="mr-2 sm:mb-2 sm:mx-auto" id="step2icon">1</div>
                        <svg x-show="step > 1" class="w-4 h-4 mr-2 sm:mb-2 sm:w-6 sm:h-6 sm:mx-auto" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"></path>
                        </svg>
                        {{ __('Info') }}
                    </div>
                </li>
                <li :class="step == 2 ? 'text-primary-600 dark:text-primary-500' : ''"
                    class="flex items-center after:content-[''] after:w-40 after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                    <div
                        class="flex items-center sm:block after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
                        <div x-show="step < 3" class="mr-2 sm:mb-2 sm:mx-auto" id="step2icon">2</div>
                        <svg x-show="step == 3" class="w-4 h-4 mr-2 sm:mb-2 sm:w-6 sm:h-6 sm:mx-auto" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"></path>
                        </svg>
                        {{ __('Description') }}
                    </div>
                </li>
                <li class="flex items-center sm:block" :class="step == 3 ? 'text-primary-600 dark:text-primary-500' : ''">
                    <div class="mr-2 sm:mb-2 sm:mx-auto" id="step3icon">3</div>
                    {{ __('Limits') }}
                </li>
            </ol>
        </div>

        <div x-show.important="step == 1" x-transition class="card">
            <div class="card-body ">
                <div class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    <div>
                        <label for="name" class="form-label">{{ __('Name') }}</label>
                        <input type="text" id="name" name="name" aria-describedby="name"
                            value="{{ old('name') }}" class="form-control @error('name') is-invalid @enderror"
                            placeholder="*Token name, spaces allowed">
                        @error('name')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <label for="symbol" class="form-label">{{ __('Symbol') }}</label>
                        <input type="text" id="symbol" name="symbol" aria-describedby="symbol"
                            value="{{ old('symbol') }}" x-model="tokenSymbol"
                            class="form-control @error('symbol') is-invalid @enderror"
                            placeholder="*Token symbol, no spaced allowed">
                        @error('symbol')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <label for="network_symbol" class="form-label">{{ __('Network Symbol') }}</label>
                        <input type="text" id="network_symbol" name="network_symbol" aria-describedby="network_symbol"
                            value="{{ old('network_symbol') }}" x-model="networkSymbol"
                            class="form-control @error('network_symbol') is-invalid @enderror"
                            placeholder="*Chain currency for purchasing">
                        @error('network_symbol')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="name" class="form-label">{{ __('Crowdsale Type') }}</label>
                            <i class="bi bi-question-circle " data-tooltip-target="crowdsale_type"></i>
                        </div>
                        <select id="type" name="type" x-model="type"
                            class="form-control @error('type') is-invalid @enderror">
                            <option selected value="">{{ __('Select Type') }}</option>
                            <option value="1">
                                {{ __('Soft') }} </option>
                            <option value="2">
                                {{ __('Soft/Hard') }}</option>
                        </select>
                        @error('type')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div>
                        <div class="flex justify-between">
                            <label for="name" class="form-label">{{ __('Crowdsale Stage') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="crowdsale_stage"></i>
                        </div>
                        <select id="stage" name="stage" class="form-control @error('stage') is-invalid @enderror">
                            <option selected="" value="">{{ __('Select Stage') }}</option>
                            <option value="1">
                                {{ __('Soft Cap Started') }} </option>
                            <option value="2">
                                {{ __('Soft Cap Ended') }}</option>
                            <option value="3">
                                {{ __('Hard Cap Started') }}</option>
                        </select>
                        @error('stage')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="name" class="form-label">{{ __('Status') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="Status"></i>
                        </div>
                        <select id="status" name="status" class="form-control @error('status') is-invalid @enderror">
                            <option selected="" value=""> {{ __('Select Status') }}</option>
                            <option value="0">
                                {{ __('Upcoming') }} </option>
                            <option value="1">
                                {{ __('Sale Live') }}</option>
                            <option value="2">
                                {{ __('Sale Ended') }}</option>
                            <option value="3">
                                {{ __('Canceled') }}</option>

                        </select>
                        @error('status')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>
                    <div>
                        <label for="liquidity" class="form-label">{{ __('Liquidity') }}</label>
                        <div class="input-group @error('liquidity') input-group-is-invalid @enderror">
                            <input type="number" placeholder="*Token liquidity percentage" id="liquidity"
                                name="liquidity" aria-describedby="liquidity" value="{{ old('liquidity') }}">
                            <span id="liquidity" for="liquidity">
                                %
                            </span>
                        </div>
                        @error('liquidity')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="liquidity_supply" class="form-label">{{ __('Liquidity Supply') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="Liquidity_supply"></i>
                        </div>

                        <div class="input-group @error('liquidity') input-group-is-invalid @enderror">
                            <input type="number" class="@error('liquidity_supply') is-invalid @enderror"
                                id="liquidity_supply" name="liquidity_supply" aria-describedby="liquidity_supply"
                                value="{{ old('liquidity_supply') }}">
                            <span id="liquidity_supply" for="liquidity_supply" x-text="tokenSymbol">
                            </span>
                        </div>
                        @error('liquidity_supply')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>

                    <div>
                        <label for="lockup"
                            class="block mb-2 text-sm
                                    font-medium text-gray-900 dark:text-white">{{ __('Lockup Duration') }}</label>
                        <input type="number" id="lockup" name="lockup" aria-describedby="lockup"
                            value="{{ old('lockup') }}" class="form-control @error('lockup') is-invalid @enderror"
                            placeholder="*Duration until you send tokens to the clients">
                        @error('lockup')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>
                    <div>
                        <label for="address"
                            class="block mb-2 text-sm
                                    font-medium text-gray-900 dark:text-white">{{ __('Token Address') }}</label>
                        <input type="text" id="address" name="address" aria-describedby="address"
                            value="{{ old('address') }}" class="form-control @error('address') is-invalid @enderror"
                            placeholder="*Token address in blockchain">
                        @error('address')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>
                    <div>
                        <label for="presale_address"
                            class="block mb-2 text-sm
                                    font-medium text-gray-900 dark:text-white">{{ __('Token Presale Address') }}</label>
                        <input type="text" id="presale_address" name="presale_address"
                            aria-describedby="presale_address" value="{{ old('presale_address') }}"
                            class="form-control @error('presale_address') is-invalid @enderror"
                            placeholder="*Token holder address">
                        @error('presale_address')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>
                    <div>
                        <label for="decimals"
                            class="block mb-2 text-sm
                                    font-medium text-gray-900 dark:text-white">{{ __('Token Decimals') }}</label>
                        <input type="number" id="decimals" name="decimals" aria-describedby="decimals"
                            value="{{ old('decimals') }}" class="form-control @error('decimals') is-invalid @enderror"
                            placeholder="*Token decimals number in the block chain">
                        @error('decimals')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>
                    <div>
                        <label for="chain"
                            class="block mb-2 text-sm
                                    font-medium text-gray-900 dark:text-white">{{ __('Chain') }}</label>
                        <input type="text" id="chain" name="chain" aria-describedby="chain"
                            value="{{ old('chain') }}" class="form-control @error('chain') is-invalid @enderror"
                            placeholder="*Token blockchain">
                        @error('chain')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>





                    <div>
                        <div class="flex justify-between">
                            <label for="total_supply" class="form-label">{{ __('Total Supply') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="total_supply_2"></i>
                        </div>

                        <div class="input-group @error('liquidity') input-group-is-invalid @enderror">
                            <input type="number" class="@error('total_supply') is-invalid @enderror" id="total_supply"
                                name="total_supply" aria-describedby="total_supply" value="{{ old('total_supply') }}">
                            <span id="total_supply" for="total_supply" x-text="tokenSymbol">
                            </span>
                        </div>

                        @error('total_supply')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="presale_supply" class="form-label">{{ __('Presale Supply') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="presale_supply_1"></i>
                        </div>

                        <div class="input-group @error('liquidity') input-group-is-invalid @enderror">
                            <input type="number" class="@error('presale_supply') is-invalid @enderror"
                                id="presale_supply" name="presale_supply" aria-describedby="presale_supply"
                                value="{{ old('presale_supply') }}">
                            <span id="presale_supply" for="presale_supply" x-text="tokenSymbol">
                            </span>
                        </div>

                        @error('presale_supply')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="initial_cap" class="form-label">{{ __('Initial Cap') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="initial_cap_1"></i>
                        </div>

                        <div class="input-group @error('liquidity') input-group-is-invalid @enderror">
                            <input type="number" class="@error('initial_cap') is-invalid @enderror" id="initial_cap"
                                name="initial_cap" aria-describedby="initial_cap" value="{{ old('initial_cap') }}">
                            <span id="initial_cap" for="initial_cap" x-text="networkSymbol">
                            </span>
                        </div>

                        @error('initial_cap')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="owner_max" class="form-label">{{ __('Owner Max') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="owner_max_1"></i>
                        </div>

                        <div class="input-group @error('liquidity') input-group-is-invalid @enderror">
                            <input type="number" class="@error('owner_max') is-invalid @enderror" id="owner_max"
                                name="owner_max" aria-describedby="owner_max" value="{{ old('owner_max') }}">
                            <span id="owner_max" for="owner_max" x-text="networkSymbol">
                            </span>
                        </div>

                        @error('owner_max')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="owner_recieved" class="form-label">{{ __('Owner Recieved') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="owner_recieved_1"></i>
                        </div>

                        <div class="input-group @error('liquidity') input-group-is-invalid @enderror">
                            <input type="number" class="@error('owner_recieved') is-invalid @enderror"
                                id="owner_recieved" name="owner_recieved" aria-describedby="owner_recieved"
                                value="{{ old('owner_recieved') }}">
                            <span id="owner_recieved" for="owner_recieved" x-text="networkSymbol">
                            </span>
                        </div>

                        @error('owner_recieved')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="client_min" class="form-label">{{ __('Client Min') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="client_min_1"></i>
                        </div>

                        <div class="input-group @error('liquidity') input-group-is-invalid @enderror">
                            <input type="number" class="@error('client_min') is-invalid @enderror" id="client_min"
                                name="client_min" aria-describedby="client_min" value="{{ old('client_min') }}">
                            <span id="client_min" for="client_min" x-text="tokenSymbol">
                            </span>
                        </div>

                        @error('client_min')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>

                    <div>
                        <div class="flex justify-between">
                            <label for="client_max" class="form-label">{{ __('Client Max') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="client_max_1"></i>
                        </div>

                        <div class="input-group @error('liquidity') input-group-is-invalid @enderror">
                            <input type="number" class="@error('client_max') is-invalid @enderror" id="client_max"
                                name="client_max" aria-describedby="client_max" value="{{ old('client_max') }}">
                            <span id="client_max" for="client_max" x-text="tokenSymbol">

                            </span>
                        </div>
                        @error('client_max')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>

                    <div>
                        <label for="contributors" class="form-label">{{ __('Contributors') }}</label>
                        <input type="number" id="contributors" name="contributors" aria-describedby="contributors"
                            value="{{ old('contributors') }}"
                            class="form-control @error('contributors') is-invalid @enderror"
                            placeholder="*Number of clients who purchased this offer">
                        @error('contributors')
                            <span class="invalid-feedback" role="alert">
                                {{ $message }}
                            </span>
                        @enderror
                    </div>
                </div>
            </div>
        </div>
        <div x-show.important="step == 2" x-transition class="card">
            <div class="card-body space-y-3">
                <div class="flex justify-between">
                    <label for="rate" class="form-label">{{ __('Rate') }}</label>
                    <i class="bi bi-question-circle" data-tooltip-target="rate_1"></i>
                </div>

                <div>
                    <div class="input-group-2 @error('liquidity') input-group-is-invalid @enderror-2">
                        <div id="rate" for="rate" class="w-full">
                            1 <span x-text="networkSymbol"></span> =
                        </div>
                        <input type="number" id="rate" name="rate" aria-describedby="rate"
                            class="@error('rate') is-invalid @enderror" value="{{ old('rate') }}">
                        <span id="rate" for="rate" x-text="tokenSymbol">

                        </span>

                    </div>
                    @error('rate')
                        <span class="invalid-feedback" role="alert">
                            {{ $message }}
                        </span>
                    @enderror
                </div>

                <div>
                    <label ffor="desc" class="form-label">{{ __('Description') }}</label>
                    <textarea id="desc" name="desc" aria-describedby="desc" rows="10"
                        class="form-control @error('desc') is-invalid @enderror" placeholder="Write your description here...">{{ old('desc') }}</textarea>

                    @error('desc')
                        <span class="invalid-feedback" role="alert">
                            {{ $message }}
                        </span>
                    @enderror
                </div>
                <div>

                    <label class="form-label" for="file_input">{{ __('Upload file') }}</label>
                    <input class="upload @error('image') is-invalid @enderror" aria-describedby="file_input_help"
                        name="image" type="file" id="image" accept=".png, .jpg, .jpeg">
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">png, jpg, or
                        jpeg
                        (MAX. 64x64px).</p>

                    @error('image')
                        <span class="invalid-feedback" role="alert">
                            {{ $message }}
                        </span>
                    @enderror
                </div>
            </div>
        </div>
        <div x-show.important="step == 3" x-transition>
            <div class="grid gap-5 my-6 sm:grid-cols-2">
                <div class="card">
                    <div class="card-header bg-gray-200 dark:bg-sky-600  rounded-t-lg">
                        <p class=" text-lg font-medium text-gray-900 dark:text-white
                           ">
                            {{ __('Soft Cap Setting') }}
                        </p>
                    </div>
                    <div class="card-body space-y-5">
                        <div>
                            <label for="soft_cap" class="form-label">{{ __('Soft Cap Quantity') }}</label>
                            <input type="number" id="soft_cap" name="soft_cap" aria-describedby="soft_cap"
                                value="{{ old('soft_cap') }}"
                                class="form-control @error('soft_cap') is-invalid @enderror">
                            @error('soft_cap')
                                <span class="invalid-feedback" role="alert">
                                    {{ $message }}
                                </span>
                            @enderror
                        </div>
                        <div>
                            <div class="flex justify-between">
                                <label for="soft_price" class="form-label">{{ __('Soft Cap Price') }}</label>
                            </div>
                            <div class="input-group @error('liquidity') input-group-is-invalid @enderror">
                                <input type="number" id="soft_price" name="soft_price" aria-describedby="soft_price"
                                    step="0.0000001" value="{{ old('soft_price') }}">
                                <span id="soft_price" for="soft_price" x-text="networkSymbol">

                                </span>
                            </div>
                            @error('soft_price')
                                <span class="invalid-feedback" role="alert">
                                    {{ $message }}
                                </span>
                            @enderror
                        </div>
                        <div>
                            <label for="soft_raised" class="form-label">{{ __('Soft Cap Initial Raised') }}</label>
                            <input type="number" id="soft_raised" name="soft_raised" aria-label="ico APR"
                                aria-describedby="soft_raised" value="{{ old('soft_raised') }}"
                                class="form-control @error('soft_raised') is-invalid @enderror">
                            @error('soft_raised')
                                <span class="invalid-feedback" role="alert">
                                    {{ $message }}
                                </span>
                            @enderror
                        </div>
                        <div date-rangepicker class="flex items-center">
                            <div class="relative">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <input name="soft_start" type="date" id="soft_start" value="{{ old('soft_start') }}"
                                    class="form-control @error('soft_start') is-invalid @enderror"
                                    placeholder="{{ __('Soft Cap Start Date') }}">
                                @error('soft_start')
                                    <span class="invalid-feedback" role="alert">
                                        {{ $message }}
                                    </span>
                                @enderror
                            </div>
                            <span class="mx-4 text-gray-500">to</span>
                            <div class="relative">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <input type="date" id="soft_end" name="soft_end" value="{{ old('soft_end') }}"
                                    class="form-control @error('soft_end') is-invalid @enderror"
                                    placeholder="{{ __('Soft Cap End Date') }}">
                                @error('soft_end')
                                    <span class="invalid-feedback" role="alert">
                                        {{ $message }}
                                    </span>
                                @enderror
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card" x-show="type == 2">

                    <div class="card-header bg-gray-200 dark:bg-sky-600  rounded-t-lg">
                        <p class=" text-lg font-medium text-gray-900 dark:text-white
                           ">
                            {{ __('Hard Cap Stage Settings') }}
                        </p>
                    </div>
                    <div class="card-body space-y-5">

                        <div>
                            <label for="hard_cap" class="form-label">{{ __('Hard Cap Quantity') }}</label>
                            <input type="number" id="hard_cap" name="hard_cap" aria-describedby="hard_cap"
                                value="{{ old('hard_cap') }}"
                                class="form-control @error('hard_cap') is-invalid @enderror">
                            @error('hard_cap')
                                <span class="invalid-feedback" role="alert">
                                    {{ $message }}
                                </span>
                            @enderror
                        </div>
                        <div>
                            <div class="flex justify-between">
                                <label for="hard_price" class="form-label">{{ __('Hard Cap Price') }}</label>

                            </div>

                            <div class="input-group @error('liquidity') input-group-is-invalid @enderror">
                                <input type="number" step="0.0000001" id="hard_price" name="hard_price"
                                    class="@error('hard_price') is-invalid @enderror" aria-describedby="hard_price"
                                    value="{{ old('hard_price') }}">
                                <span id="hard_price" for="hard_price" x-text="networkSymbol">

                                </span>
                            </div>
                            @error('hard_price')
                                <span class="invalid-feedback" role="alert">
                                    {{ $message }}
                                </span>
                            @enderror
                        </div>
                        <div>
                            <label for="hard_raised" class="form-label">{{ __('Hard Cap Initial Raised') }}</label>
                            <input type="number" id="hard_raised" name="hard_raised" aria-describedby="hard_raised"
                                value="{{ old('hard_raised') }}"
                                class="form-control @error('hard_raised') is-invalid @enderror">
                            @error('hard_raised')
                                <span class="invalid-feedback" role="alert">
                                    {{ $message }}
                                </span>
                            @enderror
                        </div>
                        <div date-rangepicker class="flex items-center">
                            <div class="relative">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <input name="hard_start" type="date" id="hard_start"
                                    value="{{ old('hard_start') }}"
                                    class="form-control @error('hard_start') is-invalid @enderror"
                                    placeholder="{{ __('Hard Cap Start Date') }}">
                                @error('hard_start')
                                    <span class="invalid-feedback" role="alert">
                                        {{ $message }}
                                    </span>
                                @enderror
                            </div>
                            <span class="mx-4 text-gray-500">{{ __('to') }}</span>
                            <div class="relative">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <input type="date" id="hard_end" name="hard_end" value="{{ old('hard_end') }}"
                                    class="form-control @error('hard_end') is-invalid @enderror"
                                    placeholder="{{ __('Hard Cap End Date') }}">
                                @error('hard_end')
                                    <span class="invalid-feedback" role="alert">
                                        {{ $message }}
                                    </span>
                                @enderror
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex space-x-3 mt-5">
            <button class="btn btn-outline-secondary w-full justify-center flex" :class="step == 1 ? 'opacity-50' : ''"
                :disabled="step == 1" @click="step == 1 ? '' : step -= 1"><i
                    class="bi bi-chevron-left"></i>{{ __('Prev') }}</button>
            <button x-show="step < 3" type="button" class="w-full btn justify-center flex btn-outline-primary"
                x-on:click="step += 1">
                <i class="bi bi-chevron-right"></i>
                <span>{{ __('Next') }}</span>
            </button>

            <button x-show="step >= 3" type="submit" class="w-full btn justify-center flex btn-outline-success">
                <span>{{ __('Submit') }}</span>
            </button>
        </div>
    </form>
@endsection
@push('breadcrumb-plugins')
    <a href="{{ route('admin.ico.index') }}" class="btn btn-outline-secondary"><i class="bi bi-chevron-left mr-1"></i>
        {{ __('Back') }}</a>
@endpush

@push('tooltips')
    <div id="crowdsale_stage" role="tooltip" class="form-tooltip">
        {{ __('Token offer starting stage') }}
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="crowdsale_type" role="tooltip" class="form-tooltip">
        {{ __('Token offer stages, soft = 1 stage, soft/hard = 2 stages') }} <div class="tooltip-arrow"
            data-popper-arrow></div>
    </div>
    <div id="Status" role="tooltip" class="form-tooltip">
        {{ __('Token offer status') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="Liquidity_supply" role="tooltip" class="form-tooltip">
        {{ __('How much supply to be liquidated') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="total_supply_2" role="tooltip" class="form-tooltip">
        {{ __('Total amount tokens made in smart contract') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="presale_supply_1" role="tooltip" class="form-tooltip">
        {{ __('Total amount of tokens to be sold') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="initial_cap_1" role="tooltip" class="form-tooltip">
        {{ __('Initial Limit') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="owner_max_1" role="tooltip" class="form-tooltip">
        {{ __('How much the owner would recieve from this token offering ') }}<div class="tooltip-arrow"
            data-popper-arrow></div>
    </div>
    <div id="owner_recieved_1" role="tooltip" class="form-tooltip">
        {{ __('How much the owner recieved yet for this token offering ') }}<div class="tooltip-arrow"
            data-popper-arrow></div>
    </div>
    <div id="client_min_1" role="tooltip" class="form-tooltip">
        {{ __('How much the minimum amount to be purchased by clientt') }} <div class="tooltip-arrow"
            data-popper-arrow></div>
    </div>
    <div id="client_max_1" role="tooltip" class="form-tooltip">
        {{ __('How much the client can purchase in total of this token') }} <div class="tooltip-arrow"
            data-popper-arrow></div>
    </div>
    <div id="rate_1" role="tooltip" class="form-tooltip">
        *{{ __('Price of the token') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
@endpush
