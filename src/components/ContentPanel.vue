<script setup>
    import { useDogStore } from '../stores/dogStore'
    import { storeToRefs } from 'pinia'
    import DogCard from './DogCard.vue'
    import ContentPagination from './ContentPagination.vue'

    /* Get the loading state, any error/status messages, 
    sliced dog list and selected dog types from the store 
    and determine which section should be displayed in
    the template */
    const dogStore = useDogStore()
    const { dogsAreLoading, dogBreedMsg, getSliceOfDogPictures, dogBreed, dogSubBreed } = storeToRefs(dogStore)

</script>

<template>
    <section class="text-container" v-if="dogsAreLoading">
        <!-- Display loading section whilst API requests are resolving -->
        <div>
            <img src="../assets/Dog_Loading.png" alt="A picture of a dog chasing a ball." />
            <h1>Loading!</h1>
            <p><font-awesome-icon icon="fa-solid fa-bone" spin aria-label="Spinning Dog Bone Loader" /> Fetching all the dogs.</p>
        </div>
    </section>
    <template v-else>
        <section class="text-container" v-if="(dogBreedMsg.message.length > 0)">
            <div v-if="dogBreedMsg.type === 'info'">
                <!-- Display welcome section when page is first loaded -->
                <img src="../assets/Dog_Welcome.png" alt="A picture of a dog holding a bindle in its mouth." />
                <h1>Welcome To Fetch!</h1>
                <p>{{ dogBreedMsg.message }}</p>
            </div>
            <div v-else-if="dogBreedMsg.type === 'error'">
                <!-- Display error section if there are errors caught from any API requests -->
                <img src="../assets/Dog_Error.png" alt="A picture of a dog wearing a dinosaur outfit." />
                <h1>Something Went Wrong When Fetching Dogs!</h1>
                <p>{{ dogBreedMsg.message }}</p>
            </div>
        </section>
        <section class="grid-container" v-else>
            <!-- Display dog picture grid section -->
            <div class="grid">
                <div class="grid-item" v-for="url in getSliceOfDogPictures">
                    <DogCard :url="url" :breed="dogBreed" :subBreed="dogSubBreed" />
                </div>
            </div>
            <ContentPagination v-if="getSliceOfDogPictures.length > 0" />
        </section>
    </template>
</template>

<style scoped>

    .text-container {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-family: 'Londrina Solid', sans-serif;
        color: #393352;
        font-weight: 400;
        height: 100%;
        padding: 20px;
    }

    .text-container img {
        width: 40%;
    }

    @media screen and (max-width: 600px) {
        .text-container img {
            width: 50%;
        }
    }

    @media screen and (max-width: 600px) {
            h1 {
                font-size: 30px;
            }
        }

        @media screen and (max-width: 460px) {
            h1 {
                font-size: 24px;
            }
        }

    .text-container p {
        font-size: 20px;
    }

    .fa-bone {
        margin-right: 7px;
    }

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
        overflow-y: auto;
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