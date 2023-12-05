<template>
  <div
    class="Orderbook border border-gray-100 bg-white shadow dark:border-gray-700 dark:bg-gray-900"
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
            <th class="text-center if-sm" scope="col">Amount</th>
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
          <span class="">Last Price: </span
          ><span :class="state.bestAskerClass">{{ state.bestAsker ?? 0 }}</span>
          <i class="bi" :class="state.bestAskerIcon"></i>
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
  </div>
</template>

<script>
  import ListItem from "@/main/trading/orderbook/ListItem.vue";
  import { useEcoStore } from "@/store/eco";
  import NewSvg from "./orderbook/NewSvg.vue";
  import { reactive, computed, onMounted, watch, ref, onUnmounted } from "vue";
  export default {
    components: { ListItem, NewSvg },
    props: {
      market: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const ecoStore = useEcoStore();
      const state = reactive({
        limit: {
          asks: 12,
          bids: 12,
        },
        showMoreAsks: false,
        showMoreBids: false,
        sideLength: 20,
        refreshRate: 500,
        bestAsker: 0,
        bestAskerIcon: null,
        bestAskerClass: null,
        lastUpdated: "",
        activeItem: "pills-graph",
        data: {},
        asks: Array.from({ length: 20 }, () => [0, 0, 0, 0]),
        bids: Array.from({ length: 20 }, () => [0, 0, 0, 0]),
      });

      const currency = computed(() => props.market.currency);
      const pair = computed(() => props.market.pair);
      const subscriptionOrderBook = ref(null);
      const trades = ref([]);

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
          if (el[1] > 0) {
            el[2].width = sortwidth.width(el[1], o) * 2.5;
          }
        });
      }

      const computBarWidth = {
        width: 250,
        sortwidth,
        init,
      };

      // Watchers
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

      watch(currency, async () => {
        trades.value = [];
        state.bestAskerClass = null;
        state.bestAskerIcon = null;
        ecoStore.bestAsk = 0;
        ecoStore.bestBid = 0;
        state.bestBidder = 0;
        state.bestAsker = 0;
        state.asks = Array.from({ length: 20 }, () => [0, 0, 0, 0]);
        state.bids = Array.from({ length: 20 }, () => [0, 0, 0, 0]);

        await fetchOrderbook(currency.value, pair.value);
        updateWebSocketSubscription();
        await fetchOrderbookJson(currency.value, pair.value);
      });

      watch(pair, async () => {
        trades.value = [];
        state.bestAskerClass = null;
        state.bestAskerIcon = null;
        ecoStore.bestAsk = 0;
        ecoStore.bestBid = 0;
        state.bestBidder = 0;
        state.bestAsker = 0;
        state.asks = Array.from({ length: 20 }, () => [0, 0, 0, 0]);
        state.bids = Array.from({ length: 20 }, () => [0, 0, 0, 0]);

        await fetchOrderbook(currency.value, pair.value);
        updateWebSocketSubscription();
        await fetchOrderbookJson(currency.value, pair.value);
      });

      function isActive(menuItem) {
        return activeItem === menuItem;
      }

      function setActive(menuItem) {
        activeItem = menuItem;
      }

      const formattedAsks = computed(() => {
        // Sort
        const sortedAsks = state.asks.slice().sort((a, b) => {
          const aPrice = parseFloat(a[0]);
          const bPrice = parseFloat(b[0]);

          if (aPrice === 0 && bPrice === 0) return 0;
          if (aPrice === 0) return -1;
          if (bPrice === 0) return 1;
          return bPrice - aPrice;
        });

        // Slice
        const asks = state.showMoreAsks
          ? sortedAsks
          : sortedAsks.slice(-state.limit.asks);

        return asks.map(([price, volume, { width }]) => [
          priceFormatter(price, PrecisionPrice.value),
          priceFormatter(volume, PrecisionAmount.value),
          priceFormatter(price * volume, PrecisionAmount.value),
          width,
        ]);
      });

      const formattedBids = computed(() =>
        state.bids.map(([price, volume, { width }]) => [
          priceFormatter(price, PrecisionPrice.value),
          priceFormatter(volume, PrecisionAmount.value),
          priceFormatter(price * volume, PrecisionAmount.value),
          width,
        ])
      );

      async function fetchOrderbook(currency, pair) {
        try {
          const res = await axios.post("/user/eco/orderbook", {
            currency: currency,
            pair: pair,
          });

          // Process the array of trades directly
          if (res.length > 0) {
            updateOrderbook(res);
          }

          // The rest of the function remains the same...
        } catch (error) {
          $toast.error(error.message);
        }
      }

      async function fetchOrderbookJson(currency, pair) {
        try {
          const res = await axios.post("/user/eco/orderbook/history", {
            currency: currency,
            pair: pair,
          });
          // Filter out trades that are already processed
          const newTrades = res.filter(
            (newTrade) =>
              !trades.value.find((trade) => trade.id === newTrade.id)
          );

          // Process the array of trades directly
          if (newTrades.length > 0) {
            updateOrderbook(newTrades);
          }
          // Set the market order flag based on the processed orderbook
          ecoStore.marketOrder = state.asks.length > 0;
        } catch (error) {}
      }

      async function updateOrderbook(data) {
        // Process all trades in a batch when fetching from an API
        data.forEach((trade) => addOrUpdateTrade(trade));
        data = processTrades(trades.value);
        const now = Date.now();
        if (!state.lastUpdated || now - state.lastUpdated > state.refreshRate) {
          computBarWidth.init(data.bids, data.asks);

          // Sort asks in ascending order by price and bids in descending order by price
          data.asks.sort((a, b) => a[0] - b[0]);
          data.bids.sort((a, b) => b[0] - a[0]);

          // Get best ask and bid
          const bestAsker = data.asks[0] ? data.asks[0][0] : null;
          const bestBidder = data.bids[0] ? data.bids[0][0] : null;

          // Check if the best ask is better than the previous best ask
          const isBetterAsker = bestAsker && bestAsker > state.bestAsker;
          state.bestAskerClass = isBetterAsker ? "text-success" : "text-danger";
          state.bestAskerIcon = isBetterAsker
            ? "bi-arrow-up text-success"
            : "bi-arrow-down text-danger";

          // Update best ask and bid
          state.bestAsker = Number(bestAsker);
          ecoStore.bestAsk = Number(bestAsker);
          ecoStore.bestBid = Number(bestBidder);

          state.lastUpdated = now;

          updateArrayInPlace(state.asks, data.asks, state.sideLength);
          updateArrayInPlace(state.bids, data.bids, state.sideLength);
        } else {
          await new Promise((resolve) => requestAnimationFrame(resolve));
          await new Promise((resolve) =>
            setTimeout(resolve, state.refreshRate / 2)
          );
        }
      }

      const PrecisionAmount = computed(() => {
        if (state.asks.length === 0 && state.bids.length === 0) {
          return 6;
        }

        const amounts = [
          ...state.asks.map((ask) => Number(ask[1])),
          ...state.bids.map((bid) => Number(bid[1])),
        ];

        const nonZeroAmounts = amounts.filter((amount) => amount !== 0);

        const decimalPlaces = nonZeroAmounts.reduce((maxDecimals, amount) => {
          const decimals = (amount.toString().split(".")[1] || "").length;
          return Math.max(maxDecimals, decimals);
        }, 0);

        ecoStore.precisionAmount = decimalPlaces;

        return decimalPlaces;
      });

      const PrecisionPrice = computed(() => {
        if (state.asks.length === 0 && state.bids.length === 0) {
          return 8;
        }

        const prices = [
          ...state.asks.map((ask) => Number(ask[0])),
          ...state.bids.map((bid) => Number(bid[0])),
        ];

        const nonZeroPrices = prices.filter((price) => price !== 0);

        const decimalPlaces = nonZeroPrices.reduce((maxDecimals, price) => {
          const decimals = (price.toString().split(".")[1] || "").length;
          return Math.max(maxDecimals, decimals);
        }, 0);

        ecoStore.precisionPrice = decimalPlaces;

        return decimalPlaces;
      });

      function priceFormatter(p, decimalPlaces = 8, d = ",") {
        if (isNaN(p)) {
          return "0";
        }

        // Ensure decimalPlaces is a valid integer
        decimalPlaces = parseInt(decimalPlaces);

        // Parse p to a number and round it to the specified decimal places
        p = Number(p).toFixed(decimalPlaces);

        return p;
      }

      function updateWebSocketSubscription() {
        unsubscribeWebSocket();

        const newChannelOrderBook = `orderbook-data.${currency.value}.${pair.value}`;
        subscriptionOrderBook.value = window.Echo.private(newChannelOrderBook);

        // listen for the 'order-deleted' event
        subscriptionOrderBook.value.listen(".orderbook-deleted", async (e) => {
          deleteOrder(e.order); // assuming the event data has the deleted order id
        });

        subscriptionOrderBook.value.listen(".orderbook", async (e) => {
          matchMakeOrder(e.orderbook);
        });
      }

      function deleteOrder(orderId) {
        // remove the order from trades
        trades.value = trades.value.filter((trade) => trade.id !== orderId);

        // remove the order from state.asks and state.bids
        ["asks", "bids"].forEach((key) => {
          const index = state[key].findIndex(
            ([price, , , orderIdInState]) => orderIdInState === orderId
          );
          if (index !== -1) {
            state[key].splice(index, 1);
          }
        });

        // update the orderbook with the updated trades
        updateOrderbook(trades.value);
      }

      function matchMakeOrder(newTrade) {
        const oppositeType = newTrade.type === "BUY" ? "SELL" : "BUY";

        // Clean up fully filled orders
        trades.value = trades.value.filter(
          (trade) => trade.amount - trade.fill > 0
        );

        // Filter trades by the opposite type and sort them by price
        const sortedTrades = trades.value
          .filter((trade) => trade.type === oppositeType)
          .sort((a, b) => a.price - b.price);

        // Find the matching trade
        const matchingTradeIndex = sortedTrades.findIndex(
          (trade) => Math.abs(trade.price - newTrade.price) < 0.00000001 // Use a tolerance range for price comparison
        );

        if (matchingTradeIndex !== -1) {
          // Found a matching order with the opposite type and similar price
          const matchingTrade = sortedTrades[matchingTradeIndex];
          const remainingAmountNewTrade =
            Number(newTrade.amount) - Number(newTrade.fill);
          const remainingAmountMatchingTrade =
            Number(matchingTrade.amount) - Number(matchingTrade.fill);

          if (remainingAmountNewTrade >= remainingAmountMatchingTrade) {
            // The new order amount is equal to or greater than the remaining amount of the matching order
            // Update the fill of the new trade and remove the matching trade
            newTrade.fill += remainingAmountMatchingTrade;
            const indexInTrades = trades.value.indexOf(matchingTrade);
            if (indexInTrades !== -1) {
              trades.value.splice(indexInTrades, 1);
            }

            // Remove matching trade from state.bids or state.asks
            const stateProperty = oppositeType === "BUY" ? "bids" : "asks";
            const indexInState = state[stateProperty].findIndex(
              (trade) => Math.abs(trade[0] - matchingTrade.price) < 0.00000001
            );
            if (indexInState !== -1) {
              state[stateProperty] = JSON.parse(
                JSON.stringify(
                  state[stateProperty].filter(
                    (_, index) => index !== indexInState
                  )
                )
              );
            }
          } else {
            // The new order amount is less than the remaining amount of the matching order
            // Update the fill of the matching trade and remove the new trade
            matchingTrade.fill += remainingAmountNewTrade;
            newTrade.fill = newTrade.amount; // New trade is fully filled

            // Since new trade is fully filled and it was never added to state.bids or state.asks, we don't need to remove it
          }
        }

        // If the new trade is not fully filled, add it to the trades array
        if (newTrade.fill < newTrade.amount) {
          trades.value.push(newTrade);
        }

        // Update the orderbook with the updated trades
        updateOrderbook(trades.value);
      }

      function addOrUpdateTrade(newTrade) {
        // The simple logic (checking by id and updating the array) goes here...
        const existingTradeIndex = trades.value.findIndex(
          (trade) => trade.id === newTrade.id
        );

        if (existingTradeIndex !== -1) {
          // The trade exists, update it in the trades array
          trades.value[existingTradeIndex] = newTrade;
        } else {
          // The trade doesn't exist, add it to the trades array
          trades.value.push(newTrade);
        }
      }

      function processTrades(trades) {
        let bids = {};
        let asks = {};

        // If trades is not an array, make it an array
        if (!Array.isArray(trades)) {
          trades = [trades];
        }

        trades.forEach((trade) => {
          if (trade.price) {
            let price = Number(trade.price).toFixed(8);
            let target = trade.type === "BUY" ? bids : asks;

            if (target[price]) {
              target[price][1] = (
                Number(target[price][1]) + Number(trade.amount)
              ).toFixed(8);
            } else {
              target[price] = [
                price,
                Number(trade.amount - trade.fill).toFixed(8),
              ];
            }
          }
        });

        const sortAndConvert = (target, sortOrder) => {
          let result = Object.values(target);
          result.sort((a, b) => {
            if (sortOrder === "PRICE_ASC") {
              return parseFloat(a[0]) > parseFloat(b[0]) ? 1 : -1; // sort price in ascending order
            } else if (sortOrder === "PRICE_DESC") {
              return parseFloat(a[0]) < parseFloat(b[0]) ? 1 : -1; // sort price in descending order
            }
          });
          return result;
        };

        return {
          bids: sortAndConvert(bids, "PRICE_DESC"),
          asks: sortAndConvert(asks, "PRICE_ASC"),
        };
      }

      function updateArrayInPlace(targetArray, sourceArray, maxLength) {
        sourceArray.forEach((item) => {
          const index = targetArray.findIndex((el) => el[0] === item[0]);

          if (index >= 0) {
            targetArray.splice(index, 1, item);
          } else {
            targetArray.push(item);
          }
        });

        targetArray.sort((a, b) => b[0] - a[0]);
        targetArray.splice(maxLength);
      }

      onMounted(() => {
        fetchOrderbook(currency.value, pair.value);
        updateWebSocketSubscription();
        fetchOrderbookJson(currency.value, pair.value);
      });

      function unsubscribeWebSocket() {
        if (subscriptionOrderBook.value) {
          window.Echo.leave(`orderbook-data.${currency.value}.${pair.value}`);
          subscriptionOrderBook.value = null;
        }
      }

      onUnmounted(() => {
        unsubscribeWebSocket();
      });

      return {
        ecoStore,
        state,
        currency,
        pair,
        formattedAsks,
        formattedBids,
        isActive,
        setActive,
      };
    },
  };
</script>
