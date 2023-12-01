<template>
  <transition
    name="modal"
    mode="out-in"
    enter-active-class="modal-enter-active"
    leave-active-class="modal-leave-active"
  >
    <Modal v-if="visible" size="2xl" @close="$emit('close')">
      <template #header>
        <div class="flex items-center text-lg">
          <h3 id="modal-headline" class="text-lg font-medium leading-6">
            {{ product.name }}
          </h3>
        </div>
      </template>
      <template #body>
        <p class="mb-5 text-sm">
          {{ product.description }}
        </p>
        <p class="mb- text-lg font-medium">${{ productPrice }}</p>
        <div v-if="wallet">
          <label for="wallet_id">USDT Funding Wallet:</label>
          <div class="flex items-center">
            <span class="text-warning font-medium"
              >{{ Number(wallet.balance).toFixed(2) }} {{ wallet.symbol }}</span
            >
          </div>
        </div>
        <div v-else>
          <button class="btn btn-primary" @click="CreateWallet()">
            {{ $t("Create Wallet") }}
          </button>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <button
            type="button"
            class="btn btn-outline-success mr-3"
            :disabled="loading"
            @click="onPurchase()"
          >
            Purchase
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="$emit('close')"
          >
            {{ $t("Cancel") }}
          </button>
        </div>
      </template>
    </Modal>
  </transition>
</template>
<script>
  import { Modal } from "flowbite-vue";
  import { useWalletsStore } from "@/store/wallets";
  export default {
    components: { Modal },
    props: {
      product: {
        type: Object,
        required: true,
      },
      wallet: {
        type: Object,
        default: null,
      },
      visible: {
        type: Boolean,
        required: true,
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    emits: ["close", "purchase"],
    setup() {
      const walletsStore = useWalletsStore();
      return { walletsStore };
    },
    computed: {
      productPrice() {
        return this.product.price - this.product.discount;
      },
    },
    methods: {
      onPurchase() {
        this.$emit("purchase", this.product.id);
      },
      CreateWallet() {
        this.walletsStore.create("USDT", "funding");
      },
    },
  };
</script>
