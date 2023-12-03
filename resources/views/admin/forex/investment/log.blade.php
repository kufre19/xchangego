@extends('layouts.app')
@section('content')
<div class="row" id="table-hover-row">
    <div class="col-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="card-title">{{ __('locale.Forex Investment Logs')}}</h4><div class="card-search"></div>
            </div>
            <div class="table-responsive">
                <table class="table table-hover custom-data-bs-table">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">{{ __('locale.ID')}}</th>
                            <th scope="col">{{ __('locale.User')}}</th>
                            <th scope="col">{{ __('locale.Type')}}</th>
                            <th scope="col">{{ __('locale.Amount')}}</th>
                            <th scope="col">{{ __('locale.Profit')}}</th>
                            <th scope="col">{{ __('locale.Duration')}}</th>
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
                                <span class="badge bg-warning">{{ __('locale.Forex Investment')}}</span>
                            </td>
                            <td data-label="{{ __('locale.Amount')}}">{{__(getAmount($forex_log->amount))}} $</td>
                            <td data-label="{{ __('locale.Profit')}}" class="@if ($forex_log->result == 1) text-success
                                @elseif($forex_log->result == 2) text-danger @elseif($forex_log->result == 3) @else @endif">
                                @if($forex_log->type == 3)
                                    @if ($forex_log->result == 1) + {{__(getAmount($forex_log->profit))}} $
                                    @elseif($forex_log->result == 2) - {{__(getAmount($forex_log->profit))}} $
                                    @elseif($forex_log->result == 3) {{__(getAmount($forex_log->profit))}} $
                                    @else <span class="badge bg-warning">{{ __('locale.Pending')}}</span>
                                    @endif
                                @endif
                            </td>
                            <td data-label="{{ __('locale.Duration')}}">
                                <div> {{ __('locale.Start')}}: <span class="fw-bold">{{showDateTime($forex_log->start_date, 'd M, Y h:i:s')}}</span></div>
                                <div> {{ __('locale.End')}}: <span class="fw-bold">{{showDateTime($forex_log->end_date, 'd M, Y h:i:s')}}</span></div>
                            </td>
                            <td data-label="{{ __('locale.Status')}}">
                                @if($forex_log->status == 0)
                                    <span class="badge bg-primary">{{ __('locale.Running')}}</span>
                                @elseif($forex_log->status == 1)
                                    <span class="badge bg-success">{{ __('locale.Complete')}}</span>
                                @elseif($forex_log->status == 2)
                                    <span class="badge bg-warning">{{ __('locale.Adjusted')}}</span>
                                @endif
                            </td>
                            <td data-label="{{ __('locale.Action')}}">
                                @if($forex_log->status != 1)
                                    <button type="button" class="btn btn-icon btn-info btn-sm" data-bs-toggle="modal"
                                            data-bs-target="#forexInvestSet" data-id="{{ $forex_log->id }}" onclick="$('#forexInvestSet').find('input[name=log_id]').val($(this).data('id'));"><i class="bi bi-pencil-square"></i></button>
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
<div class="modal modal-slide-in fade" id="forexInvestSet">
    <div class="modal-dialog sidebar-sm">
        <form class="add-new-record modal-content pt-0" method="POST" action="{{ route('admin.forex.investment.set') }}" enctype="multipart/form-data">
            @csrf
            <input type="hidden" id="result" name="result">
            <input type="hidden" id="log_id" name="log_id">
            <div class="modal-header mb-1">
                <h5 class="modal-title" id="exampleModalLabel">{{ __('locale.Set Profit')}}</h5>
            </div>
            <div class="modal-body flex-grow-1">
                <div class="input-group">
                    <input type="number" class="form-control" onkeyup="this.value = this.value.replace (/^\.|[^\d\.]/g, '')" required="" id="profit" name="profit" placeholder="Profit Amount">
                    <span class="input-group-text text-dark" id="profit">{{ $general->cur_text }}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center my-1">
                    <div class="dropdown">
                        <button class="btn btn-outline-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="forexResult" name="forexResult">{{ __('locale.Result')}}</button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" onclick="$('#forexResult').text($(this).text());$('#forexInvestSet').find('input[name=result]').val($(this).data('result'));" data-result="4">{{ __('locale.Win')}}</a></li>
                            <li><a class="dropdown-item" onclick="$('#forexResult').text($(this).text());$('#forexInvestSet').find('input[name=result]').val($(this).data('result'));" data-result="5">{{ __('locale.Lose')}}</a></li>
                            <li><a class="dropdown-item" onclick="$('#forexResult').text($(this).text());$('#forexInvestSet').find('input[name=result]').val($(this).data('result'));" data-result="6">{{ __('locale.Draw')}}</a></li>
                        </ul>
                    </div>
                    <button class="btn btn-success" type="submit">{{ __('locale.Set Profit')}}</button>
                </div>
            </div>
        </form>
    </div>
</div>
@endsection
