@extends('layouts.admin')
@section('content')
    <div class="card">
        <div class="card-body">
            <div class="mb-2">
                <table class="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <th>
                                {{ trans('Id') }}
                            </th>
                            <td>
                                {{ $faqQuestion->id }}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                {{ trans('Category') }}
                            </th>
                            <td>
                                {{ $faqQuestion->category->category ?? '' }}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                {{ trans('Question') }}
                            </th>
                            <td>
                                {!! $faqQuestion->question !!}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                {{ trans('Answer') }}
                            </th>
                            <td>
                                {!! $faqQuestion->answer !!}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection

@push('breadcrumb-plugins')
    <a style="margin-top:20px;" class="btn btn-outline-secondary" href="{{ url()->previous() }}">
        <i class="bi bi-chevron-left"></i> {{ trans('Back') }}
    </a>
@endpush
