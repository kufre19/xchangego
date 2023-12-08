@extends('layouts.admin')

@section('content')
    <livewire:ext.mail-wiz.templates-table />
@endsection

@push('modals')
    <x-partials.modals.default-modal title="{{ __('Rename Template') }}"
        action="{{ route('admin.mailwiz.templates.rename') }}" submit="{{ __('Rename') }}" id="renameTemplate"
        done="refresh">
        <div class="form-group">
            <input type="hidden" class="form-control" id="newTemplateId" name="template_id">
            <label for="newTemplateName">{{ __('New Template Name') }}</label>
            <input type="text" class="form-control" id="newTemplateName" name="name" required>
        </div>
    </x-partials.modals.default-modal>
@endpush

@push('breadcrumb-plugins')
    <a href="{{ route('admin.mailwiz.templates.create') }}" class="btn btn-outline-primary">
        <i class="bi bi-plus-lg"></i> <span>{{ __('Create Template') }}</span>
    </a>
    <a href="{{ route('admin.mailwiz.campaigns.index') }}" class="btn btn-outline-secondary">
        <i class="bi bi-chevron-right"></i> {{ __('Campaigns') }}</a>
@endpush

@section('page-scripts')
    <script>
        function setRenameTemplateData(templateId, templateName) {
            $('#newTemplateId').val(templateId);
            $('#newTemplateName').val(templateName);
        }
    </script>
@endsection
