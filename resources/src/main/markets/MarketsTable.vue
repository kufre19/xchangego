<template>
  <div class="card relative overflow-x-auto">
    <VTable
      v-if="list.length > 0"
      :key="list.length"
      v-model:current-page="currentPage"
      class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
      :data="list"
      :filters="filters"
      :page-size="10"
      :hide-sort-icons="true"
      @totalPagesChanged="totalPages = $event"
    >
      <template #head>
        <tr
          class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          <VTh
            sort-key="symbol"
            scope="col"
            class="px-6 py-3"
            style="width: 15%;"
          >
            <Col text="Symbol" />
          </VTh>
          <VTh
            sort-key="price"
            scope="col"
            class="px-6 py-3"
            style="width: 20%;"
          >
            <Col text="Price" />
          </VTh>
          <VTh
            sort-key="change"
            scope="col"
            class="px-6 py-3"
            style="width: 25%;"
          >
            <Col text="Change" />
          </VTh>
          <th scope="col" class="px-6 py-3"></th>
          <VTh
            sort-key="baseVolume"
            scope="col"
            class="px-6 py-3"
            style="width: 25%;"
          >
            <Col text="Volume" />
          </VTh>
          <VTh
            sort-key="action"
            scope="col"
            class="px-6 py-3"
            style="width: 15%;"
          >
            <Col text="Action" />
          </VTh>
        </tr>
      </template>
      <template #body="{ rows }">
        <template v-if="list.length > 0">
          <tr
            v-for="row in rows"
            :key="row.id"
            class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <td data-label="Symbol" class="flex items-center px-6 py-4">
              <div class="tokenicon-wrap">
                <img
                  v-lazy="
                    row.base
                      ? '/assets/images/cryptoCurrency/' +
                        row.base.toLowerCase() +
                        '.png'
                      : '/market/notification.png'
                  "
                  class="tokenicon-image"
                />
              </div>
              <span class="font-medium">{{ row.symbol }}</span>
            </td>
            <td data-label="price">
              <span class="text-start" :class="row.class || ''">{{
                priceFormatter(row.price) || ""
              }}</span>
              USDT
            </td>
            <td>
              <div class="well">
                <section
                  :class="{
                    transparent: !row.history,
                  }"
                >
                  <svg
                    :class="row.class"
                    :viewBox="svgBox"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <LineChartList
                      :values="points(width, height, history[row.symbol])"
                    ></LineChartList>
                  </svg>
                </section>
              </div>
            </td>
            <td data-label="change">
              <span class="mr-1 text-start" :class="row.classChange || ''"
                >{{ priceFormatter(row.change, 2) || "" }}%</span
              >
            </td>
            <td data-label="volume">
              <div class="mr-1 text-start">
                {{ priceFormatter(row.baseVolume, 2) || "" }}
                {{ row.currency }}
              </div>
              <div class="mr-1 text-start">
                {{ priceFormatter(row.quoteVolume, 2) || "" }}
                {{ row.pair }}
              </div>
            </td>

            <td class="px-6 py-3" style="width: 20%;" data-label="Action">
              <router-link class="" :to="'trade/' + row.symbol"
                ><button class="btn btn-outline-primary">
                  {{ $t("Trade") }}
                </button>
              </router-link>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr
            scope="row"
            class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <td colspan="100%" class="px-6 py-4">
              {{ $t("No results found!") }}
            </td>
          </tr>
        </template>
      </template>
    </VTable>
  </div>

  <VTPagination
    v-model:currentPage="currentPage"
    class="float-right flex items-center justify-between pt-4"
    aria-label="Table navigation"
    :total-pages="totalPages"
    :max-page-links="3"
    :boundary-links="true"
  >
    <template #firstPage> {{ $t("First") }} </template>

    <template #lastPage> {{ $t("Last") }} </template>

    <template #next
      ><span class="sr-only">{{ $t("Next") }}</span>
      <svg
        class="h-5 w-5"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </template>

    <template #previous>
      <span class="sr-only">{{ $t("Previous") }}</span>
      <svg
        class="h-5 w-5"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </template>
  </VTPagination>
</template>
<script>
  import LineChartList from "@/partials/LineChart.vue";
  import Col from "@/partials/table/Col.vue";
  export default {
    components: {
      LineChartList,
      Col,
    },
    props: {
      list: {
        type: Array,
        required: true,
      },
      filters: {
        type: Object,
        default: () => ({}),
      },
    },
    created() {
      console.log(this.list);
    },
    data() {
      return {
        currentPage: 1,
        totalPages: 1,
        cx: 0,
        cy: 0,
        width: 200,
        height: 28,
      };
    },
    computed: {
      svgBox() {
        return "0 0 " + this.width + " " + this.height;
      },
    },
    methods: {
      priceFormatter(p, f1 = 8, f2 = 2, d = ",") {
        if (p == null || isNaN(p)) {
          return 0;
        }

        p =
          parseInt(p) !== 0
            ? parseFloat(p).toFixed(f2)
            : parseFloat(p).toFixed(f1);
        p =
          parseInt(p) !== 0
            ? p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, d)
            : p;
        return p;
      },
      points(width, height, values) {
        width = parseFloat(width) || 0;
        height = parseFloat(height) || 0;
        values = Array.isArray(values) ? values : [];
        values = values.map((n) => parseFloat(n) || 0);

        let min = values.reduce(
          (min, val) => (val < min ? val : min),
          values[0]
        );
        let max = values.reduce(
          (max, val) => (val > max ? val : max),
          values[0]
        );
        let len = values.length;
        let half = height / 2;
        let range = max > min ? max - min : height;
        let gap = len > 1 ? width / (len - 1) : 1;
        let out = [];

        for (let i = 0; i < len; ++i) {
          let d = values[i];
          let val = 2 * ((d - min) / range - 0.5);
          let x = i * gap;
          let y = -val * half * 0.8 + half;
          out.push({ x, y });
        }
        return out;
      },
    },
  };
</script>
<style lang=""></style>
