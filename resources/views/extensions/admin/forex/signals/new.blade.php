@extends('layouts.app')

@section('vendor-style')
    <!-- vendor css files -->
    <link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css" rel="stylesheet">
@endsection
@section('content')
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h4 class="card-title">{{ __('New Signal') }}</h4>
            <div class="card-search"></div>
        </div>
        <form action="{{ route('admin.forex.signals.store') }}" method="POST" enctype="multipart/form-data" id="newBot">
            @csrf
            <input type="hidden" name="status" id="status">
            <div class="card-body">
                <div class="row">

                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <label class="form-label" for="title">{{ __('Title') }}</label>
                        <div class="input-group mb-1">
                            <input type="text" class="form-control" id="title" name="title" aria-label="title"
                                aria-describedby="title" value="{{ old('title') }}">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <label class="form-label" for="title">{{ __('Select Image') }}</label>
                        <input class="form-control" name="image" type="file" id="image"
                            accept=".png, .jpg, .jpeg" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-3 col-md-6">
                        <label class="form-control-label h6 mt-1">{{ __('Status') }} </label>
                        <input type="checkbox" data-onstyle="success" data-offstyle="danger" data-toggle="toggle"
                            data-on="{{ __('Active') }}" data-off="{{ __('Disabled') }}" data-width="100%" name="status">
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
    <a href="{{ route('admin.forex.signals.index') }}" class="btn btn-primary btn-sm"><i class="bi bi-chevron-left"></i>
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
