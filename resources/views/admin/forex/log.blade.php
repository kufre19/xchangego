@extends('layouts.app')
@section('content')
<div class="row" id="table-hover-row">
    <div class="col-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="card-title">{{ __('locale.Forex Logs')}}</h4><div class="card-search"></div>
            </div>
            <div class="table-responsive">
                <table class="table table-hover custom-data-bs-table">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">{{ __('locale.ID')}}</th>
                            <th scope="col">{{ __('locale.User')}}</th>
                            <th scope="col">{{ __('locale.Type')}}</th>
                            <th scope="col">{{ __('locale.Amount')}}</th>
                            <th scope="col">{{ __('locale.Status')}}</th>
                            <th scope="col">{{ __('locale.Action')}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        @forelse($forex_logs as $forex_log)
                        <tr>
                            <td data-label="{{ __('locale.ID')}}">{{__($loop->iteration)}}</td>
                            <td data-label="{{ __('locale.User')}}"><a class="badge bg-info" href="{{ route('admin.users.detail', $forex_log->user_id) }}">{{ $user->where('id',$forex_log->user_id)->first()->username; }}</a></td>
                            <td data-label="{{ __('locale.Type')}}" class="text-uppercase">
                                @if($forex_log->type == 1)
                                    <span class="badge bg-success">{{ __('locale.Forex Deposit')}}</span>
                                @elseif($forex_log->type == 2)
                                    <span class="badge bg-danger">{{ __('locale.Forex Withdraw')}}</span>
                                @endif
                            </td>
                            <td data-label="{{ __('locale.Amount')}}">{{__(getAmount($forex_log->amount))}} $</td>
                            <td data-label="{{ __('locale.Status')}}">
                                @if($forex_log->status == 0)
                                    <span class="badge bg-warning">{{ __('locale.Pending')}}</span>
                                @elseif($forex_log->status == 1)
                                    <span class="badge bg-success">{{ __('locale.Complete')}}</span>
                                @endif
                            </td>
                            <td data-label="{{ __('locale.Action')}}">
                                @if($forex_log->status != 1)
                                    <a class="btn btn-icon btn-success btn-sm" data-bs-toggle="tooltip"
                                        data-bs-placement="top" title="{{ __('locale.Verify Transaction')}}"
                                        onclick="$('#forexSet').modal('show');">
                                        <i class="bi bi-check-lg"></i>
                                    </a>
                                    <div id="forexSet" class="modal fade text-start" tabindex="-1" aria-hidden="true" role="dialog">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">{{ __('locale.Are you sure want to verify it?')}}</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                    <div class="modal-body">
                                                        <p><span class="fw-bold"></span> {{ __('locale.Payment will be verified.')}}</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">{{ __('locale.Close')}}</button>
                                                        <a href="{{ route('admin.forex.verify',$forex_log->id) }}">
                                                            <button type="submit" class="btn btn-success">{{ __('locale.Verify')}}</button>
                                                        </a>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                @endif
                            </td>
                        </tr>
                        @empty
                            <tr>
                                <td class="text-muted text-center" colspan="100%">{{__($empty_message) }}</td>
                            </tr>
                        @endforelse
                        </tbody>
                    </table>
                </div>
        </div>
        <div class="mb-1">{{paginateLinks($forex_logs) }}</div>
    </div>
</div>
@endsection
