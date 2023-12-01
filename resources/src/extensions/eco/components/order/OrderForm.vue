<template>
  <form class="space-y-3 text-center" @submit.prevent="submitForm">
    <template v-if="formType == 'limit'">
      <PriceInput
        v-model="price"
        :order-type="orderType"
        :pair-name="pairName"
        :disabled="ecoStore.loading"
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
      :currency-name="currencyName"
      :disabled="ecoStore.loading"
      @calculate-total="calculateTotal"
      @calculate-percentage="calculatePercentage"
    />

    <TotalInput
      v-model="total"
      :taker-fee="ecoStore.market.taker"
      :maker-fee="ecoStore.market.maker"
      :order-type="orderType"
      :disabled="true"
      :pair-name="pairName"
    />

    <Button
      :id="buttonId"
      :color="buttonColor"
      outline
      size="sm"
      class="w-full"
      :class="formType + 'Type'"
      :loading="ecoStore.loading"
      :disabled="ecoStore.loading || !orderAvailability"
    >
      {{ buttonText }}
    </Button>
  </form>
</template>

<script>
  import { ref, computed, watch } from "vue";
  import { useEcoStore } from "@/store/eco";
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
    },
    setup(props) {
      const { t } = useI18n();
      const ecoStore = useEcoStore();

      const minAmount = computed(
        () => Number.parseFloat(ecoStore.market.min_amount) || 0.0001
      );
      const maxAmount = computed(
        () => Number.parseFloat(ecoStore.market.max_amount) || 10000
      );

      const precisionAmount = computed(() => {
        if (ecoStore.market && ecoStore.market.min_amount) {
          return (
            Number.parseFloat(ecoStore.market.min_amount)
              .toString()
              .split(".")[1]?.length || 6
          );
        }
        return 6;
      });

      const amount = ref(minAmount.value ?? 0);
      const total = ref(0);
      const price = ref(0);

      const currencyName = computed(() => {
        const currency = ecoStore.market.currency;
        if (currency.includes("_")) {
          return currency.substring(0, currency.indexOf("_"));
        } else {
          return currency;
        }
      });

      const pairName = computed(() => {
        const pair = ecoStore.market.pair;
        if (pair.includes("_")) {
          return pair.substring(0, pair.indexOf("_"));
        } else {
          return pair;
        }
      });

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
            ? ecoStore.bestAsk > 0
            : ecoStore.bestBid > 0
          : true
      );
      const buttonText = computed(() =>
        orderAvailability.value
          ? (props.orderType === "buy" ? t("Buy") : t("Sell")) +
            " " +
            ecoStore.market.currency
          : props.orderType === "buy"
          ? "No Asks Founds"
          : "No Bids Found"
      );

      const submitForm = () => {
        if (props.formType === "market") {
          if (props.orderType === "buy") {
            ecoStore.executeTrade("BUY", "market", null, amount.value);
          } else {
            ecoStore.executeTrade("SELL", "market", null, amount.value);
          }
        } else if (props.formType === "limit") {
          if (props.orderType === "buy") {
            ecoStore.executeTrade("BUY", "limit", price.value, amount.value);
          } else {
            ecoStore.executeTrade("SELL", "limit", price.value, amount.value);
          }
        }
      };

      const calculateTotalAmount = (amount, percent) => {
        const priceTotal =
          props.formType === "market" ? bestPrice.value : price.value;

        const feeMultiplier =
          (props.orderType === "buy"
            ? ecoStore.market.taker
            : ecoStore.market.maker) / 100;
        const totalAmount = (amount * (percent / 100)) / priceTotal;
        const fee = totalAmount * feeMultiplier;
        return parseFloat(totalAmount - fee).toFixed(precisionAmount.value);
      };

      watch(amount, () => {
        calculateTotal();
      });

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
        if (ecoStore.loading) return;
        if (!ecoStore.market.currency && !ecoStore.market.pair) {
          $toast.error(
            `Create ${
              props.orderType === "buy"
                ? ecoStore.market.pair
                : ecoStore.market.currency
            } Wallet First`
          );
          return;
        }
        if (!ecoStore.bestBid && !ecoStore.bestAsk) {
          $toast.error("Waiting For Orderbook...");
          return;
        }

        const walletBalanceCurrency = parseFloat(ecoStore.walletCurrency);
        const walletBalanceSymbol = parseFloat(ecoStore.walletSymbol);

        if (price.value === 0) {
          price.value = bestPrice.value;
        }
        if (props.orderType === "buy") {
          total.value = parseFloat(
            (walletBalanceCurrency * percent) / 100
          ).toFixed(precisionAmount.value);
          const totalWithoutFee =
            total.value / (1 + ecoStore.market.taker / 100);
          amount.value = parseFloat(
            totalWithoutFee /
              (props.formType === "market" ? bestPrice.value : price.value)
          ).toFixed(precisionAmount.value);
        } else {
          amount.value = parseFloat(
            (walletBalanceSymbol * percent) / 100
          ).toFixed(precisionAmount.value);
          const totalWithoutFee =
            amount.value *
            (props.formType === "market" ? bestPrice.value : price.value);
          total.value = parseFloat(
            totalWithoutFee * (1 - ecoStore.market.maker / 100)
          ).toFixed(precisionAmount.value);
        }

        calculateTotal();
      };

      const calculateTotal = () => {
        if (ecoStore.loading) return;
        let wallet, symbol, fee;
        if (props.orderType === "buy") {
          wallet = ecoStore.walletCurrency;
          symbol = ecoStore.walletSymbol;
          fee = ecoStore.market.taker;
        } else {
          wallet = ecoStore.walletSymbol;
          symbol = ecoStore.walletCurrency;
          fee = ecoStore.market.maker;
        }

        if (wallet === null) {
          $toast.error("Create " + symbol + " Wallet First");
          return;
        }

        if (props.formType === "market" && ecoStore.bestBid === null) {
          $toast.error("No spot price detected, Make a limit order first");
          return;
        }

        const currentPrice =
          props.formType === "market" || price.value === 0
            ? bestPrice.value
            : price.value;
        const orderAmount = amount.value * currentPrice;
        const totalWithFees = calculateTotalWithFees(orderAmount, fee);

        if (wallet < totalWithFees) {
          $toast.error(
            "Order price higher than your " + symbol + " wallet balance"
          );
          return;
        }

        total.value = totalWithFees.toFixed(precisionAmount.value);
      };

      const bestPrice = computed(
        () => ecoStore[props.orderType === "buy" ? "bestAsk" : "bestBid"]
      );

      const getBestPrice = () => {
        const priceToSet =
          props.orderType === "buy"
            ? ecoStore.bestAsk || ecoStore.bestBid
            : ecoStore.bestBid || ecoStore.bestAsk;
        price.value = priceToSet;
        calculateTotal();
      };

      return {
        ecoStore,
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
        maxAmount,
        precisionAmount,
        amount,
        total,
        price,
        currencyName,
        pairName,
        getBestPrice,
      };
    },
  };
</script>
