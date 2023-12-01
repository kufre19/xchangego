<template>
    <div class="mx-auto mt-10">
        <div class="flex flex-col items-center justify-between md:flex-row">
            <h2
                class="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100 md:mb-0"
            >
                {{ $t("FAQs") }}
            </h2>
            <ul class="mb-4 flex justify-center md:mb-0 md:justify-end">
                <li
                    class="mx-1 rounded-lg px-4 py-2 text-lg font-semibold text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700"
                    :class="{
                        'bg-gray-200 text-gray-900 dark:bg-gray-700':
                            activeTab === 'buyers',
                    }"
                >
                    <a href="#" @click.prevent="activeTab = 'buyers'">{{
                        $t("Buyer FAQs")
                    }}</a>
                </li>
                <li
                    class="mx-1 rounded-lg px-4 py-2 text-lg font-semibold text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700"
                    :class="{
                        'bg-gray-200 text-gray-900 dark:bg-gray-700':
                            activeTab === 'sellers',
                    }"
                >
                    <a href="#" @click.prevent="activeTab = 'sellers'">{{
                        $t("Seller FAQs")
                    }}</a>
                </li>
            </ul>
        </div>
        <BuyerFaqs v-if="activeTab === 'buyers'" />
        <SellerFaqs v-if="activeTab === 'sellers'" />
    </div>
</template>

<script>
import BuyerFaqs from "./faqs/BuyerFaqs.vue";
import SellerFaqs from "./faqs/SellerFaqs.vue";

export default {
    name: "Faqs",
    components: {
        BuyerFaqs,
        SellerFaqs,
    },
    data() {
        return {
            activeTab: "buyers",
        };
    },
};
</script>
