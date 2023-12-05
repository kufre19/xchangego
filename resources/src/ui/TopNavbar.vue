<template>
  <nav
    class="supports-backdrop-blur:bg-white/60 fixed top-0 z-40 w-full flex-none border-b navbarBgColor backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] lg:z-50 lg:border-b lg:border-slate-900/10"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            id="toggleSidebar"
            aria-expanded="false"
            aria-controls="sidebar"id
            class="mr-3 hidden cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:inline"
            @click="$emit('sidebar-toggle')"
          >
            <NewSvg
              :class="{ hidden: sidebarPc }"
              path1="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              path3=""
              fill1="currentColor"
              fill2=""
            />
            <NewSvg
              :class="{ hidden: !sidebarPc }"
              path1="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              path3=""
              fill1="currentColor"
              fill2=""
            />
          </button>
          <button
            id="toggleSidebarMobile"
            aria-expanded="false"
            aria-controls="sidebar"
            class="mr-2 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 lg:hidden"
            @click="$emit('sidebar-toggle-mobile')"
          >
            <NewSvg
              :class="{ hidden: sidebarMobile }"
              path1="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              path3=""
              fill1="currentColor"
              fill2=""
            />
            <NewSvg
              id="toggleSidebarMobileClose"
              :class="{ hidden: !sidebarMobile }"
              path1="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              path3=""
              fill1="currentColor"
              fill2=""
            />
          </button>
          <router-link to="/" class="if-sm mr-14 flex">
            <img
              :key="theme"
              :src="
                theme === 'light'
                  ? '/assets/images/logoIcon/logo.png'
                  : '/assets/images/logoIcon/logo-dark.png'
              "
              class="mr-3 h-8"
            />
          </router-link>
        </div>
        <div class="flex items-center lg:order-2">
          <a
            v-if="userStore.role == 1"
            href="/admin/dashboard"
            class="btn btn-outline-secondary mr-2"
          >
            {{ $t("Admin") }}
          </a>
          <template v-if="ext.walletConnect === 1">
            <Login class="mx-3" />
          </template>
          <DarkMode
            @change-theme="changeTheme"
            v-if="plat.system.dark_light_mode_change"
          />
          <ProfileDropdown :user-store="userStore" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import NewSvg from "@/partials/NewSvg.vue";
  import DarkMode from "./DarkMode.vue";
  import ProfileDropdown from "./ProfileDropdown.vue";
  import { defineAsyncComponent } from "vue";

  export default {
    name: "TopNavbar",
    components: {
      NewSvg,
      DarkMode,
      Login: defineAsyncComponent(() => import("./Login.vue")),
      ProfileDropdown,
    },
    props: {
      sidebarMobile: {
        type: Boolean,
        default: false,
      },
      sidebarPc: {
        type: Boolean,
        default: false,
      },
      userStore: {
        type: Object,
        default: null,
      },
    },
    emits: ["sidebar-toggle", "sidebar-toggle-mobile"],
    data() {
      return {
        theme: localStorage.getItem("color-theme"),
        plat: window.plat,
      };
    },
    methods: {
      changeTheme(val) {
        this.theme = val;
      },
    },
  };
</script>
