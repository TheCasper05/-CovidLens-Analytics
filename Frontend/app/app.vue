
<template>
  <div id="app">
    <AppBar />
    <main class="main-content">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import AppBar from './components/layout/AppBar.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Backgrounds */
  --bg-primary: #f5f7fa;
  --bg-secondary: #ffffff;
  --bg-gradient-start: #667eea;
  --bg-gradient-end: #764ba2;

  /* Text Colors */
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-tertiary: #94a3b8;

  /* Surface Colors */
  --surface-card: #ffffff;
  --surface-hover: #f8fafc;

  /* Border Colors */
  --border-color: #e2e8f0;

  /* Shadow */
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
  --shadow-md: 0 2px 10px rgba(0,0,0,0.1);
  --shadow-lg: 0 2px 8px rgba(0,0,0,0.04);
}

.dark-mode {
  /* Backgrounds */
  --bg-primary: #0f0f1e;
  --bg-secondary: #1a1a2e;
  --bg-gradient-start: #2d3561;
  --bg-gradient-end: #3d2d5f;

  /* Text Colors */
  --text-primary: #e0e0e0;
  --text-secondary: #a0a0b0;
  --text-tertiary: #707080;

  /* Surface Colors */
  --surface-card: #1e1e2e;
  --surface-hover: #252535;

  /* Border Colors */
  --border-color: #2d2d3d;

  /* Shadow */
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.3);
  --shadow-md: 0 2px 10px rgba(0,0,0,0.5);
  --shadow-lg: 0 2px 8px rgba(0,0,0,0.4);
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  min-height: 100vh;
}

.main-content {
  margin-top: 60px; /* Height of AppBar */
  min-height: calc(100vh - 60px);
}
</style>
