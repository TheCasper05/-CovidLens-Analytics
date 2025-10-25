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
  <div 
    :class="`bg-${color}-400 border-4 border-black p-6 
             shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
             hover:translate-x-[2px] hover:translate-y-[2px]
             hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
             transition-all`"
  >
    <!-- Icon & Title -->
    <div class="flex items-center gap-2 mb-4">
      <span class="text-3xl">{{ icon }}</span>
      <h3 class="text-sm font-black uppercase">{{ title }}</h3>
    </div>

    <!-- Value -->
    <p class="text-4xl font-black mb-2">
      {{ value }}
    </p>

    <!-- Change (optional) -->
    <p v-if="change" class="text-sm font-bold">
      {{ change }}
    </p>
  </div>
</template>