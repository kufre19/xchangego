<template>
  <div>
    <label for="basic-url" class="border-1 order-label peer">
      <span>{{ $t("Cost") }}</span>
      <span
        >{{ orderType === "buy" ? $t("Taker Fee") : $t("Maker Fee") }}:
        <span class="text-warning"
          >{{ orderType === "buy" ? takerFee : makerFee }}%</span
        ></span
      >
    </label>
    <div class="flex">
      <input
        type="number"
        class="order-input"
        disabled
        aria-label="Amount (to the nearest dollar)"
        :value="modelValue"
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
      modelValue: [Number, String],
      pairName: String,
      takerFee: [Number, String],
      makerFee: [Number, String],
    },
    emits: ["update-total", "update:modelValue"],
    setup() {
      const total = ref(0);

      return {
        total,
      };
    },
  };
</script>
