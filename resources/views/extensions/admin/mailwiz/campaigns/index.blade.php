@extends('layouts.admin')

@section('content')
    <div class="grid gap-5 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        <div>
            <a href="#"
                class="block max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div
                    class="mb-4 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center items-center">
                    <i class="bi bi-send-check text-2xl mr-5 dark:text-blue-400"></i>
                    {{ __('Total Emails Sent') }}

                </div>

                <div class="text-center">
                    <div
                        class="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded-full dark:bg-gray-700 dark:text-blue-400">
                        <p>{{ $totalEmailsSent }}</p>
                    </div>
                </div>
            </a>
        </div>
        <div>
            <a href="#"
                class="block max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div
                    class="mb-4 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center items-center">
                    <i class="bi bi-envelope-paper text-2xl mr-5 dark:text-green-400"></i>
                    {{ __('Active Campaigns') }}

                </div>
                <div class="text-center">
                    <div
                        class="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded-full dark:bg-gray-700 dark:text-green-400">
                        <p>{{ $activeCampaignsCount }}</p>
                    </div>
                </div>

            </a>
        </div>
        <div>
            <a href="#"
                class="block max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div
                    class="mb-4 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center items-center">
                    <i class="bi bi-envelope-check-fill text-2xl mr-5 dark:text-red-400"></i>

                    {{ __('Completed Campaigns') }}
                </div>
                <div class="text-center">
                    <div
                        class="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded-full dark:bg-gray-700 dark:text-red-400">
                        <p>{{ $completedCampaignsCount }}</p>

                    </div>
                </div>

            </a>
        </div>

    </div>
    <br>
    <livewire:ext.mail-wiz.campaigns-table />
@endsection


@push('breadcrumb-plugins')
    <a href="{{ route('admin.mailwiz.campaigns.create') }}" class="btn btn-outline-primary">
        <i class="bi bi-plus-lg"></i> <span>{{ __('Create Campaign') }}</span>
    </a>
    <a href="{{ route('admin.mailwiz.templates.index') }}" class="btn btn-outline-secondary">
        <i class="bi bi-chevron-right"></i> {{ __('Templates') }}</a>
@endpush

@section('page-scripts')
    <script>
        async function updateProgressBars() {
            try {
                const response = await fetch("{{ route('admin.mailwiz.campaigns.progress') }}");
                const campaignsProgress = await response.json();

                campaignsProgress.forEach(campaignProgress => {
                    const campaignId = campaignProgress.id;
                    const progressBar = document.querySelector(
                        `.progress-bar[data-campaign-id="${campaignId}"]`);
                    const statusLabel = document.querySelector(
                        `.status-label[data-campaign-id="${campaignId}"]`);

                    progressBar.style.width = campaignProgress.progress + '%';
                    progressBar.textContent = campaignProgress.progress.toFixed(1) + '%';
                });

                setTimeout(updateProgressBars, 5000);
            } catch (error) {
                console.error('Error fetching progress:', error);
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            updateProgressBars();
        });
    </script>
@endsection
