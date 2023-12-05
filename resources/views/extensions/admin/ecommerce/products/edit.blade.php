@extends('layouts.admin')
@section('page-style')
    <style scoped>
        .thumbnail-preview {
            width: 80px;
            height: 80px;
            object-fit: cover;
        }
    </style>
@endsection

@section('content')
    <div class="col-4">

        <div class="card">
            <div class="card-title p-5">
                {{ __('Edit Product') }}
            </div>

            <form method="POST" action="{{ route('admin.ecommerce.product.update', $product->id) }}"
                enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="card-body space-y-5">
                    <div>
                        <input type="hidden" name="old_img" value="{{ $product->thumbnail }}">

                        <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                            <div class="">
                                <h5>{{ __('Category Select') }} <span class="text-danger">*</span></h5>
                                <div class="controls">
                                    <select name="category_id" class="form-control" required>
                                        <option value="" disabled="">{{ __('Select Category') }}</option>
                                        @foreach ($categories as $category)
                                            <option value="{{ $category->id }}"
                                                {{ $category->id == $product->category_id ? 'selected' : '' }}>
                                                {{ $category->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('category_id')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>

                            <div>
                                <h5>{{ __('Product Name') }} <span class="text-danger">*</span></h5>
                                <div class="controls">
                                    <input type="text" name="name" class="form-control" value="{{ $product->name }}"
                                        required>
                                    @error('name')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                            <div class="">
                                <h5>{{ __('Product Price') }} <span class="text-danger">*</span></h5>
                                <div class="controls">
                                    <input type="text" name="price" class="form-control" required
                                        value="{{ $product->price }}">
                                    @error('price')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>

                            <div class="">
                                <h5>{{ __('Discounted Price') }}</h5>
                                <div class="controls">
                                    <input type="text" name="discount" class="form-control"
                                        value="{{ $product->discount }}">
                                    <small><span class="text-warning">
                                            {{ __('Discounted Price = Original price - Discount') }}</span></small>
                                    @error('discount')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>

                            </div>

                            <div class="">
                                <h5 class="mb-1">{{ __('Main Thumbnail') }} <span class="text-danger">*</span></h5>
                                <div class="controls">
                                    <div class=" flex items-center">
                                        <img src="{{ asset($path . '/' . $product->thumbnail) }}" id="mainThmb"
                                            class="thumbnail-preview" alt="Old Thumbnail">
                                        <input type="file" name="thumbnail" class="upload" onchange="mainThamUrl(this)">
                                    </div>
                                    @error('thumbnail')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                            <div class="">
                                <h5>{{ __('Product Tags') }} <span class="text-danger">*</span></h5>
                                <div class="controls">
                                    <input type="text" name="tags" class="form-control"
                                        value="{{ $product->tags->implode('tag_name', ', ') }}">
                                    @error('tags')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h5>{{ __('Short Description') }} <span class="text-danger">*</span></h5>
                        <div class="controls">
                            <textarea name="description" id="textarea" class="form-control" required placeholder="Textarea text">{{ $product->description }}</textarea>
                        </div>
                    </div>
                    <div>
                        <div class="form-group">

                            <div class="controls">
                                <fieldset>
                                    <input type="checkbox" id="checkbox_2" name="hot" value="1"
                                        {{ $product->hot == 1 ? 'checked' : '' }}>
                                    <label for="checkbox_2">{{ __('Hot Deals') }}</label>
                                </fieldset>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <button type="submit" class="btn btn-rounded btn-success">{{ __('Update') }}</button>
                </div>
            </form>
        </div>
    </div>
@endsection


@push('breadcrumb-plugins')
    <a href="{{ route('admin.ecommerce.product.index') }}" class="btn btn-outline-secondary"><i
            class="bi bi-chevron-left mr-1"></i>
        {{ __('Back') }}</a>
@endpush

@section('page-scripts')
    <script>
        function mainThamUrl(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('mainThmb').src = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
    </script>
@endsection
