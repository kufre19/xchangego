<template>
  <div
    class="Trades border border-gray-100 bg-white shadow dark:border-gray-700 dark:bg-gray-900"
  >
    <div class="w-full bg-gray-200 dark:bg-gray-800">
      <ul
        id="myTab"
        class="nf flex-cols -mb-px flex overflow-x-hidden text-center"
        role="tablist"
      >
        <li>
          <a
            id="marketTrades-tab"
            class="inline-block py-2 pl-3 pr-4 text-xs font-medium"
            :class="tabClass('marketTrades')"
            type="button"
            role="tab"
            aria-controls="marketTrades"
            aria-selected="false"
            @click.prevent="setActive('marketTrades')"
          >
            {{ $t("Market Trades") }}
          </a>
        </li>
      </ul>
    </div>
    <div id="tradesContent">
      <div
        id="marketTrades"
        class="px-3 pt-3"
        :class="{ hidden: !isActive('marketTrades') }"
      >
        <div class="table-responsive">
          <table class="text-dark table-sm table">
            <thead class="text-muted">
              <tr>
                <th class="text-start" scope="col">
                  {{ $t("Price") }}
                </th>
                <th class="text-end" scope="col">
                  {{ $t("Amount") }}
                </th>
                <th class="text-end" scope="col">
                  {{ $t("Time") }}
                </th>
              </tr>
            </thead>
            <tbody id="tradeTable" class="trade">
              <tr v-for="(trade, index) in visibleTrades" :key="index">
                <td
                  class="text-start"
                  :style="{ color: tradeColor(trade.type) }"
                >
                  {{ priceFormatter(trade.price, precisionPrice) }}
                </td>
                <td class="text-end">
                  {{ priceFormatter(trade.amount, precisionAmount) }}
                </td>
                <td class="text-end">
                  {{ formatTime(trade.created) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      market: {
        type: Object,
        required: true,
      },
      precisionAmount: {
        type: [Number, String],
        required: true,
        default: 6,
      },
      precisionPrice: {
        type: [Number, String],
        required: true,
        default: 6,
      },
    },
    data() {
      return {
        sideLength: 12,
        activeItem: "marketTrades",
        trades: [],
        subscriptionOrderBook: null,
      };
    },
    computed: {
      visibleTrades() {
        return this.trades.slice(0, this.sideLength);
      },
      currency() {
        return this.market.currency;
      },
      pair() {
        return this.market.pair;
      },
    },
    watch: {
      currency: {
        handler() {
          this.updateWebSocketSubscription();
        },
      },
      pair: {
        handler() {
          this.updateWebSocketSubscription();
        },
      },
      $route(to, from) {
        this.updateWebSocketSubscription();
      },
    },
    beforeUnmount() {
      this.disconnectWebSocket();
    },
    mounted() {
      this.updateWebSocketSubscription();
    },
    methods: {
      isActive(menuItem) {
        return this.activeItem === menuItem;
      },
      setActive(menuItem) {
        this.activeItem = menuItem;
      },
      tabClass(menuItem) {
        return this.isActive(menuItem)
          ? "border-gray-300 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300"
          : "cursor-pointer border-transparent bg-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300";
      },
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
      tradeColor(type) {
        return type === "SELL" ? "rgb(246,70,93)" : "rgb(14,203,129)";
      },
      updateWebSocketSubscription() {
        if (this.subscriptionOrderBook) {
          this.subscriptionOrderBook.stopListening(".orderbook");
          window.Echo.leave(this.subscriptionOrderBook.name);
          this.subscriptionOrderBook = null;
        }

        const newChannelOrderBook = `orderbook-data.${this.currency}.${this.pair}`;

        this.subscriptionOrderBook = window.Echo.private(newChannelOrderBook);
        this.subscriptionOrderBook.listen(".orderbook", async (e) => {
          this.trades.unshift(e.orderbook);
          this.trades = this.trades.slice(0, this.sideLength);
        });
      },
      disconnectWebSocket() {
        if (this.subscriptionOrderBook) {
          this.subscriptionOrderBook.stopListening(".orderbook");
          window.Echo.leave(this.subscriptionOrderBook.name);
          this.subscriptionOrderBook = null;
        }
      },
      formatTime(time) {
        return new Date(time).toLocaleTimeString("en-US");
      },
    },
  };
</script>
