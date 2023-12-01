<template>
  <transition
    name="modal"
    mode="out-in"
    enter-active-class="modal-enter-active"
    leave-active-class="modal-leave-active"
  >
    <Modal :class="{ hidden: !showModal }" size="2xl" @close="$emit('cancel')">
      <template #header>{{ $t("Confirm Execution") }}</template>
      <template #body>
        <slot></slot>
      </template>
      <template #footer>
        <div class="text-end">
          <button
            type="button"
            class="btn btn-outline-primary mr-2"
            @click="$emit('confirm')"
          >
            {{ $t("Confirm") }}
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="$emit('cancel')"
          >
            {{ $t("Close") }}
          </button>
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
      showModal: {
        type: Boolean,
        default: true,
      },
    },
    emits: ["confirm", "cancel"],
  };
</script>
