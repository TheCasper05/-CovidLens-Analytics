<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import StatsCard from "@/components/cards/StatsCard.vue";
import FilterPanel from "@/components/filters/FilterPanel.vue";
import LineChart from "@/components/charts/LineChart.vue";
import PieChart from "@/components/charts/PieChart.vue";
import BarChart from "@/components/charts/BarChart.vue";
import HorizontalBarChart from "@/components/charts/HorizontalBarChart.vue";


import {
  getTopCountries,
  getTimeSeriesData,
  getContinents,
} from "@/services/api";

const currentLocation = ref("Global");
const currentMetric = ref("Overview");
const totalCases = ref(0);
const totalDeaths = ref(0);
const totalVaccinations = ref(0);
const loading = ref(true);
const isWorldView = ref(true);
const filtersApplied = ref(false);
const selectedMetric: Ref<string | null> = ref(null);
const continentCasesData = ref<{ label: string; value: number }[]>([]);
const continentDeathsData = ref<{ label: string; value: number }[]>([]);
const topCountriesData = ref<{ label: string; value: number }[]>([]);


const chartData = ref([
  { date: "2020-01-01", value: 1000 },
  { date: "2020-02-01", value: 5000 },
  { date: "2020-03-01", value: 15000 },
  { date: "2020-04-01", value: 50000 },
  { date: "2020-05-01", value: 100000 },
  { date: "2020-06-01", value: 150000 },
]);

function formatNumber(num: any) {
  const value = num.value || num;
  return value.toLocaleString("en-US");
}

interface Filters {
  location: string;
  metric: string;
}

onMounted(async () => {
  try {
    loading.value = true;

    // Traer top países para obtener números reales
    const [casesData, deathsData, vaccinationsData] = await Promise.all([
      getTopCountries("total_cases", 10),
      getTopCountries("total_deaths", 10),
      getTopCountries("total_vaccinations", 10),
    ]);

    // Sumar los top 10 de cada métrica
    totalCases.value = casesData.reduce(
      (sum, country) => sum + country.value,
      0
    );
    totalDeaths.value = deathsData.reduce(
      (sum, country) => sum + country.value,
      0
    );
    totalVaccinations.value = vaccinationsData.reduce(
      (sum, country) => sum + country.value,
      0
    );
  } catch (error) {
    console.error("Error loading summary:", error);
  } finally {
    loading.value = false;
  }
});
async function handleFiltersApplied(filters) {
  console.log("Filters received in HomeView:", filters);

  // Update current location and metric for dynamic title
  currentLocation.value = filters.location;

  // Map metric values to user-friendly names
  const metricNames = {
    'overall': 'Overview',
    'total_cases': 'Total Cases',
    'total_deaths': 'Total Deaths',
    'total_vaccinations': 'Total Vaccinations',
    'new_cases': 'New Cases',
    'new_deaths': 'New Deaths'
  };
  currentMetric.value = metricNames[filters.metric] || filters.metric;

  isWorldView.value = filters.location === "World";
  filtersApplied.value = true;
  selectedMetric.value = filters.metric;

  try {
    loading.value = true;

    // Si es "overall", usar "total_cases" para el Time Series
    const metricForTimeSeries = filters.metric === "overall" ? "total_cases" : filters.metric;

    // Cargar datos de serie de tiempo
    const data = await getTimeSeriesData(filters.location, metricForTimeSeries);
    chartData.value = data.map((item) => ({
      date: item.date,
      value: item.value,
    }));

    console.log("Chart updated with filtered data");

    // Si es vista mundial, cargar datos adicionales
    if (isWorldView.value) {
      const continentsData = await getContinents();

      // Siempre cargar casos y muertes por continente (para "overall")
      continentCasesData.value = continentsData.map(continent => ({
        label: continent.continent,
        value: continent.total_cases
      }));
      continentDeathsData.value = continentsData.map(continent => ({
        label: continent.continent,
        value: continent.total_deaths
      }));

      // Cargar top 10 países según la métrica
      const metricForTop10 = filters.metric === "overall" ? "total_cases" : filters.metric;
      const topCountries = await getTopCountries(metricForTop10, 10);
      topCountriesData.value = topCountries.map(country => ({
        label: country.location,
        value: country.value
      }));
    }
  } catch (error) {
    console.error("Error applying filters:", error);
  } finally {
    loading.value = false;
  }
}

function handleFiltersReset() {
  filtersApplied.value = false;
  currentLocation.value = "Global";
  currentMetric.value = "Overview";
}
</script>
<template>
  <TopBar />
  <div class="flex bg-white min-h-[calc(100vh-4rem)]" style="height:calc(100vh - 4rem);">
    <!-- Sidebar (FilterPanel) -->
    <aside class="w-72 p-6 bg-gray-50 border-r border-gray-200 h-[calc(100vh-4rem)] sticky top-16 z-40 shadow-sm">
      <FilterPanel @filtersApplied="handleFiltersApplied" @filtersReset="handleFiltersReset" />
    </aside>

    <!-- Contenido Principal -->
    <main class="flex-1 p-8 overflow-y-auto h-[calc(100vh-4rem)]">
      <div class="max-w-6xl mx-auto">
        <!-- Título Dinámico -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-900">
            {{ currentLocation }}
            <span class="text-gray-400 mx-2">•</span>
            <span class="text-blue-600">{{ currentMetric }}</span>
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Real-time data analysis and insights
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatsCard
            title="Top 10 - Cases"
            :value="formatNumber(totalCases)"
            icon=""
            color="white"
            class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center"
          />
          <StatsCard
            title="Top 10 - Deaths"
            :value="formatNumber(totalDeaths)"
            icon=""
            color="white"
            class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center"
          />
          <StatsCard
            title="Top 10 - Vaccinations"
            :value="formatNumber(totalVaccinations)"
            icon=""
            color="white"
            class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center"
          />
        </div>

        <!-- Gráficas - Solo se muestran después de aplicar filtros -->
        <div v-if="filtersApplied">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LineChart
              title="Cases Over Time"
              :data="chartData"
              color="#2563eb"
            />
            <HorizontalBarChart
              v-if="isWorldView"
              title="Top 10 Countries"
              :data="topCountriesData"
              color="#10b981"
            />
            <PieChart
              v-if="isWorldView && selectedMetric === 'overall'"
              title="Cases by Continent"
              :data="continentCasesData"
            />
            <BarChart
              v-if="isWorldView && selectedMetric === 'overall'"
              title="Deaths by Continent"
              :data="continentDeathsData"
              color="#ef4444"
            />
          </div>
        </div>

        <!-- Info Card - Se muestra cuando NO hay filtros aplicados -->
        <div
          v-else
          class="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-gray-800"
        >
          <h2 class="text-2xl font-semibold mb-4">
            Welcome to COVID-19 Dashboard
          </h2>
          <p class="text-lg mb-2">To get started:</p>
          <ol class="list-decimal list-inside space-y-2">
            <li>
              Select a <span class="font-semibold text-blue-700">Location</span> (World or a specific country)
            </li>
            <li>
              Select a <span class="font-semibold text-blue-700">Metric</span> (cases, deaths, vaccinations, etc.)
            </li>
            <li>
              Click <span class="font-semibold text-blue-700">Apply Filters</span>
            </li>
          </ol>
          <p class="text-lg mt-4">
            The dashboard will display different charts based on your selection!
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

