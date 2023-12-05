import { defineStore } from "pinia";

export const useEcoStore = defineStore("eco", {
    state: () => ({
        marketOrder: false,
        bestAsk: 0,
        bestBid: 0,
        market: [],
        open_orders: [],
        closed_orders: [],
        walletSymbol: null,
        walletCurrency: null,
        loading: false,
        timeframe: localStorage.getItem("lastTimeframe") || "HOUR_1",
        precisionAmount: 6,
        precisionPrice: 6,
    }),

    actions: {
        async fetch(currency, pair) {
            await axios
                .post("/user/eco/index", {
                    currency: currency,
                    pair: pair,
                })
                .then((response) => {
                    if (response.message == "Verify your identify first!") {
                        window.location.href = "/user/kyc";
                    }
                    (this.market = response);
                });
        },
        async fetchOrders() {
            await axios
                .post("/user/eco/orders", {
                    currency: this.market.currency,
                    currency_chain: this.market.currency_chain,
                    pair: this.market.pair,
                    pair_chain: this.market.pair_chain,
                })
                .then((response) => {
                    this.open_orders = response.open_orders;
                    this.closed_orders = response.closed_orders;
                    if (this.open_orders.errorCode) {
                        this.fetchOrders();
                    }
                })
                .catch((error) => { });
        },
        closeModal() {
            this.isShowModal = false;
        },
        showModal() {
            this.isShowModal = true;
        },
        async fetchWallets() {
            this.fetchWallet(this.market.currency, this.market.currency_chain);
            this.fetchWallet(this.market.pair, this.market.pair_chain);
        },
        async fetchWallet(coin, chain) {
            await axios
                .post("/user/eco/wallet/balance", {
                    symbol: coin.includes("_")
                        ? coin.substring(0, coin.indexOf("_"))
                        : coin,
                    postfix: coin.includes("_")
                        ? coin.substring(coin.indexOf("_"))
                        : null,
                    chain: chain,
                })
                .then((response) => {
                    if (coin == this.market.currency) {
                        this.walletSymbol = response.balance;
                    } else if (coin == this.market.pair) {
                        this.walletCurrency = response.balance;
                    }
                })
                .catch((err) => {
                    this.fetchWallet(
                        coin.includes("_")
                            ? coin.substring(0, coin.indexOf("_"))
                            : coin,
                        chain
                    );
                });
        },

        async createWallet(coin, chain) {
            this.loading = true;
            await axios
                .post("/user/eco/wallet/store", {
                    chain: chain,
                    network: chain,
                    symbol: coin.includes("_")
                        ? coin.substring(0, coin.indexOf("_"))
                        : coin,
                    postfix: coin.includes("_")
                        ? coin.substring(coin.indexOf("_"))
                        : null,
                })
                .then((response) => {
                    if (Array.isArray(response)) {
                        response.forEach(item => {
                            $toast[item.type](item.message);
                        });
                    } else {
                        $toast[response.type](response.message);
                    }
                    this.fetchWallet(coin, chain);
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async executeTrade(orderType, tradeType, price, amount) {
            this.loading = true;
            const isMarketOrder = tradeType === "market";
            const isBuyOrder = orderType === "BUY";

            if (
                (isMarketOrder &&
                    (isBuyOrder ? this.bestAsk : this.bestBid) > 0) ||
                (!isMarketOrder && price > 0)
            ) {
                await axios
                    .post("/user/eco/trade/store", {
                        amount: Number.parseFloat(amount),
                        price: isMarketOrder
                            ? isBuyOrder
                                ? Number.parseFloat(this.bestAsk)
                                : Number.parseFloat(this.bestBid)
                            : Number.parseFloat(price),
                        symbol: this.market.currency,
                        symbol_chain: this.market.currency_chain,
                        currency: this.market.pair,
                        currency_chain: this.market.pair_chain,
                        tradeType: tradeType,
                        type: orderType,
                        taker: isBuyOrder ? this.market.taker : undefined,
                        maker: !isBuyOrder ? this.market.maker : undefined,
                        timeframe: this.timeframe,
                    })
                    .then((response) => {
                        if (response.messages) {
                            response.message.forEach((msg) => {
                                $toast[response.type](msg);
                            });
                        } else {
                            $toast[response.type](response.message);
                            this.fetchOrders();
                            // manually update the wallet balances
                            const tradeAmount = Number.parseFloat(amount);
                            const tradePrice = isMarketOrder
                                ? isBuyOrder
                                    ? Number.parseFloat(this.bestAsk)
                                    : Number.parseFloat(this.bestBid)
                                : Number.parseFloat(price);
                            if (isBuyOrder) {
                                this.walletCurrency -= tradeAmount * tradePrice; // subtract from the currency wallet
                            } else {
                                this.walletSymbol -= tradeAmount; // subtract from the symbol wallet
                            }

                            this.fetchWallets();
                        }
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
