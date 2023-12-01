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
            <div v-if="order.moderation_status !== 'open'" class="card">
                <div class="card-body">
                    <button
                        v-if="order.status === 'open'"
                        class="btn btn-danger mr-2"
                        @click="openConfirmationModal('cancel')"
                    >
                        {{ $t("Cancel Order") }}
                    </button>
                    <button
                        v-if="
                            order.status !== 'open' &&
                            order.moderation_status !== 'open'
                        "
                        class="btn btn-danger"
                        @click="openConfirmationModal('request-moderation')"
                    >
                        {{ $t("Request Moderation") }}
                    </button>
                </div>
            </div>
            <div
                v-if="
                    order.status !== 'open' &&
                    order.moderation_status !== 'open'
                "
                class="mt-4"
            >
                <div
                    class="rounded border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700"
                    role="alert"
                >
                    <p class="font-bold">
                        {{ $t("You have already paid for this order.") }}
                    </p>
                    <p>
                        {{
                            $t(
                                "Please wait until the the seller confirm the order before making any changes to this order."
                            )
                        }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Seller view -->
        <div v-else>
            <div
                v-if="
                    order.status !== 'open' &&
                    order.moderation_status !== 'open'
                "
                class="card"
            >
                <div class="card-body">
                    <button
                        class="btn btn-danger"
                        @click="openConfirmationModal('request-moderation')"
                    >
                        {{ $t("Request Moderation") }}
                    </button>
                </div>
            </div>
            <div v-if="order.status === 'open'" class="card">
                <div class="card-body">
                    <button
                        class="btn btn-danger"
                        @click="openConfirmationModal('request-cancellation')"
                    >
                        {{ $t("Request Cancellation") }}
                    </button>
                </div>
            </div>
        </div>

        <div v-if="order.moderation_status === 'open'" class="mt-4">
            <div
                class="rounded border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700"
                role="alert"
            >
                <p class="font-bold">
                    {{ $t("This order is under moderation.") }}
                </p>
                <p>
                    {{
                        $t(
                            "Please wait until the moderation process is complete before making any changes to this order."
                        )
                    }}
                </p>
            </div>
        </div>

        <confirmation-modal
            v-if="showModal"
            @confirm="confirmCommand"
            @cancel="closeModal"
        >
            <template v-if="currentAction === 'cancel'">
                <p>
                    {{
                        $t(
                            "You are about to cancel this order. Are you sure you want to proceed?"
                        )
                    }}
                </p>
            </template>
            <template v-else-if="currentAction === 'confirm'">
                <p>
                    {{
                        $t(
                            "You are about to confirm this order. Once you confirm, the seller will receive a notification to start the transaction. Are you sure you want to proceed?"
                        )
                    }}
                </p>
            </template>
            <template v-else-if="currentAction === 'request-moderation'">
                <div>
                    <p>
                        {{
                            $t(
                                "You are about to request a moderation for this order. Please provide a reason for the moderation."
                            )
                        }}
                    </p>
                    <div class="mt-4">
                        <label
                            for="cancellation-reason"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            {{ $t("Reason for moderation") }}
                        </label>
                        <input
                            id="cancellation-reason"
                            v-model="cancellationReason"
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 sm:text-sm"
                        />
                    </div>
                </div>
            </template>
            <template v-else>
                <div>
                    <p>
                        {{
                            $t(
                                "You are about to request a cancellation for this order. Please provide a reason for the cancellation."
                            )
                        }}
                    </p>
                    <div class="mt-4">
                        <label
                            for="cancellation-reason"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            {{ $t("Reason for cancellation") }}
                        </label>
                        <input
                            id="cancellation-reason"
                            v-model="cancellationReason"
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 sm:text-sm"
                        />
                    </div>
                </div>
            </template>
        </confirmation-modal>
    </div>
</template>

<script>
import ConfirmationModal from "./ConfirmationModal.vue";

export default {
    components: {
        ConfirmationModal,
    },
    props: {
        isBuyer: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Object,
            required: true,
        },
    },
    emits: ["request-cancellation", "cancel-order", "confirm-order"],
    data() {
        return {
            showModal: false,
            currentAction: "",
            cancellationReason: "",
        };
    },
    computed: {
        canModerate() {
            return (
                this.order.status !== "cancelled" &&
                this.order.status !== "completed"
            );
        },
    },
    methods: {
        openConfirmationModal(action) {
            this.currentAction = action;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async confirmCommand() {
            this.closeModal();
            if (this.currentAction === "cancel") {
                await axios
                    .post(`/user/p2p/orders/${this.order.id}/cancel`, {
                        order_id: this.order.id,
                    })
                    .then((response) => {
                        this.$toast[response.type](response.message);
                        this.$emit("request-cancellation");
                    });
            } else if (this.currentAction === "confirm") {
                this.$emit("confirm-order");
            } else {
                this.submitCancellationRequest();
            }
        },
        async submitCancellationRequest() {
            await axios
                .post(`/user/p2p/orders/${this.order.id}/cancel`, {
                    reason: this.cancellationReason,
                })
                .then((response) => {
                    this.$toast[response.type](response.message);
                    this.$emit("request-cancellation");
                });
        },
    },
};
</script>
