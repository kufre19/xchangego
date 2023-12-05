<template>
  <div class="text-center">
    <h2 :class="statusClass">
      <svg
        :class="statusIconClass"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fill-rule="evenodd" :d="iconPath" clip-rule="evenodd"></path>
      </svg>
      {{ statusMessage }}
    </h2>
    <p class="text-gray-600 dark:text-gray-400">{{ statusDescription }}</p>
    <div class="relative mt-4 flex justify-center items-center">
      <CountDown v-if="status === 'pending'" :time="initialTime" />
    </div>
    <button
      class="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-blue-600"
      @click="closeModal"
    >
      {{ status === "pending" ? $t("Cancel") : $t("Close") }}
    </button>
  </div>
</template>

<script>
  import CountDown from "./CountDown.vue";

  export default {
    props: {
      status: {
        type: String,
        required: true,
      },
    },
    components: {
      CountDown,
    },
    computed: {
      statusMessage() {
        switch (this.status) {
          case "pending":
            return this.$t("Pending Verification");
          case "canceled":
            return this.$t("Payment Canceled");
          case "completed":
            return this.$t("Payment Completed");
          case "failed":
            return this.$t("Payment Failed");
          case "expired":
            return this.$t("Payment Expired");
          case "invalid":
            return this.$t("Invalid Transaction Hash");
          case "rejected":
            return this.$t("Payment Rejected");
          default:
            return "";
        }
      },
      statusDescription() {
        switch (this.status) {
          case "pending":
            return this.$t(
              "Your transaction is currently pending and is waiting to be verified. Please refrain from closing the modal or refreshing the page until the verification process is complete. This may take a few moments, but rest assured that we are working diligently to ensure that your transaction is processed as quickly and securely as possible. Thank you for your patience and cooperation."
            );
          case "canceled":
            return this.$t(
              "We're sorry to inform you that your transaction has been canceled. We apologize for any inconvenience this may have caused. Please try again at your earliest convenience. If you continue to experience difficulties with your transaction, please contact our customer support team for assistance. Thank you for your understanding."
            );
          case "completed":
            return this.$t(
              "Congratulations! Your transaction has been successfully verified and completed. Thank you for choosing our service to carry out your transaction. If you have any questions or concerns regarding your transaction, please do not hesitate to contact our customer support team for assistance. Thank you for your trust in us, and we look forward to serving you again in the future."
            );
          case "failed":
            return this.$t(
              "We're sorry to inform you that your transaction has failed. Please double-check that the information you entered is correct and try again. If you continue to experience difficulties, please contact our customer support team for assistance."
            );
          case "expired":
            return this.$t(
              "We're sorry to inform you that your transaction has expired. This may be due to inactivity or an issue with your payment method. Please double-check that the information you entered is correct and try again. If you continue to experience difficulties, please contact our customer support team for assistance."
            );
          case "invalid":
            return this.$t(
              "We're sorry, but the transaction hash you entered is invalid or has already been used. Please double-check that the information you entered is correct and try again. If you believe there has been an error, please contact our customer support team for assistance."
            );
          case "rejected":
            return this.$t(
              "We're sorry, but your payment has been rejected. Please review the transaction details and try again. If you have any questions or concerns, please contact our customer support team for further assistance."
            );
          default:
            return "";
        }
      },
      statusClass() {
        switch (this.status) {
          case "pending":
            return "text-2xl font-bold text-yellow-600 dark:text-yellow-400";
          case "canceled":
          case "failed":
          case "expired":
          case "invalid":
          case "rejected":
            return "text-2xl font-bold text-red-600 dark:text-red-400";
          case "completed":
            return "text-2xl font-bold text-green-600 dark:text-green-400";
          default:
            return "";
        }
      },
      statusIconClass() {
        switch (this.status) {
          case "pending":
            return "mr-1 w-6 h-6";
          case "canceled":
          case "failed":
          case "expired":
          case "invalid":
          case "rejected":
            return "mx-auto h-12 w-12 p-1 mb-2 rounded-full border border-red-500 text-red-600 dark:border-red-400 dark:text-red-400";
          case "completed":
            return "mx-auto h-12 w-12 p-1 mb-2 rounded-full border border-green-500 text-green-600 dark:border-green-400 dark:text-green-400";
          default:
            return "";
        }
      },
      iconPath() {
        switch (this.status) {
          case "pending":
            return "";
          case "canceled":
          case "failed":
          case "expired":
          case "invalid":
          case "rejected":
            return "M15.707 4.293a1 1 0 00-1.414-1.414L10 8.586l-4.293-4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293z";
          case "completed":
            return "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z";
          default:
            return "";
        }
      },
    },
    methods: {
      closeModal() {
        // Emit an event to notify the parent component to close the modal
        if (this.status === "pending") {
          this.$emit("cancel");
        } else {
          this.$emit("close");
        }
      },
    },
  };
</script>

<style scoped>
  .animate-spin-slow {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
