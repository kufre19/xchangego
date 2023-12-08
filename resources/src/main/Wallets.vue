<template>
  <wallets-tabs
    :wallets-store="walletsStore"
    :active-tab="activeTab"
    @tab-changed="handleTabChanged"
  ></wallets-tabs>

  <div>
    <div :class="isActive('main') ? '' : 'hidden'">
      <main-currencies
        :currencies="walletsStore.main_currencies"
        :loading="loading"
        @create-wallet="createMainWallet"
      ></main-currencies>
      <div class="card mt-5">
        <div class="card-title">
          <h2 class="card-header">{{ $t("Features") }}</h2>
        </div>
        <div class="card-body">
          <ul class="list-disc list-inside space-y-2">
            <li class="text-sm">
              {{ $t("Used mainly in the new hot markets") }}
            </li>
            <li class="text-sm">
              {{ $t("Very low fees on transactions and trades") }}
            </li>
            <li class="text-sm">
              {{ $t("Completely automated deposit and withdrawal") }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div :class="isActive('trading') ? '' : 'hidden'">
      <currencies
        :currencies="walletsStore.currencies"
        :loading="loading"
        type="trading"
        @create-wallet="createWallet"
      ></currencies>
      <div class="card mt-5">
        <div class="card-title">
          <h2 class="card-header">{{ $t("Features") }}</h2>
        </div>
        <div class="card-body">
          <ul class="list-disc list-inside space-y-2">
            <li class="text-sm">
              {{ $t("Used in most of the trading pairs") }}
            </li>
            <li class="text-sm">
              {{ $t("Normal fees on transactions and trades") }}
            </li>
            <li class="text-sm">
              {{
                $t(
                  "Fully automated withdrawal, but deposit requires transaction hash for verification within given time"
                )
              }}
            </li>
            <li class="text-sm">
              {{ $t("Automated transfer to funding wallet") }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div :class="isActive('futures') ? '' : 'hidden'">
      <future-currencies
        :currencies="walletsStore.futureCurrencies"
        :loading="loading"
        type="futures"
        @create-wallet="createWallet"
      ></future-currencies>
      <div class="card mt-5">
        <div class="card-title">
          <h2 class="card-header">{{ $t("Features") }}</h2>
        </div>
        <div class="card-body">
          <ul class="list-disc list-inside space-y-2">
            <li class="text-sm">
              {{ $t("Used in Futures trading pairs") }}
            </li>
            <li class="text-sm">
              {{ $t("Low fees on transactions and trades") }}
            </li>
            <li class="text-sm">
              {{ $t("Automated transfer to trading wallet") }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div :class="isActive('funding') ? '' : 'hidden'">
      <currencies
        :currencies="walletsStore.currencies"
        :loading="loading"
        type="funding"
        @create-wallet="createWallet"
      ></currencies>
      <div class="card mt-5">
        <div class="card-title">
          <h2 class="card-header">{{ $t("Features") }}</h2>
        </div>
        <div class="card-body">
          <ul class="list-disc list-inside space-y-2">
            <li class="text-sm">
              {{
                $t(
                  "Used in binary trading, investments, and most of the features"
                )
              }}
            </li>
            <li class="text-sm">0 {{ $t("fees on activity") }}</li>
            <li class="text-sm">
              {{
                $t(
                  "Deposit and withdrawal by payment gateways with fiat or crypto"
                )
              }}
            </li>
            <li class="text-sm">
              {{
                $t(
                  "Ability to transfer to trading wallet with verification from support"
                )
              }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useWalletsStore } from "@/store/wallets";
  import WalletsTabs from "./wallets/WalletsTabs.vue";
  import Currencies from "./wallets/Currencies.vue";
  import MainCurrencies from "./wallets/MainCurrencies.vue";
  import FutureCurrencies from "./wallets/FutureCurrencies.vue";
  export default {
    components: {
      WalletsTabs,
      Currencies,
      MainCurrencies,
      FutureCurrencies,
    },
    setup() {
      const walletsStore = useWalletsStore();
      return { walletsStore };
    },

    // component data
    data() {
      return {
        ext: ext,
        plat: plat,
        activeTab:
          ext.eco == 1 ? "main" : tradingWallet == 1 ? "trading" : "funding",
      };
    },
    computed: {
      loading() {
        return this.walletsStore.loading;
      },
    },
    created() {
      this.fetchData();
      if (ext.eco == 1) {
        this.fetchMainWallet();
      }
    },
    methods: {
      handleTabChanged(tab) {
        this.activeTab = tab;
      },
      isActive(tab) {
        return this.activeTab === tab;
      },
      async fetchData() {
        if (
          !Array.isArray(this.walletsStore.wallets) ||
          this.walletsStore.wallets.length === 0
        ) {
          await this.walletsStore.fetch();
        }
        if (tradingWallet == 0) {
          if (ext.eco == 1) {
            this.activeTab = "main";
          } else {
            this.activeTab = "funding";
          }
        }
      },
      async fetchMainWallet() {
        if (
          !Array.isArray(this.walletsStore.main_wallets) ||
          this.walletsStore.main_wallets.length === 0
        ) {
          await this.walletsStore.fetch_main();
        }
      },
      async createWallet(symbol, type) {
        await this.walletsStore.create(symbol, type);
      },
      async createMainWallet(data) {
        await this.walletsStore.create_main(data);
      },
    },
  };
</script>
