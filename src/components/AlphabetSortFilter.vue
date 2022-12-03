<script setup>
    const props = defineProps({
        letter: String,
    })
</script>

<template>
    <span class="letter-filter">
        {{ letter.toUpperCase() }}
    </span>
</template>