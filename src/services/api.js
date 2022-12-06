/**
 * Makes an API request to fetch a list of dog breeds/subbreeds
 * @returns Response || Promise
 */
const getDogBreeds = async () => {
    const dogBreeds = await fetch('https://dog.ceo/api/breeds/list/all')
    if(dogBreeds.status === 200 && dogBreeds.ok === true) {
        return await dogBreeds.json()
    }
    return Promise.reject()
}

/**
 * Makes an API request to fetch a list of dog images based on a specific breed
 * @param {string} breed 
 * @returns Response || Promise
 */
const getDogBreedPictures = async (breed) => {
    const dogBreed = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    if(dogBreed.status === 200 && dogBreed.ok === true) {
        return await dogBreed.json()
    }
    return Promise.reject()
}

/**
 * Makes an API request to fetch a list of dog images based on a specific breed and subbreed
 * @param {string} breed 
 * @param {string} subBreed 
 * @returns Response || Promise
 */
const getDogSubBreedPictures = async (breed, subBreed) => {
    const dogSubBreed = await fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images`)
    if(dogSubBreed.status === 200 && dogSubBreed.ok === true) {
        return await dogSubBreed.json()
    }
    return Promise.reject()
}

export { getDogBreeds, getDogBreedPictures, getDogSubBreedPictures }