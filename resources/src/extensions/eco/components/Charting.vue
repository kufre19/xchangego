<template></template>

<script>
  import { DataFeed, widget as TvWidget } from "tradingview-api";
  import { useEcoStore } from "@/store/eco";

  export default {
    name: "KLineWidget",
    props: {
      market: {
        type: Object,
        required: true,
      },
    },
    setup() {
      const ecoStore = useEcoStore();
      return { ecoStore };
    },
    data() {
      return {
        chart: null,
        bars: [],
        loops: {},
        cachedData: {},
        interval: localStorage.getItem("lastInterval") || "1h",
        widget: null,
        duration: 86400000, // milliseconds
        now: Date.now(),
        lastprice: [],
        subscription: null,
        supported_resolutions: [
          "1",
          "3",
          "5",
          "15",
          "30",
          "60",
          "240",
          "720",
          "D",
          "W",
          "M",
        ],
        intervalMap: {
          "1m": "1",
          "3m": "3",
          "5m": "5",
          "15m": "15",
          "30m": "30",
          "1h": "60",
          "4h": "240",
          "12h": "720",
          "1d": "D",
          w: "W",
          m: "M",
        },
        intervalFetch: {
          "1m": "MIN_1",
          "3m": "MIN_3",
          "5m": "MIN_5",
          "15m": "MIN_15",
          "30m": "MIN_30",
          "1h": "HOUR_1",
          "4h": "HOUR_4",
          "12h": "HOUR_12",
          "1d": "DAY",
          w: "WEEK",
          m: "MONTH",
        },
      };
    },
    computed: {
      datafeed() {
        return this.createDataFeed();
      },
    },

    watch: {
      async $route(to, from) {
        const oldKey = `${from.params.symbol}-${from.params.currency}-${
          this.intervalFetch[this.interval]
        }`;
        const newKey = `${to.params.symbol}-${to.params.currency}-${
          this.intervalFetch[this.interval]
        }`;

        this.loops[oldKey] = false;
        this.bars = [];
        await this.$nextTick();
        this.loops[newKey] = true;
        this.datafeed = this.createDataFeed();
        this.updateWebSocketSubscription();
        this.loopHistory(
          this.market.currency,
          this.market.pair,
          this.intervalFetch[this.interval]
        );
      },

      interval: {
        handler: async function (newVal, oldVal) {
          if (newVal !== oldVal) {
            const oldKey = `${this.market.currency}-${this.market.pair}-${this.intervalFetch[oldVal]}`;
            const newKey = `${this.market.currency}-${this.market.pair}-${this.intervalFetch[newVal]}`;
            this.loops[oldKey] = false;
            this.bars = [];
            await this.$nextTick();
            this.loops[newKey] = true;
            this.datafeed = this.createDataFeed();
            this.ecoStore.timeframe = this.intervalFetch[newVal];
            localStorage.setItem("lastInterval", newVal);
            localStorage.setItem("lastTimeframe", this.intervalFetch[newVal]);
            this.updateWebSocketSubscription();
            this.loopHistory(
              this.market.currency,
              this.market.pair,
              this.intervalFetch[newVal]
            );
          }
        },
        immediate: false,
      },
    },
    beforeUnmount() {
      Object.keys(this.loops).forEach((key) => {
        this.loops[key] = false;
      });
    },

    mounted() {
      this.initTradingView();
    },

    created() {
      this.updateWebSocketSubscription();
      const key = `${this.market.currency}-${this.market.pair}-${
        this.intervalFetch[this.interval]
      }`;
      this.loops[key] = true;
    },

    methods: {
      updateWebSocketSubscription() {
        if (this.subscription) {
          this.subscription.stopListening(".candlestick");
          window.Echo.leave(this.subscription.name);
          this.subscription = null;
        }

        const newChannel = `chart-data.${this.market.currency}.${
          this.market.pair
        }.${this.intervalFetch[this.interval]}`;

        this.subscription = window.Echo.private(newChannel);
        this.subscription.listen(".candlestick", async (e) => {
          for (const bar of e.chartData) {
            const parsedBar = {
              timestamp: bar.timestamp,
              high: parseFloat(bar.high),
              low: parseFloat(bar.low),
              open: parseFloat(bar.open),
              close: parseFloat(bar.close),
              volume: parseFloat(bar.volume),
            };
            await this.updateBar(parsedBar);
          }
        });
      },

      async loopHistory(currency, pair, timeframe) {
        const key = `${currency}-${pair}-${timeframe}`;
        const barDuration = this.getBarDuration(
          this.intervalMap[this.interval]
        );
        const maxBars = 199;
        let to;

        if (this.bars && this.bars.length > 0) {
          to = this.bars[0].time;
        } else {
          to = Date.now() - maxBars * barDuration;
        }

        let failureCount = 0;
        const failureLimit = 10;

        while (!this.stopLoop && this.loops[key]) {
          const from = to - maxBars * barDuration;
          const data = await this.fetchHistory(from, to);

          if (data && data.length == 0) {
            failureCount++;
          } else {
            failureCount = 0;
          }

          if (failureCount >= failureLimit) {
            this.stopLoop = false;
          }

          to = from;

          // You can add a delay or a condition to break the loop if needed
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      },

      async fetchHistory(from, to) {
        if (from != null && !isNaN(from) && to != null && !isNaN(to)) {
          try {
            const data = await axios
              .get(
                `/user/eco/chart/${this.market.currency}/${this.market.pair}/${
                  this.intervalFetch[this.interval]
                }/${from}/${to}`
              )
              .then((response) => {
                return Object.values(response);
              });

            return data;
          } catch (error) {
            return [];
          }
        } else {
          return [];
        }
      },

      async fetchOHLCV() {
        const data = await axios
          .get(
            `/user/eco/chart/${this.market.currency}/${this.market.pair}/${
              this.intervalFetch[this.interval]
            }/json`
          )
          .then((response) => {
            return response;
          })
          .catch((error) => {
            throw error;
          });

        return data;
      },

      async getBars(params) {
        var pair = this.market.currency + "/" + this.market.pair;
        if (!params.firstDataRequest) {
          return {
            bars: [],
            meta: {
              noData: true,
            },
          };
        }
        if (params.resolution !== this.intervalMap[this.interval]) {
          for (let key in this.intervalMap) {
            if (this.intervalMap[key] === params.resolution) {
              this.interval = key;
            }
          }
        }
        const res = await this.fetchOHLCV(pair);
        this.createEmptyBars();

        if (!res || !res.length) {
          return {
            bars: [],
            meta: { noData: true },
          };
        }

        res.sort((a, b) => a.timestamp - b.timestamp);

        const list = [];
        let lastTimestamp = 0;
        const currentTimestamp = Date.now();
        const barDuration = this.getBarDuration(params.resolution);

        for (let i = 0; i < res.length; i++) {
          const item = res[i];
          if (item.timestamp === undefined) {
            continue;
          }

          // Ensure that each bar has a unique timestamp
          if (item.timestamp === lastTimestamp) {
            item.timestamp += 1;
          }

          if (lastTimestamp !== 0) {
            for (
              let t = lastTimestamp + barDuration;
              t < item.timestamp;
              t += barDuration
            ) {
              const lastBar = list[list.length - 1];
              const emptyBar = {
                time: t,
                open: lastBar.close,
                high: lastBar.close,
                low: lastBar.close,
                close: lastBar.close,
                volume: 0,
              };
              list.push(emptyBar);
            }
          }

          const bar = {
            time: item.timestamp,
            open:
              lastTimestamp === 0
                ? parseFloat(item.open)
                : list[list.length - 1].close,
            high: parseFloat(item.high),
            low: parseFloat(item.low),
            close: parseFloat(item.close),
            volume: parseFloat(item.volume),
          };
          list.push(bar);

          lastTimestamp = item.timestamp;
        }

        // Fill candles from the last received candle to the current time
        for (
          let t = lastTimestamp + barDuration;
          t < currentTimestamp;
          t += barDuration
        ) {
          const lastBar = list[list.length - 1];
          const emptyBar = {
            time: t,
            open: lastBar.close,
            high: lastBar.close,
            low: lastBar.close,
            close: lastBar.close,
            volume: 0,
          };
          list.push(emptyBar);
        }

        list.sort((l, r) => (l.time > r.time ? 1 : -1));
        this.bars = list;
        if (
          window.location.href.indexOf(
            this.market.currency + "-" + this.market.pair
          ) > -1
        ) {
          this.loopHistory(
            this.market.currency,
            this.market.pair,
            this.intervalFetch[this.interval]
          );
        }

        return {
          bars: list,
          meta: {
            noData: !list.length,
          },
        };
      },

      async createEmptyBars() {
        const loop = async () => {
          if (
            window.location.href.indexOf(
              this.market.currency + "-" + this.market.pair
            ) > -1
          ) {
            const hasRealBars = this.bars.some((bar) => bar.volume !== 0);
            try {
              const currentTime = Date.now();
              const barDuration = this.getBarDuration(
                this.intervalMap[this.interval]
              );
              const alignedTime =
                Math.floor(currentTime / barDuration) * barDuration;

              if (!hasRealBars && this.bars.length === 0) {
                const emptyBar = {
                  time: alignedTime,
                  open: this.ecoStore.bestAsk || 0,
                  high: this.ecoStore.bestAsk || 0,
                  low: this.ecoStore.bestAsk || 0,
                  close: this.ecoStore.bestAsk || 0,
                  volume: 0,
                };

                this.datafeed.updateKLine(emptyBar);
                this.bars.push(emptyBar);
              } else if (this.bars.length > 0 && hasRealBars) {
                const lastBar = this.bars[this.bars.length - 1];
                // If the current time exceeds the last bar's time plus the bar duration, create an empty bar
                if (currentTime > lastBar.time + barDuration) {
                  const emptyBar = {
                    time: lastBar.time + barDuration,
                    open: lastBar.close,
                    high: lastBar.close,
                    low: lastBar.close,
                    close: lastBar.close,
                    volume: 0,
                  };

                  this.datafeed.updateKLine(emptyBar);
                  this.bars.push(emptyBar);
                }
              }
              setTimeout(loop, 1000);
            } catch (e) {
              console.log(e);
            }
          }
        };
        loop();
      },

      async updateBar(bar) {
        const lastBar = this.bars[this.bars.length - 1];
        const barDuration = this.getBarDuration(
          this.intervalMap[this.interval]
        );

        const timeframeStart = lastBar.time - (lastBar.time % barDuration);
        const isWithinTimeframe =
          bar.timestamp >= timeframeStart &&
          bar.timestamp < timeframeStart + barDuration;

        if (isWithinTimeframe) {
          lastBar.high = Math.max(lastBar.high, parseFloat(bar.high));
          lastBar.low = Math.min(lastBar.low, parseFloat(bar.low));
          lastBar.close = parseFloat(bar.close);
          lastBar.volume += parseFloat(bar.volume);
          this.datafeed.updateKLine(lastBar);
        } else if (bar.timestamp > lastBar.time) {
          const newBar = {
            time: bar.timestamp,
            open: lastBar.close,
            high: parseFloat(bar.high),
            low: parseFloat(bar.low),
            close: parseFloat(bar.close),
            volume: parseFloat(bar.volume),
          };
          this.datafeed.updateKLine(newBar);
          this.bars.push(newBar);
        }
      },
      createDataFeed() {
        return new DataFeed({
          getBars: (params) => this.getBars(params),
          fetchResolveSymbol: () => this.resolveSymbol(),
          fetchConfiguration: () => {
            return new Promise((resolve) => {
              resolve({
                supported_resolutions: this.supportedResolutions,
              });
            });
          },
        });
      },
      resolveSymbol() {
        return new Promise((resolve) => {
          var pair = this.market.currency + "/" + this.market.pair;
          resolve({
            ticker: pair,
            name: pair,
            full_name: pair,
            description: pair,
            type: "crypto",
            session: "24x7",
            exchange: gnl.sitename.toUpperCase(),
            listed_exchange: gnl.sitename.toUpperCase(),
            timezone: "Etc/UTC",
            format: "price",
            minmov: 1,
            has_intraday: true,
            supported_resolutions: this.supported_resolutions,
            volume_precision: 2,
            data_status: "streaming",
            pricescale: 100,
          });
        });
      },
      getBarDuration(resolution) {
        switch (resolution) {
          case "1":
            return 60 * 1000;
          case "3":
            return 3 * 60 * 1000;
          case "5":
            return 5 * 60 * 1000;
          case "15":
            return 15 * 60 * 1000;
          case "30":
            return 30 * 60 * 1000;
          case "60":
            return 60 * 60 * 1000;
          case "240":
            return 4 * 60 * 60 * 1000;
          case "720":
            return 12 * 60 * 60 * 1000;
          case "D":
            return 24 * 60 * 60 * 1000;
          case "W":
            return 7 * 24 * 60 * 60 * 1000;
          case "M":
            return 30 * 24 * 60 * 60 * 1000;
          default:
            return 60 * 1000;
        }
      },
      getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      },
      initTradingView() {
        const tvChartContainer = document.getElementById("tv_chart_container");
        if (tvChartContainer) {
          tvChartContainer.remove();
        }

        const newChartContainer = document.createElement("div");
        newChartContainer.id = "tv_chart_container";
        newChartContainer.style.height = "100%";

        const creatable = document.querySelector("#creatable");
        creatable.appendChild(newChartContainer);
        var pair = this.market.currency + "/" + this.market.pair;
        this.widget = new TvWidget({
          //debug: true,
          fullscreen: false,
          width: "100%",
          height: "100%",
          symbol: pair,
          interval: this.intervalMap[this.interval],
          container_id: "tv_chart_container",
          datafeed: this.datafeed,
          library_path: "/charting_library/",
          locale: "en",
          theme: theme == "dark" ? "Dark" : "Light",
          timezone: "Etc/UTC",
          allow_symbol_change: false,
          charts_storage_api_version: "1.1",
          client_id: "tradingview.com",
          user_id: "public_user_id",
          disabled_features: [
            "header_compare",
            "study_dialog_search_control",
            "symbol_search_hot_key",
            "header_symbol_search",
            "go_to_date",
            "compare_symbol",
            "timezone_menu",
            "timeframes_toolbar",
            "header_screenshot",
          ],
          enabled_features: [
            "dont_show_boolean_study_arguments",
            "use_localstorage_for_settings",
            "save_chart_properties_to_local_storage",
            "side_toolbar_in_fullscreen_mode",
            "hide_last_na_study_output",
            "constraint_dialogs_movement",
            "hide_left_toolbar_by_default",
          ],
        });
        this.widget.onChartReady(() => {
          this.chart = this.widget.chart();
        });
      },
    },
  };
</script>
