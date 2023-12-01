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
        <div class="card-title p-5">
            Add Category
        </div>
        <!-- /.box-header -->
        <div class="card-body p-5">
            <div class="table-responsive">

                <form method="POST" action="{{ route('admin.ecommerce.category.update', $category->id) }}">
                    @csrf
                    @method('PUT')
                    <input type="hidden" name="id" value="{{ $category->id }}">
                    <div class="grid gap-5 grid-cols-2">

                        <div>
                            <h5 class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                {{ __('Category Name') }} <span class="text-danger">*</span></h5>
                            <div>
                                <div class="controls">
                                    <input type="text" name="category_name"
                                        class="form-control"value="{{ $category->name }}">
                                    @error('category_name')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                        </div>


                        <div class="">
                            <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                for="icon">{{ __('Select Icon') }}</label>

                            <div class="input-group mb-3">
                                <input type="text" id="icon" name="icon" class="iconpicker"
                                    value="{{ $category->icon ?? '' }}" required>
                                <span class="selected-icon"></span>
                            </div>
                            @error('icon')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                    </div>


                    <br>
                    <div class="">
                        <input type="submit" class="btn btn-rounded btn-success mb-5" value="Update">
                    </div>
                </form>


            </div>
        </div>
        <!-- /.box-body -->
    </div>
@endsection

@push('breadcrumb-plugins')
    <a href="{{ route('admin.ecommerce.category.index') }}" class="btn btn-outline-secondary"><i
            class="bi bi-chevron-left mr-1"></i>
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
                defaultValue: "{{ $category->icon ? 'bi-' . $category->icon : '' }}",
                valueFormat: val => `bi ${val}`
            });
        });
    </script>
@endsection
