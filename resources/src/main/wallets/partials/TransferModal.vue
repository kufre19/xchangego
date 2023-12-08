<template>
  <transition
    name="modal"
    mode="out-in"
    enter-active-class="modal-enter-active"
    leave-active-class="modal-leave-active"
  >
    <Modal
      v-if="walletsStore.isShowModal.transfer"
      size="3xl"
      @close="walletsStore.closeModal('transfer')"
    >
      <template #header>
        <div class="flex items-center text-lg">
          {{ $t("Transfer Funds") }}
        </div>
      </template>
      <template #body>
        <div v-if="!state.showTransferDetails" class="space-y-5 text-center">
          <div v-if="(hasFundingWallet && $route.params.type !== 'funding')">
            <button
              class="btn btn-outline-warning flex justify-start"
              @click="
                state.target = 'funding';
                state.showTransferDetails = true;
              "
            >
              <i class="bi bi-chevron-right"></i>
              <span>{{
                $t("Transfer to") +
                " " +
                state.symbol +
                " " +
                $t("Funding Wallet")
              }}</span>
            </button>
            <button
              class="btn btn-outline-warning flex justify-start"
              @click="
                state.target = 'funding';
                state.showTransferDetails = true;
              "
            >
              <i class="bi bi-chevron-right"></i>
              <span>{{
                $t("Transfer to") +
                " " +
                state.symbol +
                " " +
                $t("Funding Wallet")
              }}</span>
            </button>
          </div>
          <div
            v-if="hasTradingWallet && $route.params.type !== 'trading'"
            class="flex justify-center"
          >
            <button
              class="btn btn-outline-primary"
              @click="
                state.target = 'trading';
                state.showTransferDetails = true;
              "
            >
              <i class="bi bi-chevron-right"></i>
              {{
                $t("Transfer to") +
                " " +
                state.symbol +
                " " +
                $t("Trading Wallet")
              }}
            </button>
          </div>
          <div
            v-if="hasFuturesWallet && $route.params.type === 'trading'"
            class="flex justify-center"
          >
            <button
              class="btn btn-outline-success"
              @click="
                state.target = 'futures';
                state.showTransferDetails = true;
              "
            >
              <i class="bi bi-chevron-right"></i>
              {{
                $t("Transfer to") +
                " " +
                state.symbol +
                " " +
                $t("Futures Wallet")
              }}
            </button>
          </div>
        </div>
        <div v-if="state.target" class="space-y-5">
          <div>
            <label for="amount">{{ $t("Amount") }}</label>
            <input
              v-model="state.amount"
              type="number"
              class="form-control"
              min="0"
              :max="
                $route.params.type === 'futures'
                  ? walletsStore.wallet.available
                  : walletsStore.wallet.balance
              "
              step="0.000001"
              required
            />
          </div>
          <div class="flex items-center justify-between">
            <div
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full"
            >
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t("Balance") }}:
              </div>
              <div class="text-base dark:text-white">
                {{
                  Number(
                    $route.params.type === "futures"
                      ? walletsStore.wallet.available
                      : walletsStore.wallet.balance
                  ).toFixed(6)
                }}
                (<span class="text-danger">{{ currentBalanceChange }}</span
                >)
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-16 h-16 mx-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full"
            >
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t("Target Wallet Balance") }}:
              </div>
              <div class="text-base dark:text-white">
                {{ targetWalletBalance() }} (<span class="text-success">{{
                  targetBalanceChange
                }}</span
                >)
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <button
            v-if="state.showTransferDetails"
            type="button"
            class="btn btn-outline-success"
            :disabled="state.loading"
            @click="transferFunds()"
          >
            {{ $t("Transfer") }}
          </button>
          <button
            v-if="state.showTransferDetails"
            type="button"
            class="btn btn-outline-secondary"
            @click="
              state.showTransferDetails = false;
              state.target = '';
            "
          >
            <i class="bi bi-chevron-left"></i>
            {{ $t("Back") }}
          </button>
          <button
            v-else
            type="button"
            class="btn btn-outline-secondary"
            @click="walletsStore.closeModal('transfer')"
          >
            {{ $t("Close") }}
          </button>
        </div>
      </template>
    </Modal>
  </transition>
</template>

<script>
  import { Modal } from "flowbite-vue";
  import Filter from "@/partials/table/Filter.vue";
  import Col from "@/partials/table/Col.vue";
  import toMoney from "@/partials/toMoney.vue";
  import toDate from "@/partials/toDate.vue";
  import { useWalletsStore } from "@/store/wallets";
  import { useRoute } from "vue-router";
  import TransactionTypeMain from "@/main/wallets/partials/TransactionTypeMain.vue";
  import { ref, watch, onBeforeMount, computed, reactive } from "vue";
  export default {
    components: { Modal, Filter, Col, toMoney, toDate, TransactionTypeMain },

    setup() {
      const route = useRoute();
      const walletsStore = useWalletsStore();

      const hasTradingWallet = ref(false);
      const hasFuturesWallet = ref(false);
      const hasFundingWallet = ref(false);

      const state = reactive({
        symbol: route.params.symbol,
        loading: false,
        plat: plat,
        isShowModal: {
          transfer: false,
        },
        target: null,
        amount: 0,
        currency: null,
        futureCurrency: null,
      });

      async function checkWalletTypes() {
        if (walletsStore.currencies.length == 0) {
          try {
            await walletsStore.fetch();
          } catch (error) {
            console.log(error);
          }
        }

        if (walletsStore.currencies) {
          state.currency = walletsStore.currencies.find(
            (currency) => currency.symbol == route.params.symbol
          );
        }

        if (walletsStore.futureCurrencies) {
          state.futureCurrency = walletsStore.futureCurrencies.find(
            (futureCurrency) => futureCurrency.symbol == route.params.symbol
          );
        }

        if (state.currency) {
          hasTradingWallet.value = !!state.currency.tradingWallet;
          hasFundingWallet.value = !!state.currency.fundingWallet;
        }

        if (state.futureCurrency) {
          hasFuturesWallet.value = !!state.futureCurrency.wallet;
        }
      }

      async function getWallet() {
        switch (route.params.type) {
          case "trading":
            await walletsStore.fetchWallet(
              route.params.type,
              route.params.symbol,
              route.params.address
            );
            break;
          case "futures":
            await walletsStore.fetchFuturesWallet(route.params.symbol);
            break;
          case "funding":
            await walletsStore.fetchWallet(
              route.params.type,
              route.params.symbol,
              route.params.address
            );
            break;
          default:
            console.log("Invalid wallet type");
        }
      }

      onBeforeMount(() => {
        if (walletsStore.wallet == null) {
          getWallet();
        }
        checkWalletTypes();
      });

      watch(route, () => {
        walletsStore.wallet = [];
        walletsStore.wallet_trx = [];
        checkWalletTypes();
      });

      function onImageError(event) {
        event.target.src = "/assets/no-image.png";
      }

      function transferFunds() {
        if (state.amount <= 0) {
          $toast.error("Invalid amount");
        } else if (
          state.amount >
          (route.params.type === "futures"
            ? walletsStore.wallet.available
            : walletsStore.wallet.balance)
        ) {
          $toast.error("Invalid amount");
        } else {
          state.loading = true;
          axios
            .post("/user/wallet/transfer", {
              symbol: state.symbol,
              target: state.target,
              source: route.params.type,
              amount: state.amount.toString(),
            })
            .then((response) => {
              $toast[response.type](response.message);
            })
            .catch((error) => {
              $toast.error(error.response.data.message);
            })
            .finally(() => {
              route.params.type === "futures"
                ? walletsStore.fetchFutureWallet(state.symbol)
                : walletsStore.fetchWallet(
                    route.params.type,
                    state.symbol,
                    route.params.address
                  );
              state.loading = false;
              walletsStore.closeModal("transfer");
            });
        }
      }

      const currentBalanceChange = computed(() => {
        let balance = 0;
        if (state.amount > 0) {
          switch (route.params.type) {
            case "trading":
              balance = Number(state.currency.tradingWallet.balance);
              break;
            case "futures":
              balance = Number(state.futureCurrency.wallet.available);
              break;
            case "funding":
              balance = Number(state.currency.fundingWallet.balance);
              break;
            default:
              console.log("Invalid wallet type");
          }
        }

        return Number(balance - Number(state.amount)).toFixed(6);
      });

      const targetBalanceChange = computed(() => {
        let change = 0;
        if (state.amount > 0) {
          switch (state.target) {
            case "trading":
              change = Number(state.currency.tradingWallet.balance);
              break;
            case "futures":
              change = Number(state.futureCurrency.wallet.available);
              break;
            case "funding":
              change = Number(state.currency.fundingWallet.balance);
              break;
            default:
              console.log("Invalid wallet type");
          }
        }
        return Number(change + Number(state.amount)).toFixed(6);
      });

      function targetWalletBalance() {
        let targetWalletBalance = 0;
        switch (state.target) {
          case "trading":
            targetWalletBalance = Number(state.currency.tradingWallet.balance);
            break;
          case "futures":
            targetWalletBalance = Number(state.futureCurrency.wallet.available);
            break;
          case "funding":
            targetWalletBalance = Number(state.currency.fundingWallet.balance);
            break;
          default:
            console.log("Invalid wallet type");
        }
        return targetWalletBalance.toFixed(6);
      }

      return {
        walletsStore,
        hasFuturesWallet,
        hasTradingWallet,
        hasFundingWallet,
        checkWalletTypes,
        state,
        onImageError,
        transferFunds,
        currentBalanceChange,
        targetBalanceChange,
        targetWalletBalance,
      };
    },
  };
</script>
