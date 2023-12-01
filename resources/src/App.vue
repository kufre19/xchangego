<template>
  <div class="min-h-screen overflow-x-hidden">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center overflow-hidden"
    >
      <div class="flex w-[108rem] flex-none justify-end">
        <img
          src="/assets/background/docs-dark.png"
          alt=""
          class="hidden w-[90rem] max-w-none flex-none dark:block"
          decoding="async"
        />
      </div>
    </div>
    <div style="margin-bottom: 65px;"></div>
    <TopNavbar
      :user-store="userStore"
      :sidebar-mobile="sidebarMobile"
      :sidebar-pc="sidebarPc"
      :sidebar-collapsed="userStore.sidebarCollapsed"
      @sidebar-toggle="toggleSidebar"
      @sidebar-toggle-mobile="toggleSidebarMobile"
    />
    <div
      id="app-content"
      class="flex overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      <sidebar
        :usermenu-data="usermenuData"
        :sidebar-collapsed="userStore.sidebarCollapsed"
        :user-store="userStore"
      ></sidebar>
      <News v-if="NewsEnabled" :rightbar-collapsed="rightbarCollapsed" />
      <div
        v-if="sidebarMobile"
        class="fixed inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/70"
        @click="toggleSidebarMobile"
      ></div>
      <div
        id="main-content"
        class="relative mb-10 h-full w-full overflow-y-auto bg-gray-50 py-5 pl-5 duration-300 dark:bg-gray-900"
        :class="MainContentClass"
      >
        <router-view v-slot="{ Component, route }">
          <component :is="Component" :key="route.name"></component>
        </router-view>
      </div>

      <FooterBar />
    </div>
  </div>
  <Popup
    v-if="activePopupIndex !== -1"
    :key="userStore.popups[activePopupIndex].id"
    :popup="userStore.popups[activePopupIndex]"
    @close="closePopup(userStore.popups[activePopupIndex].id)"
    @disable="disablePopup(userStore.popups[activePopupIndex].id)"
  >
  </Popup>
</template>

<script>
  import { useUserStore } from "./store/user";
  import { useRouter } from "vue-router";
  import Sidebar from "./ui/SidebarMenu.vue";
  import TopNavbar from "./ui/TopNavbar.vue";
  import FooterBar from "./ui/FooterBar.vue";
  import { ref, watch, onBeforeMount, defineAsyncComponent } from "vue";
  import Popup from "./partials/Popup.vue";

  export default {
    components: {
      News: defineAsyncComponent(() => import("./main/News.vue")),
      Sidebar,
      TopNavbar,
      FooterBar,
      Popup,
    },
    setup() {
      const userStore = useUserStore();
      const activePopupIndex = ref(-1);
      const popupsQueue = ref([]);

      onBeforeMount(async () => {
        userStore.menu = usermenuData[0];
        if (userStore.user == null) {
          await userStore.fetch();
        }
      });

      watch(
        () => userStore.popups,
        () => {
          if (userStore.popups) {
            popupsQueue.value = userStore.popups.filter(
              (popup) => popup.status === 1
            );
            if (activePopupIndex.value === -1) {
              // Delay the first run of popups by 5 seconds
              setTimeout(() => {
                showNextPopup();
              }, 5000);
            }
          }
        }
      );

      function showNextPopup() {
        if (popupsQueue.value.length > 0) {
          const nextPopup = popupsQueue.value.shift();
          const index = userStore.popups.findIndex(
            (popup) => popup.id === nextPopup.id
          );
          if (index !== -1) {
            showPopup(index);
          }
        }
      }

      function showPopup(index) {
        activePopupIndex.value = index;
        setTimeout(() => {
          closePopup(userStore.popups[index].id);
        }, userStore.popups[index].duration * 1000);
      }

      function closePopup(id) {
        let index = userStore.popups.findIndex((popup) => popup.id === id);
        if (index !== -1) {
          userStore.popups[index].status = 0;
        }
        activePopupIndex.value = -1;
        setTimeout(() => {
          showNextPopup();
        }, 4000);
      }

      function disablePopup(id) {
        axios
          .post("/user/popups/disable", {
            popup_id: id,
          })
          .then((response) => {
            $toast[response.type](response.message);
            closePopup(id);
          });
      }

      const router = useRouter();
      router.beforeEach((to) => {
        userStore.toggledMenu = null;
      });
      return { userStore, disablePopup, activePopupIndex, closePopup };
    },
    data() {
      return {
        usermenuData: usermenuData,
        sidebarHover: false,
        sidebarMobile: false,
        sidebarPc: false,
        rightbarCollapsed: true,
        ext: ext,
        plat: plat,
        custom_classes: "",
      };
    },
    computed: {
      SidebarCollapse() {
        return !this.userStore.sidebarCollapsed ||
          (this.userStore.sidebarCollapsed && this.sidebarHover) ||
          this.sidebarMobile
          ? "sidebar-main-expanded"
          : "";
      },
      MainContentClass() {
        const newsEnabled = this.NewsEnabled ? "pr-16" : "pr-5";
        const sidebarCollapsed = this.userStore.sidebarCollapsed
          ? "lg:ml-[4rem]"
          : "lg:ml-[16rem]";
        return `${newsEnabled} ${sidebarCollapsed}`;
      },
      NewsEnabled() {
        return (
          this.plat &&
          this.plat.dashboard &&
          this.plat.dashboard.news &&
          this.plat.dashboard.news === "1"
        );
      },
    },

    watch: {
      async $route(to, from) {
        this.sidebarHover = false;
        this.sidebarMobile = false;
        this.rightbarCollapsed = true;
        if (this.userStore.isMobile) {
          this.userStore.sidebarCollapsed = true;
        }
      },
    },

    // custom methods
    methods: {
      toggleSidebar() {
        this.sidebarPc = !this.sidebarPc;
        this.userStore.sidebarCollapsed = !this.userStore.sidebarCollapsed;
      },
      toggleSidebarMobile() {
        this.userStore.sidebarCollapsed = !this.userStore.sidebarCollapsed;
        this.userStore.isMobile = true;
        this.sidebarMobile = !this.sidebarMobile;
      },
      checkPath(url) {
        return url == window.location.pathname.replace("/app/", "/")
          ? true
          : false;
      },
      truncate(str, n) {
        return str.length > n ? str.substr(0, n - 1) + "&hellip;" : str;
      },
      async fetchData() {
        if (this.userStore.user == null) {
          await this.userStore.fetch();
        }
      },
    },
  };
</script>
