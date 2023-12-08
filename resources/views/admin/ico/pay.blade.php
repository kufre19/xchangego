@extends('layouts.app')
@section('content')
    <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4 class="card-title">{{ __('Token Sale') }}</h4>
                    <div class="card-search"></div>
                </div>
                <div class="card-body">
                    @php
                        $user_meta = \App\Models\UserMeta::where('user_id', $ico_log->user_id)->first();
                    @endphp
                    <div class="d-flex justify-content-between align-items-center my-1 p-1 shadow rounded border-secondary">
                        <div class="">{{ __('User') }}</div>
                        <a class="badge bg-info" href="{{ route('admin.users.detail', $ico_log->user_id) }}">
                            {{ $user->where('id', $ico_log->user_id)->first()->username }}</a>
                    </div>
                    <div
                        class="text-uppercase d-flex justify-content-between align-items-center my-1 p-1 shadow rounded border-secondary">
                        <div class="">{{ __('Token') }}</div>
                        <div class="">{{ \App\Models\Ico\ICO::where('id', $ico_log->ico_id)->first()->symbol }}</div>
                    </div>
                    <div
                        class="text-uppercase d-flex justify-content-between align-items-center my-1 p-1 shadow rounded border-secondary">
                        {{ __('TxHash') }}
                        @if ($ico_log->txHash == null)
                            <button class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#payToken"
                                data-id="{{ $ico_log->id }}" data-inp_amount="{{ $ico_log->ico_amount }}"
                                onclick="$('#payToken').find('input[name=id]').val($(this).data('id'));
                                        $('#payToken').find('input[name=inp_amount]').val($(this).data('inp_amount'));">
                                {{ __('Pay') }}
                            </button>
                        @else
                            <a class="text-nowrap" href="https://testnet.bscscan.com/tx/{{ $ico_log->txHash }}">
                                {{ $ico_log->txHash }}
                            </a>
                        @endif
                    </div>
                    <div class=" my-1 p-1 shadow rounded border-secondary">{{ __('Amount') }}
                        <div
                            class="d-flex justify-content-between align-items-center my-1 p-1 shadow rounded border-secondary">
                            <div>{{ __('Paid') }}</div>
                            <span class="fw-bold">{{ getAmount($ico_log->amount) }}
                                {{ $ico_log->from_symbol }}</span>
                        </div>
                        <div
                            class="d-flex justify-content-between align-items-center my-1 p-1 shadow rounded border-secondary">
                            <div>{{ __('To Recieve') }}</div>
                            <span class="fw-bold">{{ getAmount($ico_log->ico_amount) }}
                                {{ \App\Models\Ico\ICO::where('id', $ico_log->ico_id)->first()->symbol }}</span>
                        </div>
                        <div
                            class="d-flex justify-content-between align-items-center my-1 p-1 shadow rounded border-secondary">
                            <div>{{ __('Recieved') }}</div>
                            <span class="fw-bold">
                                @if ($ico_log->status == 0)
                                    <span class="badge bg-warning">{{ __('Pending') }}</span>
                                    @if ($ico_log->txHash != null)
                                        <button class="btn btn-sm btn-success" data-bs-toggle="modal"
                                            data-bs-target="#verifyTrx" data-id="{{ $ico_log->id }}"
                                            onclick="$('#verifyTrx').find('input[name=id]').val($(this).data('id'));">
                                            {{ __('Verify') }}
                                        </button>
                                    @endif
                                @elseif($ico_log->status == 1)
                                    {{ getAmount($ico_log->ico_amount) }}
                                    {{ \App\Models\Ico\ICO::where('id', $ico_log->ico_id)->first()->symbol }}
                                @elseif($ico_log->status == 2)
                                    <span class="badge bg-danger">{{ __('Rejected') }}</span>
                                @endif
                            </span>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-1 p-1 shadow rounded border-secondary">
                        {{ __('Status') }}
                        @if ($ico_log->status == 0)
                            <span class="badge bg-warning">{{ __('Pending') }}</span>
                        @elseif($ico_log->status == 1)
                            <span class="badge bg-success">{{ __('Paid') }}</span>
                        @elseif($ico_log->status == 2)
                            <span class="badge bg-danger">{{ __('Rejected') }}</span>
                        @endif
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-8 col-md-6 col-sm-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4 class="card-title">{{ __('Guide') }}</h4>
                    <div class="card-search"></div>
                </div>
                <div class="card-body">
                    <ul>
                        <li>{{ __('Add Smart Contract Token to your metamask') }} <button
                                class="btn btn-success btn-sm addToken">{{ __('Add Token') }}</button></li>
                        <li>{{ __('Click') }} <b class="text-success">{{ __('Pay') }}</b>
                            {{ __('to send the payment to client from metamask') }}</li>
                        <li>{{ __('Web3 will command the metamask to add your ICO network if it dont exist in MetaMask') }}
                        </li>
                        <li>{{ __('Web3 will command the metamask to switch to your ICO network to process the payment') }}
                        </li>
                        <li>{{ __('If Metamask was not abile to select your token wallet you added as a custom wallet them from the top click edit and then select your token and enter the amount u need to pay') }}
                        </li>
                        <li>{{ __('After payment Web3 will return the value of the transaction Hash to the site and save it') }}
                        </li>
                        <li>{{ __('Either wait for Metamask to inform you of it success or click the Hash link to verify manually') }}
                        </li>
                        <li>{{ __('If Success then click') }} <b class="text-success">{{ __('Verify') }}</b>
                            {{ __('btn to update the client contract so he know he get paid') }}</li>
                        <li>{{ __('If payment failed do the same but mark it as Rejected so the client get refunded nad transaction marked as failed') }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="modal modal-slide-in fade" id="payToken">
        <div class="modal-dialog sidebar-sm add-new-record modal-content pt-0">
            <input type="hidden" id="id" name="id">
            <div class="modal-header mb-1">
                <h5 class="modal-title" id="exampleModalLabel">{{ __('Set Payment Method') }}</h5>
            </div>
            <div class="modal-body flex-grow-1">
                <label class="form-label" for="inp_amount">{{ __('Amount To Send') }}</label>
                <div class="input-group">
                    <input type="number" class="form-control" required="" id="inp_amount" name="inp_amount"
                        placeholder="Amount" readonly>
                    <span class="input-group-text text-dark" id="profit">{{ $ico->symbol }}</span>
                </div>
                <label class="form-label mt-1" for="name">{{ __('ICO Chain Network') }}</label>
                <div class="input-group">
                    <input type="text" class="form-control" value="{{ $network->chainName }}" readonly disabled>
                    <span class="input-group-text text-dark">{{ $network->symbol }}</span>
                </div>
                <div class="text-end my-1">
                    <button class="btn btn-success sendEthButton">{{ __('Pay') }}</button>
                </div>

            </div>
        </div>
    </div>
    <div class="modal modal-slide-in fade" id="verifyTrx">
        <div class="modal-dialog sidebar-sm add-new-record modal-content pt-0">
            <form class="add-new-record modal-content pt-0" action="{{ route('admin.ico.verify') }}" method="POST"
                enctype="multipart/form-data">
                @csrf
                <input type="hidden" id="id" name="id">
                <input type="hidden" id="status" name="status">
                <div class="modal-header mb-1">
                    <h5 class="modal-title" id="exampleModalLabel">{{ __('Set Transaction Status') }}</h5>
                </div>
                <div class="modal-body flex-grow-1">
                    <div class="dropdown">
                        <button class="w-100 btn btn-outline-warning dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false" id="trxStatus"
                            name="trxStatus">{{ __('Select Status') }}</button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item"
                                    onclick="$('#trxStatus').text($(this).text());$('#verifyTrx').find('input[name=status]').val($(this).data('status'));"
                                    data-status="1">Successful</a></li>
                            <li><a class="dropdown-item"
                                    onclick="$('#trxStatus').text($(this).text());$('#verifyTrx').find('input[name=status]').val($(this).data('status'));"
                                    data-status="0">Failed</a></li>
                        </ul>
                    </div>
                    <div class="my-1">
                        <button type="submit" class="btn btn-success me-1">{{ __('Submit') }}</button>
                        <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                    </div>

                </div>
            </form>
        </div>
    </div>
@endsection
