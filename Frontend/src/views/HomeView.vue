<script setup>
import { ref, onMounted } from "vue";
import StatsCard from "@/components/cards/StatsCard.vue";
import FilterPanel from "@/components/filters/FilterPanel.vue";
import { getTopCountries } from "@/services/api";

const title = "COVID-19 Dashboard";
const totalCases = ref(0)
const totalDeaths = ref(0)
const totalVaccinations = ref(0)
const loading = ref(true)  

function formatNumber(num: number): string {
  return num.toLocaleString('en-US')
}
onMounted(async () => {
  try {
    loading.value = true
    
    // Traer top países para obtener números reales
    const [casesData, deathsData, vaccinationsData] = await Promise.all([
      getTopCountries('total_cases', 10),
      getTopCountries('total_deaths', 10),
      getTopCountries('total_vaccinations', 10)
    ])
    
    // Sumar los top 10 de cada métrica
    totalCases.value = casesData.reduce((sum, country) => sum + country.value, 0)
    totalDeaths.value = deathsData.reduce((sum, country) => sum + country.value, 0)
    totalVaccinations.value = vaccinationsData.reduce((sum, country) => sum + country.value, 0)
    
    console.log('Stats loaded:', {
      cases: totalCases.value,
      deaths: totalDeaths.value,
      vaccinations: totalVaccinations.value
    })
  } catch (error) {
    console.error('Error loading summary:', error)
  } finally {
    loading.value = false
  }
})
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
  {{ title }}
</h1>

<!-- Stats Cards -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
  <StatsCard 
  title="Top 10 - Cases"
    :value="formatNumber(totalCases)" 
    icon="😷"
    color="yellow"
   
  />
  <StatsCard 
      title="Top 10 - Deaths"
    :value="totalDeaths"
    icon="💀"
    color="pink"
  />
  <StatsCard 
     title="Top 10 - Vaccinations"
    :value="totalVaccinations"
    icon="💉"
    color="lime"
  />
</div>

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
