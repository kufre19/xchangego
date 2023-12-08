<template>
    <div class="card card-transaction">
        <div class="card-header">
            <h4 class="card-title">{{ $t("Forex Transactions") }}</h4>
        </div>
        <div
            v-if="forexLogs && forexLogs.length"
            class="overflow-y-auto"
            style="max-height: 280px"
        >
            <div
                v-for="(forexLog, index) in forexLogs"
                :key="index"
                class="transaction-item flex justify-between rounded-t-lg border-gray-200 px-4 py-2 dark:border-gray-600"
                :class="[index !== forexLogs.length - 1 ? 'border-b' : '']"
            >
                <div class="flex items-center">
                    <div
                        class="icon-bg bg-dark mr-2 rounded"
                        :class="{
                            'text-success': forexLog.type === 1,
                            'text-danger': forexLog.type === 2,
                            'text-warning': forexLog.type === 3,
                        }"
                    >
                        <i
                            class="bi"
                            :class="{
                                'bi-journal-arrow-up': forexLog.type === 1,
                                'bi-journal-arrow-down': forexLog.type === 2,
                                'bi-briefcase': forexLog.type === 3,
                            }"
                        ></i>
                    </div>
                    <div class="transaction-percentage">
                        <span
                            :class="{
                                'text-success': forexLog.type === 1,
                                'text-danger': forexLog.type === 2,
                                'text-warning': forexLog.type === 3,
                            }"
                            class="fw-bold"
                        >
                            {{
                                forexLog.type === 1
                                    ? $t("Forex Deposit")
                                    : forexLog.type === 2
                                    ? $t("Forex Withdraw")
                                    : $t("Forex Investment")
                            }}
                        </span>
                        <p>
                            <small
                                ><toDate :time="forexLog.created_at"
                            /></small>
                        </p>
                    </div>
                </div>
                <div class="fw-bolder">
                    <span
                        v-if="
                            (forexLog.type !== 3 && forexLog.status === 0) ||
                            (forexLog.type === 3 && forexLog.status !== 1)
                        "
                        class="badge bg-warning"
                        >{{ $t("Pending") }}</span
                    >
                    <span
                        v-else-if="forexLog.type === 1 && forexLog.status !== 0"
                        class="badge bg-success"
                    >
                        -<toMoney
                            :num="forexLog.amount * userCurrencyRate"
                            :decimals="2"
                        />
                        {{ userCurrencySymbol }}
                    </span>
                    <span
                        v-else-if="forexLog.type === 2 && forexLog.status !== 0"
                        class="badge bg-danger"
                    >
                        +<toMoney
                            :num="forexLog.amount * userCurrencyRate"
                            :decimals="2"
                        />
                        {{ userCurrencySymbol }}
                    </span>
                    <span
                        v-else-if="forexLog.type === 3 && forexLog.status === 1"
                        class="badge bg-warning"
                    >
                        +<toMoney
                            :num="forexLog.profit * userCurrencyRate"
                            :decimals="2"
                        />
                        {{ userCurrencySymbol }}
                    </span>
                </div>
            </div>
        </div>
        <div v-else class="mb-5 text-center">
            <div class="flex justify-center">
                <img
                    height="128"
                    width="128"
                    src="https://assets.staticimg.com/pro/2.0.4/images/empty.svg"
                    alt=""
                />
            </div>
            {{ $t("No Data Found") }}
        </div>
    </div>
</template>
<script>
import toDate from "@/partials/toDate.vue";
import toMoney from "@/partials/toMoney.vue";

export default {
    components: {
        toDate,
        toMoney,
    },
    props: {
        forexLogs: {
            type: Array,
            default: () => [],
        },
        userCurrencyRate: {
            type: [Number, String],
            default: 1,
        },
        userCurrencySymbol: {
            type: String,
            default: "USD",
        },
    },
};
</script>
<style scoped>
.card-transaction .transaction-item:not(:last-child) {
    border-bottom-width: 1px;
}

.card-transaction .icon-bg {
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-transaction .icon-bg i {
    font-size: 1rem;
}

.card-transaction .transaction-percentage {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.card-transaction .transaction-percentage p {
    margin: 0;
    font-size: 0.8rem;
}

.card-transaction .badge {
    font-size: 0.8rem;
}
</style>
