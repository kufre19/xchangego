@extends('layouts.admin')
@section('content')
    <div class="card">
        <div class="card-body">
            <form action="{{ route('admin.knowledge.categories.store') }}" method="POST" enctype="multipart/form-data"
                class="space-y-3">
                @csrf
                <div class="form-group {{ $errors->has('name') ? 'has-error' : '' }}">
                    <label for="name">{{ trans('Name') }}*</label>
                    <input type="text" id="name" name="name" class="form-control"
                        value="{{ old('name', isset($category) ? $category->name : '') }}" required>
                    @if ($errors->has('name'))
                        <em class="invalid-feedback">
                            {{ $errors->first('name') }}
                        </em>
                    @endif
                </div>
                <div class="form-group {{ $errors->has('slug') ? 'has-error' : '' }}">
                    <label for="slug">{{ trans('Slug') }}*</label>
                    <input type="text" id="slug" name="slug" class="form-control"
                        value="{{ old('slug', isset($category) ? $category->slug : '') }}" required>
                    @if ($errors->has('slug'))
                        <em class="invalid-feedback">
                            {{ $errors->first('slug') }}
                        </em>
                    @endif
                </div>
                <br>
                <div>
                    <input class="btn btn-danger" type="submit" value="{{ trans('Save') }}">
                </div>
            </form>


        </div>
    </div>
@endsection

@section('page-scripts')
    <script>
        $('input[name="name"]').change(function(e) {
            $.get('{{ route('user.knowledge.categories.check_slug') }}', {
                    'name': $(this).val()
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
