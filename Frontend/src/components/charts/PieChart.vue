<script setup lang="ts">
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

interface Props {
  title: string;
  data: { label: string; value: number }[];
  colors?: string[];
}
const props = defineProps<Props>();

// Opciones del gráfico
const chartOptions = computed(() => ({
  chart: {
    type: 'pie'
  },
  labels: props.data.map(item => item.label),
  colors: props.colors || ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
  legend: {
    position: 'bottom',
    labels: {
      colors: '#4b5563',
      useSeriesColors: false
    }
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
      fontWeight: '600',
      colors: ['#fff']
    }
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['#fff']
  }
}));

const series = computed(() => props.data.map(item => item.value));
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
    <!-- Título del gráfico -->
    <h3 class="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
      {{ title }}
    </h3>

    <!-- Gráfico -->
    <VueApexCharts
      type="pie"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
