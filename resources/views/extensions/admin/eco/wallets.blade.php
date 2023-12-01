@extends('layouts.admin')

@section('content')
    <livewire:ext.eco.eco-wallets-table :chain="$chain" />
@endsection
