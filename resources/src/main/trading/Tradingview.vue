<template>
  <div id="tradingview" style="min-height: 340px;"></div>
</template>

<script>
  import "./tv";

  export default {
    name: "TradingView",
    props: ["provide"],

    data() {
      return {
        symbol: this.$route.params.symbol,
        currency: this.$route.params.currency,
      };
    },

    mounted() {
      this.initTradingView();
    },

    methods: {
      initTradingView() {
        const container = document.getElementById("tradingview");
        if (!container) {
          console.error("Unable to find TradingView container element.");
          return;
        }

        new TradingView.widget({
          width: "100%",
          height: "100%",
          symbol: `${this.provide}:${this.symbol}${this.currency}`,
          interval: "H",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_legend: true,
          save_image: false,
          container_id: "tradingview",
        });
      },
    },
  };
</script>
