<template>
  <div class="grid gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
    <profile-card :user-store="userStore" :forex-store="forexStore" />
    <div class="grid grid-cols-2 gap-5">
      <summary-cards
        v-if="forexStore.account != null"
        :forex-account="forexStore.account"
        :account-balance="
          forexStore.account.balance * (userStore?.currency?.rate ?? 1)
        "
        :account-profit="
          (forexStore.forex_log
            ? forexStore.forex_log.profit
              ? forexStore.forex_log.profit
              : 0
            : 0) * (userStore?.currency?.rate ?? 1)
        "
        :total-investment="
          forexStore.investment_logs_amount * (userStore?.currency?.rate ?? 1)
        "
        :investments-profit="
          forexStore.investment_logs_profit * (userStore?.currency?.rate ?? 1)
        "
        :currency-symbol="
          userStore.currency ? userStore.currency.symbol : 'USD'
        "
        :forex-log="forexStore.forex_log"
        :investment-logs-amount="forexStore.investment_logs_amount"
        :investment-logs-profit="forexStore.investment_logs_profit"
      />
    </div>
    <transactions
      v-if="forexStore.account != null"
      :forex-store="forexStore"
      :forex-logs="forexStore.forex_logs"
      :user-currency-rate="userStore?.currency?.rate ?? 1"
      :user-currency-symbol="
        userStore.currency ? userStore.currency.symbol : 'USD'
      "
    />
    <div v-else class="card"></div>
  </div>
  <investments v-if="forexStore.account != null" :forex-store="forexStore" />
  <investment-logs
    v-if="forexStore.account != null"
    :forex-store="forexStore"
    :user-store="userStore"
  />

  <signals
    v-if="forexStore.account != null"
    :forex-signals="forexStore.account.signals"
  />

  <deposit-modal :forex-store="forexStore" />

  <withdraw-modal :forex-store="forexStore" :user-store="userStore" />

  <investment-modal :forex-store="forexStore" />
</template>

<script>
  import { useForexStore } from "@/store/forex";
  import { useUserStore } from "@/store/user";
  import ProfileCard from "./partials/ProfileCard.vue";
  import SummaryCards from "./partials/SummaryCards.vue";
  import Transactions from "./partials/Transactions.vue";
  import Investments from "./partials/Investments.vue";
  import InvestmentLogs from "./partials/InvestmentLogs.vue";
  import Signals from "./partials/Signals.vue";
  import DepositModal from "./partials/DepositModal.vue";
  import WithdrawModal from "./partials/WithdrawModal.vue";
  import InvestmentModal from "./partials/InvestmentModal.vue";
  export default {
    // component list
    components: {
      ProfileCard,
      SummaryCards,
      Transactions,
      Investments,
      InvestmentLogs,
      Signals,
      DepositModal,
      WithdrawModal,
      InvestmentModal,
    },
    setup() {
      const userStore = useUserStore();
      const forexStore = useForexStore();

      return { userStore, forexStore };
    },
    created() {
      this.forexStore.fetch();
    },
  };
</script>
