<template>
  <div class="overlay" v-if="loading">
    <svg
      class="animate-circles"
      width="100"
      height="20"
      viewBox="0 0 100 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="5" r="3" fill="white" />
      <circle cx="40" cy="5" r="3" fill="lightblue" />
      <circle cx="50" cy="5" r="3" fill="skyblue" />
      <circle cx="60" cy="5" r="3" fill="cornflowerblue" />
      <circle cx="70" cy="5" r="3" fill="dodgerblue" />
    </svg>
  </div>
</template>
<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
<style scoped>
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }

  @keyframes move {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(5px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .animate-circles circle {
    animation-name: move;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  .animate-circles circle:nth-child(2) {
    animation-delay: 0.15s;
  }

  .animate-circles circle:nth-child(3) {
    animation-delay: 0.3s;
  }

  .animate-circles circle:nth-child(4) {
    animation-delay: 0.45s;
  }

  .animate-circles circle:nth-child(5) {
    animation-delay: 0.6s;
  }
</style>
