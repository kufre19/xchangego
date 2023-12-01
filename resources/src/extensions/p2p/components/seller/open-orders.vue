<template>
  <div>
    <div
      class="mb-4 items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0"
    >
      <div class="font-medium">{{ $t("Open Orders") }}</div>
      <Filter>
        <input
          v-model="filters.buyerName.value"
          type="text"
          class="filter-input"
          placeholder="Buyer Name"
        />
      </Filter>
    </div>
    <div class="card relative overflow-x-auto">
      <VTable
        class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        :data="openOrders"
        :filters="filters"
        :page-size="10"
        :hide-sort-icons="true"
      >
        <template #head>
          <tr
            class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          >
            <VTh sort-key="buyer.name" scope="col" class="py-3 px-6">
              <Col text="Buyer" />
            </VTh>
            <VTh sort-key="amount" scope="col" class="py-3 px-6">
              <Col text="Amount" />
            </VTh>
            <VTh sort-key="price" scope="col" class="py-3 px-6">
              <Col text="Price" />
            </VTh>
            <VTh sort-key="status" scope="col" class="py-3 px-6">
              <Col text="Status" />
            </VTh>
            <th scope="col" class="py-3 px-6">
              {{ $t("Actions") }}
            </th>
          </tr>
        </template>
        <template #body="{ rows }">
          <template v-if="openOrders.length > 0">
            <tr
              v-for="row in rows"
              :key="row.id"
              class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td data-label="Buyer" class="py-4 px-6">
                {{ row.buyer ? row.buyer.name : "N/A" }}
              </td>

              <td data-label="Amount" class="py-4 px-6">
                {{ row.amount }}
              </td>
              <td data-label="Price" class="py-4 px-6">
                {{ row.price }}
              </td>
              <td data-label="Status" class="py-4 px-6">
                {{ row.status }}
              </td>
              <td data-label="Actions" class="py-4 px-6">
                <router-link
                  :to="`/p2p/order/${row.id}`"
                  class="btn btn-outline-primary btn-sm"
                >
                  {{ $t("View") }}
                </router-link>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              scope="row"
              class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td colspan="100%" class="py-4 px-6">
                {{ $t("No open orders found!") }}
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
</template>

<script>
  import Filter from "../../../../partials/table/Filter.vue";
  import Col from "../../../../partials/table/Col.vue";

  export default {
    name: "SellerOpenOrders",
    components: {
      Filter,
      Col,
    },
    props: {
      openOrders: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        filters: {
          buyerName: { value: "", keys: ["buyer.name"] },
        },
        currentPage: 1,
        totalPages: 0,
      };
    },
  };
</script>
