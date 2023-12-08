<template>
    <div class="card bg-white text-center dark:bg-gray-800">
        <div class="card-body">
            <div class="icon-background bg-primary mb-1 dark:bg-yellow-400">
                <i :class="icon"></i>
            </div>
            <h2 class="font-medium text-black dark:text-white">
                <toMoney :num="amount" decimals="2" />
                {{ symbol }}
            </h2>
            <p class="card-text text-gray-500 dark:text-gray-400">
                {{ titleText }}
            </p>
        </div>
    </div>
</template>

<script>
import toMoney from "@/partials/toMoney.vue";

export default {
    components: {
        toMoney,
    },
    props: {
        icon: {
            type: String,
            required: true,
        },
        amountKey: {
            type: String,
            required: true,
        },
        titleText: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        symbol: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.icon-background {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
}
</style>
