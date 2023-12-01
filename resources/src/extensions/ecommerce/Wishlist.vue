<template>
    <div class="rounded-lg p-5">
        <div
            class="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            <ProductCard
                v-for="(product, index) in ecommerceStore.wishlists"
                :key="index"
                :product="product"
                class="my-5"
            />
        </div>
    </div>
</template>
<script>
import ProductCard from "./components/ProductCard.vue";
import { useEcommerceStore } from "../../store/ecommerce";
export default {
    components: { ProductCard },
    setup() {
        const ecommerceStore = useEcommerceStore();
        return { ecommerceStore };
    },
    mounted() {
        this.fetch();
    },
    methods: {
        async fetch() {
            if (this.ecommerceStore.wishlists.length == 0) {
                await this.ecommerceStore.fetch_wishlists();
            }
        },
    },
};
</script>
