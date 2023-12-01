<!-- BalanceCard.vue -->
<template>
  <div class="card" style="background-color: #000000;">
    <div
      class="card-body h-full"
      style="
        background: url('/assets/gif/rotating-shape.gif');
        background-position: right;
        background-repeat: no-repeat;
      "
    >
      <h4 class="card-title">
        <div class="title-gradient">
          {{ $t("Balance") }}
        </div>
      </h4>
      <div class="flex justify-between">
        <div class="h2 text-warning mb-1">
          <toMoney
            :num="userStore.user ? userStore.user.practice_balance : 0"
            decimals="2"
          />
          {{ symbol }}
        </div>
      </div>
      <div class="mt-1 flex">
        <button
          type="button"
          class="btn btn-outline-warning"
          @click="showModal()"
        >
          + {{ $t("Top Up") }}
        </button>
      </div>
    </div>
    <form @submit.prevent="userStore.AddPracticeBalance()">
      <transition
        name="modal"
        mode="out-in"
        enter-active-class="modal-enter-active"
        leave-active-class="modal-leave-active"
      >
        <Modal v-if="isShowModal" size="lg" @close="closeModal()">
          <template #header>
            <div class="flex items-center text-lg">
              {{ $t("Add Practice Balance") }}
            </div>
          </template>
          <template #body>
            <p>{{ $t("Are you sure you want to add practice balance") }}?</p>
          </template>
          <template #footer>
            <div class="flex justify-end">
              <button type="submit" class="btn btn-outline-success mr-3">
                {{ $t("Confirm") }}
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="closeModal()"
              >
                {{ $t("Close") }}
              </button>
            </div>
          </template>
        </Modal>
      </transition>
    </form>
  </div>
</template>

<script>
  import { Modal } from "flowbite-vue";
  import toMoney from "@/partials/toMoney.vue";
  export default {
    name: "BinaryPracticeBalanceCard",
    components: {
      Modal,
      toMoney,
    },
    props: {
      symbol: {
        type: String,
        default: "",
      },
      userStore: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isShowModal: false,
      };
    },
    methods: {
      closeModal() {
        this.isShowModal = false;
      },
      showModal() {
        this.isShowModal = true;
      },
      async AddPracticeBalance() {
        await this.userStore.AddPracticeBalance();
        this.closeModal();
      },
    },
  };
</script>
