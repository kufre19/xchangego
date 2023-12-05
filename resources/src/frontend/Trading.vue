<template>
  <div style="font-family: BinancePlex, Arial, sans-serif !important;">
    <div class="containered" style="margin-top: 2px;">
      <Marketinfo
        :key="$route.params.symbol + $route.params.currency + 'marketinfo'"
      />
      <Orderbook
        :key="$route.params.symbol + $route.params.currency + 'orderbook'"
      />
      <Markets
        style="overflow-y: auto; overflow-x: hidden;"
        type="trade"
        subtype="non"
        :favs="false"
        :auth="false"
      />
      <Trades
        :key="$route.params.symbol + $route.params.currency + 'trades'"
        style="overflow-y: auto; overflow-x: hidden;"
      />
      <div
        id="creatable"
        class="Chart border border-gray-100 bg-white shadow dark:border-gray-700 dark:bg-gray-900"
      >
        <template v-if="ext.eco == 1 && provider != 'coinbasepro'">
          <EcoTradingview
            :key="$route.params.symbol + $route.params.currency + 'eco'"
          />
        </template>
        <template v-else>
          <Tradingview
            v-if="provide != null"
            :key="$route.params.symbol + $route.params.currency + 'tradingview'"
            :provide="provide"
          />
        </template>
      </div>
      <Order
        :key="$route.params.symbol + $route.params.currency + 'order'"
        :fee="fee"
        :pfee="pfee"
        @OrderPlaced="fetchOrders()"
        :auth="false"
      />
    </div>
    <Orders
      :key="$route.params.symbol + $route.params.currency"
      :orders="orders"
      :fetch-order="fetchOrder"
      :cancel-order="cancelOrder"
      :loading="loading"
      :refreshing="refreshing"
      :auth="false"
    />
  </div>
</template>

<script>
  import { defineAsyncComponent, ref, onMounted } from "vue";
  import { useMarketStore } from "@/store/market";

  export default {
    components: {
      Markets: defineAsyncComponent(() => import("@/main/trading/Markets.vue")),
      Trades: defineAsyncComponent(() => import("@/main/trading/Trades.vue")),
      Marketinfo: defineAsyncComponent(() =>
        import("@/main/trading/Marketinfo.vue")
      ),
      Tradingview: defineAsyncComponent(() =>
        import("@/main/trading/Tradingview.vue")
      ),
      EcoTradingview: defineAsyncComponent(() =>
        import("@/extensions/eco/components/Tradingview.vue")
      ),
      Order: defineAsyncComponent(() => import("@/main/trading/Order.vue")),
      Orders: defineAsyncComponent(() => import("@/main/trading/Orders.vue")),
      Orderbook: defineAsyncComponent(() =>
        import("@/main/trading/Orderbook.vue")
      ),
    },
    setup() {
      const marketStore = useMarketStore();

      const provider = window.provider;
      const path = window.location.pathname;
      const pathSegments = path.split("/");
      const currency = pathSegments[2];
      const pair = pathSegments[3];

      const initializeMarket = async () => {
        if (marketStore.markets.length === 0) {
          await marketStore.fetch_markets();
        }
        const marketKey = currency + "/" + pair;
        marketStore.market = marketStore.markets[pair][marketKey];
      };

      if (!marketStore.market) {
        initializeMarket();
      }

      const provide = ref(null);
      const fee = ref(null);
      const pfee = ref(null);

      const config = {
        proxy: gnl.cors,
        options: {
          tradesLimit: 10,
        },
        newUpdates: true,
        timeout: 20000,
      };

      if (marketStore.exchange === null) {
        marketStore.exchange = new ccxt.pro[provider](config);
      }

      const activeItem =
        plat.mobile.charting == 1 ? "pills-chart" : "pills-orderbook";
      let ordersRender = 0;

      const isActive = (menuItem) => {
        return activeItem === menuItem;
      };

      const setActive = (menuItem) => {
        activeItem = menuItem;
      };

      const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      };

      const setBestAsk = (value) => {
        ask = value;
      };

      const setBestBid = (value) => {
        bid = value;
      };

      const fetchData = () => {
        axios.post("/trade/" + currency + "/" + pair).then((response) => {
          provide.value = response.provide;
          fee.value = response.fee;
          pfee.value = response.pfee;
        });
      };

      const orders = ref({ open: [], closed: [] });
      const loading = ref(false);
      const refreshing = ref(false);

      async function fetchOrders() {}
      async function fetchOrder(id) {}
      async function cancelOrder(id) {}

      onMounted(() => {
        fetchData();
        fetchOrders();
      });

      return {
        marketStore,
        currency,
        pair,
        config,
        activeItem,
        ordersRender,
        isActive,
        setActive,
        getRandomInt,
        setBestAsk,
        setBestBid,
        provide,
        fee,
        pfee,
        provider,
        orders,
        fetchOrders,
        fetchOrder,
        cancelOrder,
        loading,
        refreshing,
      };
    },
  };
</script>

<style lang="scss" scope>
  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 12px;
    overflow: hidden;
  }
  @media only screen and (min-width: 1200px) {
    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 12px;
      overflow: hidden;
    }
  }
  .tdd {
    position: relative;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
  }
  td {
    .percent_ask {
      position: absolute;
      top: 0;
      height: 100%;
      bottom: 0;
      right: 0;
      background-color: rgba(246, 70, 94, 0.2);
    }
    .percent_bid {
      position: absolute;
      top: 0;
      bottom: 0;
      height: 100%;
      right: 0;
      background-color: rgba(14, 203, 129, 0.2);
    }
    span {
      font-size: 12px;
      margin-left: 0px;
      flex: 1 1 0%;
      text-align: right;
      cursor: pointer;
    }
  }
  td.price {
    width: 30%;
    span {
      padding-left: 5px;
    }
  }
  td.quantity {
    width: 30%;
    text-align: right;
  }
  td.time {
    width: 40%;
    text-align: right;
    padding-right: 5px;
  }
  td.btc {
    width: 40%;
    text-align: right;
    padding-right: 5px;
  }
</style>
