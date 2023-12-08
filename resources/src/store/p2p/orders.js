import { defineStore } from "pinia";

export const useP2POrderStore = defineStore("p2p", {
    state: () => ({
        order: [],
        orders: [],
        userOrders: [],
        review: "",
        error: null,
    }),
    actions: {
        async fetch() {
            await axios.get("/user/p2p/orders").then((response) => {
                this.orders = response;
            });
        },
        async fetchOrder(orderId) {
            try {
                const res = await axios.get(`/user/p2p/orders/${orderId}`);
                this.order = res;
                this.error = null; // clear any previous error
            } catch (error) {
                this.error = error.response.data.message;
                this.order = []; // set the order to an empty array to indicate that it is invalid
            }
        },
        async fetchUserOrders() {
            this.userOrders = await axios.get("/user/p2p/orders/user");
        },
        async confirmOrder(orderId) {
            await axios.put(`/user/p2p/orders/${orderId}/confirm`);
        },
        async cancelOrder(orderId) {
            await axios.put(`/user/p2p/orders/${orderId}/cancel`);
        },
        async submitReview(orderId, review) {
            await axios.post(`/user/p2p/orders/${orderId}/review`, { review });
        },
    },
});
