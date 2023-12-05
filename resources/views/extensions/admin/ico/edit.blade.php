@extends('layouts.admin')
@section('content')
    <form action="{{ route('admin.ico.update') }}" method="POST" enctype="multipart/form-data" id="editToken">
        @csrf

        <input type="hidden" name="id" id="id" value="{{ $ico->id }}">
        <input type="hidden" name="status" id="status" value="{{ $ico->status }}">
        <input type="hidden" name="stage" id="stage" value="{{ $ico->stage }}">
        <input type="hidden" name="type" id="type" value="{{ $ico->type }}">
        <div class="card">
            <div class="card-header flex justify-between items-center">
                <h4 class="card-title">{{ 'General Settings' }}</h4>

            </div>
            <div class="card-body space-y-5">
                <div class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    <div>
                        <label for="name" class="form-label">{{ __('Name') }}</label>
                        <input type="text" id="name" name="name" aria-describedby="name"
                            value="{{ $ico->name }}" class="form-control @error('name') is-invalid @enderror"
                            placeholder="*Token name, spaces allowed" required>
                        @error('name')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <label for="symbol" class="form-label">{{ __('Symbol') }}</label>
                        <input type="text" id="symbol" name="symbol" aria-describedby="symbol"
                            value="@if (isset($ico->symbol)) {{ $ico->symbol }} @endif"
                            class="form-control @error('symbol') is-invalid @enderror"
                            placeholder="*Token symbol, no spaced allowed" required>

                        @error('symbol')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="name" class="form-label">{{ __('Crowdsale Type') }}</label>
                            <i class="bi bi-question-circle " data-tooltip-target="crowdsale_type"></i>
                        </div>
                        <select id="type" name="type" required
                            class="form-control @error('type') is-invalid @enderror">
                            <option selected="" value="{{ $ico->type }}">
                                @if ($ico->type == 1)
                                    {{ __('Soft') }}
                                @elseif ($ico->type == 2)
                                    {{ __('Soft/Hard') }}
                                @endif
                            </option>

                            <option value="1" @if ($ico->type == 1) selected @endif>{{ __('Soft') }}
                            </option>
                            <option value="2" @if ($ico->type == 2) selected @endif>{{ __('Soft/Hard') }}
                            </option>

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
                        <select id="stage" name="stage" required
                            class="form-control @error('stage') is-invalid @enderror">
                            <option selected="">{{ __('Select Stage') }}
                                @if ($ico->stage == 1)
                                    {{ __('Soft Cap Started') }}
                                @elseif ($ico->stage == 2)
                                    {{ __('Soft Cap Ended') }}
                                @elseif ($ico->stage == 3)
                                    {{ __('Hard Cap Started') }}
                                @endif
                            </option>

                            <option value="1" @if ($ico->stage == 1) selected @endif>
                                {{ __('Soft Cap Started') }} </option>
                            <option value="2" @if ($ico->stage == 2) selected @endif>
                                {{ __('Soft Cap Ended') }}</option>
                            <option value="3" @if ($ico->stage == 3) selected @endif>
                                {{ __('Hard Cap Started') }}</option>

                        </select>
                        @error('stage')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="name" class="form-label">{{ __('Status') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="Status"></i>
                        </div>
                        <select id="status" name="status" required
                            class="form-control @error('status') is-invalid @enderror">
                            <option selected=""> {{ __('Select Status') }}
                                @if ($ico->status == 0)
                                    {{ __('Upcoming') }}
                                @elseif ($ico->status == 1)
                                    {{ __('Sale Live') }}
                                @elseif ($ico->status == 2)
                                    {{ __('Sale Ended') }}
                                @elseif ($ico->status == 3)
                                    {{ __('Canceled') }}
                                @endif
                            </option>
                            <option value="0" @if ($ico->status == 0) selected @endif>{{ __('Upcoming') }}
                            </option>
                            <option value="1" @if ($ico->status == 1) selected @endif>
                                {{ __('Sale Live') }}
                            </option>
                            <option value="2" @if ($ico->status == 2) selected @endif>
                                {{ __('Sale Ended') }}</option>
                            <option value="3" @if ($ico->status == 3) selected @endif>{{ __('Canceled') }}
                            </option>

                        </select>
                        @error('status')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <label for="liquidity" class="form-label">{{ __('Liquidity') }}</label>
                        <div class="input-group @error('liquidity') input-group-is-invalid @enderror">
                            <input type="text" required placeholder="*Token liquidity percentage" id="liquidity"
                                name="liquidity" aria-describedby="liquidity"
                                value="@if (isset($ico->liquidity)) {{ $ico->liquidity }} @endif">
                            <span id="liquidity" for="liquidity">
                                %
                            </span>
                        </div>
                        @error('liquidity')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="liquidity_supply" class="form-label">{{ __('Liquidity Supply') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="Liquidity_supply"></i>
                        </div>

                        <div class="input-group @error('liquidity_supply') input-group-is-invalid @enderror">
                            <input type="text" required id="liquidity_supply" name="liquidity_supply"
                                aria-describedby="liquidity_supply"
                                value="@if (isset($ico->liquidity_supply)) {{ $ico->liquidity_supply }} @endif">
                            <span id="liquidity_supply" for="liquidity_supply">
                                {{ __('Token Symbol') }}
                            </span>
                        </div>
                        @error('liquidity_supply')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div>
                        <label for="lockup"
                            class="block mb-2 text-sm
                            font-medium text-gray-900 dark:text-white">{{ __('Lockup Duration') }}</label>
                        <input type="text" id="lockup" name="lockup" aria-describedby="lockup"
                            value="@if (isset($ico->lockup)) {{ $ico->lockup }} @endif"
                            class="form-control @error('lockup') is-invalid @enderror"
                            placeholder="*Duration until you send tokens to the clients" required>

                        @error('lockup')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <label for="address"
                            class="block mb-2 text-sm
                            font-medium text-gray-900 dark:text-white">{{ __('Token Address') }}</label>
                        <input type="text" id="address" name="address" aria-describedby="address"
                            value="@if (isset($ico->address)) {{ $ico->address }} @endif"
                            class="form-control @error('address') is-invalid @enderror"
                            placeholder="*Token address in blockchain" required>

                        @error('address')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div>
                        <label for="presale_address"
                            class="block mb-2 text-sm
                            font-medium text-gray-900 dark:text-white">{{ __('Token Presale Address') }}</label>
                        <input type="text" id="presale_address" name="presale_address"
                            aria-describedby="presale_address"
                            value="@if (isset($ico->presale_address)) {{ $ico->presale_address }} @endif"
                            class="form-control @error('presale_address') is-invalid @enderror"
                            placeholder="*Token holder address" required>

                        @error('presale_address')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <label for="decimals"
                            class="block mb-2 text-sm
                            font-medium text-gray-900 dark:text-white">{{ __('Token Decimals') }}</label>
                        <input type="text" id="decimals" name="decimals" aria-describedby="decimals"
                            value="@if (isset($ico->decimals)) {{ $ico->decimals }} @endif"
                            class="form-control @error('decimals') is-invalid @enderror"
                            placeholder="*Token decimals number in the block chain" required>

                        @error('decimals')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <label for="chain"
                            class="block mb-2 text-sm
                            font-medium text-gray-900 dark:text-white">{{ __('Chain') }}</label>
                        <input type="text" id="chain" name="chain" aria-describedby="chain"
                            value="@if (isset($ico->chain)) {{ $ico->chain }} @endif"
                            class="form-control @error('chain') is-invalid @enderror" placeholder="*Token blockchain"
                            required>

                        @error('chain')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <label for="network_symbol"
                            class="block mb-2 text-sm
                            font-medium text-gray-900 dark:text-white">{{ __('Network Symbol') }}</label>
                        <input type="text" id="network_symbol" name="network_symbol"
                            aria-describedby="network_symbol"
                            value="@if (isset($ico->network_symbol)) {{ $ico->network_symbol }} @endif"
                            class="form-control @error('network_symbol') is-invalid @enderror"
                            placeholder="*Chain currency for purchasing" required>

                        @error('network_symbol')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="total_supply" class="form-label">{{ __('Total Supply') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="total_supply_2"></i>
                        </div>

                        <div class="input-group @error('total_supply') input-group-is-invalid @enderror">
                            <input type="text" required id="total_supply" name="total_supply"
                                aria-describedby="total_supply"
                                value="@if (isset($ico->total_supply)) {{ $ico->total_supply }} @endif">
                            <span id="total_supply" for="total_supply">
                                {{ __('Token Symbol') }}
                            </span>
                        </div>
                        @error('total_supply')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="presale_supply" class="form-label">{{ __('Presale Supply') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="presale_supply_1"></i>
                        </div>

                        <div class="input-group @error('presale_supply') input-group-is-invalid @enderror">
                            <input type="text" required id="presale_supply" name="presale_supply"
                                aria-describedby="presale_supply"
                                value="@if (isset($ico->presale_supply)) {{ $ico->presale_supply }} @endif">
                            <span id="presale_supply" for="presale_supply">
                                {{ __('Token Symbol') }}
                            </span>
                        </div>
                        @error('presale_supply')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="initial_cap" class="form-label">{{ __('Initial Cap') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="initial_cap_1"></i>
                        </div>

                        <div class="input-group @error('initial_cap') input-group-is-invalid @enderror">
                            <input type="text" required id="initial_cap" name="initial_cap"
                                aria-describedby="initial_cap"
                                value="@if (isset($ico->initial_cap)) {{ $ico->initial_cap }} @endif">
                            <span id="initial_cap" for="initial_cap">
                                {{ $ico->network_symbol ?? 'Network Symbol' }}
                            </span>
                        </div>
                        @error('initial_cap')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>



                    <div>
                        <div class="flex justify-between">
                            <label for="owner_max" class="form-label">{{ __('Owner Max') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="owner_max_1"></i>
                        </div>

                        <div class="input-group @error('owner_max') input-group-is-invalid @enderror">
                            <input type="text" required id="owner_max" name="owner_max" aria-describedby="owner_max"
                                value="@if (isset($ico->owner_max)) {{ $ico->owner_max }} @endif">
                            <span id="owner_max" for="owner_max">
                                {{ $ico->network_symbol ?? 'Network Symbol' }}
                            </span>
                        </div>
                        @error('owner_max')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div>
                        <div class="flex justify-between">
                            <label for="owner_recieved" class="form-label">{{ __('Owner Recieved') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="owner_recieved_1"></i>
                        </div>

                        <div class="input-group @error('owner_recieved') input-group-is-invalid @enderror">
                            <input type="text" required id="owner_recieved" name="owner_recieved"
                                aria-describedby="owner_recieved"
                                value="@if (isset($ico->owner_recieved)) {{ $ico->owner_recieved }} @else 0 @endif">
                            <span id="owner_recieved" for="owner_recieved">
                                {{ $ico->network_symbol ?? 'Network Symbol' }}
                            </span>
                        </div>
                        @error('owner_recieved')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="client_min" class="form-label">{{ __('Client Min') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="client_min_1"></i>
                        </div>

                        <div class="input-group @error('client_min') input-group-is-invalid @enderror">
                            <input type="text" required id="client_min" name="client_min"
                                aria-describedby="client_min"
                                value="@if (isset($ico->client_min)) {{ $ico->client_min }} @endif">
                            <span id="client_min" for="client_min">
                                {{ $ico->symbol ?? 'Token Symbol' }}
                            </span>
                        </div>
                        @error('client_min')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="client_max" class="form-label">{{ __('Client Max') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="client_max_1"></i>
                        </div>

                        <div class="input-group @error('client_max') input-group-is-invalid @enderror">
                            <input type="text" required id="client_max" name="client_max"
                                aria-describedby="client_max"
                                value="@if (isset($ico->client_max)) {{ $ico->client_max }} @endif">
                            <span id="client_max" for="client_max">
                                {{ $ico->symbol ?? 'Token Symbol' }}
                            </span>
                        </div>
                        @error('client_max')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div>
                        <div>
                            <label for="contributors" class="form-label">{{ __('Contributors') }}</label>
                            <input type="text" id="contributors" name="contributors" aria-describedby="contributors"
                                value="@if (isset($ico->contributors)) {{ $ico->contributors }} @endif"
                                class="form-control @error('contributors') is-invalid @enderror"
                                placeholder="*Number of clients who purchased this offer" required>
                        </div>
                        @error('contributors')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="rate" class="form-label">{{ __('Rate') }}</label>
                            <i class="bi bi-question-circle" data-tooltip-target="rate_1"></i>
                        </div>

                        <div class="input-group-2">
                            <div id="rate" for="rate" class="w-full">
                                <span>1 {{ $ico->network_symbol ?? 'Network Symbol' }} =</span>
                            </div>
                            <input type="text" class="@error('rate') is-invalid @enderror" required id="rate"
                                name="rate" aria-describedby="rate"
                                value="@if (isset($ico->rate)) {{ $ico->rate }} @endif">
                            <span id="rate" for="rate">
                                {{ $ico->symbol ?? 'Token Symbol' }}
                            </span>

                        </div>
                        @error('rate')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div>
                    <label ffor="desc" class="form-label">{{ __('Description') }}</label>
                    <textarea id="desc" name="desc" aria-describedby="desc" rows="10" required
                        class="form-control @error('desc') is-invalid @enderror" placeholder="Write your description here...">{{ $ico->desc }}</textarea>
                    @error('desc')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror

                </div>
                <div>

                    <label class="form-label" for="file_input">{{ __('Upload file') }}</label>
                    <div class="mr-1">
                        <img class="img-thumbnail "
                            src="{{ getImage(imagePath()['ico']['path'] . '/' . $ico->icon, imagePath()['ico']['size']) }}" />
                    </div>
                    <input class="upload @error('image') is-invalid @enderror"
                        aria-describedby="file_input_help"name="image" type="file" id="image"
                        accept=".png, .jpg, .jpeg">
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">png, jpg, or
                        jpeg
                        (MAX. 64x64px).</p>
                    @error('image')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror

                </div>
            </div>
        </div>
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
                            value="{{ getAmount($ico->soft_cap) }}" required
                            class="form-control @error('soft_cap') is-invalid @enderror">
                        @error('soft_cap')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>



                    <div>
                        <div class="flex justify-between">
                            <label for="soft_price" class="form-label">{{ __('Soft Cap Price') }}</label>

                        </div>

                        <div class="input-group @error('soft_price') input-group-is-invalid @enderror">
                            <input type="number" required id="soft_price" name="soft_price"
                                aria-describedby="soft_price" step="0.0000001"
                                value="{{ getAmount($ico->soft_price) }}">
                            <span id="soft_price" for="soft_price">
                                {{ __('Network Symbol') }}
                            </span>
                        </div>
                        @error('soft_price')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>




                    <div>
                        <label for="soft_raised" class="form-label">{{ __('Soft Cap Initial Raised') }}</label>
                        <input type="number" id="soft_raised" name="soft_raised" aria-label="ico APR"
                            aria-describedby="soft_raised" value="{{ $ico->soft_raised }}" required
                            class="form-control @error('soft_raised') is-invalid @enderror">
                        @error('soft_raised')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <br>

                    <div class="flex items-center">
                        <div class="relative">
                            <input name="soft_start" type="date" id="soft_start"
                                value="{{ date('Y-m-d', strtotime($ico->soft_start)) }}"
                                class="form-control @error('soft_start') is-invalid @enderror"
                                placeholder="{{ __('Soft Cap Start Date') }}" required>
                            @error('soft_start')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                        <span class="mx-4 text-gray-500">to</span>
                        <div class="relative">
                            <input name="soft_end" type="date" id="soft_end"
                                value="{{ date('Y-m-d', strtotime($ico->soft_end)) }}"
                                class="form-control @error('soft_end') is-invalid @enderror"
                                placeholder="{{ __('Soft Cap End Date') }}" required>
                            @error('soft_end')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>
                </div>
            </div>

            @if ($ico->type == 2)
                <div class="card">

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
                                value="{{ getAmount($ico->hard_cap) }}"
                                class="form-control @error('hard_cap') is-invalid @enderror">
                            @error('hard_cap')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div>
                            <div class="flex justify-between">
                                <label for="hard_price" class="form-label">{{ __('Hard Cap Price') }}</label>

                            </div>

                            <div class="input-group @error('hard_price') input-group-is-invalid @enderror">
                                <input type="number" step="0.0000001" id="hard_price" name="hard_price"
                                    aria-describedby="hard_price" value="{{ getAmount($ico->hard_price) }}">
                                <span id="hard_price" for="hard_price">
                                    {{ __('Network Symbol') }}
                                </span>
                            </div>
                            @error('hard_price')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div>
                            <label for="hard_raised" class="form-label">{{ __('Hard Cap Initial Raised') }}</label>
                            <input type="number" id="hard_raised" name="hard_raised" aria-label="ico APR"
                                aria-describedby="hard_raised" value="{{ $ico->hard_raised }}"
                                class="form-control @error('hard_raised') is-invalid @enderror">
                            @error('hard_raised')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <br>
                        <div class="flex items-center">
                            <div class="relative">
                                <input name="hard_start" type="date" id="hard_start"
                                    value="{{ date('Y-m-d', strtotime($ico->hard_start)) }}"
                                    class="form-control @error('hard_start') is-invalid @enderror"
                                    placeholder="{{ __('Hard Cap Start Date') }}">
                            </div>
                            <span class="mx-4 text-gray-500">to</span>
                            <div class="relative">
                                <input type="date" id="hard_end" name="hard_end"
                                    value="{{ date('Y-m-d', strtotime($ico->hard_end)) }}"
                                    class="form-control @error('hard_end') is-invalid @enderror"
                                    placeholder="{{ __('Hard Cap End Date') }}">
                            </div>
                            @error('hard_end')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>
                </div>
            @endif
        </div>

        <div class="card mt-5">
            <div class="text-end card-body">
                <button type="submit" class="btn btn-outline-success">{{ __('Edit') }}</button>
                </button>
            </div>
        </div>
    </form>
@endsection
@push('breadcrumb-plugins')
    <a href="{{ route('admin.ico.index') }}" class="btn btn-outline-secondary"><i class="bi bi-chevron-left mr-1"></i>
        {{ __('Back') }}</a>
@endpush
@push('tooltips')
    <div id="crowdsale_stage" role="tooltip"
        class="inline-block absolute invisible z-50 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        {{ __('Token offer starting stage') }}
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="crowdsale_type" role="tooltip"
        class="inline-block absolute invisible z-50 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        {{ __('Token offer stages, soft = 1 stage, soft/hard = 2 stages') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="Status" role="tooltip"
        class="inline-block absolute invisible z-50 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        {{ __('Token offer status') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="Liquidity_supply" role="tooltip"
        class="inline-block absolute invisible z-50 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        {{ __('How much supply to be liquidated') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="total_supply_2" role="tooltip"
        class="inline-block absolute invisible z-50 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        {{ __('Total amount tokens made in smart contract') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="presale_supply_1" role="tooltip"
        class="inline-block absolute invisible z-50 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        {{ __('Total amount of tokens to be sold') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="initial_cap_1" role="tooltip"
        class="inline-block absolute invisible z-50 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        {{ __('Initial Limit') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="owner_max_1" role="tooltip"
        class="inline-block absolute invisible z-50 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        {{ __('How much the owner would recieve from this token offering') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="owner_recieved_1" role="tooltip"
        class="inline-block absolute invisible z-50 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        {{ __('How much the owner recieved yet for this token offering') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="client_min_1" role="tooltip"
        class="inline-block absolute invisible z-50 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        {{ __('How much the minimum amount to be purchased by clientt') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="client_max_1" role="tooltip"
        class="inline-block absolute invisible z-50 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        {{ __('How much the client can purchase in total of this token') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="rate_1" role="tooltip"
        class="inline-block absolute invisible z-50 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        *{{ __('Price of the token') }} <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
@endpush
