import { defineStore } from "pinia";
export const useMarketStore = defineStore("market", {
    state: () => ({
        markets: [],
        futures: [],
        main_markets: [],
        main_markets_volume: [],
        favs: [],
        ecos: [],
        bestAsk: null,
        bestBid: null,
        exchange: null,
        futuresExchange: null,
        widget: null,
        market: null,
        future: null,
        currencyBalance: null,
        pairBalance: null,
        wallet_type: null,
        loading: false,
        closePositionType: null,
        isShowModal: {
            closePositionMarket: false,
            takeProfitStopLoss: false,
        },
    }),

    actions: {
        closeModal(type) {
            this.isShowModal[type] = false;
        },
        showModal(type) {
            this.isShowModal[type] = true;
        },
        async fetch_markets() {
            let cachedMarkets = localStorage.getItem('markets');
            let cachedMarketsTimestamp = localStorage.getItem('marketsTimestamp');
            let currentTime = new Date().getTime();

            if (cachedMarkets && cachedMarketsTimestamp) {
                if (currentTime - cachedMarketsTimestamp <= 10 * 60 * 1000) {
                    this.markets = JSON.parse(cachedMarkets);
                    return;
                }
            }

            if (this.markets.length === 0) {
                this.markets = await axios.get("/data/markets/markets.json");
                localStorage.setItem('markets', JSON.stringify(this.markets));
                localStorage.setItem('marketsTimestamp', currentTime.toString());
            }
        },

        async fetch_futures() {
            let cachedFutures = localStorage.getItem('futures');
            let cachedFuturesTimestamp = localStorage.getItem('futuresTimestamp');
            let currentTime = new Date().getTime();

            if (cachedFutures && cachedFuturesTimestamp) {
                if (currentTime - cachedFuturesTimestamp <= 10 * 60 * 1000) {
                    this.futures = JSON.parse(cachedFutures);
                    return;
                }
            }

            if (this.futures.length === 0) {
                this.futures = await axios.get("/data/markets/futures.json");
                localStorage.setItem('futures', JSON.stringify(this.futures));
                localStorage.setItem('futuresTimestamp', currentTime.toString());
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
            });
        },
        async fetch_main_markets_volume() {
            await axios.get("/user/eco/market/volume").then((response) => {
                this.main_markets_volume = response;
            });
        },
        async fetch_ecos() {
            await axios.get("/user/eco/market/symbol").then((response) => {
                this.ecos = response;
            });
        },
        async fetchWallet(coin, type, market = "spot") {
            let url = market === "futures" ? "/user/futures/wallet/balance" : "/user/fetch/wallet";
            let walletType = null;
            if (market === "spot") {
                walletType = Number(tradingWallet) === 1 ? 'trading' : 'funding';
            } else {
                walletType = 'futures';
            }
            await axios
                .post(url, {
                    type: walletType,
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
        async createWallet(coin, type, market = "spot") {
            this.loading = true;
            let url = market === "futures" ? "/user/futures/wallet/store" : "/user/wallet/store";
            let walletType = null;
            if (market === "spot") {
                walletType = Number(tradingWallet) === 1 ? 'trading' : 'funding';
            } else {
                walletType = 'futures';
            }
            await axios
                .post(url, {
                    type: walletType,
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
            pair,
            leverage = null,
            id = null,
            size = null
        ) {
            this.loading = true;
            const isMarketOrder = tradeType === "market";
            const isBuyOrder = orderType === "BUY";
            const isFuturesOrder = leverage !== null;

            let url = isFuturesOrder ? '/user/futures/trade/store' : '/user/trade/store';
            let walletType = null;
            if (isFuturesOrder) {
                walletType = 'futures';
            } else {
                walletType = Number(tradingWallet) === 1 ? 'trading' : 'funding';
            }
            if (
                (isMarketOrder &&
                    (isBuyOrder ? this.bestAsk : this.bestBid) > 0) ||
                (!isMarketOrder && price > 0)
            ) {
                return axios
                    .post(url, {
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
                        wallettype: walletType,
                        leverage: leverage,
                        id: id,
                        size: size
                    })
                    .then((response) => {
                        if (response.messages) {
                            response.message.forEach((msg) => {
                                $toast[response.type](msg);
                            });
                        } else {
                            $toast[response.type](response.message);
                        }
                        if (!isFuturesOrder) {
                            this.fetchWallet(currency, 1);
                            this.fetchWallet(pair, 2);
                        } else {
                            this.fetchWallet(pair, 2, "futures");
                        }
                    })
                    .catch((error) => {
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
