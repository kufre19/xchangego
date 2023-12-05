@extends('layouts.admin')
@section('content')
    <div class="card">
        <div class="card-body">
            <form action="{{ route('admin.knowledge.faq-categories.update', [$faqCategory->id]) }}" method="POST"
                class="space-y-3" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="form-group {{ $errors->has('category') ? 'has-error' : '' }}">
                    <label for="category">{{ trans('Category') }}*</label>
                    <input type="text" id="category" name="category" class="form-control"
                        value="{{ old('category', isset($faqCategory) ? $faqCategory->category : '') }}" required>
                    @if ($errors->has('category'))
                        <em class="invalid-feedback">
                            {{ $errors->first('category') }}
                        </em>
                    @endif
                </div>
                <div>
                    <input class="btn btn-danger" type="submit" value="{{ trans('Save') }}">
                </div>
            </form>


        </div>
    </div>
@endsection

@push('breadcrumb-plugins')
    <a style="margin-top:20px;" class="btn btn-outline-secondary" href="{{ url()->previous() }}">
        <i class="bi bi-chevron-left"></i> {{ trans('Back') }}
    </a>
@endpush
