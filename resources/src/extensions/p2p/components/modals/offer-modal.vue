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
        {{ $t("Buy") }} {{ offer.user.username }}'s {{ $t("Offer") }}
      </template>
      <template #body>
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2">
            <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-2">
              <div>
                <label class="mr-2 font-bold text-lg"
                  >{{ $t("Seller") }}:</label
                >
                <span class="badge bg-primary">{{ offer.user.username }}</span>
              </div>
              <div>
                <label class="mr-2 font-bold text-lg"
                  >{{ $t("Completed Orders") }}:</label
                >
                <span>{{ completedOrders }}</span>
              </div>
              <div>
                <label class="mr-2 font-bold text-lg"
                  >{{ $t("Completion Rate") }}:</label
                >
                <span>{{ completionRate }}%</span>
              </div>
              <div>
                <label class="mr-2 font-bold text-lg"
                  >{{ $t("Payment Method") }}:</label
                >
                <span class="badge bg-primary">{{ offer.method.name }}</span>
              </div>
              <div>
                <label class="mr-2 font-bold text-lg"
                  >{{ $t("Payment Method Description") }}:</label
                >
                <span>{{ offer.method.description }}</span>
              </div>
            </div>
          </div>
          <div class="col-span-1 space-y-5">
            <div>
              <label class="mb-1 block font-bold" for="amount"
                >{{ $t("I want to pay") }}:</label
              >
              <div class="input-group">
                <input
                  id="amount"
                  v-model.number="amount"
                  type="number"
                  :placeholder="`${offer.min ?? ''} - ${offer.max ?? ''}`"
                  :min="Math.max(offer.min ?? 0, 0)"
                  :max="offer.max"
                  @input="calculateReceivedAmount"
                />

                <span>{{ offer.method.fiat }}</span>
              </div>
              <p v-if="amountWarning" class="text-danger mt-1 text-sm">
                {{ $t("The amount is not within the limits.") }}
              </p>
            </div>
            <div>
              <label class="mb-1 block font-bold" for="receivedAmount"
                >{{ $t("I will receive") }}:</label
              >
              <div class="input-group">
                <input
                  id="receivedAmount"
                  v-model.number="receivedAmount"
                  type="number"
                  readonly
                />
                <span>{{ offer.currency }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <button
            type="button"
            class="btn btn-outline-primary mr-2"
            @click="buy"
          >
            {{ $t("Buy") }}
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

  export default {
    components: {
      Modal,
    },
    props: {
      offer: Object,
      completedOrders: Number,
      completionRate: Number,
      showModal: Boolean,
    },
    emits: ["buy", "close"],
    data() {
      return {
        amount: "",
        receivedAmount: 0,
        amountWarning: false,
      };
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
      buy() {
        if (!this.amount) {
          return this.$toast.error("The amount is required.");
        }

        if (isNaN(parseFloat(this.amount)) || !isFinite(this.amount)) {
          return this.$toast.error("The amount must be a number.");
        }

        if (this.amount < this.offer.min) {
          return this.$toast.error("The amount is too low.");
        }

        if (this.amount <= 0) {
          return this.$toast.error("The amount must be greater than 0.");
        }

        this.$emit("buy", this.amount);
      },

      calculateReceivedAmount() {
        this.receivedAmount = this.amount * (this.offer.price || 0);

        if (
          this.amount < (this.offer.min ?? 0) ||
          this.amount > (this.offer.max ?? 0)
        ) {
          this.amountWarning = true;
        } else {
          this.amountWarning = false;
        }
      },
    },
  };
</script>
