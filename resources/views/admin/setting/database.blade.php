@extends('layouts.admin')
@section('content')
    <div class="space-y-5">
        @if ($mlm->installed == 1)
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        {{ __('MLM Table Optimizer') }}
                    </div>
                </div>
                <div class="card-body">

                    <a href="{{ route('admin.mlm.regenerate') }}"
                        class="btn btn-primary">{{ __('Regenerate MLM Rows For Old Users') }}</a>
                </div>
            </div>
        @endif

        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    {{ __('Logs Cleaner') }}
                </div>
            </div>
            <div class="card-body">

                <div class="grid gap-5 xs:grid-cols-1 sm:gid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div class="">
                        <form method="POST" action="{{ route('admin.database.binary.practice.logs.clean') }}">
                            @csrf
                            <button type="submit" class="btn btn-danger">{{ __('Clean Binary Practice Logs') }}</button>
                        </form>
                    </div>
                    <div class="">
                        <form method="POST" action="{{ route('admin.database.binary.trade.logs.clean') }}">
                            @csrf
                            <button type="submit" class=" btn btn-danger">{{ __('Clean Binary Trade Logs') }}</button>
                        </form>
                    </div>
                    <div class="">
                        <form method="POST" action="{{ route('admin.database.trade.logs.clean') }}">
                            @csrf
                            <button type="submit" class="btn btn-danger">{{ __('Clean Trade Logs') }}</button>
                        </form>
                    </div>
                    <div class="">
                        <form method="POST" action="{{ route('admin.database.forex.investments.logs.clean') }}">
                            @csrf
                            <button type="submit"
                                class=" btn btn-danger">{{ __('Clean Forex Investments Logs') }}</button>
                        </form>
                    </div>
                    <div class="">
                        <form method="POST" action="{{ route('admin.database.bot.investments.logs.clean') }}">
                            @csrf
                            <button type="submit" class="btn btn-danger">{{ __('Clean Bot Investments Logs') }}</button>
                        </form>
                    </div>
                    <div class="">
                        <form method="POST" action="{{ route('admin.database.staking.logs.clean') }}">
                            @csrf
                            <button type="submit" class="btn btn-danger">{{ __('Clean Staking Logs') }}</button>
                        </form>
                    </div>
                    <div class="">
                        <form method="POST" action="{{ route('admin.database.ico.logs.clean') }}">
                            @csrf
                            <button type="submit" class=" btn btn-danger">{{ __('Clean Token ICO Logs') }}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    {{ __('Wallets Optimizer') }}
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="lg:col-span-3 md:col-span-4 xs:col-span-6 mb-1">
                        <form method="POST" action="{{ route('admin.database.wallets.clean') }}">
                            @csrf
                            <button type="submit" class="btn btn-success">{{ __('Clean Broken Wallets') }}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    {{ __('System Optimizer') }}
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="lg:col-span-3 md:col-span-4 xs:col-span-6 mb-1">
                        <form method="POST" action="{{ route('admin.database.refresh.sidebar') }}">
                            @csrf
                            <button type="submit" class="btn btn-info">{{ __('Refresh Sidebar') }}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    {{ __('Investment Table Check') }}
                </div>
            </div>
            <div class="card-body">

                <form method="POST" action="{{ route('admin.database.investment.table.fix') }}">
                    @csrf
                    <button type="submit" class="btn btn-info">{{ __('Check Last Profit Calculation Column') }}</button>
                </form>
            </div>
        </div>
    </div>
@endsection
