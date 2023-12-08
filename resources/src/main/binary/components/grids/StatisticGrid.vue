<template>
  <div class="grid grid-cols-2 gap-5 xs:grid-cols-1 sm:grid-cols-2">
    <StatisticCard
      :trade-value="removeDecimals(log)"
      :trade-label="$t('Total Trades')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="text-warning h-8 w-8 justify-center"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
    </StatisticCard>

    <StatisticCard
      :trade-value="removeDecimals(win)"
      :trade-label="$t('Wining Trades')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="text-success h-8 w-8 justify-center"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
        />
      </svg>
    </StatisticCard>

    <StatisticCard
      :trade-value="removeDecimals(draw)"
      :trade-label="$t('Draw Trades')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="text-info h-8 w-8 justify-center"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
    </StatisticCard>

    <StatisticCard
      :trade-value="removeDecimals(lose)"
      :trade-label="$t('Lost Trades')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="text-danger h-8 w-8 justify-center"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
        />
      </svg>
    </StatisticCard>
  </div>
</template>

<script>
  import StatisticCard from "./StatisticCard.vue";

  export default {
    name: "StatisticGrid",
    components: {
      StatisticCard,
    },
    props: {
      log: {
        type: Number,
        default: 0,
      },
      win: {
        type: Number,
        default: 0,
      },
      draw: {
        type: Number,
        default: 0,
      },
      lose: {
        type: Number,
        default: 0,
      },
    },
    methods: {
      removeDecimals(number) {
        return Math.floor(number);
      },
    },
  };
</script>
