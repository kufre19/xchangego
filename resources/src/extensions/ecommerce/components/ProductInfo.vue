<template>
    <div>
        <div
            v-if="Object.keys(product).length > 0"
            class="flex flex-col items-start md:flex-row md:items-center"
        >
            <div class="relative flex w-full flex-col p-4 md:w-1/2">
                <router-link
                    to="/marketplace/index"
                    class="mb-4 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
                >
                    <i class="bi bi-arrow-left-circle text-2xl"></i>
                </router-link>
                <div>
                    <h1 class="mb-2 text-4xl font-bold dark:text-gray-200">
                        {{ product.name }}
                    </h1>
                </div>

                <div
                    v-if="product.hot === 1"
                    class="absolute top-0 right-0 rounded bg-red-500 py-1 px-3 font-bold text-white"
                >
                    <span class="text-lg">{{ $t("HOT") }} </span>
                </div>

                <div class="my-4">
                    <span class="text-2xl font-bold dark:text-gray-200">
                        ${{ product.price - product.discount }}
                    </span>
                    <span
                        class="ml-2 text-gray-500 line-through dark:text-gray-400"
                    >
                        <del>${{ product.price }}</del>
                    </span>
                </div>
                <div class="my-4">
                    <p class="text-gray-700 dark:text-gray-300">
                        {{ product.description }}
                    </p>
                </div>

                <div class="mt-8">
                    <div>
                        <button
                            class="mr-4 h-full rounded bg-blue-600 py-2 px-6 font-bold text-white hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900"
                            @click="openPurchaseModal"
                        >
                            {{ $t("Buy Now") }}
                        </button>
                        <WishlistButton
                            :product-id="product.id"
                            :is-active="isProductInWishlist"
                            class="inline-flex h-full items-center justify-center rounded-lg border border-transparent bg-gray-300 px-3 py-2 text-base font-medium text-black shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                            @update:isActive="updateWishlistStatus"
                        >
                            {{ $t("Add to Wishlist") }}
                        </WishlistButton>
                    </div>
                </div>
            </div>
            <div class="w-full p-4 md:w-1/2">
                <img
                    :src="productThumbnail"
                    alt="productName"
                    class="mx-auto h-auto w-full shadow-lg"
                />
            </div>
        </div>

        <div v-else class="my-5 grid grid-cols-4 gap-6">
            <div class="col-span-3">
                <div class="skeleton mb-6 h-8 w-32 rounded bg-gray-200"></div>
                <div class="skeleton mb-6 h-6 w-48 rounded bg-gray-200"></div>
                <div class="skeleton mb-6 h-6 w-24 rounded bg-gray-200"></div>
                <div class="skeleton mb-6 h-4 w-64 rounded bg-gray-200"></div>
            </div>
            <div class="col-span-1">
                <div class="skeleton h-48 w-full rounded bg-gray-200"></div>
            </div>
        </div>
        <div class="hidden py-5 md:block">
            <h1
                class="mb-2 text-center text-3xl font-bold leading-none tracking-tight text-gray-900 dark:text-white"
            >
                {{ $t("Related Products") }}
            </h1>
            <ProductSlider :key="product.id" :products="products" />
        </div>

        <PurchaseModal
            :product="product"
            :visible="showPurchaseModal"
            :wallet="ecommerceStore.wallet"
            @close="closePurchaseModal"
            @purchase="purchaseProduct"
        />
    </div>
</template>

<script>
import "swiper/swiper-bundle.min.css";

import ProductSlider from "./ProductSlider.vue";
import WishlistButton from "./WishlistButton.vue";
import PurchaseModal from "./PurchaseModal.vue";
import { useEcommerceStore } from "../../../store/ecommerce";
export default {
    components: {
        WishlistButton,
        PurchaseModal,
        ProductSlider,
    },
    emits: ["add-to-cart"],
    setup() {
        const ecommerceStore = useEcommerceStore();
        return { ecommerceStore };
    },
    data() {
        return {
            showPurchaseModal: false,
            isProductInWishlist: false,
        };
    },
    computed: {
        product() {
            const foundProduct = this.ecommerceStore.products.find(
                (product) => product.id == this.$route.params.id
            );
            return foundProduct || {};
        },

        productName() {
            return this.product.name;
        },
        productThumbnail() {
            return this.product.thumbnail != null
                ? "/assets/images/ecommerce/product/thumbnail/" +
                      this.product.thumbnail
                : "/assets/no-image.png";
        },

        productDescription() {
            return this.product.description;
        },
        productPrice() {
            return this.product.price;
        },
        productDiscountedPrice() {
            return this.product.price - this.product.discount;
        },
        inWishlist() {
            const foundProduct = this.ecommerceStore.products.find(
                (product) => product.id == this.product.id
            );
            return foundProduct ? foundProduct.in_wishlist : false;
        },

        products() {
            return this.ecommerceStore.products;
        },
    },
    watch: {
        isActive: {
            immediate: true,
            handler(newValue) {
                this.active = newValue;
            },
        },
    },
    async mounted() {
        if (this.ecommerceStore.products.length === 0) {
            await this.ecommerceStore.fetch_products();
        }
        this.isProductInWishlist = this.inWishlist;
    },
    methods: {
        updateWishlistStatus(newStatus) {
            this.isProductInWishlist = newStatus;
        },
        openPurchaseModal() {
            this.$emit("add-to-cart", this.product);
            this.showPurchaseModal = true;
        },
        closePurchaseModal() {
            this.showPurchaseModal = false;
        },
        purchaseProduct() {
            axios
                .post("/user/marketplace/purchase", {
                    id: this.product.id,
                })
                .then((response) => {
                    this.$toast[response.type](response.message);
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.closePurchaseModal();
                });
        },
    },
};
</script>
