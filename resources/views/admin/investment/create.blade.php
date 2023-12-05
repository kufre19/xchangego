@extends('layouts.admin')

@section('content')
    <div class="card">
        <form action="{{ route('admin.investment.plans.store') }}" method="POST">
            @csrf
            <div class="card-body">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="mb-4">
                        <label for="name" class="form-label">{{ __('Plan Name') }}:</label>
                        <input type="text" name="name" id="name" value="{{ old('name') }}"
                            class="form-control @error('name') is-invalid @enderror">
                        @error('name')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-4">
                        <label for="description" class="form-label">{{ __('Plan Description') }}:</label>
                        <textarea name="description" id="description" class="form-control @error('description') is-invalid @enderror">{{ old('description') }}</textarea>
                        @error('description')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-4">
                        <label for="minimum" class="form-label">{{ __('Minimum Investment') }}:</label>
                        <input type="text" name="minimum" id="minimum" value="{{ old('minimum') }}"
                            class="form-control @error('minimum') is-invalid @enderror">
                        @error('minimum')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-4">
                        <label for="maximum" class="form-label">{{ __('Maximum Investment') }}:</label>
                        <input type="text" name="maximum" id="maximum" value="{{ old('maximum') }}"
                            class="form-control @error('maximum') is-invalid @enderror">
                        @error('maximum')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-4">
                        <label for="duration" class="form-label">{{ __('Duration (in days)') }}:</label>
                        <div class="input-group">
                            <input type="text" name="duration" id="duration" value="{{ old('duration') }}"
                                class="@error('duration') is-invalid @enderror">
                            <span>{{ __('Days') }}</span>
                        </div>
                        @error('duration')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-4">
                        <label for="interest" class="form-label">{{ __('Daily Interest Rate') }}:</label>

                        <div class="input-group">
                            <input type="text" name="interest" id="interest" value="{{ old('interest') }}"
                                class="form-control @error('interest') is-invalid @enderror">
                            <span>%</span>
                        </div>
                        @error('interest')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-4">
                        <label for="status" class="form-label">{{ __('Status') }}:</label>
                        <select name="status" id="status" class="form-control">
                            <option value="1">{{ __('Active') }}</option>
                            <option value="0">{{ __('Inactive') }}</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="recommanded" class="form-label">{{ __('Recommanded') }}:</label>
                        <select name="recommanded" id="recommanded" class="form-control">
                            <option value="1">{{ __('True') }}</option>
                            <option value="0">{{ __('False') }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded font-medium">{{ __('Create') }}</button>
            </div>
        </form>
    </div>
@endsection

@push('breadcrumb-plugins')
    <a href="{{ route('admin.investment.plans.index') }}" class="btn btn-outline-secondary"><i
            class="bi bi-chevron-left"></i>
        {{ __('Back') }} </a>
@endpush
