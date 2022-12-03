<script setup>
    import { useDogStore } from '../stores/dogStore'
    import { storeToRefs } from 'pinia'
    import DogCard from './DogCard.vue';

    const dogStore = useDogStore()
    const { dogPictures } = storeToRefs(dogStore)
</script>

<template>
    <div>
        <div v-for="url in dogPictures">
            <DogCard :url="url" />
        </div>
    </div>
</template>

<style scoped>
</style>