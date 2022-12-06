import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getDogBreedPictures, getDogSubBreedPictures } from '../services/api'

export const useDogStore = defineStore("dogStore", () => {
    const dogBreed = ref('')
    const dogSubBreed = ref('')
    const dogBreedMsg = ref({ message: "Get pictures of 'pawesome' dogs by using the filters within the left-hand menu to select different dog breeds.", type: 'info'})
    const dogsAreLoading = ref(false)
    const dogPictures = ref([])
    const skip = 6
    const currentPage = ref(1)

    const getSliceOfDogPictures = computed(() => {
        return dogPictures.value.slice(skip * currentPage.value - skip, skip * currentPage.value)
    })

    const getNumPages = computed(() => {
        return Math.ceil(dogPictures.value.length / skip)
    })

    const updateDogBreed = (breed) => {
        updateDogsAreLoading(true)
        updateDogAPIMsg('', 'none')
        currentPage.value = 1
        dogBreed.value = breed
        dogSubBreed.value = ''
        if(dogBreed.value.length > 0) {
            getDogBreedPictures(dogBreed.value).then((dogPics) => {
                if(dogPics.status === 'success') {
                    dogPictures.value = dogPics.message
                    updateDogsAreLoading(false)
                }
            }).catch((err) => {
                console.log(err)
                updateDogsAreLoading(false)
                updateDogAPIMsg(`There was an issue fetching the breed ${breed}!`, 'error')
            })
        }
    }

    const updateDogSubBreed = (breed, subBreed) => {
        updateDogsAreLoading(true)
        updateDogAPIMsg('', 'none')
        currentPage.value = 1
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
                updateDogAPIMsg(`There was an issue fetching the subbreed ${subBreed}!`, 'error')
            })
        }
    }

    const updateDogAPIMsg = (message, type) => {
        dogBreedMsg.value = { message, type }
    }

    const updateDogsAreLoading = (areLoading) => {
        dogsAreLoading.value = areLoading
    }

    const incrementCurrentPage = () => {
        currentPage.value++
    }

    const decrementCurrentPage = () => {
        currentPage.value--
    }

    return { 
        dogBreed, dogSubBreed, dogBreedMsg, dogsAreLoading, dogPictures, currentPage, getNumPages, getSliceOfDogPictures,
        updateDogBreed, updateDogSubBreed, updateDogAPIMsg, updateDogsAreLoading,
        incrementCurrentPage, decrementCurrentPage  
    }
})