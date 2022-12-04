<script setup>
    import { ref, onMounted, computed } from 'vue'
    import { useDogStore } from '../stores/dogStore'
    import { storeToRefs } from 'pinia'

    const dogStore = useDogStore()
    const { dogPictures, currentPage, getNumPages } = storeToRefs(dogStore)
    const { incrementCurrentPage, decrementCurrentPage } = dogStore

</script>

<template>
    <div className="content-pagination">
        <div v-if="getNumPages > 1 && currentPage !== 1">
            <button @click="decrementCurrentPage">Prev</button>
        </div>

        <div v-if="getNumPages > 1">
            <p className="content-pagination-total">{{currentPage}}/{{getNumPages}}</p>
        </div>

        <div v-if="(currentPage !== getNumPages)">
            <button @click="incrementCurrentPage">Next</button>
        </div>
    </div>
</template>

<style scoped>
</style>