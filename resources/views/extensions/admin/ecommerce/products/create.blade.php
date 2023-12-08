@extends('layouts.admin')
@section('content')
    <div class="col-4">

        <div class="card">
            <div class="card-title p-5">
                {{ __('Add product') }}
            </div>
            <form method="POST" action="{{ route('admin.ecommerce.product.store') }}"enctype="multipart/form-data">
                @csrf
                <div class="card-body space-y-5">
                    <div>
                        <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                            <div class="">
                                <h5>{{ __('Category Select') }} <span class="text-danger">*</span></h5>
                                <div class="controls">
                                    <select name="category_id" class="form-control" required>
                                        <option value="" selected="" disabled="">{{ __('Select Category') }}
                                        </option>
                                        @foreach ($categories as $category)
                                            <option value="{{ $category->id }}">
                                                {{ $category->name }}</option>
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
                                    <input type="text" name="name" class="form-control" required>
                                    @error('name')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>


                            <div class="">
                                <h5>{{ __('Product Price') }} <span class="text-danger">*</span></h5>
                                <div class="controls">
                                    <input type="text" name="price" class="form-control" required>
                                    @error('price')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>

                            <div class="">
                                <h5>{{ __('Discounted Price') }}</h5>
                                <div class="controls">
                                    <input type="text" name="discount" class="form-control">
                                    <small><span class="text-warning">
                                            {{ __('Discounted Price = Original price - Discount') }}</span></small>
                                    @error('discount')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>

                            </div>

                            <div class="">
                                <h5 class="mb-1">{{ __('Main Thambnail') }} <span class="text-danger">*</span></h5>
                                <div class="controls">
                                    <div class="flex items-center">
                                        <img src="" id="mainThmb">
                                        <input type="file" name="thumbnail" class="upload" onChange="mainThamUrl(this)"
                                            required="">
                                    </div>
                                    @error('thumbnail')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>


                        </div>
                        <div class="">
                            <h5>{{ __('Product Tags') }} <span class="text-danger">*</span></h5>
                            <div class="controls">
                                <input type="text" name="tags" class="form-control">
                                @error('product_tags')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="mt-1">
                        <h5>{{ __('Short Description') }} <span class="text-danger">*</span></h5>
                        <div class="controls">
                            <textarea name="description" id="textarea" class="form-control" required placeholder="Textarea text"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="controls">
                            <fieldset>
                                <input type="checkbox" id="checkbox_2" name="hot" value="1">
                                <label for="checkbox_2">{{ __('Hot Deals') }}</label>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <button type="submit" class="btn btn-rounded btn-success">{{ __('Submit') }}</button>
                </div>
            </form>
        </div>


        <script type="text/javascript">
            function mainThamUrl(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $('#mainThmb').attr('src', e.target.result).width(80).height(80);
                        $('#mainThmb').addClass('mr-2')
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            }
        </script>
    @endsection
    @push('breadcrumb-plugins')
        <a href="{{ route('admin.ecommerce.product.index') }}" class="btn btn-outline-secondary"><i
                class="bi bi-chevron-left mr-1"></i>
            {{ __('Back') }}</a>
    @endpush
