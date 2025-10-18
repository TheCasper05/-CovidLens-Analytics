<template>
  <div class="dashboard">
    <header class="header">
      <h1>📊 COVID-19 Dashboard</h1>
      <p class="subtitle">
        Visualización interactiva de datos globales de COVID-19 (OWID Dataset)
      </p>
    </header>

    <div class="container">


      <!-- Info Card - Shown when no filters applied -->
      <div v-if="!filtersApplied" class="info-section">
        <Card class="info-card">
          <template #header>
            <div class="info-icon">
             <div class="cta-section">
                <p class="cta-text">
                  <i class="pi pi-arrow-left"></i>
                  Selecciona una ubicación y métrica en los filtros superiores para comenzar a explorar los datos
                </p>
              </div>
            </div>
          </template>
          <template #title>
            <h2>Información sobre COVID-19</h2>
          </template>
          <template #content>
            <div class="info-content">
              <p class="info-description">
                Bienvenido al Dashboard de COVID-19. Utiliza los filtros superiores para visualizar datos específicos sobre:
              </p>

              <div class="info-grid">
                <div class="info-item">
                  <i class="pi pi-chart-line"></i>
                  <h3>Series de Tiempo</h3>
                  <p>Evolución temporal de casos, muertes y vacunaciones</p>
                </div>

                <div class="info-item">
                  <i class="pi pi-globe"></i>
                  <h3>Top Países</h3>
                  <p>Ranking de países según diferentes métricas</p>
                </div>

                <div class="info-item">
                  <i class="pi pi-chart-pie"></i>
                  <h3>Por Continente</h3>
                  <p>Distribución de casos y muertes por continente</p>
                </div>

                <div class="info-item">
                  <i class="pi pi-chart-bar"></i>
                  <h3>Comparativas</h3>
                  <p>Análisis comparativo entre diferentes regiones</p>
                </div>
              </div>

              <div class="latest-updates">
                <h3>Últimas Actualizaciones</h3>
                <ul>
                  <li>
                    <i class="pi pi-check-circle"></i>
                    <span>Los datos se actualizan periódicamente desde Our World in Data</span>
                  </li>
                  <li>
                    <i class="pi pi-check-circle"></i>
                    <span>Incluye información de más de 200 países y territorios</span>
                  </li>
                  <li>
                    <i class="pi pi-check-circle"></i>
                    <span>Visualizaciones interactivas con gráficos dinámicos</span>
                  </li>
                  <li>
                    <i class="pi pi-check-circle"></i>
                    <span>Análisis por ubicación geográfica y tipo de métrica</span>
                  </li>
                </ul>
              </div>

              
            </div>
          </template>
        </Card>
      </div>

      <!-- Charts Grid - Shown when filters applied -->
      <div v-else class="charts-grid">
        <!-- Chart 1: Time Series -->
        <Card class="chart-card">
          <template #title>Time Series - {{ selectedMetric }}</template>
          <template #content>
            <ProgressSpinner v-if="loadingTimeSeries" />
            <LineChart v-else-if="timeSeriesData" :data="timeSeriesData" />
          </template>
        </Card>

        <!-- Chart 2: Top Countries -->
        <Card class="chart-card">
          <template #title>Top 10 Countries by {{ selectedMetric }}</template>
          <template #content>
            <ProgressSpinner v-if="loadingTopCountries" />
            <BarChart v-else-if="topCountriesData" :data="topCountriesData" />
          </template>
        </Card>

        <!-- Chart 3: Continents -->
        <Card class="chart-card">
          <template #title>Cases by Continent</template>
          <template #content>
            <ProgressSpinner v-if="loadingContinents" />
            <PieChart v-else-if="continentsData" :data="continentsData" />
          </template>
        </Card>

        <!-- Chart 4: Deaths by Continent -->
        <Card class="chart-card">
          <template #title>Deaths by Continent</template>
          <template #content>
            <ProgressSpinner v-if="loadingContinents" />
            <BarChart
              v-else-if="continentsDeathsData"
              :data="continentsDeathsData"
            />
          </template>
        </Card>
      </div>

      <footer class="footer">
        <p>
          Data Source:
          <a href="https://ourworldindata.org/covid-deaths" target="_blank"
            >Our World in Data</a
          >
        </p>
        <p>
          ✍️ Authors: Jean Marthé, Oscar Gil, Juan Palacios | Universidad del
          Norte
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from "vue";
import LineChart from "~/components/charts/LineChart.vue";
import BarChart from "~/components/charts/BarChart.vue";
import PieChart from "~/components/charts/PieChart.vue";

const {
  fetchSummary,
  fetchContinents,
  fetchTopCountries,
  fetchTimeSeries,
  fetchLocations,
} = useCovidApi();

// State
const summary = ref<any>(null);
const continents = ref<any[]>([]);
const locations = ref<string[]>([]);
const selectedLocation = ref("World");
const selectedMetric = ref("total_cases");
const filtersApplied = ref(false);

// Loading states
const loadingLocations = ref(false);
const loadingTimeSeries = ref(false);
const loadingTopCountries = ref(false);
const loadingContinents = ref(false);

// Metrics options
const metrics = [
  { label: "Total Cases", value: "total_cases" },
  { label: "Total Deaths", value: "total_deaths" },
  { label: "Total Vaccinations", value: "total_vaccinations" },
  { label: "New Cases", value: "new_cases" },
  { label: "New Deaths", value: "new_deaths" },
];

// Chart data
const timeSeriesData = ref<any>(null);
const topCountriesData = ref<any>(null);
const continentsData = ref<any>(null);
const continentsDeathsData = ref<any>(null);

// Format number
const formatNumber = (num: number) => {
  if (!num) return "0";
  return new Intl.NumberFormat("en-US").format(num);
};

// Load data
const loadSummary = async () => {
  try {
    summary.value = await fetchSummary();
  } catch (error) {
    console.error("Error loading summary:", error);
  }
};

const loadLocations = async () => {
  try {
    loadingLocations.value = true;
    locations.value = await fetchLocations();
  } catch (error) {
    console.error("Error loading locations:", error);
  } finally {
    loadingLocations.value = false;
  }
};

const loadTimeSeries = async () => {
  try {
    loadingTimeSeries.value = true;
    const data: any = await fetchTimeSeries(
      selectedLocation.value,
      selectedMetric.value
    );

    timeSeriesData.value = {
      labels: data.map((d: any) => d.date),
      datasets: [
        {
          label: selectedMetric.value.replace("_", " ").toUpperCase(),
          data: data.map((d: any) => d.value),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
        },
      ],
    };
  } catch (error) {
    console.error("Error loading time series:", error);
  } finally {
    loadingTimeSeries.value = false;
  }
};

const loadTopCountries = async () => {
  try {
    loadingTopCountries.value = true;
    const data: any = await fetchTopCountries(selectedMetric.value, 10);

    topCountriesData.value = {
      labels: data.map((d: any) => d.location),
      datasets: [
        {
          label: selectedMetric.value.replace("_", " ").toUpperCase(),
          data: data.map((d: any) => d.value),
          backgroundColor: "#10b981",
          borderColor: "#059669",
        },
      ],
    };
  } catch (error) {
    console.error("Error loading top countries:", error);
  } finally {
    loadingTopCountries.value = false;
  }
};

const loadContinents = async () => {
  try {
    loadingContinents.value = true;
    const data: any = await fetchContinents();
    continents.value = data;

    // Cases by continent (Pie)
    continentsData.value = {
      labels: data.map((d: any) => d.continent),
      datasets: [
        {
          data: data.map((d: any) => d.total_cases),
          backgroundColor: [
            "#ef4444",
            "#f59e0b",
            "#10b981",
            "#3b82f6",
            "#8b5cf6",
            "#ec4899",
          ],
        },
      ],
    };

    // Deaths by continent (Bar)
    continentsDeathsData.value = {
      labels: data.map((d: any) => d.continent),
      datasets: [
        {
          label: "Total Deaths",
          data: data.map((d: any) => d.total_deaths),
          backgroundColor: "#ef4444",
          borderColor: "#dc2626",
        },
      ],
    };
  } catch (error) {
    console.error("Error loading continents:", error);
  } finally {
    loadingContinents.value = false;
  }
};

const applyFilters = () => {
  filtersApplied.value = true;
  loadTimeSeries();
  loadTopCountries();
  loadContinents();
};

// Provide applyFilters to child components (Sidebar)
provide('applyFilters', applyFilters);

// Initialize
onMounted(async () => {
  await Promise.all([
    loadSummary(),
    loadLocations(),
  ]);
});
</script>

<style scoped>
.dashboard {
  min-height: calc(100vh - 60px);
  background: linear-gradient(
    135deg,
    var(--bg-gradient-start) 0%,
    var(--bg-gradient-end) 100%
  );
  padding-bottom: 2rem;
  transition: background 0.3s ease;
}

.header {
  background: var(--surface-card);
  padding: 2rem;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: background 0.3s ease, box-shadow 0.3s ease;
  margin: 0;
}

.header h1 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.summary-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  text-align: center;
}

.summary-card h2 {
  font-size: 2rem;
  color: #3b82f6;
  margin: 0.5rem 0;
}

.filters-card {
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  gap: 1rem;
  align-items: end;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
}

.filter-group label {
  font-weight: 600;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.chart-card {
  min-height: 500px;
}

.footer {
  text-align: center;
  padding: 2rem;
  background: var(--surface-card);
  border-radius: 8px;
  margin-top: 2rem;
  transition: background 0.3s ease;
}

.footer p {
  margin: 0.5rem 0;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.footer a {
  color: #3b82f6;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

:deep(.p-card-title) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

:deep(.p-progressspinner) {
  margin: 2rem auto;
  display: block;
}

/* Info Card Styles */
.info-section {
  margin-bottom: 2rem;
}

.info-card {
  max-width: 1200px;
  margin: 0 auto;

}

.info-icon {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.info-icon i {
  font-size: 4rem;
  color: white;
} 

:deep(.info-card .p-card-title h2) {
  text-align: center;
  color: var(--text-primary);
  font-size: 2rem;
  margin: 0;
}

.info-content {
  padding: 1rem;
}

.info-description {
  text-align: center;
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.info-item {
  text-align: center;
  padding: 1.5rem;
  background: var(--surface-hover);
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.info-item i {
  font-size: 3rem;
  color: #3b82f6;
  margin-bottom: 1rem;
}

.info-item h3 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin: 0.5rem 0;
}

.info-item p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

.latest-updates {
  background: var(--surface-hover);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.latest-updates h3 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.latest-updates ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.latest-updates li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-color);
}

.latest-updates li:last-child {
  border-bottom: none;
}

.latest-updates li i {
  color: #10b981;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.latest-updates li span {
  color: var(--text-secondary);
  line-height: 1.6;
}

.cta-section {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.cta-text {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.cta-text i {
  font-size: 1.5rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
