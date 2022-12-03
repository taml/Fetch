<script setup>
    import { ref, onMounted, computed } from 'vue'
    import { getDogBreeds } from '../services/api'
    import AlphabetSortFilter from './AlphabetSortFilter.vue'
    import FilterItem from './FilterItem.vue'

    const alphabet = ref([])
    let dogBreeds = {}
    let dogBreedNames = []
    const selectedLetter = ref('')
    const noDogsMessage = ref('')
    // const dogBreedFilterList = computed(() => {
    //     return dogBreedNames.filter((breed) => breed.toLowerCase().charAt(0) === selectedLetter.value)
    // })

   const dogBreedFilterList = ref([])

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
        generateAlphabet()

        getDogBreeds().then((breeds) => {
            if(breeds.status === 'success') dogBreeds = breeds.message
            dogBreedNames = Object.keys(dogBreeds)
        }).catch((err) => {
            console.log(err)
        })
    })
</script>

<template>
    <nav class="main-navigation">
        <h1>Fetch</h1>
        <div>
            <div :class="['letter-filter-container', selectedLetter === letter && 'letter-active']" v-for="letter in alphabet" @click="findBreedMatches(letter)">
                <AlphabetSortFilter :letter="letter" :key="letter" />
            </div>
            <div v-if="(dogBreedFilterList.length > 0)" v-for="breed in dogBreedFilterList">
                <FilterItem :breed="breed" :key="breed" />
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
        flex-basis: 320px;
        background: #CFF3C7;
        padding: 20px;
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
</style>