<template>
  <div
    class="Info border border-gray-100 bg-white shadow dark:border-gray-700 dark:bg-gray-900 relative"
  >
    <div
      class="flex overflow-x-scroll text-xs text-white items-center space-x-1 p-1"
    >
      <div class="image-container px-5 flex items-center relative">
        <img
          :key="$route.params.symbol"
          v-lazy="
            $route.params.symbol
              ? '/assets/images/cryptoCurrency/' +
                $route.params.symbol.toLowerCase() +
                '.png'
              : '/market/notification.png'
          "
          class="image-overlap w-9 h-9"
        />
        <img
          :key="$route.params.currency"
          v-lazy="
            $route.params.currency
              ? '/assets/images/cryptoCurrency/' +
                $route.params.currency.toLowerCase() +
                '.png'
              : '/market/notification.png'
          "
          class="image-overlap w-9 h-9 absolute top-50 left-1/2 -translate-x-1/3"
        />
      </div>
      <div class="flex-1 shadow p-2 bg-white dark:bg-gray-800 rounded">
        <div class="text-dark">{{ $t("Last Price") }}:</div>
        <div :class="last_price_class">
          {{ last_price }}
          <!-- <i class="bi" :class="last_price_icon"></i> -->
        </div>
      </div>
      <div class="flex-1 shadow p-2 bg-white dark:bg-gray-800 rounded">
        <div class="text-dark">{{ $t("24h Change") }}:</div>
        <div>
          <span :class="day_change_class">{{ day_change }} %</span
          ><i class="bi" :class="day_change_icon"></i>
        </div>
      </div>
      <div
        v-if="provider != 'coinbasepro'"
        class="text-dark flex-1 shadow p-2 bg-white dark:bg-gray-800 rounded xs:hidden sm:block"
      >
        <div>{{ $route.params.symbol }} {{ $t("Volume") }}:</div>
        <div>{{ day_volume_pair }}</div>
      </div>
      <div
        v-if="provider != 'coinbasepro'"
        class="text-dark flex-1 shadow p-2 bg-white dark:bg-gray-800 rounded xs:hidden sm:block"
      >
        <div>{{ $route.params.currency }} {{ $t("Volume") }}:</div>
        <div>{{ day_volume_currency }}</div>
      </div>
      <div
        v-if="provider != 'coinbasepro'"
        class="text-dark flex-1 shadow p-2 bg-white dark:bg-gray-800 rounded xs:hidden lg:block"
      >
        <div>{{ $t("24h High") }}:</div>
        <div>{{ day_high }}</div>
      </div>
      <div
        v-if="provider != 'coinbasepro'"
        class="text-dark flex-1 shadow p-2 bg-white dark:bg-gray-800 rounded xs:hidden lg:block"
      >
        <div>{{ $t("24h Low") }}:</div>
        <div>{{ day_low }}</div>
      </div>
    </div>
    <loading-circles :loading="isLoading" />
  </div>
</template>

<script>
  // component
  import { useMarketStore } from "@/store/market";
  import LoadingCircles from "@/partials/svg/LoadingCircles.vue";
  export default {
    // component list
    components: { LoadingCircles },
    props: ["provider"],
    setup() {
      const marketStore = useMarketStore();
      return { marketStore };
    },

    // component data
    data() {
      return {
        last_price: 0,
        last_price_class: "",
        last_price_icon: "",
        day_change: 0,
        day_change_class: "",
        day_change_icon: "",
        day_volume_currency: 0,
        day_high: 0,
        day_low: 0,
        day_volume_pair: 0,
        isLoading: true,
      };
    },
    mounted() {
      this.loopTicker();
    },
    methods: {
      priceFormatter(p, f1 = 8, f2 = 2, d = ",") {
        if (!p) {
          return 0;
        }
        p =
          parseInt(p) !== 0
            ? parseFloat(p).toFixed(f2)
            : parseFloat(p).toFixed(f1);
        p =
          parseInt(p) !== 0
            ? p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, d)
            : p;
        return p;
      },
      async updateTicker(tick) {
        if (!this.last_price || tick["last"] > this.last_price) {
          this.last_price_class = "text-success";
          // this.last_price_icon = "bi-arrow-up text-success";
        } else if (tick["last"] < this.last_price) {
          this.last_price_class = "text-danger";
          // this.last_price_icon = "bi-arrow-down text-danger";
        }
        this.last_price = this.priceFormatter(tick["last"]);

        if (this.provide != "coinbasepro") {
          if (!this.day_change || tick["percentage"] > this.day_change) {
            this.day_change_class = "text-success";
            this.day_changeday_change_icon = "bi-arrow-up text-success";
          } else if (tick["percentage"] < this.day_change) {
            this.day_change_class = "text-danger";
            this.day_changeday_change_icon = "bi-arrow-down text-danger";
          }
          this.day_change = Number(tick["percentage"]).toFixed(2);

          this.day_volume_currency = this.priceFormatter(
            tick["quoteVolume"],
            2
          );
        }

        this.day_high = this.priceFormatter(tick["high"]);
        this.day_low = this.priceFormatter(tick["low"]);
        this.day_volume_pair = this.priceFormatter(tick["baseVolume"], 2);
      },
      async loopTicker() {
        if (!this.marketStore.exchange) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        while (
          window.location.href.indexOf(
            this.$route.params.symbol + "/" + this.$route.params.currency
          ) > -1
        ) {
          try {
            const data = await this.marketStore.exchange.watchTicker(
              this.$route.params.symbol + "/" + this.$route.params.currency
            );
            this.isLoading = false;
            this.updateTicker(data);
          } catch (e) {
            break;
          }
        }
      },
    },
  };
</script>
<style scoped>
  .image-container {
    width: calc(2.5 * 36px);
    overflow: hidden;
  }

  .image-overlap {
    transition: transform 0.3s ease-in-out;
  }

  .image-container:hover .image-overlap:first-child {
    transform: translateX(-12%);
  }

  .image-container:hover .image-overlap:last-child {
    transform: translateX(12%);
  }
</style>
