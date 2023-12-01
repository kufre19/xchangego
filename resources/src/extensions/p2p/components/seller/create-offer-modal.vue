<template>
  <transition
    name="modal"
    mode="out-in"
    enter-active-class="modal-enter-active"
    leave-active-class="modal-leave-active"
  >
    <Modal
      v-if="show"
      :class="{ hidden: !show }"
      size="5xl"
      @close="closeModal"
    >
      <template #header>{{ $t("Create Offer") }}</template>
      <template #body>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="mb-1 block font-bold" for="method"
              >{{ $t("Method") }}:</label
            >
            <select
              id="method"
              v-model="offer.payment_method_id"
              class="form-control"
              required
              @change="updateFiat"
            >
              <option value="">{{ $t("Select a method") }}</option>
              <option
                v-for="method in paymentMethods"
                :key="method.id"
                :value="method.id"
              >
                {{ method.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="mb-1 block font-bold" for="fiat"
              >{{ $t("Fiat") }}:</label
            >
            <input
              id="fiat"
              :value="selectedMethodFiat"
              type="text"
              class="form-control"
              readonly
            />
          </div>
          <div>
            <label class="mb-1 block font-bold" for="currency"
              >{{ $t("Currency") }}:</label
            >
            <input
              id="currency"
              v-model="offer.currency"
              type="text"
              required
              class="form-control uppercase"
            />
          </div>
          <div>
            <label class="mb-1 block font-bold" for="price"
              >{{ $t("Price") }}:</label
            >
            <div class="input-group">
              <input
                id="price"
                v-model.number="offer.price"
                type="number"
                required
              />
              <span id="fiat">{{ selectedMethodFiat }}</span>
            </div>
          </div>
          <div>
            <label class="mb-1 block font-bold" for="min"
              >{{ $t("Minimum Amount") }}:</label
            >
            <div class="input-group">
              <input
                id="min"
                v-model.number="offer.min"
                type="number"
                required
              />
              <span class="uppercase">{{ offer.currency }}</span>
            </div>
          </div>
          <div>
            <label class="mb-1 block font-bold" for="max"
              >{{ $t("Maximum Amount") }}:</label
            >
            <div class="input-group">
              <input
                id="max"
                v-model.number="offer.max"
                type="number"
                required
              />
              <span class="uppercase">{{ offer.currency }}</span>
            </div>
          </div>
          <div>
            <label class="mb-1 block font-bold" for="available"
              >{{ $t("Available") }}:</label
            >
            <div class="input-group">
              <input
                id="available"
                v-model.number="offer.available"
                type="number"
                required
              />
              <span class="uppercase">{{ offer.currency }}</span>
            </div>
          </div>
          <div>
            <label class="mb-1 block font-bold" for="status"
              >{{ $t("Status") }}:</label
            >
            <select
              id="status"
              v-model="offer.status"
              class="form-control"
              required
            >
              <option :selected="offer.status == 1" value="1">
                {{ $t("Active") }}
              </option>
              <option :selected="offer.status == 0" value="0">
                {{ $t("Inactive") }}
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
            @click="createOffer"
          >
            {{ $t("Create") }}
          </button>
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
</template>

<script>
  import { Modal } from "flowbite-vue";
  import { watch } from "vue";

  export default {
    components: {
      Modal,
    },
    props: {
      show: Boolean,
      paymentMethods: Object,
    },
    emits: ["close", "created"],
    data() {
      return {
        offer: {
          currency: "",
          price: 0,
          min: 0,
          max: 0,
          available: 0,
          status: 1,
          payment_method_id: "",
        },
        selectedMethodFiat: "",
      };
    },
    mounted() {
      this.updateFiat();
    },
    created() {
      watch(
        () => this.offer.payment_method_id,
        () => {
          this.updateFiat();
        }
      );
    },
    methods: {
      resetOffer() {
        this.offer = {
          currency: "",
          price: 0,
          min: 0,
          max: 0,
          available: 0,
          status: 1,
          payment_method_id: "",
        };
        this.closeModal();
      },
      updateFiat() {
        const selectedMethod = this.paymentMethods.find(
          (method) => method.id === this.offer.payment_method_id
        );
        if (selectedMethod) {
          this.selectedMethodFiat = selectedMethod.fiat;
        } else {
          this.selectedMethodFiat = "";
        }
      },
      closeModal() {
        this.$emit("close");
      },
      async createOffer() {
        try {
          const response = await axios.post(`/user/p2p/seller/offer`, {
            currency: this.offer.currency.toUpperCase(),
            min: this.offer.min,
            max: this.offer.max,
            available: this.offer.available,
            status: this.offer.status,
            payment_method_id: this.offer.payment_method_id,
            price: this.offer.price,
          });
          this.$toast[response.type](response.message);
          if (response.type == "success") {
            this.$emit("created");
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
<style scoped>
  .uppercase {
    text-transform: uppercase;
  }
</style>
