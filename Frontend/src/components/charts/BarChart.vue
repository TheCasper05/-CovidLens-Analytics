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
      horizontal: false,
      borderRadius: 4,
      dataLabels: {
        position: 'top'
      }
    }
  },
  dataLabels: {
    enabled: true,
    offsetY: -20,
    style: {
      fontSize: '11px',
      fontWeight: '600',
      colors: ['#4b5563']
    }
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
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontWeight: '500',
        colors: '#6b7280'
      },
      formatter: (value: number) => value.toLocaleString('en-US')
    }
  },
  colors: [props.color || '#ef4444'],
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
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
