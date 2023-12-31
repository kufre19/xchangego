@extends('layouts.app')

@section('vendor-style')
    <!-- vendor css files -->
    <link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css" rel="stylesheet">
@endsection
@section('content')
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h4 class="card-title">{{ __('New Account') }}</h4>
            <div class="card-search"></div>
        </div>
        <form action="{{ route('admin.forex.store') }}" method="POST" enctype="multipart/form-data" id="accountUpdate">
            @csrf
            <input type="hidden" name="signal1_id" id="signal1_id">
            <input type="hidden" name="signal2_id" id="signal2_id">
            <input type="hidden" name="signal3_id" id="signal3_id">
            <input type="hidden" name="signal4_id" id="signal4_id">
            <input type="hidden" name="signal5_id" id="signal5_id">
            <input type="hidden" name="mt" id="mt">
            <input type="hidden" name="status" id="status">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <label class="form-label" for="number">{{ __('MT Account No') }}</label>
                        <div class="input-group mb-1">
                            <input type="text" class="form-control" id="number" name="number"
                                aria-label="Account number" aria-describedby="number" value="{{ old('number') }}">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <label class="form-label" for="password">{{ __('MT Password') }}</label>
                        <div class="input-group mb-1">
                            <input type="text" class="form-control" id="password" name="password" aria-label="password"
                                aria-describedby="password" value="{{ old('password') }}">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <label class="form-label" for="balance">{{ __('MT Balance') }}</label>
                        <div class="input-group mb-1">
                            <input type="text" class="form-control" id="balance" name="balance" aria-label="MT Balance"
                                aria-describedby="balance" value="{{ old('balance') }}">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <label class="form-label" for="broker">{{ __('MT Broker') }}</label>
                        <div class="input-group mb-1">
                            <input type="text" class="form-control" id="broker" name="broker" aria-label="MT Broker"
                                aria-describedby="broker" value="{{ old('broker') }}">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <label class="form-label" for="mt_version">{{ __('MT Version') }}</label>
                        <div class="dropdown mb-1">
                            <button class="w-100 btn btn-outline-warning dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false" id="mt_version" name="mt_version">
                                {{ __('MT4') }}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item"
                                        onclick="$('#mt_version').text($(this).text());
                            $('#accountUpdate').find('input[name=mt]').val('4');">MT4</a>
                                </li>
                                <li><a class="dropdown-item"
                                        onclick="$('#mt_version').text($(this).text());
                            $('#accountUpdate').find('input[name=mt]').val('5');">MT5</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <label class="form-label" for="signal1_id">{{ __('Select Signal') }} 1</label>
                        <div class="dropdown mb-1">
                            <button class="w-100 btn btn-outline-warning dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false" id="signal_t1" name="signal_t1">
                                {{ __('Select Signal') }}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                @foreach ($signals as $signal)
                                    <li><a class="dropdown-item"
                                            onclick="$('#signal_t1').text($(this).text());
                                $('#accountUpdate').find('input[name=signal1_id]').val('{{ $signal->id }}');">{{ $signal->title }}</a>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <label class="form-label" for="signal2_id">{{ __('Select Signal') }} 2</label>
                        <div class="dropdown mb-1">
                            <button class="w-100 btn btn-outline-warning dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false" id="signal_t2" name="signal_t2">
                                {{ __('Select Signal') }}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                @foreach ($signals as $signal)
                                    <li><a class="dropdown-item"
                                            onclick="$('#signal_t2').text($(this).text());
                                $('#accountUpdate').find('input[name=signal2_id]').val('{{ $signal->id }}');">{{ $signal->title }}</a>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <label class="form-label" for="signal3_id">{{ __('Select Signal') }} 3</label>
                        <div class="dropdown mb-1">
                            <button class="w-100 btn btn-outline-warning dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false" id="signal_t3" name="signal_t3">
                                {{ __('Select Signal') }}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                @foreach ($signals as $signal)
                                    <li><a class="dropdown-item"
                                            onclick="$('#signal_t3').text($(this).text());
                                $('#accountUpdate').find('input[name=signal3_id]').val('{{ $signal->id }}');">{{ $signal->title }}</a>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <label class="form-label" for="signal4_id">{{ __('Select Signal') }} 4</label>
                        <div class="dropdown mb-1">
                            <button class="w-100 btn btn-outline-warning dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false" id="signal_t4" name="signal_t4">
                                {{ __('Select Signal') }}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                @foreach ($signals as $signal)
                                    <li><a class="dropdown-item"
                                            onclick="$('#signal_t4').text($(this).text());
                                $('#accountUpdate').find('input[name=signal4_id]').val('{{ $signal->id }}');">{{ $signal->title }}</a>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <label class="form-label" for="signal5_id">{{ __('Select Signal') }} 5</label>
                        <div class="dropdown mb-1">
                            <button class="w-100 btn btn-outline-warning dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false" id="signal_t5" name="signal_t5">
                                {{ __('Select Signal') }}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                @foreach ($signals as $signal)
                                    <li><a class="dropdown-item"
                                            onclick="$('#signal_t5').text($(this).text());
                                $('#accountUpdate').find('input[name=signal5_id]').val('{{ $signal->id }}');">{{ $signal->title }}</a>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-3 col-md-6">
                        <label class="form-control-label h6 mt-1">{{ __('Status') }} </label>
                        <input type="checkbox" data-onstyle="success" data-offstyle="danger" data-toggle="toggle"
                            data-on="{{ __('Active') }}" data-off="{{ __('Disabled') }}" data-width="100%"
                            name="status">
                    </div>
                </div>
            </div>
            <div class="card-footer text-end">
                <button class="btn btn-success" type="submit">{{ __('Submit') }}
                </button>
            </div>
        </form>
    </div>
@endsection

@push('breadcrumb-plugins')
    <a href="{{ route('admin.forex.index') }}" class="btn btn-primary btn-sm"><i class="bi bi-chevron-left"></i>
        {{ __('Back') }}</a>
@endpush

@section('vendor-script')
    <!-- vendor files -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap4-toggle/3.6.1/bootstrap4-toggle.min.js"></script>
@endsection

@push('script')
    <script>
        "use strict";
        $('.toggle').bootstrapToggle({
            on: 'Y',
            off: 'N',
            width: '100%',
            size: 'small'
        });
    </script>
@endpush
