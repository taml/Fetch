<script setup>
    import { useDogStore } from '../stores/dogStore'
    import { storeToRefs } from 'pinia'

    /* Get dogBreed from the dogStore to mark as selected
    in the template for accessibility and visual purposes */
    const dogStore = useDogStore()
    const { dogBreed } = storeToRefs(dogStore)

    /* DogCard takes a breed prop to display the breed within
    the template and to determine visual iconography */
    const props = defineProps({
        breed: String,
    })
</script>

<template>
    <a class="breed-link" href="javascript:void(0)" :aria-selected="breed === dogBreed">
            {{ breed }}
            <span :class="['breed-icon', breed !== dogBreed && 'selected-breed']"><font-awesome-icon icon="fa-solid fa-paw" /></span>
    </a>
</template>

<style scoped>

    .breed-link {
        text-decoration: none;
        color: #FFFFFF;
        transition-timing-function: ease-in;
        transition: 0.5s;
    }

    .breed-link:hover {
        color: #D1D0D0;
    }

    .selected-breed {
        visibility: hidden;
    }

    .breed-icon {
        padding-left: 5px;
        color: #D1D0D0;
    }
</style>