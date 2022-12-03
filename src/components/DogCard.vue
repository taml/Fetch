<script setup>
    const props = defineProps({
        url: String,
    })
</script>

<template>
    <div>
        <img :src="url" alt=""/>
    </div>
</template>

<style scoped>
</style>