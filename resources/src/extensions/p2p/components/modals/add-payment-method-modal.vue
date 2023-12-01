<template>
  <transition
    name="modal"
    mode="out-in"
    enter-active-class="modal-enter-active"
    leave-active-class="modal-leave-active"
  >
    <Modal
      v-if="showModal"
      :class="{ hidden: !showModal }"
      size="lg"
      @close="closeModal"
    >
      <template #header>{{ $t("Create Payment Method") }}</template>
      <template #body>
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label
              for="payment_method_name"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >{{ $t("Payment Method Name") }}</label
            >
            <input
              id="payment_method_name"
              v-model="method.name"
              type="text"
              class="form-control"
            />
          </div>
          <div>
            <label
              for="payment_method_description"
              class="mt-3 block text-sm font-medium text-gray-700 dark:text-gray-200"
              >{{ $t("Description") }}</label
            >
            <textarea
              id="payment_method_description"
              v-model="method.description"
              type="text"
              class="form-control"
            >
            </textarea>
          </div>
          <div>
            <label
              for="payment_method_status"
              class="mt-3 block text-sm font-medium text-gray-700 dark:text-gray-200"
              >{{ $t("Status") }}</label
            >
            <select
              id="payment_method_status"
              v-model="method.status"
              class="form-control"
            >
              <option value="1">{{ $t("Active") }}</option>
              <option value="0">{{ $t("Inactive") }}</option>
            </select>
          </div>
          <div>
            <label
              for="payment_method_fiat"
              class="mt-3 block text-sm font-medium text-gray-700 dark:text-gray-200"
              >{{ $t("Fiat Currency") }}</label
            >
            <select
              id="payment_method_fiat"
              v-model="method.fiat"
              class="form-control"
            >
              <option
                v-for="fiatOption in fiat"
                :key="fiatOption.code"
                :value="fiatOption.code"
              >
                {{ fiatOption.name }} ({{ fiatOption.code }} -
                {{ fiatOption.symbol }})
              </option>
            </select>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <button
            type="button"
            class="btn btn-outline-primary mr-2"
            @click="storePaymentMethod"
          >
            {{ $t("Create") }}
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="closeModal"
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

  export default {
    components: {
      Modal,
    },
    props: {
      showModal: {
        type: Boolean,
        default: false,
      },
      fiat: {
        type: Array,
        required: true,
      },
    },
    emits: ["close", "created"],
    data() {
      return {
        method: {
          name: "",
          description: "",
          status: "1",
          fiat: "",
        },
      };
    },
    methods: {
      resetOffer() {
        this.method = {
          name: "",
          description: "",
          status: "1",
          fiat: "",
        };
        this.$emit("created");
        this.closeModal();
      },
      closeModal() {
        this.$emit("close");
      },
      async storePaymentMethod() {
        try {
          const response = await axios.post(
            `/user/p2p/seller/payment-methods`,
            {
              name: this.method.name,
              description: this.method.description,
              status: this.method.status,
              fiat: this.method.fiat,
            }
          );
          this.$toast[response.type](response.message);
          if (response.type == "success") {
            this.resetOffer();
          }
        } catch (error) {
          console.log(error);
          if (error.response.status === 422) {
            const errors = error.response.data.errors;
            let errorMessage = "";
            Object.keys(errors).forEach((key) => {
              errorMessage += errors[key][0] + "\n";
            });
            this.$toast.error(errorMessage);
          } else {
            this.$toast.error(error.response.data.error);
          }
        }
      },
    },
  };
</script>
