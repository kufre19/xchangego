<template>
  <div class="mb-5 flex justify-between">
    <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200">
      {{ chatTitle }}
    </h3>
    <router-link to="/support" class="btn btn-outline-secondary"
      ><i class="bi bi-chevron-left"></i> {{ $t("Back") }}</router-link
    >
  </div>
  <div class="card pt-4">
    <div
      ref="chatMessages"
      class="card-body flex-grow overflow-y-auto px-4 pb-4 dark:bg-gray-800"
    >
      <div v-if="messages != null && messages.length > 0" class="space-y-3">
        <div v-for="message in messages" :key="message.id">
          <div :class="messageClass(message.sender_id)">
            <div class="meta mb-1 text-sm text-gray-500 dark:text-gray-400">
              <span
                v-if="message.sender_id !== ticket.user_id"
                class="sender mr-2"
                >{{ message.sender_name }}</span
              >
              <span class="timestamp">{{ formatDate(message.timestamp) }}</span>
            </div>
            <div
              class="content max-w-3/4 inline-block break-words px-4 py-2 shadow-md"
              :class="
                message.sender_id === ticket.user_id
                  ? 'rounded-tl-lg rounded-b-lg bg-blue-500 text-white'
                  : 'rounded-tr-lg rounded-b-lg bg-gray-300 text-gray-700'
              "
            >
              <!-- Update the message.content part in the template -->
              <div v-if="message.type === 'image'">
                <div class="image-container">
                  <div
                    class="image-wrapper"
                    ref="messageImage"
                    @mouseover="isMouseOverImage = true"
                    @mouseout="isMouseOverImage = false"
                    v-html="message.content"
                  ></div>
                  <div class="overlay" @click="showLargeImage(message.content)">
                    <i class="bi bi-zoom-in zoom-icon"></i>
                  </div>
                </div>
              </div>

              <div v-else>{{ message.content }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          class="card-body flex-grow space-y-4 overflow-y-auto px-4 pb-4 dark:bg-gray-800"
        >
          <div class="text-center text-gray-500 dark:text-gray-200">
            {{ $t("No Messages Found!") }}
          </div>
        </div>
      </div>
    </div>
    <form
      v-if="ticket.status != 3"
      class="card-footer flex items-center justify-between"
      @submit.prevent="sendMessage"
    >
      <div class="mt-2">
        <label
          for="image-upload"
          class="text-gray-500 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 cursor-pointer p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <i class="bi bi-image"></i>
        </label>
        <input
          type="file"
          id="image-upload"
          class="hidden"
          @change="uploadImage"
        />
      </div>

      <div class="relative w-full ml-4">
        <input
          v-model="newMessage"
          type="text"
          class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          class="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm dark:focus:ring-blue-800 hover:text-blue-500"
        >
          <i class="bi bi-send"></i>
        </button>
      </div>
    </form>
    <div v-else class="card-footer">
      <div class="relative flex items-center">
        <div class="text-gray-500 dark:text-gray-200">
          {{ $t("This ticket has been closed") }}
        </div>
      </div>
    </div>
  </div>
  <div
    class="large-image-overlay"
    v-show="showingLargeImage"
    @click="hideLargeImage"
  >
    <img :src="largeImageUrl" class="large-image" />
    <button
      class="close-btn absolute top-0 right-0 text-white text-2xl focus:outline-none px-3 py-1 m-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 hover:dark:bg-gray-800"
      @click.stop="hideLargeImage"
    >
      &times;
    </button>
  </div>
</template>

<script>
  import Pusher from "pusher-js";

  export default {
    data() {
      return {
        ticket: [],
        chatTitle: "",
        newMessage: "",
        messages: [],
        uploadedImageUrl: "",
        showingLargeImage: false,
        largeImageUrl: "",
        isMouseOverImage: false,
      };
    },
    created() {
      this.loadTicket();
    },
    methods: {
      showLargeImage(imageHtml) {
        const imageUrl = this.extractImageUrl(imageHtml);
        if (imageUrl) {
          this.showingLargeImage = true;
          this.largeImageUrl = imageUrl;
        }
      },
      hideLargeImage() {
        this.showingLargeImage = false;
      },
      extractImageUrl(htmlString) {
        const div = document.createElement("div");
        div.innerHTML = htmlString;
        const img = div.querySelector("img");
        return img ? img.src : "";
      },
      async uploadImage(event) {
        const file = event.target.files[0];

        if (file) {
          const formData = new FormData();
          formData.append("image", file);

          try {
            const response = await axios.post(
              "/user/support/tickets/upload-image",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            if (response.status === "success") {
              this.uploadedImageUrl = response.image_url;
              this.sendImage(); // Send the image immediately after the upload is successful
            } else {
              this.$toast.error(response.message);
            }
          } catch (error) {
            console.error(error);
          }
        }
      },

      sendImage() {
        if (this.uploadedImageUrl) {
          const message = {
            ticket_id: this.ticket.id,
            sender_name: this.ticket.user.username,
            type: "image",
            content: `<img src="${this.uploadedImageUrl}" class="uploaded-image" />`,
            timestamp: new Date().toISOString(),
          };

          // Send a POST request to the server to save the message
          axios.post(`/user/support/tickets/${this.ticket.id}/send`, {
            data: message,
          });

          this.uploadedImageUrl = "";

          // Add this block to add the click event listener to the image
          this.$nextTick(() => {
            const images = this.$el.querySelectorAll(".uploaded-image");
            const lastImage = images[images.length - 1];
            if (lastImage) {
              lastImage.addEventListener("click", this.expandImage);
            }
          });
        }
      },

      expandImage(event) {
        const image = event.target;
        image.classList.toggle("expanded");

        if (image.classList.contains("expanded")) {
          image.style.maxWidth = "90%";
          image.style.cursor = "zoom-out";
        } else {
          image.style.maxWidth = "100%";
          image.style.cursor = "zoom-in";
        }
      },
      async loadTicket() {
        await axios
          .get(`/user/support/tickets/${this.$route.params.id}/messages`)
          .then((response) => {
            if (response.type == "success") {
              this.ticket = response.ticket;
              this.messages = Array.isArray(response.ticket.messages)
                ? response.ticket.messages
                : [];
            } else {
              this.$toast.error(response.message);
              this.$router.push("/support");
            }
          })
          .catch((error) => {
            console.error(error);
          });

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

        const channelName = `support-private-chat-${this.ticket.id}`;
        const channel = pusher.subscribe(channelName);

        channel.bind("new_message", (message) => {
          this.messages.push(message);
        });

        this.chatTitle = `Ticket #${this.ticket.id}`;
      },
      messageClass(senderId) {
        return senderId === this.ticket.user_id
          ? "my-message text-right"
          : "other-message text-left";
      },

      sendMessage() {
        if (this.newMessage.trim() === "") {
          return;
        }
        const message = {
          ticket_id: this.ticket.id,
          sender_name: this.ticket.user.username,
          content: this.newMessage.trim(),
          type: "text",
          timestamp: new Date().toISOString(),
        };

        // Ensure this.messages is an array
        if (!Array.isArray(this.messages)) {
          this.messages = [];
        }

        // Send a POST request to the server to save the message
        axios.post(`/user/support/tickets/${this.ticket.id}/send`, {
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
<style scoped>
  .image-wrapper {
    display: inline-block;
    max-width: 200px;
    max-height: 200px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }

  .image-wrapper img {
    max-width: 100%;
    max-height: 100%;
  }

  .zoom-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .image-wrapper:hover .zoom-overlay {
    opacity: 1;
  }

  .large-image-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .large-image-overlay img {
    max-width: 90%;
    max-height: 90%;
    cursor: pointer;
  }

  .uploaded-image {
    max-width: 100%;
    cursor: zoom-in;
    transition: max-width 0.3s ease;
  }

  .expanded {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    max-height: 90%;
    overflow-y: auto;
  }
  .image-container {
    position: relative;
    display: inline-block;
  }

  .image-container:hover .overlay {
    opacity: 1;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .zoom-icon {
    font-size: 2rem;
    color: white;
  }
</style>
