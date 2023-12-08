<template>
  <div
    class="Orderbook border border-gray-100 bg-white shadow dark:border-gray-700 dark:bg-gray-900 relative"
  >
    <ul class="flex p-1 xs:hidden md:flex" role="tablist">
      <li class="p-1">
        <button
          :class="{
            'text-gray-200 dark:text-gray-600':
              state.showMoreAsks ||
              state.showMoreBids ||
              (state.showMoreAsks && state.showMoreBids),
          }"
          @click.prevent="
            (state.showMoreAsks = false),
              (state.showMoreBids = false),
              (state.limit.asks = 12),
              (state.limit.bids = 12)
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            class="css-3kwgah"
            style="
              margin: 0px;
              min-width: 0px;
              font-size: 24px;
              width: 1em;
              height: 1em;
            "
          >
            <path d="M4 4h7v7H4V4z" fill="#F6465D"></path>
            <path d="M4 13h7v7H4v-7z" fill="#0ECB81"></path>
            <path
              d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </li>
      <li class="p-1">
        <button
          :class="{
            'text-gray-200 dark:text-gray-600':
              !state.showMoreBids || state.showMoreAsks,
          }"
          @click.prevent="
            (state.showMoreAsks = false),
              (state.showMoreBids = true),
              (state.limit.asks = 0),
              (state.limit.bids = 20)
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            class="css-3kwgah"
            style="
              margin: 0px;
              min-width: 0px;
              font-size: 24px;
              width: 1em;
              height: 1em;
            "
          >
            <path d="M4 4h7v16H4V4z" fill="#0ECB81"></path>
            <path
              d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </li>
      <li class="p-1">
        <button
          :class="{
            'text-gray-200 dark:text-gray-600':
              state.showMoreBids || !state.showMoreAsks,
          }"
          @click.prevent="
            (state.showMoreAsks = true),
              (state.showMoreBids = false),
              (state.limit.asks = 20),
              (state.limit.bids = 0)
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            class="css-3kwgah"
            style="
              margin: 0px;
              min-width: 0px;
              font-size: 24px;
              width: 1em;
              height: 1em;
            "
          >
            <path d="M4 4h7v16H4V4z" fill="#F6465D"></path>
            <path
              d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </li>
    </ul>
    <div :key="state.limit.asks" class="OrderbookGrid">
      <div v-if="state.limit.asks != 0" class="Asks">
        <table style="overflow-x: hidden;">
          <thead class="">
            <th class="text-start" style="padding-left: 5px;" scope="col">
              {{ $t("Price") }}
            </th>
            <th class="text-center if-sm" scope="col">{{ $t("Amount") }}</th>
            <th class="text-end" style="padding-right: 5px;" scope="col">
              {{ $t("Total") }}
            </th>
          </thead>
          <tbody>
            <ListItem
              :key="state.showMoreBids"
              :data="formattedAsks"
              type="ask"
              :show-less="state.showMoreBids"
              :limit="state.limit.asks"
            />
          </tbody>
        </table>
      </div>
      <div class="LastPrice xs:hidden md:block">
        <div class="p-3">
          <span class="">{{ $t("Last Price") }}: </span
          ><span :class="state.best_ask">{{ marketStore.bestAsk ?? "" }}</span>
          <i class="bi" :class="state.best_ask_icon"></i>
        </div>
      </div>

      <div v-if="state.limit.bids != 0" class="Bids">
        <table style="overflow-x: hidden;">
          <thead v-if="state.limit.asks == 0" class="">
            <th class="pl-2 text-start" scope="col">{{ $t("Price") }}</th>
            <th class="text-center if-sm" scope="col">{{ $t("Amount") }}</th>
            <th class="text-end" scope="col">{{ $t("Total") }}</th>
          </thead>
          <thead v-if="state.limit.asks != 0" class="xs:flex md:hidden">
            <th class="pl-2 text-start" scope="col">{{ $t("Price") }}</th>
            <th class="text-center if-sm" scope="col">{{ $t("Amount") }}</th>
            <th class="text-end" scope="col">{{ $t("Total") }}</th>
          </thead>
          <tbody>
            <ListItem
              :key="state.showMoreAsks"
              :data="formattedBids"
              type="bid"
              :show-less="state.showMoreAsks"
              :limit="state.limit.bids"
            />
          </tbody>
        </table>
      </div>
    </div>
    <loading-circles :loading="state.isLoading" />
  </div>
</template>

<script>
  import { reactive, computed, onMounted, watch } from "vue";
  import ListItem from "./orderbook/ListItem.vue";
  import { useMarketStore } from "@/store/market";
  import { useRoute } from "vue-router";
  import LoadingCircles from "@/partials/svg/LoadingCircles.vue";

  export default {
    components: { ListItem, LoadingCircles },
    setup() {
      const marketStore = useMarketStore();
      const route = useRoute();

      const state = reactive({
        limit: {
          asks: 12,
          bids: 12,
        },
        showMoreAsks: false,
        showMoreBids: false,
        sideLength: 20,
        refreshRate: 500,
        best_ask: "",
        best_ask_icon: "",
        lastUpdated: "",
        activeItem: "pills-graph",
        data: {},
        asks: Array.from({ length: 20 }, () => [0, 0, 0, 0]),
        bids: Array.from({ length: 20 }, () => [0, 0, 0, 0]),
        isLoading: true,
        bestAsker: 0,
      });

      const currency = route.params.symbol;
      const pair = route.params.currency;
      const provider = window.provider;
      const type = route.meta.type === "futures" ? "future" : "market";

      const PrecisionAmount = computed(() => {
        if (!marketStore[type]) {
          return 6;
        }

        return countDecimals(marketStore[type].precision.amount || 0.000001);
      });

      const PrecisionPrice = computed(() => {
        if (!marketStore[type]) {
          return 6;
        }

        return countDecimals(marketStore[type].precision.price || 0.000001);
      });

      function countDecimals(num) {
        if (Math.floor(num) === num) return 0;
        const str = num.toString();
        const scientificNotationMatch = /^(\d+\.?\d*|\.\d+)e([\+\-]\d+)$/.exec(
          str
        );
        if (scientificNotationMatch) {
          const decimalStr = scientificNotationMatch[1].split(".")[1] || "";
          const decimalCount =
            decimalStr.length + parseInt(scientificNotationMatch[2]);
          return Math.min(decimalCount, 8);
        } else {
          const decimalStr = str.split(".")[1] || "";
          return Math.min(decimalStr.length, 8);
        }
      }

      function priceFormatter(p, decimalPlaces = 8, d = ",") {
        if (p == null || isNaN(p)) {
          return 0;
        }
        if (decimalPlaces < 0 || decimalPlaces > 100) {
          decimalPlaces = 8;
        }
        p = parseFloat(p).toFixed(decimalPlaces);
        let [integerPart, decimalPart] = p.toString().split(".");
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, d);
        p = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
        return p;
      }

      const sortwidth = {
        sort(e) {
          return e.sort((a, b) => a[1] - b[1]);
        },
        median(e) {
          const t = Math.floor((e.length / 3) * 2);
          return e[t][1] < 1 ? 1 : e[t][1];
        },
        medianUnit(e, t, n) {
          const r = [...e, ...t];
          const o = this.median(this.sort(r));
          return o / n;
        },
        width(e, t) {
          if (t === 0) {
            return 1;
          }
          const n = Math.round(Number(e) / t);
          return n <= 0 ? 1 : Math.min(160, n);
        },
      };

      function init(e, t) {
        const o = sortwidth.medianUnit(e, t, 48);
        e.forEach((el) => {
          el.push({ width: sortwidth.width(el[1], o) * 2.5 });
        });
        t.forEach((el) => {
          el.push({ width: sortwidth.width(el[1], o) * 2.5 });
        });
      }

      function updateBarWidths() {
        const asksAndBids = [...state.asks, ...state.bids];
        const o = sortwidth.medianUnit(state.asks, state.bids, 48);

        asksAndBids.forEach((el) => {
          el[2].width = sortwidth.width(el[1], o) * 2.5;
        });
      }

      const computBarWidth = {
        width: 250,
        sortwidth,
        init,
      };

      watch(
        () => state.asks,
        () => {
          updateBarWidths();
        },
        { deep: true }
      );

      watch(
        () => state.bids,
        () => {
          updateBarWidths();
        },
        { deep: true }
      );

      const formattedAsks = computed(() => {
        const asks = state.showMoreAsks
          ? state.asks
          : state.asks.slice(0, state.limit.asks);
        const reversedAsks = asks.slice().reverse();

        return reversedAsks.map(([price, volume, { width }]) => [
          priceFormatter(price, PrecisionPrice.value),
          priceFormatter(volume, PrecisionAmount.value),
          priceFormatter(price * volume, PrecisionPrice.value),
          width,
        ]);
      });

      const formattedBids = computed(() =>
        state.bids.map(([price, volume, { width }]) => [
          priceFormatter(price, PrecisionPrice.value),
          priceFormatter(volume, PrecisionAmount.value),
          priceFormatter(price * volume, PrecisionPrice.value),
          width,
        ])
      );

      async function updateOrderbook(data) {
        const now = Date.now();
        const isBitgetProvider = provider === "bitget";
        const asks = isBitgetProvider
          ? data.asks.slice(0, state.sideLength)
          : data.asks;
        const bids = isBitgetProvider
          ? data.bids.slice(0, state.sideLength)
          : data.bids;

        computBarWidth.init(bids, asks);

        // Sort asks and bids in ascending order by price
        asks.sort((a, b) => a[0] - b[0]);
        bids.sort((a, b) => a[0] - b[0]);

        const isBetter = asks[0][0] > state.bestAsker;
        state.best_ask = isBetter ? "text-success" : "text-danger";
        state.best_ask_icon = isBetter
          ? "bi-arrow-up text-success"
          : "bi-arrow-down text-danger";
        state.bestAsker = asks[0][0];

        state.lastUpdated = now;

        state.asks.splice(0, state.sideLength, ...asks);
        state.bids.splice(0, state.sideLength, ...bids);

        marketStore.bestAsk = asks[0][0];
        marketStore.bestBid = bids[bids.length - 1][0];

        if (now - state.lastUpdated <= state.refreshRate) {
          await new Promise((resolve) => requestAnimationFrame(resolve));
          await new Promise((resolve) =>
            setTimeout(resolve, state.refreshRate / 2)
          );
        }
      }

      async function loopOrderbook() {
        if (!marketStore.exchange) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        while (window.location.href.indexOf(`${currency}/${pair}`) > -1) {
          try {
            const data = await marketStore.exchange.watchOrderBook(
              `${currency}/${pair}`,
              state.sideLength
            );
            state.isLoading = false;
            await updateOrderbook(data);
          } catch (e) {
            break;
          }
        }
      }

      onMounted(() => {
        loopOrderbook();
      });

      return {
        marketStore,
        state,
        formattedAsks,
        formattedBids,
        priceFormatter,
        updateOrderbook,
        loopOrderbook,
      };
    },
  };
</script>
