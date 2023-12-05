<div class="space-y-3 px-3" id="eco" aria-labelledby="eco-tab" role="tabpanel">
    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox" value="{{ $platform->eco->ecosystem_trading_only }}" class="sr-only peer"
                    onchange="toggleCheckboxValue(this)" data-on="Cover" data-off="Minimal"
                    name="ecosystem_trading_only" id="ecosystem_trading_only"
                    @if ($platform->eco->ecosystem_trading_only == 1) checked @endif>
                <div class="toggle peer">
                </div>
            </label>
            <span
                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Show only ecosystem pairs') }}</span>
        </div>
        <span
            class="text-danger text-xs">{{ __('Enabling this function will restrict the trading pairs displayed on your platform to only ecosystem pairs, while hiding all provider trading pairs. Additionally, tabs will be created based on the ecosystem pairing to improve user experience. It is important to consider the impact of this feature on the availability of trading options for your clients, as well as the expectations and preferences of your clients. Additionally, consider providing clients with clear and transparent information on the trading pairs available on the platform. Regular monitoring and review of the trading feature is also recommended to ensure that it remains competitive and sustainable for all parties involved.') }}</span>
    </div>
</div>
