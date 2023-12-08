@extends('layouts.admin')

@section('content')
    <div class="card">
        <div class="card-header">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">{{ __('Import Users') }}</h2>
            </div>
            <div id="file-info" class="hidden mb-4">
                <p class="text-gray-500" id="file-name"></p>
                <p class="text-gray-500" id="file-size"></p>
            </div>
            <div class="flex justify-end space-x-2">
                <button for="file" class="btn btn-primary cursor-pointer">
                    <i class="bi bi-upload"></i> {{ __('Choose File') }}
                    <input type="file" name="file" id="file" class="hidden">
                </button>
                <button id="import-btn" class="btn btn-success disabled:opacity-50" disabled>
                    {{ __('Import') }}</button>
            </div>
        </div>
        <div class="bg-white dark:bg-gray-800">
            <div class="overflow-x-auto">
                <table class="table-auto w-full">
                    <thead class="bg-gray-200 dark:bg-gray-700">
                        <tr>
                            <th class="th">{{ __('Email') }}</th>
                            <th class="th">{{ __('Name') }}</th>
                            <th class="th">{{ __('Role') }}</th>
                        </tr>
                    </thead>
                    <tbody id="user-table">
                        <tr id="no-users-row" class="text-center">
                            <td class="td" colspan="3">{{ __('No users imported yet') }}</td>
                        </tr>
                        <!-- User rows will be inserted here -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection


@push('breadcrumb-plugins')
    <a href="{{ route('admin.users.template') }}" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"><i
            class="bi bi-download"></i> {{ __('Download Template') }}</a>
@endpush

@section('page-scripts')
    <script>
        $(document).ready(function() {
            const fileInput = $('#file');
            const importBtn = $('#import-btn');
            const fileInfo = $('#file-info');
            const fileName = $('#file-name');
            const fileSize = $('#file-size');
            const userTable = $('#user-table');

            fileInput.on('change', function() {
                if (fileInput[0].files.length > 0) {
                    const file = fileInput[0].files[0];
                    fileName.text(`File name: ${file.name}`);
                    fileSize.text(`File size: ${formatFileSize(file.size)}`);
                    fileInfo.removeClass('hidden');
                    importBtn.removeAttr('disabled').removeClass('opacity-50');
                } else {
                    fileInfo.addClass('hidden');
                    importBtn.attr('disabled', '').addClass('opacity-50');
                }
            });

            importBtn.on('click', function() {
                const formData = new FormData();
                formData.append('file', fileInput[0].files[0]);

                $.ajax({
                    method: 'POST',
                    url: "{{ route('admin.users.importing') }}",
                    data: formData,
                    contentType: false,
                    processData: false,
                    headers: {
                        'X-CSRF-Token': '{{ csrf_token() }}'
                    },
                    success: function(response) {
                        userTable.empty();
                        if (response.status == 'success') {
                            for (const user of response.users) {
                                const row = `
                    <tr>
                        <td class="td">${user.email}</td>
                        <td class="td">${user.name}</td>
                        <td class="td">${user.role}</td>
                    </tr>`;
                                userTable.append(row);
                            }
                        }
                        notify(response.status, response.message);
                    },
                    error: function(response) {
                        notify('error', response.responseJSON.message);
                    }
                });
            });

            function formatFileSize(size) {
                const units = ['B', 'KB', 'MB', 'GB', 'TB'];
                let unitIndex = 0;
                while (size >= 1024 && unitIndex < units.length - 1) {
                    size /= 1024;
                    unitIndex++;
                }
                return `${size.toFixed(2)} ${units[unitIndex]}`;
            }
        });
    </script>
@endsection
