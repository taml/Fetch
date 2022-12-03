<script setup>
import { RouterView } from "vue-router"
import SideBar from "./components/SideBar.vue"
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
</script>

<template>
  <div class="page-wrapper">
    <SideBar />
    <div class="main-container">
      <Header />
      <RouterView />
      <Footer />
    </div>
  </div>
</template>

<style scoped>
  .page-wrapper {
    display: flex;
    height: 100vh;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
</style>
