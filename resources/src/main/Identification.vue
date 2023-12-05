<template>
  <div class="border-b border-gray-600 dark:border-gray-300 pb-2">
    <h4 class="text-xl font-medium">Identity Verification</h4>
  </div>
  <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-3">
    <div
      class="xs:col-span-1 md:col-span-2 border-r border-gray-600 dark:border-gray-300 pr-5"
    >
      <div class="page-header page-header-kyc mt-1">
        <p class="large">{{ kycDesc }}</p>
      </div>
      <div class="flex justify-center">
        <div class="">
          <div class="kyc-status card">
            <!-- IF NOT SUBMITTED -->
            <div
              v-if="userStore.kyc_application === null"
              class="card-body text-center py-3 border-light rounded"
            >
              <div class="status-empty">
                <div class="status-icon flex justify-center items-center">
                  <i class="bi bi-files"></i>
                </div>
                <span class="status-text mx-5 text-dark"
                  >{{
                    $t(
                      "You have not submitted your necessary documents to verify your identity."
                    )
                  }}{{
                    $t(
                      " In order to trade in our platform, please verify your identity."
                    )
                  }}</span
                >
                <p class="px-md-5">
                  {{
                    $t(
                      "It would be great if you could submit the form. If you have any questions, please feel free to contact our support team."
                    )
                  }}
                </p>
                <router-link
                  :to="getKycApplicationRoute('new')"
                  class="btn mt-5 btn-primary"
                  >{{ $t("Click here to complete your KYC") }}</router-link
                >
              </div>
            </div>
            <!-- IF SUBMITTED @Thanks -->
            <div
              v-else-if="
                userStore.kyc_application !== null &&
                userStore.kyc_application.status === 'submitted'
              "
              class="card-body text-center py-3 border-warning rounded"
            >
              <div class="status-thank">
                <div class="status-icon flex justify-center items-center">
                  <i class="bi bi-check"></i>
                </div>
                <span class="status-text mx-5 large text-dark">{{
                  $t("You have completed the process of KYC")
                }}</span>
                <p class="px-md-5">
                  {{
                    $t(
                      "We are still waiting for your identity verification. Once our team verifies your identity, you will be notified by email. You can also check your KYC compliance status from your profile page."
                    )
                  }}
                </p>
              </div>
            </div>
            <!-- IF PENDING -->
            <div
              v-else-if="
                userStore.kyc_application !== null &&
                userStore.kyc_application.status === 'pending'
              "
              class="card-body text-center py-3 border-info rounded flex items-center"
            >
              <div class="status-process">
                <div class="status-icon flex justify-center items-center">
                  <i class="bi bi-infinity"></i>
                </div>
                <span class="status-text text-dark">{{
                  $t("Your identity verification is processing.")
                }}</span>
                <p class="px-md-5">
                  {{
                    $t(
                      "We are still working on your identity verification. Once our team verifies your identity, you will be notified by email."
                    )
                  }}
                </p>
              </div>
            </div>
            <!-- IF REJECTED/MISSING -->
            <div
              v-else-if="
                userStore.kyc_application !== null &&
                (userStore.kyc_application.status === 'missing' ||
                  userStore.kyc_application.status === 'rejected')
              "
              class="card-body text-center py-3 border-warning rounded"
            >
              <div
                :class="
                  userStore.kyc_application.status === 'missing'
                    ? 'status-warning'
                    : 'status-canceled'
                "
              >
                <div class="status-icon flex justify-center items-center">
                  <i class="bi bi-exclamation-lg"></i>
                </div>
                <span class="status-text mx-5 text-dark">
                  {{
                    userStore.kyc_application.status === "missing"
                      ? $t("We found some information to be missing.")
                      : $t("Sorry! Your application was rejected.")
                  }}
                </span>
                <p class="px-md-5">
                  {{
                    $t(
                      "In our verification process, we found information that is incorrect or missing. Please resubmit the form. In case of any issues with the submission, please contact our support team."
                    )
                  }}
                </p>
                <router-link
                  :to="
                    getKycApplicationRoute(
                      userStore.kyc_application.status === 'missing'
                        ? 'missing'
                        : 'resubmit'
                    )
                  "
                  class="btn btn-primary mt-0"
                  >{{ $t("Submit Again") }}</router-link
                >
              </div>
            </div>
            <!-- IF VERIFIED -->
            <div
              v-else-if="
                userStore.kyc_application !== null &&
                userStore.kyc_application.status === 'approved'
              "
              class="card-body text-center py-3 border-success rounded"
            >
              <div class="status-verified">
                <div class="status-icon flex justify-center items-center">
                  <i class="bi bi-shield-check text-success"></i>
                </div>
                <span class="status-text mx-5 text-dark">{{
                  $t("Your identity has been verified successfully.")
                }}</span>
                <p class="px-md-5">
                  {{
                    $t(
                      "One of our team members has verified your identity. Now you can participate in our platform. Thank you."
                    )
                  }}
                </p>
                <router-link
                  v-if="getKycApplicationNextRoute('new') !== null"
                  :to="getKycApplicationNextRoute('new')"
                  class="btn mt-5 btn-primary"
                  >{{ $t("Get") + " " + verficationLevel }}</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h4 class="mt-4 mb-2 text-lg">
        {{ $t("Verification Levels") }}
      </h4>
      <ul class="space-y-4">
        <li v-if="lastLevel > 0">
          <div
            class="w-full p-4"
            :class="
              userStore.kyc_application && userStore.kyc_application.level >= 1
                ? userStore.kyc_application &&
                  userStore.kyc_application.level === 1
                  ? statusClass
                  : 'text-green-700 bg-green-100 border border-green-300 rounded-lg dark:bg-gray-800 dark:border-green-800 dark:text-green-400'
                : 'text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
            "
            role="alert"
          >
            <div class="flex items-center justify-between">
              <span class="sr-only">Verified</span>
              <h3 class="font-medium">1. Verified</h3>
              <status-icon
                :status="
                  userStore.kyc_application &&
                  userStore.kyc_application.level >= 1
                    ? userStore.kyc_application &&
                      userStore.kyc_application.level === 1
                      ? userStore.kyc_application.status
                      : 'approved'
                    : ''
                "
                v-if="
                  userStore.kyc_application &&
                  userStore.kyc_application.level >= 1
                "
              />
            </div>
          </div>
        </li>
        <li v-if="lastLevel > 1">
          <div
            class="w-full p-4"
            :class="
              userStore.kyc_application && userStore.kyc_application.level === 2
                ? statusClass
                : 'text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
            "
            role="alert"
          >
            <div class="flex items-center justify-between">
              <span class="sr-only">Verified Plus</span>
              <h3 class="font-medium">2. Verified Plus</h3>

              <status-icon
                :status="
                  userStore.kyc_application &&
                  userStore.kyc_application.level >= 2
                    ? userStore.kyc_application &&
                      userStore.kyc_application.level === 2
                      ? userStore.kyc_application.status
                      : 'approved'
                    : ''
                "
                v-if="
                  userStore.kyc_application &&
                  userStore.kyc_application.level >= 2
                "
              />
            </div>
          </div>
        </li>
        <li v-if="lastLevel > 2">
          <div
            class="w-full p-4"
            :class="
              userStore.kyc_application && userStore.kyc_application.level === 3
                ? statusClass
                : 'text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
            "
            role="alert"
          >
            <div class="flex items-center justify-between">
              <span class="sr-only">Verified Pro</span>
              <h3 class="font-medium">3. Verified Pro</h3>

              <status-icon
                :status="
                  userStore.kyc_application &&
                  userStore.kyc_application.level >= 3
                    ? userStore.kyc_application &&
                      userStore.kyc_application.level === 3
                      ? userStore.kyc_application.status
                      : 'approved'
                    : ''
                "
                v-if="
                  userStore.kyc_application &&
                  userStore.kyc_application.level >= 3
                "
              />
            </div>
          </div>
        </li>
        <li v-if="lastLevel > 3">
          <div
            class="w-full p-4"
            :class="
              userStore.kyc_application && userStore.kyc_application.level === 4
                ? statusClass
                : 'text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
            "
            role="alert"
          >
            <div class="flex items-center justify-between">
              <span class="sr-only">Verified Business</span>
              <h3 class="font-medium">4. Verified Business</h3>

              <status-icon
                :status="
                  userStore.kyc_application &&
                  userStore.kyc_application.level >= 4
                    ? userStore.kyc_application &&
                      userStore.kyc_application.level === 4
                      ? userStore.kyc_application.status
                      : 'approved'
                    : ''
                "
                v-if="
                  userStore.kyc_application &&
                  userStore.kyc_application.level >= 4
                "
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { useUserStore } from "@/store/user";
  import { useKycStore } from "@/store/kyc";
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import StatusIcon from "./identification/StatusSvg.vue";

  export default {
    name: "Kyc",
    components: {
      StatusIcon,
    },
    setup() {
      const userStore = useUserStore();
      const kycStore = useKycStore();
      const route = useRoute();
      const thankYouParam = computed(() => {
        return route.query.thank_you === "1";
      });
      const kycTitle = computed(() => {
        return userStore.kyc_application !== null && thankYouParam.value
          ? "Begin your ID-Verification"
          : "KYC Verification";
      });
      const kycDesc = computed(() => {
        return userStore.kyc_application !== null && thankYouParam.value
          ? "Verify your identity to participate in our platform."
          : "To comply with regulations, each participant is required to go through identity verification (KYC/AML) to prevent fraud, money laundering operations, transactions banned under the sanctions regime, or those which fund terrorism. Please complete our fast and secure verification process to participate in our platform.";
      });

      const kycLevel = computed(() => {
        return userStore.kyc_application && userStore.kyc_application.level
          ? userStore.kyc_application.level
          : 1;
      });

      const getKycApplicationRoute = (state) => {
        return `/identity/application?state=${state}&level=${kycLevel.value}`;
      };

      const getKycApplicationNextRoute = (state) => {
        return lastLevel.value > kycLevel.value + 1
          ? `/identity/application?state=${state}&level=${kycLevel.value + 1}`
          : null;
      };

      const statusClass = computed(() => {
        const { level, status } = userStore.kyc_application;
        if (status === "approved") {
          return "text-green-700 bg-green-100 border border-green-300 rounded-lg dark:bg-gray-800 dark:border-green-800 dark:text-green-400";
        } else if (status === "pending") {
          return "text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400";
        } else if (status === "rejected") {
          return "text-red-700 bg-red-100 border border-red-300 rounded-lg dark:bg-gray-800 dark:border-red-800 dark:text-red-400";
        } else if (status === "missing") {
          return "text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-lg dark:bg-gray-800 dark:border-yellow-800 dark:text-yellow-400";
        } else if (status === "canceled") {
          return "text-gray-700 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400";
        }
        return "text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400";
      });

      const verficationLevel = computed(() => {
        if (kycLevel.value === 0) {
          return "Verified";
        } else if (kycLevel.value === 1) {
          return "Verified Plus";
        } else if (kycLevel.value === 2) {
          return "Verified Pro";
        } else if (kycLevel.value === 3) {
          return "Verified Business";
        }
        return "Verified";
      });

      const lastLevel = ref(0);

      const fetchKycTemplate = async () => {
        if (kycStore.options === null) {
          await kycStore.fetch();
        }
        for (const key in kycStore.options) {
          if (
            kycStore.options.hasOwnProperty(key) &&
            kycStore.options[key].level > lastLevel.value
          ) {
            lastLevel.value = kycStore.options[key].level;
          }
        }
      };

      onMounted(() => {
        fetchKycTemplate();
      });

      return {
        thankYouParam,
        kycTitle,
        kycDesc,
        getKycApplicationRoute,
        userStore,
        statusClass,
        getKycApplicationNextRoute,
        verficationLevel,
        kycStore,
        lastLevel,
      };
    },
  };
</script>

<style>
  .status {
    font-size: 14px;
    border-radius: 4px;
  }

  .status-primary {
    color: #7668fe;
    background: rgba(118, 104, 254, 0.15);
  }

  .status-secondary {
    color: #342d6e;
    background: rgba(52, 45, 110, 0.15);
  }

  .status-success {
    color: #00d285;
    background: rgba(0, 210, 133, 0.15);
  }

  .status-info {
    color: #1babfe;
    background: rgba(27, 171, 254, 0.15);
  }

  .status-warning {
    color: #ffc100;
    background: rgba(255, 193, 0, 0.15);
  }

  .status-danger {
    color: #ff6868;
    background: rgba(255, 104, 104, 0.15);
  }

  .status-purple {
    color: #bc69fb;
    background: rgba(188, 105, 251, 0.15);
  }

  .status-icon {
    position: relative;
    height: 90px;
    width: 90px;
    border-radius: 50%;
    text-align: center;
    margin: 0 auto 20px;
    border: 2px solid #b1becc;
  }

  .status-icon > .bi {
    color: #b1becc;
    font-size: 36px;
    line-height: 86px;
  }

  .status-icon-sm {
    position: absolute;
    right: -2px;
    bottom: -2px;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #ffc7c7;
  }

  .status-icon-sm > .bi {
    font-size: 12px;
    line-height: 22px;
    color: #ffc7c7;
    display: block;
  }

  .status-text {
    display: block;
    font-size: 1.29em;
    line-height: 1.6;
    font-weight: 400;
    color: #758698;
    letter-spacing: -0.01em;
    padding-bottom: 13px;
  }

  .status-text-d {
    display: block;
    font-size: 1.1em;
    font-weight: 600;
    color: #758698;
    letter-spacing: -0.01em;
    padding-bottom: 5px;
  }

  .status-text.large {
    font-size: 1.314em;
  }

  .status .btn {
    margin-top: 20px;
  }

  .status-empty .status-icon {
    border-color: #b1becc;
  }

  .status-empty .status-icon > .bi {
    color: #b1becc;
  }

  .status-thank .status-icon,
  .status-verified .status-icon {
    border-color: #06d388;
  }

  .status-thank .status-icon > .bi,
  .status-verified .status-icon > .bi {
    color: #06d388;
  }

  .status-thank .status-icon-sm,
  .status-verified .status-icon-sm {
    border-color: #06d388;
  }

  .status-thank .status-icon-sm > .bi,
  .status-verified .status-icon-sm > .bi {
    color: #06d388;
  }

  .status-verified .status-text {
    color: #06d388;
  }

  .status-process .status-icon {
    border-color: #50b3ff;
  }

  .status-process .status-icon > .bi {
    color: #50b3ff;
  }

  .status-process .status-icon-sm {
    border-color: #50b3ff;
  }

  .status-process .status-icon-sm > .bi {
    color: #50b3ff;
  }

  .status-canceled .status-icon {
    border-color: #ffc7c7;
  }

  .status-canceled .status-icon > .bi {
    color: #ffc7c7;
  }

  .status-canceled .status-icon-sm {
    border-color: #ffc7c7;
  }

  .status-canceled .status-icon-sm > .bi {
    color: #ffc7c7;
  }

  .status-canceled .status-text {
    color: #ffc7c7;
  }

  .status-warnning .status-icon {
    border-color: #ffd147;
  }

  .status-warnning .status-icon > .bi {
    color: #ffd147;
  }

  .status-warnning .status-icon-sm {
    border-color: #ffd147;
  }

  .status-warnning .status-icon-sm > .bi {
    color: #ffd147;
  }

  @media (min-width: 576px) {
    .status {
      padding: 45px 40px;
    }

    .status-text.large {
      font-size: 1.65em;
    }

    .status-sm {
      padding: 20px;
    }

    .status-lg {
      padding: 50px;
    }
  }

  .kyc-status {
    margin-bottom: 20px;
  }
  .kyc-status {
    margin-bottom: 20px;
  }
  .page-header-kyc {
    padding-top: 14px;
    padding-bottom: 25px;
  }
  .page-header-kyc .page-title {
    font-weight: 400;
  }
  .page-header-kyc p {
    font-size: 1em;
  }
</style>
