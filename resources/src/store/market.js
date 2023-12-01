import { defineStore } from "pinia";
export const useMarketStore = defineStore("market", {
    state: () => ({
        markets: [],
        main_markets: [],
        favs: [],
        ecos: [],
        bestAsk: null,
        bestBid: null,
        exchange: null,
        widget: null,
        market: null,
        currencyBalance: null,
        pairBalance: null,
        wallet_type: null,
        loading: false,
    }),

    actions: {

        async fetch_markets() {
            const response = await axios.get("/data/markets/markets.json");

            // Check if provider is found in the response data
            if (response.hasOwnProperty(provider)) {
                this.markets = response[provider];
            } else {
                // Make a new call to '/cron/provider/marketsToTable'
                await axios.get(`/cron/provider/marketsToTable`);

                // Fetch markets data again
                const newResponse = await axios.get(
                    "/data/markets/markets.json"
                );

                // Check if provider is found in the new response data
                if (newResponse.hasOwnProperty(provider)) {
                    this.markets = newResponse[provider];
                } else {
                    // Handle the case when the provider is still not found
                    console.error(
                        "Provider not found after updating markets data"
                    );
                }
            }
        },
        spotMarketsData(markets) {
            let datas = {};

            for (const market of Object.values(markets).filter(m => m['spot'])) {
                if (!datas) {
                    datas = {};
                }
                if (!datas[market['quote']]) {
                    datas[market['quote']] = {};
                }

                datas[market['quote']][market['symbol']] = market;
            }

            return datas;
        },
        futureMarketsData(markets) {
            let datas = {};

            for (const market of Object.values(markets).filter(m => m['swap'])) {
                if (!datas) {
                    datas = {};
                }
                if (!datas[market['quote']]) {
                    datas[market['quote']] = {};
                }

                datas[market['quote']][market['symbol']] = market;
            }

            return datas;
        },
        async fetch_favs() {
            await axios.post("/user/watchlist/data").then((response) => {
                this.favs = response.favs.sort((a, b) =>
                    a.currency.localeCompare(b.currency)
                );
            });
        },
        async fetch_main_markets() {
            await axios.get("/user/eco/market/pair").then((response) => {
                this.main_markets = response.markets;
                // this.main_futures = response.futures;
            });
        },
        async fetch_ecos() {
            await axios.get("/user/eco/market/symbol").then((response) => {
                this.ecos = response;
            });
        },
        async fetchWallet(coin, type) {
            await axios
                .post("/user/fetch/wallet", {
                    type: this.wallet_type,
                    symbol: coin,
                })
                .then((response) => {
                    if (type == 1) {
                        this.currencyBalance = response.balance;
                    } else if (type == 2) {
                        this.pairBalance = response.balance;
                    }
                });
        },
        async createWallet(coin, type) {
            this.loading = true;
            await axios
                .post("/user/wallet/store", {
                    type: this.wallet_type,
                    symbol: coin,
                })
                .then((response) => {
                    this.fetchWallet(coin, type);
                    $toast[response.type](response.message);
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async executeTrade(
            orderType,
            tradeType,
            price,
            amount,
            currency,
            pair
        ) {
            this.loading = true;
            const isMarketOrder = tradeType === "market";
            const isBuyOrder = orderType === "BUY";

            if (
                (isMarketOrder &&
                    (isBuyOrder ? this.bestAsk : this.bestBid) > 0) ||
                (!isMarketOrder && price > 0)
            ) {
                return axios
                    .post("/user/trade/store", {
                        amount: Number.parseFloat(amount),
                        price: isMarketOrder
                            ? isBuyOrder
                                ? Number.parseFloat(this.bestAsk)
                                : Number.parseFloat(this.bestBid)
                            : Number.parseFloat(price),
                        symbol: currency,
                        currency: pair,
                        type: tradeType,
                        side: orderType,
                        wallettype: this.wallet_type,
                    })
                    .then((response) => {
                        if (response.messages) {
                            response.message.forEach((msg) => {
                                $toast[response.type](msg);
                            });
                        } else {
                            $toast[response.type](response.message);
                        }
                        this.fetchWallet(currency, 1);
                        this.fetchWallet(pair, 2);
                    })
                    .catch((error) => {
                        // $toast.error(error.response.data.message);
                        console.log(error);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } else {
                const errorMsg = isMarketOrder
                    ? isBuyOrder
                        ? "No Market Price, Please Do Limit Order"
                        : "Please wait for orderbook to load"
                    : "Please set a valid price";
                $toast.error(errorMsg);
                this.loading = false;
            }
        },
    },
    persist: true,
});
