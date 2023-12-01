<template>
  <div
    v-if="order.status === 'completed'"
    :key="order.status"
    class="alert alert-success"
    role="alert"
  >
    <strong class="font-bold">{{ $t("Success!") }}</strong>
    <span class="block sm:inline">{{
      $t("Payment has been confirmed, and the order is completed.")
    }}</span>
  </div>
  <div
    v-if="order.status === 'cancelled'"
    :key="order.status"
    class="alert alert-danger"
    role="alert"
  >
    <strong class="font-bold">{{ $t("Alert!") }}</strong>
    <span class="block sm:inline">{{
      $t("The order has been cancelled.")
    }}</span>
  </div>
  <div v-else>
    <div class="card">
      <div class="card-header">
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200">
          {{ chatTitle }}
        </h3>
      </div>
      <div
        ref="chatMessages"
        class="card-body flex-grow space-y-4 overflow-y-auto p-4 dark:bg-gray-800"
      >
        <div v-for="message in messages" :key="message.id">
          <div :class="messageClass(message.sender_id)">
            <div class="meta mb-1 text-sm text-gray-500 dark:text-gray-400">
              <span v-if="message.sender_id !== myUserId" class="sender mr-2">{{
                message.sender_name
              }}</span>
              <span class="timestamp">{{ formatDate(message.timestamp) }}</span>
            </div>
            <div
              class="content max-w-3/4 inline-block break-words px-4 py-2 shadow-md"
              :class="
                message.sender_id === myUserId
                  ? 'rounded-t-lg rounded-bl-lg bg-blue-500 text-white'
                  : 'rounded-t-lg rounded-br-lg bg-gray-300 text-gray-700'
              "
            >
              {{ message.content }}
            </div>
          </div>
        </div>
      </div>
      <form class="card-footer" @submit.prevent="sendMessage">
        <div class="relative flex items-center">
          <input
            v-model="newMessage"
            type="text"
            class="w-full rounded-lg border border-gray-300 bg-gray-100 py-2 pl-4 pr-10 text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            class="absolute right-0 top-0 px-4 py-2 text-gray-500 hover:text-blue-500 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400"
          >
            {{ $t("Send") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Pusher from "pusher-js";
  import { useUserStore } from "../../../../store/user";

  export default {
    props: {
      order: {
        type: Object,
        required: true,
      },
      isBuyer: {
        type: Boolean,
        required: true,
      },
    },
    setup() {
      const userStore = useUserStore();
      return {
        myUserId: userStore.user.id,
      };
    },
    data() {
      return {
        chatTitle: "",
        newMessage: "",
        messages: [],
      };
    },
    created() {
      const pusher = new Pusher(PUSHER_APP_KEY, {
        cluster: PUSHER_APP_CLUSTER,
        forceTLS: true,
        authEndpoint: "/user/pusher/auth",
        auth: {
          headers: {
            "X-CSRF-Token": document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute("content"),
          },
          beforeSend: function (xhr) {
            xhr.setRequestHeader(
              "X-CSRF-Token",
              document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content")
            );
          },
        },
      });

      const channelName = `private-chat-${this.order.id}`;
      const channel = pusher.subscribe(channelName);

      channel.bind("new_message", (message) => {
        this.messages.push(message);
      });

      this.chatTitle = `Chat with ${this.order.seller.user.username}`;
      this.loadMessages(); // Load old messages
    },
    methods: {
      messageClass(senderId) {
        return senderId === this.myUserId
          ? "my-message text-right"
          : "other-message text-left";
      },
      loadMessages() {
        axios
          .get(`/user/p2p/orders/${this.order.id}/chat`)
          .then((response) => {
            // Ensure you're assigning an array to this.messages
            this.messages = Array.isArray(response) ? response : [];
          })
          .catch((error) => {
            console.error(error);
          });
      },

      sendMessage() {
        if (this.newMessage.trim() === "") {
          return;
        }
        const senderName = this.isBuyer
          ? this.order.buyer.username
          : this.order.seller.user.username;

        const message = {
          order_id: this.order.id,
          sender_name: senderName,
          content: this.newMessage.trim(),
          timestamp: new Date().toISOString(),
        };

        // Ensure this.messages is an array
        if (!Array.isArray(this.messages)) {
          this.messages = [];
        }

        // Send a POST request to the server to save the message
        axios.post(`/user/p2p/orders/${this.order.id}/chat`, {
          data: message,
        });

        this.newMessage = "";
      },
      formatDate(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = Math.floor(seconds / 31536000);

        if (interval >= 1) {
          return `${interval} year${interval === 1 ? "" : "s"} ago`;
        }
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          return `${interval} month${interval === 1 ? "" : "s"} ago`;
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          return `${interval} day${interval === 1 ? "" : "s"} ago`;
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          return `${interval} hour${interval === 1 ? "" : "s"} ago`;
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
          return `${interval} minute${interval === 1 ? "" : "s"} ago`;
        }
        return "just now";
      },
    },
  };
</script>
