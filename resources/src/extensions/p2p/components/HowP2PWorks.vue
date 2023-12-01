<template>
    <div class="mx-auto mt-10">
        <div class="flex flex-col items-center justify-between md:flex-row">
            <h2
                class="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100 md:mb-0"
            >
                {{ $t("How it works") }}
            </h2>
            <ul class="mb-4 flex justify-center md:mb-0 md:justify-end">
                <li>
                    <a
                        href="#"
                        class="mx-1 rounded-lg px-4 py-2 text-lg font-semibold text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700"
                        :class="{
                            'bg-gray-200 text-gray-900 dark:bg-gray-700':
                                activeTab === 'buying',
                        }"
                        @click.prevent="activeTab = 'buying'"
                    >
                        {{ $t("Buying Crypto") }}
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        class="mx-1 rounded-lg px-4 py-2 text-lg font-semibold text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700"
                        :class="{
                            'bg-gray-200 text-gray-900 dark:bg-gray-700':
                                activeTab === 'selling',
                        }"
                        @click.prevent="activeTab = 'selling'"
                    >
                        {{ $t("Selling Crypto") }}
                    </a>
                </li>
            </ul>
        </div>
        <div class="mt-8">
            <div
                v-if="activeTab === 'buying'"
                class="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
                <Step
                    title="Place an Order"
                    description="Once you place a P2P order, the crypto asset will be escrowed by us."
                    step-number="1"
                />
                <Step
                    title="Pay the Seller"
                    description='Send money to the seller via the suggested payment methods. Complete the fiat transaction and click "Transferred, notify seller" on the order page.'
                    step-number="2"
                />
                <Step
                    title="Get your Crypto"
                    description="Once the seller confirms receipt of money, the escrowed crypto will be released to you."
                    step-number="3"
                />
            </div>
            <div
                v-if="activeTab === 'selling'"
                class="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
                <Step
                    title="Place an Order"
                    description="After you place an order, your crypto will be escrowed by us."
                    step-number="1"
                />
                <Step
                    title="Confirm Payment"
                    description="Check the transaction record in the given payment account, and make sure you receive the money sent by the buyer."
                    step-number="2"
                />
                <Step
                    title="Release Crypto"
                    description="Once you confirm the receipt of money, crypto will be released to the buyer."
                    step-number="3"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Step from "./guide/Step.vue";

export default {
    name: "HowItWorks",
    components: {
        Step,
    },
    data() {
        return {
            activeTab: "buying",
        };
    },
};
</script>

<style scoped>
@media (min-width: 768px) {
    .grid-cols-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
</style>
