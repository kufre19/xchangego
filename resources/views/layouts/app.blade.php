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
    <!-- Scripts -->
    @vite(['resources/css/app.css'])
    <link rel="stylesheet" type="text/css" href="/css/custom.css">

    <link rel="stylesheet" type="text/css"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
</head>

<body class="font-sans antialiased text-slate-500 dark:text-slate-400 dashboardBgColor">


    <div id="app"></div>

    <script>
        window.usermenuData = [@json(getUserMenu())]
        window.VUE_APP_I18N_LOCALE = "{{ env('VUE_APP_I18N_LOCALE') ?? null }}";
        window.VUE_APP_I18N_FALLBACK_LOCALE = "{{ env('VUE_APP_I18N_FALLBACK_LOCALE') ?? null }}";
        window.PUSHER_APP_KEY = "{{ env('PUSHER_APP_KEY') ?? null }}";
        window.PUSHER_APP_CLUSTER = "{{ env('PUSHER_APP_CLUSTER') ?? null }}";
        window.gnl = @json($general);
        window.cors = gnl.cors ? gnl.cors : '';
        window.plat = @json(@$plat);
        window.ext = @json(getExts());
        window.provider = '{{ $provider }}';
        window.providerFutures = "{{ $providerFutures ?? 'kucoinfutures' }}";
        window.tradingWallet = '{{ $tradingWallet ?? 1 }}';
        window.siteName = '{{ $siteName }}';
        window.cur_rate = '{{ $gnl_cur->rate }}';
        window.cur_symbol = '{{ $gnl_cur->code }}';
        window.walletconnectid = "{{ env('VUE_APP_WALLET_CONNECT_PROJECT_ID') }}"
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js"
        integrity="sha512-STof4xm1wgkfm7heWqFJVn58Hm3EtS31XFaagaa8VMReCXAkQnJZ+jEy8PCC/iT18dFy95WcExNHFTqLyp72eQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    @if ($provider === 'bitget')
        <script type="text/javascript" src="https://cdn.ccxt.com/latest/bitget.min.js"></script>
    @elseif ($provider === 'binanceus' || $provider === 'coinbasepro' || $providerFutures !== null)
        <script type="text/javascript" src="https://cdn.ccxt.com/latest/ccxt.min.js"></script>
    @else
        <script type="text/javascript" src="https://cdn.ccxt.com/latest/{{ $provider }}.min.js"></script>
    @endif
    @vite('resources/src/user.js')
    @include('partials.notify')

    @if (getScripts()->count() > 0)
        @foreach (getScripts() as $row)
            {!! htmlspecialchars_decode($row->code) !!}
        @endforeach
    @endif
</body>

</html>
