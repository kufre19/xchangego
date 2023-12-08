<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <div class="title-gradient">{{ $t("Total Invested") }}</div>
        </div>
      </div>
      <div class="card-body">
        <div class="text-3xl font-bold">${{ totalInvested }}</div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <div class="title-gradient">{{ $t("Total Profit") }}</div>
        </div>
      </div>
      <div class="card-body">
        <div class="text-3xl font-bold">${{ totalProfit }}</div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <div class="title-gradient">{{ $t("Today's Profit") }}</div>
        </div>
      </div>
      <div class="card-body">
        <div class="text-3xl font-bold">${{ todayProfit }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      totalInvested: {
        type: [Number, String],
        required: true,
      },
      totalProfit: {
        type: [Number, String],
        required: true,
      },
      todayProfit: {
        type: [Number, String],
        required: true,
      },
    },
  };
</script>
