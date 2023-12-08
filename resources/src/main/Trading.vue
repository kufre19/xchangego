<template>
  <div style="font-family: BinancePlex, Arial, sans-serif !important;">
    <div class="containered" style="margin: -18px -20px 3px -20px;">
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
      />
    </div>
    <Orders
      :key="$route.params.symbol + $route.params.currency"
      :orders="orders"
      :fetch-order="fetchOrder"
      :cancel-order="cancelOrder"
      :loading="loading"
      :refreshing="refreshing"
    />
  </div>
</template>

<script>
  import { defineAsyncComponent, ref, onMounted } from "vue";
  import { useUserStore } from "@/store/user";
  import { useMarketStore } from "@/store/market";
  import { useRoute, useRouter } from "vue-router";

  export default {
    components: {
      Markets: defineAsyncComponent(() => import("./trading/Markets.vue")),
      Trades: defineAsyncComponent(() => import("./trading/Trades.vue")),
      Marketinfo: defineAsyncComponent(() =>
        import("./trading/Marketinfo.vue")
      ),
      Tradingview: defineAsyncComponent(() =>
        import("./trading/Tradingview.vue")
      ),
      EcoTradingview: defineAsyncComponent(() =>
        import("@/extensions/eco/components/Tradingview.vue")
      ),
      Order: defineAsyncComponent(() => import("./trading/Order.vue")),
      Orders: defineAsyncComponent(() => import("./trading/Orders.vue")),
      Orderbook: defineAsyncComponent(() => import("./trading/Orderbook.vue")),
    },
    setup() {
      const userStore = useUserStore();
      const marketStore = useMarketStore();
      const route = useRoute();

      const currency = route.params.symbol;
      const pair = route.params.currency;
      const provider = window.provider;

      const initializeMarket = async () => {
        if (marketStore.markets.length === 0) {
          try {
            await marketStore.fetch_markets();
          } catch (error) {
            console.log(error);
          }
        }
        if (marketStore.markets[pair]) {
          marketStore.market = marketStore.markets[pair][currency + "/" + pair];
        }
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
        axios.post("/user/trade/" + currency + "/" + pair).then((response) => {
          provide.value = response.provide;
          fee.value = response.fee;
          pfee.value = response.pfee;
        });
      };

      const orders = ref({ open: [], closed: [] });
      const loading = ref(false);
      const refreshing = ref(false);

      async function fetchOrders() {
        try {
          const response = await axios.post(
            `/user/fetch/trade/orders/${currency}/${pair}`
          );
          orders.value = response.orders;
        } catch (error) {
          $toast.error(error.response.data.message);
        }
      }
      async function fetchOrder(id) {
        refreshing.value = true;
        try {
          const response = await axios.post("/user/trade/fetch_order", {
            order_id: id,
            symbol: currency,
            currency: pair,
          });
          fetchOrders();
        } catch (error) {
          $toast.error(error.response.data.message);
        } finally {
          refreshing.value = false;
        }
      }

      async function cancelOrder(id) {
        loading.value = true;
        try {
          const response = await axios.post("/user/trade/cancel", {
            order_id: id,
            symbol: currency,
            currency: pair,
          });
          $toast[response.type](response.message);
          fetchOrders();
          marketStore.fetchWallet(currency, 1);
          marketStore.fetchWallet(pair, 2);
        } catch (error) {
          $toast.error(error.response.data.message);
        } finally {
          loading.value = false;
        }
      }

      const router = useRouter();
      async function checkKyc() {
        if (
          plat.kyc.kyc_status == 1 &&
          Number(plat.kyc.trading_restriction) === 1
        ) {
          if (!userStore.user) {
            await userStore.fetch();
          }
          if (!userStore.user.kyc_application) {
            router.push("/identity");
          }
          if (
            userStore.user.kyc_application &&
            userStore.user.kyc_application.level < 2 &&
            userStore.user.kyc_application.status !== "approved"
          ) {
            router.push("/identity");
          }
        }
      }

      onMounted(() => {
        checkKyc();
        fetchData();
        fetchOrders();
      });

      return {
        userStore,
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
