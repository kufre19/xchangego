<template>
  <div>
    <template v-if="isLoading">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          class="flex-start white dark:gray-800 white dark:gray-800 flex animate-pulse rounded-md border-l-4 border-blue-500 p-4 shadow-md"
        >
          <div
            class="mr-4 mb-4 h-12 w-12 rounded-full border-2 border-blue-500"
          >
            <div class="skeleton h-full w-full rounded-full"></div>
          </div>
          <div class="w-full">
            <div class="skeleton mb-2 h-4 rounded"></div>
            <div class="skeleton mb-2 h-4 rounded"></div>
            <div class="skeleton mb-2 h-4 rounded"></div>
          </div>
        </div>
        <div
          class="flex-start white dark:gray-800 white dark:gray-800 flex animate-pulse rounded-md border-l-4 border-green-500 p-4 shadow-md"
        >
          <div
            class="mr-4 mb-4 h-12 w-12 rounded-full border-2 border-green-500"
          >
            <div class="skeleton h-full w-full rounded-full"></div>
          </div>
          <div class="w-full">
            <div class="skeleton mb-2 h-4 rounded"></div>
            <div class="skeleton mb-2 h-4 rounded"></div>
            <div class="skeleton mb-2 h-4 rounded"></div>
            <div class="skeleton mb-2 h-4 rounded"></div>
            <div class="flex w-full items-center justify-between">
              <div class="skeleton mr-2 h-4 w-1/2 rounded"></div>
              <div class="skeleton h-4 w-1/4 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-else-if="p2pOrderStore.error" class="alert alert-danger">
      <div class="font-bold">{{ $t("Alert") }}!</div>
      <div>{{ p2pOrderStore.error }}</div>
    </div>

    <template v-else>
      <OrderHeader
        :key="p2pOrderStore.order.status"
        :is-loading="isLoading"
        :order="p2pOrderStore.order"
        @close-details="$emit('close-details')"
      />

      <div :key="p2pOrderStore.order.status" class="mt-4">
        <div class="flex justify-center">
          <div class="mx-4 border-b-2 border-gray-300 dark:border-gray-700">
            <button
              class="px-4 py-2 text-sm font-medium focus:outline-none"
              :class="{
                'border-b-2 border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300':
                  currentTab === 'details',
                'text-gray-500 dark:text-gray-400': currentTab !== 'details',
              }"
              @click="currentTab = 'details'"
            >
              {{ $t("Details") }}
            </button>
          </div>
          <div class="mx-4 border-b-2 border-gray-300 dark:border-gray-700">
            <button
              class="px-4 py-2 text-sm font-medium focus:outline-none"
              :class="{
                'border-b-2 border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300':
                  currentTab === 'chat',
                'text-gray-500 dark:text-gray-400': currentTab !== 'chat',
              }"
              @click="currentTab = 'chat'"
            >
              {{ $t("Chat") }}
            </button>
          </div>
          <div
            v-if="p2pOrderStore.order.status !== 'completed'"
            class="mx-4 border-b-2 border-gray-300 dark:border-gray-700"
          >
            <button
              class="px-4 py-2 text-sm font-medium focus:outline-none"
              :class="{
                'border-b-2 border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300':
                  currentTab === 'commands',
                'text-gray-500 dark:text-gray-400': currentTab !== 'commands',
              }"
              @click="currentTab = 'commands'"
            >
              {{ $t("Commands") }}
            </button>
          </div>
        </div>

        <div v-if="currentTab === 'details'" class="mt-4">
          <template v-if="isLoading">
            <div class="card">
              <div class="card-body">
                <div class="skeleton mb-4 h-4 rounded"></div>
                <button class="btn btn-success" disabled>
                  <div class="skeleton h-6 w-64 rounded"></div>
                </button>
                <div class="mt-2 text-sm text-gray-500">
                  <div class="skeleton h-4 rounded"></div>
                </div>
              </div>
            </div>
          </template>
          <OrderDetails
            v-else
            :key="p2pOrderStore.order.status"
            :order="p2pOrderStore.order"
            :is-buyer="isBuyer"
            @transaction-submitted="RefreshOrder()"
            @transaction-confirmed="RefreshOrder()"
          />
        </div>
        <div v-if="currentTab === 'chat'" class="mt-4">
          <Chat
            v-if="!isLoading"
            :order="p2pOrderStore.order"
            :is-buyer="isBuyer"
          />
        </div>
        <div v-if="currentTab === 'commands'" class="mt-4">
          <OrderCommands
            v-if="!isLoading"
            :key="p2pOrderStore.order.status"
            :order="p2pOrderStore.order"
            :is-buyer="isBuyer"
            @request-cancellation="RefreshOrder()"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import OrderHeader from "./components/order/OrderHeader.vue";
  import OrderDetails from "./components/order/OrderDetails.vue";
  import Chat from "./components/order/Chat.vue";
  import OrderCommands from "./components/order/OrderCommands.vue";
  import { useP2PSellerStore } from "../../store/p2p/sellers";
  import { useP2POrderStore } from "../../store/p2p/orders";
  import { useUserStore } from "../../store/user";
  import { ref, onBeforeMount, computed } from "vue";
  import { useRoute } from "vue-router";

  export default {
    components: {
      OrderHeader,
      OrderDetails,
      Chat,
      OrderCommands,
    },
    emits: ["close-details"],

    setup() {
      const userStore = useUserStore();
      const p2pSellerStore = useP2PSellerStore();
      const p2pOrderStore = useP2POrderStore();

      const route = useRoute();
      const isLoading = ref(true);

      const isBuyer = computed(() => {
        return userStore.user
          ? p2pOrderStore.order.buyer_id === userStore.user.id
          : false;
      });

      onBeforeMount(async () => {
        try {
          if (p2pOrderStore.order.id !== route.params.id) {
            p2pOrderStore.order = [];
          }
          if (p2pOrderStore.order.length === 0) {
            await p2pOrderStore.fetchOrder(route.params.id);
          }

          if (p2pSellerStore.allOffers.length === 0) {
            await p2pSellerStore.fetch();
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          isLoading.value = false;
        }
      });

      return {
        userStore,
        p2pSellerStore,
        p2pOrderStore,
        isLoading,
        isBuyer,
      };
    },
    data() {
      return {
        currentTab: "details",
      };
    },
    methods: {
      RefreshOrder() {
        this.p2pOrderStore.fetchOrder(this.$route.params.id);
      },
    },
  };
</script>
