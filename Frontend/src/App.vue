<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Prueba de Tailwind: Card neobrutalism -->
    <div class="p-8">
      <div class="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 max-w-md">
        <h1 class="text-3xl font-bold mb-2">¡Tailwind funciona! 🎉</h1>
        <p class="text-gray-700">Este es un card con estilo neobrutalism</p>
        <button class="mt-4 bg-yellow-400 border-2 border-black px-6 py-2 font-bold hover:translate-x-1 hover:translate-y-1 transition-transform">
          Click me
        </button>
      </div>
    </div>
    
    <RouterView />
  </div>
</template>