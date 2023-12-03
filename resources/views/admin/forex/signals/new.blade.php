@extends('layouts.app')

@section('content')
<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h4 class="card-title">{{ __('locale.New Signal')}}</h4><div class="card-search"></div>
    </div>
    <form action="{{ route('admin.forex.signals.store') }}" method="POST" enctype="multipart/form-data" id="newBot">
        @csrf
        <input type="hidden" name="status" id="status">
        <div class="card-body">
            <div class="row">

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <label class="form-label" for="title">{{ __('locale.Title')}}</label>
                    <div class="input-group mb-1">
                        <input type="text" class="form-control" id="title" name="title" aria-label="title" aria-describedby="title" value="{{ old('title') }}">
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <label class="form-label" for="title">{{ __('locale.Select Image')}}</label>
                    <input class="form-control" name="image" type="file" id="image" accept=".png, .jpg, .jpeg" />
                </div>
            </div>
            <div class="d-flex justify-content-start align-items-top">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" data-bs-toggle="toggle" name="status" id="status">
                    <label class="form-check-label" for="status">{{ __('locale.Status')}}?</label>
                </div>
            </div>
        </div>
        <div class="card-footer text-end">
            <button class="btn btn-success" type="submit">{{ __('locale.Submit')}}
            </button>
        </div>
    </form>
</div>
@endsection

@push('breadcrumb-plugins')
    <a href="{{ route('admin.forex.signals.index') }}" class="btn btn-primary btn-sm" ><i class="bi bi-chevron-left"></i> {{ __('locale.Back')}}</a>
@endpush
