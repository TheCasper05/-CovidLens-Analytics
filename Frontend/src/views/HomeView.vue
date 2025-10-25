<script setup>
import FilterPanel from '@/components/filters/FilterPanel.vue'
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    
    <!-- Sidebar (FilterPanel) -->
    <aside class="w-80 p-4 bg-gray-50">
      <FilterPanel />
    </aside>

    <!-- Contenido Principal -->
    <main class="flex-1 p-6">
      <div class="max-w-7xl mx-auto">
        
        <!-- Título -->
        <h1 class="text-3xl font-black uppercase mb-6">
          Dashboard de COVID-19
        </h1>

        <!-- Placeholder para contenido futuro -->
        <div class="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <p class="text-gray-600 text-center">
            📊 Aquí irán los gráficos y estadísticas
          </p>
        </div>

      </div>
    </main>

  </div>
</template>
