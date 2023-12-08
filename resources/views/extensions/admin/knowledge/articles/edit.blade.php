@extends('layouts.admin')
@section('content')
    <form action="{{ route('admin.knowledge.articles.update', [$article->id]) }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="card">
            <div class="card-body space-y-3">
                @method('PUT')
                <div class="form-group {{ $errors->has('title') ? 'has-error' : '' }}">
                    <label for="title">{{ trans('Title') }}*</label>
                    <input type="text" id="title" name="title" class="form-control"
                        value="{{ old('title', isset($article) ? $article->title : '') }}" required>
                    @if ($errors->has('title'))
                        <em class="invalid-feedback">
                            {{ $errors->first('title') }}
                        </em>
                    @endif
                </div>
                <div class="form-group {{ $errors->has('slug') ? 'has-error' : '' }}">
                    <label for="slug">{{ trans('Slug') }}*</label>
                    <input type="text" id="slug" name="slug" class="form-control"
                        value="{{ old('slug', isset($article) ? $article->slug : '') }}" required>
                    @if ($errors->has('slug'))
                        <em class="invalid-feedback">
                            {{ $errors->first('slug') }}
                        </em>
                    @endif
                </div>
                <div class="form-group {{ $errors->has('short_text') ? 'has-error' : '' }}">
                    <label for="short_text">{{ trans('Short Text') }}</label>
                    <textarea id="short_text" name="short_text" class="form-control ">{{ old('short_text', isset($article) ? $article->short_text : '') }}</textarea>
                    @if ($errors->has('short_text'))
                        <em class="invalid-feedback">
                            {{ $errors->first('short_text') }}
                        </em>
                    @endif
                </div>
                <div class="form-group {{ $errors->has('full_text') ? 'has-error' : '' }}">
                    <label for="full_text">{{ trans('Full Text') }}</label>
                    <textarea id="full_text" rows="8" name="full_text">{{ old('full_text', isset($article) ? $article->full_text : '') }}</textarea>
                    @if ($errors->has('full_text'))
                        <em class="invalid-feedback">
                            {{ $errors->first('full_text') }}
                        </em>
                    @endif
                </div>
                <div class="form-group {{ $errors->has('category_id') ? 'has-error' : '' }}">
                    <label for="category_id">{{ trans('Category') }}</label>
                    <select name="category_id" id="category_id" class="form-control select2">
                        @foreach ($categories as $id => $categories)
                            <option value="{{ $id }}"
                                {{ old('category_id', 0) == $id || (isset($article) && $article->category->id == $id) ? 'selected' : '' }}>
                                {{ $categories }}</option>
                        @endforeach
                    </select>
                    @if ($errors->has('category_id'))
                        <em class="invalid-feedback">
                            {{ $errors->first('category_id') }}
                        </em>
                    @endif
                </div>
                <div class=" justify-start items-top mb-1">
                    <img class="img-thumbnail mb-1 mr-3"
                        src="{{ getImage(imagePath()['article']['path'] . '/' . $article->img) }}" />
                    <input class="upload" name="image" type="file" id="image" accept=".png, .jpg, .jpeg, .svg" />
                </div>
                <div class="form-group {{ $errors->has('tags') ? 'has-error' : '' }}">
                    <label for="tags">{{ trans('Tags') }}
                        <select name="tags[]" id="tags" class="form-select" data-placeholder="Choose anything"
                            multiple>
                            @foreach ($tags as $id => $tags)
                                <option value="{{ $id }}"
                                    {{ in_array($id, old('tags', [])) || (isset($article) && $article->tags->contains($id)) ? 'selected' : '' }}>
                                    {{ $tags }}</option>
                            @endforeach
                        </select>
                        @if ($errors->has('tags'))
                            <em class="invalid-feedback">
                                {{ $errors->first('tags') }}
                            </em>
                        @endif
                </div>
            </div>
            <div class="card-footer">
                <input class="btn btn-success" type="submit" value="{{ trans('Save') }}">
            </div>
        </div>
    </form>
@endsection

@section('page-scripts')
    <script src="https://cdn.tiny.cloud/1/{{ $general->tinymce }}/tinymce/6/tinymce.min.js" referrerpolicy="origin">
    </script>
    <script>
        $(function() {
            "use strict";
            tinymce.init({
                selector: 'textarea#full_text',
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount code',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat | code',
            });
        });
    </script>

    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#tags').select2({
                width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-full') ? '100%' :
                    'style',
                placeholder: $(this).data('placeholder'),
                closeOnSelect: false,
                tags: true
            });
        });
        $('input[name="title"]').change(function(e) {
            $.get('{{ route('user.knowledge.articles.check_slug') }}', {
                    'title': $(this).val()
                },
                function(data) {
                    $('input[name="slug"]').val(data.slug);
                }
            );
        });
    </script>
@endsection

@push('breadcrumb-plugins')
    <a style="margin-top:20px;" class="btn btn-outline-secondary" href="{{ url()->previous() }}">
        <i class="bi bi-chevron-left"></i> {{ trans('Back') }}
    </a>
@endpush
