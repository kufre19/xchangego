<div class="space-y-3 px-3" id="trading" aria-labelledby="trading-tab" role="tabpanel">
    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox" value="{{ $platform->trading->binary_status }}" class="sr-only peer"
                    onchange="toggleCheckboxValue(this)" data-on="Cover" data-off="Minimal" name="binary_status"
                    id="binary_status" @if ($platform->trading->binary_status == 1) checked @endif>
                <div class="toggle peer">
                </div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Binary Trading') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('WARNING: Enabling or disabling the binary system on your platform can have a significant impact on the functionality and user experience of your platform. Binary systems are a specific type of trading system that involves predicting the outcome of a yes/no proposition. If you choose to enable the binary system, ensure that it is supported by your platform\'s technology and that you comply with applicable laws and regulations. Additionally, consider providing users with educational resources and risk warnings about the binary system. If you choose to disable the binary system, inform your users in advance and ensure that any related features or content are removed from the platform.') }}
        </span>
    </div>

    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox" value="{{ $platform->trading->practice }}" class="sr-only peer"
                    onchange="toggleCheckboxValue(this)" data-on="Cover" data-off="Minimal" name="practice"
                    id="practice" @if ($platform->trading->practice == 1) checked @endif>
                <div class="toggle peer">
                </div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Practice Trading Only') }}</span>
        </div>
        <span
            class="text-danger text-xs">{{ __('Enabling this mode will disable deposits and withdrawals on your platform. Clients will not be able to add or withdraw funds automatically, and trading will be limited to practice only. Admins will have to manually add balance to clients\' accounts. This mode can be useful for testing or for restricting trading activity during maintenance or other special circumstances. However, it may also affect user engagement and trading volume on your platform.') }}</span>
    </div>
</div>
