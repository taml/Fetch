<script setup>
    import { ref, onMounted, onUnmounted, computed } from 'vue'
    import { useDogStore } from '../stores/dogStore'
    import { getDogBreeds } from '../services/api'
    import AlphabetSortFilter from './AlphabetSortFilter.vue'
    import FilterItem from './FilterItem.vue'

    const dogStore = useDogStore()
    const { updateDogBreed, updateDogSubBreed, updateDogsAreLoading, updateDogAPIMsg } = dogStore
    const windowSizeWidth = ref(window.innerWidth)
    const toggleMenu = ref(false)
    const alphabet = ref([])
    let dogBreeds = {}
    let dogBreedNames = []
    const dogBreedFilterList = ref([])
    const selectedLetter = ref('')
    const noDogsMessage = ref('')

    const generateAlphabet = () => {
        for (let i = 0; i < 26; i++) {
            alphabet.value.push(String.fromCharCode(i + 97))
        }
    }

    const findBreedMatches = (letter) => {
        selectedLetter.value = letter
        dogBreedFilterList.value = dogBreedNames.filter((breed) => breed.toLowerCase().charAt(0) === letter) 
        dogBreedFilterList.value.length === 0 ? noDogsMessage.value = `Sorry there are no dog breeds available for letter ${selectedLetter.value.toUpperCase()}. Why not try a different letter!` : noDogsMessage.value = ''
    }

    const closeMenu = () => {
        if(windowSizeWidth.value <= 600) toggleMenu.value = !toggleMenu.value 
    }

    onMounted(() => {
        window.addEventListener('resize', () => {windowSizeWidth.value = window.innerWidth})
        document.addEventListener('keydown', (e) => {
            let letter = String.fromCharCode(e.keyCode).toLowerCase()
            if (e.keyCode >= 65 && e.keyCode <= 90) {
                findBreedMatches(letter)
            }
        })

        generateAlphabet()

        getDogBreeds().then((breeds) => {
            updateDogsAreLoading(true)
            if(breeds.status === 'success') {
                dogBreeds = breeds.message
                dogBreedNames = Object.keys(dogBreeds)
                updateDogsAreLoading(false)
            }
        }).catch((err) => {
            console.log(err)
            updateDogsAreLoading(false)
            updateDogAPIMsg(`There was an issue fetching the dog breeds list!`, 'error')
        })
    })

    onUnmounted(() => {
        window.removeEventListener('resize', () => {windowSizeWidth.value = window.innerWidth})
    })
</script>

<template>
    <nav :class="['main-navigation', (!toggleMenu && windowSizeWidth <= 600) && 'hide-main-navigation']">
        <button v-if="windowSizeWidth <= 600" :class="['menu-toggle', windowSizeWidth <= 400 && toggleMenu && 'menu-toggle-open']" @click="toggleMenu = !toggleMenu" aria-label="Menu Toggle" :aria-expanded="toggleMenu">
            <font-awesome-icon v-if="!toggleMenu" icon="fa-solid fa-bars" />
            <font-awesome-icon v-else="toggleMenu" icon="fa-solid fa-xmark" />
        </button>
        <h1 class="site-title">&#128054; Fetch</h1>
        <hr/>
        <div class="navigation-items">
            <div class="letter-filter-container">
                <h2 class="navigation-heading">Filter Dog Breeds By Letter</h2>
                <button :class="['filter-item-container', selectedLetter === letter && 'letter-active']" v-for="letter in alphabet" @click="findBreedMatches(letter)">
                    <AlphabetSortFilter :letter="letter" :key="letter" :aria-selected="letter === selectedLetter" />
                </button>
            </div>
            <!-- <ul class="breed-results">
                <li class="filter-item" v-if="(dogBreedFilterList.length > 0)" v-for="breed in dogBreedFilterList">
                    <FilterItem :breed="breed" :hasSubBreed="(dogBreeds[breed].length > 0)" :key="breed" @click="(updateDogBreed(breed), closeMenu())" />
                    <ul class="subbreeds-list" v-if="(dogBreeds[breed].length > 0)">
                        <li v-for="sub in dogBreeds[breed]">
                            <FilterItem :breed="sub" :hasSubBreed="false" :key="sub" @click="updateDogSubBreed(breed, sub), closeMenu()" />
                        </li>
                    </ul>
                </li>
                <div v-if="(noDogsMessage.length > 0)" class="menu-notice-message">
                    <p>{{noDogsMessage}}</p>
                </div>
            </ul> -->
            <ul class="breed-results">
                <li class="filter-item" v-if="(dogBreedFilterList.length > 0)" v-for="breed in dogBreedFilterList">
                    <template v-if="dogBreeds[breed].length">
                        <details>
                            <summary>
                                <FilterItem :breed="breed" :key="breed" @click="(updateDogBreed(breed), closeMenu())" />
                            </summary>
                            <ul class="subbreeds-list">
                                <li v-for="sub in dogBreeds[breed]">
                                    <FilterItem :breed="sub" :key="sub" @click="updateDogSubBreed(breed, sub), closeMenu()" />
                                </li>
                            </ul>
                        </details>
                    </template>
                    <div class="filter-item-no-subbreed" v-else>
                        <FilterItem :breed="breed" :key="breed" @click="(updateDogBreed(breed), closeMenu())" />
                    </div>
                </li>
                <div v-if="(noDogsMessage.length > 0)" class="menu-notice-message">
                    <p>{{noDogsMessage}}</p>
                </div>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
    .main-navigation {
        display: flex;
        flex-direction: column;
        flex: 0 0 320px;
        background: #0B5B57;
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

    @media screen and (max-width: 400px) {
        .main-navigation {
            width: 220px;
            padding: 20px;
        }
    }

    .hide-main-navigation {
        margin-left: -320px;
    }

    @media screen and (max-width: 400px) {
        .hide-main-navigation {
            width: -220px;
        }
    }

    .menu-toggle {
        position: relative;
        right: -295px;
        bottom: 5px;
        color: #FFFFFF;
        background: #897106;
        width: 40px;
        height: 40px;
        text-align: center;
        border: 0;
        border-radius: 10px;
        cursor: pointer;
        transition-timing-function: ease-in;
        transition: 0.5s;
        box-shadow: 0 4px 16px rgba(104, 60, 19, 0.25);
    }

    @media screen and (max-width: 400px) {
        .menu-toggle {
            right: -315px;
        }
    }

    @media screen and (max-width: 400px) {
        .menu-toggle-open {
            right: -215px;
        }
    }

    .menu-toggle:hover {
        box-shadow: 0 4px 16px rgba(104, 60, 19, 0.5);
    }

    .fa-bars {
        margin-bottom: -2px;
        margin-left: 1px;
        font-size: 22px;
    }

    .fa-xmark {
        margin-bottom: -2px;
        margin-left: 1px;
        font-size: 22px;
    }

    .site-title {
        font-family: 'Kaushan Script', sans-serif;
        font-size: 32px;
        color: #FFFFFF;
        margin-top: -8px;
    }

    @media screen and (max-width: 600px) {
        .site-title {
            display: none;
        }
    }

    hr {
        width: 100%;
        height: 2px;
        border: 0;
        background: #D1D0D0;
        margin-top: 12px;
        margin-bottom: 25px;
    }

    @media screen and (max-width: 600px) {
        hr {
            display: none;
        }
    }

    .navigation-heading {
        font-family: 'Londrina Solid', sans-serif;
        font-weight: 400;
        font-size: 20px;
        color: #FFFFFF;
        margin-bottom: 15px;
    }

    .navigation-items {
        display: flex;
        flex-direction: column;
        height: 82%;
    }

    .filter-item-container {
        display: inline-block;
        background: #897106;
        color: #FFFFFF;
        border: 1px solid #FFFFFF;
        border-radius: 50%;
        text-align: center;
        width: 26px;
        height: 26px;
        margin-right: 8px;
        margin-bottom: 8px;
        cursor: pointer;
        transition-timing-function: ease-in;
        transition: 0.5s;
        box-shadow: 0 4px 16px rgba(147, 90, 37, 0.25);
    }

    .filter-item-container:hover {
        background: #4E4106;
        box-shadow: 0 4px 16px rgba(104, 60, 19, 0.5);
    }

    .letter-active {
        background: #4E4106;
    }

    .breed-results {
        margin-top: 20px;
        overflow-y: auto;
        overflow-x: hidden;
        flex: 1;
        min-height: 0;
        list-style-type: none;
        padding: 0;
    }

    .filter-item {
        font-family: 'Londrina Solid', sans-serif;
        font-size: 18px;
        text-transform: capitalize;
        color: #FFFFFF;
        padding-top: 5px;
        padding-bottom: 5px;
        cursor: pointer;
    }

    .filter-item-no-subbreed {
        margin-left: 15px;
    }

    .subbreeds-list {
        padding-left: 15px;
        list-style-type: none;
        font-size: 17px;
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