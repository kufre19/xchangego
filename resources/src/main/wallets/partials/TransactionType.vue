<template>
  <div class="bg-dark w-8 rounded px-2 py-1 shadow">
    <i :class="transactionIconClass + ' bi bi-' + transactionIcon"></i>
  </div>
  <div class="ml-2">{{ transactionType }}</div>
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
          case "1":
            return "Deposit";
          case "2":
            return "Withdraw";
          case "3":
          case "4":
          case "5":
          case "6":
            return "Transfer";
          case "FT":
            return "Funding to Trading Transfer";
          case "FFU":
            return "Funding to Futures Transfer";
          case "FUT":
            return "Futures to Trading Transfer";
          case "FUF":
            return "Futures to Funding Transfer";
          case "TF":
            return "Trading to Funding Transfer";
          case "TFU":
            return "Trading to Futures Transfer";
          case 7:
            return "Unknown";
        }
      },
      transactionIcon() {
        switch (this.type) {
          case "1":
            return "journal-arrow-down";
          case "2":
            return "journal-arrow-up";
          case "3":
          case "4":
          case "5":
          case "6":
          case "FT":
          case "FFU":
          case "FUT":
          case "FUF":
          case "TF":
          case "TFU":
            return "send";
          case 7:
            return "envelope";
        }
      },
      transactionIconClass() {
        switch (this.type) {
          case "1":
            return "text-success";
          case "2":
            return "text-danger";
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "FT":
          case "FFU":
          case "FUT":
          case "FUF":
          case "TF":
          case "TFU":
            return "text-warning";
        }
      },
    },
  };
</script>
