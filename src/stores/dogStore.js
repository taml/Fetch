import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDogBreedPictures } from '../services/api'

export const useDogStore = defineStore("dogStore", () => {
    const dogBreed = ref({
        breed: '',
        subBreed: false
    })
    const breedListError = ref('')
    const dogPictures = ref([])

    const updateDogBreed = (breed) => {
        dogBreed.value = breed
        if(dogBreed.value.breed.length > 0) {
            getDogBreedPictures(dogBreed.value.breed).then((dogPics) => {
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
        dogBreed, breedListError, dogPictures, updateDogBreed, updateDogAPIErrorMsg  
    }
})