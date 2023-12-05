<div class="space-y-3 px-3" id="kyc" aria-labelledby="kyc-tab" role="tabpanel">
    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox" value="{{ $platform->kyc->kyc_status }}" class="sr-only peer"
                    onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}" data-off="{{ __('Inactive') }}"
                    name="kyc_status" id="kyc_status" @if ($platform->kyc->kyc_status == 1) checked @endif>
                <div class="toggle peer">
                </div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('KYC') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('WARNING: Disabling verification will allow clients to trade without any verification. This may increase the risk of fraudulent activities on your platform. It is highly recommended to keep verification enabled to ensure compliance with regulatory requirements and to protect your platform and its users.') }}
        </span>
    </div>

    <!-- Trading Restriction -->
    <div class="border rounded dark:border-gray-600 shadow p-2 mt-4">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->kyc->trading_restriction) && $platform->kyc->trading_restriction }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                    data-off="{{ __('Inactive') }}" name="trading_restriction" id="trading_restriction"
                    @if (isset($platform->kyc->trading_restriction) && $platform->kyc->trading_restriction == 1) checked @endif>
                <div class="toggle peer"></div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Trading Restriction') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('When enabled, this feature imposes a KYC verification requirement on users before they can initiate trades.') }}
        </span>
    </div>

    <!-- Binary Trading Restriction -->
    <div class="border rounded dark:border-gray-600 shadow p-2 mt-4">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->kyc->binary_trading_restriction) && $platform->kyc->binary_trading_restriction }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                    data-off="{{ __('Inactive') }}" name="binary_trading_restriction" id="binary_trading_restriction"
                    @if (isset($platform->kyc->binary_trading_restriction) && $platform->kyc->binary_trading_restriction == 1) checked @endif>
                <div class="toggle peer"></div>
            </label>
            <span
                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Binary Trading Restriction') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('When enabled, this feature imposes a restriction on binary options trading, requiring additional KYC verification for users engaging in binary trading activities.') }}
        </span>
    </div>

    <!-- Investments Restriction -->
    <div class="border rounded dark:border-gray-600 shadow p-2 mt-4">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->kyc->investments_restriction) && $platform->kyc->investments_restriction }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                    data-off="{{ __('Inactive') }}" name="investments_restriction" id="investments_restriction"
                    @if (isset($platform->kyc->investments_restriction) && $platform->kyc->investments_restriction == 1) checked @endif>
                <div class="toggle peer"></div>
            </label>
            <span
                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Investments Restriction') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('When enabled, this feature imposes a restriction on Investments, requiring additional KYC verification for users engaging in Investment activities.') }}
        </span>
    </div>

    <!-- Bot Trader Restriction -->
    <div class="border rounded dark:border-gray-600 shadow p-2 mt-4">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->kyc->bot_trader_restriction) && $platform->kyc->bot_trader_restriction }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                    data-off="{{ __('Inactive') }}" name="bot_trader_restriction" id="bot_trader_restriction"
                    @if (isset($platform->kyc->bot_trader_restriction) && $platform->kyc->bot_trader_restriction == 1) checked @endif>
                <div class="toggle peer"></div>
            </label>
            <span
                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Bot Trader Restriction') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('When enabled, this feature imposes a restriction on bot trading activities, requiring additional KYC verification for bot traders.') }}
        </span>
    </div>

    <!-- ICO Restriction -->
    <div class="border rounded dark:border-gray-600 shadow p-2 mt-4">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->kyc->ico_restriction) && $platform->kyc->ico_restriction }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                    data-off="{{ __('Inactive') }}" name="ico_restriction" id="ico_restriction"
                    @if (isset($platform->kyc->ico_restriction) && $platform->kyc->ico_restriction == 1) checked @endif>
                <div class="toggle peer"></div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('ICO Restriction') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('When enabled, this feature imposes a restriction on ICO participation, requiring additional KYC verification for users engaging in ICOs.') }}
        </span>
    </div>

    <!-- Forex Restriction -->
    <div class="border rounded dark:border-gray-600 shadow p-2 mt-4">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->kyc->forex_restriction) && $platform->kyc->forex_restriction }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                    data-off="{{ __('Inactive') }}" name="forex_restriction" id="forex_restriction"
                    @if (isset($platform->kyc->forex_restriction) && $platform->kyc->forex_restriction == 1) checked @endif>
                <div class="toggle peer"></div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Forex Restriction') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('When enabled, this feature imposes a restriction on forex trading, requiring additional KYC verification for users engaging in forex trading activities.') }}
        </span>
    </div>

    <!-- Ecosystem Restriction -->
    <div class="border rounded dark:border-gray-600 shadow p-2 mt-4">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->kyc->ecosystem_restriction) && $platform->kyc->ecosystem_restriction }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                    data-off="{{ __('Inactive') }}" name="ecosystem_restriction" id="ecosystem_restriction"
                    @if (isset($platform->kyc->ecosystem_restriction) && $platform->kyc->ecosystem_restriction == 1) checked @endif>
                <div class="toggle peer"></div>
            </label>
            <span
                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Ecosystem Restriction') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('When enabled, this feature imposes a restriction on ecosystem participation, requiring additional KYC verification for users participating in the platform ecosystem.') }}
        </span>
    </div>

    <!-- Futures Restriction -->
    <div class="border rounded dark:border-gray-600 shadow p-2 mt-4">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->kyc->futures_restriction) && $platform->kyc->futures_restriction }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                    data-off="{{ __('Inactive') }}" name="futures_restriction" id="futures_restriction"
                    @if (isset($platform->kyc->futures_restriction) && $platform->kyc->futures_restriction == 1) checked @endif>
                <div class="toggle peer"></div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Futures Restriction') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('When enabled, this feature imposes a restriction on futures trading, requiring additional KYC verification for users engaging in futures trading activities.') }}
        </span>
    </div>

    <!-- Wallet Details Restriction -->
    <div class="border rounded dark:border-gray-600 shadow p-2 mt-4">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->kyc->wallet_details_restriction) && $platform->kyc->wallet_details_restriction }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                    data-off="{{ __('Inactive') }}" name="wallet_details_restriction"
                    id="wallet_details_restriction" @if (isset($platform->kyc->wallet_details_restriction) && $platform->kyc->wallet_details_restriction == 1) checked @endif>
                <div class="toggle peer"></div>
            </label>
            <span
                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Wallet Details Restriction') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('When enabled, this feature imposes a restriction on wallet details modification, requiring additional KYC verification for users modifying their wallet details.') }}
        </span>
    </div>

    <!-- MLM Restriction -->
    <div class="border rounded dark:border-gray-600 shadow p-2 mt-4">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->kyc->mlm_restriction) && $platform->kyc->mlm_restriction }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                    data-off="{{ __('Inactive') }}" name="mlm_restriction" id="mlm_restriction"
                    @if (isset($platform->kyc->mlm_restriction) && $platform->kyc->mlm_restriction == 1) checked @endif>
                <div class="toggle peer"></div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('MLM Restriction') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('When enabled, this feature imposes a restriction on MLM activities, requiring additional KYC verification for users engaging in MLM programs.') }}
        </span>
    </div>

    <!-- Staking Restriction -->
    <div class="border rounded dark:border-gray-600 shadow p-2 mt-4">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->kyc->staking_restriction) && $platform->kyc->staking_restriction }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                    data-off="{{ __('Inactive') }}" name="staking_restriction" id="staking_restriction"
                    @if (isset($platform->kyc->staking_restriction) && $platform->kyc->staking_restriction == 1) checked @endif>
                <div class="toggle peer"></div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Staking Restriction') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('When enabled, this feature imposes a restriction on staking activities, requiring additional KYC verification for users engaging in staking.') }}
        </span>
    </div>

    <!-- P2P Restriction -->
    <div class="border rounded dark:border-gray-600 shadow p-2 mt-4">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->kyc->p2p_restriction) && $platform->kyc->p2p_restriction }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                    data-off="{{ __('Inactive') }}" name="p2p_restriction" id="p2p_restriction"
                    @if (isset($platform->kyc->p2p_restriction) && $platform->kyc->p2p_restriction == 1) checked @endif>
                <div class="toggle peer"></div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('P2P Restriction') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('When enabled, this feature imposes a restriction on peer-to-peer trading, requiring additional KYC verification for users engaging in P2P transactions.') }}
        </span>
    </div>

    <!-- Ecommerce Restriction -->
    <div class="border rounded dark:border-gray-600 shadow p-2 mt-4">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->kyc->ecommerce_restriction) && $platform->kyc->ecommerce_restriction }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                    data-off="{{ __('Inactive') }}" name="ecommerce_restriction" id="ecommerce_restriction"
                    @if (isset($platform->kyc->ecommerce_restriction) && $platform->kyc->ecommerce_restriction == 1) checked @endif>
                <div class="toggle peer"></div>
            </label>
            <span
                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Ecommerce Restriction') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('When enabled, this feature imposes a restriction on ecommerce activities, requiring additional KYC verification for users engaging in ecommerce transactions.') }}
        </span>
    </div>


    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center justify-between">
            <div class="flex items-center mb-2">
                <label class="inline-flex relative items-center cursor-pointer mr-3">
                    <input type="checkbox" value="{{ $platform->kyc->kyc_level_1_fiat_limit_status ?? 0 }}"
                        class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="Cover" data-off="Minimal"
                        name="unilevel_upline7_status" id="kyc_level_1_fiat_limit_status"
                        @if (isset($platform->kyc->kyc_level_1_fiat_limit_status) && $platform->kyc->kyc_level_1_fiat_limit_status == 1) checked @endif>
                    <div class="toggle peer">
                    </div>
                </label>
                <span
                    class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Level 1 KYC funding wallet limit status') }}</span>
            </div>
            <div class="input-group">
                <input type="number" name="kyc_level_1_fiat_limit_amount"
                    value="{{ $platform->kyc->kyc_level_1_fiat_limit_amount ?? 5000 }}">
                <span>%</span>
            </div>
        </div>
        <span class="text-warning text-xs">{{ __('Level 1 KYC funding wallet limit amount') }}</span>
    </div>
    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center justify-between">
            <div class="flex items-center mb-2">
                <label class="inline-flex relative items-center cursor-pointer mr-3">
                    <input type="checkbox" value="{{ $platform->kyc->kyc_level_2_fiat_limit_status ?? 0 }}"
                        class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="Cover" data-off="Minimal"
                        name="unilevel_upline7_status" id="kyc_level_2_fiat_limit_status"
                        @if (isset($platform->kyc->kyc_level_2_fiat_limit_status) && $platform->kyc->kyc_level_2_fiat_limit_status == 1) checked @endif>
                    <div class="toggle peer">
                    </div>
                </label>
                <span
                    class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Level 2 KYC funding wallet limit status') }}</span>
            </div>
            <div class="input-group">
                <input type="number" name="kyc_level_2_fiat_limit_amount"
                    value="{{ $platform->kyc->kyc_level_2_fiat_limit_amount ?? 10000 }}">
                <span>%</span>
            </div>
        </div>
        <span class="text-warning text-xs">{{ __('Level 2 KYC funding wallet limit amount') }}</span>
    </div>
    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center justify-between">
            <div class="flex items-center mb-2">
                <label class="inline-flex relative items-center cursor-pointer mr-3">
                    <input type="checkbox" value="{{ $platform->kyc->kyc_level_3_fiat_limit_status ?? 0 }}"
                        class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="Cover" data-off="Minimal"
                        name="unilevel_upline7_status" id="kyc_level_3_fiat_limit_status"
                        @if (isset($platform->kyc->kyc_level_3_fiat_limit_status) && $platform->kyc->kyc_level_3_fiat_limit_status == 1) checked @endif>
                    <div class="toggle peer">
                    </div>
                </label>
                <span
                    class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Level 3 KYC funding wallet limit status') }}</span>
            </div>
            <div class="input-group">
                <input type="number" name="kyc_level_3_fiat_limit_amount"
                    value="{{ $platform->kyc->kyc_level_3_fiat_limit_amount ?? 50000 }}">
                <span>%</span>
            </div>
        </div>
        <span class="text-warning text-xs">{{ __('Level 3 KYC funding wallet limit amount') }}</span>
    </div>
    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center justify-between">
            <div class="flex items-center mb-2">
                <label class="inline-flex relative items-center cursor-pointer mr-3">
                    <input type="checkbox" value="{{ $platform->kyc->kyc_level_4_fiat_limit_status ?? 0 }}"
                        class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="Cover" data-off="Minimal"
                        name="unilevel_upline7_status" id="kyc_level_4_fiat_limit_status"
                        @if (isset($platform->kyc->kyc_level_4_fiat_limit_status) && $platform->kyc->kyc_level_4_fiat_limit_status == 1) checked @endif>
                    <div class="toggle peer">
                    </div>
                </label>
                <span
                    class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Level 4 KYC funding wallet limit status') }}</span>
            </div>
            <div class="input-group">
                <input type="number" name="kyc_level_4_fiat_limit_amount"
                    value="{{ $platform->kyc->kyc_level_4_fiat_limit_amount ?? 100000 }}">
                <span>%</span>
            </div>
        </div>
        <span class="text-warning text-xs">{{ __('Level 4 KYC funding wallet limit amount') }}</span>
    </div>
</div>
