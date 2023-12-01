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
    name: "BuyerFaqs",
    data() {
        return {
            faqs: [
                {
                    question: "What is P2P Trading?",
                    answer: "P2P (Peer to Peer) Trading is a method of trading cryptocurrencies that allows two individuals to directly trade with each other without relying on a third-party intermediary.",
                },
                {
                    question: "How does P2P Trading work?",
                    answer: "On P2P Trading, buyers and sellers can trade cryptocurrencies directly with each other. provides the platform to facilitate the trade and ensure a safe and secure transaction by holding the crypto assets in escrow until the transaction is completed.",
                },
                {
                    question: "What are the advantages of P2P Trading?",
                    answer: "P2P Trading allows traders to directly exchange cryptocurrencies with each other without the need for a third party, which means lower transaction fees and more privacy. It also enables users to trade in areas where traditional banking services may not be available.",
                },
                {
                    question: "Is P2P Trading safe?",
                    answer: "P2P Trading on is safe and secure. All trades are protected by an escrow system, which ensures that both parties receive what they agreed upon before releasing the assets. In addition, provides 24/7 customer support to assist with any issues that may arise during the trade process.",
                },
                {
                    question: "What payment methods are available on P2P?",
                    answer: "P2P supports a wide range of payment methods, including bank transfers, cash deposits, and third-party payment providers such as Paypal and Alipay. Each payment method may have different processing times and fees, so be sure to check before making a trade.",
                },
                {
                    question: "Are there any fees for using P2P?",
                    answer: "P2P does not charge any fees for creating or accepting trades. However, payment providers may charge transaction fees, and there may be fees associated with withdrawing crypto assets from P2P to your wallet.",
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
