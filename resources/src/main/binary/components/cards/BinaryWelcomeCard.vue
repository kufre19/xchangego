<template>
  <div class="card">
    <div class="card-body">
      <div class="flex justify-between">
        <div>
          <p class="text-lg font-medium text-gray-900 dark:text-white">
            {{ $t("Welcome") }} 🎉
            {{ firstname }}
          </p>
          <p class="font-small text-sm text-gray-900 dark:text-white">
            {{ $t("You have earned") }}
          </p>
          <p class="mb-2 mt-5 text-2xl text-blue-600">
            <a href="#" class="text-dark mr-2"
              ><toMoney :num="amount" decimals="2" /><span>{{
                symbol
              }}</span></a
            >
          </p>
          <router-link :to="route" type="button" class="btn btn-primary">
            {{ title }}
          </router-link>
        </div>
        <img
          src="/assets/images/illustration/badge.svg"
          class="congratulation-medal"
          alt="Medal Pic"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import toMoney from "@/partials/toMoney.vue";
  export default {
    name: "BinaryWelcomeCard",
    components: {
      toMoney,
    },
    props: {
      firstname: {
        type: String,
        default: "",
      },
      amount: {
        type: Number,
        default: 0,
      },
      symbol: {
        type: String,
        default: "",
      },
      title: {
        type: String,
        default: "",
      },
      route: {
        type: String,
        default: "",
      },
    },
  };
</script>
