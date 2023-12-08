<template>
  <div>
    <div
      class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
    >
      <div class="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1">
        <div class="card text-center">
          <div class="card-body">
            <div class="mb-5 flex justify-center">
              <img
                v-lazy="
                  userStore.user
                    ? userStore.user.profile_photo_path
                      ? '/assets/images/profile/' +
                        userStore.user.profile_photo_path
                      : '/assets/no-image.png'
                    : '/assets/no-image.png'
                "
                class="rounded-full shadow-lg"
                height="96"
                width="96"
              />
            </div>
            <div
              class="text-center text-xl font-medium text-gray-900 dark:text-white"
            >
              {{ userStore.user ? userStore.user.firstname : "Loading" }}
            </div>
            <div class="flex justify-center py-3">
              <div class="badge bg-success">
                {{ $t("Verified Trader") }}
              </div>
              <div v-if="icoStore.ico_logs != null" class="badge bg-success">
                {{ icoStore.ico_logs.length }}
                {{ $t("Contributions") }}
              </div>
            </div>
          </div>
        </div>

        <div class="card my-3">
          <div class="card-header">
            <h4 class="card-title">
              <div class="title-gradient">
                {{ $t("Your Contributions") }}
              </div>
            </h4>
          </div>
          <div style="max-height: 280px; overflow-y: auto;">
            <div
              v-if="icoStore.ico_logs != null && icoStore.ico_logs.length > 0"
            >
              <div
                v-for="(ico_log, index) in icoStore.ico_logs"
                :key="index"
                class="flex w-full justify-between rounded-t-lg border-gray-200 px-4 py-2 dark:border-gray-600"
                :class="index != icoStore.ico_logs.length - 1 ? 'border-b' : ''"
              >
                <div class="flex items-center justify-start">
                  <div class="flex items-center justify-start">
                    <div class="bg-dark mr-1 rounded py-1 px-2 font-medium">
                      <span class="text-success"
                        ><i class="bi bi-journal-arrow-up"></i
                      ></span>
                    </div>
                    <div>
                      <span class="text-success font-medium">{{
                        $t("Token Purchase")
                      }}</span>
                      <p>
                        <small>
                          <toDate :time="ico_log.created_at" :full="true" />
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="font-mediumer">
                  <span v-if="ico_log.status == 0" class="badge bg-warning">{{
                    $t("Pending")
                  }}</span>
                  <span
                    v-else-if="ico_log.status == 1"
                    class="badge bg-success"
                  >
                    <toMoney :num="ico_log.recieved" decimals="0" />
                    {{ ico_log.ico.symbol }}</span
                  >
                </div>
              </div>
            </div>
            <div
              v-else
              class="text-muted mb-5 flex flex-col items-center justify-center text-center"
              colspan="100%"
            >
              <img
                height="128"
                width="128"
                src="https://assets.staticimg.com/pro/2.0.4/images/empty.svg"
                alt=""
              />
              <p class="">
                {{ $t("No Transactions Found") }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2">
        <div
          class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
        >
          <template v-if="icoStore.isLoading">
            <div class="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1">
              <div class="card">
                <div class="card-body">
                  <div class="flex-column flex">
                    <div class="card-content w-full space-y-5">
                      <div class="flex justify-between">
                        <div
                          class="skeleton h-12 w-12 rounded-full shadow-lg"
                        ></div>
                        <div>
                          <div class="skeleton h-4 rounded"></div>
                          <div class="skeleton h-4 rounded"></div>
                        </div>
                      </div>

                      <div class="mt-1">
                        <div class="skeleton h-4 rounded text-sm"></div>
                        <div
                          class="text-muted skeleton mt-1 h-4 rounded text-sm"
                        ></div>
                      </div>

                      <div class="flex-column">
                        <div>
                          <div class="skeleton h-4 w-10 rounded"></div>
                          <div
                            class="text-success skeleton mt-1 h-4 rounded text-sm font-medium"
                          ></div>
                        </div>
                      </div>

                      <div class="mb-1">
                        <div class="text-dark">
                          <div class="skeleton h-4 rounded"></div>
                        </div>

                        <small class="flex justify-between">
                          <span>
                            <div class="skeleton h-4 w-16 rounded"></div>
                          </span>
                        </small>
                      </div>

                      <div class="flex items-center justify-between">
                        <span class="font-medium"
                          >{{ $t("Liquidity") }} %:</span
                        >
                        <span class="skeleton h-4 w-10 rounded"></span>
                      </div>

                      <div class="flex items-center justify-between">
                        <span class="font-medium"
                          >{{ $t("Lockup Time") }}:</span
                        >
                        <span class="skeleton h-4 w-10 rounded"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card-footer text-center">
                  <div class="mb-5 flex items-center justify-between">
                    <span class="skeleton h-4 w-10 rounded"></span>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-else
            ><div
              v-for="(ico, index) in icoStore.icos"
              :key="index"
              class="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1"
            >
              <div class="card">
                <div class="card-body">
                  <div class="flex-column flex">
                    <div class="card-content w-full space-y-5">
                      <div class="flex justify-between">
                        <img
                          v-lazy="
                            ico.icon
                              ? '/assets/images/ico/' + ico.icon
                              : '/market/notification.png'
                          "
                          class="rounded-full shadow-lg"
                          height="48"
                          width="48"
                          alt=""
                          style="filter: grayscale(0);"
                        />
                        <div>
                          <span
                            v-if="ico.status == 0"
                            class="badge bg-warning"
                            >{{ $t("Upcoming") }}</span
                          >
                          <span
                            v-else-if="ico.status == 1"
                            class="badge bg-success"
                            >{{ $t("Sale Live") }}</span
                          >
                          <span
                            v-else-if="ico.status == 2"
                            class="badge bg-danger"
                            >{{ $t("Sale Ended") }}</span
                          >
                          <span
                            v-else-if="ico.status == 3"
                            class="badge bg-secondary"
                            >{{ $t("Canceled") }}</span
                          >
                        </div>
                      </div>

                      <div class="mt-1">
                        <span class="text-sm">{{ ico.name }}</span>
                        <p class="text-muted text-sm">
                          <toMoney :num="ico.soft_price" decimals="4" />
                          {{ ico.network_symbol }}
                        </p>
                      </div>
                      <div class="flex-column">
                        <span v-if="ico.type == 1">{{ $t("Soft") }}</span>
                        <span v-else-if="ico.type == 2">{{ $t("Hard") }}</span>
                        <span v-else-if="ico.type == 3">{{
                          $t("Soft/Hard")
                        }}</span>
                        <p
                          v-if="ico.type == 1"
                          class="text-success text-sm font-medium"
                        >
                          <toMoney :num="ico.soft_cap" decimals="4" />
                        </p>
                        <p
                          v-else-if="ico.type == 2"
                          class="text-success text-sm font-medium"
                        >
                          <toMoney :num="ico.hard_cap" decimals="4" />
                        </p>
                        <p
                          v-else-if="ico.type == 3"
                          class="text-success text-sm font-medium"
                        >
                          <toMoney :num="ico.soft_cap" decimals="4" />
                        </p>
                      </div>
                      <div class="mb-1">
                        <p v-if="ico.type == 1" class="text-dark">
                          {{ $t("Progress") }} (
                          <toMoney
                            :num="(ico.soft_raised / ico.soft_cap) * 100"
                            decimals="4"
                          />%)
                        </p>
                        <p v-else-if="ico.type == 2" class="text-dark">
                          {{ $t("Progress") }} ({{
                            (ico.hard_raised / ico.hard_cap) * 100
                          }}%)
                        </p>
                        <p v-else-if="ico.type == 3" class="text-dark">
                          {{ $t("Progress") }} ({{
                            (ico.soft_raised / ico.soft_cap) * 100
                          }}%)
                        </p>
                        <span v-if="ico.type == 1" class="mb-1">
                          <Progress
                            :progress="
                              (ico.soft_raised / ico.soft_cap) * 100 < 100
                                ? (ico.soft_raised / ico.soft_cap) * 100
                                : 100
                            "
                          ></Progress>
                        </span>
                        <span v-else-if="ico.type == 2" class="mb-1">
                          <div id="myRangeColor" class="progress">
                            <div
                              id="myRange"
                              class="progress-bar progress-bar-striped progress-bar-animated"
                              role="progressbar"
                              aria-valuenow="50"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              :style="
                                'width:' +
                                (ico.hard_raised / ico.hard_cap) * 100 +
                                '%'
                              "
                            ></div>
                          </div>
                        </span>
                        <span v-else-if="ico.type == 3" class="mb-1">
                          <div id="myRangeColor" class="progress">
                            <div
                              id="myRange"
                              class="progress-bar progress-bar-striped progress-bar-animated"
                              role="progressbar"
                              aria-valuenow="50"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              :style="
                                'width:' +
                                (ico.soft_raised / ico.soft_cap) * 100 +
                                '%'
                              "
                            ></div>
                          </div>
                        </span>
                        <small class="flex justify-between">
                          <span v-if="ico.type == 1">
                            <toMoney :num="ico.soft_raised" decimals="4" />
                            {{ ico.symbol }}</span
                          >
                          <span v-else-if="ico.type == 2">
                            <toMoney :num="ico.hard_raised" decimals="4" />
                            {{ ico.symbol }}</span
                          >
                          <span v-else-if="ico.type == 3">
                            <toMoney :num="ico.soft_raised" decimals="4" />
                            {{ ico.symbol }}</span
                          >
                          <span v-if="ico.type == 1">
                            <toMoney :num="ico.soft_cap" decimals="4" />
                            {{ ico.symbol }}</span
                          >
                          <span v-else-if="ico.type == 2">
                            <toMoney :num="ico.hard_cap" decimals="4" />
                            {{ ico.symbol }}</span
                          >
                          <span v-else-if="ico.type == 3">
                            <toMoney :num="ico.soft_cap" decimals="4" />
                            {{ ico.symbol }}</span
                          >
                        </small>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="font-medium"
                          >{{ $t("Liquidity") }} %:</span
                        >
                        <span class="">{{ ico.liquidity }}%</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="font-medium"
                          >{{ $t("Lockup Time") }}:</span
                        >
                        <span class="">{{ ico.lockup }} {{ $t("days") }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-footer text-center">
                  <div class="mb-5 flex items-center justify-between">
                    <span v-if="ico.stage == 0"
                      >{{ $t("Sale Starts In") }}:</span
                    >
                    <span v-else-if="ico.stage == 1"
                      >{{ $t("Sale Ends In") }}:</span
                    >
                    <span v-else-if="ico.stage == 2">{{ $t("Ended") }}</span>
                    <span v-else>{{ $t("Canceled") }}</span>
                    <router-link
                      :to="'ico/' + ico.symbol"
                      class="btn btn-outline-warning btn-sm"
                    >
                      {{ $t("View Pool") }}
                    </router-link>
                  </div>
                  <template v-if="ico.type == 1">
                    <div class="bg-gray-200 rounded py-5 px-2">
                      <Countdown
                        v-if="ico.stage == 0"
                        main-flip-background-color="#f8fafc"
                        second-flip-background-color="#f1f5f9"
                        label-size="12px"
                        countdown-size="24px"
                        class="mt-1"
                        :deadline="ico.soft_start"
                      ></Countdown>
                      <Countdown
                        v-else-if="ico.stage == 1"
                        main-flip-background-color="#f8fafc"
                        second-flip-background-color="#f1f5f9"
                        label-size="12px"
                        countdown-size="24px"
                        class="mt-1"
                        :deadline="ico.soft_end"
                      ></Countdown>
                    </div>
                  </template>
                  <template v-else-if="ico.type == 2">
                    <div class="bg-gray-200 rounded py-5 px-2">
                      <Countdown
                        v-if="ico.stage == 0"
                        main-flip-background-color="#f8fafc"
                        second-flip-background-color="#f1f5f9"
                        label-size="12px"
                        countdown-size="24px"
                        class="mt-1"
                        :deadline="ico.soft_start"
                      ></Countdown>
                      <Countdown
                        v-else-if="ico.stage == 1"
                        main-flip-background-color="#f8fafc"
                        second-flip-background-color="#f1f5f9"
                        label-size="12px"
                        countdown-size="30px"
                        class="mt-1"
                        :deadline="ico.soft_end"
                      ></Countdown>
                      <Countdown
                        v-else-if="ico.stage == 2"
                        main-flip-background-color="#f8fafc"
                        second-flip-background-color="#f1f5f9"
                        label-size="12px"
                        countdown-size="24px"
                        :deadline="ico.hard_end"
                      ></Countdown>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Countdown } from "vue3-flip-countdown";
  import toMoney from "../../partials/toMoney.vue";
  import toDate from "../../partials/toDate.vue";
  import { useIcoStore } from "../../store/ico";
  import { useUserStore } from "../../store/user";
  import { Progress } from "flowbite-vue";
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
        imageLoading: true,
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        if (this.icoStore.icos.length == 0) {
          await this.icoStore.fetch();
        }
      },
    },
  };
</script>
