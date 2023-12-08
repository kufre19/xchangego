<template>
  <div class="card relative my-5 overflow-x-auto">
    <VTable
      :key="forexStore.investment_logs.length"
      v-model:current-page="currentPage"
      class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
      :data="forexStore.investment_logs"
      :page-size="5"
      :hide-sort-icons="true"
      @totalPagesChanged="totalPages = $event"
    >
      <template #head>
        <tr
          class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          <VTh sort-key="investment_id" scope="col" class="py-3 px-6">
            <Col text="Plan" />
          </VTh>
          <VTh sort-key="amount" scope="col" class="py-3 px-6">
            <Col text="Amount" />
          </VTh>
          <VTh sort-key="profit" scope="col" class="py-3 px-6">
            <Col text="Profit" />
          </VTh>
          <VTh sort-key="duration" scope="col" class="py-3 px-6">
            <Col text="Duration" />
          </VTh>
          <VTh sort-key="status" scope="col" class="py-3 px-6">
            <Col text="Status" />
          </VTh>
        </tr>
      </template>
      <template #body="{ rows }">
        <template v-if="forexStore.investment_logs.length > 0">
          <tr
            v-for="row in rows"
            :key="row.id"
            class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <td data-label="Plan" class="text-uppercase py-3 px-6">
              {{ row.investment.title }}
            </td>
            <td class="py-3 px-6" data-label="Amount">
              {{ row.amount * (userStore?.currency?.rate ?? 1) }}
              {{ userStore.currency ? userStore.currency.symbol : "USD" }}
            </td>
            <td data-label="Profit" class="py-3 px-6">
              <span v-if="row.result == 1" class="text-success">
                +
                {{
                  row.profit * userStore.currency ? userStore.currency.rate : 1
                }}
                {{ userStore.currency ? userStore.currency.symbol : "USD" }}
              </span>
              <span v-else-if="row.result == 2" class="text-danger">
                -
                {{
                  row.profit * userStore.currency ? userStore.currency.rate : 1
                }}
                {{ userStore.currency ? userStore.currency.symbol : "USD" }}
              </span>
              <span v-else-if="row.result == 3">
                {{
                  row.profit * userStore.currency ? userStore.currency.rate : 1
                }}
                {{ userStore.currency ? userStore.currency.symbol : "USD" }}
              </span>
              <span v-else class="badge bg-warning">{{ $t("Pending") }} </span>
            </td>
            <td class="py-3 px-6" data-label="Duration">
              <div>
                {{ $t("Start") }}:
                <span class="fw-bold">{{ row.start_date }}</span>
              </div>
              <div>
                {{ $t("End") }}:
                <span class="fw-bold">{{ row.end_date }}</span>
              </div>
            </td>
            <td class="py-3 px-6" data-label="Status">
              <span v-if="row.status !== 1" class="badge bg-primary">{{
                $t("Running")
              }}</span>
              <span v-else class="badge bg-success">{{ $t("Complete") }}</span>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr
            scope="row"
            class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <td colspan="100%" class="py-4 px-6">
              {{ $t("No results found!") }}
            </td>
          </tr>
        </template>
      </template>
    </VTable>
  </div>

  <VTPagination
    v-model:currentPage="currentPage"
    aria-label="Table navigation"
    :total-pages="totalPages"
    :boundary-links="true"
    :max-page-links="3"
    class="flex items-center justify-between pt-4"
  >
    <template #firstPage> {{ $t("First") }} </template>

    <template #lastPage> {{ $t("Last") }} </template>

    <template #next
      ><span class="sr-only">{{ $t("Next") }}</span>
      <svg
        class="h-5 w-5"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </template>

    <template #previous>
      <span class="sr-only">{{ $t("Previous") }}</span>
      <svg
        class="h-5 w-5"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </template>
  </VTPagination>
</template>

<script>
  import Filter from "@/partials/table/Filter.vue";
  import Col from "@/partials/table/Col.vue";
  export default {
    name: "InvestmentLogs",
    components: {
      Filter,
      Col,
    },
    props: {
      forexStore: {
        type: Object,
        required: true,
      },
      userStore: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        currentPage: 1,
        totalPages: 0,
      };
    },
  };
</script>
