<script setup>
import { ref, onMounted } from "vue";
import { getLocationData } from "@/services/api";

// State variables for filter options
const selectedLocation = ref("World");
const selectedMetric = ref("overall");

const emit = defineEmits(["filtersApplied", "filtersReset"]);

// Locations data (World + countries loaded from backend)
const locations = ref(["World"]);

// Metric options
const metrics = [
  { label: "Overall (All Metrics)", value: "overall" }, 
  { label: "Total Cases", value: "total_cases" },
  { label: "Total Deaths", value: "total_deaths" },
  { label: "Total Vaccinations", value: "total_vaccinations" },
  { label: "New Cases", value: "new_cases" },
  { label: "New Deaths", value: "new_deaths" },
];

// Fetch countries data on component mount
onMounted(async () => {
  try {
    const countries = await getLocationData();
    locations.value = ["World", ...countries];
    console.log("Fetched locations:", locations.value);
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
});

// Function to apply filters
function applyFilters() {
  emit('filtersApplied', {
    location: selectedLocation.value,
    metric: selectedMetric.value
  });

  console.log("Filters sent to parent:", {
    location: selectedLocation.value,
    metric: selectedMetric.value
  });
}

// Function to reset filters
function resetFilters() {
  selectedLocation.value = "World";
  selectedMetric.value = "overall";
  emit('filtersReset');
  console.log("Filters reset");
}
</script>

<template>
  <div
    class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
  >
    <!-- Title -->
    <h2 class="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
      Filters
    </h2>

    <!-- Location Select -->
    <div class="mb-4">
      <label class="block font-medium mb-2 text-sm text-gray-700">Location:</label>
      <select
        v-model="selectedLocation"
        class="w-full border border-gray-300 rounded px-4 py-2 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option v-for="location in locations" :key="location" :value="location">
          {{ location }}
        </option>
      </select>
    </div>

    <!-- Metric Select -->
    <div class="mb-4">
      <label class="block font-medium mb-2 text-sm text-gray-700">Metric:</label>
      <select
        v-model="selectedMetric"
        class="w-full border border-gray-300 rounded px-4 py-2 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option :value="null" disabled>Select a metric</option>
        <option
          v-for="metric in metrics"
          :key="metric.value"
          :value="metric.value"
        >
          {{ metric.label }}
        </option>
      </select>
    </div>

    <!-- Buttons -->
    <div class="flex gap-4 mt-6">
      <button
        @click="applyFilters"
        class="flex-1 bg-blue-600 text-white rounded px-4 py-3 font-semibold shadow hover:bg-blue-700 transition-colors"
      >
        Apply
      </button>

      <button
        @click="resetFilters"
        class="flex-1 bg-gray-200 text-gray-700 rounded px-4 py-3 font-semibold shadow hover:bg-gray-300 transition-colors"
      >
        Reset
      </button>
    </div>
  </div>
</template>
