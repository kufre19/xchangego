<div>
    <div class="relative inline-block">
        <button type="button" wire:click="toggleModal"
            class="relative p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
            <span class="sr-only">{{ __('View notifications') }}</span>

            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z">
                </path>
            </svg>
            @if ($count > 0)
                <span
                    class="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full animate-pulse">{{ $count }}</span>
            @endif
        </button>
        <div class="{{ $showModal ? '' : 'hidden' }} absolute left-1/2 transform -translate-x-1/2 mt-1 z-50 my-4 text-base rounded list-none bg-white divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700"
            id="notification-dropdown">
            <div class="flex flex-col">
                <div
                    class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-lg">
                    {{ __('Notifications') }}
                </div>
                <div wire:init="loadData" class="w-96">
                    @forelse ($notifications as $notification)
                        <a href="{{ route('admin.notification.read', $notification->id) }}"
                            class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                            <div class="flex-shrink-0">
                                <img class="w-11 h-11 rounded-full"
                                    src="{{ getImage(imagePath()['profileImage']['path'] . '/' . @$notification->user->profile_photo_path, imagePath()['profileImage']['size']) }}"
                                    alt="Jese image">
                                <div
                                    class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700">
                                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z">
                                        </path>
                                        <path
                                            d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="pl-3 w-full">
                                <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                    {{ __('New notification from') }}

                                    <span
                                        class="font-semibold text-gray-900 dark:text-white">{{ @$notification->user->username }}</span>:
                                    "{{ __($notification->title) }}"
                                </div>
                                <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
                                    {{ $notification->created_at ? $notification->created_at->diffForHumans() : 'N/A' }}
                                </div>
                            </div>
                        </a>
                    @empty
                        <a href="javascript:void(0)"
                            class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600 min-w-max  rounded-b-lgcc">
                            <div class="pl-3 w-full">
                                <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                    {{ __('No notification found') }}

                                </div>
                            </div>
                        </a>
                    @endforelse
                    <a href="/admin/notification"
                        class="block py-2 text-base font-normal text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline rounded-b-lg">
                        <div class="inline-flex items-center ">
                            <svg class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                <path fill-rule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            {{ __('View all') }}
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
