import { defineStore } from "pinia";
export const useStakingStore = defineStore("staking", {
    state: () => ({
        coins: [],
        logs: [],
        coinlogs: [],
        assets: null,
        last_profit: null,
        total_profit: null,
        wallet: null,
        coin: null,
        loading: false,
        isShowModal: {
            stake: false,
            cancel: false,
            claim: false,
        },
    }),

    actions: {
        async fetch() {
            await axios.get("/user/fetch/staking").then((response) => {
                if (response.message == "Verify your identify first!") {
                    window.location.href = "/user/kyc";
                }
                (this.coins = response.coins),
                    (this.logs = response.logs),
                    (this.coinlogs = response.coinlogs),
                    (this.assets = response.assets),
                    (this.last_profit = response.last_profit),
                    (this.total_profit = response.total_profit);
            });
        },
        async setCoin(row, type) {
            this.coin = row;
            this.fetchWallet(row);
            this.showModal(type);
        },
        async fetchWallet(coin) {
            await axios
                .post("/user/fetch/staking/wallet", {
                    coin: coin,
                })
                .then((response) => {
                    this.wallet = response.wallet;
                });
        },
        async createWallet(coin) {
            this.loading = true;
            await axios
                .post("/user/wallet/store", {
                    type: 'funding',
                    symbol: coin.symbol,
                })
                .then((response) => {
                    this.fetchWallet(coin);
                    $toast[response.type](response.message);
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        closeModal(type) {
            if (type == "stake") {
                this.isShowModal.stake = false;
            } else if (type == "cancel") {
                this.isShowModal.cancel = false;
            } else if (type == "claim") {
                this.isShowModal.claim = false;
            }
        },
        showModal(type) {
            if (type == "stake") {
                this.isShowModal.stake = true;
            } else if (type == "cancel") {
                this.isShowModal.cancel = true;
            } else if (type == "claim") {
                this.isShowModal.claim = true;
            }
        },
        async Stake(amount) {
            this.loading = true;
            await axios
                .post("/user/staking/store", {
                    symbol: this.coin.symbol,
                    coin_id: this.coin.id,
                    amount: amount,
                })
                .then((response) => {
                    $toast[response.type](response.message);
                    this.fetch();
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.closeModal("stake");
                    this.loading = false;
                });
        },
        async CancelStake() {
            this.loading = true;
            await axios
                .post("/user/staking/cancel", {
                    symbol: this.coin.symbol,
                    coin_id: this.coin.id,
                })
                .then((response) => {
                    $toast[response.type](response.message);
                    this.fetch();
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.closeModal("cancel");
                    this.loading = false;
                });
        },
        async ClaimStake() {
            this.loading = true;
            await axios
                .post("/user/staking/claim", {
                    symbol: this.coin.symbol,
                    coin_id: this.coin.id,
                })
                .then((response) => {
                    $toast[response.type](response.message);
                    this.fetch();
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.closeModal("claim");
                    this.loading = false;
                });
        },
    },
    persist: true,
});
