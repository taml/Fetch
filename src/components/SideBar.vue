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
        dogBreedFilterList.value.length === 0 ? noDogsMessage.value = `Sorry there are no dog breeds available for '${selectedLetter.value.toUpperCase()}'!` : noDogsMessage.value = ''
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
        <h1>Fetch</h1>
        <div>
            <div :class="['letter-filter-container', selectedLetter === letter && 'letter-active']" v-for="letter in alphabet" @click="findBreedMatches(letter)">
                <AlphabetSortFilter :letter="letter" :key="letter" />
            </div>
            <div v-if="(dogBreedFilterList.length > 0)" v-for="breed in dogBreedFilterList">
                <FilterItem :breed="breed" :key="breed" @click="updateDogBreed(breed)" />
                <div class="subbreeds-list" v-if="(dogBreeds[breed].length > 0)">
                    <div v-for="sub in dogBreeds[breed]">
                        <FilterItem :breed="sub" :key="sub" @click="updateDogSubBreed(breed, sub)" />
                    </div>
                </div>
            </div>
            <div v-if="(noDogsMessage.length > 0)">
                <p>{{noDogsMessage}}</p>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    .main-navigation {
        display: flex;
        flex-direction: column;
        flex: 0 0 320px;
        background: #CFF3C7;
        padding: 20px;
    }

    @media screen and (max-width: 600px) {
        .main-navigation {
            display: block;
            width: 320px;
            position: fixed;
            z-index: 1;
            height: 100%;
        }
    }

    .hide-main-navigation {
        margin-left: -320px;
    }

    .menu-toggle {
        position: relative;
        right: -320px;
    }

    .letter-filter-container {
        display: inline-block;
        background: #000;
        color: #FFF;
        border-radius: 50%;
        text-align: center;
        width: 26px;
        height: 26px;
        margin-right: 8px;
        margin-bottom: 8px;
    }

    .letter-active {
        background: grey;
    }

    .subbreeds-list {
        padding-left: 10px;
    }
</style>