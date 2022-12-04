<script setup>
    import { useDogStore } from '../stores/dogStore'
    import { storeToRefs } from 'pinia'
    const dogStore = useDogStore()
    const { dogBreed, dogSubBreed } = storeToRefs(dogStore)
</script>

<template>
    <header>
        <h1 v-if="dogBreed.length > 0">{{ dogBreed }}<span v-if="dogSubBreed.length > 0"> / {{ dogSubBreed }}</span></h1>
    </header>
</template>

<style scoped>
</style>