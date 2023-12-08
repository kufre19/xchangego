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
        type="binary"
        :subtype="type"
      />
      <Trades
        :key="$route.params.symbol + $route.params.currency + 'trades'"
        style="overflow-y: auto; overflow-x: hidden;"
      />
      <div
        id="creatable"
        class="Chart border border-gray-100 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
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
        :limit="limit"
        :user="userStore.user"
        :gnl="gnl"
        :type="type"
        @update="fetchOrders()"
      />
    </div>
    <div
      class="border border-gray-100 bg-white shadow dark:border-gray-700 dark:bg-gray-900"
      style="margin: 0 -20px;"
    >
      <div class="h-full w-full bg-gray-200 dark:bg-gray-800">
        <ul
          class="nf flex-cols -mb-px flex overflow-x-hidden text-center"
          role="tablist"
        >
          <li>
            <a
              id="open-orders-tab"
              class="inline-block py-2 pl-3 pr-4 text-xs font-medium"
              :class="
                !isActive('open-orders')
                  ? 'cursor-pointer border-transparent bg-gray-200 hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                  : 'border-gray-300 bg-white text-gray-600 dark:bg-gray-900 dark:text-gray-300'
              "
              type="button"
              role="tab"
              aria-controls="open-orders"
              aria-selected="false"
              @click.prevent="setActive('open-orders')"
            >
              {{ $t("Open Orders") }}</a
            >
          </li>
          <li>
            <a
              id="closed-orders-tab"
              class="inline-block py-2 pl-3 pr-4 text-xs font-medium"
              :class="
                !isActive('closed-orders')
                  ? 'cursor-pointer border-transparent bg-gray-200 hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                  : 'border-gray-300 bg-white text-gray-600 dark:bg-gray-900 dark:text-gray-300'
              "
              type="button"
              role="tab"
              aria-controls="closed-orders"
              aria-selected="false"
              @click.prevent="setActive('closed-orders')"
            >
              {{ $t("Order History") }}</a
            >
          </li>
        </ul>
      </div>
      <div id="ordersContent">
        <div
          id="open-orders"
          class="px-3 pt-3"
          :class="isActive('open-orders') ? '' : 'hidden'"
          role="tabpanel"
        >
          <div class="flex">
            <div id="charta" class="w-full"></div>
          </div>
        </div>
        <div
          id="closed-orders"
          class="pt-3"
          :class="isActive('closed-orders') ? '' : 'hidden'"
          role="tabpanel"
        >
          <div class="mb-4 flex items-center justify-between px-3 text-right">
            <div class="font-medium text-start">
              {{ $t("Binary Contracts") }}
            </div>
            <div class="flex items-center justify-end space-x-2 w-48">
              <Filter>
                <input
                  v-model="filters.symbol.value"
                  type="text"
                  class="filter-input"
                  placeholder="Transaction ID"
              /></Filter>
            </div>
          </div>
          <div class="overflow-x-auto">
            <VTable
              v-model:current-page="currentPage"
              class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
              :data="orders"
              :filters="filters"
              :page-size="10"
              :hide-sort-icons="true"
              @totalPagesChanged="totalPages = $event"
            >
              <template #head>
                <tr
                  class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                >
                  <VTh sort-key="created_at" class="pl-2" scope="col">
                    <Col text="Date" />
                  </VTh>
                  <VTh sort-key="symbol" scope="col">
                    <Col text="Symbol" />
                  </VTh>
                  <VTh sort-key="hilow" scope="col">
                    <Col text="Rise/Fall" />
                  </VTh>
                  <VTh sort-key="amount" scope="col">
                    <Col text="Amount" />
                  </VTh>
                  <VTh sort-key="margin" scope="col">
                    <Col text="Profit" />
                  </VTh>
                  <VTh sort-key="result" scope="col">
                    <Col text="Result" />
                  </VTh>
                  <VTh sort-key="status" scope="col">
                    <Col text="Status" />
                  </VTh>
                </tr>
              </template>
              <template #body="{ rows }">
                <template v-if="orders.length > 0">
                  <tr
                    v-for="row in rows"
                    :key="row.id"
                    class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <td data-label="Date" class="pl-2">
                      <toDate :time="row.created_at" />
                    </td>
                    <td data-label="Symbol">{{ row.symbol }}/{{ row.pair }}</td>
                    <td data-label="Amount">
                      <toMoney :num="row.amount" decimals="2" />
                      {{ row.pair }}
                    </td>
                    <td data-label="Profit">
                      <span v-if="row.result == 1" class="badge bg-success">
                        <toMoney :num="row.margin" decimals="2" />
                        {{ row.pair }}</span
                      >
                      <span v-else-if="row.result == 2" class="badge bg-danger"
                        >-
                        <toMoney :num="row.amount" decimals="2" />
                        {{ row.pair }}</span
                      >
                      <span v-else-if="row.result == 3" class="badge bg-warning"
                        >0</span
                      >
                      <span v-else class="badge bg-warning">{{
                        $t("Pending")
                      }}</span>
                    </td>
                    <td data-label="High/Low">
                      <span v-if="row.hilow == 1" class="badge bg-success">{{
                        $t("Rise")
                      }}</span>
                      <span
                        v-else-if="row.hilow == 2"
                        class="badge bg-danger"
                        >{{ $t("Fall") }}</span
                      >
                    </td>
                    <td data-label="Result">
                      <span v-if="row.result == 1" class="badge bg-success">{{
                        $t("Win")
                      }}</span>
                      <span
                        v-else-if="row.result == 2"
                        class="badge bg-danger"
                        >{{ $t("Lose") }}</span
                      >
                      <span
                        v-else-if="row.result == 3"
                        class="badge bg-warning"
                        >{{ $t("Draw") }}</span
                      >
                      <span v-else class="badge bg-warning">{{
                        $t("Pending")
                      }}</span>
                    </td>
                    <td data-label="Status">
                      <span v-if="row.status == 0" class="badge bg-primary">{{
                        $t("Running")
                      }}</span>
                      <span
                        v-else-if="row.status == 1"
                        class="badge bg-success"
                        >{{ $t("Complete") }}</span
                      >
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr
                    class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <td colspan="100%" class="py-4 px-6">
                      {{ $t("No results found!") }}
                    </td>
                  </tr>
                </template>
              </template>
            </VTable>
          </div>

          <VTPagination
            v-model:currentPage="currentPage"
            class="flex items-center justify-between p-3"
            aria-label="Table navigation"
            :total-pages="totalPages"
            :max-page-links="3"
            :boundary-links="true"
          >
            <template #firstPage> {{ $t("First") }} </template>

            <template #lastPage> {{ $t("Last") }} </template>

            <template #next
              ><span class="sr-only">{{ $t("Next") }}</span>
              <svg
                class="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </template>

            <template #previous>
              <span class="sr-only">{{ $t("Previous") }}</span>
              <svg
                class="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </template>
          </VTPagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineAsyncComponent, ref, watch, onMounted } from "vue";
  import { useUserStore } from "@/store/user";
  import { useMarketStore } from "@/store/market";
  import toMoney from "@/partials/toMoney.vue";
  import toDate from "@/partials/toDate.vue";
  import Filter from "@/partials/table/Filter.vue";
  import Col from "@/partials/table/Col.vue";
  import Marketinfo from "@/main/trading/Marketinfo.vue";
  import Orderbook from "@/main/trading/Orderbook.vue";
  import Markets from "@/main/trading/Markets.vue";
  import Order from "./components/trading/Order.vue";
  import Trades from "@/main/trading/Trades.vue";
  import { useRoute, useRouter } from "vue-router";

  export default {
    components: {
      Marketinfo,
      Tradingview: defineAsyncComponent(() =>
        import("@/main/trading/Tradingview.vue")
      ),
      EcoTradingview: defineAsyncComponent(() =>
        import("@/extensions/eco/components/Tradingview.vue")
      ),
      Order,
      Orderbook,
      Markets,
      Trades,
      toDate,
      toMoney,
      Filter,
      Col,
    },

    setup() {
      const userStore = useUserStore();
      const marketStore = useMarketStore();
      const route = useRoute();

      const provide = ref(null);
      const limit = ref([]);
      const orders = ref([]);
      const gnl = window.gnl;
      const ext = window.ext;
      const provider = window.provider;
      const type = route.params.type;
      const activeItem = ref("open-orders");
      const currentPage = ref(1);
      const totalPages = ref(1);

      const config = {
        //enableRateLimit: true,
        // verbose: true,
        proxy: gnl.cors,
        options: {
          tradesLimit: 10,
        },
        newUpdates: true,
        timeout: 20000,
      };
      marketStore.exchange = new ccxt.pro[provider](config);

      const currency = route.params.symbol;
      const pair = route.params.currency;

      const initializeMarket = async () => {
        if (marketStore.markets.length === 0) {
          await marketStore.fetch_markets();
        }
        marketStore.market = marketStore.markets[pair][currency + "/" + pair];
      };

      if (!marketStore.market) {
        initializeMarket();
      }

      watch(
        () => {
          return {
            type: type,
            symbol: currency,
            currency: pair,
          };
        },
        async (newValue, oldValue) => {
          await marketStore.exchange.close();
          document.getElementById("favicon").href =
            "/assets/images/logoIcon/favicon.png";
          const asks = document.getElementById("asks");
          const bids = document.getElementById("bids");
          const tradeTable = document.getElementById("tradeTable");

          if (asks !== null) {
            asks.innerHTML = "";
          }

          if (bids !== null) {
            bids.innerHTML = "";
          }

          if (tradeTable !== null) {
            tradeTable.innerHTML = "";
          }
        },
        { deep: true }
      );

      const fetchData = () => {
        axios
          .post("/user/fetch/binary/" + type + "/" + currency + "/" + pair)
          .then((response) => {
            provide.value = response.provide;
            limit.value = response.limit;
          });
      };

      const fetchOrders = () => {
        axios
          .post("/user/fetch/binary/" + type + "/orders")
          .then((response) => {
            orders.value = response.orders;
          });
      };

      const isActive = (menuItem) => {
        return activeItem.value === menuItem;
      };

      const setActive = (menuItem) => {
        activeItem.value = menuItem;
      };

      const router = useRouter();
      async function checkKyc() {
        if (
          plat.kyc.kyc_status == 1 && Number(plat.kyc.binary_trading_restriction) === 1 &&
          route.params.type !== "practice"
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
        type,
        currency,
        pair,
        activeItem: "open-orders",
        orders,
        provide,
        limit,
        currentPage,
        totalPages,
        filters: {
          symbol: { value: "", keys: ["symbol"] },
        },
        fetchOrders,
        isActive,
        setActive,
        fetchData,
        gnl,
        ext,
        provider,
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
