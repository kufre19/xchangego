@extends('layouts.admin')
@section('content')
    <div class="card">
        <div class="card-body">
            <form action="{{ route('admin.knowledge.faq-questions.store') }}" method="POST" enctype="multipart/form-data"
                class="space-y-3">
                @csrf
                <div class="form-group {{ $errors->has('category_id') ? 'has-error' : '' }}">
                    <label for="category">{{ __('Category') }}*</label>
                    <select name="category_id" id="category" class="form-control select2" required>
                        @foreach ($categories as $id => $category)
                            <option value="{{ $id }}"
                                {{ (isset($faqQuestion) && $faqQuestion->category ? $faqQuestion->category->id : old('category_id')) == $id ? 'selected' : '' }}>
                                {{ $category }}</option>
                        @endforeach
                    </select>
                    @if ($errors->has('category_id'))
                        <em class="invalid-feedback">
                            {{ $errors->first('category_id') }}
                        </em>
                    @endif
                </div>
                <div class="form-group {{ $errors->has('question') ? 'has-error' : '' }}">
                    <label for="question">{{ __('Question') }}*</label>
                    <textarea id="question" name="question" class="form-control " required>{{ old('question', isset($faqQuestion) ? $faqQuestion->question : '') }}</textarea>
                    @if ($errors->has('question'))
                        <em class="invalid-feedback">
                            {{ $errors->first('question') }}
                        </em>
                    @endif
                </div>
                <div class="form-group {{ $errors->has('answer') ? 'has-error' : '' }}">
                    <label for="answer">{{ __('Answer') }}*</label>
                    <textarea id="answer" name="answer" class="form-control " required>{{ old('answer', isset($faqQuestion) ? $faqQuestion->answer : '') }}</textarea>
                    @if ($errors->has('answer'))
                        <em class="invalid-feedback">
                            {{ $errors->first('answer') }}
                        </em>
                    @endif
                </div>
                <div>
                    <input class="btn btn-outline-success" type="submit" value="{{ __('Save') }}">
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
