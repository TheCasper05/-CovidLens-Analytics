<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from './components/layout/TopBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <TopBar />
    <RouterView />
  </div>
</template>









