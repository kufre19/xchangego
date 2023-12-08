@extends('layouts.user')
@section('content')
    <div class="dashboard-section">
        <div class="p-3 bg-white dark:bg-gray-800">
            <div class="flex justify-center">
                <div class="w-full lg:w-8/12">
                    <div class="deposit-preview bg-body dark:bg-gray-700 flex items-center justify-center">
                        <div class="deposit-thumb">
                            <img src="{{ $deposit->gateway_currency()->methodImage() }}" alt="{{ __('Payment Image') }}">
                        </div>
                        <div class="deposit-content justify-center">
                            <ul class="text-center pb-3">
                                <li>
                                    {{ __('Final Amount') }}: <span
                                        class="text-success dark:text-green-400">{{ getAmount($deposit->final_amo) }}
                                        {{ __($deposit->method_currency) }}</span>
                                </li>
                                <li>
                                    {{ __('To Get') }}: <span
                                        class="text-danger dark:text-red-400">{{ getAmount($deposit->amount) }}
                                        {{ __($general->cur_text) }}</span>
                                </li>
                            </ul>
                            <button type="button"
                                class="btn btn-success bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500 text-white font-bold py-2 px-4 rounded w-full"
                                id="btn-confirm">{{ __('Pay Now') }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection


@section('page-scripts')
    <script src="//voguepay.com/js/voguepay.js"></script>
    <script>
        "use strict";
        closedFunction = function() {}
        successFunction = function(transaction_id) {
            window.location.href = '{{ route(gatewayRedirectUrl()) }}';
        }
        failedFunction = function(transaction_id) {
            window.location.href = '{{ route(gatewayRedirectUrl()) }}';
        }

        function pay(item, price) {
            //Initiate voguepay inline payment
            Voguepay.init({
                v_merchant_id: "{{ $data->v_merchant_id }}",
                total: price,
                notify_url: "{{ $data->notify_url }}",
                cur: "{{ $data->cur }}",
                merchant_ref: "{{ $data->merchant_ref }}",
                memo: "{{ $data->memo }}",
                recurrent: true,
                frequency: 10,
                developer_code: '5af93ca2913fd',
                store_id: "{{ $data->store_id }}",
                custom: "{{ $data->custom }}",

                closed: closedFunction,
                success: successFunction,
                failed: failedFunction
            });
        }

        $(document).ready(function() {
            $(document).on('click', '#btn-confirm', function(e) {
                e.preventDefault();
                pay('Buy', {{ $data->Buy }});
            });
        });
    </script>
@endsection
