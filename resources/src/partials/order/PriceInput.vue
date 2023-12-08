<template>
  <div>
    <label for="basic-url" class="border-1 order-label peer">
      <span>{{ $t("Price") }}</span>
      <a class="text-warning" @click="$emit('get-best-price')">
        {{ orderType === "buy" ? $t("Best Ask") : $t("Best Bid") }}</a
      >
    </label>
    <div class="flex">
      <input
        id="price"
        :value="modelValue"
        type="number"
        class="priceNowAsk order-input disabled:opacity-50"
        :min="minPrice"
        :step="minPrice"
        required=""
        placeholder="Price"
        :disabled="disabled"
        aria-label="Amount (to the nearest dollar)"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <span class="order-span-2">{{ pairName }}</span>
    </div>
  </div>
</template>

<script>
  import { ref, watch } from "vue";

  export default {
    props: {
      orderType: String,
      pairName: String,
      modelValue: [Number, String],
      disabled: {
        type: Boolean,
        default: false,
      },
      minPrice: {
        type: Number,
        default: 0.00000001,
      },
      isEco: {
        type: Boolean,
        default: false,
      },
    },
    emits: ["get-best-price", "update:modelValue"],
    setup(props, { emit }) {
      const price = ref(0);
      if (!props.isEco) {
        const minDecimals =
          props.minPrice.toString().split(".")[1]?.length || 6;

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
      }
      return {
        price,
      };
    },
  };
</script>
