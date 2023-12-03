@extends('layouts.app')

@section('content')
<div class="row" id="table-hover-row">
    <div class="col-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="card-title">{{ __('locale.Plans')}}</h4>
                <div class="card-search"></div>
            </div>
            <div class="table-responsive">
                <table class="table table-hover custom-data-bs-table">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">{{ __('locale.Plan')}}</th>
                            <th scope="col">{{ __('locale.Price')}}</th>
                            <th scope="col">{{ __('locale.Duration')}}</th>
                            <th scope="col">{{ __('locale.Return on Investment')}}</th>
                            <th scope="col">{{ __('locale.Status')}}</th>
                            <th scope="col">{{ __('locale.Action')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($plans as $plan)
                            <tr>
                                <td data-label="{{ __('locale.Plan')}}">{{ $plan->title }}</td>
                                <td data-label="{{ __('locale.Price')}}">{{ $plan->price }}</td>
                                <td data-label="{{ __('locale.Duration')}}">{{ $plan->duration }} </td>
                                <td data-label="{{ __('locale.Return on Investment')}}">{{ $plan->roi }}</td>
                                <td data-label="{{ __('locale.Status')}}">
                                    @if($plan->status == 1)
                                    <span class="badge bg-success">{{ __('locale.Active')}}</span>
                                    @else
                                    <span class="badge bg-warning">{{ __('locale.Disabled')}}</span>
                                    @endif
                                </td>
                                <td data-label="{{ __('locale.Action')}}">
                                    <a href="javascript:void(0)" data-id="{{ $plan->id }}"
                                        class="btn btn-icon btn-danger btn-sm removeModalBtn" data-bs-toggle="tooltip"
                                        data-bs-placement="top" title="{{ __('locale.Remove')}}"
                                        onclick="$('#removeModal').find('input[name=id]').val($(this).data('id'));$('#removeModal').modal('show');">
                                        <i class="bi bi-trash"></i>
                                    </a>
                                    <a href="{{ route('admin.forex.investment.edit',$plan->id) }}" class="btn btn-icon btn-warning btn-sm"
                                        data-bs-toggle="tooltip" data-bs-placement="top" title="{{ __('locale.Edit')}}">
                                        <i class="bi bi-pencil-square"></i>
                                    </a>
                                </td>
                            </tr>
                        @empty
                        <tr>
                            <td class="text-muted text-center" colspan="100%">{{ __($empty_message) }}</td>
                        </tr>
                        @endforelse

                    </tbody>
                </table><!-- table end -->
            </div>
        </div><!-- card end -->
        <div class="mb-1">{{ paginateLinks($plans) }}</div>
    </div>
</div>
<div id="removeModal" class="modal fade text-start" tabindex="-1" aria-hidden="true" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ __('locale.Are you sure want to remove?')}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="{{ route('admin.forex.investment.remove') }}" method="POST">
                @csrf
                <div class="modal-body">
                    <input type="hidden" name="id" id="id">
                    <p><span class="fw-bold"></span> {{ __('locale.Plan will be removed.')}}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-dark" data-bs-dismiss="modal">{{ __('locale.Close')}}</button>
                    <button type="submit" class="btn btn-danger">{{ __('locale.Remove')}}</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@push('breadcrumb-plugins')
    <a href="{{ route('admin.forex.investment.new') }}" class="btn btn-primary" ><i class="bi bi-plus-lg"></i> {{ __('locale.New Plan')}}</a>
@endpush
