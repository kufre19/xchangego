<template>
    <div>
        <template v-if="logs.length > 0">
            <div
                v-for="(log, index) in logs"
                :key="index"
                class="flex w-full justify-between rounded-t-lg border-gray-200 px-4 py-2 dark:border-gray-600"
                :class="index != log.length - 1 ? 'border-b' : ''"
            >
                <slot :log="log"></slot>
            </div>
        </template>
        <div
            v-else
            class="text-muted flex flex-col items-center justify-center text-center"
            colspan="100%"
        >
            <img
                height="128"
                width="128"
                src="https://assets.staticimg.com/pro/2.0.4/images/empty.svg"
                alt=""
            />
            <p class="">
                {{ $t("No Transactions Found") }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "TransactionItem",
    props: {
        logs: {
            type: Array,
            required: true,
        },
    },
};
</script>
