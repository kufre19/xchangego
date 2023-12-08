<template>
  <div class="card mt-5">
    <div class="card-body">
      <form @submit.prevent="submitInvestment()">
        <div class="card-title">
          {{ $t("Forex Investments") }}
        </div>
        <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <dropdown text="button">
            <template #trigger>
              <button
                ref="wallett"
                class="btn btn-outline-primary"
                type="button"
              >
                <i class="bi bi-sort-down-alt mr-2"></i>
                <toMoney v-if="wal != null" :num="wal.balance" decimals="2" />
                {{ wal ? wal.symbol : $t("Select Wallet") }}
              </button>
            </template>
            <list-group :class="'text-start'"
              ><div
                class="flex items-center border-b py-3 px-4 text-sm text-gray-900 dark:text-white"
              >
                <i class="bi bi-sort-down-alt mr-2"></i>
                {{ $t("Select Wallet") }}
              </div>
              <list-group-item
                v-for="(wallet, index) in forexStore.wallets"
                :key="index"
                class="items-between inline-flex w-full cursor-pointer border-b border-gray-200 px-4 py-2 hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500"
              >
                <a
                  class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  @click="selectWallet(wallet)"
                >
                  <span class="mr-3"
                    ><toMoney :num="wallet.balance" decimals="2" /></span
                  ><span>{{ wallet.symbol }}</span>
                </a>
              </list-group-item>
            </list-group>
          </dropdown>
          <div class="flex w-full">
            <input
              :key="forexStore?.selected_inv?.min"
              v-model="amount"
              type="number"
              class="block min-w-0 flex-1 rounded-none rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-red-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required=""
              :min="forexStore?.selected_inv?.min ?? 1"
              :max="forexStore?.selected_inv?.max ?? 1000000"
              :step="forexStore?.selected_inv?.min ?? 1"
              placeholder="Amount"
            />
            <span
              ref="selectedWallet"
              class="inline-flex items-center rounded-r-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400"
              >{{ wal ? wal.symbol : "$" }}</span
            >
          </div>
          <Button
            size="sm"
            class="flex w-full items-center justify-between"
            color="purple"
            type="button"
            @click="forexStore.showModal('selectInvestment')"
          >
            {{
              forexStore.selected_inv
                ? forexStore.selected_inv.title
                : $t("Select Plan")
            }}
          </Button>

          <Button
            size="sm"
            class="flex w-full items-center justify-between"
            color="green"
            :loading="forexStore.loading"
            :disabled="forexStore.loading"
          >
            <i class="bi bi-caret-right"></i
            ><span> {{ $t("Start Investment") }}</span>
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { Dropdown, ListGroup, ListGroupItem, Button } from "flowbite-vue";
  import toMoney from "@/partials/toMoney.vue";
  export default {
    components: {
      Dropdown,
      ListGroup,
      ListGroupItem,
      Button,
      toMoney,
    },
    props: {
      forexStore: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        amount: 0,
        wal: null,
      };
    },
    methods: {
      selectWallet(wallet) {
        this.wal = wallet;
      },
      async submitInvestment() {
        await this.forexStore.submitInvestment(this.wal.symbol, this.amount);
      },
    },
  };
</script>
