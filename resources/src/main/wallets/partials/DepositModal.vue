<template>
  <transition
    name="modal"
    mode="out-in"
    enter-active-class="modal-enter-active"
    leave-active-class="modal-leave-active"
  >
    <Modal
      v-if="walletsStore.isShowModal.deposit"
      :key="walletsStore.depositStatus"
      size="2xl"
      @close="walletsStore.closeModal('deposit')"
    >
      <template #header>
        <div class="flex items-center text-lg">
          {{ $t("Select Deposit Network") }}
        </div>
      </template>
      <template #body>
        <div
          v-if="walletsStore.depositStatus === 'unpaid'"
          style="margin: -24px !important;"
        >
          <template v-if="provider == 'coinbasepro'">
            <form @submit.prevent="Deposit(wal)">
              <div class="p-4">
                <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-3">
                  <div class="col-span-1">
                    <div>
                      <label class="form-control-label h6">{{
                        $t("To")
                      }}</label>
                    </div>
                    <vue-qrcode
                      :options="{ width: 150 }"
                      :value="
                        walletsStore.wallet.address
                          ? walletsStore.wallet.address
                          : ''
                      "
                    ></vue-qrcode>
                  </div>
                  <div class="space-y-3 xs:col-span-1 md:col-span-2">
                    <div>
                      <label
                        class="form-control-label h6"
                        for="recieving_address"
                      >
                        {{ $t("Wallet Address") }}</label
                      >
                      <div class="input-group">
                        <input
                          ref="recieving_address"
                          type="text"
                          :value="
                            walletsStore.wallet.address
                              ? walletsStore.wallet.address
                              : ''
                          "
                          readonly
                        />
                        <span @click="copyAddress(walletsStore.wallet.address)">
                          {{ $t("Copy") }}
                        </span>
                      </div>
                    </div>
                    <div
                      class="mt-1 flex justify-between border-b border-gray-200 dark:border-gray-600"
                    >
                      <span> {{ $t("Transfer Limit") }}</span>
                      <span> {{ $t("Unlimited") }}</span>
                    </div>
                    <div
                      class="flex justify-between border-b border-gray-200 dark:border-gray-600"
                    >
                      <span> {{ $t("Processing Time") }}</span>
                      <span>{{
                        walletsStore.currency.network_confirmations
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="input-group mt-5">
                  <input v-model="trx_hash" type="text" />
                  <span for="address">
                    {{ $t("Transaction Hash Address") }}</span
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
                    {{ $t("Deposit") }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="walletsStore.closeModal('deposit')"
                  >
                    {{ $t("Close") }}
                  </button>
                </div>
              </div>
            </form>
          </template>
          <template v-else>
            <div class="bg-gray-200 dark:bg-gray-900">
              <ul
                class="-mb-px flex flex-wrap text-center text-sm font-medium"
                role="tablist"
              >
                <li
                  v-for="(wallet, key, index) in walletsStore.addresses"
                  :key="index"
                  class="mr-2"
                  :class="
                    walletsStore.tab.deposit != null
                      ? key == walletsStore.tab.deposit
                        ? 'bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-500'
                        : ''
                      : index == 0
                      ? 'bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-500'
                      : ''
                  "
                  @click="walletsStore.tab.deposit = key"
                >
                  <button
                    class="inline-block rounded-t-lg p-4"
                    type="button"
                    role="tab"
                  >
                    {{ key }}
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
                  walletsStore.tab.deposit != null
                    ? key == walletsStore.tab.deposit
                      ? ''
                      : 'hidden'
                    : index == 0
                    ? ''
                    : 'hidden'
                "
              >
                <form @submit.prevent="Deposit(wallet)">
                  <div class="space-y-5 p-4">
                    <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-3">
                      <div class="col-span-1">
                        <div>
                          <label class="form-control-label h6">To</label>
                        </div>
                        <vue-qrcode
                          :options="{ width: 150 }"
                          :value="wallet.address ? wallet.address : 'non'"
                        ></vue-qrcode>
                      </div>
                      <div class="space-y-3 xs:col-span-1 md:col-span-2">
                        <div>
                          <label
                            class="form-control-label h6"
                            for="recieving_address"
                          >
                            {{ $t("Wallet Address") }}</label
                          >
                          <div class="input-group">
                            <input
                              ref="recieving_address"
                              type="text"
                              :value="wallet.address ? wallet.address : ''"
                              readonly
                            />
                            <button
                              class="btn btn-info"
                              type="button"
                              @click="copyAddress(wallet.address)"
                            >
                              {{ $t("Copy") }}
                            </button>
                          </div>
                        </div>
                        <div
                          v-if="
                            provider == 'binance' || provider == 'binanceus'
                          "
                          class="mt-1 flex justify-between border-b border-gray-200 dark:border-gray-600"
                        >
                          <span>{{ $t("Transfer Limit") }}</span>
                          <span v-if="wallet.chain && wallet.chain.withdrawMin"
                            >{{ $t("Min") }}:
                            {{ wallet.chain.withdrawMin }}
                            / {{ $t("Max") }}:
                            {{ wallet.chain.withdrawMax }}</span
                          >
                        </div>
                        <div
                          v-if="wallet.tag"
                          class="flex justify-between border-b border-gray-200 dark:border-gray-600"
                        >
                          <span>{{ $t("Memo") }}</span>
                          <span class="text-warning">{{
                            wallet.tag ? wallet.tag : ""
                          }}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {{ $t("This is a") }}
                      <span :ref="key" class="text-info">{{
                        wallet.network
                      }}</span>
                      {{
                        $t(
                          "Chain address. Do not send any other Chain to this address or your funds may be lost."
                        )
                      }}.
                    </div>
                    <div class="input-group">
                      <input v-model="trx_hash" type="text" />
                      <span for="address">{{ $t("Transaction Hash") }}</span>
                    </div>
                    <small class="text-info">
                      {{
                        $t(
                          "After sending any payment from your crypto wallet, you will receive a transaction hash. Please enter this hash in the designated field to initiate the verification process in the blockchain network. Once the verification process is complete, your balance will be updated accordingly. If you encounter any issues or delays during this process, please contact our customer support team for assistance. Thank you for choosing our service and utilizing the power of blockchain technology."
                        )
                      }}.</small
                    >
                  </div>
                  <div class="modal-footer mt-5">
                    <div class="flex justify-end">
                      <button
                        type="submit"
                        class="btn btn-outline-success mr-3"
                        :disabled="walletsStore.loading"
                      >
                        {{ $t("Deposit") }}
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="walletsStore.closeModal('deposit')"
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

        <DepositStatus
          v-else-if="walletsStore.depositStatus"
          :status="walletsStore.depositStatus"
          @cancel="cancelDeposit()"
          @close="walletsStore.closeModal('deposit')"
        />
      </template>
    </Modal>
  </transition>
</template>

<script>
  import { Modal } from "flowbite-vue";
  import { useWalletsStore } from "@/store/wallets";
  import DepositStatus from "./deposit/DepositStatus.vue";
  export default {
    name: "DepositModal",
    components: {
      Modal,
      DepositStatus,
    },
    props: ["type", "symbol", "address"],
    setup() {
      const walletsStore = useWalletsStore();
      return { walletsStore };
    },
    data() {
      return {
        trx_hash: null,
        provider: provider,
        initialTime: 30 * 60,
      };
    },
    methods: {
      async Deposit(wallet) {
        await this.walletsStore.deposit(
          wallet,
          this.trx_hash,
          this.type,
          this.symbol,
          this.address
        );
      },
      copyAddress(address) {
        const el = document.createElement("textarea");
        el.value = address;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        $toast.success(this.$t("Address copied to clipboard"));
      },
      async cancelDeposit() {
        await this.walletsStore.cancelDeposit(this.trx_hash);
      },
    },
  };
</script>
