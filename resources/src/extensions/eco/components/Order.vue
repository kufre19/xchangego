<template>
  <div
    class="Order border border-gray-100 bg-white shadow dark:border-gray-700 dark:bg-gray-900"
  >
    <div class="w-full bg-gray-200 dark:bg-gray-800">
      <ul
        id="myTab"
        class="nf flex-cols -mb-px flex overflow-x-hidden text-center"
        role="tablist"
      >
        <li role="presentation">
          <button
            id="spot-tab"
            class="inline-block py-2 pl-3 pr-4 text-xs font-medium"
            type="button"
            role="tab"
            aria-controls="spot"
            :aria-selected="isActive('spot') ? true : false"
            :class="!isActive('spot') ? 'inactive-tab' : 'active-tab'"
            @click="setActive('spot')"
          >
            {{ $t("Spot") }}
          </button>
        </li>
        <li role="presentation">
          <button
            id="limit-tab"
            class="inline-block py-2 pl-3 pr-4 text-xs font-medium"
            type="button"
            role="tab"
            aria-controls="limit"
            :aria-selected="isActive('limit') ? true : false"
            :class="!isActive('limit') ? 'inactive-tab' : 'active-tab'"
            @click="setActive('limit')"
          >
            {{ $t("Limit") }}
          </button>
        </li>
        <li role="presentation">
          <button
            id="wallets-tab"
            class="inline-block py-2 pl-3 pr-4 text-xs font-medium"
            type="button"
            role="tab"
            aria-controls="wallets"
            :aria-selected="isActive('wallets') ? true : false"
            :class="!isActive('wallets') ? 'inactive-tab' : 'active-tab'"
            @click="setActive('wallets')"
          >
            {{ $t("Wallets") }}
          </button>
        </li>
      </ul>
    </div>
    <div id="myTabContent" class="px-3 py-3">
      <div
        id="spot"
        :class="{ hidden: !isActive('spot') }"
        role="tabpanel"
        aria-labelledby="spot-tab"
      >
        <div class="grid grid-cols-2 gap-5">
          <OrderForm order-type="buy" form-type="market" />
          <OrderForm order-type="sell" form-type="market" />
        </div>
      </div>
      <div
        id="limit"
        :class="{ hidden: !isActive('limit') }"
        role="tabpanel"
        aria-labelledby="limit-tab"
      >
        <div class="grid grid-cols-2 gap-5">
          <OrderForm order-type="buy" form-type="limit" />
          <OrderForm order-type="sell" form-type="limit" />
        </div>
      </div>
      <div
        id="wallets"
        :class="{ hidden: !isActive('wallets') }"
        role="tabpanel"
        aria-labelledby="wallets-tab"
      >
        <div class="grid grid-cols-2 gap-5">
          <div :key="'sym' + ecoStore.walletSymbol">
            <label for="basic-url" class="border-1 order-label peer">
              <a class="text-dark"
                >{{
                  symbol.includes("_")
                    ? symbol.substring(0, symbol.indexOf("_"))
                    : symbol
                }}
                {{ $t("Wallet") }}</a
              >
            </label>
            <form
              v-if="ecoStore.walletSymbol == null"
              @submit.prevent="
                createWallet(
                  ecoStore.market.currency,
                  ecoStore.market.currency_chain
                )
              "
            >
              <Button
                color="green"
                outline
                size="sm"
                :loading="loading"
                :disabled="loading"
              >
                {{ $t("Create Wallet") }}
              </Button>
            </form>
            <div v-else class="flex">
              <input
                :key="ecoStore.walletSymbol"
                type="number"
                class="order-input"
                :value="ecoStore.walletSymbol"
                readonly
                aria-label="Amount (to the nearest dollar)"
              />
              <span class="order-span-2">{{ ecoStore.market.currency }}</span>
            </div>
          </div>
          <div :key="'cur' + ecoStore.walletCurrency">
            <label for="basic-url" class="border-1 order-label peer">
              <a class="text-dark"
                >{{
                  currency.includes("_")
                    ? currency.substring(0, currency.indexOf("_"))
                    : currency
                }}
                {{ $t("Wallet") }}</a
              >
            </label>
            <form
              v-if="ecoStore.walletCurrency == null"
              @submit.prevent="
                createWallet(ecoStore.market.pair, ecoStore.market.pair_chain)
              "
            >
              <Button
                color="green"
                outline
                size="sm"
                :loading="loading"
                :disabled="loading"
              >
                {{ $t("Create Wallet") }}
              </Button>
            </form>
            <div v-else class="flex">
              <input
                :key="ecoStore.walletCurrency"
                type="number"
                class="order-input"
                :value="ecoStore.walletCurrency"
                readonly
                aria-label="Amount (to the nearest dollar)"
              />
              <span class="order-span-2">{{ ecoStore.market.pair }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // component
  import { Button } from "flowbite-vue";
  import { useUserStore } from "@/store/user";
  import { useEcoStore } from "@/store/eco";
  import { countDecimals } from "@/modules/utils";
  import OrderForm from "./order/OrderForm.vue";

  export default {
    components: { Button, OrderForm },
    props: {
      market: {
        type: Object,
        required: true,
      },
    },
    setup() {
      const userStore = useUserStore();
      const ecoStore = useEcoStore();
      return { userStore, ecoStore, countDecimals };
    },
    data() {
      return {
        activeItem: "limit",
        loading: false,
      };
    },
    computed: {
      symbol() {
        return this.ecoStore.market.currency;
      },
      currency() {
        return this.ecoStore.market.pair;
      },
      symbol_chain() {
        return this.ecoStore.market.currency_chain;
      },
      currency_chain() {
        return this.ecoStore.market.pair_chain;
      },
    },
    watch: {
      symbol: {
        handler() {
          this.ecoStore.fetchWallets();
        },
      },
      currency: {
        handler() {
          this.ecoStore.fetchWallets();
        },
      },
    },
    mounted() {
      this.ecoStore.fetchWallets();
    },
    methods: {
      isActive(menuItem) {
        return this.activeItem === menuItem;
      },

      setActive(menuItem) {
        this.activeItem = menuItem;
      },
    },
  };
</script>
