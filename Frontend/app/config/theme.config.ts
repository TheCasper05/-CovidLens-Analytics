/**
 * Configuración de Tema y Paleta de Colores
 *
 * Este archivo centraliza todos los colores de la aplicación.
 * Los colores se definen como CSS variables que cambian automáticamente
 * cuando se alterna entre modo light y dark.
 */

export const themeConfig = {
  light: {
    // Brand Colors
    primary: '#3b82f6',      // Blue-500
    secondary: '#8b5cf6',    // Purple-500
    accent: '#f59e0b',       // Amber-500

    // Backgrounds
    bgPrimary: '#f5f7fa',    // Gray-50
    bgSecondary: '#ffffff',  // White
    bgGradientStart: '#667eea',
    bgGradientEnd: '#764ba2',

    // Text Colors
    textPrimary: '#1e293b',   // Slate-800
    textSecondary: '#64748b', // Slate-500
    textTertiary: '#94a3b8',  // Slate-400

    // Surface Colors (Cards, Panels)
    surfaceCard: '#ffffff',
    surfaceHover: '#f8fafc',  // Slate-50

    // Border Colors
    borderColor: '#e2e8f0',   // Slate-200
    borderLight: '#f1f5f9',   // Slate-100

    // State Colors
    success: '#10b981',       // Green-500
    warning: '#f59e0b',       // Amber-500
    danger: '#ef4444',        // Red-500
    info: '#3b82f6',          // Blue-500

    // Chart Colors
    chartColors: {
      blue: '#3b82f6',
      green: '#10b981',
      red: '#ef4444',
      amber: '#f59e0b',
      purple: '#8b5cf6',
      pink: '#ec4899',
      indigo: '#6366f1',
      teal: '#14b8a6',
    },

    // Shadows
    shadowSm: '0 2px 4px rgba(0, 0, 0, 0.05)',
    shadowMd: '0 2px 10px rgba(0, 0, 0, 0.1)',
    shadowLg: '0 2px 8px rgba(0, 0, 0, 0.04)',
  },

  dark: {
    // Brand Colors (slightly adjusted for dark mode)
    primary: '#60a5fa',      // Blue-400 (lighter in dark mode)
    secondary: '#a78bfa',    // Purple-400
    accent: '#fbbf24',       // Amber-400

    // Backgrounds
    bgPrimary: '#0f0f1e',    // Very dark blue
    bgSecondary: '#1a1a2e',  // Dark blue
    bgGradientStart: '#2d3561',
    bgGradientEnd: '#3d2d5f',

    // Text Colors
    textPrimary: '#e0e0e0',   // Light gray
    textSecondary: '#a0a0b0', // Medium gray
    textTertiary: '#707080',  // Darker gray

    // Surface Colors
    surfaceCard: '#1e1e2e',
    surfaceHover: '#252535',

    // Border Colors
    borderColor: '#2d2d3d',
    borderLight: '#252535',

    // State Colors (lighter versions for dark mode)
    success: '#34d399',       // Green-400
    warning: '#fbbf24',       // Amber-400
    danger: '#f87171',        // Red-400
    info: '#60a5fa',          // Blue-400

    // Chart Colors (same as light mode - charts handle their own contrast)
    chartColors: {
      blue: '#60a5fa',
      green: '#34d399',
      red: '#f87171',
      amber: '#fbbf24',
      purple: '#a78bfa',
      pink: '#f472b6',
      indigo: '#818cf8',
      teal: '#2dd4bf',
    },

    // Shadows (darker and more prominent in dark mode)
    shadowSm: '0 2px 4px rgba(0, 0, 0, 0.3)',
    shadowMd: '0 2px 10px rgba(0, 0, 0, 0.5)',
    shadowLg: '0 2px 8px rgba(0, 0, 0, 0.4)',
  }
}

/**
 * Genera las CSS Variables a partir del tema
 */
export function generateCSSVariables(theme: 'light' | 'dark') {
  const colors = themeConfig[theme]

  return {
    // Brand
    '--color-primary': colors.primary,
    '--color-secondary': colors.secondary,
    '--color-accent': colors.accent,

    // Backgrounds
    '--bg-primary': colors.bgPrimary,
    '--bg-secondary': colors.bgSecondary,
    '--bg-gradient-start': colors.bgGradientStart,
    '--bg-gradient-end': colors.bgGradientEnd,

    // Text
    '--text-primary': colors.textPrimary,
    '--text-secondary': colors.textSecondary,
    '--text-tertiary': colors.textTertiary,

    // Surface
    '--surface-card': colors.surfaceCard,
    '--surface-hover': colors.surfaceHover,

    // Border
    '--border-color': colors.borderColor,
    '--border-light': colors.borderLight,

    // State
    '--color-success': colors.success,
    '--color-warning': colors.warning,
    '--color-danger': colors.danger,
    '--color-info': colors.info,

    // Chart Colors
    '--chart-blue': colors.chartColors.blue,
    '--chart-green': colors.chartColors.green,
    '--chart-red': colors.chartColors.red,
    '--chart-amber': colors.chartColors.amber,
    '--chart-purple': colors.chartColors.purple,
    '--chart-pink': colors.chartColors.pink,
    '--chart-indigo': colors.chartColors.indigo,
    '--chart-teal': colors.chartColors.teal,

    // Shadows
    '--shadow-sm': colors.shadowSm,
    '--shadow-md': colors.shadowMd,
    '--shadow-lg': colors.shadowLg,
  }
}

/**
 * Exporta los colores para usar en JavaScript
 * Útil para gráficos y componentes que necesitan colores programáticamente
 */
export function getChartColors(isDark: boolean) {
  const theme = isDark ? 'dark' : 'light'
  return themeConfig[theme].chartColors
}

export function getStateColors(isDark: boolean) {
  const theme = isDark ? 'dark' : 'light'
  return {
    success: themeConfig[theme].success,
    warning: themeConfig[theme].warning,
    danger: themeConfig[theme].danger,
    info: themeConfig[theme].info,
  }
}
