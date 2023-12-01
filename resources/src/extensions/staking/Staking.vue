<template>
  <div>
    <div
      class="card mb-5 bg-black"
      style="background-image: url('/assets/images/staking/bg/banner.gif');"
    >
      <div class="card-body">
        <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-3">
          <div class="col-span-2 xs:col-span-3 md:col-span-2">
            <div
              class="px-2 py-2 text-center text-gray-200 dark:text-gray-200"
              style="background-color: #000000db !important;"
            >
              <h1>{{ $t("Staking") }}</h1>
              <p
                class="dark:text-gray-20 tracking-widest text-gray-200 md:text-lg"
              >
                {{
                  $t("Earn stable profits with professional asset management")
                }}
              </p>
            </div>
          </div>
          <div class="col-span-1 sm:col-span-3 md:col-span-1">
            <div
              class="card shadow"
              style="
                border-top: 6px solid #2dbd96;
                background-color: #000000db !important;
                border-bottom-right-radius: 10px;
                border-bottom-left-radius: 10px;
              "
            >
              <div class="card-body">
                <div
                  class="px-2 py-2 text-center text-gray-500 dark:text-gray-400"
                >
                  <div class="text-gray-200 dark:text-gray-200">
                    <div>{{ $t("Assets") }} (USDT)</div>
                    <div :key="stakingStore.assets">
                      {{ stakingStore.assets }}
                    </div>
                  </div>
                </div>
                <div class="flex justify-between">
                  <div class="text-center text-gray-200 dark:text-gray-200">
                    <div>{{ $t("Yesterday Profit") }} (USDT)</div>
                    <div :key="stakingStore.last_profit">
                      {{ stakingStore.last_profit }}
                    </div>
                  </div>
                  <div class="text-center text-gray-200 dark:text-gray-200">
                    <div>{{ $t("Total Profit") }} (USDT)</div>
                    <div :key="stakingStore.total_profit">
                      {{ stakingStore.total_profit }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer w-full text-center">
                <router-link to="/staking/logs">
                  <i class="bi bi-chevron-right mr-2"></i>
                  <span>{{ $t("View More") }} </span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-5">
      <div
        class="mb-4 items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0"
      >
        <div class="font-medium">{{ $t("Running Contracts") }}</div>
        <Filter>
          <input
            v-model="filters.symbol.value"
            type="text"
            class="filter-input"
            placeholder="Symbol"
        /></Filter>
      </div>
      <div class="card relative overflow-x-auto">
        <VTable
          :key="stakingStore.coins.length"
          v-model:current-page="currentPage"
          class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
          :data="stakingStore.coins"
          :filters="filters"
          :page-size="10"
          :hide-sort-icons="true"
          @totalPagesChanged="totalPages = $event"
        >
          <template #head>
            <tr
              class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
            >
              <VTh sort-key="symbol" scope="col" class="py-3 px-6">
                <Col text="Coin" />
              </VTh>
              <VTh sort-key="profit" scope="col" class="py-3 px-6">
                <Col text="Staking Profit" />
              </VTh>
              <VTh sort-key="duration" scope="col" class="py-3 px-6">
                <Col text="Duration (Days)" />
              </VTh>
              <th sortKey="min_stake" scope="col" class="py-3 px-6">
                {{ $t("Minimum Stake Amount") }}
              </th>
              <th scope="col" class="py-3 px-6"></th>
            </tr>
          </template>
          <template #body="{ rows }">
            <template v-if="stakingStore.coins.length > 0">
              <tr
                v-for="row in rows"
                :key="row.id"
                class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <td class="py-3 px-6" data-label="Coin">
                  <div class="flex items-center">
                    <img
                      v-lazy="
                        row.icon
                          ? '/assets/images/staking/' + row.icon
                          : '/assets/images/cryptoCurrency/' +
                            row.symbol +
                            '.png'
                      "
                      class="mr-2 rounded-full"
                      :width="32"
                    />
                    <span class="fw-bold mr-1">{{ row.symbol }}</span>
                    <span class="text-mute">({{ row.title }})</span>
                  </div>
                </td>
                <td class="py-3 px-6" data-label="APR">
                  <span class="text-success fw-bold">{{ row.profit }}%</span>
                </td>
                <td class="py-3 px-6" data-label="Duration (Days)">
                  <span class="text-warning fw-bold">{{ row.period }}</span>
                </td>
                <td class="py-3 px-6" data-label="Minimum Stake Amount">
                  <span class=""
                    ><toMoney :num="row.min_stake" decimals="4" />
                    {{ row.symbol }}</span
                  >
                </td>
                <td class="py-3 px-6" data-label="Action">
                  <div v-if="stakingStore.coinlogs != null">
                    <div
                      v-if="stakingStore.coinlogs[row.id] != null"
                      :key="stakingStore.coinlogs[row.id].status"
                      class="space-x-2 space-y-2"
                    >
                      <template
                        v-if="stakingStore.coinlogs[row.id].status != null"
                      >
                        <template
                          v-if="stakingStore.coinlogs[row.id].status != 2"
                        >
                          <button
                            type="button"
                            class="btn btn-warning btn-sm"
                            @click="stakingStore.setCoin(row, 'stake')"
                          >
                            {{ $t("Stake") }}
                          </button>
                        </template>
                        <button
                          v-if="
                            plat.staking.cancel_stake == 1 &&
                            stakingStore.coinlogs[row.id].status == 1
                          "
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="stakingStore.setCoin(row, 'cancel')"
                        >
                          {{ $t("Cancel") }}
                        </button>
                        <button
                          v-else-if="stakingStore.coinlogs[row.id].status == 2"
                          type="button"
                          class="btn btn-success btn-sm"
                          @click="stakingStore.setCoin(row, 'claim')"
                        >
                          {{ $t("Claim Profit") }}
                        </button>
                      </template>
                    </div>
                    <button
                      v-else
                      type="button"
                      class="btn btn-warning btn-sm"
                      @click="stakingStore.setCoin(row, 'stake')"
                    >
                      {{ $t("Stake") }}
                    </button>
                  </div>
                  <button
                    v-else
                    type="button"
                    class="btn btn-warning btn-sm"
                    @click="stakingStore.setCoin(row, 'stake')"
                  >
                    {{ $t("Stake") }}
                  </button>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr
                scope="row"
                class="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
              >
                <td colspan="100%" class="py-4 px-6">
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
    </div>

    <form @submit.prevent="Stake()">
      <transition
        name="modal"
        mode="out-in"
        enter-active-class="modal-enter-active"
        leave-active-class="modal-leave-active"
      >
        <Modal
          v-if="stakingStore.isShowModal.stake"
          :key="stakingStore.coin.length"
          size="lg"
          @close="stakingStore.closeModal('stake')"
        >
          <template #header>
            <div class="flex items-center text-lg">
              <span class="mr-1">{{ $t("Staking") }}</span>
              <span>{{ stakingStore.coin.symbol }}</span>
            </div>
          </template>
          <template #body
            ><div class="flex justify-between">
              <label for="amount">{{ $t("Stake Amount") }}</label>
              <span v-if="stakingStore.wallet != null" class="text-light"
                >{{
                  Number(stakingStore?.wallet?.balance).toFixed(2)
                }}
                USDT</span
              >
            </div>
            <div class="input-group mb-1 w-auto">
              <input
                v-model="amount"
                type="number"
                step="0.00000001"
                required=""
                min="0"
                placeholder="Amount"
              />
              <span>{{ stakingStore.coin.symbol }}</span>
            </div>
            <div class="card bg-black pb-3 mt-5">
              <div class="card-body">
                <div class="mb-1 flex justify-between">
                  <span>{{ $t("Price") }}</span>
                  <span class="text-success"
                    >{{ stakingStore.coin.price }} USDT</span
                  >
                </div>
                <div class="mb-1 flex justify-between">
                  <span>{{ $t("Est. Annual Profit Rate") }}</span>
                  <span class="text-success">{{ stakingStore.coin.apr }}%</span>
                </div>
                <div class="mb-1 flex justify-between">
                  <span>{{ $t("Staked Amount") }}</span>
                  <span>{{ stakingStore.coin.staked }}</span>
                </div>
                <div class="mb-1 flex justify-between">
                  <span>{{ $t("Max Available") }}</span>
                  <span>{{ stakingStore.coin.max_stake }}</span>
                </div>
                <div class="mb-1 flex justify-between">
                  <span>{{ $t("Staking period") }}</span>
                  <span>{{ stakingStore.coin.period }} {{ $t("Days") }}</span>
                </div>
                <div class="mb-1 flex justify-between">
                  <span>{{ $t("Staking Method") }}</span>
                  <span>{{ stakingStore.coin.method }}</span>
                </div>
                <div class="mb-1 flex justify-between">
                  <span>{{ $t("Coin Network") }}</span>
                  <span>{{ stakingStore.coin.network }}</span>
                </div>
                <div class="mb-1 flex justify-between">
                  <span>{{ $t("Profit Distribution") }}</span>
                  <span>{{ stakingStore.coin.profit_unit }}</span>
                </div>
                <div class="flex justify-between">
                  <span>{{ $t("Est. Daily Profits") }}</span>
                  <span>{{ stakingStore.coin.daily_profit }}</span>
                </div>
              </div>
            </div></template
          >
          <template #footer>
            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="stakingStore.loading"
                class="btn btn-outline-primary mr-3"
              >
                <ButtonLoading :loading="stakingStore.loading" text="Stake" />
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="stakingStore.closeModal('stake')"
              >
                {{ $t("Close") }}
              </button>
            </div>
          </template>
        </Modal>
      </transition>
    </form>

    <form @submit.prevent="CancelStake()">
      <transition
        name="modal"
        mode="out-in"
        enter-active-class="modal-enter-active"
        leave-active-class="modal-leave-active"
      >
        <Modal
          v-if="stakingStore.isShowModal.cancel"
          :key="stakingStore.coin.length"
          size="lg"
          @close="stakingStore.closeModal('cancel')"
        >
          <template #header>
            <div class="flex items-center text-lg">
              <span class="mr-1"> {{ $t("Cancel") }}</span>
              <span>{{ stakingStore.coin.symbol }}</span>
              <span class="ml-1">{{ $t("Staking") }}</span>
            </div>
          </template>
          <template #body>
            <p>
              {{ $t("Are you sure to cancel") }}
              <span class="fw-bold">{{ stakingStore.coin.symbol }}</span>
              {{ $t("Stake") }}?
            </p>
          </template>
          <template #footer>
            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="stakingStore.loading"
                class="btn btn-outline-danger mr-3"
              >
                <ButtonLoading
                  :loading="stakingStore.loading"
                  text="Cancel Stake"
                />
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="stakingStore.closeModal('cancel')"
              >
                {{ $t("Close") }}
              </button>
            </div>
          </template>
        </Modal>
      </transition>
    </form>

    <form @submit.prevent="ClaimStake()">
      <transition
        name="modal"
        mode="out-in"
        enter-active-class="modal-enter-active"
        leave-active-class="modal-leave-active"
      >
        <Modal
          v-if="stakingStore.isShowModal.claim"
          :key="stakingStore.coin.length"
          size="lg"
          @close="stakingStore.closeModal('claim')"
        >
          <template #header>
            <div class="flex items-center text-lg">
              <span class="mr-1"> {{ $t("Cancel") }}</span>
              <span>{{ stakingStore.coin.symbol }}</span>
              <span class="ml-1">{{ $t("Staking") }}</span>
            </div>
          </template>
          <template #body>
            <p>
              {{ $t("Are you sure to claim") }}
              <span class="fw-bold">{{ stakingStore.coin.symbol }}</span>
              {{ $t("Stake") }}?
            </p>
          </template>
          <template #footer>
            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="stakingStore.loading"
                class="btn btn-outline-success mr-3"
              >
                <ButtonLoading
                  :loading="stakingStore.loading"
                  text="Claim Stake"
                />
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="stakingStore.closeModal('claim')"
              >
                {{ $t("Close") }}
              </button>
            </div>
          </template>
        </Modal>
      </transition>
    </form>
  </div>
</template>
<script>
  import toMoney from "@/partials/toMoney.vue";
  import toDate from "@/partials/toDate.vue";
  import Filter from "@/partials/table/Filter.vue";
  import Col from "@/partials/table/Col.vue";
  import { useStakingStore } from "@/store/staking";
  import { useUserStore } from "@/store/user";
  import { Modal } from "flowbite-vue";
  import ButtonLoading from "@/partials/ButtonLoading.vue";
  export default {
    components: {
      toDate,
      toMoney,
      Filter,
      Col,
      Modal,
      ButtonLoading,
    },
    setup() {
      const userStore = useUserStore();
      const stakingStore = useStakingStore();
      return { userStore, stakingStore };
    },

    // component data
    data() {
      return {
        plat: plat,
        filters: {
          symbol: { value: "", keys: ["symbol"] },
        },
        currentPage: 1,
        totalPages: 0,
        amount: 0,
        imageLoading: true,
      };
    },

    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        if (this.stakingStore.coins.length == 0) {
          await this.stakingStore.fetch();
        }
      },
      async Stake() {
        await this.stakingStore.Stake(this.amount);
      },
      async CancelStake() {
        await this.stakingStore.CancelStake();
      },
      async ClaimStake() {
        await this.stakingStore.ClaimStake();
      },
    },
  };
</script>
