<script setup>
    import { useDogStore } from '../stores/dogStore'
    import { storeToRefs } from 'pinia'
    const dogStore = useDogStore()
    const { dogBreed, dogSubBreed } = storeToRefs(dogStore)

    const props = defineProps({
        breed: String,
        hasSubBreed: Boolean
    })
</script>

<template>
    <div class="filter-item">
        <p>
            <span :class="['breed-icon', breed !== dogBreed && 'selected-breed']"><font-awesome-icon icon="fa-solid fa-paw" /></span>
                {{ breed }}
            <span v-if="hasSubBreed"><font-awesome-icon icon="fa-solid fa-caret-down" /></span>
        </p>
    </div>
</template>

<style scoped>
    .filter-item {
        font-family: 'Londrina Solid', sans-serif;
        font-size: 18px;
        text-transform: capitalize;
        color: #FFFFFF;
        padding-top: 5px;
        padding-bottom: 5px;
        cursor: pointer;
    }

    .selected-breed {
        visibility: hidden;
    }

    .breed-icon {
        padding-right: 5px;
        color: #D1D0D0;
    }

    .fa-caret-down {
        padding-left: 5px;
    }
</style>