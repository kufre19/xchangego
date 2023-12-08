@extends('layouts.admin')

@section('content')
    <ul class="mb-2">
        <li><code class="text-blue-500">php artisan optimize:clear</code> -
            {{ __('Clears the cachedbootstrap files and compiled views') }}.</li>
        <li><code class="text-purple-500">composer update</code> -
            {{ __('Updates all PHP dependencies defined in the') }}
            <code>composer.json</code> {{ __('file') }}.
        </li>
        <li><code class="text-yellow-500">yarn</code> - {{ __('Installs all JavaScript dependencies defined in the') }}
            <code>package.json</code> {{ __('file') }}.
        </li>
        <li><code class="text-red-500">yarn build</code> -
            {{ __('Builds your JavaScript and CSS assets for production') }}.</li>
        <li><code class="text-green-500">php artisan storage:link</code> - {{ __('Creates a symbolic link from the') }}
            <code>public/storage</code> {{ __('directory to the') }} <code>storage/app/public</code>
            {{ __('directory') }}.
        </li>
    </ul>
    <div class="alert alert-danger" role="alert">
        <span class="block sm:inline"><span class="font-bold">{{ __('ALERT') }}:</span>
            {{ __('Please note that the composer update process may take approximately 30 seconds to complete, while the yarn build process may take between 1 to 2 minutes depending on your VPS configuration. Kindly wait for the process to complete and refresh the page afterwards to ensure that all updates are applied successfully') }}.</span>
    </div>
    <div class="mb-4 flex justify-between">
        <div>
            <button data-command="optimize-clear"
                class="btn btn-left-border bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Optimize
                Clear</button>
            <button data-command="composer-update"
                class="btn btn-left-border bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded">Composer
                Update</button>
            <button data-command="yarn"
                class="btn btn-left-border bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded">Yarn</button>
            <button data-command="yarn-build"
                class="btn btn-left-border bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">Yarn
                Build</button>
        </div>
        <button data-command="storage-link"
            class="btn btn-left-border bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">Storage
            Link</button>
    </div>
    <div class="bg-black text-white p-4 rounded-lg" style="min-height: 400px;max-height: 400px; overflow: auto;">
        <pre id="terminal-output" class="font-mono whitespace-pre-wrap"></pre>
    </div>
@endsection


@section('page-scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pusher/8.0.2/pusher.min.js"></script>
    <script type="module">
        import Echo from 'https://cdn.jsdelivr.net/npm/laravel-echo/dist/echo.min.js';

        const echo = new Echo({
            broadcaster: 'pusher',
            key: '{{ env('PUSHER_APP_KEY') }}',
            cluster: '{{ env('PUSHER_APP_CLUSTER') }}',
            forceTLS: true,
            authEndpoint: '/user/pusher/auth?_token={{ csrf_token() }}',
            auth: {
                headers: {
                    'X-CSRF-Token': '{{ csrf_token() }}'
                }
            }
        });
        document.querySelectorAll('button[data-command]').forEach(button => {
            button.addEventListener('click', async () => {
                const command = button.getAttribute('data-command');
                await fetch(`/admin/terminal/run/${command}`, {
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                    },
                    method: 'POST'
                });
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
            const channel = document.getElementById('terminal-channel');
            // connect to the channel
            echo.private(`terminal`)
            .listen('TerminalOutput', (data) => {
                const outputData = JSON.parse(data.data);
                if (outputData.type === 'out') {
                    document.getElementById('terminal-output').textContent += outputData.data + '\n';
                } else if (outputData.type === 'err') {
                    document.getElementById('terminal-output').textContent += outputData.data + '\n';
                }
            });
        });
    </script>
@endsection
