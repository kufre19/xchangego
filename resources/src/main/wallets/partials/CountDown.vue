<template>
  <div class="base-timer">
    <svg
      class="base-timer__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="base-timer__circle">
        <circle
          class="base-timer__path-elapsed"
          cx="50"
          cy="50"
          r="45"
        ></circle>
        <path
          :d="remainingPath"
          :stroke-dasharray="circleDasharray"
          :class="['base-timer__path-remaining', remainingPathColor]"
        ></path>
      </g>
    </svg>
    <span class="base-timer__label">{{ formattedTime }}</span>
  </div>
</template>

<script>
  import { ref, computed, watch, onMounted } from "vue";

  export default {
    props: {
      time: {
        type: Number,
        default: 1800,
      },
    },
    setup(props) {
      const FULL_DASH_ARRAY = 283;
      const WARNING_THRESHOLD = 10;
      const ALERT_THRESHOLD = 5;

      const COLOR_CODES = {
        info: {
          color: "green",
        },
        warning: {
          color: "orange",
          threshold: WARNING_THRESHOLD,
        },
        alert: {
          color: "red",
          threshold: ALERT_THRESHOLD,
        },
      };

      let timePassed = ref(0);
      let timeLeft = ref(props.time);
      let timerInterval = null;
      let remainingPathColor = ref(COLOR_CODES.info.color);

      const remainingPath = ref(`
        M 50, 50
        m -45, 0
        a 45,45 0 1,0 90,0
        a 45,45 0 1,0 -90,0
      `);

      const formattedTime = computed(() => {
        const minutes = Math.floor(timeLeft.value / 60);
        let seconds = timeLeft.value % 60;

        if (seconds < 10) {
          seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
      });

      function onTimesUp() {
        clearInterval(timerInterval);
      }

      function startTimer() {
        timerInterval = setInterval(() => {
          timePassed.value += 1;
          timeLeft.value = props.time - timePassed.value;
          setRemainingPathColor(timeLeft.value);

          if (timeLeft.value === 0) {
            onTimesUp();
          }
        }, 1000);
      }

      function setRemainingPathColor(time) {
        const { alert, warning, info } = COLOR_CODES;
        if (time <= alert.threshold) {
          remainingPathColor.value = alert.color;
        } else if (time <= warning.threshold) {
          remainingPathColor.value = warning.color;
        } else {
          remainingPathColor.value = info.color;
        }
      }

      function calculateTimeFraction() {
        const rawTimeFraction = timeLeft.value / props.time;
        return rawTimeFraction - (1 / props.time) * (1 - rawTimeFraction);
      }

      const circleDasharray = computed(() => {
        return `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
      });

      onMounted(() => {
        startTimer();
      });

      watch(
        () => props.time,
        () => {
          timePassed.value = 0;
          timeLeft.value = props.time;
          startTimer();
        }
      );

      return {
        remainingPath,
        remainingPathColor,
        formattedTime,
        circleDasharray,
      };
    },
  };
</script>
<style>
  .base-timer {
    position: relative;
    width: 100px;
    height: 100px;
  }

  .base-timer__svg {
    transform: scaleX(-1);
  }

  .base-timer__circle {
    fill: none;
    stroke: none;
  }

  .base-timer__path-elapsed {
    stroke-width: 7;
    stroke: rgba(255, 255, 255, 0.095);
  }

  .base-timer__path-remaining {
    stroke-width: 7;
    stroke-linecap: round;
    transform-origin: center;
    transition: 1s all;
  }

  .base-timer__path-remaining.green {
    stroke: #4dc3ff;
  }

  .base-timer__path-remaining.orange {
    stroke: orange;
  }

  .base-timer__path-remaining.red {
    stroke: red;
  }

  .base-timer__label {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
</style>
