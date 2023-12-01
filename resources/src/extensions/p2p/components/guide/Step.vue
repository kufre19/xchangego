<template>
  <div
    class="rounded-lg border-l-4 bg-white px-6 py-4 shadow-md dark:bg-gray-800"
    :class="borderColor"
  >
    <div
      class="flex h-12 w-12 items-center justify-center rounded-md text-white"
      :class="badgeColor"
    >
      {{ stepNumber }}
    </div>
    <div class="mt-4">
      <h3
        class="text-lg font-bold leading-tight text-gray-900 dark:text-gray-100"
      >
        {{ title }}
      </h3>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Step",
    props: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      stepNumber: {
        type: [Number, String],
        required: true,
        validator: (value) => {
          const num = parseInt(value);
          return !isNaN(num) && num >= 1 && num <= 999;
        },
      },
    },
    computed: {
      badgeColor() {
        const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500"];
        return colors[(this.stepNumber - 1) % colors.length];
      },
      borderColor() {
        const colors = [
          "border-blue-500",
          "border-green-500",
          "border-yellow-500",
        ];
        return colors[(this.stepNumber - 1) % colors.length];
      },
    },
  };
</script>
