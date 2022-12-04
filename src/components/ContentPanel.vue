<script setup>
    import { ref, onMounted } from 'vue'
    import { useDogStore } from '../stores/dogStore'
    import { storeToRefs } from 'pinia'
    import DogCard from './DogCard.vue'

    const dogStore = useDogStore()
    const { dogPictures, dogsAreLoading, dogBreedError } = storeToRefs(dogStore)

</script>

<template>
    <div v-if="dogsAreLoading">
        Loading!
    </div>
    <div v-else class="grid">
        <div v-if="(dogBreedError.length > 0)">
            {{ dogBreedError }}
        </div>
        <div v-else class="grid-item" v-for="url in dogPictures">
            <DogCard :url="url" />
        </div>
    </div>
</template>

<style scoped>
</style>