<div class="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent"
        role="tablist">
        <li class="mr-2" role="presentation">
            <button
                class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                id="system-tab" data-tabs-target="#system" type="button" role="tab" aria-controls="system"
                aria-selected="true">{{ __('System') }}</button>
        </li>
        <li class="mr-2" role="presentation">
            <button
                class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                id="kyc-tab" data-tabs-target="#kyc" type="button" role="tab" aria-controls="kyc"
                aria-selected="false">{{ __('KYC') }}</button>
        </li>
        <li class="mr-2" role="presentation">
            <button
                class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard"
                aria-selected="false">{{ __('Dashboard') }}</button>
        </li>
        <li class="mr-2" role="presentation">
            <button
                class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                id="trading-tab" data-tabs-target="#trading" type="button" role="tab" aria-controls="trading"
                aria-selected="false">{{ __('Trading') }}</button>
        </li>
        <li class="mr-2" role="presentation">
            <button
                class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                id="investment-tab" data-tabs-target="#investment" type="button" role="tab"
                aria-controls="investment" aria-selected="false">{{ __('Investment') }}</button>
        </li>
        <li class="mr-2" role="presentation">
            <button
                class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                id="wallet-tab" data-tabs-target="#wallet" type="button" role="tab" aria-controls="wallet"
                aria-selected="false">{{ __('Wallet') }}</button>
        </li>
        @if ($ext[3] == 1)
            <li class="mr-2" role="presentation">
                <button
                    class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    id="mlm-tab" data-tabs-target="#mlm" type="button" role="tab" aria-controls="mlm"
                    aria-selected="false">{{ __('MLM') }}</button>
            </li>
        @endif
        @if ($ext[6] == 1)
            <li class="mr-2" role="presentation">
                <button
                    class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    id="staking-tab" data-tabs-target="#staking" type="button" role="tab" aria-controls="staking"
                    aria-selected="false">{{ __('Staking') }}</button>
            </li>
        @endif
        @if ($ext[10] == 1)
            <li class="mr-2" role="presentation">
                <button
                    class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    id="eco-tab" data-tabs-target="#eco" type="button" role="tab" aria-controls="eco"
                    aria-selected="false">{{ __('Ecosystem') }}</button>
            </li>
        @endif
        @if ($ext[15] == 1)
            <li class="mr-2" role="presentation">
                <button
                    class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    id="futures-tab" data-tabs-target="#futures" type="button" role="tab" aria-controls="futures"
                    aria-selected="false">{{ __('Futures') }}</button>
            </li>
        @endif
    </ul>
</div>
