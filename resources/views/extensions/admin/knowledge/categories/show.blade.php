@extends('layouts.admin')
@section('content')
    <div class="card">
        <div class="card-header">
            {{ trans('global.show') }} {{ trans('cruds.category.title') }}
        </div>

        <div class="card-body">
            <div class="mb-2">
                <table class="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <th>
                                {{ trans('cruds.category.fields.id') }}
                            </th>
                            <td>
                                {{ $category->id }}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                {{ trans('cruds.category.fields.name') }}
                            </th>
                            <td>
                                {{ $category->name }}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                {{ trans('cruds.category.fields.slug') }}
                            </th>
                            <td>
                                {{ $category->slug }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <a style="margin-top:20px;" class="btn btn-primary" href="{{ url()->previous() }}">
                    {{ trans('global.back_to_list') }}
                </a>
            </div>

            <nav class="mb-3">
                <div class="nav nav-tabs">

                </div>
            </nav>
            <div class="tab-content">

            </div>
        </div>
    </div>
@endsection

@push('breadcrumb-plugins')
    <a style="margin-top:20px;" class="btn btn-outline-secondary" href="{{ url()->previous() }}">
        <i class="bi bi-chevron-left"></i> {{ trans('Back') }}
    </a>
@endpush
