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
      borderRadius: 0,
      dataLabels: {
        position: 'top'
      }
    }
  },
  dataLabels: {
    enabled: true,
    offsetY: -20,
    style: {
      fontSize: '12px',
      fontWeight: 'bold',
      colors: ['#000']
    }
  },
  stroke: {
    show: true,
    width: 3,
    colors: ['#000']
  },
  xaxis: {
    categories: props.data.map(item => item.label),
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
      formatter: (value: number) => value.toLocaleString('en-US')
    }
  },
  colors: [props.color || '#ec4899'],
  grid: {
    borderColor: '#000',
    strokeDashArray: 0
  }
}));

const series = computed(() => [{
  name: props.title,
  data: props.data.map(item => item.value)
}]);
</script>

<template>
  <div class="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
    <h3 class="text-xl font-black uppercase mb-4 border-b-4 border-black pb-2">
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
