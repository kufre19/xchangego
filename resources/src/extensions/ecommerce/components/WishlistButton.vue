<template>
    <a class="flex items-center justify-center" @click="addToWishlist()">
        <i
            class="bi bi-heart-fill"
            :class="[
                isActive ? 'bi bi-heart-fill text-danger' : '',
                size,
                color,
            ]"
            style="margin: 0 !important"
        ></i>
    </a>
</template>

<script>
import { useEcommerceStore } from "../../../store/ecommerce";
export default {
    props: {
        productId: {
            type: Number,
            required: true,
        },
        isActive: {
            type: Boolean,
            required: true,
        },
        size: {
            type: String,
            default: "text-xl",
        },
        color: {
            type: String,
            default: "text-gray-500",
        },
    },
    emits: ["update:isActive"],
    setup() {
        const ecommerceStore = useEcommerceStore();
        return { ecommerceStore };
    },
    methods: {
        async addToWishlist() {
            await axios
                .post(
                    "/user/marketplace/wishlist/" +
                        (this.isActive == true ? "remove" : "add"),
                    {
                        id: this.productId,
                    }
                )
                .then((response) => {
                    if (this.$route.meta.title == "Wishlist") {
                        this.ecommerceStore.fetch_wishlists();
                    } else {
                        this.ecommerceStore.fetch_products();
                        this.ecommerceStore.fetch_wishlists();
                    }
                    this.$toast[response.type](response.message);
                    this.$emit("update:isActive", !this.isActive);
                })
                .catch((error) => {
                    this.$toast.error(error.response.message);
                });
        },
    },
};
</script>
