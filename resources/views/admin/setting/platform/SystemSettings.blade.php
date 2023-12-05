<div class="space-y-3 px-3" id="system" aria-labelledby="system-tab" role="tabpanel">
    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox" value="{{ $platform->system->maintenance }}" class="sr-only peer"
                    onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}" data-off="{{ __('Inactive') }}"
                    name="maintenance" id="maintenance" @if ($platform->system->maintenance == 1) checked @endif>
                <div class="toggle peer">
                </div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Maintenance') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('WARNING: Enabling maintenance mode will make your platform unavailable to users. This is typically used to perform scheduled maintenance or updates. Please ensure that you have notified your users in advance and provided an estimated time for the platform to be back online. Additionally, consider providing a custom message with more details about the maintenance, and use this opportunity to promote upcoming features or changes on your platform.') }}
        </span>
    </div>

    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox" value="{{ $platform->system->phone }}" class="sr-only peer"
                    onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}" data-off="{{ __('Inactive') }}"
                    name="phone" id="phone" @if ($platform->system->phone == 1) checked @endif>
                <div class="toggle peer">
                </div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Phone Number') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('WARNING: Enabling phone number in the registration page will require users to provide a valid phone number to create an account. This can help increase security and prevent fraudulent activities on your platform. However, it is important to ensure that you comply with applicable privacy laws and regulations, and that you provide users with clear information about how their phone number will be used and protected. Additionally, consider implementing two-factor authentication to further enhance security on your platform.') }}
        </span>
    </div>

    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox" value="{{ $platform->frontend->frontend_status }}" class="sr-only peer"
                    onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}" data-off="{{ __('Inactive') }}"
                    name="frontend_status" id="frontend_status" @if ($platform->frontend->frontend_status == 1) checked @endif>
                <div class="toggle peer">
                </div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Frontend') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('WARNING: Disabling the frontend will redirect users to the login page when they access your platform. This can affect the usability and accessibility of your platform, as users will not be able to access any content or features without logging in. Therefore, it is recommended to keep the frontend enabled and ensure that it provides a user-friendly interface with clear navigation and instructions for accessing content and features. If you need to perform maintenance or updates, consider using maintenance mode instead. Additionally, ensure that appropriate security measures are in place, such as strong password policies, two-factor authentication, and session timeouts.') }}
        </span>
    </div>

    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->system->dark_mode) ? $platform->system->dark_mode : 0 }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                    data-off="{{ __('Inactive') }}" name="dark_mode" id="dark_mode"
                    @if (isset($platform->system->dark_mode) && $platform->system->dark_mode == 1) checked @endif>
                <div class="toggle peer">
                </div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Dark Mode By Default') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('WARNING: Enabling dark mode by default will change the appearance of your platform to a dark background with light text. While this can provide a more comfortable viewing experience for some users and reduce eye strain, it may not be preferred by all users. Additionally, it is important to ensure that your platform is accessible to users with visual impairments and other disabilities. Therefore, it is recommended to provide users with the option to change the appearance of your platform to a light background with dark text.') }}
        </span>
    </div>

    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox"
                    value="{{ isset($platform->system->dark_light_mode_change) ? $platform->system->dark_light_mode_change : 0 }}"
                    class="sr-only peer" onchange="toggleCheckboxValue(this)" data-on="{{ __('Active') }}"
                    data-off="{{ __('Inactive') }}" name="dark_light_mode_change" id="dark_light_mode_change"
                    @if (isset($platform->system->dark_light_mode_change) && $platform->system->dark_light_mode_change == 1) checked @endif>
                <div class="toggle peer">
                </div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Dark/Light Button') }}</span>
        </div>
        <span class="text-warning text-xs">
            {{ __('WARNING: Enabling the dark/light mode button will allow users to change the appearance of your platform to a dark background with light text. While this can provide a more comfortable viewing experience for some users and reduce eye strain, it may not be preferred by all users.') }}
        </span>
    </div>

</div>
