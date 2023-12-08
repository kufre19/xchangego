<div class="space-y-3 px-3" id="dashboard" aria-labelledby="dashboard-tab" role="tabpanel">
    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center justify-between">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="default_page">{{ __('Default Dashboard Page') }}</label>
            <select
                class="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="default_page" name="default_page">
                <option value="" @if (
                    !isset($platform->dashboard->default_page) ||
                        $platform->dashboard->default_page == null ||
                        $platform->dashboard->default_page == '') selected @endif>
                    {{ __('Default Dashboard') }}
                </option>
                <option value="trading" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'trading') selected @endif>
                    {{ __('Trading Page') }}
                </option>
                <option value="binary" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'binary') selected @endif>
                    {{ __('Binary Dashboard') }}
                </option>
                <option value="bot" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'bot') selected @endif>
                    {{ __('Bot Dashboard') }}
                </option>
                <option value="ico" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'ico') selected @endif>
                    {{ __('Token Offers Page') }}
                </option>
                <option value="mlm" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'mlm') selected @endif>
                    {{ __('Referrals Page') }}
                </option>
                <option value="forex" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'forex') selected @endif>
                    {{ __('Forex Dashboard') }}
                </option>
                <option value="staking" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'staking') selected @endif>
                    {{ __('Staking Dashboard') }}
                </option>
                <option value="knowledge" @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'knowledge') selected @endif>
                    {{ __('Knowledge Base Page') }}
                </option>
            </select>
        </div>
        <span
            class="text-warning text-xs">{{ __('Choose the page that users will see first after they log in to your platform. This can be a dashboard, a trading page, or any other page that provides a personalized and relevant experience for the user.') }}</span>
    </div>
    <!-- Add new options for border options and sidebar design -->
    <div class="border rounded dark:border-gray-600 shadow p-2 mt-4 space-y-5" x-data="{
        design: '{{ isset($platform->dashboard->sidebar->design) ? $platform->dashboard->sidebar->design : 'rounded' }}',
        borderSide: '{{ isset($platform->dashboard->sidebar->borderSide) ? $platform->dashboard->sidebar->borderSide : 'left' }}',
        borderColor: '{{ isset($platform->dashboard->sidebar->borderColor) ? $platform->dashboard->sidebar->borderColor : '#3b82f6' }}',
        borderWidth: '{{ isset($platform->dashboard->sidebar->borderWidth) ? $platform->dashboard->sidebar->borderWidth : '4' }}',
    }">
        <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-3">
            <div>
                <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="sidebar_design">{{ __('Sidebar Design') }}</label>
                <select
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="sidebar_design" name="sidebar_design" @change="design = $event.target.value">
                    <option value="rounded" @if (
                        !isset($platform->dashboard->sidebar->design) ||
                            $platform->dashboard->sidebar->design == null ||
                            $platform->dashboard->sidebar->design == 'rounded') selected @endif>
                        {{ __('Rounded') }}
                    </option>
                    <option value="square" @if (isset($platform->dashboard->sidebar->design) && $platform->dashboard->sidebar->design == 'square') selected @endif>
                        {{ __('Square') }}
                    </option>
                </select>
                <span
                    class="text-warning text-xs">{{ __('Choose the design of the sidebar menu items, such as rounded or square.') }}</span>
            </div>
            <!-- Menu item preview -->
            <div>
                <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="preview">{{ __('Preview') }}</label>
                <div class=" w-full max-w-[4rem] bg-white dark:bg-transparent lg:w-[3.5rem]">
                    <div class="flex flex-col divide-y divide-gray-200 dark:divide-gray-700"
                        :class="{
                            'px-2': design === 'rounded',
                        }">
                        <ul
                            :class="{
                                'rounded-lg ': design === 'rounded',
                            }">
                            <li class="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                                :class="{
                                    'rounded-lg ': design === 'rounded',
                                }"
                                :style="borderSide !== 'full' ?
                                    `transition: border-${borderSide} 0.2s ease-in-out, transform 0.2s ease-in-out;border-${borderSide}-style: solid;border-${borderSide}-color: ${borderColor}; border-${borderSide}-width: ${borderWidth}px;` :
                                    `transition: border 0.2s ease-in-out, transform 0.2s ease-in-out;border-style: solid;border-color: ${borderColor}; border-width: ${borderWidth / 2}px;`">
                                <div class="group flex w-full items-center text-base font-normal text-gray-900 transition-transform duration-300 ease-in-out hover:translate-x-1 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                    :class="{
                                        'px-4 py-4': design === 'square',
                                        'px-2.5 py-3': design === 'rounded',
                                    }">
                                    <i class="bi bi-house"
                                        style="display: inline-flex;align-items: center;justify-content: center;width: 20px;"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-3">
            <div>
                <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="sidebar_border_side">{{ __('Border Side') }}</label>
                <select
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="sidebar_border_side" name="sidebar_border_side" @change="borderSide = $event.target.value">
                    <option value="full" @if (isset($platform->dashboard->sidebar->borderSide) && $platform->dashboard->sidebar->borderSide == 'full') selected @endif>
                        {{ __('Full') }}
                    </option>
                    <option value="top" @if (isset($platform->dashboard->sidebar->borderSide) && $platform->dashboard->sidebar->borderSide == 'top') selected @endif>
                        {{ __('Top') }}
                    </option>
                    <option value="right" @if (isset($platform->dashboard->sidebar->borderSide) && $platform->dashboard->sidebar->borderSide == 'right') selected @endif>
                        {{ __('Right') }}
                    </option>
                    <option value="bottom" @if (isset($platform->dashboard->sidebar->borderSide) && $platform->dashboard->sidebar->borderSide == 'bottom') selected @endif>
                        {{ __('Bottom') }}
                    </option>
                    <option value="left" @if (
                        !isset($platform->dashboard->sidebar->borderSide) ||
                            $platform->dashboard->sidebar->borderSide == null ||
                            $platform->dashboard->sidebar->borderSide == 'left') selected @endif>
                        {{ __('Left') }}
                    </option>
                </select>

                <span
                    class="text-warning text-xs">{{ __('Choose the border side of the sidebar menu items, such as left or right.') }}</span>
            </div>
            <div>
                <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="sidebar_border_color">{{ __('Border Color') }}</label>
                <div class="flex items-center">
                    <input
                        class="border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="sidebar_border_color" name="sidebar_border_color" type="text" :value="borderColor"
                        @input="borderColor = $event.target.value" placeholder="#3b82f6">
                    <input class="w-10 h-10 rounded-r-lg cursor-pointer" type="color" :value="borderColor"
                        @input="borderColor = $event.target.value">
                </div>
                <span
                    class="text-warning text-xs">{{ __('Choose the border color of the sidebar menu items. Use the color picker or type a valid color code.') }}</span>
            </div>
            <div>
                <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="sidebar_border_width">{{ __('Border Width') }}</label>
                <div class="input-group">
                    <input id="sidebar_border_width" name="sidebar_border_width" type="number" :value="borderWidth"
                        @input="borderWidth = $event.target.value" placeholder="4">
                    <span>px</span>
                </div>
                <span
                    class="text-warning text-xs">{{ __('Choose the border width of the sidebar menu items. Input a valid CSS width value, such as 4px.') }}</span>
            </div>

        </div>

    </div>



    @if (isset($platform->dashboard->default_page) && $platform->dashboard->default_page == 'trading')
        <div class="border rounded dark:border-gray-600 shadow p-2">
            <div class="flex items-center justify-between">
                <div>
                    <label class="text-sm font-medium text-gray-900 dark:text-gray-300"
                        for="first_trade_page">{{ __('First Trading Page') }}</label>
                </div>
                <input class="form-control max-w-sm" type="text" name="first_trade_page"
                    value="{{ $platform->trading->first_trade_page ?? 'BTC/USDT' }}">
            </div>
            <span
                class="text-warning text-xs">{{ __('Choose the default trading pair that users will see when the first page option is set to the trading page on your platform. This can be any trading pair that is available on your platform and that you want to promote or highlight to users. It can be changed by the user at any time during the trading session.') }}</span>
        </div>
    @endif

    <div class="border
                rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center mb-2">
            <label class="inline-flex relative items-center cursor-pointer mr-3">
                <input type="checkbox" value="{{ $platform->dashboard->news ?? 1 }}" class="sr-only peer"
                    onchange="toggleCheckboxValue(this)" data-on="Enable" data-off="Disable" name="news"
                    id="news" @if (isset($platform->dashboard->news) && $platform->dashboard->news == 1) checked @endif>
                <div class="toggle peer">
                </div>
            </label>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('News') }}</span>
        </div>
        <span
            class="text-warning text-xs">{{ __('Enabling news on the right sidebar will display the latest news and updates relevant to your platform or industry. This can provide users with valuable information and insights, and can help to increase engagement and user retention on your platform.') }}</span>
    </div>

    <div class="grid gap-5 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        @php
            $cssClasses = [
                'sidebarBgColor' => [
                    'name' => 'sidebarBgColor',
                    'class' => '.sidebarBgColor',
                ],
                'sidebarBgColorDark' => [
                    'name' => 'sidebarBgColorDark',
                    'class' => '.dark .sidebarBgColor',
                ],
                'navbarBgColor' => [
                    'name' => 'navbarBgColor',
                    'class' => '.navbarBgColor',
                ],
                'navbarBgColorDark' => [
                    'name' => 'navbarBgColorDark',
                    'class' => '.dark .navbarBgColor',
                ],
                'dashboardBgColor' => [
                    'name' => 'dashboardBgColor',
                    'class' => '.dashboardBgColor',
                ],
                'dashboardBgColorDark' => [
                    'name' => 'dashboardBgColorDark',
                    'class' => '.dark .dashboardBgColor',
                ],
                'footerBgColor' => [
                    'name' => 'footerBgColor',
                    'class' => '.footerBgColor',
                ],
                'footerBgColorDark' => [
                    'name' => 'footerBgColorDark',
                    'class' => '.dark .footerBgColor',
                ],
            ];
        @endphp
        @foreach ($cssClasses as $cssClass => $data)
            <div class="border rounded dark:border-gray-600 shadow p-2">
                @php
                    $style = '';
                    $colorValue = ''; // Initialize color value
                    $cssFilePath = public_path('css/custom.css');
                    $cssContent = file_get_contents($cssFilePath);
                    
                    $selector = $data['class'];
                    
                    preg_match('/' . preg_quote($selector, '/') . '\s*?{(.*?)}/s', $cssContent, $matches);
                    if (isset($matches[1])) {
                        $style = $matches[1];
                        preg_match('/background-color:\s*(.*?);/', $style, $colorMatches);
                        if (isset($colorMatches[1])) {
                            $colorValue = convertToRgbFormat($colorMatches[1]);
                        }
                    }
                @endphp
                <div>
                    <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="{{ $data['name'] }}">{{ ucwords(str_replace(['-', '_'], ' ', $data['name'])) }}</label>
                    <div>
                        <div class="w-full {{ $cssClass === 'sidebarBgColorDark' || $cssClass === 'navbarBgColorDark' || $cssClass === 'dashboardBgColorDark' || $cssClass === 'footerBgColorDark' ? 'dark' : '' }}"
                            id="{{ $data['name'] }}-picker"></div>
                        <input class="form-control mt-3" id="{{ $data['name'] }}" name="{{ $data['name'] }}"
                            type="text" value="{{ $colorValue }}" placeholder="#ffffff">
                    </div>
                </div>
            </div>
        @endforeach
    </div>


</div>

@section('page-scripts')
    <script src="https://cdn.jsdelivr.net/npm/@jaames/iro@5"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            var pickers = document.querySelectorAll("[id$='-picker']");
            pickers.forEach(function(picker) {
                var inputId = picker.id.replace("-picker", "");
                var inputElement = document.getElementById(inputId);
                var initialColor = inputElement.value;

                var colorPicker = new iro.ColorPicker(picker, {
                    width: 200,
                    color: initialColor,
                    transparency: true,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    layout: [{
                            component: iro.ui.Wheel,
                            options: {
                                wheelAngle: 0
                            }
                        },
                        {
                            component: iro.ui.Slider,
                            options: {
                                sliderType: "alpha"
                            }
                        },
                        {
                            component: iro.ui.Slider,
                            options: {
                                sliderType: "value"
                            }
                        }
                    ]
                });

                colorPicker.on(["color:init", "color:change"], function(color) {
                    inputElement.value = color.rgbaString;
                });
            });
        });
    </script>

    <script>
        function updateColorValue(cssClass, color) {
            const inputField = document.getElementById(cssClass);
            inputField.value = color;
        }
    </script>
@endsection
