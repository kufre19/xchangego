<template>
  <div class="card">
    <div
      v-if="
        mlmStore.mlm.value &&
        (mlmStore.mlm.membership == 1 || mlmStore.mlm.membership == 2)
      "
      class="card-body text-center"
    >
      <div class="text-end">
        <span class="badge bg-primary">{{ $t("Current Rank") }}</span>
      </div>
      <div class="mb-1 flex justify-center">
        <img
          src="/assets/images/illustration/Pot1.svg"
          class="mb-2 mt-5"
          alt="svg img"
        />
      </div>
      <h3 class="p-4 text-2xl font-bold dark:text-white">
        VIP
        {{ mlmStore.mlm.membership_rank }}
      </h3>
      <div class="annual-plan my-2">
        <div class="plan-price flex justify-center">
          <sup class="text-xl font-bold text-blue-500">{{
            plat.mlm.membership_deposit_currency
          }}</sup>
          <span class="text-2xl font-bold text-blue-900">{{
            mlmStore.mlm.membership_deposits
          }}</span>
          <sub
            class="pricing-duration text-body font-medium-1 mt-3 font-medium"
            >{{ $t("Deposited") }}</sub
          >
        </div>
      </div>
      <ul
        class="max-w-md list-inside list-disc space-y-1 text-start text-gray-500 dark:text-gray-400"
      >
        <li class="list-group-item">
          {{ $t("Direct Referrals") }}:
          {{ mlmStore.directs }}
        </li>
        <li class="list-group-item">
          {{ $t("Current Business Value") }}:
          {{ mlmStore.bv_total }}
          BV
        </li>
        <li class="list-group-item">
          {{ $t("Withdrawal Percentage") }}:
          {{ mlmStore.planA.margin }}
          %
        </li>
      </ul>
      <button class="btn btn-outline-info mt-5">
        {{ $t("Your current Rank") }}
      </button>
    </div>
    <div v-else class="card-body text-center">
      <div class="text-end">
        <span class="badge bg-primary">{{ $t("Current Rank") }}</span>
      </div>
      <div class="mb-1 flex justify-center">
        <img
          src="/assets/images/illustration/Pot1.svg"
          class="mb-2 mt-5 h-24 w-12"
          alt="svg img"
        />
      </div>
      <h3 class="p-4 text-2xl font-bold dark:text-white">
        {{ $t("No VIP Privilege") }}
      </h3>
      <div class="annual-plan my-2">
        <div class="plan-price flex justify-center">
          <sup class="text-xl font-bold text-blue-500">{{
            plat.mlm.membership_deposit_currency
          }}</sup>
          <span class="text-2xl font-bold text-blue-900">{{
            mlmStore.mlm.value && mlmStore.mlm.membership_deposits
              ? mlmStore.mlm.membership_deposits
              : 0
          }}</span>
          <sub
            class="pricing-duration text-body font-medium-1 mt-3 font-medium"
            >{{ $t("Deposited") }}</sub
          >
        </div>
      </div>
      <ul
        class="max-w-md list-inside list-disc space-y-1 text-start text-gray-500 dark:text-gray-400"
      >
        <li class="list-group-item">
          {{ $t("Direct Referrals") }}:
          {{ mlmStore.directs }}
        </li>
        <li class="list-group-item">
          {{ $t("Current Business Value") }}:
          {{ mlmStore.bv_total }}
          BV
        </li>
        <li class="list-group-item">
          {{ $t("Withdrawal Percentage") }}:
          {{ mlmStore.planA != null && mlmStore.planA.margin }}
          %
        </li>
      </ul>
      <button class="btn btn-outline-info mt-5">
        {{ $t("Your current Rank") }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CurrentRank",
    props: {
      mlmStore: {
        type: Object,
        required: true,
      },
      plat: {
        type: Object,
        required: true,
      },
    },
  };
</script>
