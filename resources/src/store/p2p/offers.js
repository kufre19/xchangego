import { defineStore } from "pinia";

export const useP2POfferStore = defineStore({
    id: "offers",
    state: () => ({
        offers: [],
        sellerInitials: "",
        sellerUsername: "",
        completedOrders: 0,
        completionRate: 0,
    }),
    actions: {
        async fetch() {
            this.offers = await axios.get("/user/p2p/offers");
        },
        setSellerInitials(initials) {
            this.sellerInitials = initials;
        },
        setSellerUsername(username) {
            this.sellerUsername = username;
        },
        setCompletedOrders(orders) {
            this.completedOrders = orders;
        },
        setCompletionRate(rate) {
            this.completionRate = rate;
        },
    },
});
