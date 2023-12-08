@extends('layouts.admin')

@section('content')
    <livewire:scripts-table />
@endsection

@push('breadcrumb-plugins')
    <button type="button" class="btn btn-outline-primary" data-modal-toggle="createModal">{{ __('Add New Script') }}</button>
@endpush

@push('modals')
    <x-partials.modals.default-modal title="{{ __('Add New Script') }}" action="{{ route('admin.script.store') }}"
        submit="{{ __('Create') }}" id="createModal">
        <div class="space-y-5">
            <div>
                <label for="title">{{ __('Title') }}</label>
                <input type="text" class="form-control" name="title" required>
            </div>
            <div>
                <label for="code">{{ __('Code') }}</label>
                <textarea class="form-control" name="code" rows="5" required></textarea>
            </div>
            <div class="text-xs">
                <p>
                    {{ __('To add a script, use the <script> tag, like this:') }}<br>
                    <span class="text-warning">&lt;script&gt;<br>&nbsp;&nbsp;console.log('Hello
                        World');<br>&lt;/script&gt;</span>
                </p>
                <br>
                <p>
                    {{ __('To add a style, use the <style> tag, like this:') }}<br>
                    <span class="text-warning">&lt;style&gt;<br>
                        &nbsp;&nbsp;body {<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;background-color: lightblue;<br>
                        &nbsp;&nbsp;}<br>
                        &lt;/style&gt;</span>
                </p>
                <br>
                <p>{{ __('Make sure to use proper snippets for your JavaScript, CSS, or other code.') }}</p>
            </div>
        </div>
    </x-partials.modals.default-modal>

    <x-partials.modals.default-modal title="{{ __('Edit Script') }}" action="{{ route('admin.script.update') }}"
        submit="{{ __('Update') }}" id="editModal">
        <div class="space-y-5">
            <div>
                <input type="hidden" name="id">
                <label for="title">{{ __('Title') }}</label>
                <input type="text" class="form-control" name="title" required>
            </div>
            <div>
                <label for="code">{{ __('Code') }}</label>
                <textarea class="form-control" name="code" rows="5" required></textarea>
            </div>
            <div class="text-xs">
                <p>
                    {{ __('To add a script, use the <script> tag, like this:') }}<br>
                    <span class="text-warning">&lt;script&gt;<br>&nbsp;&nbsp;console.log('Hello
                        World');<br>&lt;/script&gt;</span>
                </p>
                <br>
                <p>
                    {{ __('To add a style, use the <style> tag, like this:') }}<br>
                    <span class="text-warning">&lt;style&gt;<br>
                        &nbsp;&nbsp;body {<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;background-color: lightblue;<br>
                        &nbsp;&nbsp;}<br>
                        &lt;/style&gt;</span>
                </p>
                <br>
                <p>{{ __('Make sure to use proper snippets for your JavaScript, CSS, or other code.') }}</p>
            </div>
        </div>
    </x-partials.modals.default-modal>

    <x-partials.modals.default-modal title="{{ __('Delete Script Confirmation') }}"
        action="{{ route('admin.script.delete') }}" submit="{{ __('Delete') }}" id="deleteModal">
        <div>
            <input type="hidden" name="id">
            <p>{{ __('Are you sure you want to delete the') }} <span class="fw-bold script-title"></span>
                {{ __('script') }}?</p>
        </div>
    </x-partials.modals.default-modal>
@endpush
