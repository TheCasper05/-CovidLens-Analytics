<script setup lang="ts">
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

interface Props {
  title: string;
  data: { label: string; value: number }[];
  color?: string;
}
const props = defineProps<Props>();

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 4,
      dataLabels: {
        position: 'top'
      }
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: 30,
    style: {
      fontSize: '11px',
      fontWeight: '600',
      colors: ['#4b5563']
    },
    formatter: (value: number) => value.toLocaleString('en-US')
  },
  stroke: {
    show: false
  },
  xaxis: {
    categories: props.data.map(item => item.label),
    labels: {
      style: {
        fontWeight: '500',
        colors: '#6b7280'
      },
      formatter: (value: number) => value.toLocaleString('en-US')
    }
  },
  yaxis: {
    labels: {
      style: {
        fontWeight: '500',
        colors: '#6b7280'
      }
    }
  },
  colors: [props.color || '#10b981'],
  grid: {
    borderColor: '#e5e7eb',
    strokeDashArray: 4
  }
}));

const series = computed(() => [{
  name: props.title,
  data: props.data.map(item => item.value)
}]);
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
    <h3 class="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
      {{ title }}
    </h3>
    <VueApexCharts
      type="bar"
      height="400"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
