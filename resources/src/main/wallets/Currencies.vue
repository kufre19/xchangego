<template>
  <div
    class="mb-4 items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0"
  >
    <div class="font-medium">{{ $t("Wallets") }}</div>
    <Filter>
      <input
        v-model="filters.symbol.value"
        type="text"
        class="filter-input"
        placeholder="Search"
      />
    </Filter>
  </div>
  <div class="card relative overflow-x-auto">
    <VTable
      :key="currencies.length"
      v-model:current-page="currentPage"
      class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
      :data="currencies"
      :filters="filters"
      :page-size="10"
      :hide-sort-icons="true"
      @totalPagesChanged="totalPages = $event"
    >
      <template #head>
        <tr
          class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          <VTh sort-key="coin" scope="col" class="py-3 px-6">
            {{ $t("Coin") }}
          </VTh>
          <VTh sort-key="total" scope="col" class="py-3 px-6">
            {{ $t("Balance") }}
          </VTh>
          <VTh sort-key="action" scope="col" class="py-3 px-6">
            {{ $t("Action") }}
          </VTh>
        </tr>
      </template>
      <template #body="{ rows }">
        <template v-if="currencies.length > 0">
          <tr
            v-for="row in rows"
            :key="row.id"
            class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <td
              data-label="Coin"
              class="py-2 px-3 flex justify-start items-center"
            >
              <div class="flex items-center">
                <img
                  v-lazy="
                    '/assets/images/cryptoCurrency/' +
                    row.symbol.toLowerCase() +
                    '.png'
                  "
                  width="40"
                  class="mr-2 rounded-full"
                  @error="onImageError"
                />
                <span class="text-dark text-md">{{ row.symbol }}</span>
              </div>
            </td>
            <td data-label="Balance" class="py-2 px-3">
              {{
                type == "funding"
                  ? row.fundingWallet
                    ? parseFloat(row.fundingWallet.balance)
                    : "N/A"
                  : row.tradingWallet
                  ? parseFloat(row.tradingWallet.balance)
                  : "N/A"
              }}
            </td>
            <td data-label="Action" class="py-2 px-3">
              <router-link
                v-if="type == 'funding' ? row.fundingWallet : row.tradingWallet"
                :to="
                  '/wallet/' +
                  type +
                  '/' +
                  row.symbol +
                  '/' +
                  (type == 'funding'
                    ? row.fundingWallet.address
                    : row.tradingWallet.address)
                "
              >
                <button class="btn btn-outline-primary" type="button">
                  {{ $t("View") }}
                </button>
              </router-link>
              <button
                v-else
                class="btn btn-outline-info"
                type="button"
                :disabled="loading"
                :loading="loading"
                @click="createWallet(row.symbol, type)"
              >
                {{ $t("Create Wallet") }}
              </button>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr
            scope="row"
            class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <td colspan="100%" class="py-2 px-3">
              {{ $t("No results found!") }}
            </td>
          </tr>
        </template>
      </template>
    </VTable>
  </div>
  <div class="flex justify-end">
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
  import Filter from "@/partials/table/Filter.vue";

  export default {
    components: { Filter },
    props: {
      currencies: {
        type: Array,
        required: true,
      },
      loading: {
        type: Boolean,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
    emits: ["create-wallet"],
    data() {
      return {
        wallets: [],
        filters: {
          symbol: { value: "", keys: ["symbol"] },
        },
        currentPage: 1,
        totalPages: 0,
      };
    },
    methods: {
      onImageError(event) {
        event.target.src = "/assets/no-image.png";
      },
      createWallet(symbol, type) {
        this.$emit("create-wallet", symbol, type);
      },
    },
  };
</script>
