<template>
  <transition
    name="modal"
    mode="out-in"
    enter-active-class="modal-enter-active"
    leave-active-class="modal-leave-active"
  >
    <Modal
      v-if="walletsStore.isShowModal.withdraw"
      size="2xl"
      @close="walletsStore.closeModal('withdraw')"
    >
      <template #header>
        <div class="flex items-center text-lg">
          {{ $t("Select Withdraw Network") }}
        </div>
      </template>
      <template #body>
        <div style="margin: -24px !important;">
          <template v-if="provider == 'coinbasepro'">
            <form @submit.prevent="withdraw('ETH')">
              <div class="space-y-3 p-5">
                <div>
                  <label for="address"> {{ $t("Wallet Address") }}</label>
                  <input ref="address" type="text" class="form-control" />
                </div>
                <div>
                  <label for="amount"> {{ $t("Amount") }}</label>
                  <input
                    v-model="amount"
                    type="number"
                    required
                    class="form-control"
                    :min="
                      walletsStore.currency.min_withdrawallet_amount
                        ? walletsStore.currency.min_withdrawallet_amount
                        : 0.0000001
                    "
                    :step="
                      walletsStore.currency.min_withdrawallet_amount
                        ? walletsStore.currency.min_withdrawallet_amount
                        : 0.0000001
                    "
                  />
                </div>
                <div>
                  <div>
                    <label for="amount"> {{ $t("Memo") }}</label>
                    <input v-model="memo" type="text" class="form-control" />
                  </div>
                  <small class="text-warning">
                    {{ $t("Leave empty if no memo") }}</small
                  >
                </div>
              </div>
              <div class="modal-footer mt-5">
                <div class="flex justify-end">
                  <button
                    type="submit"
                    class="btn btn-outline-success mr-3"
                    :disabled="walletsStore.loading"
                  >
                    {{ $t("Withdraw") }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="walletsStore.closeModal('withdraw')"
                  >
                    {{ $t("Close") }}
                  </button>
                </div>
              </div>
            </form>
          </template>
          <template v-else>
            <div class="bg-gray-200 dark:bg-gray-900">
              <ul class="-mb-px flex flex-wrap text-center text-sm font-medium">
                <li
                  v-for="(wallet, key, index) in walletsStore.addresses"
                  :key="index"
                  class="mr-2"
                  :class="
                    walletsStore.tab.withdraw != null
                      ? key == walletsStore.tab.withdraw
                        ? 'bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-500'
                        : ''
                      : index == 0
                      ? 'bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-500'
                      : ''
                  "
                  @click="walletsStore.tab.withdraw = key"
                >
                  <button
                    class="inline-block rounded-t-lg p-4"
                    type="button"
                    role="tab"
                  >
                    {{ wallet.network }}
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <div
                v-for="(wallet, key, index) in walletsStore.addresses"
                :key="index"
                class="dark:bg-gray-800"
                :class="
                  walletsStore.tab.withdraw != null
                    ? key == walletsStore.tab.withdraw
                      ? ''
                      : 'hidden'
                    : index == 0
                    ? ''
                    : 'hidden'
                "
              >
                <form @submit.prevent="withdraw(key)">
                  <div class="space-y-3 p-4">
                    <div>
                      <input ref="key" type="hidden" name="key" :value="key" />
                      <label for="address"> {{ $t("Wallet Address") }}</label>
                      <input
                        v-model="address"
                        type="text"
                        class="form-control"
                      />
                      <small>
                        {{ $t("Provide a") }}
                        <span class="text-info">{{ wallet.network }}</span>
                        {{
                          $t(
                            "Chain address. Do not add any other Chain to this address or your funds may be lost"
                          )
                        }}.
                      </small>
                    </div>
                    <div>
                      <label for="amount"> {{ $t("Amount") }}</label>
                      <input
                        v-if="provider == 'binance' || provider == 'binanceus'"
                        v-model="amount"
                        class="form-control"
                        type="number"
                        required
                        :min="
                          wallet.chain.withdrawMin
                            ? wallet.chain.withdrawMin
                            : 0.0000001
                        "
                        :step="
                          wallet.chain.withdrawMin
                            ? wallet.chain.withdrawMin
                            : 0.0000001
                        "
                      />
                      <input
                        v-else-if="provider == 'kucoin'"
                        v-model="amount"
                        class="form-control"
                        type="number"
                        required
                        :min="
                          wallet.chain.withdrawalMinSize
                            ? wallet.chain.withdrawalMinSize
                            : 0.0000001
                        "
                        :step="
                          wallet.chain.withdrawalMinSize
                            ? wallet.chain.withdrawalMinSize
                            : 0.0000001
                        "
                      />
                      <input
                        v-else-if="provider == 'bitget'"
                        v-model="amount"
                        class="form-control"
                        type="number"
                        required
                        :min="wallet?.chain?.limits?.withdraw?.min ?? 0.0000001"
                        :placeholder="
                          'min: ' +
                          (wallet?.chain?.limits?.withdraw?.min ?? 0.0000001) +
                          ' ' +
                          walletsStore.wallet.symbol
                        "
                      />
                    </div>
                    <template
                      v-if="provider == 'binance' || provider == 'binanceus'"
                    >
                      <div v-if="wallet.chain.memoRegex != ''">
                        <label for="memo"> {{ $t("Memo") }}</label>
                        <input
                          v-model="memo"
                          type="text"
                          class="form-control"
                        />
                      </div>
                    </template>
                    <template v-else>
                      <div v-if="wallet.tag !== null">
                        <label for="memo"> {{ $t("Memo") }}</label>
                        <input
                          v-model="memo"
                          type="text"
                          class="form-control"
                        />
                      </div>
                    </template>
                    <div>
                      <label for="fees"> {{ $t("Fees") }}</label>
                      <input
                        v-if="provider == 'binance' || provider == 'binanceus'"
                        class="form-control"
                        type="text"
                        :value="
                          wallet.chain.withdrawFee +
                          ' ' +
                          walletsStore.wallet.symbol
                        "
                        disabled
                      />
                      <input
                        v-else-if="provider == 'kucoin'"
                        class="form-control"
                        type="text"
                        :value="
                          wallet.chain.withdrawalMinFee +
                          ' ' +
                          walletsStore.wallet.symbol
                        "
                        disabled
                        readonly
                      />
                      <input
                        v-else-if="provider == 'bitget'"
                        class="form-control"
                        type="text"
                        :value="
                          wallet.chain.fee + ' ' + walletsStore.wallet.symbol
                        "
                        disabled
                        readonly
                      />
                    </div>
                  </div>
                  <div class="modal-footer mt-5">
                    <div class="flex justify-end">
                      <button
                        type="submit"
                        class="btn btn-outline-success mr-3"
                        :disabled="walletsStore.loading"
                      >
                        {{ $t("Withdraw") }}
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="walletsStore.closeModal('withdraw')"
                      >
                        {{ $t("Close") }}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </template>
        </div>
      </template>
    </Modal>
  </transition>
</template>

<script>
  import { Modal } from "flowbite-vue";
  import { useWalletsStore } from "@/store/wallets";
  export default {
    name: "DepositModal",
    components: {
      Modal,
    },
    props: ["symbol"],
    setup() {
      const walletsStore = useWalletsStore();
      return { walletsStore };
    },
    data() {
      return {
        memo: null,
        amount: null,
        address: null,
        provider: provider,
      };
    },
    methods: {
      async withdraw(id) {
        await this.walletsStore.withdraw(
          id,
          this.memo,
          this.symbol,
          this.address,
          this.amount
        );
      },
    },
  };
</script>
