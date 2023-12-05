<template>
  <div class="space-y-5">
    <investment-plans
      :plans="plans"
      :total-invested="totalInvested"
      :total-profit="totalProfit"
      :today-profit="todayProfit"
      @start-investment="showInvestmentModal"
    />
    <investment-logs :logs="logs" @investment-cancel="fetchData" />
    <investment-modal
      v-if="showModal == true"
      :plan="selectedPlan"
      :wallet="wallet"
      @close-modal="closeInvestmentModal"
      @investment-made="completeInvestment"
      @wallet-created="fetchData"
    />
  </div>
</template>

<script>
  import { ref, onMounted } from "vue";
  import InvestmentPlans from "./investment/InvestmentPlans.vue";
  import InvestmentLogs from "./investment/InvestmentLogs.vue";
  import InvestmentModal from "./investment/InvestmentModal.vue";
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/store/user";

  export default {
    name: "Investment",
    components: { InvestmentPlans, InvestmentLogs, InvestmentModal },
    setup() {
      const pageTitle = "Investment Plans and Logs";
      const plans = ref([]);
      const logs = ref([]);
      const wallet = ref([]);
      const showModal = ref(false);
      const selectedPlan = ref(null);
      const totalInvested = ref(0);
      const totalProfit = ref(0);
      const todayProfit = ref(0);

      const fetchData = () => {
        axios
          .get("/user/investment")
          .then((response) => {
            plans.value = response.plans;
            logs.value = response.logs;
            totalInvested.value = response.totalInvested;
            totalProfit.value = response.totalProfit;
            todayProfit.value = response.todayProfit;
            wallet.value = response.wallet;
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const showInvestmentModal = (plan) => {
        selectedPlan.value = plan;
        showModal.value = true;
      };

      const closeInvestmentModal = () => {
        showModal.value = false;
      };

      const completeInvestment = () => {
        fetchData();
        showModal.value = false;
      };

      const userStore = useUserStore();
      const router = useRouter();
      async function checkKyc() {
        if (
          plat.kyc.kyc_status == 1 &&
          Number(plat.kyc.investments_restriction) === 1
        ) {
          if (!userStore.user) {
            await userStore.fetch();
          }
          if (!userStore.user.kyc_application) {
            router.push("/identity");
          }
          if (
            userStore.user.kyc_application &&
            userStore.user.kyc_application.level < 2 &&
            userStore.user.kyc_application.status !== "approved"
          ) {
            router.push("/identity");
          }
        }
      }

      onMounted(() => {
        checkKyc();
        fetchData();
      });

      return {
        pageTitle,
        plans,
        logs,
        wallet,
        showModal,
        selectedPlan,
        totalInvested,
        totalProfit,
        todayProfit,
        showInvestmentModal,
        closeInvestmentModal,
        completeInvestment,
      };
    },
  };
</script>
