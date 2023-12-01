<template>
  <div
    v-if="icoStore.ico != null"
    class="grid grid-cols-3 gap-5 xs:grid-cols-1 md:grid-cols-3"
  >
    <div class="card xs:col-span-1 md:col-span-2">
      <div>
        <div class="flex justify-between p-5">
          <div class="flex items-center justify-start">
            <img
              v-lazy="
                icoStore.ico.icon
                  ? '/assets/images/ico/' + icoStore.ico.icon
                  : '/market/notification.png'
              "
              class="mr-2 rounded-full"
              height="48"
              width="48"
              style="filter: grayscale(0);"
            />
            <span class="ms-1">
              <h1 v-if="icoStore.ico.name != null">
                {{ icoStore.ico.name }}
              </h1>
            </span>
          </div>
          <div :key="icoStore.ico.status">
            <span v-if="icoStore.ico.status == 0" class="badge bg-warning">{{
              $t("Upcoming")
            }}</span>
            <span
              v-else-if="icoStore.ico.status == 1"
              class="badge bg-success"
              >{{ $t("Sale Live") }}</span
            >
            <span
              v-else-if="icoStore.ico.status == 2"
              class="badge bg-danger"
              >{{ $t("Sale Ended") }}</span
            >
            <span
              v-else-if="icoStore.ico.status == 3"
              class="badge bg-secondary"
              >{{ $t("Canceled") }}</span
            >
          </div>
        </div>
        <div v-if="icoStore.ico.desc != null" class="my-1 border-b p-5">
          {{ icoStore.ico.desc }}
        </div>
      </div>
      <div class="relative overflow-x-auto">
        <table
          class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        >
          <tbody>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Presale Address") }}
              </th>
              <td class="py-2 px-6 text-right">
                <a
                  :href="icoStore.ico.presale_address"
                  target="_blank"
                  rel="noreferrer nofollow"
                  >{{ icoStore.ico.address }}</a
                >
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Token Name") }}
              </th>
              <td class="py-2 px-6 text-right">
                {{ icoStore.ico.name }}
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Token Symbol") }}
              </th>
              <td class="py-2 px-6 text-right">
                {{ icoStore.ico.symbol }}
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Token Decimals") }}
              </th>
              <td class="py-2 px-6 text-right">
                {{ icoStore.ico.decimals }}
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Token Address") }}
              </th>
              <td class="py-2 px-6 text-right">
                <a
                  class="mr-1"
                  :href="icoStore.ico.address"
                  target="_blank"
                  rel="noreferrer nofollow"
                  >{{ icoStore.ico.address }}</a
                ><br />
                <p class="help is-info">
                  ({{ $t("Do not send") }}
                  {{ icoStore.ico.network_symbol }}
                  {{ $t("to the token address") }}!)
                </p>
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Total Supply") }}
              </th>
              <td class="py-2 px-6 text-right">
                <toMoney :num="icoStore.ico.total_supply" decimals="2" />
                {{ icoStore.ico.symbol }}
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Tokens For Presale") }}
              </th>
              <td class="py-2 px-6 text-right">
                <toMoney :num="icoStore.ico.presale_supply" decimals="2" />
                {{ icoStore.ico.symbol }}
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Tokens For Liquidity") }}
              </th>
              <td class="py-2 px-6 text-right">
                <toMoney :num="icoStore.ico.liquidity_supply" decimals="2" />
                {{ icoStore.ico.symbol }}
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Initial Market Cap (estimate)") }}
              </th>
              <td class="py-2 px-6 text-right">
                <toMoney :num="icoStore.ico.initial_cap" decimals="2" />
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Soft Cap") }}
              </th>
              <td class="py-2 px-6 text-right">
                <toMoney
                  :num="icoStore.ico.soft_cap / icoStore.ico.rate"
                  decimals="2"
                />
                {{ icoStore.ico.network_symbol }}
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Max Owner Receive") }}
              </th>
              <td class="py-2 px-6 text-right">
                <toMoney :num="icoStore.ico.owner_max" decimals="2" />
                {{ icoStore.ico.network_symbol }}<br />
                <div
                  :key="icoStore.ico.owner_recieved / icoStore.ico.rate"
                  class="has-text-info is-size-7"
                >
                  ({{ $t("Current") }}:
                  <toMoney
                    :num="icoStore.ico.owner_recieved / icoStore.ico.rate"
                    decimals="4"
                  />
                  {{ icoStore.ico.network_symbol }})
                </div>
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Presale Start Time") }}
              </th>
              <td class="py-2 px-6 text-right">
                <toDate :time="icoStore.ico.soft_start" :full="true" />
                (UTC)
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Presale End Time") }}
              </th>
              <td class="py-2 px-6 text-right">
                <toDate :time="icoStore.ico.soft_end" :full="true" />
                (UTC)
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Liquidity Percent") }}
              </th>
              <td class="py-2 px-6 text-right">
                {{ icoStore.ico.liquidity_percent }}%
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Liquidity Lockup Time") }}
              </th>
              <td class="py-2 px-6 text-right">
                {{ icoStore.ico.lockup }}
                {{ $t("days after pool ends") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="xs:col-span-1 md:col-span-1">
      <div class="card rounded-lg">
        <table
          class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        >
          <tbody>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Status") }}
              </th>
              <td :key="icoStore.ico.status" class="py-2 px-6 text-right">
                <span v-if="icoStore.ico.status == 0" class="text-warning">{{
                  $t("Upcoming")
                }}</span>
                <span
                  v-else-if="icoStore.ico.status == 1"
                  class="text-success"
                  >{{ $t("In Progress") }}</span
                >
                <span
                  v-else-if="icoStore.ico.status == 2"
                  class="text-danger"
                  >{{ $t("Sale Ended") }}</span
                >
                <span
                  v-else-if="icoStore.ico.status == 3"
                  class="text-secondary"
                  >{{ $t("Canceled") }}</span
                >
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Current Rate") }}
              </th>
              <td class="py-2 px-6 text-right text-xs">
                <toMoney
                  :num="1 / icoStore.ico.rate"
                  :decimals="
                    icoStore?.ico?.rate
                      ? countDecimals(Number(1 / icoStore.ico.rate))
                      : 2
                  "
                />
                {{ icoStore.ico.network_symbol }}
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="whitespace-nowrap py-2 px-6 font-medium text-gray-900 dark:text-white"
              >
                {{ $t("Total Contributors") }}
              </th>
              <td :key="icoStore.ico.contributors" class="py-2 px-6 text-right">
                {{ icoStore.ico.contributors }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <div class="card">
        <div class="card-body">
          <div v-if="icoStore.ico.stage != null" class="my-1 text-center mb-5">
            <template v-if="icoStore.ico.type == 1">
              <div class="bg-gray-200 rounded py-5 px-2">
                <Countdown
                  v-if="icoStore.ico.stage == 0"
                  main-flip-background-color="#f8fafc"
                  second-flip-background-color="#f1f5f9"
                  label-size="12px"
                  countdown-size="24px"
                  class="mt-1"
                  :deadline="icoStore.ico.soft_start"
                ></Countdown>
                <Countdown
                  v-else-if="icoStore.ico.stage == 1"
                  main-flip-background-color="#f8fafc"
                  second-flip-background-color="#f1f5f9"
                  label-size="12px"
                  countdown-size="24px"
                  class="mt-1"
                  :deadline="icoStore.ico.soft_end"
                ></Countdown>
              </div>
            </template>
            <template v-else-if="icoStore.ico.type == 2">
              <div class="bg-gray-200 rounded py-5 px-2">
                <Countdown
                  v-if="icoStore.ico.stage == 0"
                  main-flip-background-color="#f8fafc"
                  second-flip-background-color="#f1f5f9"
                  label-size="12px"
                  countdown-size="24px"
                  class="mt-1"
                  :deadline="icoStore.ico.soft_start"
                ></Countdown>
                <Countdown
                  v-else-if="icoStore.ico.stage == 1"
                  main-flip-background-color="#f8fafc"
                  second-flip-background-color="#f1f5f9"
                  label-size="12px"
                  countdown-size="24px"
                  class="mt-1"
                  :deadline="icoStore.ico.soft_end"
                ></Countdown>
                <Countdown
                  v-else-if="icoStore.ico.stage == 2"
                  main-flip-background-color="#f8fafc"
                  second-flip-background-color="#f1f5f9"
                  label-size="12px"
                  countdown-size="24px"
                  :deadline="icoStore.ico.hard_end"
                ></Countdown>
              </div>
            </template>
          </div>
          <div :key="icoStore.ico.soft_raised" class="mb-1">
            <p class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {{ $t("Progress") }} (<span class="text-success">
                <toMoney
                  :num="
                    (icoStore.ico.soft_raised / icoStore.ico.soft_cap) * 100
                  "
                  decimals="2"
                />%</span
              >)
            </p>
            <span class="mb-1">
              <Progress
                :progress="
                  (icoStore.ico.soft_raised / icoStore.ico.soft_cap).toFixed(
                    2
                  ) *
                    100 <
                  100
                    ? (
                        icoStore.ico.soft_raised / icoStore.ico.soft_cap
                      ).toFixed(2) * 100
                    : 100
                "
              ></Progress>
            </span>
            <small class="flex justify-between">
              <span :key="icoStore.ico.soft_raised">
                <toMoney :num="icoStore.ico.soft_raised" decimals="2" />
                {{ icoStore.ico.symbol }}</span
              >
              <span>
                <toMoney :num="icoStore.ico.soft_cap" decimals="2" />
                {{ icoStore.ico.symbol }}</span
              >
            </small>
          </div>

          <label
            for="amount"
            class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >{{ $t("Recieving Wallet") }}</label
          >

          <div class="relative mb-2">
            <input
              v-model="icoStore.rec_wallet"
              type="text"
              name="rec_wallet"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Add your recieving wallet"
            />
            <button
              :disabled="icoStore.loading"
              type="submit"
              class="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="change_rec_wallet()"
            >
              {{ $t("Save") }}
            </button>
          </div>
          <label
            for="amount"
            class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >{{ $t("Amount") }}</label
          >

          <div class="mb-1 w-auto">
            <div class="flex">
              <input
                v-model="amount"
                type="number"
                class="block w-full min-w-0 flex-1 rounded-none rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-red-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                name="amount"
                min="0"
                @keyup="costCal()"
              />
              <span
                name="amount"
                class="inline-flex items-center rounded-r-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400"
              >
                {{ icoStore.ico.symbol }}
              </span>
            </div>

            <small
              ><span class="text-warning">Min:</span>
              {{ icoStore.ico.client_min ? icoStore.ico.client_min : 1 }}
              {{ icoStore.ico.symbol }} /
              <span class="text-warning">Max:</span>
              {{ icoStore.ico.client_max }}
              {{ icoStore.ico.symbol }}</small
            >
          </div>

          <label
            for="cost"
            class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >{{ $t("Cost") }}</label
          >

          <div class="mb-3 flex">
            <input
              v-model="cost"
              type="text"
              class="block w-full min-w-0 flex-1 rounded-none rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-red-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              readonly
              disabled
            />
            <span
              class="inline-flex items-center rounded-r-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400"
            >
              {{ icoStore.ico.network_symbol }}
            </span>
          </div>

          <label
            for="balance"
            class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >{{ $t("Balance") }}</label
          >

          <div :key="icoStore.balance">
            <div
              v-if="icoStore.balance != null"
              class="shadow p-3 text-center border rounded-md dark:border-gray-500 w-full text-success"
              disabled
            >
              {{ Number(icoStore.balance).toFixed(2) }}
              {{ icoStore.wallet_symbol }}
            </div>
            <div
              v-else
              class="btn btn-outline-warning mb-1 w-full"
              :disabled="icoStore.loading"
              @click="createWallet()"
            >
              {{ $t("Create") }}
              {{ icoStore.ico.network_symbol }}
              {{ $t("Wallet") }}
            </div>
          </div>
        </div>
        <div
          v-if="icoStore.ico.status == 1"
          class="card-footer flex justify-between"
        >
          <button
            class="w-full btn btn-success"
            :disabled="icoStore.loading"
            @click="purchase()"
          >
            {{ $t("Buy") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Progress } from "flowbite-vue";
  import { Countdown } from "vue3-flip-countdown";
  import toMoney from "../../partials/toMoney.vue";
  import toDate from "../../partials/toDate.vue";
  import { useIcoStore } from "../../store/ico";
  import { useUserStore } from "../../store/user";
  export default {
    components: {
      Countdown,
      toDate,
      toMoney,
      Progress,
    },
    setup() {
      const userStore = useUserStore();
      const icoStore = useIcoStore();
      return { userStore, icoStore };
    },
    data() {
      return {
        amount: 0,
        cost: 0,
        imageLoading: true,
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      countDecimals(num) {
        if (Math.floor(num) === num) return 0;
        const str = num.toString();
        const scientificNotationMatch = /^(\d+\.?\d*|\.\d+)e([\+\-]\d+)$/.exec(
          str
        );
        if (scientificNotationMatch) {
          const decimalStr = scientificNotationMatch[1].split(".")[1] || "";
          const decimalCount =
            decimalStr.length + parseInt(scientificNotationMatch[2]);
          return Math.min(decimalCount, 8);
        } else {
          const decimalStr = str.split(".")[1] || "";
          return Math.min(decimalStr.length, 8);
        }
      },
      async fetchData() {
        if (this.icoStore.ico == null) {
          await this.icoStore.fetch_ico();
        }
      },
      async purchase() {
        await this.icoStore.purchase(this.amount);
      },
      async fetchWallet() {
        await this.icoStore.fetchWallet();
      },
      async createWallet() {
        await this.icoStore.createWallet();
      },
      async change_rec_wallet() {
        await this.icoStore.change_rec_wallet();
      },
      costCal() {
        this.cost = this.amount / this.icoStore.ico.rate;
      },
    },
  };
</script>
