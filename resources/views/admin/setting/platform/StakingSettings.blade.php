<div class="space-y-3 px-3" id="staking" aria-labelledby="staking-tab" role="tabpanel">
    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox" value="{{ $platform->staking->cancel_stake }}" class="sr-only peer"
                    onchange="toggleCheckboxValue(this)" data-on="Cover" data-off="Minimal" name="cancel_stake"
                    id="cancel_stake" @if ($platform->staking->cancel_stake == 1) checked @endif>
                <div class="toggle peer">
                </div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Cancel Claim Option') }}</span>
        </div>
        <span
            class="text-danger text-xs">{{ __('Enabling this function allows clients to cancel their staking and claim their original amount without profit before the end of the staking duration. This feature may be useful for clients who need access to their funds earlier than expected, but it also carries the risk of reducing the overall profitability of the staking program. It is important to consider the impact of this feature on the platform\'s profitability, as well as the expectations and preferences of your clients. Additionally, consider providing clients with clear and transparent information on the terms and conditions of the staking program, including the cancellation policy. Regular monitoring and review of the staking feature is also recommended to ensure that it remains profitable and sustainable for all parties involved.') }}</span>
    </div>
</div>
