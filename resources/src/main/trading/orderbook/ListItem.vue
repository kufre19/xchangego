<template>
  <template v-for="(item, index) in items">
    <tr v-if="items && items.length > 0 && index <= limit" :key="index">
      <td
        class="tdd price"
        :class="
          parseFloat(item[1]) > 0
            ? type === 'bid'
              ? 'text-green-400'
              : 'text-red-500'
            : 'text-gray-300 dark:text-gray-500'
        "
      >
        <span>{{ item[0] }}</span>
      </td>
      <td
        class="tdd quantity if-sm"
        :class="
          parseFloat(item[1]) > 0
            ? 'text-dark'
            : 'text-gray-300 dark:text-gray-500'
        "
      >
        <span>{{ item[1] }}</span>
      </td>
      <td
        class="tdd btc"
        :class="
          parseFloat(item[2]) > 0
            ? 'text-dark'
            : 'text-gray-300 dark:text-gray-500'
        "
      >
        <span
          >{{ item[2] }}
          <div
            :class="'percent_' + type"
            :style="'width:' + item[3] + 'px'"
          ></div
        ></span>
      </td>
    </tr>
  </template>
</template>
<script>
  export default {
    name: ["ListItem"],
    props: {
      data: {
        type: Array,
        default: () => [],
      },
      type: {
        type: String,
        default: "",
      },
      showLess: {
        type: Boolean,
        default: false,
      },
      limit: {
        type: Number,
        default: 0,
      },
      width: {
        type: String,
        default: "",
      },
    },
    computed: {
      items() {
        return this.showLess ? this.data.slice(0, this.limit) : this.data;
      },
    },
  };
</script>
