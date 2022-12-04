<script setup>
    const props = defineProps({
        letter: String,
    })
</script>

<template>
    <span class="letter-filter">
        {{ letter.toUpperCase() }}
    </span>
</template>

<style scoped>
    .letter-filter {
        font-family: 'Londrina Solid', sans-serif;
        font-weight: 300;
    }
</style>
