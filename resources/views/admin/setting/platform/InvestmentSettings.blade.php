<div class="space-y-3 px-3" id="investment" aria-labelledby="investment-tab" role="tabpanel">
    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->system->investment_cancel) ? $platform->system->investment_cancel : 0 }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Enabled') }}"
                    data-off="{{ __('Disabled') }}" name="investment_cancel" id="investment_cancel"
                    @if (isset($platform->system->investment_cancel) && $platform->system->investment_cancel == 1) checked @endif>
                <div class="toggle peer">
                </div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Investment Cancel') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('WARNING: Enabling the investment cancel feature will disable the ability for users to cancel their investment before the specified time ends.') }}
        </span>
    </div>
</div>
