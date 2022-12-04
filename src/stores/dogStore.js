import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDogBreedPictures, getDogSubBreedPictures } from '../services/api'

export const useDogStore = defineStore("dogStore", () => {
    const dogBreed = ref('')
    const dogSubBreed = ref('')
    const dogBreedError = ref('')
    const dogsAreLoading = ref(false)
    const dogPictures = ref([])

    const updateDogBreed = (breed) => {
        updateDogsAreLoading(true)
        updateDogAPIErrorMsg('')
        dogBreed.value = breed
        if(dogBreed.value.length > 0) {
            getDogBreedPictures(dogBreed.value).then((dogPics) => {
                if(dogPics.status === 'success') {
                    dogPictures.value = dogPics.message
                    updateDogsAreLoading(false)
                }
            }).catch((err) => {
                console.log(err)
                updateDogsAreLoading(false)
                updateDogAPIErrorMsg(`There was an issue fetching the breed ${breed}!`)
            })
        }
    }

    const updateDogSubBreed = (breed, subBreed) => {
        updateDogsAreLoading(true)
        updateDogAPIErrorMsg('')
        dogBreed.value = breed
        dogSubBreed.value = subBreed
        if(dogBreed.value.length > 0 && dogSubBreed.value.length > 0) {
            getDogSubBreedPictures(dogBreed.value, dogSubBreed.value).then((dogPics) => {
                if(dogPics.status === 'success') {
                    dogPictures.value = dogPics.message
                    updateDogsAreLoading(false)
                }
            }).catch((err) => {
                console.log(err)
                updateDogsAreLoading(false)
                updateDogAPIErrorMsg(`There was an issue fetching the subbreed ${subBreed}!`)
            })
        }
    }

    const updateDogAPIErrorMsg = (error) => {
        dogBreedError.value = error
    }

    const updateDogsAreLoading = (areLoading) => {
        dogsAreLoading.value = areLoading
    }

    return { 
        dogBreed, dogBreedError, dogsAreLoading, dogPictures, 
        updateDogBreed, updateDogSubBreed, updateDogAPIErrorMsg, updateDogsAreLoading  
    }
})