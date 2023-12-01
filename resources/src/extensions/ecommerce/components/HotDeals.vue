<template>
    <div class="hot-deals">
        <div
            class="mt-5 mb-2 flex items-center justify-between border-b border-gray-200 pt-3 pl-2 text-sm font-medium uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400"
        >
            <h3>{{ $t("Hot Deals") }}</h3>
        </div>
        <div class="slider-container p-2">
            <div class="swiper-container" ref="slider">
                <div class="swiper-wrapper">
                    <ProductCard
                        :product="product"
                        class="swiper-slide"
                        v-for="(product, index) in hotDeals"
                        :key="index"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";

export default {
    components: {
        ProductCard,
    },
    props: {
        products: {
            type: Array,
            required: true,
        },
    },
    computed: {
        hotDeals() {
            return this.products.filter((product) => product.hot === 1);
        },
    },
    mounted() {
        const slider = new Swiper(this.$refs.slider, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    },
};
</script>

<style scoped>
.slider-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.slider {
    width: 100%;
    height: 100%;
}
</style>
