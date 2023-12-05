@extends('layouts.admin')

@section('content')
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600 rounded mb-5">
        <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-200">
                    {{ __('Requirement') }}
                </th>
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-200">
                    {{ __('Minimum') }}
                </th>
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-200">
                    {{ __('Actual') }}
                </th>
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-200">
                    {{ __('Status') }}
                </th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-600">
            <tr>
                <td class="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                    {{ __('Memory (RAM)') }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                    {{ round($requirements['memory']['minimum'] / (1024 * 1024 * 1024), 2) }} GB
                </td>
                <td class="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                    {{ round($requirements['memory']['actual'] / (1024 * 1024 * 1024), 2) }} GB
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    @if ($requirements['memory']['status'])
                        <span
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
                            {{ __('OK') }}
                        </span>
                    @else
                        <span
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100">
                            {{ __('Not OK') }}
                        </span>
                    @endif
                </td>
            </tr>
        </tbody>
    </table>
    <div class="card">
        <div class="card-header">
            {{ __('CORS URL') }}
        </div>
        <div class="card-body">
            <form action="{{ route('admin.test.cors') }}" method="GET" class="mb-4">
                @csrf
                <div class="flex flex-col items-start">
                    <div class="w-full flex xs:space-x-0 sm:space-x-2 xs:block sm:flex">
                        <input type="text" name="url" id="url" value="{{ old('url', getGen()->cors) }}"
                            class="form-control w-full xs:mb-2 sm:mb-0">
                        <button type="submit" class="btn btn-primary xs:w-full sm:w-1/4">{{ __('Test') }} CORS</button>
                    </div>
                </div>
            </form>
            @if (session('status'))
                <div
                    class="alert px-4 py-2 rounded-md {{ session('status') === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white' }}">
                    {{ session('message') }}
                </div>
            @endif
        </div>
    </div>
@endsection
