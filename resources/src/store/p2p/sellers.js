import { defineStore } from "pinia";
import axios from "axios";

export const useP2PSellerStore = defineStore("seller", {
    state: () => ({
        allOffers: [],
        openOrders: [],
        closedOrders: [],
        methods: [],
        statistics: [],
        fiat: [],
        isSeller: true,
        wallet: null,
        p2p: null,
        loading: true,
    }),
    actions: {
        async fetch() {
            const response = await axios.get("/user/p2p/seller");
            this.isSeller = response.is_seller;
            this.allOffers = response.offers;
            this.openOrders = response.open_orders;
            this.closedOrders = response.closed_orders;
            this.methods = response.payment_methods;
            this.fiat = response.fiat;
            this.statistics = response.statistics;
            this.wallet = response.wallet;
            this.p2p = response.p2p;
            this.loading = false;
        },
    },
});
