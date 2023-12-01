@extends('layouts.admin')

@section('content')
    <div class="space-y-5">

        <div>
            <div class="flex items-center justify-between mb-5">
                <h1 class="text-xl font-bold text-gray-800">
                    <span class="border-l-4 border-blue-500 pl-2 text-dark">{{ __('Sellers') }}</span>
                </h1>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-5">
                <x-card icon="bi bi-people-fill" bgColor="bg-blue-500" title="Sellers Count" :value="$sellersCount" />
                <x-card icon="bi bi-cash-coin" bgColor="bg-green-500" title="Sellers Total Volume" :value="$sellersTotalVolume" />
                <x-card icon="bi bi-wallet2" bgColor="bg-yellow-500" title="Sellers Total Commissions" :value="$sellersTotalCommissions" />

            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-5">
                <livewire:components.charts.area element="sellers_count" title="Sellers Count" tooltip="Total Sellers"
                    color="#0E9B9B" icon="" />

                <livewire:components.charts.area element="sellers_total_volume" title="Sellers Total Volume"
                    tooltip="Total Volume" color="#EBC607" icon="" />

                <livewire:components.charts.area element="sellers_total_commissions" title="Sellers Total Commissions"
                    tooltip="Total Commissions" color="#EB9707" icon="" />

            </div>
        </div>


        <div>
            <div class="flex items-center justify-between mb-5">
                <h1 class="text-xl font-bold text-gray-800">
                    <span class="border-l-4 border-purple-500 pl-2 text-dark">{{ __('Offers') }}</span>
                </h1>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-5">
                <x-card icon="bi bi-cart-check" bgColor="bg-purple-500" title="Offers Count" :value="$offersCount" />
            </div>
        </div>

        <div>
            <div class="flex items-center justify-between mb-5">
                <h1 class="text-xl font-bold text-gray-800">
                    <span class="border-l-4 border-yellow-500 pl-2 text-dark">{{ __('Orders') }}</span>
                </h1>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-5">
                <x-card icon="bi bi-basket" bgColor="bg-pink-500" title="Orders Count" :value="$ordersCount" />
                <x-card icon="bi bi-check-circle" bgColor="bg-red-500" title="Orders Completion Rate" :value="$ordersCompletionRate . '%'" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-5">
                <livewire:components.charts.area element="p2p_orders" title="P2P Orders" tooltip="Total P2P Orders"
                    color="#9061F9" icon="" />
                <livewire:components.charts.area element="completed_p2p_orders" title="Completed P2P Orders"
                    tooltip="Total Completed P2P Orders" color="#28A745" icon="" />

                <livewire:components.charts.area element="open_p2p_orders" title="Open P2P Orders"
                    tooltip="Total Open P2P Orders" color="#FFC107" icon="" />

                <livewire:components.charts.area element="cancelled_p2p_orders" title="Cancelled P2P Orders"
                    tooltip="Total Cancelled P2P Orders" color="#DC3545" icon="" />
            </div>
        </div>

        <div>
            <div class="flex items-center justify-between mb-5">
                <h1 class="text-xl font-bold text-gray-800">
                    <span class="border-l-4 border-green-500 pl-2 text-dark">{{ __('Earnings') }}</span>
                </h1>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-5">
                <x-card icon="bi bi-currency-dollar" bgColor="bg-orange-500" title="Total Earned Fees" :value="$totalEarnedFees" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-5">
                <livewire:components.charts.area element="sellers_total_fees" title="Total Earned Fees"
                    tooltip="Total Earned Fees" color="#FFC107" icon="" />
            </div>
        </div>
    </div>
@endsection
@section('vendor-scripts')
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
@endsection
