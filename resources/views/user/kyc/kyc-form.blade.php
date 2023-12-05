@php
    $option = $defaultDoc = $defaultImg = '';
    $has_docs = null;

    if (isset($options['kyc_document'])) {
        $has_docs = $options['kyc_document'];
        $support_docs = $options['kyc_document'];
        $default_docs = [];
        foreach ($support_docs as $doc => $type) {
            if ($type) {
                $default_docs = ['doc' => $doc, 'name' => $title[$doc], 'image' => $doc];
                break;
            }
        }
        if (!empty($default_docs)) {
            $defaultDoc = $default_docs['name'];
            $defaultImg = $default_docs['image'];
        }
    }

    $step_01 = '01';
    $step_02 = $has_docs ? '02' : '';
    $step_03 = isset($options['extra_field']) && count($options['extra_field']) > 0 ? ($step_02 != '' ? '03' : '02') : '';

@endphp

<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/datepicker.min.js"></script>
<div class="space-y-5">
    <div class="form-step form-step1">
        <div class="form-step-head card-innr">
            <div class="step-head">
                <div class="step-number">{{ $step_01 }}</div>
                <div class="step-head-text">
                    <h4 class="text-warning">{{ __('Personal Details') }}</h4>
                    <p>{{ __('Your basic personal information is required for identification purposes.') }}</p>
                </div>
            </div>
        </div>{{-- .step-head --}}
        <div class="form-step-fields card-innr mb-5">
            <div class="note note-plane note-light-alt note-md pdb-1x">
                <p><i class="bi bi-info-circle"></i>
                    {{ __('Please type carefully and fill out the form with your personal details. You are not allowed to edit the details once you have submitted the application.') }}
                </p>
            </div>
            <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-2">
                @if (isset($options['kyc_firstname']['show']) && $options['kyc_firstname']['show'] == 1)
                    <div>
                        <label for="first-name"
                            class="{{ isset($options['kyc_firstname']['req']) && $options['kyc_firstname']['req'] == 1 ? 'required' : '' }}">{{ __('First Name') }}</label>

                        <input
                            {{ isset($options['kyc_firstname']['req']) && $options['kyc_firstname']['req'] ? 'required' : '' }}
                            class="form-control" type="text"
                            value="{{ isset($user_kyc) ? $user_kyc->firstName : '' }}" id="first-name"
                            name="first_name">

                    </div>
                @endif

                @if (isset($options['kyc_lastname']['show']) && $options['kyc_lastname']['show'] == 1)
                    <div>
                        <label for="last-name"
                            class="{{ isset($options['kyc_lastname']['req']) && $options['kyc_lastname']['req'] == 1 ? 'required' : '' }}">{{ __('Last Name') }}</label>

                        <input
                            {{ isset($options['kyc_lastname']['req']) && $options['kyc_lastname']['req'] ? 'required' : '' }}
                            class="form-control" type="text"
                            value="{{ isset($user_kyc) ? $user_kyc->lastName : '' }}" id="last-name" name="last_name">

                    </div>
                @endif

                @if (isset($options['kyc_email']['show']) && $options['kyc_email']['show'] == 1)
                    <div>
                        <label for="email"
                            class="{{ isset($options['kyc_email']['req']) && $options['kyc_email']['req'] == 1 ? 'required' : '' }}">{{ __('Email Address') }}
                        </label>

                        <input
                            {{ isset($options['kyc_email']['req']) && $options['kyc_email']['req'] ? 'required' : '' }}
                            class="form-control" value="{{ isset($user_kyc) ? $user_kyc->email : '' }}" type="email"
                            id="email" name="email">
                    </div>
                @endif

                @if (isset($options['kyc_phone']['show']) && $options['kyc_phone']['show'] == 1)
                    <div>
                        <label for="phone-number"
                            class="{{ isset($options['kyc_phone']['req']) && $options['kyc_phone']['req'] == 1 ? 'required' : '' }}">{{ __('Phone Number ') }}</label>

                        <input
                            {{ isset($options['kyc_phone']['req']) && $options['kyc_phone']['req'] ? 'required' : '' }}
                            class="form-control" type="text" value="{{ isset($user_kyc) ? $user_kyc->phone : '' }}"
                            id="phone-number" name="phone">

                    </div>
                @endif

                @if (isset($options['kyc_dob']['show']) && $options['kyc_dob']['show'] == 1)
                    <div>
                        <label for="date-of-birth"
                            class="{{ isset($options['kyc_dob']['req']) && $options['kyc_dob']['req'] == 1 ? 'required' : '' }}">{{ __('Date of Birth') }}
                        </label>
                        <input {{ isset($options['kyc_dob']['req']) && $options['kyc_dob']['req'] ? 'required' : '' }}
                            class="form-control datepicker" type="date"
                            value="{{ isset($user_kyc) ? $user_kyc->dob : '' }}" id="date-of-birth" name="dob">
                    </div>
                @endif

                @if (isset($options['kyc_gender']['show']) && $options['kyc_gender']['show'] == 1)
                    <div>
                        <label for="gender"
                            class="{{ isset($options['kyc_gender']['req']) && $options['kyc_gender']['req'] == 1 ? 'required' : '' }}">{{ __('Gender') }}
                        </label>
                        <select
                            {{ isset($options['kyc_gender']['req']) && $options['kyc_gender']['req'] ? 'required' : '' }}
                            class="form-select" name="gender" id="gender">
                            <option value="">{{ __('Select Gender') }}</option>
                            <option {{ (isset($user_kyc) ? $user_kyc->gender : '') == 'male' ? 'selected' : '' }}
                                value="male">{{ __('Male') }}</option>
                            <option {{ (isset($user_kyc) ? $user_kyc->gender : '') == 'female' ? 'selected' : '' }}
                                value="female">{{ __('Female') }}</option>
                            <option {{ (isset($user_kyc) ? $user_kyc->gender : '') == 'other' ? 'selected' : '' }}
                                value="other">{{ __('Other') }}</option>
                        </select>

                    </div>
                @endif


                @if (isset($options['kyc_address']['show']) && $options['kyc_address']['show'] == 1)
                    <div>
                        <label for="address"
                            class="{{ isset($options['kyc_address']['req']) && $options['kyc_address']['req'] == 1 ? 'required' : '' }}">{{ __('Address') }}
                        </label>

                        <input
                            {{ isset($options['kyc_address']['req']) && $options['kyc_address']['req'] ? 'required' : '' }}
                            class="form-control" type="text"
                            value="{{ isset($user_kyc) ? $user_kyc->address : '' }}" id="address" name="address">

                    </div>
                @endif

            </div>
            @if (isset($options['kyc_country']['show']) && $options['kyc_country']['show'] == 1)
                <h4 class="text-dark mb-3 mt-5">{{ __('Your Address') }}</h4>
                <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-2">

                    <div>
                        <label for="country"
                            class="{{ isset($options['kyc_country']['req']) && $options['kyc_country']['req'] == 1 ? 'required' : '' }}">{{ __('Country') }}
                        </label>

                        <select
                            {{ isset($options['kyc_country']['req']) && $options['kyc_country']['req'] ? 'required' : '' }}
                            class="form-select" name="country" id="country" data-dd-class="search-on">
                            <option value="">{{ __('Select Country') }}</option>
                            @foreach ($countries as $country)
                                <option
                                    {{ (isset($user_kyc) ? $user_kyc->country : '') == $country ? 'selected' : '' }}
                                    value="{{ $country }}">{{ $country }}</option>
                            @endforeach
                        </select>

                    </div>
                </div>
            @endif

            @if (isset($options['kyc_state']['show']) && $options['kyc_state']['show'] == 1)
                <div>
                    <label for="state"
                        class="{{ isset($options['kyc_state']['req']) && $options['kyc_state']['req'] == 1 ? 'required' : '' }}">{{ __('State') }}
                    </label>

                    <input {{ isset($options['kyc_state']['req']) && $options['kyc_state']['req'] ? 'required' : '' }}
                        class="form-control" type="text" value="{{ isset($user_kyc) ? $user_kyc->state : '' }}"
                        id="state" name="state">

                </div>
            @endif

            @if (isset($options['kyc_city']['show']) && $options['kyc_city']['show'] == 1)
                <div>
                    <label for="city"
                        class="{{ isset($options['kyc_city']['req']) && $options['kyc_city']['req'] == 1 ? 'required' : '' }}">{{ __('City') }}
                    </label>

                    <input {{ isset($options['kyc_city']['req']) && $options['kyc_city']['req'] ? 'required' : '' }}
                        class="form-control" type="text" value="{{ isset($user_kyc) ? $user_kyc->city : '' }}"
                        id="city" name="city">

                </div>
            @endif

            @if (isset($options['kyc_zip']['show']) && $options['kyc_zip']['show'] == 1)
                <div>
                    <label for="zip"
                        class="{{ isset($options['kyc_zip']['req']) && $options['kyc_zip']['req'] == 1 ? 'required' : '' }}">{{ __('Zip / Postal Code') }}
                    </label>

                    <input {{ isset($options['kyc_zip']['req']) && $options['kyc_zip']['req'] ? 'required' : '' }}
                        class="form-control" type="text" value="{{ isset($user_kyc) ? $user_kyc->zip : '' }}"
                        id="zip" name="zip">

                </div>
            @endif


            @if (isset($options['kyc_address1']['show']) && $options['kyc_address1']['show'] == 1)
                <div>
                    <label for="address_1"
                        class="{{ isset($options['kyc_address1']['req']) && $options['kyc_address1']['req'] == 1 ? 'required' : '' }}">{{ __('Address Line 1') }}</label>

                    <input
                        {{ isset($options['kyc_address1']['req']) && $options['kyc_address1']['req'] ? 'required' : '' }}
                        class="form-control" type="text" value="{{ isset($user_kyc) ? $user_kyc->address1 : '' }}"
                        id="address_1" name="address_1">

                </div>
            @endif


            @if (isset($options['kyc_address2']['show']) && $options['kyc_address2']['show'] == 1)
                <div>
                    <label for="address_2"
                        class="{{ isset($options['kyc_address2']['req']) && $options['kyc_address2']['req'] == 1 ? 'required' : '' }}">{{ __('Address Line 2') }}</label>

                    <input
                        {{ isset($options['kyc_address2']['req']) && $options['kyc_address2']['req'] ? 'required' : '' }}
                        class="form-control" type="text"
                        value="{{ isset($user_kyc) ? $user_kyc->address2 : '' }}" id="address_2" name="address_2">

                </div>
            @endif

        </div>{{-- .row --}}
    </div>{{-- .step-fields --}}
</div>
@if (isset($options['kyc_document']) && count($options['kyc_document']) > 0)
    <div class="form-step form-step2">
        <div class="form-step-head card-innr">
            <div class="step-head">
                <div class="step-number">{{ $step_02 }}</div>
                <div class="step-head-text">
                    <h4 class="text-warning">{{ __('Document Upload') }}</h4>
                    <p>{{ __('To verify your identity, we ask you to upload high-quality scans or photos of your official identification documents issued by the government.') }}
                    </p>
                </div>
            </div>
        </div>{{-- .step-head --}}
        <div class="form-step-fields card-innr ">
            <div class="note note-plane note-light-alt note-md pdb-0-5x">
                <p><i class="bi bi-info-circle"></i>
                    {{ __('In order to complete, please upload any of the following personal documents.') }}</p>
            </div>
            @if (!empty($support_docs))
                <ul class="document-list grid gap-5 xs:grid-cols-1 md:grid-cols-2">
                    @foreach ($support_docs as $doc_item => $opt)
                        @if ($opt)
                            <div>
                                @if ($doc_item == 'passport' && $opt == 1)
                                    <input class="document-type" type="radio" name="documentType"
                                        value="{{ $doc_item }}" id="docType-{{ $doc_item }}"
                                        data-title="{{ $title[$doc_item] }}"
                                        data-img="{{ asset('assets/images/vector-' . $doc_item . '.png') }}"{{ isset($default_docs['doc']) && $default_docs['doc'] == $doc_item ? ' checked' : '' }}>
                                    <label for="docType-{{ $doc_item }}">
                                        <img style="height:36px;"
                                            src="{{ asset('assets/images/icon-passport.png') }}" alt="">
                                        <span>{{ $title[$doc_item] }}</span>
                                    </label>
                                @endif
                                @if ($doc_item == 'nidcard' && $opt == 1)
                                    <input class="document-type" type="radio" name="documentType"
                                        data-change=".doc-upload-d2" value="{{ $doc_item }}"
                                        id="docType-{{ $doc_item }}" data-title="{{ $title[$doc_item] }}"
                                        data-img="{{ asset('assets/images/vector-' . $doc_item . '.png') }}"{{ isset($default_docs['doc']) && $default_docs['doc'] == $doc_item ? ' checked' : '' }}>
                                    <label for="docType-{{ $doc_item }}">
                                        <img style="height:36px;"
                                            src="{{ asset('assets/images/icon-national-id.png') }}" alt="">
                                        <span>{{ $title[$doc_item] }}</span>
                                    </label>
                                @endif
                                @if ($doc_item == 'driving' && $opt == 1)
                                    <input class="document-type" type="radio" name="documentType"
                                        value="{{ $doc_item }}" id="docType-{{ $doc_item }}"
                                        data-title="{{ $title[$doc_item] }}"
                                        data-img="{{ asset('assets/images/vector-' . $doc_item . '.png') }}"{{ isset($default_docs['doc']) && $default_docs['doc'] == $doc_item ? ' checked' : '' }}>
                                    <label for="docType-{{ $doc_item }}">
                                        <img style="height:36px;" src="{{ asset('assets/images/icon-license.png') }}"
                                            alt="">
                                        <span>{{ $title[$doc_item] }}</span>
                                    </label>
                                @endif
                            </div>
                        @endif
                    @endforeach
                </ul>
            @endif
            <div class="doc-upload-area">
                <p class="text-dark font-bold">
                    {{ __('To avoid delays with verification process, please double-check to ensure the below requirements are fully met:') }}
                </p>
                <ul class="list-disc mb-5">
                    <li>{{ __('Chosen credential must not be expired.') }}</li>
                    <li>{{ __('Document should be in good condition and clearly visible.') }}</li>
                    <li>{{ __('There is no light glare or reflections on the card.') }}</li>
                    <li>{{ __('File is at least 1 MB in size and has at least 300 dpi resolution.') }}</li>
                </ul>
                <div class="doc-upload doc-upload-d1 border-b border-gray-300 dark:border-gray-600 pb-5">
                    <h6 class="font-mid doc-type-title text-dark">{!! __('Upload Here Your :doctype Copy', [
                        'doctype' => '<storng class="doc-type-name">' . $defaultDoc . '</storng>',
                    ]) !!}</h6>
                    <div class="flex justify-between items-center">
                        <div class="col-sm-8">
                            <input class="upload" type="file" id="document_one" name="document_one" required />
                        </div>
                        <div class="xs:hidden sm:block">
                            <div class="mx-md-4">
                                <img width="160" class="_image"
                                    src="{{ asset('assets/images/vector-' . $defaultImg . '.png') }}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="doc-upload doc-upload-d2{{ isset($default_docs['doc']) && $default_docs['doc'] == 'nidcard' ? '' : ' hidden' }} border-b border-gray-300 dark:border-gray-600 pb-5">
                    <h6 class="font-mid text-dark">{{ __('Upload Here Your National ID Back Side') }}</h6>
                    <div class="flex justify-between items-center">
                        <div class="col-sm-8">
                            <input class="upload" type="file" id="document_two" name="document_two" />
                        </div>
                        <div class="xs:hidden sm:block">
                            <div class="mx-md-4">
                                <img width="160" src="{{ asset('assets/images/vector-id-back.png') }}"
                                    alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="doc-upload doc-upload-d3">
                    <h6 class="font-mid text-dark">
                        {{ __('Upload a selfie as a Photo Proof while holding document in your hand') }}</h6>
                    <div class="flex justify-between items-center">
                        <div class="col-sm-8">
                            <input class="upload" type="file" id="document_image_hand" name="document_image_hand"
                                required />
                        </div>
                        <div class="xs:hidden sm:block">
                            <div class="mx-md-4">
                                <img width="160" src="{{ asset('assets/images/vector-hand.png') }}"
                                    alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endif
@if (isset($options['extra_field']) && count($options['extra_field']) > 0)
    <div class="form-step form-step3">
        <div class="form-step-head card-innr">
            <div class="step-head">
                <div class="step-number">{{ $step_03 }}</div>
                <div class="step-head-text">
                    <h4 class="text-dark">{{ __('Extra Informations') }}</h4>
                    <p>{{ __('We require extra essential information to get to know you better') }}</p>
                </div>
            </div>
        </div>{{-- .step-head --}}
        <div class="form-step-fields card-innr addedField grid xs:grid-cols-1 md:grid-cols-2
            gap-3  mb-5">
            @foreach ($options['extra_field'] as $key => $v)
                @if ($v['type'] == 'text')
                    <div>
                        <label class="label mt-1"><strong>{{ __(inputTitle($v['field_level'])) }}
                                @if ($v['validation'] == 'required')
                                    <span class="text-danger">*</span>
                                @endif
                            </strong>
                        </label>
                        <input type="text" class="form-control" name="extra_field[{{ $key }}]"
                            value="{{ old($v['field_level']) }}" placeholder="{{ __($v['field_level']) }}">
                    </div>
                @elseif($v['type'] == 'textarea')
                    <div>
                        <label class="label mt-1"><strong>{{ __(inputTitle($v['field_level'])) }}
                                @if ($v['validation'] == 'required')
                                    <span class="text-danger">*</span>
                                @endif
                            </strong>
                        </label>
                        <textarea name="extra_field[{{ $key }}]" class="form-control" placeholder="{{ __($v['field_level']) }}"
                            rows="3">{{ old($v['field_level']) }}</textarea>

                    </div>
                @elseif($v['type'] == 'file')
                    <div>
                        <label><strong>{{ __($v['field_level']) }} @if ($v['validation'] == 'required')
                                    <span class="text-danger">*</span>
                                @endif
                            </strong></label>
                        <br>

                        <input type="file" class="upload" name="extra_field[{{ $key }}]"
                            accept="image/*">
                    </div>
                @endif
            @endforeach
        </div>{{-- .step-fields --}}
    </div>
@endif

<div class="form-step form-step-final">
    <div class="form-step-fields">
        @if (Laravel\Jetstream\Jetstream::hasTermsAndPrivacyPolicyFeature())
            <div class="flex space-x-2">
                <input type="checkbox" id="term-condition" name="condition" required="required"
                    data-msg-required="{{ __('You should read our terms and policy.') }}" />
                <label for="term-condition">
                    I agree to the <a href="{{ route('terms.show') }}" target="_blank">Terms of Service</a>
                    and
                    <a href="{{ route('policy.show') }}" target="_blank">Privacy Policy</a>
                </label>
            </div>
        @endif
        <div class="flex space-x-2">
            <input id="info-currect" name="currect" type="checkbox" required="required"
                data-msg-required="{{ __('Confirm that all information is correct.') }}">
            <label for="info-currect">{{ __('All the personal information I have entered is correct.') }}</label>
        </div>
        <div class="flex space-x-2">
            <input id="certification" name="certification" type="checkbox" required="required"
                data-msg-required="{{ __('Certify that you are individual.') }}">
            <label
                for="certification">{{ __('I certify that, I am registering to participate in the trading platform in the capacity of an individual (and beneficial owner) and not as an agent or representative of a third party corporate entity.') }}</label>
        </div>
        <div class="gaps-1x"></div>
        <button class="btn btn-primary" type="submit">{{ __('Proceed to Verify') }}</button>
    </div>{{-- .step-fields --}}
</div>
</div>
<div class="hiddenFiles"></div>
