<footer id="footer"
    class="fixed bottom-0 right-0 px-4 pl-20 w-full md:flex md:items-center md:justify-between overflow-hidden z-40 border-t backdrop-blur transition-colors duration-500 lg:border-slate-900/10 dark:border-slate-50/[0.06] footerBgColor supports-backdrop-blur:bg-white/60">
    <div class="xl:flex xl:items-center xl:space-x-3 md:mb-0 if-sm">
        <p class="text-sm text-center text-gray-500 dark:text-gray-400 xl:mb-0">
            &copy;
            <script>
                document.write(new Date().getFullYear())
            </script> {{ siteName() }}.
            {{ __('All rights Reserved') }}
        </p>
    </div>
    <div class="flex justify-center items-center space-x-3">
        @php
            $locales = [
                'ar' => ['lang' => 'Arabic', 'icon' => 'iq'],
                'bn' => ['lang' => 'Bengali', 'icon' => 'in'],
                'de' => ['lang' => 'German', 'icon' => 'de'],
                'en' => ['lang' => 'English', 'icon' => 'us'],
                'es' => ['lang' => 'Spanish', 'icon' => 'es'],
                'fa' => ['lang' => 'Farsi', 'icon' => 'ir'],
                'fr' => ['lang' => 'French', 'icon' => 'fr'],
                'hi' => ['lang' => 'Hindi', 'icon' => 'in'],
                'hu' => ['lang' => 'Hungarian', 'icon' => 'hu'],
                'id' => ['lang' => 'Indonesian', 'icon' => 'id'],
                'it' => ['lang' => 'Italian', 'icon' => 'it'],
                'ja' => ['lang' => 'Japanese', 'icon' => 'jp'],
                'ko' => ['lang' => 'Korean', 'icon' => 'kr'],
                'nb' => ['lang' => 'Norwegian', 'icon' => 'no'],
                'nl' => ['lang' => 'Netherlands', 'icon' => 'nl'],
                'pl' => ['lang' => 'Polish', 'icon' => 'pl'],
                'pt' => ['lang' => 'Portuguese', 'icon' => 'pt'],
                'ru' => ['lang' => 'Russain', 'icon' => 'ru'],
                'th' => ['lang' => 'Thai', 'icon' => 'th'],
                'tr' => ['lang' => 'Turkish', 'icon' => 'tr'],
                'uk' => ['lang' => 'Ukrainian', 'icon' => 'ua'],
                'ur' => ['lang' => 'Urdo', 'icon' => 'pk'],
                'vi' => ['lang' => 'Vietnamese', 'icon' => 'vn'],
                'zh' => ['lang' => 'Chinese', 'icon' => 'cn'],
            ];
            $locale = arrayToObject($locales);
        @endphp
        <button id="dropdownLanguageButton" data-dropdown-toggle="dropdownLanguage"
            class="flex p-1.5 items-center text-sm font-medium text-gray-900 rounded-full hover:text-primary-600 dark:hover:text-primary-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
            type="button">
            <span class="sr-only">Open user menu</span>
            <img class="h-3.5 w-3.5 rounded-full mr-2"
                src="/assets/flags/{{ $locales[Session::get('locale', config('app.locale'))]['icon'] ?? 'us' }}.svg">
            {{ ucfirst(Session::get('locale', config('app.locale'))) }}
            <svg class="w-4 h-4 mx-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
        </button>
        <button onclick="toggleFullScreen();"
            class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
            <svg id="toggleFullScreen" onclick="toggleFullScreen();" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>

        </button>
    </div>
    <script>
        function toggleFullScreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                $('#toggleFullScreen').html(
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />'
                );
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                    $('#toggleFullScreen').html(
                        '<path stroke-linecap="round" stroke-linejoin="round"d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />'
                    );
                }
            }
        }
        // on page loaded
        document.addEventListener('DOMContentLoaded', function() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.setAttribute('src', img.getAttribute('data-src'));
                        observer.unobserve(img);
                    }
                });
            });

            const images = document.querySelectorAll('.lazyloadd');
            images.forEach((img) => {
                observer.observe(img);
            });
        });
    </script>
</footer>
@section('dropdowns')
    <!-- Dropdown menu -->
    <div id="dropdownLanguage"
        class="hidden z-50 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
        <ul class="py-1" role="none">
            @foreach ($locales as $key => $locale)
                <li>
                    <a href="{{ url('lang/' . $key) }}"
                        class="block px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600"
                        role="menuitem">
                        <div class="inline-flex items-center">
                            <img class="h-3.5 w-3.5 rounded-full mr-2 lazyloadd"
                                data-src="/assets/flags/{{ $locale['icon'] }}.svg">
                            {{ $locale['lang'] }} ({{ ucfirst($key) }})
                        </div>
                    </a>
                </li>
            @endforeach
        </ul>
    </div>
@endsection

@push('tooltips')
    <div id="tooltip-expand" role="tooltip"
        class="inline-block absolute invisible z-50 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        {{ __('Expand') }}
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
@endpush
