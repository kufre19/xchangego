import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        kyc: null,
        kyc_application: null,
        popups: null,
        user: null,
        role: null,
        currency: null,
        menu: [],
        toggledMenu: null,
        sidebarCollapsed: true,
        page: null,
    }),

    actions: {
        async fetch() {
            await axios
                .post("/user/fetch/data")
                .then((response) => {
                    this.kyc = response.kyc;
                    this.kyc_application = response.kyc_application;
                    this.popups = response.popups;
                    this.user = response.user;
                    this.role = response.role;
                    this.currency = response.currency;
                })
                .catch((error) => {
                    console.error("Error in fetch:", error);
                });
        },

        async AddPracticeBalance() {
            await axios
                .post("/user/binary/add/practice/balance")
                .then((response) => {
                    $toast[response.type](response.message);
                })
                .catch((error) => {
                    $toast.error(error.response.data.message);
                })
                .finally(() => {
                    this.user.practice_balance = 10000;
                });
        },
        toggleMenu(menu) {
            if (this.toggledMenu != null) {
                if (this.toggledMenu.name == menu.name) {
                    this.toggledMenu.showSub = !this.toggledMenu.showSub;
                    if (!this.toggledMenu.showSub) {
                        this.toggledMenu = null;
                    }
                } else {
                    this.toggledMenu.showSub = false;
                    this.toggledMenu = menu;
                    this.toggledMenu.showSub = true;
                }
            } else {
                this.toggledMenu = menu;
                this.toggledMenu.showSub = true;
            }
        },

        getUserId() {
            return this.user.id;
        },
    },
    persist: true,
});
