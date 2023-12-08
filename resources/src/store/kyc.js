import { defineStore } from "pinia";

export const useKycStore = defineStore("kyc", {
    state: () => ({
        options: null,
        countries: null,
    }),

    actions: {
        async fetch() {
            await axios
                .post("/user/fetch/kyc/data")
                .then((response) => {
                    if (response.type == "success") {
                        this.options = response.options;
                        this.countries = response.countries;
                    } else {
                        $toast.error(response.message);
                    }
                })
                .catch((error) => {
                    console.error("Error in fetch:", error);
                });
        },
    },
    persist: true,
});
