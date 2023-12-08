import { defineStore } from "pinia";

export const useKnowledgeStore = defineStore("knowledge", {
    state: () => ({
        categories: [],
        popularArticles: [],
        isLoading: true,
    }),

    actions: {
        async fetch() {
            await axios
                .get("/user/knowledge")
                .then((response) => {
                    (this.categories = response.categories),
                        (this.popularArticles = response.popularArticles);
                })
                .catch((error) => {})
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },
    persist: true,
});
