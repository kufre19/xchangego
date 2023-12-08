import { defineStore } from "pinia";
export const useForexStore = defineStore("forex", {
    state: () => ({
        account: null,
        forex_log: 0,
        forex_logs: [],
        forex_investment: [],
        investment_logs: [],
        investment_logs_amount: null,
        investment_logs_profit: null,
        investment: null,
        wallets: [],
        wallet: [],
        isShowModal: {
            deposit: false,
            withdraw: false,
            selectInvestment: false,
        },
        selected_inv: null,
        loading: false,
        depositing: false,
        withdrawing: false,
    }),

    actions: {
        async fetch() {
            await axios.post("/user/fetch/forex").then((response) => {
                if (response.message == "Verify your identify first!") {
                    window.location.href = "/user/kyc";
                }
                if (response.error != null) {
                    $toast.error(response.error);
                }
                (this.account = response.account),
                    (this.forex_logs = response.forex_logs),
                    (this.forex_log = response.forex_log),
                    (this.forex_investment = response.forex_investment),
                    (this.investment_logs = response.investment_logs),
                    (this.investment_logs_amount =
                        response.investment_logs_amount),
                    (this.investment_logs_profit =
                        response.investment_logs_profit),
                    (this.investment = response.investment),
                    (this.wallets = response.wallets),
                    (this.wallet = response.wallet);
            });
        },
        closeModal(type) {
            if (type == "deposit") {
                this.isShowModal.deposit = false;
            } else if (type == "withdraw") {
                this.isShowModal.withdraw = false;
            } else if (type == "selectInvestment") {
                this.isShowModal.selectInvestment = false;
            }
        },
        showModal(type) {
            if (type == "deposit") {
                this.isShowModal.deposit = true;
            } else if (type == "withdraw") {
                this.isShowModal.withdraw = true;
            } else if (type == "selectInvestment") {
                this.isShowModal.selectInvestment = true;
            }
        },
        async Deposit(wallet, amount) {
            this.depositing = true;
            axios
                .post("/user/forex/deposit", {
                    symbol: wallet,
                    amount: amount,
                })
                .then((response) => {
                    $toast[response.type](response.message);
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.depositing = false;
                    this.fetch();
                    this.closeModal("deposit");
                });
        },
        async Withdraw(wallet, amount) {
            this.withdrawing = true;
            await axios
                .post("/user/forex/withdraw", {
                    symbol: wallet,
                    amount: amount,
                })
                .then((response) => {
                    $toast[response.type](response.message);
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.withdrawing = false;
                    this.fetch();
                    this.closeModal("withdraw");
                });
        },
        selectInvestment(item) {
            this.selected_inv = item;
        },
        async submitInvestment(symbol, amount) {
            this.loading = true;
            await axios
                .post("/user/forex/store", {
                    investment_id: this.selected_inv.id,
                    symbol: symbol,
                    amount: amount,
                })
                .then((response) => {
                    $toast[response.type](response.message);
                    this.forex_logs = response.meta;
                })
                .catch((error) => {
                    console.log(error);
                    $toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                    this.fetch();
                });
        },
        async createAccount() {
            await axios
                .post("/user/forex/create")
                .then((response) => {
                    $toast[response.type](response.message);
                    this.fetch();
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                });
        },
        async fetchWallet() {
            await axios
                .post("/user/fetch/wallet", {
                    type: "funding",
                    symbol: "USDT",
                })
                .then((response) => {
                    this.wallet = response.balance;
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                });
        },
        async createWallet() {
            await axios
                .post("/user/wallet/store", {
                    type: "funding",
                    symbol: "USDT",
                })
                .then((response) => {
                    this.fetchWallet();
                    $toast[response.type](response.message);
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
    persist: true,
});
