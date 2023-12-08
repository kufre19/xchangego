<template>
  <div
    class="mb-4 items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0"
  >
    <div class="font-medium">{{ $t("Transactions") }}</div>
    <Filter>
      <input
        v-model="filters.symbol.value"
        type="text"
        class="filter-input"
        placeholder="Symbol"
    /></Filter>
  </div>
  <div class="card relative overflow-x-auto">
    <VTable
      :key="walletsStore.wallet_trx.length"
      v-model:current-page="currentPage"
      class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
      :data="walletsStore.wallet_trx"
      :filters="filters"
      :page-size="5"
      :hide-sort-icons="true"
      @totalPagesChanged="totalPages = $event"
    >
      <template #head>
        <tr
          class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          <VTh sort-key="type" scope="col" class="py-3 pl-3">
            <Col text="Type" />
          </VTh>
          <th sort-key="date" scope="col" class="py-3 px-6">
            {{ $t("Date") }}
          </th>
          <VTh sort-key="amount" scope="col" class="py-3">
            <Col text="Amount" />
          </VTh>
          <VTh sort-key="charge" scope="col" class="py-3">
            <Col text="Fee" />
          </VTh>
          <VTh sort-key="amount_recieved" scope="col" class="py-3">
            <Col text="Recieved" />
          </VTh>
          <th scope="col" class="py-3">
            {{ $t("Status") }}
          </th>
        </tr>
      </template>
      <template #body="{ rows }">
        <template v-if="walletsStore.wallet_trx.length > 0">
          <tr
            v-for="row in rows"
            :key="row.id"
            class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <td
              data-label="Type"
              class="text-center flex justify-start py-2 items-center pl-3"
            >
              <transaction-type :type="row.type"></transaction-type>
            </td>
            <td data-label="Date" class="py-2 px-3">
              <toDate :time="row.created_at" :full="true" />
            </td>
            <td data-label="Amount" class="py-2">
              <span v-if="row.amount != 0">
                {{ parseFloat(row.amount) }}
                <span v-if="type == 'funding'">{{ cur_symbol }}</span>
              </span>
              <span v-else class="badge bg-warning">{{ $t("Pending") }} </span>
            </td>
            <td data-label="Fee" class="py-2">
              <template v-if="type == 'trading' && row.type == 2">
                {{ parseFloat(row.fees) }}
              </template>
              <template v-else>
                <span v-if="row.charge != null">
                  {{ parseFloat(row.charge) }}
                  <span v-if="type == 'funding'">{{ cur_symbol }}</span>
                </span>
                <span v-else class="badge bg-warning"
                  >{{ $t("Pending") }}
                </span>
              </template>
            </td>
            <td data-label="Received" class="py-2">
              <span v-if="row.amount_recieved != 0">
                {{ parseFloat(row.amount_recieved) }}
              </span>
              <span v-else class="badge bg-warning">{{ $t("Pending") }} </span>
            </td>
            <td data-label="Status" class="py-2">
              <span v-if="row.status == 1" class="badge bg-success">{{
                $t("Completed")
              }}</span>
              <span v-else-if="row.status == 2" class="badge bg-warning">{{
                $t("Pending")
              }}</span>
              <span v-else-if="row.status == 3" class="badge bg-danger">{{
                $t("Rejected")
              }}</span>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr
            scope="row"
            class="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
          >
            <td colspan="100%" class="py-4 px-6">
              {{ $t("No transaction found!") }}
            </td>
          </tr>
        </template>
      </template>
    </VTable>
  </div>

  <VTPagination
    v-model:currentPage="currentPage"
    class="float-right flex items-center justify-between pt-4"
    aria-label="Table navigation"
    :total-pages="totalPages"
    :max-page-links="3"
    :boundary-links="true"
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
  import { useWalletsStore } from "@/store/wallets";
  import toMoney from "@/partials/toMoney.vue";
  import toDate from "@/partials/toDate.vue";
  import Filter from "@/partials/table/Filter.vue";
  import Col from "@/partials/table/Col.vue";
  import TransactionType from "./TransactionType.vue";
  export default {
    components: {
      toMoney,
      toDate,
      Filter,
      Col,
      TransactionType,
    },
    props: {
      type: String,
    },
    emits: ["totalPagesChanged"],
    setup() {
      const walletsStore = useWalletsStore();
      return { walletsStore };
    },
    data() {
      return {
        filters: {
          symbol: { value: "", keys: ["symbol"] },
        },
        currentPage: 1,
        totalPages: 0,
        provider: provider,
        cur_symbol: cur_symbol,
      };
    },
  };
</script>
