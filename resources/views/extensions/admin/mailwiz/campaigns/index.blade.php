@extends('layouts.admin')

@section('content')
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
