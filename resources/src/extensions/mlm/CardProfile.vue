<template>
  <div class="card card-profile">
    <div class="card-body">
      <div class="flex flex-col space-y-5 p-5 text-center">
        <div class="flex justify-center">
          <img
            :src="
              userStore.user &&
              userStore.user.profile_photo_path !== null &&
              userStore.user.profile_photo_path !== '' &&
              userStore.user.profile_photo_path !== undefined
                ? '/assets/images/profile/' + userStore.user.profile_photo_path
                : '/assets/images/profile/default.png'
            "
            class="rounded-full shadow-lg"
            height="96"
            width="96"
          />
        </div>
        <div
          class="text-center text-xl font-medium text-gray-900 dark:text-white"
        >
          {{ userStore.user ? userStore.user.firstname : "" }}
        </div>
        <div class="badge bg-success">
          {{ $t("Verified Trader") }}
        </div>
        <template v-if="plat.mlm.type == 'binary' && mlmStore.planA != null">
          <span
            v-if="mlmStore.planA.rank == 0"
            class="badge bg-primary profile-badge"
            >{{ $t("No Business Rank") }}</span
          >
          <span v-else class="badge bg-primary profile-badge"
            >{{ $t("Business Rank") }} {{ mlmStore.planA.rank }}</span
          >
        </template>
        <template v-else-if="plat.mlm.type == 'unilevel'">
          <span
            v-if="
              mlmStore.mlm.value &&
              (mlmStore.mlm.membership != 1 || mlmStore.mlm.membership != 2)
            "
            class="badge bg-dark"
            >{{ $t("No VIP Privilege") }}</span
          >
          <span v-else class="badge bg-primary"
            >{{ $t("VIP Rank") }}
            {{ mlmStore.mlm.value && mlmStore.mlm.membership_rank }}</span
          >
        </template>
      </div>
      <div class="mt-1">
        <div class="flex justify-between">
          <small>0 BV</small>
          <small>{{ plat.mlm.min_withdraw }} BV</small>
        </div>
        <Progress
          v-if="plat.mlm.min_withdraw != null"
          :progress="
            (mlmStore.bvWithdrawable / plat.mlm.min_withdraw) * 100 < 100
              ? (mlmStore.bvWithdrawable / plat.mlm.min_withdraw) * 100
              : 100
          "
        ></Progress>
        <small class="text-warning">{{
          $t("Progress To Unlock Withdrawal")
        }}</small
        ><br />
      </div>
    </div>
    <div class="card-footer">
      <button
        v-if="
          mlmStore.bvWithdrawable != null &&
          mlmStore.bvWithdrawable >= plat.mlm.min_withdraw
        "
        :key="mlmStore.bvWithdrawable"
        class="btn btn-outline-success w-full"
        :disabled="mlmStore.loading"
        @click="plat.mlm.membership_status == 1 ? handleClick() : Withdraw()"
      >
        {{ $t("Withdraw") }}
      </button>
      <button
        v-else
        type="button"
        class="btn btn-outline-secondary w-full"
        disabled
      >
        {{ $t("Withdraw Locked") }}
      </button>
    </div>
  </div>
</template>

<script>
  import { Progress } from "flowbite-vue";

  export default {
    name: "CardProfile",
    components: {
      Progress,
    },
    props: {
      userStore: {
        type: Object,
        required: true,
      },
      mlmStore: {
        type: Object,
        required: true,
      },
      plat: {
        type: Object,
        required: true,
      },
    },
    emits: ["show-withdraw-modal"],
    methods: {
      handleClick() {
        this.$emit("show-withdraw-modal");
      },
      async Withdraw() {
        await this.mlmStore.Withdraw();
      },
    },
  };
</script>
