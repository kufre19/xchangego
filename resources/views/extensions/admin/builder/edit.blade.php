@extends('layouts.admin')

@section('vendor-style')
    <style>
        .iconpicker-dropdown {
            visibility: hidden;
            opacity: 0;
        }

        .iconpicker-dropdown.show {
            visibility: visible;
            opacity: 1;
        }

        .iconpicker-dropdown ul {
            position: absolute;
            width: 250px;
            height: 200px;
            background: #fff;
            overflow: scroll;
            box-shadow: 0 0 28px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            z-index: 999;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            left: 0;
            list-style: none;
        }

        .iconpicker-dropdown ul li {
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid #b2b2b2 73;
            cursor: pointer;
            margin: 0.1rem;
        }

        .iconpicker-dropdown ul li.selected {
            background-color: #007eff;
            color: #fff;
        }

        .iconpicker-dropdown ul li.hidden {
            display: none;
        }
    </style>
@endsection
@section('content')
    <div class="card">
        <div class="card-header flex justify-between items-center">
            <h4 class="card-title">{{ 'Editing page' }}</h4>

        </div>
        <form action="{{ route('admin.builder.update') }}" method="POST" enctype="multipart/form-data" id="pageUpdate">
            @csrf
            <input type="hidden" name="id" id="id" value="{{ $id }}">
            <div class="card-body space-y-5">
                <div class="grid grid-cols-3 gap-5">
                    <div>
                        <label class="form-label" for="title">{{ __('Title') }}</label>
                        <input type="text" class="form-control" id="title" name="title" aria-label="Page Title"
                            aria-describedby="title" value="{{ $page['name'] }}">
                    </div>
                    <div>
                        <label>Icon*</label>
                        <div class="input-group mb-3">
                            <input type="text" id="icon" name="icon" class="iconpicker"
                                value="{{ isset($page) ? $page['icon'] : '' }}" required>
                            <span class="selected-icon"></span>
                        </div>
                    </div>
                    <div>
                        <label class="form-label" for="slug">{{ __('Slug') }}</label>
                        <input type="text" class="form-control" id="slug" name="slug" aria-label="Page slug"
                            placeholder="/page/" aria-describedby="slug" value="{{ $page['slug'] }}">
                        <small>{{ __('add') }} <span class="text-danger">/page/</span> {{ __('before the slug') }}</small>
                    </div>
                    <div>
                        <label class="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" value="{{ $page['status'] }}"
                                {{ $page['status'] == 1 ? 'checked' : '' }} class="sr-only peer"
                                data-on="{{ __('Active') }}" data-off="{{ __('Disabled') }}" name="status"
                                id="statusEdit">
                            <div onclick="$('#statusEdit').val($('#statusEdit').val() == 1 ? 0 : 1)" class="toggle peer">
                            </div>
                            <span
                                class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Status') }}</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label class="form-label" for="style">{{ __('Style') }}</label>
                    <textarea class="form-control" name="style" rows="8" id="style" placeholder="{{ __('Style') }}">{!! $style !!}</textarea>
                    <small>{{ __('only') }} <span class="text-danger">css</span> {{ __('allowed') }}</small>
                </div>
                <div>
                    <label class="form-label" for="content">{{ __('Content') }}</label>
                    <textarea name="content" id="content" placeholder="{{ __('Content') }}" class="form-control" rows="8">{!! $content !!}</textarea>
                    <small>{{ __('only') }} <span class="text-danger">html, php, styling</span>
                        {{ __('allowed') }}</small>
                </div>
                <div>
                    <label class="form-label" for="script">{{ __('Script') }}</label>
                    <textarea class="form-control" name="script" rows="8" id="script" placeholder="{{ __('Script') }}">{!! $script !!}</textarea>
                    <small>{{ __('only') }} <span class="text-danger">js</span>{{ __('allowed') }} </small>
                </div>
            </div>
            <div class="card-footer text-end">
                <button class="btn btn-outline-success" type="submit"><i class="bi bi-pencil-square"></i>
                    {{ __('Edit') }}
                </button>
            </div>
        </form>
    </div>
@endsection


@push('breadcrumb-plugins')
    <a href="{{ route('admin.builder.index') }}" class="btn btn-outline-secondary"><i class="bi bi-chevron-left"></i>
        {{ __('Back') }}</a>
@endpush

@section('page-scripts')
    <script src="/vendors/icons/iconpicker.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', async function() {
            const response = await fetch("/data/bootstrap5.json");
            const result = await response.json();
            const iconpicker = new Iconpicker(document.querySelector(".iconpicker"), {
                icons: result,
                showSelectedIn: document.querySelector(".selected-icon"),
                searchable: true,
                selectedClass: "selected",
                containerClass: "my-picker",
                hideOnSelect: true,
                fade: true,
                defaultValue: "{{ $category->icon ?? '' }}",
                valueFormat: val => `bi ${val}`
            });
        });
    </script>
@endsection
