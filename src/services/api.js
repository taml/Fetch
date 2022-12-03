const getDogBreeds = async () => {
    const dogBreeds = await fetch('https://dog.ceo/api/breeds/list/all')
    if(dogBreeds.status === 200 && dogBreeds.ok === true) {
        return await dogBreeds.json()
    }
    return Promise.reject()
}

const getDogBreedPictures = async (breed) => {
    const dogBreed = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    if(dogBreed.status === 200 && dogBreed.ok === true) {
        return await dogBreed.json()
    }
    return Promise.reject()
}

const getDogSubBreedPictures = async (breed, subBreed) => {
    const dogSubBreed = await fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images`)
    if(dogSubBreed.status === 200 && dogSubBreed.ok === true) {
        return await dogSubBreed.json()
    }
    return Promise.reject()
}

export { getDogBreeds, getDogBreedPictures, getDogSubBreedPictures }