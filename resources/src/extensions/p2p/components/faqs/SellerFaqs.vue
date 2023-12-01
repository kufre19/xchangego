<template>
    <div class="mt-8 grid gap-6 md:grid-cols-2">
        <div v-for="(faq, index) in faqs" :key="index">
            <div
                class="rounded-lg bg-white px-6 py-4 shadow-md dark:bg-gray-800 dark:text-gray-100"
                :class="{
                    'border-l-4 border-blue-500': index % 2 === 0,
                    'border-l-4 border-green-500': index % 2 !== 0,
                }"
            >
                <h3 class="text-lg font-bold leading-tight">
                    {{ faq.question }}
                </h3>
                <div class="mt-2 text-gray-600 dark:text-gray-400">
                    {{ faq.answer }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SellerFaqs",
    data() {
        return {
            faqs: [
                {
                    question:
                        "What are the requirements for becoming an advertiser?",
                    answer: "To become an advertiser, you must complete KYC (Know Your Customer) verification, have a trading volume of at least 0.1 BTC or 2,000 USDT in the past 30 days, and hold a minimum balance of 0.05 BTC or 1,000 USDT.",
                },
                {
                    question:
                        "What are the benefits of becoming an advertiser?",
                    answer: "As an advertiser, you will enjoy higher visibility on the P2P platform, leading to increased trade opportunities. You will also have priority access to new features and promotional events.",
                },
                {
                    question: "How can I apply to become an advertiser?",
                    answer: "You can apply to become an advertiser by clicking on the 'Become an Advertiser' button on the P2P trading page. You will need to complete the KYC verification process and meet the other requirements to be approved.",
                },
                {
                    question: "What are the fees for advertisers?",
                    answer: "There are no additional fees for advertisers. The fees for trading on the P2P platform remain the same, regardless of whether you are an advertiser or not.",
                },
                {
                    question: "Can I lose my advertiser status?",
                    answer: "Yes, you may lose your advertiser status if you do not maintain the minimum requirements for trading volume and account balance. It is important to keep your trading activity and account balance up to date to maintain your advertiser status.",
                },
            ],
        };
    },
};
</script>

<style scoped>
.border-blue-500 {
    border-left-color: #3b82f6;
}

.border-green-500 {
    border-left-color: #10b981;
}
</style>
