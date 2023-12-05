<template>
  <form class="space-y-5 text-center" @submit.prevent="submitForm">
    <template v-if="formType == 'limit'">
      <PriceInput
        v-model="price"
        :order-type="orderType"
        :min-price="minPrice"
        :pair-name="pair"
        @get-best-price="getBestPrice"
      />
    </template>
    <AmountInput
      v-model="amount"
      :order-type="orderType"
      :form-type="formType"
      :min-amount="minAmount"
      :max-amount="maxAmount"
      :precision-amount="precisionAmount"
      :currency-name="currency"
      @calculate-total="calculateTotal"
      @calculate-percentage="calculatePercentage"
      @update:modelValue="calculateTotal"
    />

    <TotalInput
      v-model="total"
      :taker-fee="pfee"
      :maker-fee="pfee"
      :order-type="orderType"
      :disabled="true"
      :pair-name="pair"
    />

    <Button
      v-if="auth"
      :id="buttonId"
      :color="buttonColor"
      outline
      size="sm"
      class="w-full"
      :class="formType + 'Type'"
      :loading="store.loading"
      :disabled="store.loading || !orderAvailability"
    >
      {{ buttonText }}
    </Button>
    <a v-else href="/app">
      <Button
        :id="buttonId"
        :color="buttonColor"
        outline
        size="sm"
        class="w-full mt-5"
        :class="formType + 'Type'"
        :loading="store.loading"
        :disabled="store.loading || !orderAvailability"
        type="button"
      >
        {{ $t("Login To Trade") }}
      </Button>
    </a>
  </form>
</template>

<script>
  import { ref, computed, watch, onMounted } from "vue";
  import { Button } from "flowbite-vue";
  import { useI18n } from "vue-i18n";
  import AmountInput from "@/partials/order/AmountInput.vue";
  import TotalInput from "@/partials/order/TotalInput.vue";
  import PriceInput from "@/partials/order/PriceInput.vue";

  export default {
    components: {
      Button,
      AmountInput,
      TotalInput,
      PriceInput,
    },
    props: {
      orderType: String,
      formType: String,
      currency: String,
      pair: String,
      pfee: [Number, String],
      fee: [Number, String],
      store: Object,
      auth: {
        type: Boolean,
        default: true,
      },
    },
    emits: ["OrderPlaced"],
    setup(props, { emit }) {
      const { t } = useI18n();
      const isAmountChanged = ref(false);

      const minAmount = computed(
        () => Number.parseFloat(props.store.market.limits.amount.min) || 0.0001
      );

      const minPrice = computed(
        () =>
          (provider === "kucoin"
            ? Number.parseFloat(props.store.market.precision.price)
            : 0.00000001) || 0.0001
      );

      const maxAmount = computed(
        () => Number.parseFloat(props.store.market.limits.amount.max) || 10000
      );

      const precisionAmount = computed(() => {
        if (props.store.market && props.store.market.precision.amount) {
          const precision = Number.parseFloat(
            props.store.market.precision.amount
          );
          if (Number.isInteger(precision)) {
            return precision;
          } else {
            // Check if the precision is in scientific notation
            const sciNotationMatch = precision
              .toString()
              .match(/(\d+(\.\d+)?)[eE][+-]\d+/);
            if (sciNotationMatch) {
              const decimalPart = (
                parseFloat(sciNotationMatch[1]).toString().split(".")[1] || ""
              ).length;
              const exponent = parseInt(sciNotationMatch[0].split(/e|E/)[1]);
              return decimalPart + Math.abs(exponent);
            } else {
              return precision.toString().split(".")[1].length;
            }
          }
        }
        return 6;
      });

      const minCost = computed(() => {
        if (props.store.market && props.store.market.limits.cost.min) {
          return Number.parseFloat(props.store.market.limits.cost.min);
        }
      });

      const amount = ref(minAmount.value ?? 0);
      const total = ref(0);
      const price = ref(0);

      const updateAmount = (newAmount) => {
        amount.value = newAmount;
      };

      const updateTotal = (newTotal) => {
        total.value = newTotal;
      };

      const updatePrice = (newTotal) => {
        price.value = newTotal;
      };

      const buttonId = computed(
        () =>
          props.formType +
          (props.orderType === "buy" ? "OrderBtnBuy" : "OrderBtnSell")
      );
      const buttonColor = computed(() =>
        props.orderType === "buy" ? "green" : "red"
      );
      const orderAvailability = computed(() =>
        props.formType == "market"
          ? props.orderType === "buy"
            ? props.store.bestAsk > 0
            : props.store.bestBid > 0
          : true
      );
      const buttonText = computed(() =>
        orderAvailability.value
          ? (props.orderType === "buy" ? t("Buy") : t("Sell")) +
            " " +
            props.currency
          : props.orderType === "buy"
          ? "Loading Orderbook..."
          : "Loading Orderbook..."
      );

      const submitForm = async () => {
        if (minCost.value && total.value < minCost.value) {
          $toast.error(
            t(`The minimum order size is ${minCost.value} ${props.pair}`)
          );
          return;
        }
        try {
          await props.store.executeTrade(
            props.orderType,
            props.formType,
            props.formType === "market" ? null : price.value,
            amount.value,
            props.currency,
            props.pair
          );
          emit("OrderPlaced");
        } catch (error) {
          $toast.error("Error executing trade:", error);
        }
      };

      const calculateTotalAmount = (amount, percent) => {
        const priceTotal =
          props.formType === "market" ? bestPrice.value : price.value;

        const feeMultiplier = props.pfee / 100;
        const totalAmount = (amount * (percent / 100)) / priceTotal;
        const fee = totalAmount * feeMultiplier;
        return parseFloat(totalAmount - fee).toFixed(precisionAmount.value);
      };

      watch(
        amount,
        (newAmount, oldAmount) => {
          if (newAmount !== oldAmount) {
            isAmountChanged.value = true;
          }
        },
        { immediate: false }
      );

      watch(price, () => {
        calculateTotal();
      });

      const calculateTotalWithFees = (orderAmount, fee) => {
        const feeAmount = (orderAmount * fee) / 100;
        return props.orderType === "buy"
          ? orderAmount + feeAmount
          : orderAmount - feeAmount;
      };

      const calculatePercentage = (percent) => {
        if (!props.currency && !props.pair) {
          $toast.error(
            `Create ${
              props.orderType === "buy" ? props.pair : props.currency
            } Wallet First`
          );
          return;
        }
        if (!props.store.bestBid && !props.store.bestAsk) {
          $toast.error("Waiting For Orderbook...");
          return;
        }

        const walletBalanceCurrency = parseFloat(props.store.currencyBalance);
        const walletBalancePair = parseFloat(props.store.pairBalance);

        if (price.value === 0) {
          price.value = bestPrice.value;
        }
        if (props.orderType === "buy") {
          total.value = parseFloat((walletBalancePair * percent) / 100).toFixed(
            precisionAmount.value
          );
          const totalWithoutFee = total.value / (1 + props.pfee / 100);
          amount.value = parseFloat(
            totalWithoutFee /
              (props.formType === "market" ? bestPrice.value : price.value)
          ).toFixed(precisionAmount.value);
        } else {
          amount.value = parseFloat(
            (walletBalanceCurrency * percent) / 100
          ).toFixed(precisionAmount.value);
          const totalWithoutFee =
            amount.value *
            (props.formType === "market" ? bestPrice.value : price.value);
          total.value = parseFloat(
            totalWithoutFee * (1 - props.pfee / 100)
          ).toFixed(precisionAmount.value);
        }

        calculateTotal();
      };

      const calculateTotal = () => {
        if (isAmountChanged.value) {
          let balance, symbol, fee;
          if (props.orderType === "buy") {
            balance = props.store.pairBalance;
            symbol = props.pair;
          } else {
            balance = props.store.currencyBalance;
            symbol = props.currency;
          }
          fee = props.pfee;

          if (props.formType === "market" && props.store.bestBid === null) {
            $toast.error("No spot price detected, Make a limit order first");
            return;
          }

          const currentPrice =
            props.formType === "market" || price.value === 0
              ? bestPrice.value
              : price.value;

          const orderAmount = amount.value * currentPrice;

          const totalWithFees = calculateTotalWithFees(orderAmount, fee);

          if (
            (props.orderType === "buy" ? balance : orderAmount) < totalWithFees
          ) {
            $toast.error(
              `Order amount higher than your ${symbol} wallet balance with fees`
            );
            return;
          }

          total.value = totalWithFees.toFixed(precisionAmount.value);
        }
      };

      const bestPrice = computed(
        () => props.store[props.orderType === "buy" ? "bestAsk" : "bestBid"]
      );

      const getBestPrice = () => {
        const priceToSet =
          props.orderType === "buy"
            ? props.store.bestAsk || props.store.bestBid
            : props.store.bestBid || props.store.bestAsk;
        price.value = priceToSet;
        calculateTotal();
      };

      onMounted(() => {
        isAmountChanged.value = false;
      });

      return {
        submitForm,
        buttonId,
        buttonColor,
        orderAvailability,
        buttonText,
        updateAmount,
        updateTotal,
        updatePrice,
        calculatePercentage,
        calculateTotalAmount,
        calculateTotal,
        minAmount,
        minPrice,
        maxAmount,
        precisionAmount,
        amount,
        total,
        price,
        getBestPrice,
      };
    },
  };
</script>
