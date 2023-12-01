<template>
    <div>
        <span
            v-for="index in maxStars"
            :key="index"
            class="star"
            @click="selectRating(index)"
            @mouseover="hoverRating(index)"
            @mouseout="resetRating"
        >
            <i :class="starClass(index)"></i>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        rating: {
            type: Number,
            default: 0,
        },
        maxStars: {
            type: Number,
            default: 5,
        },
        readOnly: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["rating-selected"],
    data() {
        return {
            tempRating: null,
        };
    },
    methods: {
        selectRating(rating) {
            if (!this.readOnly) {
                this.$emit("rating-selected", rating);
            }
        },
        hoverRating(index) {
            if (!this.readOnly) {
                this.tempRating = index;
            }
        },
        resetRating() {
            if (!this.readOnly) {
                this.tempRating = null;
            }
        },
        starClass(index) {
            const iconName =
                index <= (this.tempRating || this.rating)
                    ? "bi-star-fill"
                    : "bi-star";
            const baseClass = "text-xl";
            const hoverClass = !this.readOnly ? "hover:text-yellow-500" : "";
            return [iconName, baseClass, hoverClass];
        },
    },
};
</script>

<style scoped>
.star {
    cursor: pointer;
    margin-right: 4px;
}
</style>
