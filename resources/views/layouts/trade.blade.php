<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @include('partials.seo')

    <script>
        window.darkMode = "{{ $plat->system->dark_mode ?? 0 }}";
    </script>
    <script>
        function setTheme() {
            if (!('color-theme' in localStorage)) {
                // Set theme from database and save it to local storage
                localStorage.setItem('color-theme', window.darkMode === '1' ? 'dark' : 'light');
            }

            const theme = localStorage.getItem('color-theme');

            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                window.theme = 'dark';
            } else {
                document.documentElement.classList.remove('dark');
                window.theme = 'light';
            }
        }

        setTheme();
    </script>
    @vite(['resources/css/app.css'])

    <link rel="stylesheet" type="text/css"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
</head>

<body class="font-sans antialiased bg-gray-50 text-slate-500 dark:text-slate-400 dark:bg-slate-900">


    <div id="app"></div>

    <script>
        window.VUE_APP_I18N_LOCALE = "{{ getenv('VUE_APP_I18N_LOCALE') ?? null }}";
        window.VUE_APP_I18N_FALLBACK_LOCALE = "{{ getenv('VUE_APP_I18N_FALLBACK_LOCALE') ?? null }}";
        window.PUSHER_APP_KEY = "{{ getenv('PUSHER_APP_KEY') ?? null }}";
        window.PUSHER_APP_CLUSTER = "{{ getenv('PUSHER_APP_CLUSTER') ?? null }}";
        window.plat = @json(@$plat);
        window.gnl = @json($general);
        window.cors = gnl.cors ? gnl.cors : '';
        window.ext = @json(getExts());
        window.provider = "{{ $provider ?? 'kucoin' }}";
        window.trading_wallet = '{{ $trading_wallet }}';
        window.siteName = '{{ $siteName }}';
        window.cur_rate = '{{ $gnl_cur->rate }}';
        window.cur_symbol = '{{ $gnl_cur->code }}';
        window.walletconnectid = "{{ getenv('VUE_APP_WALLET_CONNECT_PROJECT_ID') }}"
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js"
        integrity="sha512-STof4xm1wgkfm7heWqFJVn58Hm3EtS31XFaagaa8VMReCXAkQnJZ+jEy8PCC/iT18dFy95WcExNHFTqLyp72eQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    @if ($provider == 'binanceus')
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/ccxt@latest/dist/ccxt.browser.js"></script>
    @else
        <script type="text/javascript" src="https://cdn.ccxt.com/latest/{{ $provider }}.min.js"></script>
    @endif
    <script type="text/javascript" src="https://cdn.ccxt.com/latest/ccxt.js"></script>
    @vite('resources/src/frontend/trading.js')
    @vite(['resources/js/dark-mode.js'])
    @include('partials.notify')

    @if (getScripts()->count() > 0)
        @foreach (getScripts() as $row)
            {!! htmlspecialchars_decode($row->code) !!}
        @endforeach
    @endif
</body>

</html>
