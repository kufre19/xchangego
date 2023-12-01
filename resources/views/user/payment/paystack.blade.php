@extends('layouts.user')
@section('content')
    <div class="flex justify-start">
        <div class="card lg:col-span-4 md:col-span-4 bg-white dark:bg-gray-800 shadow-md">
            <div class="deposit-thumb">
                <img src="{{ $deposit->gateway_currency()->methodImage() }}" alt="{{ __('Payment Image') }}">
            </div>
            <div class="card-body">
                <ul class="text-center pb-3">
                    <li>
                        {{ __('Final Amount') }}: <span
                            class="text-green-500 dark:text-green-400">{{ getAmount($deposit->final_amo) }}
                            {{ __($deposit->method_currency) }}</span>
                    </li>
                    <li>
                        {{ __('To Get') }}: <span class="text-red-500 dark:text-red-400">{{ getAmount($deposit->amount) }}
                            {{ __($general->cur_text) }}</span>
                    </li>
                </ul>
            </div>
            <div class="card-footer flex justify-center">
                <form action="{{ route('ipn.' . $deposit->gateway->alias) }}" method="POST" class="text-center">
                    @csrf
                    <button type="button"
                        class="btn btn-success bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500 text-white font-bold py-2 px-4 rounded w-full"
                        id="btn-confirm">{{ __('Pay Now') }}</button>
                    <script src="//js.paystack.co/v1/inline.js" data-key="{{ $data->key }}" data-email="{{ $data->email }}"
                        data-amount="{{ $data->amount }}" data-currency="{{ $data->currency }}" data-ref="{{ $data->ref }}"
                        data-custom-button="btn-confirm"></script>
                </form>
            </div>
        </div>
    </div>
@endsection
