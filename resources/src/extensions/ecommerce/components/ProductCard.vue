<template>
    <div class="card duration-300 hover:scale-105">
        <div class="relative">
            <div class="image-container relative">
                <router-link :to="'/marketplace/product/' + product.id">
                    <img
                        v-lazy="productThumbnail"
                        class="rounded-t-lg p-8"
                        alt="product image"
                    />
                </router-link>
                <div class="icon-wrapper flex items-center justify-center">
                    <WishlistButton
                        class="wishlist-button absolute hidden"
                        :product-id="productId"
                        :is-active="inWishlist"
                    />
                </div>
            </div>

            <div
                v-if="product.hot === 1"
                class="absolute top-0 left-0 mt-1 ml-1"
            >
                <span
                    class="mr-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300"
                    >{{ $t("HOT") }}</span
                >
            </div>
        </div>
        <div class="p-3">
            <router-link
                :to="'/marketplace/product/' + product.id"
                class="mr-3 max-w-full text-lg font-semibold tracking-tight text-gray-900 dark:text-white sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl"
            >
                {{ productName }}
            </router-link>

            <div class="relative flex items-center">
                <p
                    ref="textElement"
                    class="text-sm leading-5 text-gray-600 line-clamp-2 dark:text-gray-400"
                    :class="{ 'line-clamp-2': !isExpanded }"
                >
                    {{ productDescription }}
                </p>
                <button
                    style="position: fixed; top: auto; right: 0; color: skyblue"
                    @click="expandText"
                >
                    <i class="bi bi-three-dots-vertical"></i>
                </button>
            </div>
        </div>

        <div class="card-footer flex justify-between">
            <span class="text-2xl font-bold text-gray-900 dark:text-white">
                <small class="font-normal text-gray-500 dark:text-gray-400">
                    <del v-if="productOldPrice > 0">{{ productPrice }}</del>
                </small>
                ${{
                    productOldPrice > 0 ? productDiscountedPrice : productPrice
                }}
            </span>

            <button
                type="button"
                class="btn btn-info"
                style="padding-right: 1 !important"
                @click="openPurchaseModal"
            >
                <svg
                    aria-hidden="true"
                    class="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    ></path>
                </svg>
            </button>
        </div>
    </div>

    <PurchaseModal
        :product="product"
        :visible="showPurchaseModal"
        :wallet="ecommerceStore.wallet"
        :loading="loading"
        @close="closePurchaseModal"
        @purchase="purchaseProduct"
    />
</template>

<script>
import WishlistButton from "./WishlistButton.vue";
import PurchaseModal from "./PurchaseModal.vue";
import { useEcommerceStore } from "../../../store/ecommerce";
export default {
    components: {
        WishlistButton,
        PurchaseModal,
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    emits: ["add-to-cart"],
    setup() {
        const ecommerceStore = useEcommerceStore();
        return {
            ecommerceStore,
        };
    },
    data() {
        return {
            showPurchaseModal: false,
            isExpanded: false,
            loading: false,
        };
    },

    computed: {
        productId() {
            return this.product.id;
        },

        productName() {
            return this.product.name;
        },
        badge() {
            return this.product.hot === 1 ? "badge" : "";
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
        productOldPrice() {
            return this.product.discount;
        },
        productDiscountedPrice() {
            return this.product.price - this.product.discount;
        },
        productLink() {
            return "/marketplace/product/" + this.product.id;
        },
        inWishlist() {
            return this.product.in_wishlist;
        },
    },
    updated() {
        if (this.isExpanded) {
            this.$refs.textElement.classList.remove("line-clamp-2");
        } else {
            this.$refs.textElement.classList.add("line-clamp-2");
        }
    },

    methods: {
        expandText() {
            this.isExpanded = !this.isExpanded;
            if (this.isExpanded) {
                this.$refs.textElement.classList.remove("line-clamp-2");
            } else {
                this.$refs.textElement.classList.add("line-clamp-2");
            }
        },
        openPurchaseModal() {
            this.$emit("add-to-cart", this.product);
            this.showPurchaseModal = true;
        },
        closePurchaseModal() {
            this.showPurchaseModal = false;
        },
        purchaseProduct() {
            this.loading = true;
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
                    this.loading = false;
                    this.closePurchaseModal();
                    this.ecommerceStore.fetch_products();
                });
        },
    },
};
</script>
<style scoped>
.line-clamp-2 {
    position: relative;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-height: 3.6em;
}

.line-clamp-2::after {
    position: absolute;
    bottom: 0;
    right: 0;
    color: inherit;
}

.card:hover {
    transform: scale(1.05);
}
.image-container {
    position: relative;
}

.icon-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.wishlist-button {
    opacity: 0;
    animation: fadeInAndLock 1s forwards;
}

.image-container:hover .wishlist-button {
    display: flex;
}

@keyframes fadeInAndLock {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
