@extends('layouts.admin')

@section('content')
    <form action="{{ route('admin.kyc.template.update') }}" method="POST" id="kyc_settings">
        @csrf
        <input type="hidden" name="template_id" value="{{ $template->id }}">
        <input type="hidden" name="kyc_firstname[]" value="show">
        <input type="hidden" name="kyc_firstname[]" value="req">
        <input type="hidden" name="kyc_firstname[level]" value="1">
        <input type="hidden" name="kyc_email[]" value="show">
        <input type="hidden" name="kyc_email[]" value="req">
        <input type="hidden" name="kyc_email[level]" value="1">


        <div class="mb-5">
            <div class="">
                <h5 class="text-lg font-medium">{{ __('Personal Form Options') }}</h5>
            </div>
            <div class="toggle-content">
                <div class="border-b border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h6 class="kyc-option-subtitle">{{ __('First Name') }}</h6>
                        </div>
                        <div class="flex items-center justify-between space-x-5">
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded disabled:opacity-50 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="fname-show" value="show" name="kyc_firstname[]" checked type="checkbox" disabled>
                                <label
                                    class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"for="fname-show">{{ __('Show') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  disabled:opacity-50"
                                    id="fname-req" value="req" name="kyc_firstname[]" checked type="checkbox" disabled>
                                <label
                                    class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"for="fname-req">{{ __('Required') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <label
                                    class="block pt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">{{ __('Level') }}:</label>
                                <select class="form-control form-control-sm" id="fname_level" name="kyc_firstname[]"
                                    disabled>
                                    <option value="" disabled>{{ __('Choose an option') }}</option>
                                    <option value="1" selected>
                                        {{ __('Verified') }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border-b border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h6 class="kyc-option-subtitle">{{ __('Last Name') }}</h6>
                        </div>
                        <div class="flex items-center justify-between space-x-5">
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="lname-show" value="show"
                                    name="kyc_lastname[]"{{ isset($options['kyc_lastname']) ? (checkpoint_value($options['kyc_lastname'], 'show') ? ' checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="lname-show">{{ __('Show') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="lname-req" value="req"
                                    name="kyc_lastname[]"{{ isset($options['kyc_lastname']) ? (checkpoint_value($options['kyc_lastname'], 'req') ? ' checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="lname-req">{{ __('Required') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <label
                                    class="block pt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">{{ __('Level') }}:</label>
                                <select class="form-control form-control-sm" id="lname_level" name="kyc_lastname[]">
                                    <option value="" disabled selected>{{ __('Choose an option') }}</option>
                                    <option value="1"
                                        {{ isset($options['kyc_lastname']) && field_value($options['kyc_lastname'], 'level') == 1 ? 'selected' : '' }}>
                                        {{ __('Verified') }}
                                    </option>
                                    <option value="2"
                                        {{ isset($options['kyc_lastname']) && field_value($options['kyc_lastname'], 'level') == 2 ? 'selected' : '' }}>
                                        {{ __('Verified Plus') }}
                                    </option>
                                    <option value="3"
                                        {{ isset($options['kyc_lastname']) && field_value($options['kyc_lastname'], 'level') == 3 ? 'selected' : '' }}>
                                        {{ __('Verified Pro') }}
                                    </option>
                                    <option value="4"
                                        {{ isset($options['kyc_lastname']) && field_value($options['kyc_lastname'], 'level') == 4 ? 'selected' : '' }}>
                                        {{ __('Verified Business') }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h6 class="kyc-option-subtitle">{{ __('Email Address') }}</h6>
                        </div>
                        <div class="flex items-center justify-between space-x-5">
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded  disabled:opacity-50 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="kyc-email-show" value="show" name="kyc_email[]" checked type="checkbox" disabled>
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="kyc-email-show">{{ __('Show') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 disabled:opacity-50 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="kyc-email-req" value="req" name="kyc_email[]" checked type="checkbox"
                                    disabled>
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="kyc-email-req">{{ __('Required') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <label
                                    class="block pt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">{{ __('Level') }}:</label>
                                <select class="form-control form-control-sm" id="kyc-email_level" name="kyc_email[]"
                                    disabled>
                                    <option value="" disabled>{{ __('Choose an option') }}</option>
                                    <option value="1" selected>
                                        {{ __('Verified') }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h6 class="kyc-option-subtitle">{{ __('Phone Number') }}</h6>
                        </div>
                        <div class="flex items-center justify-between space-x-5">
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="phone-show" value="show"
                                    name="kyc_phone[]"{{ isset($options['kyc_phone']) ? (checkpoint_value($options['kyc_phone'], 'show') ? ' checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="phone-show">{{ __('Show') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="phone-req" value="req"
                                    name="kyc_phone[]"{{ isset($options['kyc_phone']) ? (checkpoint_value($options['kyc_phone'], 'req') ? ' checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="phone-req">{{ __('Required') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <label
                                    class="block pt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">{{ __('Level') }}:</label>
                                <select class="form-control form-control-sm" id="phone_level" name="kyc_phone[]">
                                    <option value="" disabled selected>{{ __('Choose an option') }}</option>
                                    <option value="1"
                                        {{ isset($options['kyc_phone']) && field_value($options['kyc_phone'], 'level') == 1 ? 'selected' : '' }}>
                                        {{ __('Verified') }}
                                    </option>
                                    <option value="2"
                                        {{ isset($options['kyc_phone']) && field_value($options['kyc_phone'], 'level') == 2 ? 'selected' : '' }}>
                                        {{ __('Verified Plus') }}
                                    </option>
                                    <option value="3"
                                        {{ isset($options['kyc_phone']) && field_value($options['kyc_phone'], 'level') == 3 ? 'selected' : '' }}>
                                        {{ __('Verified Pro') }}
                                    </option>
                                    <option value="4"
                                        {{ isset($options['kyc_phone']) && field_value($options['kyc_phone'], 'level') == 4 ? 'selected' : '' }}>
                                        {{ __('Verified Business') }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h6 class="kyc-option-subtitle">{{ __('Date of Birth') }}</h6>
                        </div>
                        <div class="flex items-center justify-between space-x-5">
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="dob-show" value="show" name="kyc_dob[]"
                                    {{ isset($options['kyc_dob']) ? (checkpoint_value($options['kyc_dob'], 'show') ? 'checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="dob-show">{{ __('Show') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="dob-req" value="req" name="kyc_dob[]"
                                    {{ isset($options['kyc_dob']) ? (checkpoint_value($options['kyc_dob'], 'req') ? 'checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="dob-req">{{ __('Required') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <label
                                    class="block pt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">{{ __('Level') }}:</label>
                                <select class="form-control form-control-sm" id="dob_level" name="kyc_dob[]">
                                    <option value="" disabled selected>{{ __('Choose an option') }}
                                    </option>
                                    <option value="1"
                                        {{ isset($options['kyc_dob']) && field_value($options['kyc_dob'], 'level') == 1 ? 'selected' : '' }}>
                                        {{ __('Verified') }}
                                    </option>
                                    <option value="2"
                                        {{ isset($options['kyc_dob']) && field_value($options['kyc_dob'], 'level') == 2 ? 'selected' : '' }}>
                                        {{ __('Verified Plus') }}
                                    </option>
                                    <option value="3"
                                        {{ isset($options['kyc_dob']) && field_value($options['kyc_dob'], 'level') == 3 ? 'selected' : '' }}>
                                        {{ __('Verified Pro') }}
                                    </option>
                                    <option value="4"
                                        {{ isset($options['kyc_dob']) && field_value($options['kyc_dob'], 'level') == 4 ? 'selected' : '' }}>
                                        {{ __('Verified Business') }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h6 class="kyc-option-subtitle">{{ __('Gender') }}</h6>
                        </div>
                        <div class="flex items-center justify-between space-x-5">
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="gender-show" value="show" name="kyc_gender[]"
                                    {{ isset($options['kyc_gender']) ? (checkpoint_value($options['kyc_gender'], 'show') ? 'checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="gender-show">{{ __('Show') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="gender-req" value="req" name="kyc_gender[]"
                                    {{ isset($options['kyc_gender']) ? (checkpoint_value($options['kyc_gender'], 'req') ? 'checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="gender-req">{{ __('Required') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <label
                                    class="block pt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">{{ __('Level') }}:</label>
                                <select class="form-control form-control-sm" id="gender_level" name="kyc_gender[]">
                                    <option value="" disabled selected>{{ __('Choose an option') }}
                                    </option>
                                    <option value="1"
                                        {{ isset($options['kyc_gender']) && field_value($options['kyc_gender'], 'level') == 1 ? 'selected' : '' }}>
                                        {{ __('Verified') }}
                                    </option>
                                    <option value="2"
                                        {{ isset($options['kyc_gender']) && field_value($options['kyc_gender'], 'level') == 2 ? 'selected' : '' }}>
                                        {{ __('Verified Plus') }}
                                    </option>
                                    <option value="3"
                                        {{ isset($options['kyc_gender']) && field_value($options['kyc_gender'], 'level') == 3 ? 'selected' : '' }}>
                                        {{ __('Verified Pro') }}
                                    </option>
                                    <option value="4"
                                        {{ isset($options['kyc_gender']) && field_value($options['kyc_gender'], 'level') == 4 ? 'selected' : '' }}>
                                        {{ __('Verified Business') }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h6 class="kyc-option-subtitle">{{ __('Country') }}</h6>
                        </div>
                        <div class="flex items-center justify-between space-x-5">
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="country-show" value="show" name="kyc_country[]"
                                    {{ isset($options['kyc_country']) ? (checkpoint_value($options['kyc_country'], 'show') ? 'checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="country-show">{{ __('Show') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="country-req" value="req" name="kyc_country[]"
                                    {{ isset($options['kyc_country']) ? (checkpoint_value($options['kyc_country'], 'req') ? 'checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="country-req">{{ __('Required') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <label
                                    class="block pt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">{{ __('Level') }}:</label>
                                <select class="form-control form-control-sm" id="country_level" name="kyc_country[]">
                                    <option value="" disabled selected>
                                        {{ __('Choose an option') }}</option>
                                    <option value="1"
                                        {{ isset($options['kyc_country']) && field_value($options['kyc_country'], 'level') == 1 ? 'selected' : '' }}>
                                        {{ __('Verified') }}
                                    </option>
                                    <option value="2"
                                        {{ isset($options['kyc_country']) && field_value($options['kyc_country'], 'level') == 2 ? 'selected' : '' }}>
                                        {{ __('Verified Plus') }}
                                    </option>
                                    <option value="3"
                                        {{ isset($options['kyc_country']) && field_value($options['kyc_country'], 'level') == 3 ? 'selected' : '' }}>
                                        {{ __('Verified Pro') }}
                                    </option>
                                    <option value="4"
                                        {{ isset($options['kyc_country']) && field_value($options['kyc_country'], 'level') == 4 ? 'selected' : '' }}>
                                        {{ __('Verified Business') }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h6 class="kyc-option-subtitle">{{ __('Address Line 1') }}</h6>
                        </div>
                        <div class="flex items-center justify-between space-x-5">
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="address-l1-show" value="show"
                                    name="kyc_address1[]"{{ isset($options['kyc_address1']) ? (checkpoint_value($options['kyc_address1'], 'show') ? ' checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="address-l1-show">{{ __('Show') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="address-l1-req" value="req"
                                    name="kyc_address1[]"{{ isset($options['kyc_address1']) ? (checkpoint_value($options['kyc_address1'], 'req') ? ' checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="address-l1-req">{{ __('Required') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <label
                                    class="block pt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">{{ __('Level') }}:</label>
                                <select class="form-control form-control-sm" id="address-l1_level" name="kyc_address1[]">
                                    <option value="" disabled selected>
                                        {{ __('Choose an option') }}</option>
                                    <option value="1"
                                        {{ isset($options['kyc_address1']) && field_value($options['kyc_address1'], 'level') == 1 ? 'selected' : '' }}>
                                        {{ __('Verified') }}
                                    </option>
                                    <option value="2"
                                        {{ isset($options['kyc_address1']) && field_value($options['kyc_address1'], 'level') == 2 ? 'selected' : '' }}>
                                        {{ __('Verified Plus') }}
                                    </option>
                                    <option value="3"
                                        {{ isset($options['kyc_address1']) && field_value($options['kyc_address1'], 'level') == 3 ? 'selected' : '' }}>
                                        {{ __('Verified Pro') }}
                                    </option>
                                    <option value="4"
                                        {{ isset($options['kyc_address1']) && field_value($options['kyc_address1'], 'level') == 4 ? 'selected' : '' }}>
                                        {{ __('Verified Business') }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h6 class="kyc-option-subtitle">{{ __('Address Line 2') }}</h6>
                        </div>
                        <div class="flex items-center justify-between space-x-5">
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="address-l2-show" value="show"
                                    name="kyc_address2[]"{{ isset($options['kyc_address2']) ? (checkpoint_value($options['kyc_address2'], 'show') ? ' checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="address-l2-show">{{ __('Show') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="address-l2-req" value="req"
                                    name="kyc_address2[]"{{ isset($options['kyc_address2']) ? (checkpoint_value($options['kyc_address2'], 'req') ? ' checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="address-l2-req">{{ __('Required') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <label
                                    class="block pt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">{{ __('Level') }}:</label>
                                <select class="form-control form-control-sm" id="address-l2_level" name="kyc_address2[]">
                                    <option value="" disabled selected>
                                        {{ __('Choose an option') }}</option>
                                    <option value="1"
                                        {{ isset($options['kyc_address2']) && field_value($options['kyc_address2'], 'level') == 1 ? 'selected' : '' }}>
                                        {{ __('Verified') }}
                                    </option>
                                    <option value="2"
                                        {{ isset($options['kyc_address2']) && field_value($options['kyc_address2'], 'level') == 2 ? 'selected' : '' }}>
                                        {{ __('Verified Plus') }}
                                    </option>
                                    <option value="3"
                                        {{ isset($options['kyc_address2']) && field_value($options['kyc_address2'], 'level') == 3 ? 'selected' : '' }}>
                                        {{ __('Verified Pro') }}
                                    </option>
                                    <option value="4"
                                        {{ isset($options['kyc_address2']) && field_value($options['kyc_address2'], 'level') == 4 ? 'selected' : '' }}>
                                        {{ __('Verified Business') }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h6 class="kyc-option-subtitle">{{ __('City') }}</h6>
                        </div>
                        <div class="flex items-center justify-between space-x-5">
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="city-show" value="show" name="kyc_city[]"
                                    {{ isset($options['kyc_city']) ? (checkpoint_value($options['kyc_city'], 'show') ? 'checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="city-show">{{ __('Show') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="city-req" value="req" name="kyc_city[]"
                                    {{ isset($options['kyc_city']) ? (checkpoint_value($options['kyc_city'], 'req') ? 'checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="city-req">{{ __('Required') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <label
                                    class="block pt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">{{ __('Level') }}:</label>
                                <select class="form-control form-control-sm" id="city_level" name="kyc_city[]">
                                    <option value="" disabled selected>
                                        {{ __('Choose an option') }}</option>
                                    <option value="1"
                                        {{ isset($options['kyc_city']) && field_value($options['kyc_city'], 'level') == 1 ? 'selected' : '' }}>
                                        {{ __('Verified') }}
                                    </option>
                                    <option value="2"
                                        {{ isset($options['kyc_city']) && field_value($options['kyc_city'], 'level') == 2 ? 'selected' : '' }}>
                                        {{ __('Verified Plus') }}
                                    </option>
                                    <option value="3"
                                        {{ isset($options['kyc_city']) && field_value($options['kyc_city'], 'level') == 3 ? 'selected' : '' }}>
                                        {{ __('Verified Pro') }}
                                    </option>
                                    <option value="4"
                                        {{ isset($options['kyc_city']) && field_value($options['kyc_city'], 'level') == 4 ? 'selected' : '' }}>
                                        {{ __('Verified Business') }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h6 class="kyc-option-subtitle">{{ __('State') }}</h6>
                        </div>
                        <div class="flex items-center justify-between space-x-5">
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="state-show" value="show" name="kyc_state[]"
                                    {{ isset($options['kyc_state']) ? (checkpoint_value($options['kyc_state'], 'show') ? 'checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="state-show">{{ __('Show') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="state-req" value="req" name="kyc_state[]"
                                    {{ isset($options['kyc_state']) ? (checkpoint_value($options['kyc_state'], 'req') ? 'checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="state-req">{{ __('Required') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <label
                                    class="block pt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">{{ __('Level') }}:</label>
                                <select class="form-control form-control-sm" id="state_level" name="kyc_state[]">
                                    <option value="" disabled selected>
                                        {{ __('Choose an option') }}</option>
                                    <option value="1"
                                        {{ isset($options['kyc_state']) && field_value($options['kyc_state'], 'level') == 1 ? 'selected' : '' }}>
                                        {{ __('Verified') }}
                                    </option>
                                    <option value="2"
                                        {{ isset($options['kyc_state']) && field_value($options['kyc_state'], 'level') == 2 ? 'selected' : '' }}>
                                        {{ __('Verified Plus') }}
                                    </option>
                                    <option value="3"
                                        {{ isset($options['kyc_state']) && field_value($options['kyc_state'], 'level') == 3 ? 'selected' : '' }}>
                                        {{ __('Verified Pro') }}
                                    </option>
                                    <option value="4"
                                        {{ isset($options['kyc_state']) && field_value($options['kyc_state'], 'level') == 4 ? 'selected' : '' }}>
                                        {{ __('Verified Business') }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h6 class="kyc-option-subtitle">{{ __('Zip Code') }}
                            </h6>
                        </div>
                        <div class="flex items-center justify-between space-x-5">
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="zip-code-show" value="show" name="kyc_zip[]"
                                    {{ isset($options['kyc_zip']) ? (checkpoint_value($options['kyc_zip'], 'show') ? 'checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="zip-code-show">{{ __('Show') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    id="zip-code-req" value="req" name="kyc_zip[]"
                                    {{ isset($options['kyc_zip']) ? (checkpoint_value($options['kyc_zip'], 'req') ? 'checked' : '') : '' }}
                                    type="checkbox">
                                <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                    for="zip-code-req">{{ __('Required') }}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <label
                                    class="block pt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">{{ __('Level') }}:</label>
                                <select class="form-control form-control-sm" id="zip-code-level" name="kyc_zip[]">
                                    <option value="" disabled selected>
                                        {{ __('Choose an option') }}</option>
                                    <option value="1"
                                        {{ isset($options['kyc_zip']) && field_value($options['kyc_zip'], 'level') == 1 ? 'selected' : '' }}>
                                        {{ __('Verified') }}
                                    </option>
                                    <option value="2"
                                        {{ isset($options['kyc_zip']) && field_value($options['kyc_zip'], 'level') == 2 ? 'selected' : '' }}>
                                        {{ __('Verified Plus') }}
                                    </option>
                                    <option value="3"
                                        {{ isset($options['kyc_zip']) && field_value($options['kyc_zip'], 'level') == 3 ? 'selected' : '' }}>
                                        {{ __('Verified Pro') }}
                                    </option>
                                    <option value="4"
                                        {{ isset($options['kyc_zip']) && field_value($options['kyc_zip'], 'level') == 4 ? 'selected' : '' }}>
                                        {{ __('Verified Business') }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>{{-- . --}}
        <div class="mb-5">
            <div class="">
                <h5 class="text-lg font-medium">
                    {{ __('Document Verification Options') }}</h5>
            </div>
            <div class="toggle-content">
                <div class="border-b border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h6 class="kyc-option-subtitle">{{ __('Verify by Passport') }}</h6>
                        </div>
                        <div class="flex items-center justify-between mr-5">
                            <input
                                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                id="kyc_document-passport" name="kyc_document[passport][status]"
                                value="{{ $options['kyc_document']['passport']['status'] ?? 0 }}"
                                {{ isset($options['kyc_document']['passport']['status']) ? ($options['kyc_document']['passport']['status'] == 1 ? 'checked' : '') : '' }}
                                type="checkbox">
                            <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                for="passport-enable">{{ __('Enable') }}</label>
                        </div>
                        <div class="flex items-center justify-between">
                            <label
                                class="block pt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">{{ __('Level') }}:</label>
                            <select class="form-control form-control-sm" id="passport_level"
                                name="kyc_document[passport][level]">
                                <option value="" disabled selected>{{ __('Choose an option') }}</option>
                                <option value="1"
                                    {{ isset($options['kyc_document']['passport']['level']) && $options['kyc_document']['passport']['level'] == 1 ? 'selected' : '' }}>
                                    {{ __('Verified') }}
                                </option>
                                <option value="2"
                                    {{ isset($options['kyc_document']['passport']['level']) && $options['kyc_document']['passport']['level'] == 2 ? 'selected' : '' }}>
                                    {{ __('Verified Plus') }}
                                </option>
                                <option value="3"
                                    {{ isset($options['kyc_document']['passport']['level']) && $options['kyc_document']['passport']['level'] == 3 ? 'selected' : '' }}>
                                    {{ __('Verified Pro') }}
                                </option>
                                <option value="4"
                                    {{ isset($options['kyc_document']['passport']['level']) && $options['kyc_document']['passport']['level'] == 4 ? 'selected' : '' }}>
                                    {{ __('Verified Business') }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h6 class="kyc-option-subtitle">{{ __('Verify by National Card') }}</h6>
                        </div>
                        <div class="flex items-center justify-between mr-5">
                            <input
                                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                id="kyc_document-nidcard" name="kyc_document[nidcard][status]"
                                value="{{ $options['kyc_document']['nidcard']['status'] ?? 0 }}"
                                {{ isset($options['kyc_document']['nidcard']['status']) ? ($options['kyc_document']['nidcard']['status'] == 1 ? 'checked' : '') : '' }}
                                type="checkbox">
                            <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                for="nid-enable">{{ __('Enable') }}</label>
                        </div>
                        <div class="flex items-center justify-between">
                            <label
                                class="block pt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">{{ __('Level') }}:</label>
                            <select class="form-control form-control-sm" id="nidcard_level"
                                name="kyc_document[nidcard][level]">
                                <option value="" disabled selected>{{ __('Choose an option') }}</option>
                                <option value="1"
                                    {{ isset($options['kyc_document']['nidcard']['level']) && $options['kyc_document']['nidcard']['level'] == 1 ? 'selected' : '' }}>
                                    {{ __('Verified') }}
                                </option>
                                <option value="2"
                                    {{ isset($options['kyc_document']['nidcard']['level']) && $options['kyc_document']['nidcard']['level'] == 2 ? 'selected' : '' }}>
                                    {{ __('Verified Plus') }}
                                </option>
                                <option value="3"
                                    {{ isset($options['kyc_document']['nidcard']['level']) && $options['kyc_document']['nidcard']['level'] == 3 ? 'selected' : '' }}>
                                    {{ __('Verified Pro') }}
                                </option>
                                <option value="4"
                                    {{ isset($options['kyc_document']['nidcard']['level']) && $options['kyc_document']['nidcard']['level'] == 4 ? 'selected' : '' }}>
                                    {{ __('Verified Business') }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h6 class="kyc-option-subtitle">{{ __('Verify by Driving License') }}</h6>
                        </div>
                        <div class="flex items-center justify-between mr-5">
                            <input
                                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                id="kyc_document-driving" name="kyc_document[driving][status]"
                                value="{{ $options['kyc_document']['driving']['status'] ?? 0 }}"
                                {{ isset($options['kyc_document']['driving']['status']) ? ($options['kyc_document']['driving']['status'] == 1 ? 'checked' : '') : '' }}
                                type="checkbox">
                            <label class="pt-2 ml-2 w-full text-sm text-gray-900 dark:text-gray-300"
                                for="dlicense-enable">{{ __('Enable') }}</label>
                        </div>
                        <div class="flex items-center justify-between">
                            <label
                                class="block pt-2 text-sm font-medium text-gray-900 dark:text-white mr-2">{{ __('Level') }}:</label>
                            <select class="form-control form-control-sm" id="driving-level"
                                name="kyc_document[driving][level]">
                                <option value="" disabled selected>{{ __('Choose an option') }}</option>
                                <option value="1"
                                    {{ isset($options['kyc_document']['driving']['level']) && $options['kyc_document']['driving']['level'] == 1 ? 'selected' : '' }}>
                                    {{ __('Verified') }}
                                </option>
                                <option value="2"
                                    {{ isset($options['kyc_document']['driving']['level']) && $options['kyc_document']['driving']['level'] == 2 ? 'selected' : '' }}>
                                    {{ __('Verified Plus') }}
                                </option>
                                <option value="3"
                                    {{ isset($options['kyc_document']['driving']['level']) && $options['kyc_document']['driving']['level'] == 3 ? 'selected' : '' }}>
                                    {{ __('Verified Pro') }}
                                </option>
                                <option value="4"
                                    {{ isset($options['kyc_document']['driving']['level']) && $options['kyc_document']['driving']['level'] == 4 ? 'selected' : '' }}>
                                    {{ __('Verified Business') }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        </div>{{-- . --}}

        <div class="flex items-center justify-between mb-5">
            <h5 class="text-lg font-medium">
                {{ __('Extra Verification Options') }}</h5>
            <button type="button" class="btn btn-outline-secondary addUserData a btn-sm"><i
                    class="bi bi-plus"></i>{{ __('Add new') }}
            </button>
        </div>

        <div class="space-y-2 addedField">
            @if (isset($options['extra_field']))
                @foreach ($options['extra_field'] as $key => $v)
                    <div class="extra-data grid grid-cols-4 gap-3">
                        <input name="extra_field[field_name][]" class="form-control form-control-sm" type="text"
                            value="{{ $v['field_level'] }}" required placeholder="{{ __('Field Name') }}">
                        <select name="extra_field[type][]" class="form-control form-control-sm">
                            <option value="text" @if ($v['type'] == 'text') selected @endif>
                                {{ __('Input Text') }} </option>
                            <option value="textarea" @if ($v['type'] == 'textarea') selected @endif>
                                {{ __('Textarea') }} </option>
                            <option value="file" @if ($v['type'] == 'file') selected @endif>
                                {{ __('File upload') }} </option>
                        </select>
                        <select name="extra_field[validation][]" class="form-control form-control-sm">
                            <option value="required" @if ($v['validation'] == 'required') selected @endif>
                                {{ __('Required') }} </option>
                            <option value="nullable" @if ($v['validation'] == 'nullable') selected @endif>
                                {{ __('Optional') }} </option>
                        </select>
                        <div class="flex">
                            <select class="form-control form-control-sm" id="driving-level" name="extra_field[level][]">
                                <option value="" disabled selected>{{ __('Choose an option') }}</option>
                                <option value="1" {{ isset($v['level']) && $v['level'] == 1 ? 'selected' : '' }}>
                                    {{ __('Verified') }}
                                </option>
                                <option value="2" {{ isset($v['level']) && $v['level'] == 2 ? 'selected' : '' }}>
                                    {{ __('Verified Plus') }}
                                </option>
                                <option value="3" {{ isset($v['level']) && $v['level'] == 3 ? 'selected' : '' }}>
                                    {{ __('Verified Pro') }}
                                </option>
                                <option value="4" {{ isset($v['level']) && $v['level'] == 4 ? 'selected' : '' }}>
                                    {{ __('Verified Business') }}
                                </option>
                            </select>
                            <button class="btn btn-danger removeBtn btn-icon ml-2 btn-sm" type="button">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>
        <div class="card-footer text-end">
            <button class="btn btn-primary" type="submit">{{ __('Update') }}</button>
        </div>
    </form>
@endsection

@push('breadcrumb-plugins')
    <a class="btn btn-outline-secondary" href="{{ route('admin.kyc.templates') }}"><i class="bi bi-chevron-left"></i>
        {{ __('Back') }}</a>
@endpush

@section('page-scripts')
    <script>
        $(function() {
            "use strict";
            $('.addUserData').on('click', function() {
                var html = `
                <div class="extra-data grid grid-cols-4 gap-3">
                    <input name="extra_field[field_name][]" class="form-control form-control-sm"
                        type="text" value="" required placeholder="{{ __('Field Name') }}">
                    <select name="extra_field[type][]" class="form-control form-control-sm">
                        <option value="text" > {{ __('Input Text') }} </option>
                        <option value="textarea" > {{ __('Textarea') }} </option>
                        <option value="file"> {{ __('File upload') }} </option>
                    </select>
                    <select name="extra_field[validation][]" class="form-control form-control-sm">
                        <option value="required"> {{ __('Required') }} </option>
                        <option value="nullable">  {{ __('Optional') }} </option>
                    </select>
                    <div class="flex">
                        <select class="form-control form-control-sm"
                            name="extra_field[level][]">
                            <option value="1" selected>
                                {{ __('Verified') }}
                            </option>
                            <option value="2">
                                {{ __('Verified Plus') }}
                            </option>
                            <option value="3">
                                {{ __('Verified Pro') }}
                            </option>
                            <option value="4">
                                {{ __('Verified Business') }}
                            </option>
                        </select>
                        <button class="btn btn-danger removeBtn btn-icon ml-2 btn-sm" type="button">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>`;
                $('.addedField').append(html)
            });

            $(document).on('click', '.removeBtn', function() {
                $(this).closest('.extra-data').remove();
            });

        });
    </script>
@endsection
