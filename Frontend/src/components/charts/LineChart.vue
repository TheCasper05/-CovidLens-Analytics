<script setup lang="ts">

import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

interface Props {
    title: string;
    data: {date: string, value: number}[];
    color?: string;
}
const props = defineProps<Props>()


const chartOptions = computed(() => ({
    chart: {
        type: 'line',
        toolbar: {
            show: false
        }
    },
    stroke: {
        curve: 'smooth',
        width: 3
    },
colors: [props.color || '#84cc16'],
    xaxis: {
        categories: props.data.map(item => item.date),
        labels: {
            style: {
                fontWeight: 'bold'
            }
        }
    },
    yaxis: {
    labels: {
      style: {
        fontWeight: 'bold'
      },
      formatter: (value: number) => {
        return value.toLocaleString('en-US')
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: '#e5e7eb',
    strokeDashArray: 4
  }
}))

const series = computed(() => [{
    name: props.title,
    data: props.data.map(item => item.value)  // Ahora se recalcula cuando props.data cambie
}])
</script>
<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
    <!-- Título del gráfico -->
    <h3 class="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
      {{ title }}
    </h3>
    
    <!-- Gráfico -->
    <VueApexCharts
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>