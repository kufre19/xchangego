<template>
  <form @submit.prevent="Deposit()">
    <transition
      name="modal"
      mode="out-in"
      enter-active-class="modal-enter-active"
      leave-active-class="modal-leave-active"
    >
      <Modal
        v-if="forexStore.isShowModal.deposit"
        size="lg"
        @close="forexStore.closeModal('deposit')"
      >
        <template #header>
          <div class="flex items-center text-lg">
            {{ $t("Forex Deposit") }}
          </div>
        </template>
        <template #body>
          <div class="mb-2">
            <div for="">{{ $t("From Wallet") }}</div>
            <dropdown v-if="forexStore.wallets != null" text="button">
              <template #trigger>
                <button class="btn btn-outline-primary" type="button">
                  <i class="bi bi-sort-down-alt mr-2"></i>
                  <toMoney v-if="wal != null" :num="wal.balance" decimals="2" />
                  {{ wal ? wal.symbol : "Select Wallet" }}
                </button>
              </template>
              <list-group :class="'text-start'"
                ><div
                  class="flex items-center border-b py-3 px-4 text-sm text-gray-900 dark:text-white"
                >
                  <i class="bi bi-sort-down-alt mr-2"></i>
                  {{ $t("Select Wallet") }}
                </div>
                <list-group-item
                  v-for="(wallet, index) in forexStore.wallets"
                  :key="index"
                  class="items-between inline-flex w-full cursor-pointer border-b border-gray-200 px-4 py-2 hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500"
                >
                  <a
                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    @click="selectWallet(wallet)"
                  >
                    <span :key="wallet.balance" class="mr-3"
                      ><toMoney :num="wallet.balance" decimals="2" /></span
                    ><span>{{ wallet.symbol }}</span>
                  </a>
                </list-group-item>
              </list-group>
            </dropdown>
          </div>
          <div>
            <label for="">{{ $t("Amount") }}</label>
            <div class="input-group mb-1 w-auto">
              <input
                v-model="amount"
                type="number"
                required=""
                min="0.01"
                step="0.01"
                placeholder="Amount"
              />
              <span>{{ wal ? wal.symbol : "" }}</span>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-end space-x-2">
            <Button
              size="sm"
              class="flex items-center justify-between"
              color="green"
              :loading="forexStore.depositing"
              :disabled="forexStore.depositing"
            >
              <span> {{ $t("Deposit") }}</span>
            </Button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="forexStore.closeModal('deposit')"
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
  import {
    Dropdown,
    ListGroup,
    ListGroupItem,
    Modal,
    Button,
  } from "flowbite-vue";
  import toMoney from "@/partials/toMoney.vue";

  export default {
    components: {
      Modal,
      Dropdown,
      ListGroup,
      ListGroupItem,
      Button,
      toMoney,
    },
    props: {
      forexStore: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        wal: null,
        amount: 0,
      };
    },
    methods: {
      async Deposit() {
        await this.forexStore.Deposit(this.wal.symbol, this.amount);
        this.wal = null;
      },
      selectWallet(wallet) {
        this.wal = wallet;
      },
    },
  };
</script>
