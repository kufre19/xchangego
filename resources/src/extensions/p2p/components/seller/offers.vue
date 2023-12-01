<template>
  <div
    class="mb-4 items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0"
  >
    <h2 class="if-sm text-lg font-medium">{{ $t("My Offers") }}</h2>
    <div class="grid xs:grid-cols-1 md:grid-cols-2">
      <button
        class="btn btn-outline-primary mr-2 mt-1"
        @click="showCreateModal = true"
      >
        <i class="bi bi-plus-lg"></i> {{ $t("Create Offer") }}
      </button>
      <Filter>
        <input
          v-model="filters.currency.value"
          type="text"
          class="filter-input"
          placeholder="Currency"
        />
      </Filter>
    </div>
  </div>
  <div class="card relative overflow-x-auto">
    <VTable
      :key="p2pSellerStore.allOffers.length"
      v-model:current-page="currentPage"
      class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
      :data="p2pSellerStore.allOffers"
      :filters="filters"
      :page-size="10"
      :hide-sort-icons="true"
      @totalPagesChanged="totalPages = $event"
    >
      <template #head>
        <tr
          class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          <VTh sort-key="currency" scope="col" class="py-3 px-6">
            <Col text="Currency" />
          </VTh>
          <VTh sort-key="price" scope="col" class="py-3 px-6">
            <Col text="Price" />
          </VTh>
          <VTh sort-key="available" scope="col" class="py-3 px-6">
            <Col text="Limit/Available" />
          </VTh>
          <VTh
            :sort-key="customSortFunction('method')"
            scope="col"
            class="py-3 px-6"
          >
            <Col text="Payment Method" />
          </VTh>
          <th scope="col" class="py-3 px-6">{{ $t("Actions") }}</th>
        </tr>
      </template>
      <template #body="{ rows }">
        <template v-if="p2pSellerStore.allOffers.length > 0">
          <tr
            v-for="row in rows"
            :key="row.id"
            class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <td data-label="Currency" class="py-4 px-6">
              {{ row.currency }}
            </td>
            <td data-label="Price" class="py-4 px-6">
              {{ formatCurrency(formatNumber(row.price), row.fiat) }}
            </td>
            <td data-label="Limit/Available" class="py-4 px-6">
              <div>
                {{ $t("Available") }}:
                {{ formatNumber(row.available) }}
                {{ row.currency }}
              </div>
              <div>
                {{ $t("Limit") }}: {{ formatNumber(row.min) }} /
                {{ formatNumber(row.max) }}
              </div>
            </td>
            <td data-label="Payment Method" class="py-4 px-6">
              {{ row.method.name }}
            </td>
            <td data-label="Actions" class="py-4 px-6">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="editOffer(row)"
              >
                {{ $t("Edit Offer") }}
              </button>
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

  <EditOfferModal
    :offer="selectedOffer"
    :payment-methods="p2pSellerStore.methods"
    :show-modal="showEditModal"
    :disable-price-update="disablePriceUpdate"
    @update="handleUpdate"
    @close="closeEditModal"
  />
  <create-offer-modal
    :show="showCreateModal"
    :payment-methods="p2pSellerStore.methods"
    @close="showCreateModal = false"
    @created="p2pSellerStore.fetch"
  />
</template>

<!-- Rest of the component remains the same -->

<script>
  import { useP2PSellerStore } from "../../../../store/p2p/sellers";
  import Filter from "../../../../partials/table/Filter.vue";
  import Col from "../../../../partials/table/Col.vue";
  import EditOfferModal from "../modals/edit-offer-modal.vue";
  import CreateOfferModal from "./create-offer-modal.vue";

  export default {
    name: "SellerOffers",
    components: {
      Filter,
      Col,
      EditOfferModal,
      CreateOfferModal,
    },
    setup() {
      const p2pSellerStore = useP2PSellerStore();

      return {
        p2pSellerStore,
      };
    },
    data() {
      return {
        filters: {
          currency: { value: "", keys: ["currency"] },
        },
        currentPage: 1,
        totalPages: 0,
        showEditModal: false,
        showCreateModal: false,
        selectedOffer: {},
      };
    },
    computed: {
      disablePriceUpdate() {
        if (!this.selectedOffer.orders) {
          return false;
        }

        return this.selectedOffer.orders.some((order) =>
          ["open", "paid"].includes(order.status)
        );
      },
    },
    methods: {
      editOffer(offer) {
        this.selectedOffer = offer;
        this.showEditModal = true;
      },
      // Handle the update event from the EditOfferModal
      async handleUpdate() {
        this.closeEditModal();
      },
      // Close the EditOfferModal
      closeEditModal() {
        this.showEditModal = false;
      },

      customSortFunction(sortKey) {
        return (a, b) => {
          if (sortKey === "user.username") {
            return a.user.username.localeCompare(b.user.username);
          } else if (sortKey === "method.name") {
            return a.method.name.localeCompare(b.method.name);
          }
          return undefined;
        };
      },
      formatNumber(number) {
        const formattedNumber = parseFloat(number).toFixed(8);
        const withoutTrailingZeros = parseFloat(formattedNumber).toString();
        const decimalPlaces = (withoutTrailingZeros.split(".")[1] || []).length;

        return parseFloat(number).toFixed(Math.max(2, decimalPlaces));
      },
      formatCurrency(value, currency = "USD") {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency,
        }).format(value);
      },
    },
  };
</script>
