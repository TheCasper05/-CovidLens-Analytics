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
    borderColor: '#000',
    strokeDashArray: 0
  }
}))

const series = computed(() => [{
    name: props.title,
    data: props.data.map(item => item.value)  // Ahora se recalcula cuando props.data cambie
}])
</script>
<template>
  <div class="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
    <!-- Título del gráfico -->
    <h3 class="text-xl font-black uppercase mb-4 border-b-4 border-black pb-2">
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