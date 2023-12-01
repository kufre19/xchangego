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
        min="0.00000001"
        step="0.00000001"
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
  import { ref } from "vue";

  export default {
    props: {
      orderType: String,
      pairName: String,
      modelValue: [Number, String],
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    emits: ["get-best-price", "update:modelValue"],
    setup() {
      const price = ref(0);

      return {
        price,
      };
    },
  };
</script>
