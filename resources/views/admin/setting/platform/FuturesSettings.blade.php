@php
    $provider = getProviderFutures();
    $title = $provider !== null ? $provider->title : null;
@endphp
<div class="space-y-3 px-3" id="futures" aria-labelledby="futures-tab" role="tabpanel">
    <div class="border rounded dark:border-gray-600 shadow p-2">
        <div class="flex items-center justify-between">
            <label class="form-control-label mr-1">{{ __('Leverage Range') }}</label>
            <select id="leverage_range" name="leverage_range"
                class="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="largest_leverage"
                    {{ isset($platform->futures->leverage_range) && $platform->futures->leverage_range == 'largest_leverage' ? 'selected' : '' }}>
                    {{ __('Largest Leverage Of Market') }}</option>
                <option value="fixed_leverage"
                    {{ isset($platform->futures->leverage_range) && $platform->futures->leverage_range == 'fixed_leverage' ? 'selected' : '' }}>
                    {{ __('Fixed Leverage') }}</option>
                <option value="slider_leverage" @if (!$title || $title === 'kucoinfutures') disabled @endif
                    {{ isset($platform->futures->leverage_range) && $platform->futures->leverage_range == 'slider_leverage' ? 'selected' : '' }}>
                    {{ __('Range Slider Leverage') }} <span class="text-success">({{ __('Recommended') }})</span>
                </option>
            </select>
        </div>
        <span
            class="text-warning text-xs">{{ __("The 'Largest Leverage Of Market' option allows users to utilize the maximum leverage available in the market, providing the highest potential for gains but also higher risk. On the other hand, the 'Defined Leverage' option allows users to set a specific leverage level, limiting the potential gains and risks according to their preference. The 'Range Slider Leverage' option allows users to adjust the leverage within a specified range using a slider control. This provides users with flexibility in selecting a leverage level that aligns with their risk tolerance and trading strategy. It is important to educate users about the risks associated with leverage trading, including the possibility of significant losses. Providing risk management tools and educational resources can help users make informed decisions while using leverage in their trading strategies.") }}</span>
        <div class="text-xs mt-2">
            @if ($title === 'kucoinfutures')
                {{ __('Largest Leverage Of Market') }} <span
                    class="text-danger text-xs">{{ __('is not available for') }}
                    {{ $title }}
                    {{ __('provider') }}</span>
            @endif
        </div>
    </div>

    @if (isset($platform->futures->leverage_range) && $platform->futures->leverage_range == 'fixed_leverage')
        <div class="border rounded dark:border-gray-600 shadow p-2">
            <div class="flex items-center justify-between">
                <div>
                    <label class="text-sm font-medium text-gray-900 dark:text-gray-300"
                        for="fixed_leverage_amount">{{ __('Leverage Amount') }}</label>
                </div>
                <div class="input-group">
                    <input type="text" name="fixed_leverage_amount"
                        value="{{ $platform->futures->fixed_leverage_amount ?? 20 }}">
                    <span>X</span>
                </div>
            </div>
            <span
                class="text-warning text-xs">{{ __("The 'Leverage Amount' option allows users to set a specific leverage level for futures trading. Users can define the leverage amount according to their risk tolerance and trading strategy. It is important to educate users about the risks associated with leverage trading, including the possibility of significant losses. Providing risk management tools and educational resources can help users make informed decisions while using leverage in their futures trading strategies.") }}</span>
        </div>
    @endif
</div>
