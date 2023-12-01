<template>
  <div class="card card-transaction">
    <div class="card-header">
      <h4 class="card-title">
        {{ $t("Latest Commissions") }}
      </h4>
    </div>
    <div style="overflow-y: auto; max-height: 420px;">
      <template v-if="mlmStore.bvLogs != null && mlmStore.bvLogs.length > 0">
        <div
          v-for="(bvLog, index) in mlmStore.bvLogs"
          :key="index"
          class="border-b dark:border-gray-600"
        >
          <div class="flex items-center justify-between p-2 font-medium">
            <div class="flex items-center">
              <commission-icons :bv-log="bvLog" />
              <description-with-date :bv-log="bvLog" />
            </div>
            <div>
              <span class="badge bg-success">{{ bvLog.amount }} BV</span>
            </div>
          </div>
        </div>
      </template>
      <div
        v-else
        class="text-muted mb-5 flex flex-col items-center justify-center text-center"
        colspan="100%"
      >
        <img
          height="128"
          width="128"
          src="https://assets.staticimg.com/pro/2.0.4/images/empty.svg"
          alt=""
        />
        <p class="">
          {{ $t("No Transactions Found") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import CommissionIcons from "./CommissionIcons.vue";
  import DescriptionWithDate from "./DescriptionWithDate.vue";

  export default {
    name: "LatestCommissions",
    components: {
      CommissionIcons,
      DescriptionWithDate,
    },
    props: {
      mlmStore: {
        type: Object,
        required: true,
      },
    },
  };
</script>
