@extends('layouts.admin')

@section('content')
    <div class="container mx-auto">
        <h1 class="text-2xl font-semibold mb-4">{{ $campaign->name }}</h1>

        <div class="mb-4">
            <p class="text-sm font-medium text-gray-700">{{ __('Status') }}: {{ $campaign->getStatusLabel() }}</p>
            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style="width: {{ $campaign->progress }}%"> {{ $campaign->progress }}%</div>
            </div>
            <p class="text-sm font-medium text-gray-700">{{ __('Progress') }}: {{ $campaign->progress }}%</p>
            <div class="mb-4">
                <p class="text-sm font-medium text-gray-700">{{ __('Email Subject') }}:</p>
                <p class="mt-1">{{ $campaign->subject }}</p>
            </div>

            <div class="mb-4">
                <p class="text-sm font-medium text-gray-700">{{ __('Email Content') }}:</p>
                <div class="mt-1 px-3 py-2 border border-gray-300 rounded-md">
                    {!! nl2br(e($campaign->content)) !!}
                </div>
            </div>

            <form action="{{ route('admin.mailwiz.campaigns.start', $campaign) }}" method="post">
                @csrf
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 p4 px-4 rounded">{{ __('Start Campaign') }}</button>
            </form>

            <form action="{{ route('admin.mailwiz.campaigns.pause', $campaign) }}" method="post">
                @csrf
                <button type="submit"
                    class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-4">{{ __('Pause Campaign') }}</button>
            </form>
            <form action="{{ route('admin.mailwiz.campaigns.resume', $campaign) }}" method="post">
                @csrf
                <button type="submit"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">{{ __('Resume Campaign') }}</button>
            </form>
            <form action="{{ route('admin.mailwiz.campaigns.stop', $campaign) }}" method="post">
                @csrf
                <button type="submit"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">{{ __('Stop Campaign') }}</button>
            </form>
            <form action="{{ route('admin.mailwiz.campaigns.destroy', $campaign) }}" method="post">
                @csrf
                @method('DELETE')
                <button type="submit"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">{{ __('Delete Campaign') }}</button>
            </form>
            <div>
                <a href="{{ route('admin.mailwiz.campaigns.edit', $campaign) }}"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {{ __('Edit Campaign') }}
                </a>
            </div>
            <a href="{{ route('admin.send-emails', $campaign) }}"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
                {{ __('Send Marketing Emails') }}
            </a>
        </div>
    @endsection
