<script setup>
    const props = defineProps({
        letterObj: Object,
    })
</script>

<template>
    <div>
        {{ letterObj.letter }}
    </div>
</template>

<style scoped>

</style>