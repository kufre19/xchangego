<template>
  <div class="floating-robot-container">
    <img
      class="floating-robot robot-hover-animation"
      :src="currentRobotImage"
      alt="Floating Robot"
      @load="onImageLoad"
      @click="onImageClick"
    />
    <transition name="message-box">
      <div v-if="loaded" class="robot-message shadow">
        {{ displayedMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
  import { ref, computed } from "vue";
  import { useNewsStore } from "@/store/news";

  export default {
    setup() {
      const message = ref("I'm your floating robot!");
      const displayedMessage = ref("");
      const loaded = ref(false);
      const robotStatus = ref("idle");
      const firstLoad = ref(true);
      const newsCounter = ref(0);
      const newsStore = useNewsStore();

      const idleImage = "/assets/robot/idle.png";
      const interestedImage = "/assets/robot/interested.png";
      const talkingImage = "/assets/robot/talking.png";
      const wavingImage = "/assets/robot/waving.png";
      const confusedImage = "/assets/robot/confused.png";
      const sleepingImage = "/assets/robot/sleeping.png";

      const currentRobotImage = computed(() => {
        switch (robotStatus.value) {
          case "interested":
            return interestedImage;
          case "talking":
            return talkingImage;
          case "waving":
            return wavingImage;
          case "confused":
            return confusedImage;
          case "sleeping":
            return sleepingImage;
          default:
            return idleImage;
        }
      });

      const typingStart = (messageType = null) => {
        if (messageType === "joke") {
          robotStatus.value = "waving";
          return;
        }
        robotStatus.value = "talking";
      };

      const typingEnd = () => {
        robotStatus.value = "idle";
      };

      const startTyping = (messageType = null) => {
        displayedMessage.value = "";
        let i = 0;
        typingStart(messageType);
        const type = () => {
          if (i < message.value.length) {
            displayedMessage.value += message.value.charAt(i);
            i++;
            setTimeout(type, 50);
          } else {
            typingEnd();

            setTimeout(() => {
              loaded.value = false;
            }, 3000);
          }
        };
        type();
      };

      const getRandomJoke = async () => {
        try {
          const response = await axios.get(
            "https://v2.jokeapi.dev/joke/Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
          );
          if (response.type === "single") {
            message.value = response.joke;
          } else {
            message.value = `${response.setup} ${response.delivery}`;
          }
          startTyping("joke");
        } catch (error) {
          console.error("Error fetching joke:", error);
        }
      };

      const getCryptoNews = async () => {
        if (robotStatus.value !== "idle") return; // Prevent clicking while still writing a message

        try {
          if (newsCounter.value === 0) {
            newsStore.fetch();
          }
          const articles = newsStore.news;
          if (articles.length > 0) {
            const currentArticle = articles[newsCounter.value];
            message.value = `News: ${currentArticle.title}`;
            newsCounter.value = (newsCounter.value + 1) % 20;
          } else {
            message.value = "No crypto news found.";
          }
          startTyping("news");
        } catch (error) {
          console.error("Error fetching crypto news:", error);
        }
      };

      const getBestTradingPairs = async () => {
        try {
          const response = await axios.get(
            "https://api.coingecko.com/api/v3/search/trending"
          );
          console.log(response); // Add this line to debug
          const assets = response.coins;
          if (assets.length > 0) {
            const topAssets = assets
              .slice(0, 3)
              .map((asset) => asset.item.symbol.toUpperCase())
              .join(", ");
            message.value = `Best trading pairs right now: ${topAssets}.`;
          } else {
            message.value = "No trading pairs found.";
          }
          startTyping("trading");
        } catch (error) {
          console.error("Error fetching trading pairs:", error);
        }
      };

      const onImageLoad = () => {
        loaded.value = true;
        if (firstLoad.value) {
          startTyping();
          firstLoad.value = false;
        }
      };
      const onImageClick = () => {
        const randomNumber = Math.random() * 100; // Generate a random number between 0 and 100

        if (randomNumber <= 40) {
          getRandomJoke();
        } else if (randomNumber <= 60) {
          getBestTradingPairs();
        } else {
          getCryptoNews();
        }
      };

      return {
        message,
        loaded,
        robotStatus,
        typingStart,
        typingEnd,
        currentRobotImage,
        displayedMessage,
        onImageClick,
        onImageLoad,
      };
    },
  };
</script>

<style scoped>
  .floating-robot-container {
    position: fixed;
    bottom: 40px;
    right: 20px;
  }

  .floating-robot {
    width: calc(256px / 3);
    height: calc(392px / 3);
    cursor: pointer;
    transition: transform 0.3s, opacity 0.3s;
    opacity: 1;
  }

  .floating-robot:not(.robot-hover-animation):not([src*="idle"]) {
    opacity: 0;
  }

  .robot-message {
    position: absolute;
    width: 200px;
    top: -30px;
    right: 100px;
    padding: 5px;
    background-color: #ffffff;
    border-radius: 5px;
  }
  .robot-hover-animation {
    transition: transform 0.3s;
  }

  .robot-hover-animation:hover {
    transform: scale(1.01) translateY(-2px);
  }

  .message-box-enter-active,
  .message-box-leave-active {
    transition: opacity 0.3s;
  }

  .message-box-enter-from,
  .message-box-leave-to {
    opacity: 0;
  }
</style>
