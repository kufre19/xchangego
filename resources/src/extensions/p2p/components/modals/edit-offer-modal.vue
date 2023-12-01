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
      size="5xl"
      @close="closeModal"
    >
      <template #header>
        {{ $t("Edit") }} {{ offer.user.username }}'s {{ $t("Offer") }}
      </template>
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
              @change="updateFiat"
            >
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
              class="form-control"
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
                :disabled="disablePriceUpdate"
                type="number"
              />
              <span id="fiat">{{ selectedMethodFiat }}</span>
            </div>
          </div>
          <div>
            <label class="mb-1 block font-bold" for="min"
              >{{ $t("Min") }}:</label
            >
            <div class="input-group">
              <input id="min" v-model.number="offer.min" type="number" />
              <span>{{ offer.currency }}</span>
            </div>
          </div>
          <div>
            <label class="mb-1 block font-bold" for="max"
              >{{ $t("Max") }}:</label
            >
            <div class="input-group">
              <input id="max" v-model.number="offer.max" type="number" />
              <span>{{ offer.currency }}</span>
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
              />
              <span>{{ offer.currency }}</span>
            </div>
          </div>
          <div>
            <label class="mb-1 block font-bold" for="status"
              >{{ $t("Status") }}:</label
            >
            <select id="status" v-model="offer.status" class="form-control">
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
            @click="update"
          >
            {{ $t("Update") }}
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
      offer: Object,
      showModal: Boolean,
      paymentMethods: Object,
      disablePriceUpdate: Boolean,
    },
    emits: ["update", "close"],
    data() {
      return {
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
      async update() {
        const requestData = {
          currency: this.offer.currency,
          min: this.offer.min,
          max: this.offer.max,
          available: this.offer.available,
          status: this.offer.status,
          payment_method_id: this.offer.payment_method_id,
        };

        if (!this.disablePriceUpdate) {
          requestData.price = this.offer.price;
        }

        try {
          const response = await axios.put(
            `/user/p2p/seller/offer/${this.offer.id}`,
            requestData
          );
          this.$toast[response.type](response.message);
          if (response.type == "success") {
            this.$emit("update");
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
