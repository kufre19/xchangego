@extends('layouts.admin')

@section('content')
    <form action="{{ route('admin.popups.update', $popup->id) }}" method="POST" enctype="multipart/form-data" id="popupUpdate">
        @csrf
        <div class="card">
            <div class="card-header flex justify-between items-center">
                <h4 class="card-title">{{ 'Editing ' . $popup->title . ' popup' }}</h4>

            </div>
            <div class="card-body">
                <div class="grid grid-cols-2 gap-5">
                    <div>
                        <label for="title"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Title') }}</label>
                        <input type="text"id="title" name="title" aria-label="Coin Title" placeholder="Popup Title"
                            value="{{ $popup->title }}"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder-red-500">
                    </div>

                    <div>
                        <label for="Link"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Link') }}</label>

                        <div class="mb-1">
                            <input type="text" class="form-control" id="link" name="link"
                                placeholder="Popup Link" aria-describedby="link" value="{{ $popup->link }}">
                            <small
                                class="text-warning">{{ __('Adding link will show a button to open new tab in the popup') }}</small>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between">
                            <label for="max_limit"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Duration') }}</label>

                        </div>

                        <div class="input-group">
                            <input type="number" id="duration" name="duration" placeholder="Popup Duration"
                                aria-describedby="duration" value="{{ $popup->duration }}">
                            <span id="max_limit" for="max_limit">
                                Sec

                            </span>
                        </div>
                        <small class="text-warning">{{ __('Duration until popup automatically closed') }}</small>

                    </div>

                    <div>
                        <label for="end_date"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('End Date') }}</label>
                        <input type="date" id="end_date" name="end_date" class="form-control"
                            value="{{ \Carbon\Carbon::parse($popup->end_date)->format('Y-m-d') }}" />
                    </div>
                    <div class="col-span-2">
                        <label for="desc"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('Message') }}</label>
                        <div class="mb-1">
                            <textarea class="form-control" name="msg" rows="4" id="msg" placeholder="Popup Message">{!! $popup->msg !!}</textarea>
                            <small class="text-warning">{{ __('HTML code allowed') }}</small>
                        </div>
                    </div>

                    <div class="justify-start items-top mb-1">
                        <div>

                            <img class="img-thumbnail mb-1"
                                src="{{ getImage(imagePath()['popup']['path'] . '/' . $popup->image, imagePath()['popup']['size']) }}" />
                        </div>
                        <input class="upload" name="image" type="file" id="image" accept=".png, .jpg, .jpeg">
                        <small class="text-warning">600px * 400px</small>
                    </div>

                </div>
                <div>
                    <label class="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" value="{{ $popup->status }}" {{ $popup->status == 1 ? 'checked' : '' }}
                            class="sr-only peer" data-on="{{ __('Active') }}" data-off="{{ __('Disabled') }}"
                            name="status" id="statusEdit">
                        <div onclick="$('#statusEdit').val($('#statusEdit').val() == 1 ? 0 : 1)" class="toggle peer">
                        </div>
                        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('Status') }}</span>
                    </label>
                </div>
            </div>
            <div class="card-footer text-end">
                <button type="submit"
                    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{{ __('Edit') }}
                </button>
            </div>
        </div>
    </form>
@endsection


@push('breadcrumb-plugins')
    <a href="{{ route('admin.popups.index') }}" class="btn btn-outline-secondary"><i class="bi bi-chevron-left"></i>
        {{ __('Back') }}</a>
@endpush
