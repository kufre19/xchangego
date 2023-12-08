<template>
  <aside
    id="sidebar"
    class="fixed left-0 z-20 h-full flex-shrink-0 flex-col duration-300 lg:flex lg:w-[4rem]"
    :class="{
      'sidebar-menu-expanded':
        !sidebarCollapsed ||
        (sidebarCollapsed && sidebarHover) ||
        sidebarMobile,
      hidden: !sidebarMobile && sidebarCollapsed,
    }"
    aria-label="Sidebar"
    @mouseover="!sidebarMobile ? (sidebarHover = !sidebarHover) : ''"
    @mouseout="!sidebarMobile ? (sidebarHover = !sidebarHover) : ''"
  >
    <div
      class="supports-backdrop-blur:bg-white/60 relative flex h-full min-h-0 flex-1 flex-col border-r border-gray-200 sidebarBgColor pt-0 backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] lg:border-slate-900/10"
    >
      <div
        id="sidebarOverflow"
        class="flex flex-1 flex-col overflow-x-hidden pt-2"
        :style="{
          maxHeight: 'calc(88vh)',
        }"
        :class="{
          'overflow-y-auto':
            !sidebarCollapsed ||
            (sidebarCollapsed && sidebarHover) ||
            sidebarMobile,
          'overflow-y-hidden':
            sidebarCollapsed && !sidebarHover && !sidebarMobile,
        }"
      >
        <div
          class="flex-1 divide-y divide-gray-200 dark:divide-gray-700"
          :class="{
            'space-y-1 px-2': design === 'rounded',
          }"
        >
          <ul
            id="sidebar-ul"
            :class="{
              expandedMenu:
                !sidebarCollapsed ||
                (sidebarCollapsed && sidebarHover) ||
                sidebarMobile,
              collapsedMenu: !sidebarMobile,
              'space-y-1 pb-1': design === 'rounded',
            }"
          >
            <template v-for="menu in userStore.menu">
              <li
                v-if="menu.status == 1"
                style="margin-left: 2px;"
                :class="{
                  'bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-700':
                    isActive(menu) || isParentActive(menu),
                  'rounded-lg': design === 'rounded',
                }"
                :style="
                  isActive(menu) || isParentActive(menu) ? borderDesign : ''
                "
              >
                <template v-if="!menu.submenu">
                  <router-link
                    :to="menu.url"
                    class="group flex items-center text-base font-normal text-gray-900 transition-transform duration-300 ease-in-out hover:translate-x-1 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    :class="{
                      'px-4 py-4': design === 'square',
                      'px-2 py-2.5 rounded-lg': design === 'rounded',
                    }"
                    :target="menu.newTab ? '_blank' : '_self'"
                  >
                    <i :class="'bi bi-' + menu.icon + ' menu-icon'"></i>
                    <span class="ml-3 whitespace-nowrap">{{
                      $t(menu.name)
                    }}</span>
                  </router-link>
                </template>
                <template v-else>
                  <a
                    class="group flex w-full items-center text-base font-normal text-gray-900 transition-transform duration-300 ease-in-out hover:translate-x-1 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    :class="{
                      'px-4 py-4': design === 'square',
                      'px-2 py-2.5 rounded-lg': design === 'rounded',
                    }"
                    @click="userStore.toggleMenu(menu)"
                  >
                    <i :class="'bi bi-' + menu.icon + ' menu-icon'"></i>
                    <span class="ml-3 flex-1 whitespace-nowrap text-left">{{
                      $t(menu.name)
                    }}</span>
                    <svg
                      class="mx-1.5 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        :d="
                          userStore.toggledMenu === menu
                            ? 'M4.5 15.75l7.5-7.5 7.5 7.5'
                            : 'M4.5 8.25l7.5 7.5 7.5-7.5'
                        "
                      />
                    </svg>
                  </a>
                  <ul
                    class="mt-1 bg-gray-50 shadow-inner dark:bg-gray-900"
                    :class="{
                      hidden: submenuVisibility(menu) === 'hidden',
                      'rounded-lg': design === 'rounded',
                    }"
                  >
                    <template
                      v-for="submenu in menu.submenu"
                      :key="submenu.url"
                    >
                      <li
                        :class="{
                          'bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-700': isActive(
                            submenu
                          ),
                        }"
                        :style="isActive(submenu) ? borderDesign : ''"
                      >
                        <router-link
                          :to="submenu.url"
                          class="group flex items-center text-base pl-14 font-normal text-gray-900 transition-transform duration-300 ease-in-out hover:translate-x-1 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                          :class="{
                            'px-4 py-4': design === 'square',
                            'px-2 py-2.5 rounded-lg': design === 'rounded',
                          }"
                        >
                          <i
                            class="icon bi mr-3 text-xs menu-icon"
                            :class="'bi-' + submenu.icon"
                          ></i>
                          <span class="flex-1 whitespace-nowrap">{{
                            $t(submenu.name)
                          }}</span>
                        </router-link>
                      </li>
                    </template>
                  </ul>
                </template>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
  export default {
    name: "SidebarMenu",
    props: {
      sidebarCollapsed: {
        type: Boolean,
        default: false,
      },
      userStore: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        sidebarHover: false,
        sidebarMobile: false,
        plat: plat,
      };
    },
    computed: {
      design() {
        return plat.dashboard &&
          plat.dashboard.sidebar &&
          plat.dashboard.sidebar.design
          ? plat.dashboard.sidebar.design
          : "rounded";
      },
      submenuVisibility() {
        return (menu) => {
          if (this.userStore.toggledMenu) {
            return this.userStore.toggledMenu.name === menu.name
              ? this.userStore.toggledMenu.showSub
                ? ""
                : "hidden"
              : "hidden";
          }
          return "hidden";
        };
      },
      borderSide() {
        return plat.dashboard?.sidebar?.borderSide ?? "left";
      },
      borderDesign() {
        const borderColor = plat.dashboard?.sidebar?.borderColor ?? "#e2e8f0";
        const borderWidth = plat.dashboard?.sidebar?.borderWidth ?? "4";
        return this.borderSide !== "full"
          ? `transition: border-${this.borderSide} 0.2s ease-in-out, transform 0.2s ease-in-out;border-${this.borderSide}-style: solid;border-${this.borderSide}-color: ${borderColor}; border-${this.borderSide}-width: ${borderWidth}px;`
          : `transition: border 0.2s ease-in-out, transform 0.2s ease-in-out;border-style: solid;border-color: ${borderColor}; border-width: ${
              borderWidth / 2
            }px;`;
      },
    },
    methods: {
      isActive(menu) {
        return this.$route.path === menu.url;
      },
      isParentActive(menu) {
        if (menu.submenu && typeof menu.submenu === "object") {
          return Object.values(menu.submenu).some((subItem) =>
            this.isActive(subItem)
          );
        }
        return false;
      },
    },
  };
</script>

<style scoped>
  .menu-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
</style>
