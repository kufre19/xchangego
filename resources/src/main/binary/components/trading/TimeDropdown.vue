<template>
  <button
    class="inline-flex flex-shrink-0 items-center rounded-r-md border border-gray-300 bg-gray-100 p-2 text-center text-xs text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
    type="button"
    :aria-expanded="dropdownVisible"
    @click="toggleDropdown"
  >
    {{ OrderTimeUnit }}
    <svg
      class="ml-2 h-4 w-4"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  </button>
  <div
    :class="dropdownVisible ? 'block' : 'hidden'"
    class="absolute z-10 left-0 mt-1 w-44 divide-y divide-gray-100 rounded bg-white shadow dark:bg-gray-700"
  >
    <ul
      v-if="limit != null"
      :key="limit.max_time_hour"
      class="py-1 text-xs text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownDefaultButton"
    >
      <li>
        <a
          class="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          @click="SetOrderTime('Sec', limit.min_time_sec, limit.max_time_sec)"
          >{{ $t("Sec") }}</a
        >
      </li>
      <li>
        <a
          value="min"
          class="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          @click="SetOrderTime('Min', limit.min_time_min, limit.max_time_min)"
          >{{ $t("Min") }}</a
        >
      </li>
      <li>
        <a
          value="hour"
          class="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          @click="
            SetOrderTime('Hour', limit.min_time_hour, limit.max_time_hour)
          "
          >{{ $t("Hour") }}</a
        >
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "TimeDropdown",
    props: {
      limit: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        OrderTimeUnit: "Sec",
        dropdownVisible: false,
      };
    },
    emits: ["SetOrderTime"],
    methods: {
      toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible;
      },
      SetOrderTime(unit, min, max) {
        this.OrderTimeUnit = unit;
        this.$emit("SetOrderTime", unit, min, max);
        // You can add additional logic here to handle the time range (min, max) if needed
        this.toggleDropdown();
      },
    },
  };
</script>
