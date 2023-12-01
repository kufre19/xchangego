<template>
    <div>
        <div
            class="mt-5 flex items-center justify-between py-1 px-3 text-sm font-medium uppercase text-gray-500 dark:text-gray-400"
        >
            <h3>{{ $t("Tags") }}</h3>
        </div>
        <hr class="border-gray-200 dark:border-gray-700" />

        <div class="p-2">
            <span
                v-for="(tag, index) in tags"
                :key="index"
                class="mr-2 mb-2 inline-flex items-center px-1 py-1 text-sm font-medium"
                :class="{
                    'rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300':
                        activeTag === tag,
                    ' rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200':
                        activeTag !== tag,
                }"
                @click="filterByTag(tag)"
            >
                {{ tag }}
                <button
                    v-if="activeTag === tag"
                    type="button"
                    class="ml-2 inline-flex items-center rounded-sm bg-transparent p-0.5 text-sm text-indigo-400 hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300"
                    aria-label="Remove"
                    @click.stop="removeTag(tag)"
                >
                    <svg
                        aria-hidden="true"
                        class="h-3.5 w-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                    <span class="sr-only">Remove badge</span>
                </button>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tags: {
            type: Array,
            required: true,
        },
        activeTag: {
            type: String,
            required: false,
        },
    },
    emits: ["filterByTag", "removeTag"],
    methods: {
        filterByTag(tag) {
            this.$emit("filterByTag", tag);
        },
        removeTag() {
            this.$emit("removeTag");
        },
    },
};
</script>
