<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        class="css-3kwgah"
        style="
            margin: 0px;
            min-width: 0px;
            font-size: 24px;
            width: 1em;
            height: 1em;
        "
    >
        <path :d="path1" :fill="fill1"></path>
        <path :d="path2" :fill="fill2"></path>
        <path :d="path3" fill="currentColor"></path>
    </svg>
</template>

<script>
export default {
    name: "NewSvg",
    props: {
        path1: {
            type: String,
            required: true,
        },
        path2: {
            type: String,
            required: false,
        },
        path3: {
            type: String,
            required: true,
        },
        fill1: {
            type: String,
            required: true,
        },
        fill2: {
            type: String,
            required: true,
        },
    },
};
</script>
