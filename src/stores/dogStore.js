import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDogBreedPictures, getDogSubBreedPictures } from '../services/api'

export const useDogStore = defineStore("dogStore", () => {
    const dogBreed = ref('')
    const dogSubBreed = ref('')
    const breedListError = ref('')
    const dogPictures = ref([])

    const updateDogBreed = (breed) => {
        dogBreed.value = breed
        if(dogBreed.value.length > 0) {
            getDogBreedPictures(dogBreed.value).then((dogPics) => {
                if(dogPics.status === 'success') dogPictures.value = dogPics.message
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const updateDogSubBreed = (breed, subBreed) => {
        dogBreed.value = breed
        dogSubBreed.value = subBreed
        if(dogBreed.value.length > 0 && dogSubBreed.value.length > 0) {
            getDogSubBreedPictures(dogBreed.value, dogSubBreed.value).then((dogPics) => {
                if(dogPics.status === 'success') dogPictures.value = dogPics.message
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const updateDogAPIErrorMsg = (error) => {
        breedListError.value = error
    }

    return { 
        dogBreed, breedListError, dogPictures, updateDogBreed, updateDogSubBreed, updateDogAPIErrorMsg  
    }
})