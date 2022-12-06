<script setup>
    import { ref, onMounted } from 'vue'
    import { useDogStore } from '../stores/dogStore'
    import { storeToRefs } from 'pinia'
    import DogCard from './DogCard.vue'
    import ContentPagination from './ContentPagination.vue'

    const dogStore = useDogStore()
    const { dogsAreLoading, dogBreedError, getSliceOfDogPictures, dogBreed, dogSubBreed } = storeToRefs(dogStore)

</script>

<template>
    <div v-if="dogsAreLoading">
        Loading!
    </div>
    <template v-else>
        <div v-if="(dogBreedError.length > 0)">
            {{ dogBreedError }}
        </div>
        <div class="grid-container" v-else>
            <div class="grid">
                <div class="grid-item" v-for="url in getSliceOfDogPictures">
                    <DogCard :url="url" :breed="dogBreed" :subBreed="dogSubBreed" />
                </div>
            </div>
            <ContentPagination v-if="getSliceOfDogPictures.length > 0" />
        </div>
    </template>
</template>

<style scoped>
.grid-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 32px;
    grid-row-gap: 32px;
    flex: 1;
    min-height: 0;
    overflow-y: scroll;
    padding: 20px;
}

@media screen and (max-width: 900px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (max-width: 750px) {
    .grid {
        grid-template-columns: 1fr;
    }
}

</style>