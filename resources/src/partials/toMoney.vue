<template>
  <span class="mr-1">{{ number }}</span>
</template>

<script>
  // component
  export default {
    props: {
      num: {
        type: [Number, String],
        required: true,
      },
      decimals: {
        type: [Number, String],
      },
    },
    computed: {
      number() {
        return this.money(this.num, this.decimals || 0);
      },
    },
    methods: {
      money(num, fixed) {
        num = parseFloat(num) || 0;
        fixed = Math.abs(parseInt(fixed)) || 0;

        // Validate the fixed value
        if (fixed < 0 || fixed > 20) {
          fixed = 0; // Set a default value or handle the error case
        }

        return num.toLocaleString("en-US", {
          minimumFractionDigits: fixed,
          maximumFractionDigits: fixed,
        });
      },
    },
  };
</script>
