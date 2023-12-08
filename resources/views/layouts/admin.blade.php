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
    <link rel="stylesheet" type="text/css" href="/css/custom.css">

    <link rel="stylesheet" type="text/css"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    @yield('page-style')
    @livewireStyles

    @php
        getAdminMenu();
        // getUserMenu();
    @endphp
</head>

<body class="font-sans antialiased dashboardBgColor text-slate-500 dark:text-slate-400">

    <div class="min-h-screen overflow-x-hidden" x-data="{
        sidebarCollapsed: $persist(true),
        sidebarHover: false,
        sidebarMobile: false,
    }">

        @include('panels.navigation-menu')

        <div id="app-content" class="flex overflow-hidden">

            @include('panels.sidebar-menu')
            <div id="main-content" class="relative mb-10 h-full w-full overflow-y-auto p-5 duration-300 lg:ml-[4rem]"
                :class="{
                    'sidebar-main-expanded':
                        !sidebarCollapsed ||
                        (sidebarCollapsed && sidebarHover) ||
                        sidebarMobile,
                }">
                @if (Request::is('admin**') && !Request::is('admin/template/index'))
                    @include('partials.breadcrumb')
                @endif
                @yield('vendor-scripts')
                @yield('content')
            </div>

        </div>

        @include('panels.footer-menu')

        {{-- @include('partials.cookie') --}}
        @include('partials.notify')

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js"
            integrity="sha512-STof4xm1wgkfm7heWqFJVn58Hm3EtS31XFaagaa8VMReCXAkQnJZ+jEy8PCC/iT18dFy95WcExNHFTqLyp72eQ=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        @stack('modals')
        @yield('dropdowns')
        @stack('tooltips')
    </div>
    @vite(['resources/js/app.js'])
    @yield('page-scripts')

    @if (getScripts()->count() > 0)
        @foreach (getScripts() as $row)
            {!! htmlspecialchars_decode($row->code) !!}
        @endforeach
    @endif

    @livewireScripts
</body>

</html>
