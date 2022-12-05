<script setup>
  import ContentPanel from '../components/ContentPanel.vue'
</script>

<template>
  <main class="content-container">
    <ContentPanel />
  </main>
</template>

<style scoped>
  .content-container {
    background: #EEFAFF;
    padding: 40px 20px 20px 20px;
    flex-grow: 1;
  }

  @media screen and (min-width: 600px) {
    .content-container {
      min-height: 0;
    }
  }
</style>
