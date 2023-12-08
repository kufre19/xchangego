@extends('layouts.user')
@section('content')
    <div class="flex justify-start">
        <div class="card lg:col-span-4 md:col-span-4 bg-white dark:bg-gray-800 shadow-md">
            <div class="card-body text-center">
                <div class="deposit-thumb">
                    <img src="{{ $deposit->gateway_currency()->methodImage() }}" alt="{{ __('Payment Image') }}">
                </div>
                <div class="deposit-content">
                    <ul class="text-start">
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
                        <script src="{{ $data->src }}" class="stripe-button"
                            @foreach ($data->val as $key => $value)
data-{{ $key }}="{{ $value }}" @endforeach></script>
                        <button type="submit"
                            class="btn btn-success bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">{{ __('Pay Now') }}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('page-style')
    <style>
        .StripeElement {
            box-sizing: border--box;
            height: 40px;
            padding: 10px 12px;
            border: 1px solid transparent;
            border--radius: 4px;
            background-color: white;
            box-shadow: 0 1px 3px 0 #e6ebf1;
            -webkit-transition: box-shadow 150ms ease;
            transition: box-shadow 150ms ease;
        }

        .StripeElement--focus {
            box-shadow: 0 1px 3px 0 #cfd7df;
        }

        .StripeElement--invalid {
            border--color: #fa755a;
        }

        .StripeElement--webkit-autofill {
            background-color: #fefde5 !important;
        }

        .card button {
            padding-left: 0px !important;
        }
    </style>
@endsection

@section('page-scripts')
    <script src="https://js.stripe.com/v3/"></script>
    <script>
        "use strict";
        $(document).ready(function() {
            $('button[type="submit"]').addClass(" btn-success btn-round text-success text-center btn-lg");
        })
    </script>
@endsection
