@extends('layouts.admin')
@section('content')
    <form action="{{ route('admin.platform.update') }}" method="POST" enctype="multipart/form-data" id="settings">
        @csrf
        <div class="card">
            <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab"
                    data-tabs-toggle="#myTabContent" role="tablist">
                    <li class="mr-2" role="presentation">
                        <button class="inline-block p-4 rounded-t-lg border-b-2" id="system-tab" data-tabs-target="#system"
                            type="button" role="tab" aria-controls="system"
                            aria-selected="true">{{ __('System') }}</button>

                    </li>
                    <li class="mr-2" role="presentation">
                        <button
                            class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab"
                            aria-controls="dashboard" aria-selected="false">{{ __('Dashboard') }}</button>

                    </li>
                    <li class="mr-2" role="presentation">
                        <button
                            class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            id="trading-tab" data-tabs-target="#trading" type="button" role="tab"
                            aria-controls="trading" aria-selected="false">{{ __('Trading') }}</button>

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
                                id="staking-tab" data-tabs-target="#staking" type="button" role="tab"
                                aria-controls="staking" aria-selected="false">{{ __('Staking') }}</button>
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
                </ul>
            </div>




            <div>
                <div id="myTabContent">
                    <div class="space-y-3 px-3" id="system" aria-labelledby="system-tab" role="tabpanel">
                        <div class="border rounded dark:border-gray-600 shadow p-2">
                            <div class="flex items-center mb-2">
                                <label class="inline-flex relative items-center cursor-pointer mr-3">
                                    <input type="checkbox" value="{{ $platform->kyc->kyc_status }}" class="sr-only peer"
                                        onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                                        data-off="{{ __('Inactive') }}" name="kyc_status" id="kyc_status"
                                        @if ($platform->kyc->kyc_status == 1) checked @endif>
                                    <div class="toggle peer">
                                    </div>
                                </label>
                                <span
                                    class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('KYC') }}</span>
                            </div>
                            <small class="text-warning">
                                {{ __('WARNING: Disabling verification will allow clients to trade without any verification. This may increase the risk of fraudulent activities on your platform. It is highly recommended to keep verification enabled to ensure compliance with regulatory requirements and to protect your platform and its users.') }}
                            </small>
                        </div>

                        <div class="border rounded dark:border-gray-600 shadow p-2">
                            <div class="flex items-center mb-2">
                                <label class="inline-flex relative items-center cursor-pointer mr-3">
                                    <input type="checkbox" value="{{ $platform->system->maintenance }}"
                                        class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                        data-on="{{ __('Active') }}" data-off="{{ __('Inactive') }}" name="maintenance"
                                        id="maintenance" @if ($platform->system->maintenance == 1) checked @endif>
                                    <div class="toggle peer">
                                    </div>
                                </label>
                                <span
                                    class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Maintenance') }}</span>
                            </div>
                            <small class="text-warning">
                                {{ __('WARNING: Enabling maintenance mode will make your platform unavailable to users. This is typically used to perform scheduled maintenance or updates. Please ensure that you have notified your users in advance and provided an estimated time for the platform to be back online. Additionally, consider providing a custom message with more details about the maintenance, and use this opportunity to promote upcoming features or changes on your platform.') }}
                            </small>
                        </div>

                        <div class="border rounded dark:border-gray-600 shadow p-2">
                            <div class="flex items-center mb-2">
                                <label class="inline-flex relative items-center cursor-pointer mr-3">
                                    <input type="checkbox" value="{{ $platform->system->phone }}" class="sr-only peer"
                                        onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                                        data-off="{{ __('Inactive') }}" name="phone" id="phone"
                                        @if ($platform->system->phone == 1) checked @endif>
                                    <div class="toggle peer">
                                    </div>
                                </label>
                                <span
                                    class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Phone Number') }}</span>
                            </div>
                            <small class="text-warning">
                                {{ __('WARNING: Enabling phone number in the registration page will require users to provide a valid phone number to create an account. This can help increase security and prevent fraudulent activities on your platform. However, it is important to ensure that you comply with applicable privacy laws and regulations, and that you provide users with clear information about how their phone number will be used and protected. Additionally, consider implementing two-factor authentication to further enhance security on your platform.') }}
                            </small>
                        </div>

                        <div class="border rounded dark:border-gray-600 shadow p-2">
                            <div class="flex items-center mb-2">
                                <label class="inline-flex relative items-center cursor-pointer mr-3">
                                    <input type="checkbox" value="{{ $platform->frontend->frontend_status }}"
                                        class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                        data-on="{{ __('Active') }}" data-off="{{ __('Inactive') }}"
                                        name="frontend_status" id="frontend_status"
                                        @if ($platform->frontend->frontend_status == 1) checked @endif>
                                    <div class="toggle peer">
                                    </div>
                                </label>
                                <span
                                    class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Frontend') }}</span>
                            </div>
                            <small class="text-warning">
                                {{ __('WARNING: Disabling the frontend will redirect users to the login page when they access your platform. This can affect the usability and accessibility of your platform, as users will not be able to access any content or features without logging in. Therefore, it is recommended to keep the frontend enabled and ensure that it provides a user-friendly interface with clear navigation and instructions for accessing content and features. If you need to perform maintenance or updates, consider using maintenance mode instead. Additionally, ensure that appropriate security measures are in place, such as strong password policies, two-factor authentication, and session timeouts.') }}
                            </small>
                        </div>

                        <div class="border rounded dark:border-gray-600 shadow p-2">
                            <div class="flex items-center mb-2">
                                <label class="inline-flex relative items-center cursor-pointer mr-3">
                                    <input type="checkbox"
                                        value="{{ isset($platform->system->dark_mode) ? $platform->system->dark_mode : 0 }}"
                                        class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                        data-on="{{ __('Active') }}" data-off="{{ __('Inactive') }}" name="dark_mode"
                                        id="dark_mode" @if (isset($platform->system->dark_mode) && $platform->system->dark_mode == 1) checked @endif>
                                    <div class="toggle peer">
                                    </div>
                                </label>
                                <span
                                    class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Dark Mode') }}</span>
                            </div>
                            <small class="text-warning">
                                {{ __('WARNING: Enabling the default dark mode theme will change the appearance of your platform to a dark background with light text. While this can provide a more comfortable viewing experience for some users and reduce eye strain, it may not be preferred by all users. Additionally, test the platform thoroughly in both modes to ensure that all content and features are visible and functional.') }}
                            </small>
                        </div>
                    </div>
                    <div class="space-y-3 px-3" id="dashboard" aria-labelledby="dashboard-tab" role="tabpanel">
                        <div class="border rounded dark:border-gray-600 shadow p-2">
                            <div class="flex items-center justify-between">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    for="default_page">{{ __('Default Dashboard Page') }}</label>
                                <select
                                    class="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    id="default_page" name="default_page">
                                    <option value="" @if (
                                        !isset($platform->dashboard->default_page) ||
                                            $platform->dashboard->default_page == null ||
                                            $platform->dashboard->default_page == '') selected @endif>
                                        {{ __('Default Dashboard') }}
                                    </option>
                                    <option value="trading" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'trading') selected @endif>
                                        {{ __('Trading Page') }}
                                    </option>
                                    <option value="binary" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'binary') selected @endif>
                                        {{ __('Binary Dashboard') }}
                                    </option>
                                    <option value="bot" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'bot') selected @endif>
                                        {{ __('Bot Dashboard') }}
                                    </option>
                                    <option value="ico" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'ico') selected @endif>
                                        {{ __('Token Offers Page') }}
                                    </option>
                                    <option value="mlm" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'mlm') selected @endif>
                                        {{ __('Referrals Page') }}
                                    </option>
                                    <option value="forex" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'forex') selected @endif>
                                        {{ __('Forex Dashboard') }}
                                    </option>
                                    <option value="staking" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'staking') selected @endif>
                                        {{ __('Staking Dashboard') }}
                                    </option>
                                    <option value="knowledge" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'knowledge') selected @endif>
                                        {{ __('Knowledge Base Page') }}
                                    </option>
                                </select>
                            </div>
                            <small
                                class="text-warning">{{ __('Choose the page that users will see first after they log in to your platform. This can be a dashboard, a trading page, or any other page that provides a personalized and relevant experience for the user.') }}</small>
                        </div>
                        <!-- Add new options for border options and sidebar design -->
                        <div class="border rounded dark:border-gray-600 shadow p-2 mt-4 space-y-5"
                            x-data="{
                                design: '{{ isset($platform->dashboard->sidebar->design) ? $platform->dashboard->sidebar->design : 'rounded' }}',
                                borderSide: '{{ isset($platform->dashboard->sidebar->borderSide) ? $platform->dashboard->sidebar->borderSide : 'left' }}',
                                borderColor: '{{ isset($platform->dashboard->sidebar->borderColor) ? $platform->dashboard->sidebar->borderColor : '#3b82f6' }}',
                                borderWidth: '{{ isset($platform->dashboard->sidebar->borderWidth) ? $platform->dashboard->sidebar->borderWidth : '4' }}',
                            }">
                            <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-3">
                                <div>
                                    <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        for="sidebar_design">{{ __('Sidebar Design') }}</label>
                                    <select
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="sidebar_design" name="sidebar_design" @change="design = $event.target.value">
                                        <option value="rounded" @if (
                                            !isset($platform->dashboard->sidebar->design) ||
                                                $platform->dashboard->sidebar->design == null ||
                                                $platform->dashboard->sidebar->design == 'rounded') selected @endif>
                                            {{ __('Rounded') }}
                                        </option>
                                        <option value="square" @if (isset($platform->dashboard->sidebar->design) && $platform->dashboard->sidebar->design == 'square') selected @endif>
                                            {{ __('Square') }}
                                        </option>
                                    </select>
                                    <small
                                        class="text-warning">{{ __('Choose the design of the sidebar menu items, such as rounded or square.') }}</small>
                                </div>
                                <!-- Menu item preview -->
                                <div>
                                    <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        for="preview">{{ __('Preview') }}</label>
                                    <div class=" w-full max-w-[4rem] bg-white dark:bg-transparent lg:w-[3.5rem]">
                                        <div class="flex flex-col divide-y divide-gray-200 dark:divide-gray-700"
                                            :class="{
                                                'px-2': design === 'rounded',
                                            }">
                                            <ul
                                                :class="{
                                                    'rounded-lg ': design === 'rounded',
                                                }">
                                                <li class="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                                                    :class="{
                                                        'rounded-lg ': design === 'rounded',
                                                    }"
                                                    :style="borderSide !== 'full' ?
                                                        `transition: border-${borderSide} 0.2s ease-in-out, transform 0.2s ease-in-out;border-${borderSide}-style: solid;border-${borderSide}-color: ${borderColor}; border-${borderSide}-width: ${borderWidth}px;` :
                                                        `transition: border 0.2s ease-in-out, transform 0.2s ease-in-out;border-style: solid;border-color: ${borderColor}; border-width: ${borderWidth / 2}px;`">
                                                    <div class="group flex w-full items-center text-base font-normal text-gray-900 transition-transform duration-300 ease-in-out hover:translate-x-1 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                                        :class="{
                                                            'px-4 py-4': design === 'square',
                                                            'px-2.5 py-3': design === 'rounded',
                                                        }">
                                                        <i class="bi bi-house"
                                                            style="display: inline-flex;align-items: center;justify-content: center;width: 20px;"></i>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-3">
                                <div>
                                    <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        for="sidebar_border_side">{{ __('Border Side') }}</label>
                                    <select
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="sidebar_border_side" name="sidebar_border_side"
                                        @change="borderSide = $event.target.value">
                                        <option value="full" @if (isset($platform->dashboard->sidebar->borderSide) && $platform->dashboard->sidebar->borderSide == 'full') selected @endif>
                                            {{ __('Full') }}
                                        </option>
                                        <option value="top" @if (isset($platform->dashboard->sidebar->borderSide) && $platform->dashboard->sidebar->borderSide == 'top') selected @endif>
                                            {{ __('Top') }}
                                        </option>
                                        <option value="right" @if (isset($platform->dashboard->sidebar->borderSide) && $platform->dashboard->sidebar->borderSide == 'right') selected @endif>
                                            {{ __('Right') }}
                                        </option>
                                        <option value="bottom" @if (isset($platform->dashboard->sidebar->borderSide) && $platform->dashboard->sidebar->borderSide == 'bottom') selected @endif>
                                            {{ __('Bottom') }}
                                        </option>
                                        <option value="left" @if (
                                            !isset($platform->dashboard->sidebar->borderSide) ||
                                                $platform->dashboard->sidebar->borderSide == null ||
                                                $platform->dashboard->sidebar->borderSide == 'left') selected @endif>
                                            {{ __('Left') }}
                                        </option>
                                    </select>

                                    <small
                                        class="text-warning">{{ __('Choose the border side of the sidebar menu items, such as left or right.') }}</small>
                                </div>
                                <div>
                                    <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        for="sidebar_border_color">{{ __('Border Color') }}</label>
                                    <div class="flex items-center">
                                        <input
                                            class="border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            id="sidebar_border_color" name="sidebar_border_color" type="text"
                                            :value="borderColor" @input="borderColor = $event.target.value"
                                            placeholder="#3b82f6">
                                        <input class="w-10 h-10 rounded-r-lg cursor-pointer" type="color"
                                            :value="borderColor" @input="borderColor = $event.target.value">
                                    </div>
                                    <small
                                        class="text-warning">{{ __('Choose the border color of the sidebar menu items. Use the color picker or type a valid color code.') }}</small>
                                </div>
                                <div>
                                    <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        for="sidebar_border_width">{{ __('Border Width') }}</label>
                                    <div class="input-group">
                                        <input id="sidebar_border_width" name="sidebar_border_width" type="number"
                                            :value="borderWidth" @input="borderWidth = $event.target.value"
                                            placeholder="4">
                                        <span>px</span>
                                    </div>
                                    <small
                                        class="text-warning">{{ __('Choose the border width of the sidebar menu items. Input a valid CSS width value, such as 4px.') }}</small>
                                </div>

                            </div>

                        </div>



                        @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'trading')
                            <div class="border rounded dark:border-gray-600 shadow p-2">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <label class="text-sm font-medium text-gray-900 dark:text-gray-300"
                                            for="first_trade_page">{{ __('First Trading Page') }}</label>
                                    </div>
                                    <input class="form-control max-w-sm" type="text" name="first_trade_page"
                                        value="{{ $platform->trading->first_trade_page ?? 'BTC/USDT' }}">
                                </div>
                                <small
                                    class="text-warning">{{ __('Choose the default trading pair that users will see when the first page option is set to the trading page on your platform. This can be any trading pair that is available on your platform and that you want to promote or highlight to users. It can be changed by the user at any time during the trading session.') }}</small>
                            </div>
                        @endif

                        <div class="border
                                    rounded dark:border-gray-600 shadow p-2">
                            <div class="flex items-center mb-2">
                                <label class="inline-flex relative items-center cursor-pointer mr-3">
                                    <input type="checkbox" value="{{ $platform->dashboard->news ?? 1 }}"
                                        class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="Enable"
                                        data-off="Disable" name="news" id="news"
                                        @if (isset($platform->dashboard->news) && $platform->dashboard->news == 1) checked @endif>
                                    <div class="toggle peer">
                                    </div>
                                </label>
                                <span
                                    class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('News') }}</span>
                            </div>
                            <small
                                class="text-warning">{{ __('Enabling news on the right sidebar will display the latest news and updates relevant to your platform or industry. This can provide users with valuable information and insights, and can help to increase engagement and user retention on your platform.') }}</small>
                        </div>
                    </div>
                    <div class="space-y-3 px-3" id="trading" aria-labelledby="trading-tab" role="tabpanel">
                        <div class="border rounded dark:border-gray-600 shadow p-2">
                            <div class="flex items-center mb-2">
                                <label class="inline-flex relative items-center cursor-pointer mr-3">
                                    <input type="checkbox" value="{{ $platform->trading->binary_status }}"
                                        class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="Cover"
                                        data-off="Minimal" name="binary_status" id="binary_status"
                                        @if ($platform->trading->binary_status == 1) checked @endif>
                                    <div class="toggle peer">
                                    </div>
                                </label>
                                <span
                                    class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Binary Trading') }}</span>
                            </div>
                            <small class="text-warning">
                                {{ __('WARNING: Enabling or disabling the binary system on your platform can have a significant impact on the functionality and user experience of your platform. Binary systems are a specific type of trading system that involves predicting the outcome of a yes/no proposition. If you choose to enable the binary system, ensure that it is supported by your platform\'s technology and that you comply with applicable laws and regulations. Additionally, consider providing users with educational resources and risk warnings about the binary system. If you choose to disable the binary system, inform your users in advance and ensure that any related features or content are removed from the platform.') }}
                            </small>
                        </div>

                        <div class="border rounded dark:border-gray-600 shadow p-2">
                            <div class="flex items-center mb-2">
                                <label class="inline-flex relative items-center cursor-pointer mr-3">
                                    <input type="checkbox" value="{{ $platform->trading->practice }}"
                                        class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="Cover"
                                        data-off="Minimal" name="practice" id="practice"
                                        @if ($platform->trading->practice == 1) checked @endif>
                                    <div class="toggle peer">
                                    </div>
                                </label>
                                <span
                                    class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Practice Trading Only') }}</span>
                            </div>
                            <small
                                class="text-success">{{ __('Enabling this mode will disable deposits and withdrawals on your platform. Clients will not be able to add or withdraw funds automatically, and trading will be limited to practice only. Admins will have to manually add balance to clients\' accounts. This mode can be useful for testing or for restricting trading activity during maintenance or other special circumstances. However, it may also affect user engagement and trading volume on your platform.') }}</small>
                        </div>
                    </div>
                    <div class="space-y-3 px-3" id="wallet" aria-labelledby="wallet-tab" role="tabpanel">
                        <div class="border rounded dark:border-gray-600 shadow p-2">
                            <div class="flex items-center justify-between">
                                <label class="form-control-label mr-1">{{ __('Deposit Fees') }}</label>
                                <select id="deposit_fees_method" name="deposit_fees_method"
                                    class="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="added"
                                        {{ $platform->wallet->deposit_fees_method == 'added' ? 'selected' : '' }}>
                                        {{ __('Added') }}</option>
                                    <option value="subtracted"
                                        {{ $platform->wallet->deposit_fees_method == 'subtracted' ? 'selected' : '' }}>
                                        {{ __('Subtracted') }}</option>
                                </select>
                            </div>
                            <small
                                class="text-warning">{{ __('When deposit fees are added, the total deposit amount will include the fees. This means that clients will be charged the deposit fees on top of the deposited amount, and the total amount will be reflected in their account balance. When deposit fees are subtracted, the fees will be deducted from the deposited amount before it is reflected in the client\'s account balance. It is important to clearly communicate the deposit fee policy to clients and ensure that it is consistent with applicable laws and regulations. Additionally, consider providing clients with options for depositing funds that may incur lower fees, and ensure that the fee structure is transparent and easy to understand.') }}</small>
                        </div>
                    </div>
                    @if ($ext[3] == 1)
                        <div class="grid xs:grid-cols-1 md:grid-cols-4 gap-5" id="mlm" aria-labelledby="mlm-tab"
                            role="tabpanel">
                            <ul class="nav nav-tabs nav-fill border-primary shadow col-span-1 ml-3" role="tablist"
                                data-tabs-toggle="#myTabContent2">
                                <li
                                    class="flex justify-start items-center p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                                    <a id="mlm_general-tab" data-tabs-target="#mlm_general" aria-controls="mlm_general"
                                        role="tab" aria-selected="true">{{ __('General Settings') }}</a>
                                </li>
                                <li
                                    class="flex justify-start items-center p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                                    <a id="mlm_membership-tab" data-tabs-target="#mlm_membership"
                                        aria-controls="mlm_membership" role="tab"
                                        aria-selected="false">{{ __('Membership') }}</a>
                                </li>
                                <li
                                    class="flex justify-start items-center p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                                    <a id="mlm_community_line-tab" data-tabs-target="#mlm_community_line"
                                        aria-controls="mlm_community_line" role="tab"
                                        aria-selected="false">{{ __('Community Line') }}</a>
                                </li>
                                <li
                                    class="flex justify-start items-center p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                                    <a id="mlm_earning_methods-tab" data-tabs-target="#mlm_earning_methods"
                                        aria-controls="mlm_earning_methods" role="tab"
                                        aria-selected="false">{{ __('Earning Methods') }}</a>
                                </li>
                                @if (isset($platform->mlm->type) && $platform->mlm->type == 'unilevel')
                                    <li
                                        class="flex justify-start items-center p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                                        <a id="mlm_rewards-tab" data-tabs-target="#mlm_rewards"
                                            aria-controls="mlm_rewards" role="tab"
                                            aria-selected="false">{{ __('Unilevel Reward Percentage') }}</a>
                                    </li>
                                @endif
                            </ul>
                            <div class="tab-content col-span-3" id="myTabContent2">
                                <div class="space-y-3 px-3 mb-1 active" id="mlm_general"
                                    aria-labelledby="mlm_general-tab" role="tabpanel">
                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center justify-between">
                                            <label class="form-control-label mr-1">{{ __('MLM System Type') }}</label>
                                            <select id="mlm_type" name="mlm_type"
                                                class="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="binary"
                                                    {{ isset($platform->mlm->type) && $platform->mlm->type == 'binary' ? 'selected' : '' }}>
                                                    {{ __('Binary') }}</option>
                                                <option value="unilevel"
                                                    {{ isset($platform->mlm->type) && $platform->mlm->type == 'unilevel' ? 'selected' : '' }}>
                                                    {{ __('Unilevel') }}</option>
                                            </select>
                                        </div>
                                        <small
                                            class="text-warning">{{ __('The Binary commission system allows users to rank and earn higher commission based on their performance. It is a type of multi-level marketing system that involves building a binary tree structure, where each user has two direct referrals. The Unilevel commission system, on the other hand, allows clients to earn commission up to 7 levels based on a defined percentage. This system is often used in network marketing and direct sales businesses. It is important to ensure that the commission systems are transparent, compliant with applicable laws and regulations, and do not encourage unethical behavior such as spamming or pyramid schemes. Additionally, consider providing users with educational resources and risk warnings about the commission systems.') }}</small>
                                    </div>

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center justify-between">
                                            <label class="form-control-label mr-1">{{ __('MLM Commission Type') }}</label>
                                            <select id="mlm_commission_type" name="mlm_commission_type"
                                                class="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="direct"
                                                    {{ isset($platform->mlm->commission_type) && $platform->mlm->commission_type == 'direct' ? 'selected' : '' }}>
                                                    {{ __('Direct') }}</option>
                                                <option value="daily"
                                                    {{ isset($platform->mlm->commission_type) && $platform->mlm->commission_type == 'daily' ? 'selected' : '' }}>
                                                    {{ __('Daily') }}</option>
                                            </select>
                                        </div>
                                        <small
                                            class="text-warning">{{ __('The Daily commission system allows referrers to earn commission on a daily basis from their referrals\' investments and plans. This system is often used in investment and financial services businesses. It is important to ensure that the commission system is transparent, compliant with applicable laws and regulations, and does not encourage unethical behavior such as spamming or false promises. Additionally, consider providing users with educational resources and risk warnings about the commission system and the underlying investments and plans. It is also recommended to regularly monitor and review the commission system to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                    </div>

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center justify-between">
                                            <div>
                                                <label class="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    for="mlm_min_withdraw">{{ __('Minimum Bv to unlock withdrawal') }}</label>
                                            </div>
                                            <div class="input-group">
                                                <input type="text" name="mlm_min_withdraw"
                                                    value="{{ $platform->mlm->min_withdraw ?? 100 }}">
                                                <span>BV</span>
                                            </div>
                                        </div>
                                        <small
                                            class="text-warning">{{ __('The minimum business value earned is the amount that a user must accumulate in their account before they can unlock the withdrawal button and withdraw their funds. This is often used as a security measure to prevent fraudulent or unauthorized withdrawals. It is important to ensure that the minimum business value is set at a reasonable and fair level, and that it is clearly communicated to users. Additionally, consider providing users with options for withdrawing funds, such as different payment methods or withdrawal thresholds, to improve user experience.') }}</small>
                                    </div>
                                </div>
                                <div class="space-y-3 px-3 mb-1" id="mlm_membership" aria-labelledby="mlm_membership-tab"
                                    role="tabpanel">
                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center mb-2">
                                            <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                <input type="checkbox" value="{{ $platform->mlm->membership ?? 0 }}"
                                                    class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                    name="membership_status" id="membership_status"
                                                    @if (isset($platform->mlm->membership) && $platform->mlm->membership == 1) checked @endif>
                                                <div class="toggle peer">
                                                </div>
                                            </label>
                                            <span
                                                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Membership') }}</span>
                                        </div>
                                        <small
                                            class="text-warning">{{ __('Enabling the membership system on your platform means that only users who have made a deposit can earn commission from the commission methods available on your platform. This can provide an additional layer of security and incentivize users to deposit and invest in your platform. It is important to clearly communicate the membership system policy to users and ensure that it is consistent with applicable laws and regulations. Additionally, consider providing users with educational resources and risk warnings about depositing and investing, and ensure that the fee structure and commission rates are transparent and easy to understand. It is also recommended to regularly monitor and review the membership system to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                    </div>

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center mb-2">
                                            <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                <input type="checkbox"
                                                    value="{{ $platform->mlm->membership_can_earn ?? 0 }}"
                                                    class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                    name="membership_can_earn" id="membership_can_earn"
                                                    @if (isset($platform->mlm->membership_can_earn) && $platform->mlm->membership_can_earn == 1) checked @endif
                                                    onchange="toggleCheckboxValue(this)">
                                                <div class="toggle peer">
                                                </div>
                                            </label>
                                            <span
                                                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Only Members Can Earn') }}</span>
                                        </div>
                                        <small
                                            class="text-warning">{{ __('Enabling the active membership system on your platform means that only clients who have an active membership can earn BV or reward their uplines. This can provide an additional layer of security and incentivize clients to maintain their membership status. It is important to clearly communicate the membership policy to clients and ensure that it is consistent with applicable laws and regulations. Additionally, consider providing clients with educational resources and risk warnings about the membership system, and ensure that the fee structure and commission rates are transparent and easy to understand. It is also recommended to regularly monitor and review the membership system to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                    </div>

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center justify-between">
                                            <label class="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                for="membership_fees">{{ __('Membership deposit/withadraw fees') }}
                                            </label>
                                            <input class="form-control max-w-sm" type="text" name="membership_fees"
                                                value="{{ $platform->mlm->membership_fees ?? '1' }}">
                                        </div>
                                        <small
                                            class="text-warning">{{ __('Enabling fees for the site from all deposits or withdrawals of clients with active membership means that a certain percentage or flat fee will be charged from each deposit or withdrawal made by clients with an active membership. This fee can be used to cover the costs of operating the platform and providing services to clients. It is important to clearly communicate the fee structure to clients and ensure that it is consistent with applicable laws and regulations. Additionally, consider providing clients with options for lower fee deposits or withdrawals, and ensure that the fee structure is transparent and easy to understand. It is also recommended to regularly monitor and review the fee structure to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                    </div>

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center justify-between">
                                            <label class="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                for="membership_duration">{{ __('Membership Duration') }}
                                            </label>
                                            <input class="form-control max-w-sm" type="text"
                                                name="membership_duration"
                                                value="{{ $platform->mlm->membership_duration ?? '25' }}">
                                        </div>
                                        <small
                                            class="text-warning">{{ __('The duration of no BV earning until membership is cancelled refers to the length of time during which a client with an inactive membership will not be able to earn BV. This duration can be set by the platform and can vary depending on the specific policies and regulations. It is important to clearly communicate the duration of the no BV earning period to clients and ensure that it is consistent with applicable laws and regulations. Additionally, consider providing clients with options for maintaining their membership status, such as reminders or incentives to renew their membership. It is also recommended to regularly review and update the duration of the no BV earning period to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                    </div>

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center justify-between">
                                            <label class="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                for="membership_grace_duration">{{ __('Membership Grace Duration') }}
                                            </label>
                                            <input class="form-control max-w-sm" type="text"
                                                name="membership_grace_duration"
                                                value="{{ $platform->mlm->membership_grace_duration ?? '5' }}">
                                        </div>
                                        <small
                                            class="text-warning">{{ __('The grace duration to notify clients to earn BV before final cancellation of membership refers to the length of time during which a client with an inactive membership will be notified to earn BV before their membership is finally cancelled. This duration can be set by the platform and can vary depending on the specific policies and regulations. It is important to clearly communicate the grace duration to clients and ensure that it is consistent with applicable laws and regulations. Additionally, consider providing clients with options for maintaining their membership status, such as reminders or incentives to renew their membership. It is also recommended to regularly review and update the grace duration to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                    </div>

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center mb-2">
                                            <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                <input type="checkbox"
                                                    value="{{ $platform->mlm->membership_custom_deposit ?? 0 }}"
                                                    class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                    data-on="Cover" data-off="Minimal" name="membership_custom_deposit"
                                                    id="membership_custom_deposit"
                                                    @if (isset($platform->mlm->membership_custom_deposit) && $platform->mlm->membership_custom_deposit == 1) checked @endif>
                                                <div class="toggle peer">
                                                </div>
                                            </label>
                                            <span
                                                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Membership Custom Deposit Token') }}</span>
                                        </div>
                                        <small
                                            class="text-warning">{{ __('Showing a deposit card with custom token and wallet address to send to in order to join a membership plan is a feature that enables clients to deposit funds into their account and join a membership plan. The deposit card typically contains a unique token and wallet address that can be used to send funds to the client\'s account. It is important to ensure that the deposit card is secure, user-friendly, and compatible with the payment methods available on the platform. Additionally, consider providing clients with options for different payment methods and currencies, as well as clear instructions on how to use the deposit card. It is also recommended to regularly monitor and review the deposit card feature to ensure that it is functioning properly and meeting the needs of clients.') }}</small>
                                    </div>

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center justify-between">
                                            <label class="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                for="membership_deposit_currency">{{ __('Membership Custom Deposit Currency') }}
                                            </label>
                                            <input class="form-control max-w-sm" type="text"
                                                name="membership_deposit_currency"
                                                value="{{ $platform->mlm->membership_deposit_currency ?? 'USDT' }}">
                                        </div>
                                        <small
                                            class="text-warning">{{ __('The deposit token is a unique code or identifier that is shown on the deposit card and can be used to identify and process the deposit made by the client. It is important to ensure that the deposit token is secure and user-friendly, and that it is compatible with the payment methods available on the platform. Additionally, consider providing clients with clear instructions on how to use the deposit token and how to verify that the deposit has been processed. It is also recommended to regularly monitor and review the deposit token feature to ensure that it is functioning properly and meeting the needs of clients.') }}</small>
                                    </div>

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center justify-between">
                                            <label class="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                for="membership_deposit_currency_network">{{ __('Membership Custom Deposit Currency Network') }}
                                            </label>
                                            <input class="form-control max-w-sm" type="text"
                                                name="membership_deposit_currency_network"
                                                value="{{ $platform->mlm->membership_deposit_currency_network ?? 'ETH' }}">
                                        </div>
                                        <small
                                            class="text-warning">{{ __('Selecting the blockchain of a cryptocurrency on your platform is an important step in enabling deposits and withdrawals for that particular cryptocurrency. The blockchain represents the underlying technology that enables the transfer and storage of the cryptocurrency, and it can impact the speed, security, and fees associated with the transactions. It is important to carefully consider the available options and select a blockchain that is compatible with the cryptocurrency and meets the needs of your clients. Additionally, consider providing clients with educational resources and risk warnings about the selected blockchain, and ensure that the deposit and withdrawal processes are transparent and easy to understand. It is also recommended to regularly monitor and review the blockchain selection to ensure that it is functioning properly and meeting the needs of clients.') }}</small>
                                    </div>

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center justify-between">
                                            <label class="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                for="membership_deposit_wallet">{{ __('Membership Custom Deposit Wallet') }}
                                            </label>
                                            <input class="form-control max-w-sm" type="text"
                                                name="membership_deposit_wallet"
                                                value="{{ $platform->mlm->membership_deposit_wallet ?? '' }}">
                                        </div>
                                        <small
                                            class="text-warning">{{ __('Showing a wallet address to clients when they want to subscribe to a membership plan is an important step in enabling deposits for the membership plan. The wallet address represents the location where the funds will be sent and stored on the blockchain. It is important to ensure that the wallet address is secure, accurate, and compatible with the blockchain and cryptocurrency used for the membership plan. Additionally, consider providing clients with clear instructions on how to use the wallet address and how to verify that the deposit has been processed. It is also recommended to regularly monitor and review the wallet address feature to ensure that it is functioning properly and meeting the needs of clients.') }}</small>
                                    </div>

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center mb-2">
                                            <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                <input type="checkbox"
                                                    value="{{ $platform->mlm->membership_custom_withdraw ?? 0 }}"
                                                    class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                    data-on="Cover" data-off="Minimal" name="membership_custom_withdraw"
                                                    id="membership_custom_withdraw"
                                                    @if (isset($platform->mlm->membership_custom_withdraw) && $platform->mlm->membership_custom_withdraw == 1) checked @endif>
                                                <div class="toggle peer">
                                                </div>
                                            </label>
                                            <span
                                                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Membership Custom Withdraw') }}</span>
                                        </div>
                                        <small
                                            class="text-warning">{{ __('Showing the withdraw card ability to set a client\'s own wallet to withdraw to is a feature that enables clients to withdraw funds from their account to their preferred wallet address. The withdraw card typically contains a form or interface that allows clients to input their wallet address and select the amount they wish to withdraw. It is important to ensure that the withdraw card is secure, user-friendly, and compatible with the payment methods available on the platform. Additionally, consider providing clients with options for different payment methods and currencies, as well as clear instructions on how to use the withdraw card. It is also recommended to regularly monitor and review the withdraw card feature to ensure that it is functioning properly and meeting the needs of clients.') }}</small>
                                    </div>

                                    <div class="shadow rounded p-1">
                                        <div class="flex items-center justify-between">
                                            <label class="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                for="membership_withdraw_currency">{{ __('Membership Custom Withdraw Currency') }}
                                            </label>
                                            <input class="form-control max-w-sm" type="text"
                                                name="membership_withdraw_currency"
                                                value="{{ $platform->mlm->membership_withdraw_currency ?? 'USDT' }}">
                                        </div>
                                        <small class="text-warning">{{ __('Withdraw currency to collect earnings') }}
                                        </small>
                                    </div>

                                    <div class="shadow rounded p-1">
                                        <label class="form-label"
                                            for="membership_terms">{{ __('Membership Upgrade Terms') }}</label>
                                        <textarea id="membership_terms" name="membership_terms">{!! $platform->mlm->membership_terms ?? '' !!}
                                        </textarea>
                                    </div>
                                </div>
                                <div class="space-y-3 px-3 mb-1" id="mlm_community_line"
                                    aria-labelledby="mlm_community_line-tab" role="tabpanel">
                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center mb-2">
                                            <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                <input type="checkbox"
                                                    value="{{ $platform->mlm->community_line_status ?? 0 }}"
                                                    class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                    data-on="Cover" data-off="Minimal" name="community_line_status"
                                                    id="community_line_status"
                                                    @if (isset($platform->mlm->community_line_status) && $platform->mlm->community_line_status == 1) checked @endif>
                                                <div class="toggle peer">
                                                </div>
                                            </label>
                                            <span
                                                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Community Line') }}</span>
                                        </div>
                                        <small
                                            class="text-warning">{{ __('The BV earned by the latest clients in the community when a client makes a deposit on your platform is a feature that rewards the most recent clients in the community with 1% of the deposited amount as BV. BV, or Business Volume, is a measure of the total sales volume generated by the clients in the network. This feature can incentivize clients to refer new members to the platform and increase the overall sales volume. It is important to ensure that the BV calculation is accurate and transparent, and that clients understand how it works. Additionally, consider providing clients with options for tracking their BV earnings and redeeming them for rewards or benefits. It is also recommended to regularly monitor and review the BV feature to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                    </div>
                                    <div class="shadow rounded p-1">
                                        <div class="flex items-center justify-between">
                                            <label class="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                for="community_line_clients">{{ __('Community Line Clients') }}
                                            </label>
                                            <div class="input-group">
                                                <input type="text" name="community_line_clients"
                                                    value="{{ $platform->mlm->community_line_clients ?? '' }}">
                                                <span>{{ __('Client') }}</span>
                                            </div>
                                        </div>
                                        <small
                                            class="text-warning">{{ __('The number of clients that will receive the 1% BV in the community line on your platform is an important setting that can impact the overall rewards and incentives for clients. This setting determines how many clients in the community line, starting from the latest client, will receive the 1% BV reward when a deposit is made. It is important to carefully consider the number of clients to ensure that the rewards are fair and sustainable for both the clients and the platform. Additionally, consider providing clients with clear instructions on how the BV reward works and how they can benefit from it. It is also recommended to regularly monitor and review the number of clients setting to ensure that it is aligned with the overall goals and vision of the platform.') }}</small>
                                    </div>
                                </div>
                                <div class="space-y-3 px-3 mb-1" id="mlm_earning_methods"
                                    aria-labelledby="mlm_earning_methods" role="tabpanel">
                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center mb-2">
                                            <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                <input type="checkbox" value="{{ $platform->mlm->deposits ?? 0 }}"
                                                    class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                    data-on="Cover" data-off="Minimal" name="mlm_deposits"
                                                    id="mlm_deposits" @if (isset($platform->mlm->deposits) && $platform->mlm->deposits == 1) checked @endif>
                                                <div class="toggle peer">
                                                </div>
                                            </label>
                                            <span
                                                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('BV from Deposits') }}</span>
                                        </div>
                                        <small
                                            class="text-warning">{{ __('The BV percentage earned by a referrer for each of their downline\'s deposits on your platform is a feature that incentivizes clients to refer new members to the platform and earn rewards based on the total sales volume generated by their downlines. BV, or Business Volume, is a measure of the total sales volume generated by the clients in the network. This feature allows the admin to set a BV percentage for each of the referrer\'s downline\'s deposits, which can be used to calculate the referrer\'s total BV earnings. It is important to ensure that the BV percentage calculation is accurate and transparent, and that clients understand how it works. Additionally, consider providing clients with options for tracking their BV earnings and redeeming them for rewards or benefits. It is also recommended to regularly monitor and review the BV feature to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                    </div>
                                    @if (isset($platform->mlm->type) && $platform->mlm->type == 'binary')
                                        <div class="border rounded dark:border-gray-600 shadow p-2">
                                            <div class="flex items-center mb-2">
                                                <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                    <input type="checkbox"
                                                        value="{{ $platform->mlm->first_deposit ?? 0 }}"
                                                        class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                        data-on="Cover" data-off="Minimal" name="mlm_first_deposit"
                                                        id="mlm_first_deposit"
                                                        @if (isset($platform->mlm->first_deposit) && $platform->mlm->first_deposit == 1) checked @endif>
                                                    <div class="toggle peer">
                                                    </div>
                                                </label>
                                                <span
                                                    class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('BV from First Deposits') }}</span>
                                            </div>
                                            <small
                                                class="text-warning">{{ __('The BV percentage earned by a referrer for each of their downline\'s first deposit on your platform is a feature that incentivizes clients to refer new members to the platform and earn rewards based on the first deposit made by their downlines. BV, or Business Volume, is a measure of the total sales volume generated by the clients in the network. This feature allows the admin to set a BV percentage for each of the referrer\'s downline\'s first deposit, which can be used to calculate the referrer\'s total BV earnings. It is important to ensure that the BV percentage calculation is accurate and transparent, and that clients understand how it works. Additionally, consider providing clients with options for tracking their BV earnings and redeeming them for rewards or benefits. It is also recommended to regularly monitor and review the BV feature to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                        </div>

                                        <div class="border rounded dark:border-gray-600 shadow p-2">
                                            <div class="flex items-center mb-2">
                                                <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                    <input type="checkbox"
                                                        value="{{ $platform->mlm->active_first_deposit ?? 0 }}"
                                                        class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                        data-on="Cover" data-off="Minimal"
                                                        name="mlm_active_first_deposit" id="mlm_active_first_deposit"
                                                        @if (isset($platform->mlm->active_first_deposit) && $platform->mlm->active_first_deposit == 1) checked @endif>
                                                    <div class="toggle peer">
                                                    </div>
                                                </label>
                                                <span
                                                    class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('BV from Active First Deposits') }}</span>
                                            </div>
                                            <small
                                                class="text-warning">{{ __('The BV percentage earned by a referrer for each of their active downline\'s first deposits on your platform is a feature that incentivizes clients to refer new members to the platform and earn rewards based on the first deposit made by their active downlines. BV, or Business Volume, is a measure of the total sales volume generated by the clients in the network. This feature allows the admin to set a BV percentage for each of the referrer\'s active downline\'s first deposit, which can be used to calculate the referrer\'s total BV earnings. It is important to ensure that the BV percentage calculation is accurate and transparent, and that clients understand how it works. Additionally, consider providing clients with options for tracking their BV earnings and redeeming them for rewards or benefits. It is also recommended to regularly monitor and review the BV feature to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                        </div>
                                    @endif

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center mb-2">
                                            <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                <input type="checkbox" value="{{ $platform->mlm->trades ?? 0 }}"
                                                    class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                    data-on="Cover" data-off="Minimal" name="mlm_trades" id="mlm_trades"
                                                    @if (isset($platform->mlm->trades) && $platform->mlm->trades == 1) checked @endif>
                                                <div class="toggle peer">
                                                </div>
                                            </label>
                                            <span
                                                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('BV from Trades') }}</span>
                                        </div>
                                        <small
                                            class="text-warning">{{ __('The BV percentage earned by a referrer for each of their downline\'s trades on your platform is a feature that incentivizes clients to refer new members to the platform and earn rewards based on the trading volume generated by their downlines. BV, or Business Volume, is a measure of the total sales volume generated by the clients in the network. This feature allows the admin to set a BV percentage for each of the referrer\'s downline\'s trades, which can be used to calculate the referrer\'s total BV earnings. It is important to ensure that the BV percentage calculation is accurate and transparent, and that clients understand how it works. Additionally, consider providing clients with options for tracking their BV earnings and redeeming them for rewards or benefits. It is also recommended to regularly monitor and review the BV feature to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                    </div>

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center mb-2">
                                            <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                <input type="checkbox" value="{{ $platform->mlm->bot_investment ?? 0 }}"
                                                    class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                    data-on="Cover" data-off="Minimal" name="mlm_bot_investment"
                                                    id="mlm_bot_investment"
                                                    @if (isset($platform->mlm->bot_investment) && $platform->mlm->bot_investment == 1) checked @endif>
                                                <div class="toggle peer">
                                                </div>
                                            </label>
                                            <span
                                                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('BV from Bot Investments') }}</span>
                                        </div>
                                        <small
                                            class="text-warning">{{ __('The BV percentage earned by a referrer for each of their downline\'s bot investments on your platform is a feature that incentivizes clients to refer new members to the platform and earn rewards based on the investments made by their downlines in the bot trading system. BV, or Business Volume, is a measure of the total sales volume generated by the clients in the network. This feature allows the admin to set a BV percentage for each of the referrer\'s downline\'s bot investments, which can be used to calculate the referrer\'s total BV earnings. It is important to ensure that the BV percentage calculation is accurate and transparent, and that clients understand how it works. Additionally, consider providing clients with options for tracking their BV earnings and redeeming them for rewards or benefits. It is also recommended to regularly monitor and review the BV feature to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                    </div>

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center mb-2">
                                            <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                <input type="checkbox" value="{{ $platform->mlm->ico_purchase ?? 0 }}"
                                                    class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                    data-on="Cover" data-off="Minimal" name="mlm_ico_purchase"
                                                    id="mlm_ico_purchase"
                                                    @if (isset($platform->mlm->ico_purchase) && $platform->mlm->ico_purchase == 1) checked @endif>
                                                <div class="toggle peer">
                                                </div>
                                            </label>
                                            <span
                                                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('BV from Token Ico Purchases') }}</span>
                                        </div>
                                        <small
                                            class="text-warning">{{ __('The BV percentage earned by a referrer for each of their downline\'s token ICO purchases on your platform is a feature that incentivizes clients to refer new members to the platform and earn rewards based on the purchases made by their downlines during ICOs. BV, or Business Volume, is a measure of the total sales volume generated by the clients in the network. This feature allows the admin to set a BV percentage for each of the referrer\'s downline\'s token ICO purchases, which can be used to calculate the referrer\'s total BV earnings. It is important to ensure that the BV percentage calculation is accurate and transparent, and that clients understand how it works. Additionally, consider providing clients with options for tracking their BV earnings and redeeming them for rewards or benefits. It is also recommended to regularly monitor and review the BV feature to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                    </div>

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center mb-2">
                                            <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                <input type="checkbox" value="{{ $platform->mlm->forex_deposit ?? 0 }}"
                                                    class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                    data-on="Cover" data-off="Minimal" name="mlm_forex_deposit"
                                                    id="mlm_forex_deposit"
                                                    @if (isset($platform->mlm->forex_deposit) && $platform->mlm->forex_deposit == 1) checked @endif>
                                                <div class="toggle peer">
                                                </div>
                                            </label>
                                            <span
                                                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('BV from Forex Deposits') }}</span>
                                        </div>
                                        <small
                                            class="text-warning">{{ __('The BV percentage earned by a referrer for each of their downline\'s forex deposits on your platform is a feature that incentivizes clients to refer new members to the platform and earn rewards based on the deposits made by their downlines for forex trading. BV, or Business Volume, is a measure of the total sales volume generated by the clients in the network. This feature allows the admin to set a BV percentage for each of the referrer\'s downline\'s forex deposits, which can be used to calculate the referrer\'s total BV earnings. It is important to ensure that the BV percentage calculation is accurate and transparent, and that clients understand how it works. Additionally, consider providing clients with options for tracking their BV earnings and redeeming them for rewards or benefits. It is also recommended to regularly monitor and review the BV feature to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                    </div>

                                    <div class="border rounded dark:border-gray-600 shadow p-2">
                                        <div class="flex items-center mb-2">
                                            <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                <input type="checkbox"
                                                    value="{{ $platform->mlm->forex_investment ?? 0 }}"
                                                    class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                    data-on="Cover" data-off="Minimal" name="mlm_forex_investment"
                                                    id="mlm_forex_investment"
                                                    @if (isset($platform->mlm->forex_investment) && $platform->mlm->forex_investment == 1) checked @endif>
                                                <div class="toggle peer">
                                                </div>
                                            </label>
                                            <span
                                                class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('BV from Forex Investments') }}</span>
                                        </div>
                                        <small
                                            class="text-warning">{{ __('The BV percentage earned by a referrer for each of their downline\'s forex investments on your platform is a feature that incentivizes clients to refer new members to the platform and earn rewards based on the investments made by their downlines in the forex trading system. BV, or Business Volume, is a measure of the total sales volume generated by the clients in the network. This feature allows the admin to set a BV percentage for each of the referrer\'s downline\'s forex investments, which can be used to calculate the referrer\'s total BV earnings. It is important to ensure that the BV percentage calculation is accurate and transparent, and that clients understand how it works. Additionally, consider providing clients with options for tracking their BV earnings and redeeming them for rewards or benefits. It is also recommended to regularly monitor and review the BV feature to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                    </div>
                                    @if ($ext[6] == 1)
                                        <div class="shadow rounded p-1">
                                            <div class="flex items-center mb-2">
                                                <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                    <input type="checkbox" value="{{ $platform->mlm->staking ?? 0 }}"
                                                        class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                        data-on="Cover" data-off="Minimal" name="mlm_staking"
                                                        id="mlm_staking"
                                                        @if (isset($platform->mlm->staking) && $platform->mlm->staking == 1) checked @endif>
                                                    <div class="toggle peer">
                                                    </div>
                                                </label>
                                                <span
                                                    class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('BV from Staking') }}</span>
                                            </div>
                                            <small
                                                class="text-warning">{{ __('The BV percentage earned by a referrer for each of their downline\'s staking on your platform is a feature that incentivizes clients to refer new members to the platform and earn rewards based on the staking activities of their downlines. BV, or Business Volume, is a measure of the total sales volume generated by the clients in the network. This feature allows the admin to set a BV percentage for each of the referrer\'s downline\'s staking activities, which can be used to calculate the referrer\'s total BV earnings. It is important to ensure that the BV percentage calculation is accurate and transparent, and that clients understand how it works. Additionally, consider providing clients with options for tracking their BV earnings and redeeming them for rewards or benefits. It is also recommended to regularly monitor and review the BV feature to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                        </div>
                                    @endif
                                </div>
                                @if (isset($platform->mlm->type) && $platform->mlm->type == 'unilevel')
                                    <div class="space-y-3 px-3 mb-1" id="mlm_rewards" aria-labelledby="mlm_rewards-tab"
                                        role="tabpanel">
                                        <div class="border rounded dark:border-gray-600 shadow p-2">
                                            <div class="flex items-center justify-between">
                                                <div>
                                                    <label class="text-sm font-medium text-gray-900 dark:text-gray-300"
                                                        for="unilevel_upline1_percentage">{{ __('1st Upline') }}
                                                    </label>
                                                    <span class="badge bg-success">{{ __('Active') }}</span>
                                                </div>
                                                <div class="input-group">
                                                    <input type="text" name="unilevel_upline1_percentage"
                                                        value="{{ $platform->mlm->unilevel_upline1_percentage ?? '' }}">
                                                    <span>%</span>
                                                </div>
                                            </div>
                                            <small
                                                class="text-warning">{{ __('The Direct Referrer Commission Percentage is the commission percentage earned by the direct referrer of a client for each transaction made by that client on your platform. This commission is usually a fixed percentage of the transaction value, and can be set by the admin of the platform. It is important to ensure that the commission percentage is fair and competitive, and that it incentivizes clients to refer new members to the platform. Additionally, consider providing clients with options for tracking their commission earnings and redeeming them for rewards or benefits. It is also recommended to regularly monitor and review the commission feature to ensure that it is fair and sustainable for all parties involved.') }}</small>
                                        </div>

                                        <div class="border rounded dark:border-gray-600 shadow p-2">
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center mb-2">
                                                    <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                        <input type="checkbox"
                                                            value="{{ $platform->mlm->unilevel_upline2_status ?? 0 }}"
                                                            class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                            data-on="Cover" data-off="Minimal"
                                                            name="unilevel_upline2_status" id="unilevel_upline2_status"
                                                            @if (isset($platform->mlm->unilevel_upline2_status) && $platform->mlm->unilevel_upline2_status == 1) checked @endif>
                                                        <div class="toggle peer">
                                                        </div>
                                                    </label>
                                                    <span
                                                        class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('2nd Upline') }}</span>
                                                </div>
                                                <div class="input-group">
                                                    <input type="text" name="unilevel_upline2_percentage"
                                                        value="{{ $platform->mlm->unilevel_upline2_percentage ?? '' }}">
                                                    <span>%</span>
                                                </div>
                                            </div>
                                            <small
                                                class="text-warning">{{ __('Second Upline Commission Percentage') }}</small>
                                        </div>

                                        <div class="border rounded dark:border-gray-600 shadow p-2">
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center mb-2">
                                                    <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                        <input type="checkbox"
                                                            value="{{ $platform->mlm->unilevel_upline3_status ?? 0 }}"
                                                            class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                            data-on="Cover" data-off="Minimal"
                                                            name="unilevel_upline3_status" id="unilevel_upline3_status"
                                                            @if (isset($platform->mlm->unilevel_upline3_status) && $platform->mlm->unilevel_upline3_status == 1) checked @endif>
                                                        <div class="toggle peer">
                                                        </div>
                                                    </label>
                                                    <span
                                                        class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('3nd Upline') }}</span>
                                                </div>
                                                <div class="input-group">
                                                    <input type="text" name="unilevel_upline3_percentage"
                                                        value="{{ $platform->mlm->unilevel_upline3_percentage ?? '' }}">
                                                    <span>%</span>
                                                </div>
                                            </div>
                                            <small
                                                class="text-warning">{{ __('Third Upline Commission Percentage') }}</small>
                                        </div>

                                        <div class="border rounded dark:border-gray-600 shadow p-2">
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center mb-2">
                                                    <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                        <input type="checkbox"
                                                            value="{{ $platform->mlm->unilevel_upline4_status ?? 0 }}"
                                                            class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                            data-on="Cover" data-off="Minimal"
                                                            name="unilevel_upline4_status" id="unilevel_upline4_status"
                                                            @if (isset($platform->mlm->unilevel_upline4_status) && $platform->mlm->unilevel_upline4_status == 1) checked @endif>
                                                        <div class="toggle peer">
                                                        </div>
                                                    </label>
                                                    <span
                                                        class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('4nd Upline') }}</span>
                                                </div>
                                                <div>
                                                    <div class="input-group">
                                                        <input type="text" name="unilevel_upline4_percentage"
                                                            value="{{ $platform->mlm->unilevel_upline4_percentage ?? '' }}">
                                                        <span>%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <small
                                                class="text-warning">{{ __('Fourth Upline Commission Percentage') }}</small>
                                        </div>

                                        <div class="border rounded dark:border-gray-600 shadow p-2">
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center mb-2">
                                                    <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                        <input type="checkbox"
                                                            value="{{ $platform->mlm->unilevel_upline5_status ?? 0 }}"
                                                            class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                            data-on="Cover" data-off="Minimal"
                                                            name="unilevel_upline5_status" id="unilevel_upline5_status"
                                                            @if (isset($platform->mlm->unilevel_upline5_status) && $platform->mlm->unilevel_upline5_status == 1) checked @endif>
                                                        <div class="toggle peer">
                                                        </div>
                                                    </label>
                                                    <span
                                                        class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('5nd Upline') }}</span>
                                                </div>
                                                <div class="input-group">
                                                    <input type="text" name="unilevel_upline5_percentage"
                                                        value="{{ $platform->mlm->unilevel_upline5_percentage ?? '' }}">
                                                    <span>%</span>
                                                </div>
                                            </div>
                                            <small
                                                class="text-warning">{{ __('Fifth Upline Commission Percentage') }}</small>
                                        </div>

                                        <div class="border rounded dark:border-gray-600 shadow p-2">
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center mb-2">
                                                    <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                        <input type="checkbox"
                                                            value="{{ $platform->mlm->unilevel_upline6_status ?? 0 }}"
                                                            class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                            data-on="Cover" data-off="Minimal"
                                                            name="unilevel_upline6_status" id="unilevel_upline6_status"
                                                            @if (isset($platform->mlm->unilevel_upline6_status) && $platform->mlm->unilevel_upline6_status == 1) checked @endif>
                                                        <div class="toggle peer">
                                                        </div>
                                                    </label>
                                                    <span
                                                        class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('6nd Upline') }}</span>
                                                </div>
                                                <div class="input-group">
                                                    <input type="text" name="unilevel_upline6_percentage"
                                                        value="{{ $platform->mlm->unilevel_upline6_percentage ?? '' }}">
                                                    <span>%</span>
                                                </div>
                                            </div>
                                            <small
                                                class="text-warning">{{ __('Sixth Upline Commission Percentage') }}</small>
                                        </div>
                                        <div class="border rounded dark:border-gray-600 shadow p-2">
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center mb-2">
                                                    <label class="inline-flex relative items-center cursor-pointer mr-3">
                                                        <input type="checkbox"
                                                            value="{{ $platform->mlm->unilevel_upline7_status ?? 0 }}"
                                                            class="sr-only peer" onchange="toggleCheckboxValue(this)"
                                                            data-on="Cover" data-off="Minimal"
                                                            name="unilevel_upline7_status" id="unilevel_upline7_status"
                                                            @if (isset($platform->mlm->unilevel_upline7_status) && $platform->mlm->unilevel_upline7_status == 1) checked @endif>
                                                        <div class="toggle peer">
                                                        </div>
                                                    </label>
                                                    <span
                                                        class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('7nd Upline') }}</span>
                                                </div>
                                                <div class="input-group">
                                                    <input type="text" name="unilevel_upline7_percentage"
                                                        value="{{ $platform->mlm->unilevel_upline7_percentage ?? '' }}">
                                                    <span>%</span>
                                                </div>
                                            </div>
                                            <small
                                                class="text-warning">{{ __('Seventh Upline Commission Percentage') }}</small>
                                        </div>
                                    </div>
                                @endif
                            </div>
                        </div>
                    @endif
                    @if ($ext[6] == 1)
                        <div class="space-y-3 px-3" id="staking" aria-labelledby="staking-tab" role="tabpanel">
                            <div class="border rounded dark:border-gray-600 shadow p-2">
                                <div class="flex items-center mb-2">
                                    <label class="inline-flex relative items-center cursor-pointer mr-3">
                                        <input type="checkbox" value="{{ $platform->staking->cancel_stake }}"
                                            class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="Cover"
                                            data-off="Minimal" name="cancel_stake" id="cancel_stake"
                                            @if ($platform->staking->cancel_stake == 1) checked @endif>
                                        <div class="toggle peer">
                                        </div>
                                    </label>
                                    <span
                                        class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Cancel Claim Option') }}</span>
                                </div>
                                <small
                                    class="text-danger">{{ __('Enabling this function allows clients to cancel their staking and claim their original amount without profit before the end of the staking duration. This feature may be useful for clients who need access to their funds earlier than expected, but it also carries the risk of reducing the overall profitability of the staking program. It is important to consider the impact of this feature on the platform\'s profitability, as well as the expectations and preferences of your clients. Additionally, consider providing clients with clear and transparent information on the terms and conditions of the staking program, including the cancellation policy. Regular monitoring and review of the staking feature is also recommended to ensure that it remains profitable and sustainable for all parties involved.') }}</small>
                            </div>
                        </div>
                    @endif
                    @if ($ext[10] == 1)
                        <div class="space-y-3 px-3" id="eco" aria-labelledby="eco-tab" role="tabpanel">
                            <div class="border rounded dark:border-gray-600 shadow p-2">
                                <div class="flex items-center mb-2">
                                    <label class="inline-flex relative items-center cursor-pointer mr-3">
                                        <input type="checkbox" value="{{ $platform->eco->ecosystem_trading_only }}"
                                            class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="Cover"
                                            data-off="Minimal" name="ecosystem_trading_only" id="ecosystem_trading_only"
                                            @if ($platform->eco->ecosystem_trading_only == 1) checked @endif>
                                        <div class="toggle peer">
                                        </div>
                                    </label>
                                    <span
                                        class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Show only ecosystem pairs') }}</span>
                                </div>
                                <small
                                    class="text-danger">{{ __('Enabling this function will restrict the trading pairs displayed on your platform to only ecosystem pairs, while hiding all provider trading pairs. Additionally, tabs will be created based on the ecosystem pairing to improve user experience. It is important to consider the impact of this feature on the availability of trading options for your clients, as well as the expectations and preferences of your clients. Additionally, consider providing clients with clear and transparent information on the trading pairs available on the platform. Regular monitoring and review of the trading feature is also recommended to ensure that it remains competitive and sustainable for all parties involved.') }}</small>
                            </div>
                        </div>
                    @endif
                </div>
            </div>
            <div class="card-footer text-end">
                <button type="submit"
                    class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600
                                  dark:hover:bg-blue-700
                                  focus:bg-blue-700
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                  focus:ring-offset-white
                                  dark:focus:ring-offset-gray-800
                                  rounded
                                ">
                    {{ __('Save Changes') }}
                </button>
            </div>
        </div>
    </form>
@endsection


@section('page-scripts')
    <script src="https://cdn.tiny.cloud/1/{{ $general->tinymce }}/tinymce/6/tinymce.min.js" referrerpolicy="origin">
    </script>
    <script>
        $(function() {
            "use strict";
            tinymce.init({
                selector: 'textarea#membership_terms',
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount code',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat | code',
            });
        })

        function toggleCheckboxValue(checkbox) {
            checkbox.value = checkbox.checked ? 1 : 0;
        }
    </script>
@endsection
