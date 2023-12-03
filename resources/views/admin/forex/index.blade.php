@extends('layouts.app')

@section('content')
<div class="row" id="table-hover-row">
    <div class="col-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="card-title">{{ __('locale.Accounts')}}</h4>
                <div class="card-search"></div>
            </div>
            <div class="table-responsive">
                <table class="table table-hover custom-data-bs-table">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">{{ __('locale.User')}}</th>
                            <th scope="col">{{ __('locale.Account Details')}}</th>
                            <th scope="col">{{ __('locale.Broker')}}</th>
                            <th scope="col">{{ __('locale.Signal')}}</th>
                            <th scope="col">{{ __('locale.Status')}}</th>
                            <th scope="col">{{ __('locale.Action')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($accounts as $account)
                            <tr>
                                <td class="fw-bold" data-label="{{ __('locale.User')}}">{{ getUser($account->user_id)->username }}</td>
                                <td data-label="{{ __('locale.Account Details')}}">
                                    <div class="fw-bold ">MT {{ __('locale.Account')}} No: <span class="text-success">{{ $account->number }}</span></div>
                                    <div class="fw-bold ">MT {{ __('locale.Password')}}: <span class="text-success">{{ $account->password }}</span></div>
                                </td>
                                <td data-label="{{ __('locale.Broker')}}">
                                    <div class="fw-bold ">MT {{ __('locale.Broker')}}: <span class="text-success">{{ $account->broker }}</span></div>
                                    <div class="fw-bold ">MT {{ __('locale.Version')}}: <span class="text-success">{{ $account->mt }}</span></div>
                                    <div class="fw-bold ">MT {{ __('locale.Balance')}}: <span class="text-success">{{ $account->balance }}</span></div>
                                </td>
                                <td class="fw-bold" data-label="{{ __('locale.Signal')}}">
                                    <div class="fw-bold ">{{ __('locale.Signal')}} 1: <span class="text-success">@if ($account->signal1_id != null){{ getSignal($account->signal1_id)->title }}@else @endif</span></div>
                                    <div class="fw-bold ">{{ __('locale.Signal')}} 2: <span class="text-success">@if ($account->signal2_id != null){{ getSignal($account->signal2_id)->title }}@else @endif</span></div>
                                    <div class="fw-bold ">{{ __('locale.Signal')}} 3: <span class="text-success">@if ($account->signal3_id != null){{ getSignal($account->signal3_id)->title }}@else @endif</span></div>
                                    <div class="fw-bold ">{{ __('locale.Signal')}} 4: <span class="text-success">@if ($account->signal4_id != null){{ getSignal($account->signal4_id)->title }}@else @endif</span></div>
                                    <div class="fw-bold ">{{ __('locale.Signal')}} 5: <span class="text-success">@if ($account->signal5_id != null){{ getSignal($account->signal5_id)->title }}@else @endif</span></div>
                                </td>
                                <td data-label="{{ __('locale.Status')}}">
                                    @if($account->status == 1)
                                    <span class="badge bg-success">{{ __('locale.Active')}}</span>
                                    @else
                                    <span class="badge bg-warning">{{ __('locale.Disabled')}}</span>
                                    @endif
                                </td>
                                <td data-label="{{ __('locale.Action')}}">
                                    <a href="javascript:void(0)" data-id="{{ $account->id }}"
                                        class="btn btn-icon btn-danger btn-sm removeModalBtn" data-bs-toggle="tooltip"
                                        data-bs-placement="top" title="{{ __('locale.Remove')}}"
                                        onclick="$('#removeModal').find('input[name=id]').val($(this).data('id'));$('#removeModal').modal('show');">
                                        <i class="bi bi-trash"></i>
                                    </a>
                                    <a href="{{ route('admin.forex.edit',$account->id) }}" class="btn btn-icon btn-warning btn-sm"
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
        <div class="mb-1">{{ paginateLinks($accounts) }}</div>
    </div>
</div>
<div id="removeModal" class="modal fade text-start" tabindex="-1" aria-hidden="true" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ __('locale.Are you sure want to remove?')}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="{{ route('admin.forex.remove') }}" method="POST">
                @csrf
                <div class="modal-body">
                    <input type="hidden" name="id" id="id">
                    <p><span class="fw-bold"></span> {{ __('locale.Account will be removed.')}}</p>
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
    <a href="{{ route('admin.forex.new') }}" class="btn btn-primary" ><i class="bi bi-plus-lg"></i> {{ __('locale.New Account')}}</a>
@endpush
