@extends('layouts.admin')

@section('content')
    <style>
        .changelog ul,
        .changelog ol {
            list-style-type: disc;
            list-style-position: inside;
        }
    </style>
    <div class="w-1/2 text-center mx-auto">
        @if ($update_data['status'])
            <div class="alert alert-warning">
                {{ __('Please backup your database and script files before upgrading.') }}
            </div>
        @endif
        <div class="alert alert-success">
            {!! $update_data['message'] !!}
        </div>
        @if ($update_data['status'])
            <div class="card">
                <h1 class="card-title py-5">{{ __('System Updator') }}</h1>
                <div class='alert alert-secondary mx-5 changelog'>
                    <div class="text-start">
                        {!! $update_data['changelog'] !!}
                    </div>
                </div>
                @php
                    $update_id = null;
                    $has_sql = null;
                    $version = null;
                @endphp
                @if (!empty($_POST['update_id']))
                    @php
                        $update_id = strip_tags(trim($_POST['update_id']));
                        $has_sql = strip_tags(trim($_POST['has_sql']));
                        $version = strip_tags(trim($_POST['version']));
                    @endphp
                    <progress id="prog" value="0" max="100.0" class="progress mb-1 mx-auto w-75"></progress>
                    @php
                        $api->download_update($_POST['update_id'], $_POST['has_sql'], $_POST['version'], null, null, ['db_host' => getenv('DB_HOST'), 'db_user' => getenv('DB_USERNAME'), 'db_pass' => getenv('DB_PASSWORD'), 'db_name' => getenv('DB_DATABASE')]);
                    @endphp
                @else
                    <form id="updater" action="{{ route('admin.update') }}" method="POST">
                        @csrf
                        <div class="card-body">
                            <input type="hidden" class="form-control" value="{{ $update_data['update_id'] }}"
                                name="update_id">
                            <input type="hidden" class="form-control" value="{{ $update_data['has_sql'] }}" name="has_sql">
                            <input type="hidden" class="form-control" value="{{ $update_data['version'] }}" name="version">
                        </div>
                        <div class="card-footer">
                            <button type="submit" class="btn btn-success w-1/2">{{ __('Update') }}</button>
                        </div>
                    </form>
                @endif
            </div>
        @endif
    </div>
@endsection

@push('breadcrumb-plugins')
    <form method="POST" action="{{ route('admin.database.refresh.sidebar') }}">
        @csrf
        <button type="submit" class="btn btn-blue"><i class="bi bi-arrow-repeat mr-1"></i>
            {{ __('Refresh Sidebar') }}</button>
    </form>
    @can('terminal_access')
        <a class="btn btn-dark" href="{{ route('admin.terminal') }}"><i class="bi bi-terminal mr-1"></i>
            {{ __('Terminal') }}</a>
    @endcan
    <a class="btn btn-success" href="{{ route('admin.clean') }}"><i class="bi bi-speedometer2 mr-1"></i>
        {{ __('Optimize') }}</a>
@endpush
