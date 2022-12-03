<script setup>
    import { ref } from "vue"
    import AlphabetSortFilter from './AlphabetSortFilter.vue';

    const alphabet = ref([])

    const generateAlphabet = () => {
        for (let i = 0; i < 26; i++) {
            alphabet.value.push({
                letter: String.fromCharCode(i + 65),
                selected: false,
            })
        }
    }
    generateAlphabet()
    console.log(alphabet.value)
</script>

<template>
    <nav class="main-navigation">
        <h1>Fetch</h1>
        <div>
            <div v-for="item in alphabet">
                <AlphabetSortFilter :letterObj="item" :key="item.letter" />
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
</style>