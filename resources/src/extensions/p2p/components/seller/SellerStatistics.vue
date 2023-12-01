<template>
    <div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div
                v-for="(stat, index) in stats"
                :key="index"
                class="mb-4 rounded-lg bg-white p-6 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800"
                :class="{
                    'border-l-4 border-blue-500 hover:border-blue-600 dark:border-blue-700 dark:hover:border-blue-800':
                        index % 4 === 0,
                    'border-l-4 border-green-500 hover:border-green-600 dark:border-green-700 dark:hover:border-green-800':
                        index % 4 === 1,
                    'border-l-4 border-yellow-500 hover:border-yellow-600 dark:border-yellow-700 dark:hover:border-yellow-800':
                        index % 4 === 2,
                    'border-l-4 border-red-500 hover:border-red-600 dark:border-red-700 dark:hover:border-red-800':
                        index % 4 === 3,
                }"
            >
                <div
                    class="cursor-default text-sm font-semibold text-gray-600 dark:text-gray-300"
                    :title="stat.tooltip"
                >
                    {{ stat.label }}
                </div>
                <div
                    class="mt-2 cursor-default text-2xl font-semibold text-gray-800 dark:text-gray-100"
                    :title="stat.tooltip"
                >
                    <template v-if="statistics[index]">{{
                        statistics[index].value
                    }}</template>
                    <template v-else>
                        <div
                            class="skeleton h-4 rounded bg-gray-200 dark:bg-gray-700"
                        ></div
                    ></template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "SellerStatistics",
    props: {
        statistics: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            stats: [
                {
                    label: "All Trades",
                    value: "",
                    tooltip: "Total number of completed trades.",
                },
                {
                    label: "30d Trades",
                    value: "",
                    tooltip:
                        "Total number of trades completed in the past 30 days.",
                },
                {
                    label: "30d Completion Rate",
                    value: "",
                    tooltip:
                        "Percentage of completed trades in the past 30 days.",
                },
                {
                    label: "Avg. Completion Time",
                    value: "",
                    tooltip: "Average time taken to complete a trade.",
                },
                {
                    label: "Avg. Pay Time",
                    value: "",
                    tooltip: "Average time taken to make a payment.",
                },
                {
                    label: "Approx. 30d Volume",
                    value: "",
                    tooltip: "Total trading volume in the past 30 days.",
                },
                {
                    label: "Total Volume",
                    value: "",
                    tooltip: "Total trading volume.",
                },
                { label: "Rating", value: "", tooltip: "Seller rating." },
            ],
        };
    },
};
</script>
