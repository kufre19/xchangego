<template>
  <div>
    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        id="myTab"
        class="-mb-px flex flex-wrap text-center text-sm font-medium"
        data-tabs-toggle="#myTabContent"
        role="tablist"
      >
        <li class="mr-2" role="presentation">
          <button
            id="practice-tab"
            class="inline-block rounded-t-lg border-b-2 p-4"
            data-tabs-target="#practice"
            type="button"
            role="tab"
            aria-controls="practice"
            aria-selected="false"
            :class="
              isActive('practice')
                ? 'text-gray-900 dark:text-gray-300'
                : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
            "
            href="#practice"
            @click.prevent="setActive('practice')"
          >
            <div class="flex">
              <svg
                aria-hidden="true"
                class="mr-2 h-5 w-5"
                :class="
                  isActive('practice')
                    ? 'text-blue-600 dark:text-blue-500'
                    : ' text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
                "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
              {{ $t("Binary Practice") }}
            </div>
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            id="trading-tab"
            class="inline-block rounded-t-lg border-b-2 p-4"
            data-tabs-target="#trading"
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
                aria-hidden="true"
                :class="
                  isActive('trading')
                    ? 'text-blue-600 dark:text-blue-500'
                    : ' text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
                "
                class="mr-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path
                  fill-rule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clip-rule="evenodd"
                ></path>
              </svg>

              {{ $t("Binary Trading") }}
            </div>
          </button>
        </li>
      </ul>
    </div>
    <div id="myTabContent">
      <div
        v-if="activeItem === 'practice'"
        id="practice"
        class="rounded-lg"
        role="tabpanel"
        aria-labelledby="practice-tab"
      >
        <div
          class="grid grid-cols-3 gap-5 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          <BinaryWelcomeCard
            :symbol="symbol"
            :firstname="userStore.user ? userStore.user.firstname : ''"
            :amount="binaryStore.trade.practice_Won"
            :title="$t('Start Practicing')"
            route="/binary/practice/BTC/USDT"
          ></BinaryWelcomeCard>

          <BinaryEarningsCard
            :trade-won-last-week="
              binaryStore.perc ? binaryStore.perc.tradeWon_last_week : 0
            "
            :symbol="symbol"
            :total-trades="binaryStore.practice_totaltrades"
          />
          <BinaryPracticeBalanceCard :symbol="symbol" :user-store="userStore" />

          <StatisticGrid
            :win="binaryStore.trade ? binaryStore.trade.practice_Win : 0"
            :lose="binaryStore.trade ? binaryStore.trade.practice_Lose : 0"
            :log="binaryStore.trade ? binaryStore.trade.practice_Log : 0"
            :draw="binaryStore.trade ? binaryStore.trade.practice_Draw : 0"
          />

          <TransactionCard :title="$t('Practice Contracts')">
            <template #content>
              <TransactionItem :logs="binaryStore.practicelogs">
                <template #default="{ log }">
                  <div class="flex items-center justify-start">
                    <div class="bg-dark mr-1 rounded py-1 px-2 font-medium">
                      <span v-if="log.hilow == 1" class="text-success"
                        ><i class="bi bi-graph-up-arrow"></i
                      ></span>
                      <span
                        v-else-if="log.hilow == 2"
                        class="text-danger font-medium"
                        ><i class="bi bi-graph-down-arrow"></i
                      ></span>
                    </div>
                    <div>
                      <span
                        v-if="log.hilow == 1"
                        class="text-success font-medium"
                        >{{ $t("Rise") }}</span
                      >
                      <span
                        v-if="log.hilow == 2"
                        class="text-danger font-medium"
                        >{{ $t("Fall") }}</span
                      >
                      <div class="text-xs">
                        {{ log.symbol }} /
                        {{ log.pair }}
                      </div>
                    </div>
                  </div>
                  <div class="font-medium">
                    <span v-if="log.result == 1" class="badge bg-success"
                      >+<toMoney
                        :num="log.amount * (gnl.profit / 100)"
                        decimals="2"
                      />
                      {{ log.pair }}</span
                    >
                    <span v-else-if="log.result == 2" class="badge bg-danger"
                      >-<toMoney :num="log.amount" decimals="2" />
                      {{ log.pair }}</span
                    >
                    <span
                      v-else-if="log.result == 3"
                      class="badge bg-warning"
                      >{{ $t("Draw") }}</span
                    >
                    <span v-else class="badge bg-warning">{{
                      $t("Pending")
                    }}</span>
                  </div>
                </template>
              </TransactionItem>
            </template>
          </TransactionCard>

          <Refer
            v-if="ext.mlm == 1"
            :pathname="pathname"
            :reward="
              plat.mlm.unilevel_upline1_percentage
                ? plat.mlm.unilevel_upline1_percentage
                : 5
            "
          />
        </div>
      </div>
      <div
        v-if="activeItem === 'trading'"
        id="trading"
        class="rounded-lg"
        aria-labelledby="trading-tab"
        role="tabpanel"
      >
        <div
          class="grid grid-cols-3 gap-5 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          <BinaryWelcomeCard
            :symbol="symbol"
            :firstname="userStore.user ? userStore.user.firstname : ''"
            :amount="binaryStore.trade.Won"
            :title="$t('Start Trading')"
            route="/binary/trade/BTC/USDT"
          ></BinaryWelcomeCard>
          <BinaryEarningsCard
            :trade-won-last-week="
              binaryStore.perc ? binaryStore.perc.tradeWon_last_week : 0
            "
            :symbol="symbol"
            :total-trades="binaryStore.totaltrades"
          />
          <div class="card" style="background-color: #000000;">
            <div
              class="card-body h-full"
              style="
                background: url('/assets/gif/rotating.gif');
                background-position: right;
                background-repeat: no-repeat;
              "
            >
              <h4 class="card-title">
                <div class="title-gradient">
                  {{ $t("Balance") }}
                </div>
              </h4>
              <div class="flex justify-between">
                <div class="h2 text-success mb-1">
                  <toMoney :num="binaryStore.funding_wallets" decimals="2" />
                  {{ symbol }}
                </div>
              </div>
              <div class="mt-1 flex">
                <router-link to="/wallets" class="btn btn-outline-success"
                  >+ {{ $t("Deposit") }}</router-link
                >
              </div>
            </div>
          </div>

          <StatisticGrid
            :win="binaryStore.trade ? binaryStore.trade.Win : 0"
            :lose="binaryStore.trade ? binaryStore.trade.Lose : 0"
            :log="binaryStore.trade ? binaryStore.trade.Log : 0"
            :draw="binaryStore.trade ? binaryStore.trade.Draw : 0"
          />

          <TransactionCard :title="$t('Trade Contracts')">
            <template #content>
              <TransactionItem :logs="binaryStore.tradelogs">
                <template #default="{ log }">
                  <div class="flex items-center justify-start">
                    <div class="bg-dark mr-1 rounded py-1 px-2 font-medium">
                      <span v-if="log.hilow == 1" class="text-success"
                        ><i class="bi bi-graph-up-arrow"></i
                      ></span>
                      <span
                        v-else-if="log.hilow == 2"
                        class="text-danger font-medium"
                        ><i class="bi bi-graph-down-arrow"></i
                      ></span>
                    </div>
                    <div>
                      <span
                        v-if="log.hilow == 1"
                        class="text-success font-medium"
                        >{{ $t("Rise") }}</span
                      >
                      <span
                        v-if="log.hilow == 2"
                        class="text-danger font-medium"
                        >{{ $t("Fall") }}</span
                      >
                      <div class="text-xs">
                        {{ log.symbol }} /
                        {{ log.pair }}
                      </div>
                    </div>
                  </div>
                  <div class="font-medium">
                    <span v-if="log.result == 1" class="badge bg-success"
                      >+<toMoney
                        :num="log.amount * (gnl.profit / 100)"
                        decimals="2"
                      />
                      {{ log.pair }}</span
                    >
                    <span v-else-if="log.result == 2" class="badge bg-danger"
                      >-<toMoney :num="log.amount" decimals="2" />
                      {{ log.pair }}</span
                    >
                    <span
                      v-else-if="log.result == 3"
                      class="badge bg-warning"
                      >{{ $t("Draw") }}</span
                    >
                    <span v-else class="badge bg-warning">{{
                      $t("Pending")
                    }}</span>
                  </div>
                </template>
              </TransactionItem>
            </template>
          </TransactionCard>
          <template v-if="plat.kyc.kyc_status == 1">
            <KYC />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineAsyncComponent } from "vue";
  import toMoney from "@/partials/toMoney.vue";
  import { useBinaryStore } from "@/store/binary";
  import { useUserStore } from "@/store/user";

  const BinaryWelcomeCard = defineAsyncComponent(() =>
    import("./components/cards/BinaryWelcomeCard.vue")
  );
  const BinaryEarningsCard = defineAsyncComponent(() =>
    import("./components/cards/BinaryEarningsCard.vue")
  );
  const BinaryPracticeBalanceCard = defineAsyncComponent(() =>
    import("./components/cards/BinaryPracticeBalanceCard.vue")
  );
  const StatisticGrid = defineAsyncComponent(() =>
    import("./components/grids/StatisticGrid.vue")
  );
  const TransactionCard = defineAsyncComponent(() =>
    import("@/partials/TransactionCard.vue")
  );
  const TransactionItem = defineAsyncComponent(() =>
    import("@/partials/TransactionItem.vue")
  );
  const KYC = defineAsyncComponent(() => import("@/partials/KYC.vue"));
  const Refer = defineAsyncComponent(() => import("@/partials/Refer.vue"));

  export default {
    components: {
      Refer,
      KYC,
      toMoney,
      BinaryWelcomeCard,
      BinaryEarningsCard,
      BinaryPracticeBalanceCard,
      StatisticGrid,
      TransactionCard,
      TransactionItem,
    },
    setup() {
      const userStore = useUserStore();
      const binaryStore = useBinaryStore();
      return { userStore, binaryStore };
    },

    // component data
    data() {
      return {
        plat: plat,
        ext: ext,
        gnl: gnl,
        pathname: window.location.protocol + "//" + window.location.hostname,
        symbol: "USD",
        activeItem: "practice",
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      isActive(menuItem) {
        return this.activeItem === menuItem;
      },
      setActive(menuItem) {
        this.activeItem = menuItem;
      },
      async fetchData() {
        if (this.binaryStore.tradelogs.length == 0) {
          await this.binaryStore.fetch();
        }
      },
    },
  };
</script>
