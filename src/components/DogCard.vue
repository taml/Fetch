<script setup>
    const props = defineProps({
        url: String,
    })
</script>

<template>
    <div class="card-container">
        <img class="card-img" :src="url" alt=""/>
    </div>
</template>

<style scoped>
    .card-container {
        width: 100%;
        border-radius: 10px;
    }

    .card-img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        transition-timing-function: ease-in;
        transition: 0.5s;
        box-shadow: 0 4px 16px rgba(1, 50, 87, 0.3);
    }

    .card-img:hover {
        -webkit-transform: scale(1.05);
        transform: scale(1.05);
    }
</style>