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
                      <input
                        ref="recieving_address"
                        class="form-control"
                        type="text"
                        :value="
                          walletsStore.wallet.address
                            ? walletsStore.wallet.address
                            : ''
                        "
                        readonly
                      />
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
                          <input
                            ref="recieving_address"
                            class="form-control"
                            type="text"
                            :value="wallet.address ? wallet.address : ''"
                            readonly
                          />
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
                      <span
                        v-if="provider == 'binance' || provider == 'binanceus'"
                        :ref="key"
                        class="text-info"
                        >{{ wallet.chain.name }}</span
                      >
                      <span
                        v-if="provider == 'kucoin'"
                        :ref="key"
                        class="text-info"
                        >{{ wallet.chain.chainName }}</span
                      >
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
        <!-- Deposit status: pending -->
        <div
          v-else-if="walletsStore.depositStatus === 'pending'"
          class="text-center"
        >
          <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {{ $t("Pending Verification") }}
          </div>
          <p class="text-gray-600 dark:text-gray-400">
            {{
              $t(
                "Your transaction is currently pending and is waiting to be verified. Please refrain from closing the modal or refreshing the page until the verification process is complete. This may take a few moments, but rest assured that we are working diligently to ensure that your transaction is processed as quickly and securely as possible. Thank you for your patience and cooperation."
              )
            }}
          </p>
          <div class="relative mt-4 flex justify-center">
            <CountDown
              v-if="walletsStore.depositStatus === 'pending'"
              :time="initialTime"
            />
          </div>
          <button
            class="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 dark:bg-gray-800 dark:hover:bg-red-600"
            @click="cancelDeposit"
          >
            {{ $t("Cancel") }}
          </button>
        </div>

        <!-- Deposit status: canceled -->
        <div
          v-else-if="walletsStore.depositStatus === 'canceled'"
          class="text-center"
        >
          <h2 class="text-2xl font-bold text-red-600 dark:text-red-400">
            {{ $t("Payment Failed") }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            {{
              $t(
                "We're sorry to inform you that your transaction has been canceled. We apologize for any inconvenience this may have caused. Please try again at your earliest convenience. If you continue to experience difficulties with your transaction, please contact our customer support team for assistance. Thank you for your understanding."
              )
            }}
          </p>
          <div class="mt-4">
            <svg
              class="mx-auto h-6 w-6 rounded-full border border-red-600 text-red-600 dark:border-red-400 dark:text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M15.707 4.293a1 1 0 00-1.414-1.414L10 8.586l-4.293-4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>

        <!-- Deposit status: completed -->
        <div
          v-else-if="walletsStore.depositStatus === 'completed'"
          class="text-center"
        >
          <h2 class="text-2xl font-bold text-green-600 dark:text-green-400">
            {{ $t("Payment Completed") }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            {{
              $t(
                "Congratulations! Your transaction has been successfully verified and completed. Thank you for choosing our service to carry out your transaction. If you have any questions or concerns regarding your transaction, please do not hesitate to contact our customer support team for assistance. Thank you for your trust in us, and we look forward to serving you again in the future."
              )
            }}
          </p>
          <div class="mt-4">
            <svg
              class="mx-auto h-6 w-6 rounded-full border border-green-600 text-green-600 dark:border-green-400 dark:text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <button
            class="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-blue-600"
            @click="walletsStore.closeModal('deposit')"
          >
            {{ $t("Close") }}
          </button>
        </div>
        <!-- Deposit status: failed -->
        <div
          v-else-if="walletsStore.depositStatus === 'failed'"
          class="text-center"
        >
          <h2 class="text-2xl font-bold text-red-600 dark:text-red-400">
            {{ $t("Payment Failed") }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            {{
              $t(
                "We're sorry to inform you that your transaction has failed. Please double-check that the information you entered is correct and try again. If you continue to experience difficulties, please contact our customer support team for assistance."
              )
            }}
          </p>
          <div class="mt-4">
            <svg
              class="mx-auto h-6 w-6 rounded-full border border-red-600 text-red-600 dark:border-red-400 dark:text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M15.707 4.293a1 1 0 00-1.414-1.414L10 8.586l-4.293-4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <button
            class="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-blue-600"
            @click="walletsStore.closeModal('deposit')"
          >
            {{ $t("Close") }}
          </button>
        </div>
        <!-- Deposit status: expired -->
        <div
          v-else-if="walletsStore.depositStatus === 'expired'"
          class="text-center"
        >
          <h2 class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {{ $t("Payment Expired") }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            {{
              $t(
                "We're sorry to inform you that your transaction has expired. This may be due to inactivity or an issue with your payment method. Please double-check that the information you entered is correct and try again. If you continue to experience difficulties, please contact our customer support team for assistance."
              )
            }}
          </p>
          <div class="mt-4">
            <svg
              class="mx-auto h-6 w-6 rounded-full border border-red-600 text-red-600 dark:border-red-400 dark:text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M15.707 4.293a1 1 0 00-1.414-1.414L10 8.586l-4.293-4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <button
            class="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-blue-600"
            @click="walletsStore.closeModal('deposit')"
          >
            {{ $t("Close") }}
          </button>
        </div>
        <div
          v-else-if="walletsStore.depositStatus === 'invalid'"
          class="text-center"
        >
          <h2 class="text-2xl font-bold text-red-600 dark:text-red-400">
            {{ $t("Invalid Transaction Hash") }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            {{
              $t(
                "We're sorry, but the transaction hash you entered is invalid or has already been used. Please double-check that the information you entered is correct and try again. If you believe there has been an error, please contact our customer support team for assistance."
              )
            }}
          </p>
          <div class="mt-4">
            <svg
              class="mx-auto h-6 w-6 rounded-full border border-red-600 text-red-600 dark:border-red-400 dark:text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M15.707 4.293a1 1 0 00-1.414-1.414L10 8.586l-4.293-4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <button
            class="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-blue-600"
            @click="walletsStore.closeModal('deposit')"
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
  import { useWalletsStore } from "@/store/wallets";
  import CountDown from "./CountDown.vue";
  export default {
    name: "DepositModal",
    components: {
      Modal,
      CountDown,
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
      async cancelDeposit() {
        await this.walletsStore.cancelDeposit(this.trx_hash);
      },
    },
  };
</script>
