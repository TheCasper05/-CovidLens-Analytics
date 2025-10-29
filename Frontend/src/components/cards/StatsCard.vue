<script setup lang="ts">
interface Props{
    title: string;
    value: string | number;
    icon: string;
    color: string;
    change?: string;
}
const props = defineProps<Props>()

</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
    <!-- Icon & Title -->
    <div class="flex items-center gap-3 mb-4">
      <div v-if="icon" class="bg-blue-50 rounded-full p-2">
        <span class="text-2xl">{{ icon }}</span>
      </div>
      <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">{{ title }}</h3>
    </div>

    <!-- Value -->
    <p class="text-3xl font-bold text-gray-900 mb-2">
      {{ value }}
    </p>

    <!-- Change (optional) -->
    <p v-if="change" class="text-sm font-medium text-gray-500">
      {{ change }}
    </p>
  </div>
</template>