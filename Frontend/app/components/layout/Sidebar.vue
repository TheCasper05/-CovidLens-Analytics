<template>
  <aside class="sidebar">
    <!-- Filtros Section -->
    <div class="sidebar-section">
      <div class="section-header">
        <i class="pi pi-filter"></i>
        <h3>FILTROS</h3>
      </div>

      <!-- Ubicación -->
      <div class="filter-group">
        <label>Ubicación</label>
        <Dropdown
          v-model="selectedLocation"
          :options="locations"
          optionLabel="label"
          optionValue="value"
          placeholder="Selecciona ubicación"
          :loading="loadingLocations"
          filter
          showClear
          class="w-full"
        />
      </div>

      <!-- Métrica -->
      <div class="filter-group">
        <label>Métrica</label>
        <Dropdown
          v-model="selectedMetric"
          :options="metrics"
          optionLabel="label"
          optionValue="value"
          placeholder="Selecciona métrica"
          class="w-full"
        />
      </div>

      <!-- Aplicar Filtros Button -->
      <Button
        label="APLICAR FILTROS"
        class="apply-btn"
        @click="applyFilters"
      />
    </div>

    <!-- Estadísticas Section -->
    <div class="sidebar-section stats-section">
      <div class="section-header">
        <i class="pi pi-chart-bar"></i>
        <h3>ESTADÍSTICAS</h3>
      </div>

      <div class="stats-content">
        <div class="stat-item">
          <span class="stat-label">Total:</span>
          <span class="stat-value">{{ formatNumber(chartStats.total) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Promedio:</span>
          <span class="stat-value">{{ formatNumber(chartStats.average) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Máximo:</span>
          <span class="stat-value">{{ formatNumber(chartStats.maximum) }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

const { fetchLocations } = useCovidApi()

// Inject stats from parent (index.vue)
const chartStats = inject('chartStats', ref({
  total: 0,
  average: 0,
  maximum: 0
}))

// Filters state
const selectedLocation = ref('World')
const selectedMetric = ref('total_cases')

// Locations data
const locations = ref([])
const loadingLocations = ref(false)

// Metrics options
const metrics = ref([
  { label: 'Total de Casos', value: 'total_cases' },
  { label: 'Total de Muertes', value: 'total_deaths' },
  { label: 'Total de Vacunaciones', value: 'total_vaccinations' },
  { label: 'Nuevos Casos', value: 'new_cases' },
  { label: 'Nuevas Muertes', value: 'new_deaths' }
])

// Load locations from API
const loadLocations = async () => {
  try {
    loadingLocations.value = true
    const data = await fetchLocations()
    locations.value = data.map(loc => ({
      label: loc,
      value: loc
    }))
  } catch (error) {
    console.error('Error loading locations:', error)
  } finally {
    loadingLocations.value = false
  }
}

// Inject the applyFilters function from parent (index.vue)
const applyFiltersFromParent = inject('applyFilters', null)

const applyFilters = () => {
  const filters = {
    location: selectedLocation.value,
    metric: selectedMetric.value
  }

  console.log('Filters applied:', filters)

  // Call the parent's applyFilters function with filter data
  if (applyFiltersFromParent) {
    applyFiltersFromParent(filters)
  }
}

// Format number for stats
const formatNumber = (num) => {
  if (!num || num === 0) return '0'
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toLocaleString()
}

// Initialize
onMounted(() => {
  loadLocations()
})
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 60px;
  width: 280px;
  height: calc(100vh - 60px);
  background: var(--surface-card);
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
  z-index: 5;
  transition: background 0.3s ease, border-color 0.3s ease;
  padding: 1.5rem;
}

.sidebar-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--border-color);
}

.section-header i {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.section-header h3 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--text-primary);
}

.filter-group {
  margin-bottom: 1.5rem;
}

.filter-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.w-full {
  width: 100%;
}

.date-inputs {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.date-field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.date-field i {
  color: #ef4444;
  font-size: 0.9rem;
}

.date-field span {
  min-width: 40px;
}

.apply-btn {
  width: 100%;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  padding: 0.75rem;
  background: #3b82f6;
  border: none;
  margin-top: 1rem;
}

.stats-section {
  background: var(--surface-hover);
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.stats-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.stat-value {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

:deep(.p-dropdown),
:deep(.p-calendar),
:deep(.p-inputtext) {
  font-size: 0.875rem;
}

:deep(.p-inputtext) {
  padding: 0.5rem;
}
</style>
