<script setup>
    import { ref, onMounted, onUnmounted, computed } from 'vue'
    import { useDogStore } from '../stores/dogStore'
    import { getDogBreeds } from '../services/api'
    import AlphabetSortFilter from './AlphabetSortFilter.vue'
    import FilterItem from './FilterItem.vue'

    const dogStore = useDogStore()
    const { updateDogBreed, updateDogSubBreed, updateDogsAreLoading, updateDogAPIErrorMsg } = dogStore
    const windowSizeWidth = ref(window.innerWidth)
    const toggleMenu = ref(false)
    const alphabet = ref([])
    let dogBreeds = {}
    let dogBreedNames = []
    const dogBreedFilterList = ref([])
    const selectedLetter = ref('')
    const noDogsMessage = ref('')

    // const dogBreedFilterList = computed(() => {
    //     return dogBreedNames.filter((breed) => breed.toLowerCase().charAt(0) === selectedLetter.value)
    // })

    const generateAlphabet = () => {
        for (let i = 0; i < 26; i++) {
            alphabet.value.push(String.fromCharCode(i + 97))
        }
    }

    const findBreedMatches = (letter) => {
        // dogBreedFilterList.value = []
        selectedLetter.value = letter
        dogBreedFilterList.value = dogBreedNames.filter((breed) => breed.toLowerCase().charAt(0) === letter) 
        dogBreedFilterList.value.length === 0 ? noDogsMessage.value = `Sorry there are no dog breeds available for letter ${selectedLetter.value.toUpperCase()}!` : noDogsMessage.value = ''
    }

    onMounted(() => {
        window.addEventListener('resize', () => {windowSizeWidth.value = window.innerWidth})

        generateAlphabet()

        getDogBreeds().then((breeds) => {
            updateDogsAreLoading(true)
            updateDogAPIErrorMsg('')
            if(breeds.status === 'success') {
                dogBreeds = breeds.message
                dogBreedNames = Object.keys(dogBreeds)
                updateDogsAreLoading(false)
            }
        }).catch((err) => {
            console.log(err)
            updateDogsAreLoading(false)
            updateDogAPIErrorMsg(`There was an issue fetching the dog breeds list!`)
        })
    })

    onUnmounted(() => {
        window.removeEventListener('resize', () => {windowSizeWidth.value = window.innerWidth})
    })

    console.log(windowSizeWidth.value)
</script>

<template>
    <nav :class="['main-navigation', (!toggleMenu && windowSizeWidth <= 600) && 'hide-main-navigation']">
        <div v-if="windowSizeWidth <= 600" class="menu-toggle" @click="toggleMenu = !toggleMenu">
            <font-awesome-icon icon="fa-solid fa-bars" />
        </div>
        <h1 class="site-title"><font-awesome-icon icon="fa-solid fa-dog" /> Fetch</h1>
        <hr/>
        <div>
            <div :class="['letter-filter-container', selectedLetter === letter && 'letter-active']" v-for="letter in alphabet" @click="findBreedMatches(letter)">
                <AlphabetSortFilter :letter="letter" :key="letter" />
            </div>
            <div class="breed-results">
                <div v-if="(dogBreedFilterList.length > 0)" v-for="breed in dogBreedFilterList">
                    <FilterItem :breed="breed" :hasSubBreed="(dogBreeds[breed].length > 0)" :key="breed" @click="updateDogBreed(breed)" />
                    <div class="subbreeds-list" v-if="(dogBreeds[breed].length > 0)">
                        <div v-for="sub in dogBreeds[breed]">
                            <FilterItem :breed="sub" :hasSubBreed="false" :key="sub" @click="updateDogSubBreed(breed, sub)" />
                        </div>
                    </div>
                </div>
                <div v-if="(noDogsMessage.length > 0)" class="menu-notice-message">
                    <p>{{noDogsMessage}}</p>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    .main-navigation {
        display: flex;
        flex-direction: column;
        flex: 0 0 320px;
        background: #A6D18F;
        padding: 20px 40px 40px 40px;
    }

    @media screen and (max-width: 600px) {
        .main-navigation {
            display: block;
            width: 320px;
            position: fixed;
            z-index: 1;
            height: 100%;
            opacity: 1;
            -webkit-transition: margin-left 100ms cubic-bezier(0.65, 0.05, 0.36, 1);
            transition: margin-left 100ms cubic-bezier(.65, .05, .36, 1);
        }
    }

    .hide-main-navigation {
        margin-left: -320px;
    }

    .menu-toggle {
        position: relative;
        right: -290px;
        color: #FFFFFF;
        background: #895319;
        width: 40px;
        height: 40px;
        text-align: center;
        border-radius: 10px;
        cursor: pointer;
        transition-timing-function: ease-in;
        transition: 0.5s;
        box-shadow: 0 4px 16px rgba(104, 60, 19, 0.25);
    }

    .menu-toggle:hover {
        box-shadow: 0 4px 16px rgba(104, 60, 19, 0.5);
    }

    .fa-bars {
        margin-bottom: -10px;
        margin-left: 1px;
        font-size: 22px;
    }

    .site-title {
        font-family: 'Fugaz One', sans-serif;
        font-size: 32px;
        color: #2d2c35;
    }

    .fa-dog {
        color: #484039;
        position: relative;
        left: 2px;
        bottom: 2px;
    }

    hr {
        width: 100%;
        height: 3px;
        border: 0;
        background: #FFFFFF;
        margin-top: 12px;
        margin-bottom: 25px;
    }

    .letter-filter-container {
        display: inline-block;
        background: #895319;
        color: #FFF;
        border-radius: 50%;
        text-align: center;
        width: 26px;
        height: 26px;
        margin-right: 8px;
        margin-bottom: 8px;
        cursor: pointer;
        transition-timing-function: ease-in;
        transition: 0.5s;
        box-shadow: 0 4px 16px rgba(104, 60, 19, 0.25);
    }

    .letter-filter-container:hover {
        box-shadow: 0 4px 16px rgba(104, 60, 19, 0.5);
    }

    .letter-active {
        background: #808080;
    }

    .breed-results {
        margin-top: 20px;
        overflow-y: scroll;
        overflow-x: hidden;
        height: 400px;
    }

    .subbreeds-list {
        padding-left: 15px;
    }

    .menu-notice-message {
        background: #35343e;
        border-radius: 10px;
        color: #FFFFFF;
        font-family: 'Londrina Solid', sans-serif;
        font-weight: 300;
        padding: 10px;
        text-align: center;
    }
</style>