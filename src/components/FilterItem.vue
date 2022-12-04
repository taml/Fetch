<script setup>
    import { useDogStore } from '../stores/dogStore'
    import { storeToRefs } from 'pinia'
    const dogStore = useDogStore()
    const { dogBreed, dogSubBreed } = storeToRefs(dogStore)

    const props = defineProps({
        breed: String,
    })
</script>

<template>
    <div class="letter-filter">
        <p><span v-if="breed === dogBreed"><font-awesome-icon icon="fa-solid fa-paw" /></span>{{ breed }}</p>
    </div>
</template>