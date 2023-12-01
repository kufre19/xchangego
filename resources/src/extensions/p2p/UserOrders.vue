<template>
  <div>
    <div
      class="mb-4 items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0"
    >
      <h1 class="text-2xl font-bold">
        {{ $t("My Orders") }}
      </h1>
      <Filter>
        <input
          v-model="filters.trx.value"
          type="text"
          class="filter-input"
          placeholder="Transaction ID"
        />
      </Filter>
    </div>
    <div class="card relative overflow-x-auto">
      <VTable
        v-model:current-page="currentPage"
        class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        :data="orders"
        :page-size="10"
        :hide-sort-icons="true"
        @totalPagesChanged="totalPages = $event"
      >
        <template #head>
          <tr
            class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          >
            <VTh sort-key="created_at" scope="col" class="py-3 px-6">
              <Col text="Date" />
            </VTh>
            <VTh sort-key="trx" scope="col" class="py-3 px-6"
              ><Col text="Transaction ID"
            /></VTh>
            <VTh sort-key="amount" scope="col" class="py-3 px-6"
              ><Col text="Amount"
            /></VTh>
            <VTh sort-key="status" scope="col" class="py-3 px-6"
              ><Col text="Status"
            /></VTh>
            <th scope="col" class="py-3 px-6">
              <Col text="Actions" />
            </th>
          </tr>
        </template>
        <template #body="{ rows }">
          <tr
            v-for="row in rows"
            :key="row.id"
            class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <td data-label="Date" class="py-4 px-6">
              <toDate :time="row.created_at" />
            </td>
            <td data-label="Trx" class="py-4 px-6">
              {{ row.trx }}
            </td>
            <td data-label="Amount" class="py-4 px-6">
              {{ row.amount }}
            </td>
            <td data-label="Status" class="py-4 px-6">
              <span :class="statusBadgeClass(row.status)">{{
                row.status
              }}</span>
            </td>

            <td data-label="Actions" class="py-4 px-6">
              <router-link
                v-if="row.status !== 'cancelled'"
                :to="'/p2p/order/' + row.id"
                class="btn btn-outline-primary btn-sm"
              >
                {{ $t("View order") }}
              </router-link>
            </td>
          </tr>
        </template>
      </VTable>
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

        <template #next>
          <span class="sr-only">{{ $t("Next") }}</span>
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
    </div>
  </div>
</template>

<script>
  import { useP2POrderStore } from "../../store/p2p/orders";
  import Filter from "../../partials/table/Filter.vue";
  import Col from "../../partials/table/Col.vue";
  import toDate from "../../partials/toDate.vue";

  export default {
    components: {
      Filter,
      Col,
      toDate,
    },
    setup() {
      const p2pOrderStore = useP2POrderStore();
      p2pOrderStore.fetchUserOrders();
      return {
        p2pOrderStore,
      };
    },
    data() {
      return {
        filters: {
          trx: { value: "", keys: ["trx"] },
        },
        currentPage: 1,
        totalPages: 0,
      };
    },
    computed: {
      orders() {
        return this.p2pOrderStore.userOrders;
      },
    },
    methods: {
      statusBadgeClass(status) {
        let badgeClass = "badge ";

        switch (status) {
          case "open":
            badgeClass += "bg-info";
            break;
          case "completed":
            badgeClass += "bg-success";
            break;
          case "pending":
            badgeClass += "bg-warning";
            break;
          case "cancelled":
            badgeClass += "bg-danger";
            break;
          case "paid":
            badgeClass += "bg-primary";
            break;
          default:
            badgeClass += "bg-secondary";
        }

        return badgeClass;
      },
    },
  };
</script>
