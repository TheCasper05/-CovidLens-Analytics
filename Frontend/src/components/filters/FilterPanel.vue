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
    class="p-4 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-4"
  >
    <!-- Title -->
    <h2 class="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">
      🔍 FILTERS
    </h2>

    <!-- Location Select -->
    <div class="mb-4">
      <label class="block font-bold mb-2 uppercase text-sm">Location:</label>
      <select
        v-model="selectedLocation"
        class="w-full border-2 border-black px-4 py-2 bg-white font-bold cursor-pointer focus:outline-none focus:border-4"
      >
        <option v-for="location in locations" :key="location" :value="location">
          {{ location }}
        </option>
      </select>
    </div>

    <!-- Metric Select -->
    <div class="mb-4">
      <label class="block font-bold mb-2 uppercase text-sm">Metric:</label>
      <select
        v-model="selectedMetric"
        class="w-full border-2 border-black px-4 py-2 bg-white font-bold cursor-pointer focus:outline-none focus:border-4"
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
        class="flex-1 bg-lime-400 border-2 border-black px-4 py-3 font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        ✓ Apply
      </button>

      <button
        @click="resetFilters"
        class="flex-1 bg-pink-400 border-2 border-black px-4 py-3 font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        ✕ Reset
      </button>
    </div>
  </div>
</template>
