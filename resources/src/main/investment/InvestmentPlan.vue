<template>
  <div class="card">
    <div class="card-header flex justify-between">
      <h3 class="text-lg font-semibold md:text-base">{{ plan.name }}</h3>
      <div v-if="plan.recommanded == 1" class="badge bg-success">
        {{ $t("Recommended") }}
      </div>
    </div>
    <div class="card-body">
      <p class="">{{ plan.description }}</p>
      <div class="mt-4 flex flex-wrap justify-between">
        <div class="mb-2 flex items-center md:mb-0">
          <span class="text-dark text-lg font-semibold md:text-base">$</span>
          <span class="text-dark text-lg font-bold md:text-base">{{
            plan.min_amount
          }}</span>
          <span class="text-lg font-semibold md:text-base"> - $</span>
          <span class="text-lg font-bold md:text-base">{{
            plan.max_amount
          }}</span>
        </div>
        <div class="flex items-center">
          <span class="mr-2">{{ $t("Duration") }}:</span>
          <span class="text-dark font-bold md:text-base"
            >{{ plan.duration_in_days }}{{ $t("days") }} </span
          >
        </div>
      </div>
      <div class="mt-4 flex flex-wrap justify-between">
        <div class="mb-2 flex items-center md:mb-0">
          <span class="mr-2">{{ $t("Interest Rate") }}:</span>
          <span class="text-dark font-bold md:text-base"
            >{{ plan.interest_rate }}%</span
          >
        </div>
        <div class="flex items-center">
          <span class="mr-2">{{ $t("Total Investors") }}:</span>
          <span class="text-dark font-bold md:text-base">{{
            plan.total_investors
          }}</span>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <button
        type="button"
        class="w-full rounded bg-blue-500 py-2 px-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-none focus:outline-none focus:ring"
        @click="showInvestmentModal(plan)"
      >
        {{ $t("Invest Now") }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      plan: Object,
      recommended: Boolean,
    },
    emits: ["show-investment-modal"],
    methods: {
      showInvestmentModal(plan) {
        this.$emit("show-investment-modal", plan);
      },
    },
  };
</script>
