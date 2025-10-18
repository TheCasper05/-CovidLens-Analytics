# Guía de Uso del Sistema de Temas

Este proyecto utiliza un sistema de temas centralizado con soporte para modo claro y oscuro.

## 📁 Archivos Principales

- **`app/config/theme.config.ts`**: Paleta de colores centralizada
- **`app/composables/useTheme.ts`**: Composable para manejar el tema
- **`app/plugins/primevue.ts`**: Configuración de PrimeVue con tema personalizado

## 🎨 Variables CSS Disponibles

Todas las variables CSS están definidas automáticamente y cambian según el tema activo.

### Colores de Marca
```css
var(--color-primary)    /* Azul principal */
var(--color-secondary)  /* Morado secundario */
var(--color-accent)     /* Amarillo/ámbar de acento */
```

### Fondos
```css
var(--bg-primary)       /* Fondo principal de la app */
var(--bg-secondary)     /* Fondo secundario */
var(--bg-gradient-start) /* Inicio del gradiente */
var(--bg-gradient-end)   /* Fin del gradiente */
```

### Textos
```css
var(--text-primary)     /* Texto principal */
var(--text-secondary)   /* Texto secundario (subtítulos) */
var(--text-tertiary)    /* Texto terciario (disabled, placeholders) */
```

### Superficies (Cards, Paneles)
```css
var(--surface-card)     /* Fondo de cards */
var(--surface-hover)    /* Hover en superficies */
```

### Bordes
```css
var(--border-color)     /* Color de borde principal */
var(--border-light)     /* Color de borde claro */
```

### Estados
```css
var(--color-success)    /* Verde - éxito */
var(--color-warning)    /* Ámbar - advertencia */
var(--color-danger)     /* Rojo - peligro */
var(--color-info)       /* Azul - información */
```

### Colores para Gráficos
```css
var(--chart-blue)
var(--chart-green)
var(--chart-red)
var(--chart-amber)
var(--chart-purple)
var(--chart-pink)
var(--chart-indigo)
var(--chart-teal)
```

### Sombras
```css
var(--shadow-sm)        /* Sombra pequeña */
var(--shadow-md)        /* Sombra mediana */
var(--shadow-lg)        /* Sombra grande */
```

## 💻 Uso en CSS/SCSS

### Ejemplo básico
```vue
<template>
  <div class="my-component">
    <h1 class="title">Título</h1>
    <p class="description">Descripción</p>
  </div>
</template>

<style scoped>
.my-component {
  background: var(--surface-card);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease; /* ¡Importante para transiciones suaves! */
}

.title {
  color: var(--text-primary);
  font-size: 1.5rem;
}

.description {
  color: var(--text-secondary);
  font-size: 1rem;
}
</style>
```

### Ejemplo con gradiente
```vue
<style scoped>
.hero-section {
  background: linear-gradient(
    135deg,
    var(--bg-gradient-start) 0%,
    var(--bg-gradient-end) 100%
  );
  min-height: 100vh;
  transition: background 0.3s ease;
}
</style>
```

## 🎯 Uso en JavaScript/TypeScript

### Obtener colores para gráficos
```vue
<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const { isDark, toggleTheme, getChartColors, getStateColors } = useTheme()

// Obtener colores para Chart.js
const chartData = computed(() => {
  const colors = getChartColors()

  return {
    labels: ['Enero', 'Febrero', 'Marzo'],
    datasets: [{
      label: 'Ventas',
      data: [12, 19, 3],
      backgroundColor: colors.blue,
      borderColor: colors.blue
    }]
  }
})

// Obtener colores de estado
const statusColor = computed(() => {
  const colors = getStateColors()
  return isSuccess.value ? colors.success : colors.danger
})
</script>
```

### Cambiar tema programáticamente
```vue
<script setup lang="ts">
const { isDark, toggleTheme, initTheme } = useTheme()

// Inicializar tema al montar
onMounted(() => {
  initTheme()
})

// Cambiar tema
const handleThemeToggle = () => {
  toggleTheme()
}

// Verificar si está en modo oscuro
watch(isDark, (newValue) => {
  console.log('Modo oscuro:', newValue)
})
</script>
```

## 🔧 Modificar la Paleta de Colores

Para cambiar los colores, edita `app/config/theme.config.ts`:

```typescript
export const themeConfig = {
  light: {
    primary: '#3b82f6',      // Cambia este color
    secondary: '#8b5cf6',    // O este
    // ...
  },
  dark: {
    primary: '#60a5fa',      // Versión oscura
    secondary: '#a78bfa',    // Versión oscura
    // ...
  }
}
```

## ✅ Buenas Prácticas

### ✓ Hacer
- Usar **siempre** variables CSS en lugar de colores hardcodeados
- Agregar `transition: all 0.3s ease;` para cambios suaves de tema
- Usar `var(--text-primary)` para textos principales
- Usar `var(--surface-card)` para fondos de componentes
- Usar `getChartColors()` para gráficos en JavaScript

### ✗ Evitar
```css
/* ❌ MAL - color hardcodeado */
.my-card {
  background: #ffffff;
  color: #000000;
}

/* ✅ BIEN - usando variables */
.my-card {
  background: var(--surface-card);
  color: var(--text-primary);
  transition: all 0.3s ease;
}
```

## 🎨 Ejemplo Completo

```vue
<template>
  <div class="dashboard-card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
      <button @click="toggleTheme" class="theme-btn">
        <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" />
      </button>
    </div>
    <div class="card-content">
      <p class="card-description">{{ description }}</p>
      <div class="stats">
        <span class="stat-value">{{ value }}</span>
        <span class="stat-label">Total</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isDark, toggleTheme, initTheme } = useTheme()

const props = defineProps<{
  title: string
  description: string
  value: number
}>()

onMounted(() => {
  initTheme()
})
</script>

<style scoped>
.dashboard-card {
  background: var(--surface-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.dashboard-card:hover {
  background: var(--surface-hover);
  box-shadow: var(--shadow-lg);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-title {
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  transition: color 0.3s ease;
}

.theme-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-btn:hover {
  background: var(--surface-hover);
  color: var(--color-primary);
}

.card-description {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  color: var(--color-primary);
  font-size: 2rem;
  font-weight: 700;
  transition: color 0.3s ease;
}

.stat-label {
  color: var(--text-tertiary);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}
</style>
```

## 📚 Recursos Adicionales

- [PrimeVue Theming](https://primevue.org/theming/)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Nuxt 3 Composables](https://nuxt.com/docs/guide/directory-structure/composables)

---

**Nota**: Todos los componentes de PrimeVue (Button, Card, DataTable, etc.) cambian automáticamente con el tema gracias a la configuración en `primevue.ts`.
