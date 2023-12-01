<template>
    <div>
        <h2 class="mb-4 text-lg font-medium leading-6 text-gray-900">
            {{ $t("Closed Orders") }}
        </h2>
        <div v-if="orders.length === 0" class="text-gray-500">
            {{ $t("No closed orders found.") }}
        </div>
        <ul
            v-else
            class="divide-y divide-gray-200 rounded-md border border-gray-200"
        >
            <li
                v-for="(order, index) in orders"
                :key="index"
                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
            >
                <div class="flex w-0 flex-1 items-center">
                    <span class="flex-shrink-0">
                        <svg
                            class="h-5 w-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M2 2a1 1 0 011-1h14a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V2zm3.293 4.293a1 1 0 00-1.414 1.414L8.586 11H5a1 1 0 100 2h4a1 1 0 00.707-.293l5-5a1 1 0 00-1.414-1.414L9 9.586l-3.293-3.293z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                    <span class="ml-2 w-0 flex-1 truncate">
                        {{ order.title }}
                    </span>
                </div>
                <div class="ml-4 flex-shrink-0">
                    <span class="font-medium text-gray-900">
                        ${{ order.price.toFixed(2) }}
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        orders: {
            type: Array,
            required: true,
        },
    },
};
</script>
