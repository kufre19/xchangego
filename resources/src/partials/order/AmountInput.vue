<template>
  <div>
    <label for="basic-url" class="border-1 order-label peer">
      <span>{{ $t("Amount") }} {{ type === "lot" ? "(Lot)" : "" }}</span>
      <Range :range="range" @calculate-percentage="RangeHandler" />
    </label>
    <div class="flex">
      <input
        :value="modelValue"
        type="number"
        :class="orderTypeClass"
        :min="minAmount"
        :max="maxAmount"
        :step="minAmount"
        required=""
        :disabled="disabled"
        aria-label="Amount (to the nearest dollar)"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <span class="order-span">
        <button
          type="button"
          :disabled="disabled"
          class="border-b border-gray-300 px-2 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-700 disabled:opacity-50"
          @click.prevent="changeAmount('increase')"
        >
          <i class="bi bi-caret-up-fill"></i>
        </button>
        <button
          type="button"
          :disabled="disabled"
          class="px-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-700 disabled:opacity-50"
          @click.prevent="changeAmount('decrease')"
        >
          <i class="bi bi-caret-down-fill"></i>
        </button>
      </span>
      <span class="order-span-2"
        >{{ type === "lot" ? modelValue * lotSize : "" }}
        {{ currencyName }}</span
      >
    </div>
  </div>
</template>

<script>
  import { ref, computed, watch } from "vue";
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
      disabled: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: "amount",
      },
      lotSize: {
        type: Number,
        default: 1,
      },
    },
    emits: ["calculateTotal", "calculatePercentage", "update:modelValue"],
    setup(props, { emit }) {
      const range = ref(0);

      const amount = ref(props.minAmount ?? 0);
      const minDecimals = props.minAmount.toString().split(".")[1]?.length || 0;

      watch(
        () => props.modelValue,
        (value) => {
          const roundedValue = Number(value).toFixed(minDecimals);
          if (value !== roundedValue) {
            emit("update:modelValue", roundedValue);
          }
        },
        { immediate: true }
      );

      const orderTypeClass = computed(() =>
        props.orderType === "buy"
          ? "MarketBuy order-input disabled:opacity-50"
          : "MarketSell order-input disabled:opacity-50"
      );

      const changeAmount = (operation) => {
        const newValue =
          operation === "increase"
            ? parseFloat(props.modelValue) + props.minAmount
            : parseFloat(props.modelValue) - props.minAmount;

        if (newValue >= props.minAmount) {
          amount.value = Number(newValue.toFixed(props.precisionAmount));
          emit("update:modelValue", amount.value);
          emit("calculateTotal");
        }
      };

      const RangeHandler = (percentage) => {
        range.value = percentage;
        emit("calculatePercentage", percentage);
      };

      return {
        range,
        amount,
        orderTypeClass,
        RangeHandler,
        changeAmount,
      };
    },
  };
</script>
