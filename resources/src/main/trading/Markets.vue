<template>
  <div
    class="Markets border border-gray-100 bg-white shadow dark:border-gray-700 dark:bg-gray-900 relative"
  >
    <div class="mb-4 flex border-gray-200 dark:border-gray-800">
      <button
        class="-mb-px bg-gray-200 px-1 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
        @click.prevent="scrollLeft()"
      >
        <i class="bi bi-chevron-left text-warning"></i>
      </button>
      <ul
        id="myTab"
        class="nf flex-cols -mb-px flex overflow-x-hidden bg-gray-200 text-center text-sm font-medium dark:bg-gray-800 w-full"
        role="tablist"
      >
        <li v-if="status == 'open' && auth">
          <small
            ><a
              class="inline-block px-2 py-1 text-gray-600 dark:text-gray-300"
              :class="
                !isActive('fav')
                  ? 'cursor-pointer border-transparent bg-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                  : 'border-gray-300 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300'
              "
              @click="setActive('fav')"
              ><i class="bi bi-star bi-icon"></i></a
          ></small>
        </li>
        <li
          v-if="
            ext.eco == 1 &&
            marketStore.ecos != '' &&
            status == 'open' &&
            type !== 'binary'
          "
        >
          <small
            ><a
              class="inline-block px-2 py-1 text-gray-600 dark:text-gray-300"
              :class="
                !isActive('eco')
                  ? 'cursor-pointer border-transparent bg-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                  : 'border-gray-300 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300'
              "
              @click="setActive('eco')"
              ><i class="bi bi-award bi-icon"></i></a
          ></small>
        </li>
        <li v-for="(mark, key, index) in filteredTabs" :key="index">
          <small>
            <a
              class="inline-block px-2 py-1 text-gray-600 dark:text-gray-300"
              :class="
                !isActive(key)
                  ? 'cursor-pointer border-transparent bg-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                  : 'border-gray-300 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300'
              "
              @click="setActive(key)"
              >{{ key }}</a
            ></small
          >
        </li>
      </ul>
      <button
        class="-mb-px bg-gray-200 px-1 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
        @click.prevent="scrollRight()"
      >
        <i class="bi bi-chevron-right text-warning fs-6"></i>
      </button>
    </div>
    <div id="myTabContent" class="px-3">
      <MarketList
        v-if="activeItem === 'fav' && status == 'open' && auth"
        :key="marketStore.favs.length"
        :list="Object.values(marketStore.favs)"
        :type="type"
        :subtype="subtype"
        :iffav="true"
        @fetchFavs="marketStore.fetch_favs()"
      ></MarketList>
      <MarketList
        v-if="
          activeItem === 'eco' && status == 'open' && type !== 'binary' && auth
        "
        :key="marketStore.ecos.length"
        :list="Object.values(marketStore.ecos)"
        :type="type"
        :subtype="subtype"
        :ifeco="true"
        @fetchFavs="marketStore.fetch_favs()"
      ></MarketList>
      <div
        v-for="(mark, key, index) in (type === 'futures'
          ? marketStore.futures
          : marketStore.markets)"
        :key="index"
        :class="isActive(key) ? '' : 'hidden'"
      >
        <template v-if="activeItem === key">
          <MarketList
            :key="mark.length"
            :list="Object.values(mark)"
            :type="type"
            :subtype="subtype"
            :auth="auth"
            @fetchFavs="marketStore.fetch_favs()"
          ></MarketList>
        </template>
      </div>
    </div>
    <LoadingCircles :loading="isLoading" />
  </div>
</template>

<script>
  import { ref, computed } from "vue";
  import MarketList from "./MarketsList.vue";
  import { useMarketStore } from "@/store/market";
  import LoadingCircles from "@/partials/svg/LoadingCircles.vue";
  import { useRoute } from "vue-router";

  export default {
    components: { MarketList },
    props: {
      type: {
        type: String,
        default: "trade",
      },
      subtype: {
        type: String,
        default: "all",
      },
      status: {
        type: String,
        default: "open",
      },
      auth: {
        type: Boolean,
        default: true,
      },
    },
    setup(props) {
      const marketStore = useMarketStore();
      const route = useRoute();

      const old = ref([]);
      const oldChange = ref([]);
      const ext = window.ext;
      const provider = window.provider;
      const activeItem = ref(route.path.includes("-") ? "eco" : "USDT");
      const tickerElements = ref([]);
      const changeElements = ref([]);
      const isLoading = ref(false);

      const isActive = (menuItem) => {
        return activeItem.value === menuItem;
      };

      const setActive = (menuItem) => {
        activeItem.value = menuItem;
      };

      const fetchMarkets = async () => {
        if (marketStore.markets.length === 0) {
          if (props.type === "futures") {
            await marketStore.fetch_futures();
          } else {
            await marketStore.fetch_markets();
          }
        }
      };

      const fetchFavs = async () => {
        if (marketStore.favs.length === 0) {
          await marketStore.fetch_favs();
        }
      };

      const fetchEcos = async () => {
        if (marketStore.ecos.length === 0) {
          await marketStore.fetch_ecos();
        }
      };

      const scrollLeft = () => {
        const nfElement = document.querySelector(".nf");
        const leftPos = nfElement.scrollLeft;
        nfElement.scroll({ left: leftPos - 200, behavior: "smooth" });
      };

      const scrollRight = () => {
        const nfElement = document.querySelector(".nf");
        const leftPos = nfElement.scrollLeft;
        nfElement.scroll({ left: leftPos + 200, behavior: "smooth" });
      };

      const updateTickerElements = (updates) => {
        updates.forEach((update) => {
          const { tickerElement, newValue, symbol } = update;
          const oldValue = old.value[symbol];

          if (newValue > oldValue) {
            tickerElement
              .text(newValue)
              .addClass("text-success")
              .removeClass("text-danger");
          } else if (newValue < oldValue) {
            tickerElement
              .text(newValue)
              .addClass("text-danger")
              .removeClass("text-success");
          }

          old.value[symbol] = newValue;
        });
      };

      const updateTickerIcons = (updates) => {
        updates.forEach((update) => {
          const { tickerIcon, newValue, symbol } = update;
          const oldValue = old.value[symbol];

          if (newValue > oldValue) {
            tickerIcon
              .addClass("bi-arrow-up text-success")
              .removeClass("bi-arrow-down text-danger");
          } else if (newValue < oldValue) {
            tickerIcon
              .addClass("bi-arrow-down text-danger")
              .removeClass("bi-arrow-up text-success");
          }
        });
      };

      const updateChangeElements = (updates) => {
        updates.forEach((update) => {
          const { changeElement, newValue, symbol } = update;
          const oldValue = old.value[symbol];

          if (newValue > oldValue) {
            changeElement
              .text(`${priceFormatter(newValue)}%`)
              .addClass("bi-arrow-up text-success")
              .removeClass("bi-arrow-down text-danger");
          } else if (newValue < oldValue) {
            changeElement
              .text(`${priceFormatter(newValue)}%`)
              .addClass("bi-arrow-down text-danger")
              .removeClass("bi-arrow-up text-success");
          } else {
            changeElement.text(`${priceFormatter(newValue)}%`);
          }
        });
      };

      const priceFormatter = (p, decimalPlaces = 8, d = ",") => {
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
      };

      const handle = (tickers) => {
        try {
          for (const [id, ticker] of Object.entries(tickers)) {
            if (
              ticker.last &&
              marketStore[marketType.value] &&
              marketStore[marketType.value][activeItem.value] &&
              marketStore[marketType.value][activeItem.value][
                ticker.symbol + symbolType.value
              ]
            ) {
              let price = ticker.last;
              let change = ticker.percentage ?? ticker.info.change;
              marketStore[marketType.value][activeItem.value][
                ticker.symbol + symbolType.value
              ]["price"] = price;
              const isPriceIncrease =
                !old.value ||
                price > old.value[ticker.symbol + symbolType.value];
              marketStore[marketType.value][activeItem.value][
                ticker.symbol + symbolType.value
              ]["class"] = isPriceIncrease ? "text-success" : "text-danger";
              if (change) {
                marketStore[marketType.value][activeItem.value][
                  ticker.symbol + symbolType.value
                ]["change"] = change;
                // Set class based on whether the change is positive or negative
                marketStore[marketType.value][activeItem.value][
                  ticker.symbol + symbolType.value
                ]["classChange"] = change > 0 ? "text-success" : "text-danger";
              }
            }
          }

          old.value = Object.fromEntries(
            Object.entries(tickers).map(([id, ticker]) => [
              ticker.symbol,
              ticker.last,
            ])
          );
        } catch (error) {}
      };

      const loop = async () => {
        if (!marketStore.exchange) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
        if (marketStore.exchange.has["watchTickers"]) {
          while (
            window.location.href.indexOf(
              `${route.params.symbol}/${route.params.currency}`
            ) > -1
          ) {
            try {
              const tickers = await marketStore.exchange.watchTickers();
              handle(tickers); // Call the handle method with the received tickers
            } catch (e) {
              break;
            }
          }
        } else {
          while (
            window.location.href.indexOf(
              `${route.params.symbol}/${route.params.currency}`
            ) > -1
          ) {
            try {
              const tickers = await marketStore.exchange.fetchTickers();
              handle(tickers); // Call the handle method with the fetched tickers
            } catch (e) {
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        }
      };

      fetchMarkets();
      if (props.status === "open") {
        if (props.auth) {
          fetchFavs();
        }
        if (
          ext.eco === 1 &&
          !route.path.includes("binary") &&
          props.type !== "futures"
        ) {
          fetchEcos();
        }
      }
      if (activeItem.value !== "eco") {
        loop();
      }

      const activeMarkets = computed(() => {
        if (!marketStore[marketType.value]) {
          return {};
        }

        const filteredMarkets = {};

        for (const [key, marketData] of Object.entries(
          marketStore[marketType.value]
        )) {
          filteredMarkets[key] = {};
          for (const [subKey, data] of Object.entries(marketData)) {
            if (data.active === true) {
              filteredMarkets[key][subKey] = data;
            }
          }
        }

        return filteredMarkets;
      });

      const filteredTabs = computed(() => {
        const markets =
          props.type === "futures"
            ? marketStore.futures ?? {}
            : marketStore.markets ?? {};
        const filtered = {};

        for (const [key, marketData] of Object.entries(markets)) {
          const hasStatusOne = Object.values(marketData).some(
            (data) => data.active === true
          );
          if (hasStatusOne) {
            filtered[key] = marketData;
          }
        }

        return filtered;
      });

      const symbolType = computed(() => {
        return props.type === "futures" ? `:${activeItem.value}` : "";
      });

      const marketType = computed(() => {
        return props.type === "futures" ? "futures" : "markets";
      });

      return {
        marketStore,
        old,
        oldChange,
        ext,
        provider,
        activeItem,
        tickerElements,
        changeElements,
        isLoading,
        isActive,
        setActive,
        scrollLeft,
        scrollRight,
        updateTickerElements,
        updateTickerIcons,
        updateChangeElements,
        priceFormatter,
        handle,
        loop,
        activeMarkets,
        filteredTabs,
        symbolType,
        marketType,
      };
    },
  };
</script>
