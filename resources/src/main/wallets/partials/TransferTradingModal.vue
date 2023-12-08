<template>
  <form @submit.prevent="TransferTrading()">
    <transition
      name="modal"
      mode="out-in"
      enter-active-class="modal-enter-active"
      leave-active-class="modal-leave-active"
    >
      <Modal
        v-if="walletsStore.isShowModal.transferTrading"
        size="lg"
        @close="walletsStore.closeModal('transferTrading')"
      >
        <template #header>
          <div class="flex items-center text-lg">
            {{ $t("Trading To Funding Transfer") }}
          </div>
        </template>
        <template #body>
          <div>
            <label for="amount"> {{ $t("Amount") }}</label>
            <input
              v-model="amount"
              type="number"
              class="form-control"
              min="0.000001"
              step="0.000001"
              max="999999999"
              required
            />
          </div>
        </template>
        <template #footer>
          <div class="flex justify-end" style="margin: -10px;">
            <button
              type="submit"
              class="btn btn-outline-success mr-3"
              :disabled="walletsStore.loading"
            >
              {{ $t("Transfer") }}
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="walletsStore.closeModal('transferTrading')"
            >
              {{ $t("Close") }}
            </button>
          </div>
        </template>
      </Modal>
    </transition>
  </form>
</template>

<script>
  import { useWalletsStore } from "@/store/wallets";
  import { Modal } from "flowbite-vue";
  export default {
    components: {
      Modal,
    },
    props: {
      symbol: {
        type: String,
        required: true,
      },
    },
    setup() {
      const walletsStore = useWalletsStore();
      return { walletsStore };
    },
    data() {
      return {
        amount: null,
      };
    },
    methods: {
      async TransferTrading() {
        this.walletsStore.TransferTrading(this.symbol, this.amount);
      },
    },
  };
</script>
