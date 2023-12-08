@extends('layouts.admin')

@section('content')
    <livewire:ext.forex.forex-table />
@endsection

@push('modals')
    <x-partials.modals.default-modal title="{{ __('New Forex Account') }}" action="{{ route('admin.forex.store') }}"
        submit="{{ __('Submit') }}" id="newForexAccount" done="refresh">
        <div class="form-group relative">
            <label for="search_user" class="block">{{ __('Search User') }}</label>
            <input type="text" id="search_user" class="form-control" placeholder="{{ __('Search') }}">

            <div id="dropdown"
                class="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 hidden">
                <ul id="user_list" class="max-h-60 overflow-y-auto">
                    @foreach ($usersWithoutForexAccount as $user)
                        <li data-user-id="{{ $user->id }}" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            {{ $user->name }}</li>
                    @endforeach
                </ul>
            </div>
        </div>
        <input type="hidden" name="user_id" id="user_id">
        </x-partials.modals.store-modal>
    @endpush

    @push('breadcrumb-plugins')
        <button class="btn btn-outline-primary" data-modal-toggle="newForexAccount"><i class="bi bi-plus-lg"></i>
            {{ __('New Account') }}</button>
    @endpush

    @section('page-scripts')
        <script>
            const searchInput = document.getElementById('search_user');
            const dropdown = document.getElementById('dropdown');
            const userList = document.getElementById('user_list');
            const userIdInput = document.getElementById('user_id');

            // Show the dropdown when the search input is focused
            searchInput.addEventListener('focus', function() {
                dropdown.classList.remove('hidden');
            });

            // Hide the dropdown when the search input loses focus
            searchInput.addEventListener('blur', function() {
                setTimeout(() => {
                    dropdown.classList.add('hidden');
                }, 100);
            });

            // Filter the user list based on the search input
            searchInput.addEventListener('input', function(event) {
                const searchTerm = event.target.value.toLowerCase();
                const users = userList.children;

                for (let i = 0; i < users.length; i++) {
                    const userName = users[i].textContent.toLowerCase();
                    if (userName.includes(searchTerm)) {
                        users[i].style.display = 'block';
                    } else {
                        users[i].style.display = 'none';
                    }
                }
            });

            // Set the selected user's ID to the hidden input when a user is clicked
            userList.addEventListener('click', function(event) {
                if (event.target.tagName === 'LI') {
                    const userId = event.target.getAttribute('data-user-id');
                    const userName = event.target.textContent;

                    userIdInput.value = userId;
                    searchInput.value = userName;

                    dropdown.classList.add('hidden');
                }
            });
        </script>
    @endsection
