<template>
  <nav class="app-bar">
    <div class="left">
      <img src="/favicon.ico" alt="Logo" class="logo" />
      <span class="title">Covid Dashboard</span>
    </div>
    <div class="right">

      <span class="theme-switch">
        <i class="pi pi-sun" :class="{ active: !isDark }" />
        <InputSwitch :model-value="isDark" @update:model-value="toggleTheme" />
        <i class="pi pi-moon" :class="{ active: isDark }" />
      </span>
      <img src="https://i.pravatar.cc/40?img=3" alt="Avatar" class="avatar" />
    </div>
  </nav>
</template>

<script setup>
import InputSwitch from 'primevue/inputswitch'

const { isDark, toggleTheme, initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<style scoped>
.app-bar {
  width: 100%;
  height: 60px;
  background: var(--surface-card);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
.left {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.logo {
  width: 36px;
  height: 36px;
  border-radius: 8px;
}
.title {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-primary);
  transition: color 0.3s ease;
}
.right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.3s ease;
}
.notification-btn {
  font-size: 1.2rem;
}
.theme-switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
}
.theme-switch .pi {
  opacity: 0.5;
  transition: opacity 0.2s, color 0.3s ease;
  color: var(--text-secondary);
}
.theme-switch .pi.active {
  opacity: 1;
  color: #f7b731;
}
</style>
