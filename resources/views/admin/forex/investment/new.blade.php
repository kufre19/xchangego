@extends('layouts.app')

@section('content')
<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h4 class="card-title">{{ __('locale.New Plan')}}</h4><div class="card-search"></div>
    </div>
    <form action="{{ route('admin.forex.investment.store') }}" method="POST" enctype="multipart/form-data" id="accountUpdate">
        @csrf
        <input type="hidden" name="status" id="status">
        <input type="hidden" name="result_missed" id="result_missed">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <label class="form-label" for="title">{{ __('locale.Plan Title')}}</label>
                    <div class="input-group mb-1">
                        <input type="text" class="form-control" id="title" name="title" aria-label="Plan Title" aria-describedby="title" value="{{ old('title') }}">
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <label class="form-label" for="price">{{ __('locale.Price')}}</label>
                    <div class="input-group mb-1">
                        <input type="text" class="form-control" id="price" name="price" aria-label="price" aria-describedby="password" value="{{ old('price') }}">
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <label class="form-label" for="duration">{{ __('locale.Duration (Days)')}}</label>
                    <div class="input-group mb-1">
                        <input type="text" class="form-control" id="duration" name="duration" aria-label="Duration" aria-describedby="duration" value="{{ old('duration') }}">
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <label class="form-label" for="roi">{{ __('locale.Return on Investment')}}</label>
                    <div class="input-group mb-1">
                        <input type="text" class="form-control" id="roi" name="roi" aria-label="Return on Investment" aria-describedby="roi" value="{{ old('roi') }}">
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <label for="result_missed">{{ __('locale.Result If Missed')}}</label>
                    <div class="dropdown">
                        <button class="btn btn-outline-warning dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="result_missedt" name="result_missedt">
                        {{ __('locale.Select Result If Missed') }}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" onclick="$('#result_missedt').text($(this).text());$('#planUpdate').find('input[name=result_missed]').val($(this).data('result'));" data-result="1">{{ __('locale.Win')}}</a></li>
                            <li><a class="dropdown-item" onclick="$('#result_missedt').text($(this).text());$('#planUpdate').find('input[name=result_missed]').val($(this).data('result'));" data-result="2">{{ __('locale.Lose')}}</a></li>
                            <li><a class="dropdown-item" onclick="$('#result_missedt').text($(this).text());$('#planUpdate').find('input[name=result_missed]').val($(this).data('result'));" data-result="3">{{ __('locale.Draw')}}</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <label for="profit_missed">{{ __('locale.Profit If Missed')}}</label>
                    <div class="input-group mb-1">
                        <input type="number" class="form-control"  id="profit_missed" name="profit_missed" aria-label="Maximum Profit" aria-describedby="profit_missed" value="{{ old('profit_missed') }}">
                        <span class="input-group-text" for="profit_missed">%</span>
                    </div>
                </div>
            </div>
            <label for="desc">{{ __('locale.Description')}}</label>
            <div class="input-group mb-1">
                <input type="text" class="form-control"  id="desc" name="desc" aria-label="Plan Description" aria-describedby="desc" value="{{ old('desc') }}">
            </div>
            <div class="d-flex justify-content-start align-items-top mb-1">
                <input class="form-control" name="image" type="file" id="image" accept=".png, .jpg, .jpeg" />
            </div>
            <div class="d-flex justify-content-start align-items-top">
                <div class="form-check me-2">
                    <input class="form-check-input" type="checkbox" data-bs-toggle="toggle" name="is_new" id="is_new">
                    <label class="form-check-label" for="is_new">{{ __('locale.is New')}}?</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" data-bs-toggle="toggle" name="status" id="status">
                    <label class="form-check-label" for="is_new">{{ __('locale.is Active')}}?</label>
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
    <a href="{{ route('admin.forex.investment.index') }}" class="btn btn-primary btn-sm" ><i class="bi bi-chevron-left"></i> {{ __('locale.Back')}}</a>
@endpush
