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
  colors: props.colors || ['#fbbf24', '#ec4899', '#84cc16', '#3b82f6', '#8b5cf6', '#f59e0b'],
  legend: {
    position: 'bottom',
    labels: {
      colors: '#000',
      useSeriesColors: false
    }
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      colors: ['#000']
    }
  },
  stroke: {
    show: true,
    width: 3,
    colors: ['#000']
  }
}));

const series = computed(() => props.data.map(item => item.value));
</script>

<template>
  <div class="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
    <!-- Título del gráfico -->
    <h3 class="text-xl font-black uppercase mb-4 border-b-4 border-black pb-2">
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
