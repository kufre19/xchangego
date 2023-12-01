<template>
    <div
        class="modal fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center"
        @click.self="closeModal"
    >
        <div
            class="modal-overlay absolute h-full w-full bg-gray-900 opacity-50"
        ></div>

        <div
            class="modal-container z-50 mx-auto w-11/12 overflow-y-auto rounded bg-white shadow-lg md:max-w-md"
        >
            <div class="modal-content py-4 px-6 text-left">
                <div class="flex items-center justify-between pb-3">
                    <p class="text-2xl font-bold">{{ title }}</p>
                    <div
                        class="modal-close z-50 cursor-pointer"
                        @click="closeModal"
                    >
                        <svg
                            class="fill-current text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                        >
                            <path
                                d="M18 1.8L16.2 0 9 7.2 1.8 0 0 1.8l7.2 7.2L0 16.2 1.8 18l7.2-7.2 7.2 7.2 1.8-1.8-7.2-7.2z"
                            />
                        </svg>
                    </div>
                </div>

                <div class="my-5">
                    <p>{{ message }}</p>
                </div>

                <div class="flex justify-end pt-2">
                    <button
                        class="modal-close rounded-lg bg-gray-400 p-3 px-4 text-black hover:bg-gray-300"
                        @click="closeModal"
                    >
                        {{ closeText }}
                    </button>
                    <button
                        class="ml-3 rounded-lg bg-indigo-500 p-3 px-4 text-white hover:bg-indigo-400"
                        @click="$emit('confirm')"
                    >
                        {{ confirmText }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Modal",
    props: {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        closeText: {
            type: String,
            default: "Cancel",
        },
        confirmText: {
            type: String,
            default: "Confirm",
        },
    },
    emits: ["close-modal", "confirm"],
    methods: {
        closeModal() {
            this.$emit("close-modal");
        },
    },
};
</script>
