@extends('layouts.user')
@section('content')
    <div class="flex justify-start">
        <div class="card lg:col-span-4 md:col-span-4 bg-white dark:bg-gray-800 shadow-md">
            <div class="card-body">
                <img class="img-thumbnail mb-1" src="{{ $deposit->gateway_currency()->methodImage() }}"
                    alt="{{ __('Payment Image') }}">
                <div class="deposit-content">
                    <ul>
                        <li>
                            {{ __('Final Amount') }}: <span
                                class="text-green-500 dark:text-green-400">{{ getAmount($deposit->final_amo) }}
                                {{ __($deposit->method_currency) }}</span>
                        </li>
                        <li>
                            {{ __('To Get') }}: <span
                                class="text-red-500 dark:text-red-400">{{ getAmount($deposit->amount) }}
                                {{ __($general->cur_text) }}</span>
                        </li>
                    </ul>
                    <form action="{{ $data->url }}" method="{{ $data->method }}">
                        <script src="{{ $data->checkout_js }}"
                            @foreach ($data->val as $key => $value)
data-{{ $key }}="{{ $value }}" @endforeach></script>
                        <input type="hidden" custom="{{ $data->custom }}" name="hidden">
                        <button type="submit"
                            class="btn btn-success bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500 text-white font-bold py-2 px-4 rounded">{{ __('Pay Now') }}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        "use strict";
        $(document).ready(function() {
            $('input[type="submit"]').addClass("btn btn-success");
        })
    </script>
@endsection
