import { defineStore } from "pinia";

export const useBinaryStore = defineStore("binary", {
    state: () => ({
        funding_wallets: null,
        perc: [],
        trade: [],
        tradelogs: [],
        practicelogs: [],
        deposit: null,
        withdraw: null,
        transaction: null,
        tradePositive: 0,
        totaltrades: 0,
        practice_Positive: 0,
        practice_totaltrades: 0,
        practice_contracts: [],
        practice_datas: [],
        trade_contracts: [],
        trade_datas: [],
    }),

    actions: {
        async fetch() {
            const response = await axios.post("/user/fetch/binary/data");
            const {
                trade: {
                    Win,
                    Draw,
                    Lose,
                    practice_Win,
                    practice_Draw,
                    practice_Lose,
                },
            } = response;

            this.funding_wallets = response.funding_wallets;
            this.perc = response.perc;
            this.trade = response.trade;
            this.tradelogs = response.tradelogs;
            this.practicelogs = response.practicelogs;
            this.deposit = response.deposit;
            this.withdraw = response.withdraw;
            this.transaction = response.transaction;

            this.totaltrade = (Win ?? 0) + (Lose ?? 0) + (Draw ?? 0);
            this.tradePositive = `${Win - Lose ?? 0}`;
            this.totaltrades = `${Win + Lose + Draw ?? 0}`;
            this.practice_totaltrades = `${
                practice_Win + practice_Lose + practice_Draw ?? 0
            }`;
            this.practice_Positive = `${practice_Win - practice_Lose ?? 0}`;
        },
        async fetch_practice_contracts() {
            await axios
                .post("/user/fetch/binary/practice/contracts")
                .then((response) => {
                    (this.practice_contracts = response.contracts),
                        (this.practice_datas = response.datas);
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                });
        },
        async fetch_trade_contracts() {
            await axios
                .post("/user/fetch/binary/trade/contracts")
                .then((response) => {
                    (this.trade_contracts = response.contracts),
                        (this.trade_datas = response.datas);
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                });
        },
    },
    persist: true,
});
