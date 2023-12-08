import { defineStore } from "pinia";

export const useWalletsStore = defineStore("wallet", {
    state: () => ({
        wallets: [],
        currencies: [],
        futureCurrencies: [],
        main_wallets: [],
        main_currencies: [],
        SelectedWallet: null,
        trading_wallet: 0,
        loading: false,
        isShowModal: {
            newWallet: false,
            newMainWallet: false,
            deposit: false,
            withdraw: false,
            transfer: false,
        },
        timer: [],
        mianLogs: [],
        depositStatus: "unpaid",
        interval: null,
        timeCountdown: 30 * 60,
        tab: {
            deposit: null,
            withdraw: null,
        },
        wallet: [],
        wallet_trx: [],
        addresses: {},
        currency: [],
        curr: [],
        dp: null,
        withdrawfee: null,
        network: null,
        missing: [],
    }),

    actions: {
        async fetch() {
            await axios.post("/user/fetch/wallets").then((response) => {
                this.wallets = response.wallets;
                this.currencies = response.currencies;
                this.futureCurrencies = response.futureCurrencies;
            });
        },
        async fetchWallet(type, symbol, address) {
            await axios
                .post(
                    "/user/fetch/wallet/" + type + "/" + symbol + "/" + address
                )
                .then((response) => {
                    (this.wallet = response.wal),
                        (this.wallet_trx = response.wal_trx),
                        (this.addresses = response.addresses),
                        (this.curr = response.curr),
                        (this.currency = response.currency),
                        (this.dp = response.dp);
                });
        },
        async fetchFutureWallet(symbol) {
            await axios
                .get(
                    "/user/futures/wallet/" + symbol
                )
                .then((response) => {
                    (this.wallet = response.wallet);
                    (this.wallet_trx = response.transactions);
                });
        },
        async withdraw(id, memo, symbol, address, amount) {
            if (id == "TRX") {
                this.network = "TRC20";
            } else if (id == "ETH") {
                this.network = "ERC20";
            } else if (id == "BSC") {
                this.network = "BEP20";
            } else {
                this.network = id;
            }
            if (provider == "binance" || provider == "binanceus") {
                this.withdrawfee = this.addresses[id].chain.withdrawFee;
            }
            this.loading = true;
            await axios
                .post("/user/wallet/withdraw", {
                    symbol: symbol,
                    recieving_address: address,
                    memo: memo,
                    amount: amount,
                    chain: this.network,
                    fee: this.withdrawfee,
                })
                .then((response) => {
                    $toast[response.type](response.message);
                    (this.wallet_trx = response.wallet_trx);
                    this.fetch();
                })
                .catch((error) => {
                    $toast.error('Something went wrong. Please try again later.');
                    console.log(error);
                })
                .finally(() => {
                    this.loading = false;
                    this.closeModal("withdraw");
                });
        },
        closeModal(type) {
            if (type == "newWallet") {
                this.isShowModal.newWallet = false;
            } else if (type == "newMainWallet") {
                this.isShowModal.newMainWallet = false;
            } else if (type == "deposit") {
                if (this.depositStatus == "pending") {
                    $toast.error(
                        "You can't close this modal while your deposit is pending."
                    );
                } else {
                    this.isShowModal.deposit = false;
                    this.depositStatus = "unpaid";
                }
            } else if (type == "withdraw") {
                this.isShowModal.withdraw = false;
            } else if (type == "transfer") {
                this.isShowModal.transfer = false;
            }
        },
        showModal(type) {
            if (type == "newWallet") {
                this.isShowModal.newWallet = true;
            } else if (type == "newMainWallet") {
                this.isShowModal.newMainWallet = true;
            } else if (type == "deposit") {
                this.isShowModal.deposit = true;
            } else if (type == "withdraw") {
                this.isShowModal.withdraw = true;
            } else if (type == "transfer") {
                this.isShowModal.transfer = true;
            }
        },
        async create(symbol, type = null) {
            this.loading = true;
            let url = type == "futures" ? "/user/futures/wallet/store" : "/user/wallet/store";
            axios
                .post(url, {
                    type: type ?? this.type,
                    symbol: symbol,
                })
                .then((response) => {
                    this.fetch();
                    $toast[response.type](response.message);
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async fetch_main() {
            await axios.get("/user/eco/wallets").then((response) => {
                this.main_currencies = response.currencies;
            });
        },
        async create_main(data) {
            this.loading = true;
            axios
                .post("/user/eco/wallet/store", {
                    chain: data.chain,
                    symbol: data.symbol,
                    postfix: data.postfix,
                    network: data.network,
                })
                .then((response) => {
                    if (Array.isArray(response)) {
                        // If the response is an array, loop through each item in the array and show a toast message
                        response.forEach(item => {
                            $toast[item.type](item.message);
                        });
                    } else {
                        // If the response is a single object, show a toast message
                        $toast[response.type](response.message);
                    }
                    this.fetch_main();
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                    this.closeModal("newMainWallet");
                });
        },
        async fetchMainWalletLogs(symbol, address) {
            await axios
                .get("/user/eco/wallet/logs/" + symbol + "/" + address)
                .then((response) => {
                    if (response.logs.length > this.mianLogs.length) {
                        this.fetchMainWallet(symbol, address);
                    }
                    this.mianLogs = response.logs;
                });
        },
        async fetchMainWallet(symbol, address) {
            await axios
                .get("/user/eco/wallet/" + symbol + "/" + address)
                .then((response) => {
                    this.wallet = response.wal;
                    this.mianLogs = response.logs;
                    this.addresses = response.addresses;
                    this.missing = response.missing;
                });
        },
        async transfer(type, symbol, amount) {
            if (amount > 0) {
                this.loading = true;
                await axios
                    .post("/user/wallet/transfer", {
                        symbol: symbol,
                        amount: amount,
                        type: type
                    })
                    .then((response) => {
                        $toast[response.type](response.message);
                        this.wallet = response.wal;
                        this.wallet_trx = response.wal_trx;
                        this.fetch();
                    })
                    .catch((error) => {
                        $toast.error(error.response.data.message);
                    })
                    .finally(() => {
                        this.loading = false;
                        this.closeModal("transfer");
                    });
            } else {
                $toast.error("Amount should be higher than 0");
            }
        },

        async deposit(wallet, trx_hash, type, symbol, address) {
            this.loading = true;
            await axios
                .post("/user/wallet/deposit", {
                    symbol: symbol,
                    recieving_address: wallet.address,
                    address: trx_hash,
                    chain: wallet.network,
                })
                .then((response) => {
                    this.depositStatus = response.deposit_status;
                    $toast[response.type](response.message);
                    if (response.deposit_status == "pending") {
                        this.fetch();
                        this.startTimer(trx_hash, type, symbol, address);
                    }
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        startTimer(trx_hash, type, symbol, address) {
            // Timer for verifying transaction status
            this.interval = setInterval(() => {
                axios
                    .get(`/user/wallet/deposit/verify/${trx_hash}`)
                    .then((response) => {
                        if (response.deposit_status) {
                            clearInterval(this.interval);
                            clearInterval(this.timerInterval);
                            this.depositStatus = response.deposit_status;
                            $toast[response.type](response.message);
                            if (response.deposit_status === "completed") {
                                this.fetchWallet(type, symbol, address);
                            }
                        }
                    });
            }, 30000);

            // Timer for updating countdown timer
            this.timerInterval = setInterval(() => {
                this.timeCountdown--;
                if (this.timeCountdown <= 0) {
                    this.loading = false;
                    this.depositStatus = "expired";
                    clearInterval(this.interval);
                    clearInterval(this.timerInterval);
                }
            }, 1000);
        },

        async cancelDeposit(trx_hash) {
            await axios
                .get("/user/wallet/deposit/cancel/" + trx_hash)
                .then((response) => {
                    $toast[response.type](response.message);
                    this.fetch();
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                    this.depositStatus = "canceled";
                    clearInterval(this.interval);
                    clearInterval(this.timerInterval);
                });
        },
    },
    persist: true,
});
