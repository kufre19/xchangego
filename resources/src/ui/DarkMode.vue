<template>
    <button
        id="theme-toggle"
        data-tooltip-target="tooltip-toggle"
        type="button"
        class="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        @click="toggleTheme"
    >
        <svg
            v-if="isDarkMode"
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            ></path>
        </svg>
        <svg
            v-else
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fill-rule="evenodd"
                clip-rule="evenodd"
            ></path>
        </svg>
    </button>
    <div
        id="tooltip-toggle"
        role="tooltip"
        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 py-2 px-3 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
    >
        Toggle {{ isDarkMode ? "light" : "dark" }} mode
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
</template>

<script>
export default {
    emits: ["change-theme"],
    data() {
        return {
            isDarkMode: false,
        };
    },
    mounted() {
        this.localStorageAvailable = this.storageAvailable("localStorage");
        this.setTheme();
    },
    methods: {
        toggleTheme() {
            if (this.localStorageAvailable) {
                this.isDarkMode = !this.isDarkMode;
                localStorage.setItem(
                    "color-theme",
                    this.isDarkMode ? "dark" : "light"
                );
                this.setTheme();
                this.$emit("change-theme", this.isDarkMode ? "dark" : "light");
            }
        },
        setTheme() {
            if (this.localStorageAvailable) {
                this.isDarkMode =
                    localStorage.getItem("color-theme") === "dark";
            } else {
                this.isDarkMode = window.matchMedia(
                    "(prefers-color-scheme: dark)"
                ).matches;
            }
            document.documentElement.classList.toggle("dark", this.isDarkMode);
        },
        storageAvailable(type) {
            let storage;
            try {
                storage = window[type];
                const x = "__storage_test__";
                storage.setItem(x, x);
                storage.removeItem(x);
                return true;
            } catch (e) {
                return (
                    e instanceof DOMException &&
                    (e.code === 22 ||
                        e.code === 1014 ||
                        e.name === "QuotaExceededError" ||
                        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                    storage &&
                    storage.length !== 0
                );
            }
        },
    },
};
</script>
