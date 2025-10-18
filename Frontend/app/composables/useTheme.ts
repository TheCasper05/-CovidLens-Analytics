import { generateCSSVariables, getChartColors, getStateColors } from '~/config/theme.config'

export const useTheme = () => {
  const isDark = ref(false)

  const applyCSSVariables = (theme: 'light' | 'dark') => {
    if (!import.meta.client) return

    const variables = generateCSSVariables(theme)
    const root = document.documentElement

    // Aplicar todas las variables CSS
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (import.meta.client) {
      const theme = isDark.value ? 'dark' : 'light'

      // Agregar/remover clase para PrimeVue
      if (isDark.value) {
        document.documentElement.classList.add('dark-mode')
      } else {
        document.documentElement.classList.remove('dark-mode')
      }

      // Aplicar variables CSS
      applyCSSVariables(theme)

      // Guardar preferencia
      localStorage.setItem('theme', theme)
    }
  }

  const initTheme = () => {
    if (import.meta.client) {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)

      const theme = isDark.value ? 'dark' : 'light'

      if (isDark.value) {
        document.documentElement.classList.add('dark-mode')
      }

      // Aplicar variables CSS
      applyCSSVariables(theme)
    }
  }

  return {
    isDark,
    toggleTheme,
    initTheme,
    getChartColors: () => getChartColors(isDark.value),
    getStateColors: () => getStateColors(isDark.value)
  }
}
