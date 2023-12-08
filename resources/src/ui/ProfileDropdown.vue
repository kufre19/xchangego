<template>
  <div class="navbar-profile">
    <button
      id="user-menu-button"
      type="button"
      class="profile-button mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
      aria-expanded="false"
      @click="toggleDropdown"
    >
      <span class="sr-only">{{ $t("Open user menu") }}</span>
      <img
        :src="profilePhotoPath"
        class="h-8 w-8 rounded-full"
        alt="user photo"
      />
    </button>

    <div
      v-show="dropdownVisible"
      class="z-50 my-4 w-56 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
    >
      <div class="px-4 py-3">
        <span
          class="block text-sm font-semibold text-gray-900 dark:text-white"
          >{{ userFullName }}</span
        >
        <span
          class="block truncate text-sm font-light text-gray-500 dark:text-gray-400"
          >{{ userEmail }}</span
        >
      </div>
      <ul class="py-1 font-light text-gray-500 dark:text-gray-400">
        <li>
          <a
            href="/user/profile"
            class="text-dark block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >{{ $t("My profile") }}</a
          >
        </li>
        <li v-if="plat.kyc.kyc_status == 1">
          <router-link
            to="/identity"
            class="text-dark block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >{{ $t("Verification Center") }}</router-link
          >
        </li>
        <li>
          <router-link
            to="/support"
            class="text-dark block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >{{ $t("Support") }}</router-link
          >
        </li>
        <li>
          <router-link
            to="/api-management"
            class="text-dark block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >{{ $t("API Management") }}</router-link
          >
        </li>
        <li>
          <a
            v-if="userStore.user != null"
            class="text-dark block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="user_logout"
            >{{ $t("Sign out") }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavbarProfile",
    props: {
      userStore: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        dropdownVisible: false,
        plat: plat,
      };
    },
    computed: {
      profilePhotoPath() {
        return this.userStore.user &&
          this.userStore.user.profile_photo_path !== null &&
          this.userStore.user.profile_photo_path !== "" &&
          this.userStore.user.profile_photo_path !== undefined
          ? "/assets/images/profile/" + this.userStore.user.profile_photo_path
          : "/assets/images/profile/default.png";
      },
      userFullName() {
        return this.userStore.user
          ? this.userStore.user.firstname + " " + this.userStore.user.lastname
          : "";
      },
      userEmail() {
        return this.userStore.user ? this.userStore.user.email : "";
      },
    },
    methods: {
      toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible;
      },
      async user_logout() {
        await axios
          .post("/logout")
          .then((response) => {
            this.$toast.success("Logged Out Successfully");
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
</script>

<style scoped>
  .navbar-profile {
    position: relative;
  }

  .navbar-profile .z-50 {
    position: absolute;
    top: 100%;
    right: 0;
  }
  .profile-button {
    position: relative;
  }

  .profile-button::before {
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
      transform: scale(1.5);
      opacity: 0;
    }
  }
</style>
