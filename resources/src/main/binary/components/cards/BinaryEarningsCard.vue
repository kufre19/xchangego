<template>
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">
        <div class="title-gradient">
          {{ $t("Earnings") }}
        </div>
      </h4>
    </div>
    <div class="card-body">
      <div>
        <div class="text-xs">
          {{ $t("This Week") }}
        </div>
        <h5><toMoney :num="tradeWonLastWeek" decimals="2" />{{ symbol }}</h5>
        <p class="card-text text-muted mt-5 text-xs">
          <span> {{ $t("Total Trades") }}: </span>
          <span class="font-medium">{{ totalTrades }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import toMoney from "@/partials/toMoney.vue";
  export default {
    name: "BinaryEarningsCard",
    components: {
      toMoney,
    },
    props: {
      tradeWonLastWeek: {
        type: Number,
        default: 0,
      },
      symbol: {
        type: String,
        default: "",
      },
      totalTrades: {
        type: [String, Number],
        default: 0,
      },
    },
  };
</script>
