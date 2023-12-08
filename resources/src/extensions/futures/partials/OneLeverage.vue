<template>
  <label for="leverage" class="leverage-label">
    <span class="text-left"
      >{{ $t("Leverage") }}:
      <span class="text-danger font-bold"
        >x{{
          platform.futures.leverage_range === "fixed_leverage"
            ? platform.futures.fixed_leverage_amount
            : maxLeverage
        }}</span
      ></span
    >
  </label>
  <div class="alert alert-secondary" style="margin-bottom: 0;">
    <div class="text-yellow-500 text-xs" style="margin: -4px;">
      {{ warningText }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      maxLeverage: [Number, String],
    },
    data() {
      return {
        platform: plat,
      };
    },
    computed: {
      warningText() {
        const leverage = parseFloat(
          this.platform.futures.leverage_range === "fixed_leverage"
            ? this.platform.futures.fixed_leverage_amount
            : this.maxLeverage
        );
        const liquidationPercentage = (1 / leverage) * 100;

        return `Please be aware that trading with leverage involves risks. If the price climbs/drops by around ${liquidationPercentage.toFixed(
          2
        )}%, the estimated profit/loss will be 100%`;
      },
    },
  };
</script>
