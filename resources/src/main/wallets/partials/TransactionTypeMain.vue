<template>
  <div class="bg-dark w-8 rounded px-2 py-1 shadow">
    <i :class="transactionIconClass + ' bi bi-' + transactionIcon"></i>
  </div>
  <div class="ml-2" v-tooltip="transactionType">
    {{ transactionType }}
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: [Number, String],
        required: true,
      },
    },
    computed: {
      transactionType() {
        switch (this.type) {
          case 1:
            return "Deposit";
          case 2:
            return "Withdraw";
          case 3:
          case 4:
            return "Transfer";
          case "PT":
            return "Primary to Trading";
          case "PF":
            return "Primary to Funding";
          case "TP":
            return "Trading to Primary";
          case "FP":
            return "Funding to Primary";
          case "FUP":
            return "Futures to Primary";
          case "PFU":
            return "Primary to Futures";
          case 7:
            return "Unknown";
        }
      },
      transactionIcon() {
        switch (this.type) {
          case 1:
            return "journal-arrow-down";
          case 2:
            return "journal-arrow-up";
          case 3:
          case 4:
          case "PT":
          case "PF":
          case "TP":
          case "FP":
          case "FUP":
          case "PFU":
            return "send";
          case 7:
            return "envelope";
        }
      },
      transactionIconClass() {
        switch (this.type) {
          case 1:
            return "text-success";
          case 2:
          case 3:
            return "text-danger";
          case 4:
          case "PT":
          case "PF":
          case "TP":
          case "FP":
          case "FUP":
          case "PFU":
            return "text-success";
          case 7:
            return "text-warning";
        }
      },
    },
  };
</script>
