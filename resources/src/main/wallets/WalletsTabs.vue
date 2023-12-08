<template>
  <div
    class="border-b border-gray-200 dark:border-gray-700"
    style="margin: 0 -20px 16px -20px;"
  >
    <ul
      id="myTab"
      class="-mb-px flex flex-wrap text-center text-sm font-medium"
      role="tablist"
    >
      <li v-if="ext.eco == 1" class="mr-2" role="presentation">
        <button
          id="main-tab"
          class="inline-block rounded-t-lg border-b-2 p-4"
          type="button"
          role="tab"
          aria-controls="main"
          aria-selected="false"
          :class="
            isActive('main')
              ? 'text-gray-900 dark:text-gray-300'
              : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
          "
          href="#main"
          @click.prevent="setActive('main')"
        >
          <div class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-2 h-5 w-5"
              :class="
                isActive('main')
                  ? 'text-blue-600 dark:text-blue-500'
                  : ' text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
              "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
              />
            </svg>
            <span class="mr-2">{{ $t("Primary") }}</span>
          </div>
        </button>
      </li>

      <li
        v-if="plat.eco.ecosystem_trading_only != 1 && tradingWallet == 1"
        class="mr-2"
        role="presentation"
      >
        <button
          id="trading-tab"
          class="inline-block rounded-t-lg border-b-2 p-4"
          type="button"
          role="tab"
          aria-controls="trading"
          aria-selected="false"
          :class="
            isActive('trading')
              ? 'text-gray-900 dark:text-gray-300'
              : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
          "
          href="#trading"
          @click.prevent="setActive('trading')"
        >
          <div class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-2 h-5 w-5"
              :class="
                isActive('trading')
                  ? 'text-blue-600 dark:text-blue-500'
                  : ' text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
              "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
              />
            </svg>
            <span class="mr-2">{{ $t("Trading") }}</span>
          </div>
        </button>
      </li>

      <li
        v-if="
          plat.eco.ecosystem_trading_only != 1 &&
          tradingWallet == 1 &&
          ext.futures == 1
        "
        class="mr-2"
        role="presentation"
      >
        <button
          id="futures-tab"
          class="inline-block rounded-t-lg border-b-2 p-4"
          type="button"
          role="tab"
          aria-controls="futures"
          aria-selected="false"
          :class="
            isActive('futures')
              ? 'text-gray-900 dark:text-gray-300'
              : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
          "
          href="#futures"
          @click.prevent="setActive('futures')"
        >
          <div class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-2 h-5 w-5"
              :class="
                isActive('futures')
                  ? 'text-blue-600 dark:text-blue-500'
                  : ' text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
              "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
              />
            </svg>

            <span class="mr-2">{{ $t("Futures") }}</span>
          </div>
        </button>
      </li>

      <li class="mr-2" role="presentation">
        <button
          id="funding-tab"
          class="inline-block rounded-t-lg border-b-2 p-4"
          type="button"
          role="tab"
          aria-controls="funding"
          aria-selected="false"
          :class="
            isActive('funding')
              ? 'text-gray-900 dark:text-gray-300'
              : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
          "
          href="#funding"
          @click.prevent="setActive('funding')"
        >
          <div class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-2 h-5 w-5"
              :class="
                isActive('funding')
                  ? 'text-blue-600 dark:text-blue-500'
                  : ' text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
              "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <span class="mr-2">{{ $t("Funding") }}</span>
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      walletsStore: {
        type: Object,
        required: true,
      },
      activeTab: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        tradingWallet: tradingWallet,
        ext: ext,
        plat: plat,
      };
    },
    emits: ["tab-changed"],
    methods: {
      setActive(tab) {
        this.$emit("tab-changed", tab);
      },
      isActive(tab) {
        return this.activeTab === tab;
      },
    },
  };
</script>
