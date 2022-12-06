import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getDogBreedPictures, getDogSubBreedPictures } from '../services/api'

export const useDogStore = defineStore("dogStore", () => {
    const dogBreed = ref('')
    const dogSubBreed = ref('')
    // Initialise message with welcome/starting state
    const dogBreedMsg = ref({ message: "Get pictures of 'pawesome' dogs by using the filters within the left-hand menu to select different dog breeds.", type: 'info'})
    const dogsAreLoading = ref(false)
    const dogPictures = ref([])
    const skip = 6
    const currentPage = ref(1)

    // Getters

    /**
     * Gets a section of the dog pictures array based on a start position and an end
     * position calculated using the currentPage number and the skip page amount
     */
    const getSliceOfDogPictures = computed(() => {
        return dogPictures.value.slice(skip * currentPage.value - skip, skip * currentPage.value)
    })

    /**
     * Gets how many pages pagination should use based on how many dog pictures
     * there are divided by the amount of pictures to skip each page increment/decrement
     */
    const getNumPages = computed(() => {
        return Math.ceil(dogPictures.value.length / skip)
    })

    // Setters

    /**
     * Makes a call to the Dogs API with breed, displays a loading screen 
     * and either updates the dogPictures array in the store if the request 
     * is successful or updates a status message so an error screen can be displayed 
     * @param {string} breed 
     */
    const updateDogBreed = (breed) => {
        // Trigger loading state whilst waiting for API request to resolve
        updateDogsAreLoading(true)
        // Reset status message
        updateDogAPIMsg('', 'none')
        // Reset current page to 1 which may have increased via pagination button clicks
        currentPage.value = 1
        // Update the store with the selected dog breed and reset sub dog breed 
        dogBreed.value = breed
        dogSubBreed.value = ''
        if(dogBreed.value.length > 0) {
            // Make API request
            getDogBreedPictures(dogBreed.value).then((dogPics) => {
                if(dogPics.status === 'success') {
                    dogPictures.value = dogPics.message
                    // End loading state when request is successful
                    updateDogsAreLoading(false)
                }
            }).catch((err) => {
                console.log(err)
                // End loading state when request is unsuccessful
                updateDogsAreLoading(false)
                // Update status message to reflect error
                updateDogAPIMsg(`There was an issue fetching the breed ${breed}!`, 'error')
            })
        }
    }

    /**
     * Makes a call to the Dogs API with breed and subbreed, displays a loading screen 
     * and either updates the dogPictures array in the store if the request 
     * is successful or updates a status message so an error screen can be displayed 
     * @param {string} breed 
     * @param {string} subBreed 
     */
    const updateDogSubBreed = (breed, subBreed) => {
        // Trigger loading state whilst waiting for API request to resolve
        updateDogsAreLoading(true)
        // Reset status message
        updateDogAPIMsg('', 'none')
        // Reset current page to 1 which may have increased via pagination button clicks
        currentPage.value = 1
        // Update the store with the selected dog breed and sub dog breed 
        dogBreed.value = breed
        dogSubBreed.value = subBreed
        if(dogBreed.value.length > 0 && dogSubBreed.value.length > 0) {
            // Make API request
            getDogSubBreedPictures(dogBreed.value, dogSubBreed.value).then((dogPics) => {
                if(dogPics.status === 'success') {
                    dogPictures.value = dogPics.message
                    // End loading state when request is successful
                    updateDogsAreLoading(false)
                }
            }).catch((err) => {
                console.log(err)
                // End loading state when request is unsuccessful
                updateDogsAreLoading(false)
                // Update status message to reflect error
                updateDogAPIMsg(`There was an issue fetching the subbreed ${subBreed}!`, 'error')
            })
        }
    }

    /**
     * Sets the text and type for the status message
     * @param {string} message 
     * @param {string} type 
     */
    const updateDogAPIMsg = (message, type) => {
        dogBreedMsg.value = { message, type }
    }

    /**
     * Sets the API request loading state
     * @param {boolean} areLoading 
     */
    const updateDogsAreLoading = (areLoading) => {
        dogsAreLoading.value = areLoading
    }

    /**
     * Increments currentPage by 1
     */
    const incrementCurrentPage = () => {
        currentPage.value++
    }

    /**
     * Decrements currentPage by 1
     */
    const decrementCurrentPage = () => {
        currentPage.value--
    }

    return { 
        dogBreed, dogSubBreed, dogBreedMsg, dogsAreLoading, dogPictures, currentPage, getNumPages, getSliceOfDogPictures,
        updateDogBreed, updateDogSubBreed, updateDogAPIMsg, updateDogsAreLoading,
        incrementCurrentPage, decrementCurrentPage  
    }
})