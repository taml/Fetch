<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'
    import { useDogStore } from '../stores/dogStore'
    import { storeToRefs } from 'pinia'

    /* Get dogBreed and subBreed from the dogStore and the screen
    width determine which elememnts of the header should bre shown
     in the template */
    const dogStore = useDogStore()
    const { dogBreed, dogSubBreed } = storeToRefs(dogStore)
    const windowSizeWidth = ref(window.innerWidth)

    onMounted(() => {
        // Add listener to determine window width
        window.addEventListener('resize', () => {windowSizeWidth.value = window.innerWidth})
    })

    onUnmounted(() => {
        // Remove listener to determine window width
        window.removeEventListener('resize', () => {windowSizeWidth.value = window.innerWidth})
    })
</script>

<template>
    <!-- Header Section -->
    <header v-if="windowSizeWidth <= 600 || dogBreed.length > 0">
        <h1 class="site-title">&#128054; Fetch</h1>
        <hr v-if="dogBreed.length > 0"/>
        <h2 v-if="dogBreed.length > 0">
            <span class="breed-heading">{{ dogBreed }}</span>
            <span class="subbreed-heading" v-if="dogSubBreed.length > 0"> / {{ dogSubBreed }}</span>
        </h2>
    </header>
</template>

<style scoped>
    header {
        background: #deedf4;
        padding: 10px;
    }

    .site-title {
        font-family: 'Kaushan Script', sans-serif;
        font-size: 32px;
        color: #0B5B57;
        text-align: center;
    }

    @media screen and (min-width: 600px) {
        .site-title {
            display: none;
        }
    } 

    hr {
        background: #897106;
        height: 2px;
        width: 28%;
        margin-left: auto;
        margin-right: auto;
        border: none;
    }

    @media screen and (min-width: 600px) {
        hr {
            display: none;
        }
    }

    h2 {
        font-family: 'Londrina Solid', sans-serif;
        font-size: 32px;
        color: #393352;
        text-transform: capitalize;
        margin-top: -2px;
    }

    @media screen and (max-width: 600px) {
        h2 {
            text-align: center;
            font-size: 28px;
        }
    }

    @media screen and (max-width: 460px) {
        h2 {
            font-size: 22px;
        }
    }

    .breed-heading {
        padding-left: 28px;
        font-weight: 400;
    }

    @media screen and (max-width: 600px) {
        .breed-heading {
            padding-left: 0;
        }
    }

    .subbreed-heading {
        font-weight: 300;
    }
</style>