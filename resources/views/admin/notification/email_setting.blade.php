@extends('layouts.admin')

@section('content')
    @include('admin.notification.header')

    <div class="card mb-5">
        <div class="card-header">
            <div class="card-title">
                <div class="title-gradient">{{ __('Email Settings') }}</div>
            </div>
        </div>
        <form action="{{ route('admin.settings.mail.settings.update') }}" method="POST">
            @csrf
            <div class="card-body">
                <div class="form-group">
                    <label class="mb-2">@lang('Email Send Method')</label>
                    <select name="email_method" class="form-control">
                        <option value="php" @if (@$notification->mail_config->name == 'php') selected @endif>@lang('PHP Mail')
                        </option>
                        <option value="smtp" @if (@$notification->mail_config->name == 'smtp') selected @endif>@lang('SMTP')
                        </option>
                        <option value="sendgrid" @if (@$notification->mail_config->name == 'sendgrid') selected @endif>@lang('SendGrid API')
                        </option>
                        <option value="mailjet" @if (@$notification->mail_config->name == 'mailjet') selected @endif>@lang('Mailjet API')
                        </option>
                    </select>
                </div>
                <div class="mt-5 hidden configForm" id="smtp">
                    <div>
                        <h6 class="mb-2">@lang('SMTP Configuration')</h6>
                    </div>
                    <div class="grid xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
                        <div>
                            <div class="form-group">
                                <label>@lang('Host') </label>
                                <input type="text" class="form-control" placeholder="e.g. @lang('smtp.googlcom')"
                                    name="host" value="{{ @$notification->mail_config->smtp->host ?? '' }}" />
                            </div>
                        </div>
                        <div>
                            <div class="form-group">
                                <label>@lang('Port') </label>
                                <input type="text" class="form-control" placeholder="@lang('Available port')" name="port"
                                    value="{{ @$notification->mail_config->smtp->port ?? '' }}" />
                            </div>
                        </div>
                        <div>
                            <div class="form-group">
                                <label>@lang('Encryption')</label>
                                <select class="form-control" name="enc">
                                    <option value="ssl" @if (@$notification->mail_config->smtp->enc == 'ssl') selected @endif>
                                        @lang('SSL')
                                    </option>
                                    <option value="tls" @if (@$notification->mail_config->smtp->enc == 'tls') selected @endif>
                                        @lang('TLS')</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div class="form-group">
                                <label>@lang('Username') </label>
                                <input type="text" class="form-control" placeholder="@lang('Normally your email') address"
                                    name="username" value="{{ @$notification->mail_config->smtp->username ?? '' }}" />
                            </div>
                        </div>
                        <div>
                            <div class="form-group">
                                <label>@lang('Password') </label>
                                <input type="text" class="form-control" placeholder="@lang('Normally your email password')" name="password"
                                    value="{{ @$notification->mail_config->smtp->password ?? '' }}" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-5 hidden configForm" id="sendgrid">
                    <div>
                        <h6 class="mb-2">@lang('SendGrid API Configuration')</h6>
                    </div>
                    <div class="grid xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
                        <div class="form-group ">
                            <label>@lang('App Key') </label>
                            <input type="text" class="form-control" placeholder="@lang('SendGrid App key')" name="appkey"
                                value="{{ @$notification->mail_config->sendgrid->appkey ?? '' }}" />
                        </div>
                    </div>
                </div>
                <div class="row mt-5 hidden configForm" id="mailjet">
                    <div>
                        <h6 class="mb-2">@lang('Mailjet API Configuration')</h6>
                    </div>
                    <div class="grid xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
                        <div>
                            <div class="form-group">
                                <label>@lang('Api Public Key') </label>
                                <input type="text" class="form-control" placeholder="@lang('Mailjet Api Public Key')"
                                    name="public_key"
                                    value="{{ @$notification->mail_config->mailjet->public_key ?? '' }}" />
                            </div>
                        </div>
                        <div>
                            <div class="form-group">
                                <label>@lang('Api Secret Key') </label>
                                <input type="text" class="form-control" placeholder="@lang('Mailjet Api Secret Key')"
                                    name="secret_key"
                                    value="{{ @$notification->mail_config->mailjet->secret_key ?? '' }}" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button type="submit" class="btn btn-outline-primary">@lang('Submit')</button>
            </div>
        </form>
    </div>
    @if (@$notification->mail_config->name == 'smtp')
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <div class="title-gradient">{{ __('SMTP Tester') }}</div>
                </div>
            </div>
            <form action="{{ route('admin.settings.mail.test.smtp.update') }}" method="POST">
                @csrf
                <div class="card-body">
                    <div class="form-group">
                        <label>@lang('Send to') </label>
                        <input type="text" name="email" class="form-control" required placeholder="@lang('Email Address')"
                            value="{{ old('email') }}">
                    </div>
                    <input type="hidden" name="host" value="{{ @$notification->mail_config->smtp->host ?? '' }}" />
                    <input type="hidden" name="port" value="{{ @$notification->mail_config->smtp->port ?? '' }}" />
                    <input type="hidden" name="enc" value="{{ @$notification->mail_config->smtp->enc ?? '' }}" />
                    <input type="hidden" name="username"
                        value="{{ @$notification->mail_config->smtp->username ?? '' }}" />
                    <input type="hidden" name="password"
                        value="{{ @$notification->mail_config->smtp->password ?? '' }}" />
                    @if (session('results'))
                        <div class="mt-5">
                            <h5>{{ __('SMTP Test Results') }}</h5>
                            <ul>
                                @foreach (session('results') as $key => $result)
                                    <li>
                                        <strong>{{ ucwords(str_replace('_', ' ', $key)) }}:</strong>
                                        @if ($result['result'])
                                            <span class="badge bg-success">{{ __('Success') }}</span>
                                        @else
                                            <span class="badge bg-danger">{{ __('Failed') }}</span>
                                            @isset($result['error'])
                                                <br><small><span class="text-danger">{{ __('Error') }}:</span> <span
                                                        class="text-muted">{{ $result['error'] }}</span>
                                                </small>
                                            @endisset
                                        @endif
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </div>

                <div class="card-footer">
                    <button type="submit" class="btn btn-outline-primary">@lang('Run SMTP Test')</button>
                </div>
            </form>
        </div>
    @endif
@endsection

@push('modals')
    <x-partials.modals.default-modal title="{{ __('Test Email Setup') }}"
        action="{{ route('admin.settings.mail.test') }}" submit="{{ __('Submit') }}" id="testMailModal">
        <div>
            <input type="hidden" name="id">
            <div class="form-group">
                <label>@lang('Sent to') </label>
                <input type="text" name="email" class="form-control" required placeholder="@lang('Email Address')">
            </div>
        </div>
    </x-partials.modals.default-modal>
@endpush
@push('breadcrumb-plugins')
    @if (@$notification->mail_config->name !== 'smtp')
        <button type="button" data-modal-toggle="testMailModal" class="btn btn-outline-primary"><i
                class="bi bi-send"></i>
            @lang('Send Test Mail')</button>
    @endif
@endpush
@section('page-scripts')
    <script>
        (function($) {
            "use strict";

            var method = '{{ @$notification->mail_config->name }}';
            emailMethod(method);
            $('select[name=email_method]').on('change', function() {
                var method = $(this).val();
                emailMethod(method);
            });

            function emailMethod(method) {
                $('.configForm').addClass('hidden');
                if (method != 'php') {
                    $(`#${method}`).removeClass('hidden');
                }
            }

        })(jQuery);
    </script>
@endsection
