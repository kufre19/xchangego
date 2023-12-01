<template>
    <div
        class="Markets border border-gray-100 bg-white shadow dark:border-gray-700 dark:bg-gray-900"
    >
        <div class="mb-4 flex border-gray-200 dark:border-gray-800">
            <button
                class="-mb-px bg-gray-200 px-1 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                @click.prevent="scrollLeft()"
            >
                <i class="bi bi-chevron-left text-warning"></i>
            </button>
            <ul
                id="myTab"
                class="nf flex-cols -mb-px flex overflow-x-hidden bg-gray-200 text-center text-sm font-medium dark:bg-gray-800"
                role="tablist"
            >
                <li>
                    <small
                        ><a
                            class="inline-block px-2 py-1 text-gray-600 dark:text-gray-300"
                            :class="
                                !isActive('fav')
                                    ? 'cursor-pointer border-transparent bg-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                                    : 'border-gray-300 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300'
                            "
                            @click="setActive('fav')"
                            ><i class="bi bi-star bi-icon"></i></a
                    ></small>
                </li>
                <li v-for="(mark, key, index) in markets" :key="index">
                    <small>
                        <a
                            class="inline-block px-2 py-1 text-gray-600 dark:text-gray-300"
                            :class="
                                !isActive(key)
                                    ? 'cursor-pointer border-transparent bg-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                                    : 'border-gray-300 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300'
                            "
                            @click="setActive(key)"
                            >{{ key }}</a
                        ></small
                    >
                </li>
            </ul>
            <button
                class="-mb-px bg-gray-200 px-1 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                @click.prevent="scrollRight()"
            >
                <i class="bi bi-chevron-right text-warning fs-6"></i>
            </button>
        </div>
        <div id="myTabContent" class="px-3">
            <MarketList
                v-if="activeItem === 'fav'"
                :key="marketStore.favs.length"
                :list="Object.values(marketStore.favs)"
                :type="type"
                :subtype="subtype"
                iffav="true"
                ifeco="true"
                @fetchFavs="marketStore.fetch_favs()"
            ></MarketList>
            <div
                v-for="(mark, key, index) in markets"
                :key="index"
                :class="isActive(key) ? '' : 'hidden'"
            >
                <template v-if="activeItem === key">
                    <MarketList
                        :key="mark.length"
                        :list="Object.values(mark)"
                        :type="type"
                        :subtype="subtype"
                        ifeco="true"
                        @fetchFavs="marketStore.fetch_favs()"
                    ></MarketList>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import MarketList from "../../../main/trading/MarketsList.vue";
import { useMarketStore } from "../../../store/market";
export default {
    components: { MarketList },
    props: ["type", "subtype"],
    setup() {
        const marketStore = useMarketStore();
        return { marketStore };
    },

    data() {
        return {
            old: [],
            markets: [],
            ext: ext,
            activeItem: "fav",
        };
    },

    created() {
        this.fetchMarkets();
        this.fetchFavs();
    },
    mounted() {},
    methods: {
        fetchMarkets() {
            axios.get("/user/eco/markets").then((response) => {
                this.markets = response.markets;
            });
        },
        async fetchFavs() {
            if (this.marketStore.favs.length == 0) {
                await this.marketStore.fetch_favs();
            }
        },
        isActive(menuItem) {
            return this.activeItem === menuItem;
        },
        setActive(menuItem) {
            this.activeItem = menuItem;
        },
        scrollLeft() {
            const nfElement = document.querySelector(".nf");
            const leftPos = nfElement.scrollLeft;
            nfElement.scroll({ left: leftPos - 200, behavior: "smooth" });
        },
        scrollRight() {
            const nfElement = document.querySelector(".nf");
            const leftPos = nfElement.scrollLeft;
            nfElement.scroll({ left: leftPos + 200, behavior: "smooth" });
        },
        addToWatchlist(currency, pair, type) {
            axios
                .post("/user/watchlist/store", {
                    currency: currency,
                    pair: pair,
                    type: type,
                })
                .then((response) => {
                    this.$toast[response.type](response.message);
                    this.fetchFavs();
                })
                .catch((error) => {
                    this.$toast.error(error.response.data);
                });
        },
        removeFromWatchlist(id) {
            axios
                .post("/user/watchlist/delete", {
                    id: id,
                })
                .then((response) => {
                    this.$toast.success(response.message);
                    this.fetchFavs();
                })
                .catch((error) => {
                    this.$toast.error("Market Already Removed From Watchlist");
                });
        },
        contains(target, pattern) {
            var value = 0;
            pattern.forEach(function (word) {
                value = value + target.includes(word);
            });
            return value === 1;
        },
        formatTotal(total) {
            return ccxt.decimalToPrecision(
                total,
                ccxt.ROUND,
                3,
                ccxt.DECIMAL_PLACES,
                ccxt.PAD_WITH_ZERO
            );
        },
    },
};
</script>
<style>
.not-watchlisted:hover .bi-star {
    color: rgb(255, 159, 67) !important;
}
.watchlisted:hover .bi-star-fill {
    color: rgb(130, 134, 139) !important;
}
</style>
