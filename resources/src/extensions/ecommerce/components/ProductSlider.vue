<template>
    <div class="product-slider">
        <div class="card">
            <div class="card-body">
                <swiper
                    v-if="products.length"
                    :modules="swiperModules"
                    :options="swiperOptions"
                    class="swiper-container"
                >
                    <swiper-slide
                        v-for="(slideProducts, index) in productChunks"
                        :key="index"
                    >
                        <div class="slide-products">
                            <div
                                v-for="product in slideProducts"
                                :key="product.id"
                                class="product-thumbnail"
                                @click="redirectToProductInfo(product.id)"
                            >
                                <img
                                    v-lazy="
                                        getProductThumbnail(product.thumbnail)
                                    "
                                    :alt="product.name"
                                />
                            </div>
                        </div>
                    </swiper-slide>
                    <div class="swiper-pagination"></div>
                </swiper>
                <div v-else class="skeleton">
                    <div class="slide-products">
                        <div v-for="i in 4" :key="i" class="product-thumbnail">
                            <div
                                class="skeleton h-32 w-32 rounded bg-gray-200 dark:bg-gray-700"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Pagination]);

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        products: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            swiperModules: [Pagination],
            swiperOptions: {
                spaceBetween: 30,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            },
        };
    },

    computed: {
        productChunks() {
            const chunkSize = 4;
            const chunks = [];
            for (let i = 0; i < this.products.length; i += chunkSize) {
                chunks.push(this.products.slice(i, i + chunkSize));
            }
            return chunks;
        },
    },

    methods: {
        getProductThumbnail(thumbnail) {
            return thumbnail !== null
                ? `/assets/images/ecommerce/product/thumbnail/${thumbnail}`
                : "/assets/no-image.png";
        },
        redirectToProductInfo(productId) {
            this.$router.push(`/marketplace/product/${productId}`);
        },
    },
};
</script>

<style scoped>
.product-slider {
    padding: 20px;
}

.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    @apply bg-white dark:bg-gray-800;
}

.card-body {
    padding: 20px;
}

.slide-products {
    display: flex;
    justify-content: space-between;
}

.product-thumbnail {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    cursor: pointer;
    margin-right: 15px;
}

.swiper-pagination-bullet {
    background-color: #000;
    @apply bg-black dark:bg-white;
    opacity: 0.6;
    border: 2px solid #ffffff;
    @apply border-white dark:border-black;
}
</style>
