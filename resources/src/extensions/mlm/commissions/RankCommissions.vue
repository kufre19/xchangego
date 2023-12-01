<template>
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">
        {{ $t("Rank Commissions") }}
      </h4>
    </div>
    <div
      v-if="mlmStore.planA != null"
      style="overflow-y: auto; max-height: 280px;"
    >
      <commission-method
        v-for="(type, index) in filteredCommissionTypes"
        :key="index"
        :title="type.title"
        :icon="type.icon"
        class="border-b dark:border-gray-600"
        :commission="type.commission"
      />
    </div>
  </div>
</template>

<script>
  import CommissionMethod from "./CommissionMethod.vue";

  export default {
    name: "RankCommissions",
    components: {
      CommissionMethod,
    },

    props: {
      plat: {
        type: Object,
        required: true,
      },
      mlmStore: {
        type: Object,
        required: true,
      },
    },
    computed: {
      filteredCommissionTypes() {
        return this.commissionTypes.filter((type) => type.condition);
      },
      commissionTypes() {
        const commissionTypes = [
          {
            condition: this.mlmStore.planA.deposit_commission != null,
            title: "Deposit",
            icon: "cash",
            commission: this.mlmStore.planA.deposit_commission,
          },
          {
            condition: this.mlmStore.planA.trade_commission != null,
            title: "Trade",
            icon: "currency-exchange",
            commission: this.mlmStore.planA.trade_commission,
          },
          {
            condition: this.mlmStore.planA.bot_commission != null,
            title: "Bot Investment",
            icon: "robot",
            commission: this.mlmStore.planA.bot_commission,
          },
          {
            condition: this.mlmStore.planA.ico_commission != null,
            title: "Token Offer Purchase",
            icon: "coin",
            commission: this.mlmStore.planA.ico_commission,
          },
          {
            condition: this.mlmStore.planA.forex_commission != null,
            title: "Forex Deposit",
            icon: "bar-chart",
            commission: this.mlmStore.planA.forex_commission,
          },
          {
            condition: this.mlmStore.planA.forex_investment_commission != null,
            title: "Forex Investment",
            icon: "bar-chart",
            commission: this.mlmStore.planA.forex_investment_commission,
          },
          {
            condition: this.mlmStore.planA.staking != null,
            title: "Staking",
            icon: "layers",
            commission: this.mlmStore.planA.staking,
          },
          {
            condition: this.mlmStore.planA.community_line_status != null,
            title: "Community Line",
            icon: "layers",
            commission: this.mlmStore.planA.community_line_status,
          },
        ];

        if (this.plat.mlm.type === "binary") {
          commissionTypes.push(
            {
              condition: this.mlmStore.planA.ref_commission != null,
              title: "First Deposit",
              icon: "node-plus",
              commission: this.mlmStore.planA.ref_commission,
            },
            {
              condition: this.mlmStore.planA.active_ref_commission != null,
              title: "Active Referral First Deposit",
              icon: "award",
              commission: this.mlmStore.planA.active_ref_commission,
            }
          );
        }

        return commissionTypes;
      },
    },
  };
</script>
