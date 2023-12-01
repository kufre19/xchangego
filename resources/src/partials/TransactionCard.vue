<!-- TransactionCard.vue -->
<template>
    <div class="card">
        <div class="card-header">
            <h4 class="card-title">
                <div class="title-gradient">
                    {{ title }}
                </div>
            </h4>
        </div>
        <div style="max-height: 280px; overflow-y: auto">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "TransactionCard",
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>
