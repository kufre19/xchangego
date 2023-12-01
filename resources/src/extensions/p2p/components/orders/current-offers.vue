<template>
    <div>
        <h2 class="mb-4 text-lg font-medium">{{ $t("Current Offers") }}</h2>
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th
                        class="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                        {{ $t("Title") }}
                    </th>
                    <th
                        class="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                        {{ $t("Description") }}
                    </th>
                    <th
                        class="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                        {{ $t("Price") }}
                    </th>
                    <th
                        class="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                        {{ $t("Currency") }}
                    </th>
                    <th
                        class="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                        {{ $t("Min Amount") }}
                    </th>
                    <th
                        class="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                        {{ $t("Max Amount") }}
                    </th>
                    <th
                        class="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                        {{ $t("Payment Methods") }}
                    </th>
                    <th
                        class="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                        {{ $t("Action") }}
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="offer in offers" :key="offer.id">
                    <td class="whitespace-nowrap px-6 py-4">
                        {{ offer.title }}
                    </td>
                    <td class="px-6 py-4">{{ offer.description }}</td>
                    <td class="px-6 py-4">{{ offer.price }}</td>
                    <td class="px-6 py-4">{{ offer.currency }}</td>
                    <td class="px-6 py-4">{{ offer.min_amount }}</td>
                    <td class="px-6 py-4">{{ offer.max_amount }}</td>
                    <td class="px-6 py-4">
                        {{ offer.payment_methods.join(", ") }}
                    </td>
                    <td class="px-6 py-4">
                        <button
                            class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                            @click="editOffer(offer)"
                        >
                            {{ $t("Edit") }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="!offers.length" class="mt-4 text-gray-500">
            {{ $t("You have no current offers.") }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            offers: [],
        };
    },
    mounted() {
        this.fetchOffers();
    },
    methods: {
        fetchOffers() {
            axios.get("/user/p2p/current-offers").then((response) => {
                this.offers = response.data;
            });
        },
        editOffer(offer) {
            // Redirect the user to the offer edit page
            this.$router.push(`/offers/${offer.id}/edit`);
        },
    },
};
</script>
