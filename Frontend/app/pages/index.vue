<template>
  <div class="dashboard">
    <header class="header">
      <h1>📊 COVID-19 Dashboard</h1>
      <p class="subtitle">
        Visualización interactiva de datos globales de COVID-19 (OWID Dataset)
      </p>
    </header>

    <div class="container">
      <!-- Charts Grid -->
      <div class="charts-grid">
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
import { ref, onMounted, computed } from "vue";
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
  loadTimeSeries();
  loadTopCountries();
};

// Initialize
onMounted(async () => {
  await Promise.all([
    loadSummary(),
    loadLocations(),
    loadTimeSeries(),
    loadTopCountries(),
    loadContinents(),
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
</style>
