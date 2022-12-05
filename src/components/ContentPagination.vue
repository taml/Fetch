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
        <div class="content-page-pagination-prev">
            <button v-if="getNumPages > 1 && currentPage !== 1" class="btn" @click="decrementCurrentPage"><font-awesome-icon icon="fa-solid fa-chevron-left" /><span>Prev</span></button>
        </div>

        <div v-if="getNumPages > 1">
            <p className="content-page-pagination-total">{{currentPage}}/{{getNumPages}}</p>
        </div>

        <div class="content-page-pagination-next">
            <button v-if="(currentPage !== getNumPages)" class="btn" @click="incrementCurrentPage"><span>Next</span><font-awesome-icon icon="fa-solid fa-chevron-right" /></button>
        </div>
    </div>
</template>

<style scoped>

.content-pagination {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 15px;
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
}

.content-page-pagination div {
    flex: 1;
}

.content-pagination .btn {
    background-color: #0B5B57;
    font-family: 'Londrina Solid', sans-serif;
    font-weight: 300;
    font-size: 16px;
    color: #FFFFFF;
    border: 0;
    padding: 10px;
    border-radius: 10px;
    margin-top: -18px;
    cursor: pointer;
    transition-timing-function: ease-in;
    transition: 0.5s;
    box-shadow: 0 4px 16px rgba(11, 94, 75, 0.5);
}

.content-pagination .btn:hover {
    box-shadow: 0 4px 16px rgba(11, 94, 75, 0.75);
}

@media screen and (max-width: 500px) {
    .content-pagination .btn {
        padding: 10px 15px;
        margin-top: -8px;
    }
}

@media screen and (max-width: 500px) {
    .content-pagination .btn span {
        display: none;
    }
}

.content-page-pagination-prev {
    text-align: left;
}

.fa-chevron-left {
    padding-right: 5px;
}

.content-page-pagination-total {
    text-align: center;
    color: #393352;
    font-family: 'Londrina Solid', sans-serif;
    font-size: 22px;
    font-weight: 400;
}

@media screen and (max-width: 500px) {
    .content-page-pagination-total {
        font-size: 18px;
    }
}

.content-page-pagination-next {
    text-align: right;
}

.fa-chevron-right {
    padding-left: 5px;
}

</style>