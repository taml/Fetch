<script setup>
    import { useDogStore } from '../stores/dogStore'
    import { storeToRefs } from 'pinia'

    const dogStore = useDogStore()
    const { favouriteDogs } = storeToRefs(dogStore)
    const { addToFavourites, removeFromFavourites } = dogStore

    /* DogCard takes a prop to populate a card URL */
    const props = defineProps({
        url: String
    })

    // Toggle favourite dogs on or off
    const toggleLike = (url) => {
        favouriteDogs.value.includes(url) ? removeFromFavourites(url) : addToFavourites(url)
    }
</script>

<template>
    <figure class="card-container">
        <div class="favourite-container">
            <font-awesome-icon v-if="favouriteDogs.includes(url)" icon="fa-solid fa-heart" @click="toggleLike(url)"/>
            <font-awesome-icon v-else icon="fa-regular fa-heart" @click="toggleLike(url)"/>
        </div>
        <img class="card-img" :src="url" alt="A picture of a dog."/>
    </figure>
</template>

<style scoped>
    .card-container {
        width: 100%;
        border-radius: 10px;
    }

    .favourite-container {
        position: relative;
        left: 10px;
        top: 50px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 22px;
        color: #FFFFFF;
        text-align: center;
        background: #0B5B57;
        z-index: 1;
        cursor: pointer;
        transition-timing-function: ease-in;
        transition: 0.5s;
        box-shadow: 0 4px 16px rgba(11, 94, 75, 0.5);
    }

    .favourite-container:hover {
        box-shadow: 0 4px 16px rgba(11, 94, 75, 0.75);
    }

    .fa-heart {
        position: relative;
        top: 3px;
    }

    .card-img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        transition-timing-function: ease-in;
        transition: 0.5s;
        box-shadow: 0 4px 16px rgba(1, 50, 87, 0.3);
    }

    .card-img:hover {
        -webkit-transform: scale(1.05);
        transform: scale(1.05);
    }
</style>