<template>
    <div
        class="group relative"
        @mouseover="showMS = true"
        @mouseleave="showMS = false"
    >
        <input
            v-model="localRange"
            type="range"
            min="0"
            max="100"
            step="1"
            class="w-full"
            :style="{
                background: `linear-gradient(to right, #fff 0%, #fff ${localRange}%, rgb(255 255 255 / 0.2) ${localRange}%, rgb(255 255 255 / 0.2) 100%)`,
            }"
            @change="calculatePercentage()"
        />
        <div class="mt-1 flex w-full justify-between px-1">
            <RangeButton
                v-for="percentage in [0, 25, 50, 75, 100]"
                :key="percentage"
                :range="localRange"
                :percentage="percentage"
                @calculate="calculatePercentageButton"
            />
        </div>
        <div
            :class="{ hidden: !showMS }"
            class="bg-primary absolute origin-bottom scale-y-0 rounded-md py-1 px-2 text-xs transition-transform duration-200 ease-in group-hover:scale-100"
            style="top: -30px"
            :style="'left: ' + (localRange - 10) + '%'"
        >
            {{ localRange }}%
        </div>
    </div>
</template>

<script>
import RangeButton from "./RangeButton.vue";

export default {
    components: {
        RangeButton,
    },
    props: {
        range: [Number, String],
    },
    emits: ["calculatePercentage"],
    data() {
        return {
            localRange: this.range,
            showMS: false,
        };
    },
    watch: {
        range(newVal) {
            this.localRange = newVal;
        },
    },
    methods: {
        calculatePercentage() {
            this.$emit("calculatePercentage", this.localRange);
        },
        calculatePercentageButton(percentage) {
            this.localRange = percentage;
            this.$emit("calculatePercentage", percentage);
        },
    },
};
</script>
