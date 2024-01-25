<!-- <template>
  <transition name="modal" mode="out-in" enter-active-class="modal-enter-active" leave-active-class="modal-leave-active">
    <Modal v-if="walletsStore.isShowModal.deposit" :key="walletsStore.depositStatus" size="2xl"
      @close="walletsStore.closeModal('deposit')">
      <template #header>
        <div class="flex items-center text-lg">
          {{ $t("Deposit to Wallet") }}
        </div>
      </template>
      <template #body>
        <div v-if="walletsStore.depositStatus === 'unpaid'">
          <form @submit.prevent="Deposit(walletsStore.wallet, depositAmount)">
            <div class="p-4">
              <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-3">
                <div class="col-span-1">
                  <div>
                    <label class="form-control-label h6">{{ $t("To") }}</label>
                  </div>
                  <vue-qrcode :options="{ width: 150 }" :value="walletsStore.deposit_wallet"></vue-qrcode>
                </div>
                <div class="space-y-3 xs:col-span-1 md:col-span-2">
                  <div>
                    <label class="form-control-label h6" for="receiving_address">
                      {{ $t("Wallet Address") }}
                    </label>
                    <div class="input-group">
                      <input ref="receiving_address" type="text" :value="walletsStore.deposit_wallet" readonly />
                      <button class="btn btn-info" type="button" @click="copyAddress(walletsStore.deposit_wallet)">
                        {{ $t("Copy") }}
                      </button>
                    </div>
                    
                  </div>
                  <div class="input-group">
                    <input v-model.number="depositAmount" type="number" step="0.01" placeholder="Enter amount" />
                    <span>{{ $t("Amount") }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer mt-5">
              <div class="flex justify-end">
                <button type="submit" class="btn btn-outline-success mr-3" :disabled="walletsStore.loading">
                  {{ $t("Deposit") }}
                </button>
                <button type="button" class="btn btn-outline-secondary" @click="walletsStore.closeModal('deposit')">
                  {{ $t("Close") }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </template>
    </Modal>
  </transition>
</template> -->

<template>
  <Modal v-if="walletsStore.isShowModal.deposit" size="2xl" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">
        {{ $t("Deposit to Wallet") }}
      </div>
    </template>
    <template #body>
      <form @submit.prevent="depositStep === 1 ? Deposit(walletsStore.wallet, depositAmount) : null">

        <div v-if="depositStep === 1">
          <!-- Stage 1: Enter Amount -->
          <div class="p-4">
            <div class="input-group mb-3">
            <input v-model.number="depositAmount" type="number" step="any" id="amount" name="amount" placeholder="Enter Amount" required>
            <span id="symbol">{{ symbol }}</span>
        </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-outline-success mr-3" :disabled="walletsStore.loading">
                    {{ $t("Deposit") }}
              </button>
              <button type="button" class="btn btn-outline-secondary" @click="walletsStore.closeModal('deposit')">
                {{ $t("Cancel") }}
              </button>
            </div>
          </div>
        </div>
        <div v-else-if="depositStep === 2">
          <!-- Stage 2: QR Code and Address -->
          <div class="p-4">
            <div class="mb-3">
              <label class="form-label">{{ $t("Scan QR Code or Copy Address") }}</label>
              <vue-qrcode :value="walletsStore.deposit_wallet" class="mb-3"></vue-qrcode>
              <input type="text" class="form-control" :value="walletsStore.deposit_wallet" readonly>
            </div>
            <div class="modal-footer">
              <!-- <button type="submit" class="btn btn-outline-success mr-3" :disabled="walletsStore.loading">
                    {{ $t("Deposit") }}
                  </button> -->
                  <button type="button" class="btn btn-outline-secondary" @click="walletsStore.closeModal('deposit')">
                    {{ $t("Close") }}
                  </button>
            </div>
          </div>
        </div>
      </form>
    </template>
  </Modal>
</template>


<script>
import { Modal } from "flowbite-vue";
import { useWalletsStore } from "@/store/wallets";
export default {
  name: "DepositModal",
  components: { Modal },
  setup() {
    const walletsStore = useWalletsStore();
    return { walletsStore };
  },
  data() {
    return {
      trx_hash: null,
      depositAmount: null,
      depositStep: 1, 
      provider: provider,
      deposit_wallet: this.deposit_wallet
    };
  },
  methods: {
    async Deposit(wallet, amount) {
      await this.walletsStore.deposit(
        wallet,
        this.trx_hash,
        wallet.symbol,
        amount);
        this.depositStep = 2;
    },
    proceedToQRCode() {
      // Validate depositAmount here if needed
      this.depositStep = 2;
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
  },
};
</script>

