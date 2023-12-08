<template>
  <div
    class="Trades border border-gray-100 bg-white shadow dark:border-gray-700 dark:bg-gray-900 relative"
  >
    <div class="w-full bg-gray-200 dark:bg-gray-800">
      <ul
        id="myTab"
        class="nf flex-cols -mb-px flex overflow-x-hidden text-center"
        role="tablist"
      >
        <li class="mr-2">
          <a
            id="marketTrades-tab"
            class="inline-block py-2 pl-3 pr-4 text-xs font-medium"
            :class="
              !isActive('marketTrades')
                ? 'cursor-pointer border-transparent bg-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                : 'border-gray-300 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300'
            "
            type="button"
            role="tab"
            aria-controls="marketTrades"
            aria-selected="false"
            @click.prevent="setActive('marketTrades')"
          >
            {{ $t("Market Trades") }}</a
          >
        </li>
      </ul>
    </div>
    <div id="tradesContent">
      <div
        v-if="state.activeItem === 'marketTrades'"
        id="marketTrades"
        class="px-3 pt-3"
      >
        <table>
          <thead>
            <th class="text-start" scope="col">
              {{ $t("Price") }}
            </th>
            <th class="text-end" scope="col">
              {{ $t("Amount") }}
            </th>
            <th class="text-end" style="padding-right: 5px;" scope="col">
              {{ $t("Time") }}
            </th>
          </thead>
          <tbody v-if="state.trades.length > 0">
            <tr v-for="(item, i) in state.trades" :key="i" class="tdd">
              <td class="price" :style="'color:' + item.color">
                {{ item.price }}
              </td>
              <td class="amount text-dark text-end">
                {{ item.amount }}
              </td>
              <td class="time text-dark text-end">
                {{ item.time }}
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="3" class="text-center">
                {{ $t("No trades yet") }}.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <LoadingCircles :loading="state.isLoading" />
  </div>
</template>

<script>
  import { onMounted, computed, reactive } from "vue";
  import { useMarketStore } from "@/store/market";
  import { useRoute } from "vue-router";
  import LoadingCircles from "@/partials/svg/LoadingCircles.vue";

  export default {
    setup() {
      const marketStore = useMarketStore();
      const route = useRoute();
      const state = reactive({
        data_symbol: null,
        trades: [],
        sideLength: 11,
        refreshRate: 500,
        activeItem: "marketTrades",
        isLoading: true,
      });

      const currency = route.params.symbol;
      const pair = route.params.currency;
      const provider = window.provider;

      const activeItem = computed(() => state.activeItem);
      function isActive(menuItem) {
        return activeItem.value === menuItem;
      }
      function setActive(menuItem) {
        activeItem.value = menuItem;
      }

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
      const updateTrades = (tradeData) => {
        const color =
          tradeData[0].side === "sell" ? "rgb(246,70,93)" : "rgb(14,203,129)";
        const newTrade = {
          price: priceFormatter(tradeData[0].price, PrecisionPrice.value),
          amount: priceFormatter(tradeData[0].amount, PrecisionAmount.value),
          time: formatTime(tradeData[0].datetime),
          color,
        };
        state.trades.unshift(newTrade);
        if (state.trades.length === state.sideLength) {
          state.trades.pop();
        }
      };
      const loopTrades = async () => {
        if (!marketStore.exchange) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        while (window.location.href.indexOf(`${currency}/${pair}`) > -1) {
          try {
            const data = await marketStore.exchange.watchTrades(
              `${currency}/${pair}`
            );
            state.isLoading = false;
            updateTrades(data);
          } catch (e) {
            break;
          }
        }
      };
      const formatTime = (time) => {
        return time.split("T")[1].split(".")[0];
      };
      onMounted(() => {
        loopTrades();
      });
      return {
        marketStore,
        state,
        activeItem,
        priceFormatter,
        updateTrades,
        formatTime,
        isActive,
        setActive,
      };
    },
    components: { LoadingCircles },
  };
</script>
