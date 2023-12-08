<template>
  <div class="card">
    <div class="card-body border-primary text-center">
      <div class="pricing-badge text-end">
        <span class="badge bg-success">{{ $t("Next Rank") }}</span>
      </div>
      <div class="mb-1 flex justify-center">
        <img
          src="/assets/images/illustration/Pot2.svg"
          class="mb-1"
          alt="svg img"
        />
      </div>
      <h3 class="p-4 text-2xl font-bold dark:text-white">
        VIP
        {{ mlmStore.planB != null && mlmStore.planB.rank }}
      </h3>
      <div class="annual-plan my-2">
        <div class="plan-price flex justify-center">
          <sup class="d-block font-medium-1 text-primary mt-2 font-medium">{{
            plat.mlm.membership_deposit_currency
          }}</sup>
          <span class="text-2xl font-bold text-blue-900">{{
            mlmStore.planB != null && mlmStore.planB.deposits_required
          }}</span>
          <sub class="pricing-duration text-body font-medium-1 mt-3 font-medium"
            >{{ $t("Required") }}
            <i
              v-if="
                mlmStore.mlm.value &&
                mlmStore.mlm.membership_deposits -
                  mlmStore.planB.deposits_required >
                  0
              "
              class="bi bi-check-circle text-success"
            ></i
          ></sub>
        </div>
      </div>
      <ul
        class="max-w-md list-inside list-disc space-y-1 text-start text-gray-500 dark:text-gray-400"
      >
        <li
          class="list-group-item"
          :class="
            mlmStore.directs != null &&
            mlmStore.directs - mlmStore.planB.direct_required > 0
              ? 'text-success'
              : ''
          "
        >
          {{ $t("Required Direct Referral") }}:
          {{ mlmStore.planB != null && mlmStore.planB.direct_required }}
          <i
            v-if="
              mlmStore.directs != null &&
              mlmStore.directs - mlmStore.planB.direct_required > 0
            "
            class="bi bi-check-circle"
          ></i>
        </li>
        <li
          v-if="mlmStore.bv_total != null"
          class="list-group-item"
          :class="
            mlmStore.bv_total - mlmStore.planB.bv_required > 0
              ? 'text-success'
              : ''
          "
        >
          {{ $t("Required Business Value") }}:
          {{ mlmStore.planB.bv_required }}
          BV
          <i
            v-if="
              mlmStore.bv_total != null &&
              mlmStore.bv_total - mlmStore.planB.bv_required > 0
            "
            class="bi bi-check-circle"
          ></i>
        </li>
        <li class="list-group-item">
          {{ $t("Withdrawal Percentage") }}:
          {{ mlmStore.planB != null && mlmStore.planB.margin }}
          %
        </li>
      </ul>
      <br />
      <button class="btn btn-outline-primary mt-5" @click="handleClick()">
        {{
          mlmStore.mlm.value &&
          (mlmStore.mlm.membership == 0 || mlmStore.mlm.membership == null)
            ? $t("Become An Affiliate")
            : $t("Upgrade")
        }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NextRank",
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
    emits: ["show-deposit-modal"],
    methods: {
      handleClick() {
        this.$emit("show-deposit-modal");
      },
    },
  };
</script>
