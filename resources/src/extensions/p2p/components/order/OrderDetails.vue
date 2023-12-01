<template>
    <div
        v-if="order.status === 'completed'"
        :key="order.status"
        class="alert alert-success"
        role="alert"
    >
        <strong class="font-bold">{{ $t("Success!") }}</strong>
        <span class="block sm:inline">{{
            $t("Payment has been confirmed, and the order is completed.")
        }}</span>
    </div>
    <div
        v-if="order.status === 'cancelled'"
        :key="order.status"
        class="alert alert-danger"
        role="alert"
    >
        <strong class="font-bold">{{ $t("Alert!") }}</strong>
        <span class="block sm:inline">{{
            $t("The order has been cancelled.")
        }}</span>
    </div>
    <div v-else>
        <div v-if="isBuyer">
            <div class="card">
                <div class="card-header">
                    <h3 class="mb-2 text-lg font-bold">
                        {{ $t("Transaction details") }}
                    </h3>
                </div>
                <div class="card-body">
                    <div class="flex flex-col">
                        <div class="flex justify-between">
                            <span class="font-medium">
                                {{ $t("Funds to send") }}:
                            </span>
                            <p>{{ payAmount }} {{ order.fiat }}</p>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">
                                {{ $t("Funds to receive") }}:
                            </span>
                            <p>{{ recieveAmount }} {{ order.currency }}</p>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">
                                {{ $t("Exchange Rate") }}:
                            </span>
                            <p>
                                1 {{ order.currency }} = {{ price }}
                                {{ order.fiat }}
                            </p>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium"
                                >{{ $t("Escrow Fee") }}:</span
                            >
                            <p>{{ networkFee }}%</p>
                        </div>

                        <div
                            v-if="order.trx != null"
                            class="mt-5 flex justify-between border-t border-gray-200 pt-4 dark:border-gray-700"
                        >
                            <span class="font-medium">
                                {{ $t("Transaction ID") }}:
                            </span>
                            <p>{{ order.trx }}</p>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">
                                {{ $t("Payment Method") }}:
                            </span>
                            <p>{{ order.method ? order.method.name : "" }}</p>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">
                                {{ $t("Payment Details") }}:
                            </span>
                            <p>
                                {{
                                    order.method ? order.method.description : ""
                                }}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    v-if="order.status === 'open' && order.trx === null"
                    class="card-footer"
                >
                    <label
                        for="transaction-id"
                        class="block text-sm font-medium"
                        >{{ $t("Transaction ID") }}</label
                    >
                    <div class="flex">
                        <input
                            id="transaction-id"
                            v-model="transactionId"
                            class="form-control mr-2"
                            placeholder="Enter transaction ID"
                        />
                        <button
                            class="btn btn-primary mt-1"
                            @click="submitTransactionId"
                        >
                            {{ $t("Submit") }}
                        </button>
                    </div>
                </div>
                <div
                    v-if="order.status === 'open' && order.trx !== null"
                    class="card-footer"
                >
                    <label
                        for="transaction-id"
                        class="block text-sm font-medium"
                        >{{ $t("Transaction ID") }}</label
                    >
                    <div class="flex">
                        <input
                            id="transaction-id"
                            v-model="transactionId"
                            class="form-control mr-2"
                            placeholder="Enter transaction ID"
                        />
                        <button
                            class="btn btn-primary mt-1"
                            @click="submitTransactionId"
                        >
                            {{ $t("Submit") }}
                        </button>
                    </div>
                    <p class="text-warning text-sm">
                        {{
                            $t(
                                "Transaction ID submitted but order not identified as paid, Please resubmit transaction ID again."
                            )
                        }}
                    </p>
                </div>
                <div
                    v-else-if="order.status !== 'open' && order.trx !== null"
                    class="card-footer"
                >
                    <p class="text-sm text-green-500">
                        {{
                            $t(
                                "Transaction ID submitted and order status is paid."
                            )
                        }}
                    </p>
                </div>
            </div>
        </div>
        <div v-else>
            <div
                v-if="
                    order.status !== 'completed' && order.status !== 'cancelled'
                "
                class="card"
            >
                <div class="card-body">
                    <button
                        class="btn btn-success"
                        :disabled="!canConfirmPayment"
                        @click="confirmPayment"
                    >
                        {{ $t("Confirm Payment") }}
                    </button>
                    <p class="mt-2 text-sm text-gray-500">
                        {{
                            $t(
                                "Note: Please ensure that you have received the payment before confirming."
                            )
                        }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        order: {
            type: Object,
            required: true,
        },
        isBuyer: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["transaction-submitted", "transaction-confirmed"],
    data() {
        return {
            transactionId: "",
            gnl: gnl,
        };
    },
    computed: {
        networkFee() {
            return JSON.parse(this.gnl.p2p).network_fee ?? 0;
        },
        payAmount() {
            const fee = this.networkFee / 100;
            const amount = this.order.amount * this.order.price;
            const feed = amount * fee;
            return (amount + feed).toFixed(2);
        },
        recieveAmount() {
            return Number(this.order.amount).toFixed(2);
        },
        canConfirmPayment() {
            return this.order.status === "paid";
        },
        price() {
            return Number(this.order.price).toFixed(2);
        },
    },
    methods: {
        async submitTransactionId() {
            await axios
                .post(`/user/p2p/orders/${this.order.id}/transaction`, {
                    transaction_id: this.transactionId,
                })
                .then((response) => {
                    this.$toast[response.type](response.message);
                    this.$emit("transaction-submitted");
                });
        },
        async confirmPayment() {
            await axios
                .post(`/user/p2p/orders/${this.order.id}/confirm`)
                .then((response) => {
                    this.$toast[response.type](response.message);
                    this.$emit("transaction-confirmed");
                });
        },
    },
};
</script>
