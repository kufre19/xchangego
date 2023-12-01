<template>
  <transition
    name="modal"
    mode="out-in"
    enter-active-class="modal-enter-active"
    leave-active-class="modal-leave-active"
  >
    <Modal :popup="popup" @close="closePopup(popup.id)">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ popup.title }}</h2>
          <button class="focus:outline-none" @click.stop="closePopup(popup.id)">
            <i class="fas fa-times text-gray-800 dark:text-gray-200"></i>
          </button>
        </div>
      </template>
      <template #body>
        <div v-if="popup.image">
          <img
            :src="'/assets/images/popup/' + popup.image"
            :alt="popup.title"
            class="w-full h-auto"
          />
        </div>
        <div v-if="popup.msg">
          <p class="text-sm" v-html="popup.msg"></p>
        </div>
      </template>
      <template #footer>
        <div class="flex items-center justify-between">
          <div class="flex items-center mr-4">
            <input
              id="red-checkbox"
              :checked="popup.status"
              type="checkbox"
              value=""
              class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              @click="disablePopup(popup.id)"
            />
            <label
              for="red-checkbox"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 mt-2"
              >{{ $t("Disable Popup") }}</label
            >
          </div>
          <a
            :href="popup.link"
            class="btn btn-outline-info"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ $t("Learn More") }}
          </a>
        </div>
      </template>
    </Modal>
  </transition>
</template>
<script>
  import { Modal } from "flowbite-vue";
  export default {
    components: {
      Modal,
    },
    props: {
      popup: {
        type: Object,
        required: true,
      },
    },
    emits: ["close", "disable"],
    methods: {
      closePopup(id) {
        this.$emit("close", id);
      },
      disablePopup(id) {
        this.$emit("disable", id);
      },
    },
  };
</script>
