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
          <order-form
            order-type="buy"
            form-type="market"
            :fee="fee"
            :pfee="pfee"
            :store="marketStore"
            :currency="currency"
            :pair="pair"
            @OrderPlaced="$emit('OrderPlaced')"
          />
          <order-form
            order-type="sell"
            form-type="market"
            :fee="fee"
            :pfee="pfee"
            :store="marketStore"
            :currency="currency"
            :pair="pair"
            @OrderPlaced="$emit('OrderPlaced')"
          />
        </div>
      </div>
      <div
        id="limit"
        :class="{ hidden: !isActive('limit') }"
        role="tabpanel"
        aria-labelledby="limit-tab"
      >
        <div class="grid grid-cols-2 gap-5">
          <order-form
            order-type="buy"
            form-type="limit"
            :fee="fee"
            :pfee="pfee"
            :store="marketStore"
            :currency="currency"
            :pair="pair"
            @OrderPlaced="$emit('OrderPlaced')"
          />
          <order-form
            order-type="sell"
            form-type="limit"
            :fee="fee"
            :pfee="pfee"
            :store="marketStore"
            :currency="currency"
            :pair="pair"
            @OrderPlaced="$emit('OrderPlaced')"
          />
        </div>
      </div>
      <div
        id="wallets"
        :class="{ hidden: !isActive('wallets') }"
        role="tabpanel"
        aria-labelledby="wallets-tab"
      >
        <div class="grid grid-cols-2 gap-5">
          <div :key="'sym' + marketStore.currencyBalance">
            <label for="basic-url" class="border-1 order-label peer">
              <a class="text-dark">{{ currency }} {{ $t("Wallet") }}</a>
            </label>
            <form
              v-if="marketStore.currencyBalance == null"
              @submit.prevent="createWallet(currency, 1)"
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
                :key="marketStore.currencyBalance"
                type="number"
                class="order-input"
                :value="marketStore.currencyBalance"
                readonly
                aria-label="Amount (to the nearest dollar)"
              />
              <span class="order-span-2">{{ currency }}</span>
            </div>
          </div>
          <div :key="'cur' + marketStore.pairBalance">
            <label for="basic-url" class="border-1 order-label peer">
              <a class="text-dark">{{ pair }} {{ $t("Wallet") }}</a>
            </label>
            <form
              v-if="marketStore.pairBalance == null"
              @submit.prevent="createWallet(pair, 2)"
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
                :key="marketStore.pairBalance"
                type="number"
                class="order-input"
                :value="marketStore.pairBalance"
                readonly
                aria-label="Amount (to the nearest dollar)"
              />
              <span class="order-span-2">{{ pair }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Button } from "flowbite-vue";
  import { useMarketStore } from "@/store/market";
  import { useUserStore } from "@/store/user";
  import { useRoute } from "vue-router";
  import OrderForm from "./order/OrderForm.vue";
  export default {
    // component list
    components: { OrderForm, Button },
    props: ["fee", "pfee", "api"],

    emits: ["OrderPlaced"],
    async setup() {
      const userStore = useUserStore();
      const marketStore = useMarketStore();
      const route = useRoute();
      const currency = route.params.symbol;
      const pair = route.params.currency;

      await marketStore.exchange.loadMarkets();
      marketStore.market = marketStore.exchange.market(currency + "/" + pair);

      return { marketStore, userStore, currency, pair };
    },
    // component data
    data() {
      return {
        activeItem: "spot",
        loading: false,
        provider: provider,
      };
    },

    created() {
      if (this.api == 1) {
        this.marketStore.wallet_type = "trading";
      } else {
        this.marketStore.wallet_type = "funding";
      }
      this.marketStore.fetchWallet(this.currency, 1);
      this.marketStore.fetchWallet(this.pair, 2);
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
<style scoped>
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
