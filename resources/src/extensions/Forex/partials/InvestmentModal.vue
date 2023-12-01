<template>
  <transition
    name="modal"
    mode="out-in"
    enter-active-class="modal-enter-active"
    leave-active-class="modal-leave-active"
  >
    <Modal
      v-if="forexStore.isShowModal.selectInvestment"
      size="3xl"
      @close="forexStore.closeModal('selectInvestment')"
    >
      <template #header>
        <div class="flex items-center text-lg">
          {{ $t("Forex Withdraw") }}
        </div>
      </template>
      <template #body>
        <template
          v-for="(investment, index) in forexStore.forex_investment"
          :key="index"
        >
          <div
            class="mb-2 flex cursor-pointer justify-start rounded border border-gray-200 p-2 shadow hover:bg-gray-200 dark:border-gray-500 dark:hover:bg-gray-600"
            :class="
              forexStore.selected_inv
                ? forexStore.selected_inv.id == investment.id
                  ? 'bg-gray-200 dark:bg-gray-900'
                  : ' dark:bg-gray-700'
                : ' dark:bg-gray-700'
            "
            @click="
              forexStore.closeModal('selectInvestment');
              forexStore.selectInvestment(investment);
            "
          >
            <div class="p-2">
              <img
                v-lazy="'/assets/images/forex/investment/' + investment.image"
                class="rounded-circle shadow-4"
                width="64"
              />
            </div>
            <div class="w-full">
              <div class="flex justify-between">
                <div class="fw-bold fs-4">
                  {{ investment.title }}
                  <span
                    v-if="investment.is_new == 1"
                    class="fs-6 badge bg-success"
                    >{{ $t("New") }}</span
                  >
                </div>
                <div class="fs-6 d-none d-md-block">
                  <i class="bi bi-clock"></i>
                  {{ investment.duration }}
                  {{ $t("Days") }}
                </div>
              </div>
              <small class="fs-6 text-warning">{{ investment.desc }}</small>
              <div>
                {{ investment.duration }}
                {{ $t("Days") }}
                {{ $t("Return on Investment") }}:
                <span class="text-success">{{ investment.roi }}%</span>
              </div>
            </div>
          </div>
        </template>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="forexStore.closeModal('selectInvestment')"
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

  export default {
    components: {
      Modal,
    },
    props: {
      forexStore: {
        type: Object,
        required: true,
      },
    },
  };
</script>
