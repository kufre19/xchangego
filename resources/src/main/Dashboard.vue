<template>
  <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul
      id="myTab"
      class="-mb-px flex flex-wrap text-center text-sm font-medium"
      role="tablist"
    >
      <li
        v-if="plat.eco.ecosystem_trading_only !== 1"
        class="mr-2"
        role="presentation"
      >
        <button
          id="spot-tab"
          class="inline-block rounded-t-lg border-b-2 p-4"
          type="button"
          role="tab"
          aria-controls="spot"
          aria-selected="false"
          :class="
            isActive('spot')
              ? 'text-gray-900 dark:text-gray-300'
              : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
          "
          href="#spot"
          @click.prevent="setActive('spot')"
        >
          <div class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-2 h-5 w-5"
              :class="
                isActive('spot')
                  ? 'text-blue-600 dark:text-blue-500'
                  : ' text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
              "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
            <span class="mr-2">{{ $t("Spot Markets") }}</span>
          </div>
        </button>
      </li>
      <li v-if="ext.eco == 1" class="mr-2" role="presentation">
        <button
          id="main-tab"
          class="inline-block rounded-t-lg border-b-2 p-4"
          type="button"
          role="tab"
          aria-controls="main"
          aria-selected="false"
          :class="
            isActive('main')
              ? 'text-gray-900 dark:text-gray-300'
              : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
          "
          href="#main"
          @click.prevent="setActive('main')"
        >
          <div class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-2 h-5 w-5"
              :class="
                isActive('main')
                  ? 'text-blue-600 dark:text-blue-500'
                  : ' text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
              "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
              />
            </svg>

            <span class="mr-2">{{ $t("Hot Markets") }}</span>
          </div>
        </button>
      </li>
    </ul>
  </div>

  <div
    v-if="plat.eco.ecosystem_trading_only !== 1"
    :class="isActive('spot') ? '' : 'hidden'"
  >
    <div
      class="mb-4 items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0"
    >
      <h2 class="mb-1 text-xl font-medium">{{ $t("Spot Markets") }}</h2>

      <div class="grid gap-3 xs:grid-cols-1 md:grid-cols-2">
        <select
          :key="marketStore.markets.length"
          v-model="activeItem"
          class="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <template
            v-for="(pair, key, index) in marketStore.markets"
            :key="index"
          >
            <option :value="key">
              {{ key }}
            </option></template
          >
        </select>
        <Filter>
          <input
            v-model="filters.symbol.value"
            type="text"
            class="filter-input"
            placeholder="Symbol"
        /></Filter>
      </div>
    </div>
    <div class="card relative overflow-x-auto">
      <VTable
        v-if="list.length > 0"
        :key="list.length"
        v-model:current-page="currentPage"
        class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        :data="list"
        :filters="filters"
        :page-size="10"
        :hide-sort-icons="true"
        @totalPagesChanged="totalPages = $event"
      >
        <template #head>
          <tr
            class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          >
            <VTh
              sort-key="symbol"
              scope="col"
              class="px-6 py-3"
              style="width: 15%;"
            >
              <Col text="Symbol" />
            </VTh>
            <VTh
              sort-key="price"
              scope="col"
              class="px-6 py-3"
              style="width: 20%;"
            >
              <Col text="Price" />
            </VTh>
            <VTh
              sort-key="change"
              scope="col"
              class="px-6 py-3"
              style="width: 25%;"
            >
              <Col text="Change" />
            </VTh>
            <th scope="col" class="px-6 py-3"></th>
            <VTh
              sort-key="baseVolume"
              scope="col"
              class="px-6 py-3"
              style="width: 25%;"
            >
              <Col text="Volume" />
            </VTh>
            <VTh
              sort-key="action"
              scope="col"
              class="px-6 py-3"
              style="width: 15%;"
            >
              <Col text="Action" />
            </VTh>
          </tr>
        </template>
        <template #body="{ rows }">
          <template v-if="list.length > 0">
            <tr
              v-for="row in rows"
              :key="row.id"
              class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td data-label="Symbol" class="flex items-center px-6 py-4">
                <div class="tokenicon-wrap">
                  <img
                    v-lazy="
                      row.base
                        ? '/assets/images/cryptoCurrency/' +
                          row.base.toLowerCase() +
                          '.png'
                        : '/market/notification.png'
                    "
                    class="tokenicon-image"
                  />
                </div>
                <span class="font-medium">{{ row.symbol }}</span>
              </td>
              <td data-label="price">
                <span class="text-start" :class="row.class || ''">{{
                  priceFormatter(row.price) || ""
                }}</span>
                USDT
              </td>
              <td>
                <div class="well">
                  <section
                    :class="{
                      transparent: !row.history,
                    }"
                  >
                    <svg
                      :class="row.class"
                      :viewBox="svgBox"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <LineChartList
                        :values="points(width, height, history[row.symbol])"
                      ></LineChartList>
                    </svg>
                  </section>
                </div>
              </td>
              <td data-label="change">
                <span class="mr-1 text-start" :class="row.classChange || ''"
                  >{{ priceFormatter(row.change, 2) || "" }}%</span
                >
              </td>
              <td data-label="volume">
                <div class="mr-1 text-start">
                  {{ priceFormatter(row.baseVolume, 2) || "" }}
                  {{ row.base }}
                </div>
                <div class="mr-1 text-start">
                  {{ priceFormatter(row.quoteVolume, 2) || "" }}
                  {{ row.quote }}
                </div>
              </td>

              <td class="px-6 py-3" style="width: 20%;" data-label="Action">
                <router-link class="" :to="'trade/' + row.symbol"
                  ><button class="btn btn-outline-primary">
                    {{ $t("Trade") }}
                  </button>
                </router-link>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              scope="row"
              class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td colspan="100%" class="px-6 py-4">
                {{ $t("No results found!") }}
              </td>
            </tr>
          </template>
        </template>
      </VTable>
    </div>

    <VTPagination
      v-model:currentPage="currentPage"
      class="float-right flex items-center justify-between pt-4"
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
  <div v-if="ext.eco == 1" :class="isActive('main') ? '' : 'hidden'">
    <div
      class="mb-4 items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0"
    >
      <h2 class="mb-1 text-xl font-medium">{{ $t("Hot Markets") }}</h2>

      <div class="grid gap-3 xs:grid-cols-1 md:grid-cols-2 }">
        <select
          :key="marketStore.main_markets.length"
          v-model="activeItemMain"
          class="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option value="All">All</option>
          <template
            v-for="(pair, key, index) in marketStore.main_markets"
            :key="index"
          >
            <option :value="key">
              {{ key }}
            </option>
          </template>
        </select>

        <Filter>
          <input
            v-model="filtersMain.symbol.value"
            type="text"
            class="filter-input"
            placeholder="Symbol"
        /></Filter>
      </div>
    </div>
    <div class="card relative overflow-x-auto">
      <VTable
        v-if="listMain.length > 0"
        :key="listMain.length"
        v-model:current-page="currentPageMain"
        class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        :data="listMain"
        :filters="filtersMain"
        :page-size="10"
        :hide-sort-icons="true"
        @totalPagesChanged="totalPagesMain = $event"
      >
        <template #head>
          <tr
            class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          >
            <VTh sort-key="symbol" scope="col" class="px-6 py-3">
              <Col text="Symbol" />
            </VTh>
            <th scope="col" class="py-3 px-6">
              {{ $t("Limits") }}
            </th>
            <th scope="col" class="py-3 px-6">
              {{ $t("Fees") }}
            </th>
            <VTh sort-key="action" scope="col" class="px-6 py-3">
              <Col text="Action" />
            </VTh>
          </tr>
        </template>
        <template #body="{ rows }">
          <template v-if="listMain.length > 0">
            <tr
              v-for="row in rows"
              :key="row.id"
              class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td data-label="Symbol" class="flex items-center px-6 py-4">
                <div class="tokenicon-wrap">
                  <img
                    v-lazy="
                      row.currency
                        ? '/assets/images/cryptoCurrency/' +
                          row.currency.toLowerCase() +
                          '.png'
                        : '/market/notification.png'
                    "
                    class="tokenicon-image"
                  />
                </div>
                <span class="font-medium">{{ row.symbol }}</span>
              </td>
              <td data-label="Limits" class="px-6 py-4">
                <div>
                  <span>{{ $t("Min") }}: </span
                  ><span class="font-medium text-warning">{{
                    formatNumber(row.min_amount)
                  }}</span>
                </div>
                <div>
                  <span>{{ $t("Max") }}: </span
                  ><span class="font-medium text-warning">{{
                    formatNumber(row.max_amount)
                  }}</span>
                </div>
              </td>
              <td data-label="Fees" class="px-6 py-4">
                <div>
                  <span>{{ $t("Taker") }}: </span
                  ><span class="font-medium text-warning">{{
                    formatNumber(row.taker)
                  }}</span
                  >%
                </div>
                <div>
                  <span>{{ $t("Maker") }}: </span
                  ><span class="font-medium text-warning">{{
                    formatNumber(row.maker)
                  }}</span
                  >%
                </div>
              </td>
              <td class="px-6 py-3" data-label="Action">
                <router-link
                  class=""
                  :to="'trade/' + row.currency + '-' + row.pair"
                  ><button class="btn btn-outline-primary">
                    {{ $t("Trade") }}
                  </button>
                </router-link>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              scope="row"
              class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td colspan="100%" class="px-6 py-4">
                {{ $t("No results found!") }}
              </td>
            </tr>
          </template>
        </template>
      </VTable>
    </div>

    <VTPagination
      v-model:currentPage="currentPageMain"
      class="float-right flex items-center justify-between pt-4"
      aria-label="Table navigation"
      :total-pages="totalPagesMain"
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
</template>

<script>
  import toMoney from "@/partials/toMoney.vue";
  import toDate from "@/partials/toDate.vue";
  import Filter from "@/partials/table/Filter.vue";
  import Col from "@/partials/table/Col.vue";
  import LineChartList from "@/partials/LineChart.vue";
  import { useMarketStore } from "@/store/market";
  export default {
    components: { toDate, toMoney, Filter, Col, LineChartList },
    setup() {
      const marketStore = useMarketStore();
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
      if (marketStore.exchange === null) {
        marketStore.exchange = new ccxt.pro[provider](config);
      }
      return { marketStore };
    },
    // component data
    data() {
      return {
        plat: plat,
        cur_rate: cur_rate,
        cur_symbol: cur_symbol,
        filters: {
          symbol: { value: "", keys: ["symbol"] },
        },
        activeItem: "USDT",
        list: {},
        currentPage: 1,
        totalPages: 0,
        filtersMain: {
          symbol: { value: "", keys: ["symbol"] },
        },
        activeItemMain: "All",
        listMain: {},
        currentPageMain: 1,
        totalPagesMain: 0,
        cx: 0,
        cy: 0,
        width: 200,
        height: 28,
        history: [],
        old: [],
        oldChange: [],
        ext: ext,
        activeTab: plat.eco.ecosystem_trading_only == 1 ? "main" : "spot",
      };
    },
    computed: {
      svgBox() {
        return "0 0 " + this.width + " " + this.height;
      },
    },
    watch: {
      activeItem() {
        this.lists();
      },
      activeItemMain() {
        this.listsMain();
      },
    },
    async created() {
      if (ext.eco != 1) {
        await this.marketStore.fetch_markets();
        this.lists();
      } else if (plat.eco.ecosystem_trading_only != 1 && ext.eco == 1) {
        await this.marketStore.fetch_markets();
        await this.marketStore.fetch_main_markets();
        this.lists();
        this.listsMain();
      } else {
        await this.marketStore.fetch_main_markets();
        this.listsMain();
      }
    },
    mounted() {
      this.loop();
    },
    methods: {
      formatNumber(number) {
        const stringifiedNumber = number.toString();
        const decimalIndex = stringifiedNumber.indexOf(".");
        if (decimalIndex === -1) {
          return number;
        }
        const trailingZeros = stringifiedNumber
          .slice(decimalIndex + 1)
          .replace(/0*$/, "");
        if (trailingZeros.length === 0) {
          return parseInt(stringifiedNumber.slice(0, decimalIndex));
        }
        return parseFloat(
          `${stringifiedNumber.slice(0, decimalIndex)}.${trailingZeros}`
        );
      },
      setActive(tab) {
        this.activeTab = tab;
      },
      isActive(tab) {
        return this.activeTab === tab;
      },
      async loop() {
        if (this.marketStore.exchange.has["watchTickers"]) {
          while (this.$route.meta.title == "Dashboard") {
            try {
              const tickers = await this.marketStore.exchange.watchTickers();
              this.handle(tickers);
            } catch (e) {
              break;
            }
          }
        } else {
          while (this.$route.meta.title == "Dashboard") {
            try {
              const tickers = await this.marketStore.exchange.fetchTickers();
              this.handle(tickers);
            } catch (e) {
              break;
            }
          }
        }
      },
      handle(tickers) {
        try {
          const market = this.marketStore.markets[this.activeItem];
          if (!market) return;

          for (const [symbol, ticker] of Object.entries(tickers)) {
            const marketSymbol = market[symbol];
            if (!marketSymbol || !ticker.last) continue;

            marketSymbol.price = ticker.last;
            marketSymbol.class =
              ticker.last > (this.old && this.old[symbol])
                ? "text-success"
                : "text-danger";
            this.calcHistory(symbol, ticker.last);
            if (ticker.percentage) {
              marketSymbol.change = ticker.percentage;
              marketSymbol.classChange =
                ticker.percentage > (this.oldChange && this.oldChange[symbol])
                  ? "text-success"
                  : "text-danger";
            }

            marketSymbol.baseVolume = ticker.baseVolume;
            marketSymbol.quoteVolume = ticker.quoteVolume;
          }

          this.old = Object.fromEntries(
            Object.entries(tickers).map(([symbol, ticker]) => [
              symbol,
              ticker.last,
            ])
          );
        } catch (error) {
          console.error(error);
        }
      },
      lists() {
        if (this.marketStore.markets) {
          if (this.marketStore.markets[this.activeItem]) {
            this.list = Object.values(
              this.marketStore.markets[this.activeItem]
            );
          } else {
            const firstKey = Object.keys(this.marketStore.markets)[0];
            this.list = Object.values(this.marketStore.markets[firstKey]);
          }
        } else {
          this.list = [];
        }
      },
      listsMain() {
        if (this.marketStore.main_markets) {
          if (this.activeItemMain === "All") {
            this.listMain = Object.values(
              this.marketStore.main_markets
            ).flatMap((markets) =>
              Object.values(markets).filter((market) => market.status === 1)
            );
          } else if (
            this.activeItemMain !== null &&
            this.marketStore.main_markets[this.activeItemMain]
          ) {
            this.listMain = Object.values(
              this.marketStore.main_markets[this.activeItemMain]
            ).filter((market) => market.status === 1);
          } else {
            const firstKey = Object.keys(this.marketStore.main_markets)[0];
            this.activeItemMain = firstKey;
            this.listMain = Object.values(
              this.marketStore.main_markets[firstKey]
            );
          }
        } else {
          this.listMain = [];
        }
      },
      points(width, height, values) {
        width = parseFloat(width) || 0;
        height = parseFloat(height) || 0;
        values = Array.isArray(values) ? values : [];
        values = values.map((n) => parseFloat(n) || 0);

        let min = values.reduce(
          (min, val) => (val < min ? val : min),
          values[0]
        );
        let max = values.reduce(
          (max, val) => (val > max ? val : max),
          values[0]
        );
        let len = values.length;
        let half = height / 2;
        let range = max > min ? max - min : height;
        let gap = len > 1 ? width / (len - 1) : 1;
        let out = [];

        for (let i = 0; i < len; ++i) {
          let d = values[i];
          let val = 2 * ((d - min) / range - 0.5);
          let x = i * gap;
          let y = -val * half * 0.8 + half;
          out.push({ x, y });
        }
        return out;
      },
      priceFormatter(p, f1 = 8, f2 = 2, d = ",") {
        if (p == null || isNaN(p)) {
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
      calcHistory(symbol, close) {
        if (!this.history[symbol]) {
          this.history[symbol] = [];
        }
        if (!this.history[symbol].length) {
          this.fakeHistory(symbol, close);
        }
        this.history[symbol].push(close);
        this.history[symbol].splice(0, this.history[symbol].length - 30);
      },
      fakeHistory(symbol, close) {
        const num = close * 0.0002;
        const min = -Math.abs(num);
        const max = Math.abs(num);
        this.history[symbol] = [];

        for (let i = 0; i < 30; ++i) {
          const rand = Math.random() * (max - min) + min;
          this.history[symbol].push(close + rand);
        }
      },
    },
  };
</script>
<style lang="scss">
  // grey colors
  $colorGrey: lightslategray;
  $lineJoin: 6px;
  $padSpace: 1em;
  $colorGain: darken(yellowgreen, 10%);
  $colorLoss: desaturate(red, 30%);
  .well {
    position: relative;
    padding: calc($padSpace * 0.4) calc($padSpace * 0.8);
    background-image: radial-gradient(
      ellipse at top left,
      rgba(black, 0.2) 0%,
      rgba(black, 0.01) 100%
    );
    border-radius: $lineJoin;
  }
  .color {
    color: $colorGrey;
  }
  polyline {
    stroke: $colorGrey;
  }
  circle {
    fill: $colorGrey;
  }

  // text-success color for price chage
  .text-success .color {
    color: $colorGain;
  }
  .text-success polyline {
    stroke: $colorGain;
  }
  .text-success circle {
    fill: $colorGain;
  }

  // text-danger color for price change
  .text-danger .color {
    color: $colorLoss;
  }
  .text-danger polyline {
    stroke: $colorLoss;
  }
  .text-danger circle {
    fill: $colorLoss;
  }

  // position helpers
  .pos-abs {
    position: absolute;
  }
  .pos-rel {
    position: relative;
  }
  $iconSize: 46px;
  // info colors
  $colorInfo: darken(slategray, 15%);
  $colorInfoText: lighten($colorInfo, 45%);

  // comp wrapper
  .tokenicon-wrap {
    display: block;
    position: relative;
    margin-right: 8px;
    width: $iconSize;
    min-height: $iconSize;

    .tokenicon-image {
      display: block;
      position: relative;
      overflow: hidden;
      text-align: center;
      width: $iconSize;
      height: auto;

      &.default {
        display: flex;
        flex-direction: row;
        justify-items: center;
        justify-content: center;
        color: $colorInfoText;
        background-color: $colorInfo;
        border-radius: 100%;
        height: $iconSize;
        line-height: $iconSize;
        letter-spacing: -1px;
        transform: rotate(-25deg);
      }
    }
  }
</style>
