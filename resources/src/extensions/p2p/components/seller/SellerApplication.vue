<template>
    <div class="card mx-auto w-full max-w-xl">
        <div class="card-body">
            <h2
                class="mb-5 text-center text-2xl font-bold text-gray-800 dark:text-white"
            >
                {{ $t("Apply to become a seller") }}
            </h2>
            <p class="mb-2 text-center text-gray-600 dark:text-gray-300">
                {{
                    $t(
                        "To apply to become a seller, you must meet the following conditions"
                    )
                }}:
            </p>
            <ul class="list-disc pl-4 text-gray-600 dark:text-gray-300 lg:pl-8">
                <li v-if="plat.kyc.kyc_status == 1">
                    {{ $t("Verify your KYC information") }}
                </li>
                <li
                    :class="
                        seller.p2p != null &&
                        seller.p2p.application_balance !== null &&
                        seller.wallet !== null &&
                        seller.wallet.balance >= seller.p2p.application_balance
                            ? 'text-success'
                            : 'text-danger'
                    "
                >
                    {{ $t("Have at least") }}
                    {{
                        seller.p2p != null &&
                        seller.p2p.application_balance !== null
                            ? seller.p2p.application_balance
                            : 1000
                    }}
                    {{
                        seller.p2p != null &&
                        seller.p2p.application_wallet !== null
                            ? seller.p2p.application_wallet
                            : "USDT"
                    }}
                    {{ $t("in your") }}
                    {{
                        seller.p2p != null &&
                        seller.p2p.application_wallet !== null
                            ? seller.p2p.application_wallet
                            : "USDT"
                    }}
                    {{ $t("funding wallet") }}
                </li>
                <li :class="acceptTerms ? 'text-success' : 'text-danger'">
                    {{ $t("Accept the terms and conditions of sellers") }}
                </li>
            </ul>
        </div>

        <div class="card-footer">
            <div>
                <input
                    id="terms"
                    v-model="acceptTerms"
                    type="checkbox"
                    class="text-blue-500 dark:text-blue-300"
                />
                <label
                    for="terms"
                    class="ml-2 text-gray-600 dark:text-gray-300"
                    >{{
                        $t("I accept the terms and conditions of sellers")
                    }}</label
                >
            </div>
            <button
                :disabled="!acceptTerms"
                class="mt-2 w-full rounded bg-blue-500 py-2 px-4 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-blue-700"
                @click="apply"
            >
                {{ $t("Apply") }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "SellerApplication",
    props: {
        seller: {
            type: Object,
            required: true,
        },
    },
    emits: ["applied"],
    data() {
        return {
            acceptTerms: false,
            plat: plat,
        };
    },
    methods: {
        async apply() {
            try {
                const response = await axios.post("/user/p2p/seller/apply");
                this.$toast[response.type](response.message);
                if (response.type == "success") {
                    this.$emit("applied");
                }
            } catch (error) {
                console.log(error);
                if (error.response.status === 422) {
                    const errors = error.response.data.errors;
                    let errorMessage = "";
                    Object.keys(errors).forEach((key) => {
                        errorMessage += errors[key][0] + "\n";
                    });
                    this.$toast.error(errorMessage);
                } else {
                    this.$toast.error(error.response.data.error);
                }
            }
        },
    },
};
</script>
