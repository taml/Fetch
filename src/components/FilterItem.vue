<script setup>
    const props = defineProps({
        breed: String,
    })
</script>

<template>
    <div class="letter-filter">
        {{ breed }}
    </div>
</template>