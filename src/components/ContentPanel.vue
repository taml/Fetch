<script setup>
    import { ref, onMounted } from 'vue'
    import { useDogStore } from '../stores/dogStore'
    import { storeToRefs } from 'pinia'
    import DogCard from './DogCard.vue'
    import ContentPagination from './ContentPagination.vue'

    const dogStore = useDogStore()
    const { dogPictures, dogsAreLoading, dogBreedError, getSliceofDogPictures } = storeToRefs(dogStore)
</script>

<template>
    <div v-if="dogsAreLoading">
        Loading!
    </div>
    <div v-else>
        <div v-if="(dogBreedError.length > 0)">
            {{ dogBreedError }}
        </div>
        <div v-else class="grid">
            <div class="grid-item" v-for="url in getSliceofDogPictures">
                <DogCard :url="url" />
            </div>
            <ContentPagination />
        </div>
    </div>
</template>

<style scoped>

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 16px;
    grid-row-gap: 16px;
}

</style>