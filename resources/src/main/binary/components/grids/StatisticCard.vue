<!-- TradeStatCard.vue -->
<template>
  <div class="card">
    <div class="card-body">
      <div class="mb-1 flex justify-center">
        <div class="rounded-full p-2 shadow-lg dark:bg-gray-900">
          <slot></slot>
        </div>
      </div>
      <div class="mt-3 text-center">
        <p class="text-lg font-thin text-gray-900 dark:text-white">
          {{ tradeValue }}
        </p>
        <p class="text-lg font-thin text-gray-900 dark:text-white">
          {{ tradeLabel }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StatisticCard",
    props: {
      tradeValue: {
        type: Number,
        default: 0,
      },
      tradeLabel: {
        type: String,
        default: "",
      },
    },
  };
</script>
