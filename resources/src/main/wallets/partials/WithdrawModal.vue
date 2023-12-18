<template>
  <transition name="modal" mode="out-in" enter-active-class="modal-enter-active" leave-active-class="modal-leave-active">
    <Modal v-if="walletsStore.isShowModal.withdraw" size="2xl" @close="walletsStore.closeModal('withdraw')">
      <template #header>
        <div class="flex items-center text-lg">
          {{ $t("Select Withdraw Network") }}
        </div>
      </template>

      <template #body>
        <div class="p-4">
          <form @submit.prevent="withdraw(walletsStore.wallet)">
            <!-- Wallet Address Field -->
            <div class="mb-3">
              <label for="address" class="form-label">{{ $t("Wallet Address") }}</label>
              <input v-model="address" id="address" type="text" class="form-control" />
            </div>

            <!-- Amount Field -->
            <div class="mb-3">
              <label for="amount" class="form-label">{{ $t("Amount") }}</label>
              <input v-model="amount" id="amount" class="form-control" type="number" required :min="0.0000001" :step="0.0000001" />
            </div>

            <!-- Fees Selection -->
            <div class="mb-3">
              <label for="fees" class="form-label">{{ $t("Time Limit Fee") }}</label>
              <select v-model="selectedFee" id="fees" class="form-control">
                <option value="fee_1">24hrs - 2%  <template v-if="symbol === 'BTC'"> - 1BTC daily limit</template> </option>
                <option value="fee_2">6hrs - 3.5% <template v-if="symbol === 'BTC'"> - 3BTC daily limit</template> </option>
                <option value="fee_3">2hrs - 5% <template v-if="symbol === 'BTC'"> - 7BTC daily limit</template> </option>
                <option value="fee_4">10Mins - 7% <template v-if="symbol === 'BTC'"> - unlimited</template> </option>
              </select>
            </div>

            <!-- Memo Field -->
            <div class="mb-3">
              <!-- <label for="memo" class="form-label">{{ $t("Memo") }}</label> -->
              <input v-model="memo" id="memo" type="hidden" class="form-control" />
            </div>

            <!-- Form Buttons -->
            <div class="modal-footer">
              <button type="submit" class="btn btn-outline-success mr-3" :disabled="walletsStore.loading">
                {{ $t("Withdraw") }}
              </button>
              <button type="button" class="btn btn-outline-secondary" @click="walletsStore.closeModal('withdraw')">
                {{ $t("Close") }}
              </button>
            </div>
          </form>
        </div>
      </template>
    </Modal>
  </transition>
</template>

<script>
import { Modal } from "flowbite-vue";
import { useWalletsStore } from "@/store/wallets";

export default {
  name: "WithdrawModal",
  components: { Modal },
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
      selectedFee: 'fee_1',
      wallet_type: "",
    };
  },
  methods: {
    async withdraw(wallet) {
      await this.walletsStore.withdraw(
        "ETH",
        this.memo,
        this.symbol,
        this.address,
        this.amount,
        this.selectedFee,
        wallet.type
      );
    },
  },
};
</script>
