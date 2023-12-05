<div class="space-y-3 px-3" id="wallet" aria-labelledby="wallet-tab" role="tabpanel">
    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center justify-between">
            <label class="form-control-label mr-1">{{ __('Deposit Fees') }}</label>
            <select id="deposit_fees_method" name="deposit_fees_method"
                class="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="added" {{ $platform->wallet->deposit_fees_method == 'added' ? 'selected' : '' }}>
                    {{ __('Added') }}</option>
                <option value="subtracted"
                    {{ $platform->wallet->deposit_fees_method == 'subtracted' ? 'selected' : '' }}>
                    {{ __('Subtracted') }}</option>
            </select>
        </div>
        <span
            class="text-warning text-xs">{{ __('When deposit fees are added, the total deposit amount will include the fees. This means that clients will be charged the deposit fees on top of the deposited amount, and the total amount will be reflected in their account balance. When deposit fees are subtracted, the fees will be deducted from the deposited amount before it is reflected in the client\'s account balance. It is important to clearly communicate the deposit fee policy to clients and ensure that it is consistent with applicable laws and regulations. Additionally, consider providing clients with options for depositing funds that may incur lower fees, and ensure that the fee structure is transparent and easy to understand.') }}</span>
    </div>
</div>
