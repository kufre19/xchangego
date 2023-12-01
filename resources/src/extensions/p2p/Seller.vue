<template>
  <div v-if="seller.isSeller">
    <h1 class="mb-4 text-3xl font-bold">
      {{ $t("Seller Dashboard") }}
    </h1>
    <div class="mb-6">
      <seller-statistics :statistics="seller.statistics" />
    </div>
    <div>
      <div class="mb-6 flex space-x-2">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          class="rounded-md bg-gray-200 py-2 px-4 text-sm font-semibold text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-300 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          :class="{
            'border-l-4 border-blue-500 bg-white dark:border-blue-600 dark:bg-gray-800':
              activeTab === index,
          }"
          @click="activeTab = index"
        >
          {{ tab.name }}
        </button>
      </div>

      <div v-if="activeTab === 0">
        <seller-offers />
      </div>
      <div v-if="activeTab === 1">
        <seller-open-orders :open-orders="seller.openOrders" />
      </div>
      <div v-if="activeTab === 2">
        <seller-closed-orders :closed-orders="seller.closedOrders" />
      </div>
      <div v-if="activeTab === 3">
        <seller-payment-methods
          :payment-methods="seller.methods"
          :fiat="seller.fiat"
          @created="seller.fetch"
          @deleted="seller.fetch"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <seller-application :seller="seller" @applied="seller.fetch" />
  </div>
</template>

<script>
  import { useP2PSellerStore } from "../../store/p2p/sellers";
  import SellerOffers from "./components/seller/offers.vue";
  import SellerOpenOrders from "./components/seller/open-orders.vue";
  import SellerClosedOrders from "./components/seller/closed-orders.vue";
  import SellerPaymentMethods from "./components/seller/payment-methods.vue";
  import SellerStatistics from "./components/seller/SellerStatistics.vue";
  import SellerApplication from "./components/seller/SellerApplication.vue";

  export default {
    name: "Seller",
    components: {
      SellerOffers,
      SellerOpenOrders,
      SellerClosedOrders,
      SellerPaymentMethods,
      SellerStatistics,
      SellerApplication,
    },
    setup() {
      const seller = useP2PSellerStore();
      seller.fetch();

      return { seller };
    },

    data() {
      return {
        activeTab: 0,
        tabs: [
          { name: "Offers" },
          { name: "Open Orders" },
          { name: "Closed Orders" },
          { name: "Payment Methods" },
        ],
      };
    },
  };
</script>
