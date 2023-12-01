<template>
  <div>
    <div class="mb-3 flex items-center justify-between">
      <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {{ $t("Order History") }}
      </h2>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">
              {{ $t("Product name") }}
            </th>
            <th scope="col" class="px-6 py-3">
              {{ $t("Price") }}
            </th>
            <th scope="col" class="px-6 py-3">
              {{ $t("Action") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(order, index) in ecommerceStore.orders"
            :key="order.id"
            class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              {{ order.product.name }}
            </th>
            <td class="px-6 py-4">{{ order.price }}</td>
            <td class="px-6 py-4">
              <template v-if="order.license.activation === 1">
                <button
                  type="button"
                  class="btn btn-outline-success"
                  @click.prevent="openModal(order)"
                >
                  {{ $t("View License") }}
                </button>
              </template>
              <template v-else>
                <button
                  type="button"
                  :disabled="loading"
                  class="btn btn-outline-primary"
                  @click.prevent="activate(order)"
                >
                  {{ $t("Activate Order") }}
                </button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <transition
      name="modal"
      mode="out-in"
      enter-active-class="modal-enter-active"
      leave-active-class="modal-leave-active"
    >
      <Modal
        v-if="showModal"
        :class="{ hidden: !showModal }"
        size="2xl"
        @close="closeModal"
      >
        <template #header>
          <div class="flex items-center text-lg">
            {{ $t("Order Details") }}
          </div>
        </template>
        <template #body>
          <p class="text-gray-600 dark:text-gray-400">
            {{ $t("License") }} : {{ selectedOrder.license.license }}
          </p>
          <p class="text-gray-600 dark:text-gray-400">
            {{ $t("Transaction ID") }} : {{ selectedOrder.trx }}
          </p>
        </template>
        <template #footer>
          <div class="flex justify-end">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="closeModal"
            >
              {{ $t("Close") }}
            </button>
          </div>
        </template>
      </Modal>
    </transition>
  </div>
</template>

<script>
  import { Modal } from "flowbite-vue";
  import { useEcommerceStore } from "../../store/ecommerce";
  export default {
    components: {
      Modal,
    },
    setup() {
      const ecommerceStore = useEcommerceStore();
      return { ecommerceStore };
    },
    data() {
      return {
        showModal: false,
        selectedOrder: null,
        loading: false,
      };
    },
    mounted() {
      this.loadOrders();
    },
    methods: {
      async loadOrders() {
        if (this.ecommerceStore.orders.length == 0) {
          await this.ecommerceStore.fetch_orders();
        }
      },
      openModal(order) {
        this.selectedOrder = order;
        this.showModal = true;
      },
      closeModal() {
        this.selectedOrder = null;
        this.showModal = false;
      },
      async activate(order) {
        this.loading = true;
        await this.ecommerceStore.activate_order(order);
        this.loading = false;
      },
    },
  };
</script>
