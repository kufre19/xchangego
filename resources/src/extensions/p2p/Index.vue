<template>
    <div>
        <h1
            class="mb-5 text-3xl font-bold leading-tight text-gray-900 dark:text-white"
        >
            {{ $t("P2P Trading") }}
        </h1>
        <offers-table />
        <HowP2PWorks />
        <Faqs />
    </div>
</template>

<script>
import OffersTable from "./components/offers-table.vue";
import HowP2PWorks from "./components/HowP2PWorks.vue";
import Faqs from "./components/Faqs.vue";

export default {
    components: {
        OffersTable,
        HowP2PWorks,
        Faqs,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
