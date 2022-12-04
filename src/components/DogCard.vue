<script setup>
    const props = defineProps({
        url: String,
    })
</script>

<template>
    <div>
        <img class="card-img" :src="url" alt=""/>
    </div>
</template>

<style scoped>

    .card-img {
        width: 100%;
    }
</style>