<template>
  <span class="text-success bg-dark mr-2 rounded px-2 py-1 shadow">
    <i style="margin-right: 0 !important;" :class="iconClass"></i>
  </span>
</template>

<script>
  export default {
    props: {
      bvLog: {
        type: Object,
        required: true,
      },
    },
    computed: {
      iconClass() {
        const typeToIcon = {
          1: "bi-cash",
          2: "bi-node-plus",
          3: "bi-award",
          4: "bi-currency-exchange",
          5: "bi-robot",
          6: "bi-coin",
          7: "bi-bar-chart",
          8: "bi-bar-chart",
          9: "bi-layers",
          10: "bi-person-lines-fill",
          11: "bi-download",
          12: "bi-upload",
        };
        return typeToIcon[this.bvLog.type] || "";
      },
    },
  };
</script>
