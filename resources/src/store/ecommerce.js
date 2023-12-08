import { defineStore } from "pinia";

export const useEcommerceStore = defineStore("ecommerce", {
    state: () => ({
        search: null,
        orders: [],
        products: [],
        categories: [],
        tags: [],
        wishlists: [],
        wallet: null,
    }),

    actions: {
        async fetch() {
            await axios.post("/user/fetch/bot").then((response) => {
                if (response.message == "Verify your identify first!") {
                    window.location.href = "/user/kyc";
                }
                (this.logs = response.bot_contracts),
                    (this.bot_contracts_count_running =
                        response.bot_contracts_count_running),
                    (this.bot_contracts_count_completed =
                        response.bot_contracts_count_completed),
                    (this.bot_contracts_count_amount =
                        response.bot_contracts_count_amount),
                    (this.profit = response.profit);
            });
        },
        async fetch_products() {
            await axios.get("/user/marketplace/fetch").then((response) => {
                this.wallet = response.wallet;
                this.products = response.products;
                this.categories = response.categories;
                this.tags = Array.from(response.tags).filter(
                    (tag) => tag !== ""
                );
                this.tags = [...new Set(this.tags.filter((tag) => tag))];
                const uniqueProducts = [];
                const ids = new Set();
                this.products.forEach((product) => {
                    if (!ids.has(product.id)) {
                        uniqueProducts.push(product);
                        ids.add(product.id);
                    }
                });
                this.products = uniqueProducts;
            });
        },
        async fetch_orders() {
            this.orders = await axios.get("/user/marketplace/order-history");
        },
        async fetch_wishlists() {
            await axios.get("/user/marketplace/fetch").then((response) => {
                let list = [];
                response.products.forEach((e) => {
                    if (e.in_wishlist) {
                        list.push(e);
                    }
                });
                this.wishlists = list;
            });
        },
        closeModal() {
            this.isShowModal = false;
        },
        showModal() {
            this.isShowModal = true;
        },
        async activate_order(order) {
            await axios
                .post("/user/marketplace/order/activate", {
                    trx: order.trx,
                })
                .then((response) => {
                    this.fetch_orders();
                    $toast[response.type](response.message);
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                });
        },
    },
    persist: true,
});
