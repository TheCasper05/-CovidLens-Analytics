<script setup>
import { ref, onMounted } from "vue";

import { getLocationData } from "@/services/api";

// State variables for filter options
const selectedCountry = ref(null);
const selectedContinent = ref(null);
const selectedMetric = ref(null);
const startDate = ref("");
const endDate = ref("");

// Countries data (loaded from backend)
const countries = ref([]);

// Metric options
const metrics = [
  { label: "Total Cases", value: "total_cases" },
  { label: "Total Deaths", value: "total_deaths" },
  { label: "Total Vaccinations", value: "total_vaccinations" },
  { label: "New Cases", value: "new_cases" },
  { label: "New Deaths", value: "new_deaths" },
];

// Continent options
const continents = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "Oceania",
  "South America",
];

// Fetch countries data on component mount
onMounted(async () => {
  try {
    countries.value = await getLocationData();
    console.log("Fetched countries:", countries.value);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
});

// Function to apply filters
function applyFilters() {
  console.log("=== Applied Filters ===");
  console.log("Country:", selectedCountry.value);
  console.log("Continent:", selectedContinent.value);
  console.log("Metric:", selectedMetric.value);
  console.log("Start Date:", startDate.value);
  console.log("End Date:", endDate.value);

  // Later we'll call the API with these filters
}

// Function to reset filters
function resetFilters() {
  selectedCountry.value = null;
  selectedContinent.value = null;
  selectedMetric.value = null;
  startDate.value = "";
  endDate.value = "";
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

    <!-- Country Select -->
    <div class="mb-4">
      <label class="block font-bold mb-2 uppercase text-sm">Country:</label>
      <select
        v-model="selectedCountry"
        class="w-full border-2 border-black px-4 py-2 bg-white font-bold cursor-pointer focus:outline-none focus:border-4"
      >
        <option value="">Select a country</option>
        <option v-for="country in countries" :key="country" :value="country">
          {{ country }}
        </option>
      </select>
    </div>

    <!-- Continent Select -->
    <div class="mb-4">
      <label class="block font-bold mb-2 uppercase text-sm">Continent:</label>
      <select
        v-model="selectedContinent"
        class="w-full border-2 border-black px-4 py-2 bg-white font-bold cursor-pointer focus:outline-none focus:border-4"
      >
        <option value="">Select a continent</option>
        <option
          v-for="continent in continents"
          :key="continent"
          :value="continent"
        >
          {{ continent }}
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
        <option value="">Select a metric</option>
        <option
          v-for="metric in metrics"
          :key="metric.value"
          :value="metric.value"
        >
          {{ metric.label }}
        </option>
      </select>
    </div>

    <!-- Start Date -->
    <div class="mb-4">
      <label class="block font-bold mb-2 uppercase text-sm">Start Date:</label>
      <input
        v-model="startDate"
        type="date"
        class="w-full border-2 border-black px-4 py-2 font-mono bg-white focus:outline-none focus:border-4"
      />
    </div>

    <!-- End Date -->
    <div class="mb-4">
      <label class="block font-bold mb-2 uppercase text-sm">End Date:</label>
      <input
        v-model="endDate"
        type="date"
        class="w-full border-2 border-black px-4 py-2 font-mono bg-white focus:outline-none focus:border-4"
      />
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
