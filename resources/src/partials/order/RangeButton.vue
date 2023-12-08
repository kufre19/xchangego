<template>
  <button
    class="order-btn"
    type="button"
    :class="{
      'bg-gray-900 dark:bg-gray-50': range >= percentage,
      'bg-gray-300 dark:bg-gray-500': range < percentage,
    }"
    @click.prevent="calculate()"
  ></button>
</template>

<script>
  export default {
    props: {
      range: [Number, String],
      percentage: Number,
      calculatePercentage: Function,
    },
    emits: ["calculate"],
    methods: {
      calculate() {
        this.$emit("calculate", this.percentage);
      },
    },
  };
</script>
