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
          case 1:
            return "Deposit";
          case 2:
            return "Withdraw";
          case 3:
            return "Transfer";
          case 4:
            return "Transfer";
          case 5:
            return "Transfer";
          case 6:
            return "Transfer";
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
            return "send";
          case 4:
            return "send";
          case 5:
            return "send";
          case 6:
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
            return "text-danger";
          case 3:
            return "text-warning";
          case 4:
            return "text-warning";
          case 5:
            return "text-warning";
          case 6:
            return "text-warning";
          case 7:
            return "text-warning";
        }
      },
    },
  };
</script>
