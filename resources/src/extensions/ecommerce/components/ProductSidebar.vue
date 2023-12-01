<template>
    <aside ref="asideElement" aria-label="Sidebar">
        <div class="h-full overflow-y-auto">
            <slot></slot>
        </div>
    </aside>
</template>

<script>
export default {
    name: "ProductSidebar",
};
</script>
