@extends('layouts.user')
@section('content')
    <div class="flex justify-start">
        <div class="card lg:col-span-4 md:col-span-4">
            <div class="card-header">{{ __('Stripe Payment') }}</div>
            <div class="card-body card-body-deposit">
                <div class="card-wrapper"></div>
                <br><br>
                <form role="form" id="payment-form" method="{{ $data->method }}" action="{{ $data->url }}">
                    @csrf
                    <input type="hidden" value="{{ $data->track }}" name="track">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                        <div>
                            <label for="name">{{ __('CARD NAME') }}</label>
                            <div class="relative">
                                <input type="text"
                                    class="form-control py-2 px-3 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-300"
                                    name="name" placeholder="{{ __('Card Name') }}" autocomplete="off" autofocus />
                                <span class="absolute top-2 right-2 text-lg text-gray-400"><i
                                        class="bi bi-person-badge"></i></span>
                            </div>
                        </div>
                        <div>
                            <label for="cardNumber">{{ __('CARD NUMBER') }}</label>
                            <div class="relative">
                                <input type="tel"
                                    class="form-control py-2 px-3 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-300"
                                    name="cardNumber" placeholder="{{ __('Valid Card Number') }}" autocomplete="off"
                                    required autofocus />
                                <span class="absolute top-2 right-2 text-lg text-gray-400"><i
                                        class="bi bi-credit-card"></i></span>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-4">
                        <div>
                            <label for="cardExpiry">{{ __('EXPIRATION DATE') }}</label>
                            <input type="tel"
                                class="form-control py-2 px-3 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-300"
                                name="cardExpiry" placeholder="{{ __('MM / YYYY') }}" autocomplete="off" required />
                        </div>
                        <div>
                            <label for="cardCVC">{{ __('CVC CODE') }}</label>
                            <input type="tel"
                                class="form-control py-2 px-3 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-300"
                                name="cardCVC" placeholder="{{ __('CVC') }}" autocomplete="off" required />
                        </div>
                    </div>
                    <br>
                    <button class="btn btn-primary text-white py-2 px-4 rounded">{{ __('Pay Now') }}</button>
                </form>
            </div>
        </div>
    </div>
@endsection



@section('page-scripts')
    <script type="text/javascript" src="https://rawgit.com/jessepollak/card/master/dist/card.js"></script>

    <script>
        (function($) {
            "use strict";
            $(document).ready(function() {
                var card = new Card({
                    form: '#payment-form',
                    container: '.card-wrapper',
                    formSelectors: {
                        numberInput: 'input[name="cardNumber"]',
                        expiryInput: 'input[name="cardExpiry"]',
                        cvcInput: 'input[name="cardCVC"]',
                        nameInput: 'input[name="name"]'
                    }
                });
            });
        })(jQuery);
    </script>
@endsection
