<template>
    <div>
        <label for="basic-url" class="border-1 order-label peer">
            <span>{{ $t("Amount") }}</span>
            <Range :range="range" @calculate-percentage="RangeHandler" />
        </label>
        <div class="flex">
            <input
                :key="minAmount"
                :value="modelValue"
                type="number"
                :class="orderTypeClass"
                :min="minAmount"
                :max="maxAmount"
                :step="minAmount"
                required=""
                aria-label="Amount (to the nearest dollar)"
                @input="$emit('update:modelValue', $event.target.value)"
            />
            <span :key="ecoStore.market.id" class="order-span">
                <a
                    class="border-b border-gray-300 px-2 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    @click="changeAmount('increase')"
                    ><i class="bi bi-caret-up-fill"></i
                ></a>
                <a
                    class="px-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    @click="changeAmount('decrease')"
                    ><i class="bi bi-caret-down-fill"></i
                ></a>
            </span>
            <span class="order-span-2">{{ currencyName }}</span>
        </div>
    </div>
</template>

<script>
import { ref, computed } from "vue";
import { useEcoStore } from "@/store/eco";
import Range from "./Range.vue";

export default {
    components: {
        Range,
    },
    props: {
        orderType: String,
        formType: String,
        minAmount: Number,
        maxAmount: Number,
        precisionAmount: Number,
        modelValue: [Number, String],
        currencyName: String,
    },
    emits: ["calculateTotal", "calculatePercentage", "update:modelValue"],
    setup(props, { emit }) {
        const ecoStore = useEcoStore();
        const range = ref(0);

        const amount = ref(props.minAmount ?? 0);

        const orderTypeClass = computed(() =>
            props.orderType === "buy"
                ? "MarketBuy order-input"
                : "MarketSell order-input"
        );

        const changeAmount = (operation) => {
            const newValue =
                operation === "increase"
                    ? parseFloat(amount.value) + props.minAmount
                    : parseFloat(amount.value) - props.minAmount;

            if (newValue >= props.minAmount) {
                amount.value = Number(newValue.toFixed(props.precisionAmount));
                emit("calculateTotal");
            }
        };

        const RangeHandler = (percentage) => {
            range.value = percentage;
            emit("calculatePercentage", percentage);
        };

        return {
            ecoStore,
            range,
            amount,
            orderTypeClass,
            RangeHandler,
            changeAmount,
        };
    },
};
</script>
