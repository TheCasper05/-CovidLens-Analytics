<template>
  <div class="graph-card">
    <!-- Card para gráfico -->
    <slot />
  </div>
</template>

<script setup>
// ...
</script>

<style scoped>
.graph-card {
  background: var(--surface-card);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  padding: 1rem;
  margin-bottom: 1rem;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
</style>
