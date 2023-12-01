<template>
    <Navigation />
    <template v-if="component == null">
        <div
            class="grid gap-5 overflow-x-hidden xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
            <div class="col-span-1">
                <ProductSidebar>
                    <Categories
                        :categories="ecommerceStore.categories"
                        :selected-category-id="selectedCategoryId"
                        @update:selected-category-id="
                            selectedCategoryId = $event
                        "
                    />

                    <Tags
                        :tags="ecommerceStore.tags"
                        :active-tag="activeTag"
                        @filter-by-tag="handleFilterByTag"
                        @remove-tag="removeTag"
                    />
                </ProductSidebar>
            </div>

            <div class="md:col-span-2 lg:col-span-3 xl:col-span-4">
                <div class="rounded-lg p-5">
                    <div
                        class="grid grid-cols-1 gap-5 py-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                        <ProductCard
                            v-for="(product, index) in filteredProducts"
                            :key="index"
                            :product="product"
                        />
                    </div>
                </div>
            </div></div
    ></template>
    <template v-else>
        <router-view v-slot="{ Component }">
            <transition
                type="animation"
                name="zoom-fade"
                mode="out-in"
                :duration="300"
            >
                <component :is="Component" />
            </transition> </router-view
    ></template>
</template>

<script>
import ProductCard from "./components/ProductCard.vue";
import Categories from "./components/Categories.vue";
import Tags from "./components/Tags.vue";
import ProductSidebar from "./components/ProductSidebar.vue";
import { useEcommerceStore } from "../../store/ecommerce";
import Navigation from "./Navigation.vue";
export default {
    components: {
        ProductCard,
        Categories,
        Tags,
        ProductSidebar,
        Navigation,
    },
    emits: ["refreshProducts"],
    setup() {
        const ecommerceStore = useEcommerceStore();
        return { ecommerceStore };
    },
    data() {
        return {
            selectedCategoryId: null,
            selectedTag: null,
            activeCategory: null,
            activeTag: null,
            component: null,
        };
    },

    computed: {
        filteredProducts() {
            let filteredProducts = this.ecommerceStore.products;
            if (this.selectedCategoryId !== null) {
                filteredProducts = filteredProducts.filter((product) => {
                    return product.category_id === this.selectedCategoryId;
                });
            }
            if (this.selectedTag !== null) {
                filteredProducts = filteredProducts.filter((product) => {
                    return product.tags.includes(this.selectedTag);
                });
            }
            if (this.ecommerceStore.search) {
                filteredProducts = filteredProducts.filter((product) => {
                    return product.name
                        .toLowerCase()
                        .includes(this.ecommerceStore.search.toLowerCase());
                });
            }
            return filteredProducts;
        },
    },
    watch: {
        $route(to, from) {
            if (to.meta.title !== "Marketplace") {
                this.component = to.path;
            } else {
                this.component = null;
            }
        },
    },

    mounted() {
        if (this.$route.meta.title !== "Marketplace") {
            this.component = this.$route.path;
        } else {
            this.component = null;
        }
        this.fetch();
    },
    methods: {
        removeTag() {
            this.selectedTag = null;
            this.activeTag = null;
        },
        async fetch() {
            if (this.ecommerceStore.products.length == 0) {
                await this.ecommerceStore.fetch_products();
            }
        },
        filterByCategory(categoryId) {
            this.selectedCategoryId = categoryId;
            this.selectedTag = null;
            this.activeCategory = categoryId;
            this.activeTag = null;
        },
        resetCategoryFilter() {
            this.selectedCategoryId = null;
            this.activeCategory = null;
        },
        handleFilterByTag(tag) {
            this.selectedTag = tag;
            this.selectedCategoryId = null;
            this.activeTag = tag;
            this.activeCategory = null;
        },
        isCategoryActive(categoryId) {
            return this.activeCategory === categoryId;
        },
        isTagActive(tagId) {
            return tagId.includes(this.activeTag);
        },
    },
};
</script>
