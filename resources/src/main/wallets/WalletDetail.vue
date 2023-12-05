<template>
  <div class="flex justify-between mb-5 items-center">
    <h3>{{ walletsStore.wallet.symbol }} Wallet</h3>

    <router-link to="/wallets" class="btn btn-outline-secondary">
      <i class="bi bi-chevron-left"></i> {{ $t("Back") }}</router-link
    >
  </div>
  <div class="card mb-5">
    <div class="card-body">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div class="flex items-center">
          <img
            v-lazy="walletImage"
            class="avatar-content mr-5"
            height="64"
            width="64"
            @error="onImageError"
          />
          <div>
            <div class="text-lg font-medium">
              {{ walletsStore.wallet.symbol }}
            </div>
            <div>
              <span v-if="tradingWallet == 1" class="text-sm">{{
                type.toUpperCase()
              }}</span>
              {{ $t("Wallet") }}
            </div>
          </div>
        </div>
        <div
          class="grid grid-cols-1 gap-4"
          :class="
            walletsStore.wallet.type !== 'funding' ? 'md:grid-cols-3' : ''
          "
        >
          <div
            v-if="walletsStore.wallet.type !== 'funding'"
            class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4"
          >
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t("Total:") }}
            </div>
            <div class="text-base dark:text-white">
              {{ Number(walletsStore.wallet.total).toFixed(6) }}
            </div>
          </div>
          <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t("Available:") }}
            </div>
            <div class="text-base dark:text-white">
              {{ Number(walletsStore.wallet.balance).toFixed(6) }}
            </div>
          </div>
          <div
            v-if="walletsStore.wallet.type !== 'funding'"
            class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4"
          >
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t("In Order:") }}
            </div>
            <div class="text-base dark:text-white">
              {{ Number(walletsStore.wallet.in_order).toFixed(6) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card mb-5">
    <div class="card-body">
      <div
        v-if="showActionButtonGroup"
        class="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        <template v-if="type == 'trading'">
          <button
            type="button"
            class="btn border-l-4 border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 w-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700"
            @click="walletsStore.showModal('deposit')"
          >
            <i class="bi bi-wallet2 mr-2"></i>
            {{ $t("Deposit") }}
          </button>
        </template>
        <a v-else-if="type == 'funding'" href="/user/deposit/wallet">
          <button
            v-if="walletsStore.dp == 1"
            :key="walletsStore.dp"
            class="btn border-l-4 border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 w-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <i class="bi bi-wallet2 mr-2"></i>
            {{ $t("Deposit") }}
          </button>
        </a>
        <button
          v-if="type == 'trading'"
          type="button"
          class="btn border-l-4 border-red-600 text-red-600 dark:border-red-400 dark:text-red-400 w-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700"
          @click="walletsStore.showModal('withdraw')"
        >
          <i class="bi bi-cash-coin mr-2"></i>
          {{ $t("Withdraw") }}
        </button>
        <a
          v-else-if="type == 'funding'"
          :href="'/user/withdraw/wallet/' + walletsStore.wallet.symbol"
        >
          <button
            class="btn border-l-4 border-red-600 text-red-600 dark:border-red-400 dark:text-red-400 w-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <i class="bi bi-cash-coin mr-2"></i>
            {{ $t("Withdraw") }}
          </button>
        </a>
        <div v-if="tradingWallet == 1">
          <button
            type="button"
            class="btn border-l-4 border-yellow-600 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400 w-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700"
            @click="walletsStore.showModal('transfer')"
          >
            <i class="bi bi-arrow-left-right mr-2"></i>
            {{ $t("Transfer") }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <WithdrawModal :symbol="symbol" />

  <TransactionsTable :type="type" />

  <TransferModal />

  <DepositModal :symbol="symbol" :address="address" :type="type" />
</template>

<script>
  import { computed, onMounted } from "vue";
  import { useWalletsStore } from "@/store/wallets";
  import TransactionsTable from "./partials/TransactionsTable.vue";
  import TransferModal from "./partials/TransferModal.vue";
  import DepositModal from "./partials/DepositModal.vue";
  import WithdrawModal from "./partials/WithdrawModal.vue";
  import { useUserStore } from "@/store/user";
  import { useRouter } from "vue-router";

  export default {
    components: {
      TransactionsTable,
      TransferModal,
      DepositModal,
      WithdrawModal,
    },
    setup() {
      const tradingWallet = window.tradingWallet;
      const walletsStore = useWalletsStore();
      const walletImage = computed(() => {
        return `/assets/images/cryptoCurrency/${
          walletsStore.wallet.symbol
            ? walletsStore.wallet.symbol.toLowerCase()
            : ""
        }.png`;
      });

      const showActionButtonGroup = computed(() => {
        return plat.trading.practice != null && plat.trading.practice != 1;
      });

      const userStore = useUserStore();
      const router = useRouter();
      async function checkKyc() {
        if (plat.kyc.kyc_status == 1 && Number(plat.kyc.wallet_details_restriction) === 1) {
          if (!userStore.user) {
            await userStore.fetch();
          }
          if (!userStore.user.kyc_application) {
            router.push("/identity");
          }
          if (
            userStore.user.kyc_application &&
            userStore.user.kyc_application.level < 2 &&
            userStore.user.kyc_application.status !== "approved"
          ) {
            router.push("/identity");
          }
        }
      }

      onMounted(() => {
        checkKyc();
      });

      return {
        walletsStore,
        walletImage,
        showActionButtonGroup,
        tradingWallet,
      };
    },
    // component data
    data() {
      return {
        symbol: this.$route.params.symbol,
        address: this.$route.params.address,
        type: this.$route.params.type,
        cur_rate: cur_rate,
        cur_symbol: cur_symbol,
        provider: provider,
        gnl: gnl,
        pathname: "trading",
        plat: plat,
        imageLoading: true,
      };
    },
    watch: {
      $route(to, from) {
        this.walletsStore.wallet = [];
        this.walletsStore.wallet_trx = [];
        this.walletsStore.addresses = {};
      },
    },
    created() {
      this.fetchWallet();
    },
    methods: {
      async fetchWallet() {
        await this.walletsStore.fetchWallet(
          this.type,
          this.symbol,
          this.address
        );
      },
      onImageError(event) {
        event.target.src = "/assets/no-image.png";
      },
      getDepositMin(key) {
        try {
          if (key == "ETH") {
            return this.walletsStore.addresses["ERC20"].chain.limits.deposit
              .min;
          } else if (key == "TRX") {
            return this.walletsStore.addresses["TRC20"].chain.limits.deposit
              .min;
          } else {
            return this.walletsStore.addresses[key].chain.limits.deposit.min;
          }
        } catch (err) {}
      },
      getDepositMinBinance(key) {
        return this.walletsStore.addresses[key].chain.withdrawMin;
      },
      getDepositMaxBinance(key) {
        return this.walletsStore.addresses[key].chain.withdrawMax;
      },
      getDepositMax(key) {
        try {
          if (key == "ETH") {
            let val = this.walletsStore.addresses["ERC20"].chain.limits.deposit
              .max;
            if (val === null || val === undefined) {
              return "Unlimited";
            } else {
              return val;
            }
          } else if (key == "TRX") {
            let val = this.walletsStore.addresses["TRC20"].chain.limits.deposit
              .max;
            if (val === null || val === undefined) {
              return "Unlimited";
            } else {
              return val;
            }
          } else {
            let val = this.walletsStore.addresses[key].chain.limits.deposit.max;
            if (val === null || val === undefined) {
              return "Unlimited";
            } else {
              return val;
            }
          }
        } catch (err) {}
      },
    },
  };
</script>
