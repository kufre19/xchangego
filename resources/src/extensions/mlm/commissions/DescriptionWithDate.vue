<template>
  <div>
    <span :class="spanClass">
      {{ getDescriptionText }}
    </span>
    <div>
      <small>
        <toDate :time="bvLog.created_at" />
      </small>
    </div>
  </div>
</template>

<script>
  import toDate from "@/partials/toDate.vue";
  export default {
    components: {
      toDate,
    },
    props: {
      bvLog: {
        type: Object,
        required: true,
      },
    },
    computed: {
      spanClass() {
        return "text-success font-medium";
      },
      getDescriptionText() {
        switch (this.bvLog.type) {
          case 1:
            return this.$t("Referral Deposit");
          case 2:
            return this.$t("Referral First Deposit");
          case 3:
            return this.$t("Active Referral First Deposit");
          case 4:
            return this.$t("Trade");
          case 5:
            return this.$t("Bot Investment");
          case 6:
            return this.$t("Token ICO Purchase");
          case 7:
            return this.$t("Forex Deposit");
          case 8:
            return this.$t("Forex Investment");
          case 9:
            return this.$t("Staking");
          case 10:
            return this.$t("Community Line");
          case 11:
            return this.$t("Membership Withdraw");
          case 12:
            return this.$t("Membership Deposit");
          default:
            return "";
        }
      },
    },
  };
</script>
