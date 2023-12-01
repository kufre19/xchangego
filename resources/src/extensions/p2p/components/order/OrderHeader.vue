<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <!-- Buyer Card -->
    <div
      class="flex-start flex rounded-md border-l-4 border-blue-500 bg-white p-4 shadow-md dark:bg-gray-800"
    >
      <img
        v-lazy="
          order.buyer?.profile_photo_path
            ? '/assets/images/profile/' + order.buyer.profile_photo_path
            : '/assets/images/profile/default.png'
        "
        class="float-left mr-4 mb-4 h-12 w-12 rounded-full border-2 border-blue-500 object-cover"
        alt="Buyer Photo"
      />
      <div>
        <h2 class="mb-2 text-xl font-bold">{{ $t("Buyer") }}</h2>
        <div v-if="!isLoading && order.buyer">
          <p>
            <span class="font-bold">{{ $t("First Name") }}:</span>
            {{ order.buyer.firstname }}
          </p>
          <p>
            <span class="font-bold">{{ $t("Last Name") }}:</span>
            {{ order.buyer.lastname }}
          </p>
          <p>
            <span class="font-bold">{{ $t("Country") }}:</span>
            {{ order.buyer.country }}
          </p>
        </div>
        <div v-else>
          {{ $t("Loading...") }}
        </div>
      </div>
    </div>

    <!-- Seller Card -->
    <div
      class="flex-start flex rounded-md border-l-4 border-green-500 bg-white p-4 shadow-md dark:bg-gray-800"
    >
      <img
        v-lazy="
          order.seller?.user?.profile_photo_path
            ? '/assets/images/profile/' + order.seller.user.profile_photo_path
            : '/assets/images/profile/default.png'
        "
        class="float-left mr-4 mb-4 h-12 w-12 rounded-full border-2 border-green-500 object-cover"
        alt="Seller Photo"
      />
      <div>
        <h2 class="mb-2 text-xl font-bold">{{ $t("Seller") }}</h2>
        <div v-if="!isLoading && order.seller && order.seller.user">
          <p>
            <span class="font-bold">{{ $t("First Name") }}:</span>
            {{ order.seller?.user?.firstname }}
          </p>
          <p>
            <span class="font-bold">{{ $t("Last Name") }}:</span>
            {{ order.seller?.user?.lastname }}
          </p>
          <p>
            <span class="font-bold">{{ $t("Country") }}:</span>
            {{ order.seller?.user?.country }}
          </p>
          <p>
            <span class="font-bold">{{ $t("Completed Orders") }}:</span>
            {{ order.seller?.allTrades }}
          </p>
          <p>
            <span class="mr-2 font-bold">{{ $t("30d Completion Rate") }}:</span>
            <span class="badge bg-success">
              {{ order.seller?.completionRate30d }}%
            </span>
          </p>
        </div>
        <div v-else>
          {{ $t("Loading...") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      order: {
        type: Object,
        required: true,
      },
      isLoading: {
        type: Boolean,
        default: false,
      },
    },
    emits: ["close-details"],
    computed: {
      sellerName() {
        if (this.isLoading) {
          return "Loading...";
        }

        console.log(this.order);
        return this.order.seller && this.order.seller.user
          ? this.order.seller.user.name
          : "N/A";
      },
      ratingEditable() {
        return (
          this.order.seller &&
          this.order.status === "paid" &&
          this.order.seller_id === this.order.seller.id &&
          this.order.rating === null
        );
      },
    },
    methods: {
      async submitRating(rating) {
        if (!this.ratingEditable) {
          return;
        }
        console.log("Submitting rating:", rating);
      },
    },
  };
</script>
