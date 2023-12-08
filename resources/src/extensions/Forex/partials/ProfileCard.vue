<template>
  <div class="card">
    <div class="flex flex-col space-y-5 p-5 text-center">
      <div class="flex justify-center">
        <span class="profile-icon">
          <img
            v-lazy="
              userStore.user
                ? userStore.user.profile_photo_path
                  ? '/assets/images/profile/' +
                    userStore.user.profile_photo_path
                  : '/assets/images/profile/default.png'
                : '/assets/images/profile/default.png'
            "
            class="rounded-full shadow-lg"
            height="96"
            width="96"
        /></span>
      </div>
      <div
        class="text-center text-xl font-medium text-gray-900 dark:text-white"
      >
        {{ userStore.user ? userStore.user.firstname : "" }}
      </div>
      <template v-if="forexStore.account != null">
        <div :key="forexStore.account.length">
          <router-link v-if="forexStore.account.status == 1" to="/forex/trade"
            ><button type="button" class="btn btn-outline-warning">
              {{ $t("Launch Forex App") }}
            </button>
          </router-link>
          <div v-else>
            <div
              class="rounded-b border-t-4 border-red-500 bg-red-100 px-4 py-3 text-red-900 shadow-md"
              role="alert"
            >
              <div class="flex">
                <div class="py-1">
                  <svg
                    class="mr-4 h-6 w-6 fill-current text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                    />
                  </svg>
                </div>
                <div class="text-left">
                  <p class="font-bold">
                    {{ $t("Forex App Locked") }}
                  </p>
                  <p class="text-sm">
                    {{ $t("Deposit Firstly") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="forexStore.wallet != null"
          :key="forexStore.wallet.balance"
          class="flex justify-between gap-5"
        >
          <button
            type="button"
            class="btn btn-outline-success w-1/2"
            @click="forexStore.showModal('deposit')"
          >
            {{ $t("Deposit") }}
          </button>
          <button
            type="button"
            class="btn btn-outline-danger w-1/2 justify-center"
            @click="forexStore.showModal('withdraw')"
          >
            {{ $t("Withdraw") }}
          </button>
        </div>
        <form
          v-else
          :key="forexStore.wallet"
          class="my-1"
          @submit.prevent="forexStore.createWallet()"
        >
          <button type="submit" class="btn btn-warning">
            {{ $t("Create Wallet") }}
          </button>
        </form>
      </template>
      <a v-else @click="forexStore.createAccount()">
        <button type="submit" class="btn btn-success">
          {{ $t("Create Forex Account") }}
        </button>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      userStore: {
        type: Object,
        required: true,
      },
      forexStore: {
        type: Object,
        required: true,
      },
    },
  };
</script>
<style scoped>
  .profile-icon {
    position: relative;
  }

  .profile-icon::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid #4caf50;
    opacity: 0;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 0.8;
    }
    100% {
      transform: scale(1.1);
      opacity: 0;
    }
  }
</style>
