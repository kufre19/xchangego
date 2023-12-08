@extends('layouts.admin')

@section('content')
    <form id="campaignForm" action="{{ route('admin.mailwiz.campaigns.store') }}" method="POST">
        @csrf
        <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div class="col-span-1">
                <div class="mb-4">
                    <h4 class="text-lg text-gray-900 dark:text-gray-200 pt-3">{{ __('Settings') }}</h4>
                </div>
                <div class="card">
                    <div class="card-body space-y-5">
                        @if ($templates->count() == 0)
                            <div class="alert alert-danger">
                                <p class="text-sm">
                                    <i class="bi bi-exclamation-triangle"></i>
                                    <span
                                        class="ml-1">{{ __('No templates found. Please create a template first.') }}</span>
                                </p>
                            </div>
                            <a href="{{ route('admin.mailwiz.templates.create') }}"
                                class="btn w-full btn-outline-primary">{{ __('Create template') }}</a>
                            @php
                                $disabled = 'disabled';
                            @endphp
                        @endif
                        <div>
                            <label for="template_id" class="block text-gray-700 text-sm mb-2">{{ __('Template') }}:</label>
                            <select id="template_id" name="template_id"
                                class="form-control @if (isset($disabled)) opacity-50 @endif" required
                                @if (isset($disabled)) disabled @endif>
                                <option value="" disabled readonly selected>{{ __('Select Template') }}</option>
                                @foreach ($templates as $template)
                                    <option value="{{ $template->id }}"
                                        {{ old('template_id') == $template->id ? 'selected' : '' }}>
                                        {{ $template->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div>
                            <label for="campaignName"
                                class="block text-gray-700 text-sm mb-2">{{ __('Campaign Name') }}:</label>
                            <input id="campaignName" name="name" type="text"
                                value="{{ old('name') }}"class="form-control @if (isset($disabled)) opacity-50 @endif"
                                required @if (isset($disabled)) disabled @endif>
                        </div>
                        <div>
                            <label for="campaignSubject"
                                class="block text-gray-700 text-sm mb-2">{{ __('Mail Subject') }}:</label>
                            <input id="campaignSubject" name="subject" type="text"
                                value="{{ old('subject') }}"class="form-control @if (isset($disabled)) opacity-50 @endif"
                                required @if (isset($disabled)) disabled @endif>
                        </div>
                        <div>
                            <label for="campaignSpeed"
                                class="block text-gray-700 text-sm mb-2">{{ __('Mails/Cron Run') }}:</label>
                            <input id="campaignSpeed" name="speed" type="text"
                                value="{{ old('speed') }}"class="form-control @if (isset($disabled)) opacity-50 @endif"
                                required @if (isset($disabled)) disabled @endif>
                        </div>
                        <small><span class="text-warning">{{ __('Number of mails sent per each cron run') }}</span></small>
                    </div>
                    <div class="card-footer">
                        <button onclick="submitCampaignAndSetUsers()" class="btn btn-success w-full">
                            {{ __('Submit') }}
                        </button>
                    </div>
                </div>
            </div>

            <div class="xs:col-span-1 lg:col-span-2">
                <div class="flex justify-between items-center mb-4">
                    <h4 class="text-lg text-gray-900 dark:text-gray-200">{{ __('Select Users') }}</h4>
                    <div><input type="text" id="search-user" class="form-control w-64" placeholder="Search users"></div>
                </div>

                <div class="table-scroll mailwiz-table-height rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                            <tr class="sticky header-sticky bg-gray-50 dark:bg-gray-800">
                                <th class="w-12 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <input type="checkbox" id="select-all" class="form-checkbox">
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {{ __('Name') }}
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {{ __('Email') }}
                                </th>
                            </tr>
                        </thead>
                        <tbody id="user-table-body"
                            class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            @foreach ($users as $user)
                                <tr>
                                    <td class="w-12 text-center py-4 whitespace-nowrap">
                                        <input type="checkbox" name="users[]" value="{{ $user->id }}"
                                            class="form-checkbox user-checkbox" id="user-{{ $user->id }}">
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <label for="user-{{ $user->id }}"
                                            class="text-sm text-gray-900 dark:text-gray-200">{{ $user->name }}</label>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <label for="user-{{ $user->id }}"
                                            class="text-sm text-gray-900 dark:text-gray-200">{{ $user->email }}</label>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </form>
@endsection

@push('breadcrumb-plugins')
    @push('breadcrumb-plugins')
        <a href="{{ route('admin.mailwiz.campaigns.index') }}" class="btn btn-outline-secondary"><i
                class="bi bi-chevron-left mr-1"></i>
            {{ __('Back') }}</a>
    @endpush
@endpush

@section('page-scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const selectAllCheckbox = document.getElementById('select-all');
            const userCheckboxes = document.querySelectorAll('.user-checkbox');

            selectAllCheckbox.addEventListener('change', function() {
                userCheckboxes.forEach(checkbox => {
                    checkbox.checked = selectAllCheckbox.checked;
                });
            });
        });

        function submitCampaignAndSetUsers() {
            unlayer.exportHtml(function(data) {
                const campaignData = {
                    design: data.design, // Save the design JSON
                    html: data.html, // Save the HTML
                };

                document.getElementById('campaignTemplate').value = JSON.stringify(campaignData);

                const campaignHtmlContent = document.createElement('input');
                campaignHtmlContent.type = 'hidden';
                campaignHtmlContent.name = 'html_content';
                campaignHtmlContent.value = data.html;
                document.getElementById('campaignForm').appendChild(campaignHtmlContent);

                document.getElementById('campaignForm').submit();
            });

        }

        function filterUsers() {
            const searchTerm = document.getElementById('search-user').value.toLowerCase();
            const tableRows = document.querySelectorAll('#user-table-body tr');

            tableRows.forEach(row => {
                const nameCell = row.querySelector('td:nth-child(2)');
                const emailCell = row.querySelector('td:nth-child(3)');
                const name = nameCell.textContent.toLowerCase();
                const email = emailCell.textContent.toLowerCase();

                if (name.includes(searchTerm) || email.includes(searchTerm)) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }

            });
        }
        document.getElementById('search-user').addEventListener('input', filterUsers);

        document.getElementById('campaignName').addEventListener('input', function() {
            if (this.value.trim() !== '') {
                document.getElementById('createTemplateIdBtn').disabled = false;
            } else {
                document.getElementById('createTemplateIdBtn').disabled = true;
            }
        });
    </script>
@endsection
