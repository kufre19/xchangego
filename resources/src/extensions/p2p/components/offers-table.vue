<template>
  <div>
    <div
      class="mb-4 items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0"
    >
      <div
        class="text-lg font-bold leading-tight text-gray-900 dark:text-gray-100"
      >
        {{ $t("Available Offers") }}
      </div>
      <div class="grid gap-5 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <input
          v-model="filters.username.value"
          class="form-control w-full"
          type="text"
          placeholder="Username"
        />
        <select v-model="filters.country.value" class="form-control w-full">
          <option value="">{{ $t("All Countries") }}</option>
          <option
            v-for="offer in offers"
            :key="offer?.user?.country"
            :value="offer?.user?.country"
          >
            <img
              :src="
                offer?.user?.country_code
                  ? '/assets/flags/' +
                    offer?.user?.country_code?.toLowerCase() +
                    '.svg'
                  : '/assets/flags/int.svg'
              "
              class="h-4 w-4 rounded-full mr-2"
              alt="Country Flag"
            />
            {{ offer?.user?.country }}
          </option>
        </select>
        <select v-model="filters.method.value" class="form-control w-full">
          <option value="">{{ $t("All Payment Methods") }}</option>
          <option
            v-for="method in paymentMethods"
            :key="method"
            :value="method"
          >
            {{ method }}
          </option>
        </select>
        <select v-model="filters.currency.value" class="form-control w-full">
          <option value="">{{ $t("All Currencies") }}</option>
          <option
            v-for="currency in currencies"
            :key="currency"
            :value="currency"
          >
            {{ currency }}
          </option>
        </select>
      </div>
    </div>
    <div class="card relative overflow-x-auto">
      <VTable
        :key="offers.length"
        v-model:current-page="currentPage"
        class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        :data="offers"
        :filters="filters"
        :page-size="10"
        :hide-sort-icons="true"
        @totalPagesChanged="totalPages = $event"
      >
        <template #head>
          <tr
            class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          >
            <VTh
              :sort-key="customSortFunction('user.username')"
              scope="col"
              class="py-3 px-6"
            >
              <Col text="Advertiser" />
            </VTh>
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
            <th scope="col" class="py-3 px-6">
              {{ $t("Actions") }}
            </th>
          </tr>
        </template>
        <template #body="{ rows }">
          <template v-if="offers.length > 0">
            <tr
              v-for="row in rows"
              :key="row.id"
              class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td data-label="Seller" class="py-4 px-6">
                <div class="flex items-center">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white"
                  >
                    {{ getInitials(row.user.username) }}
                  </div>
                  <div class="ml-2">
                    <span class="flex justify-start items-center">
                      <img
                        :src="
                          row.user?.country_code
                            ? '/assets/flags/' +
                              row.user?.country_code?.toLowerCase() +
                              '.svg'
                            : '/assets/flags/int.svg'
                        "
                        class="h-4 w-4 rounded-full mr-2"
                        alt="Country Flag"
                      />
                      {{ capitalizeFirstLetter(row.user.username) }}</span
                    >
                    <div class="text-xs text-gray-500">
                      {{ getCompletedOrders(row.user.id) }}
                      {{ $t("completed orders") }}
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ getCompletionRate(row.user.id) }}%
                      {{ $t("completion rate") }}
                    </div>
                  </div>
                </div>
              </td>
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
                  @click="openModal(row)"
                >
                  {{ $t("Buy Offer") }}
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
      :boundary-links="true"
      :max-page-links="3"
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

    <offer-modal
      :offer="selectedOffer"
      :completed-orders="
        selectedOffer.user ? getCompletedOrders(selectedOffer.user.id) : 0
      "
      :completion-rate="
        selectedOffer.user ? getCompletionRate(selectedOffer.user.id) : 0
      "
      :show-modal="showModal"
      @buy="buyOffer"
      @close="closeModal"
    />
  </div>
</template>

<script>
  import { useP2POrderStore } from "../../../store/p2p/orders";
  import { useP2POfferStore } from "../../../store/p2p/offers";
  import Filter from "../../../partials/table/Filter.vue";
  import Col from "../../../partials/table/Col.vue";
  import OfferModal from "./modals/offer-modal.vue";

  export default {
    components: {
      Filter,
      Col,
      OfferModal,
    },
    emits: ["buy-offer"],
    setup() {
      const p2pOfferStore = useP2POfferStore();
      if (!p2pOfferStore.offers.length) {
        p2pOfferStore.fetch();
      }
      const p2pOrderStore = useP2POrderStore();
      if (!p2pOrderStore.orders.length) {
        p2pOrderStore.fetch();
      }
      return {
        p2pOfferStore,
        p2pOrderStore,
      };
    },
    data() {
      return {
        filters: {
          username: { value: "", keys: ["user.username"] },
          method: { value: "", keys: ["method.name"] },
          currency: { value: "", keys: ["currency"] },
          country: { value: "", keys: ["user.country"] },
        },
        currentPage: 1,
        totalPages: 0,
        showModal: false,
        selectedOffer: {},
      };
    },
    computed: {
      offers() {
        return this.p2pOfferStore.offers;
      },
      orders() {
        return this.p2pOrderStore.orders;
      },
      paymentMethods() {
        const methods = new Set(this.offers.map((offer) => offer.method.name));
        return [...methods];
      },
      currencies() {
        const currencies = new Set(this.offers.map((offer) => offer.currency));
        return [...currencies];
      },
      countries() {
        const countries = new Set(
          this.offers.map((offer) => offer.user.country)
        );
        return [...countries];
      },
    },
    methods: {
      openModal(offer) {
        this.selectedOffer = offer;
        this.showModal = true;
      },

      closeModal() {
        this.showModal = false;
        this.selectedOffer = {};
      },
      async buyOffer(amount) {
        try {
          const response = await axios.post("/user/p2p/orders", {
            offer_id: this.selectedOffer.id,
            amount: amount,
          });
          this.closeModal();
          this.$toast[response.type](response.message);
        } catch (error) {
          console.log(error);
          if (error.response.status === 422) {
            const errors = error.response.data.errors;
            let errorMessage = "";
            Object.keys(errors).forEach((key) => {
              errorMessage += errors[key][0] + "\n";
            });
            this.$toast.error(errorMessage);
          } else {
            this.$toast.error("An error occurred.");
          }
        }
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
      getInitials(username) {
        return username
          .split(" ")
          .map((part) => part.charAt(0).toUpperCase())
          .join("");
      },
      getCompletedOrders(userId) {
        return this.orders.filter(
          (order) => order.user_id === userId && order.status === "completed"
        ).length;
      },
      getCompletionRate(userId) {
        const userOrders = this.orders.filter(
          (order) => order.user_id === userId
        );
        const completedOrders = userOrders.filter(
          (order) => order.status === "completed"
        );

        if (userOrders.length === 0) {
          return 0;
        }

        const completionRate =
          (completedOrders.length / userOrders.length) * 100;
        return completionRate.toFixed(2);
      },
      formatNumber(number) {
        const formattedNumber = parseFloat(number).toFixed(8);
        const withoutTrailingZeros = parseFloat(formattedNumber).toString();
        const decimalPlaces = (withoutTrailingZeros.split(".")[1] || []).length;

        return parseFloat(number).toFixed(Math.max(2, decimalPlaces));
      },
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
