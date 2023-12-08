@extends('layouts.user')
@section('content')
    <div class="flex justify-start">
        <div class="card lg:col-span-4 md:col-span-4 bg-white dark:bg-gray-800 shadow-md">
            <div class="deposit-thumb">
                <img src="{{ $deposit->gateway_currency()->methodImage() }}" alt="{{ __('Payment Image') }}">
            </div>
            <div class="card-body">
                <ul class="text-center">
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
            <div class="card-footer">
                <button type="button"
                    class="btn btn-success bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500 text-white font-bold py-2 px-4 rounded w-full"
                    id="btn-confirm" onClick="payWithRave()">{{ __('Pay Now') }}</button>
            </div>
        </div>
    </div>
@endsection

@section('page-scripts')
    <script src="https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"></script>
    <script>
        var btn = document.querySelector("#btn-confirm");
        btn.setAttribute("type", "button");
        const API_publicKey = "{{ $data->API_publicKey }}";

        function payWithRave() {
            var x = getpaidSetup({
                PBFPubKey: API_publicKey,
                customer_email: "{{ $data->customer_email }}",
                amount: "{{ $data->amount }}",
                customer_phone: "{{ $data->customer_phone }}",
                currency: "{{ $data->currency }}",
                txref: "{{ $data->txref }}",
                onclose: function() {},
                callback: function(response) {
                    var txref = response.tx.txRef;
                    var status = response.tx.status;
                    var chargeResponse = response.tx.chargeResponseCode;
                    if (chargeResponse == "00" || chargeResponse == "0") {
                        window.location = "{{ url('ipn/flutterwave') }}/" + txref + '/' + status;
                    } else {
                        window.location =
                            "{{ url('ipn/flutterwave') }}/" + txref + '/' + status;
                    }

                }
            });
        }
    </script>
@endsection
