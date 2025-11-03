<template>
  <header class="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Logo & Title -->
        <div class="flex items-center gap-3">
          <div class="bg-linear-to-br from-blue-600 to-purple-600 rounded-lg p-2 shadow-md">
            <span class="text-2xl">🔬</span>
          </div>
          <div>
            <h1 class="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
              CovidLens Analytics
            </h1>
            <p class="text-xs text-gray-500 font-medium">Real-time pandemic insights</p>
          </div>
        </div>

        <!-- Navegación -->
  <nav class="hidden md:flex items-center gap-2">
          <!-- Botón Dashboard con estado activo -->
          <RouterLink to="/" custom v-slot="{ navigate, isActive }">
            <button
              @click="navigate"
              :class="[
                'px-4 py-2 font-medium text-sm rounded border border-gray-300 transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              ]"
            >
              Dashboard
            </button>
          </RouterLink>

          <!-- Botón About con estado activo -->
          <RouterLink to="/about" custom v-slot="{ navigate, isActive }">
            <button
              @click="navigate"
              :class="[
                'px-4 py-2 font-medium text-sm rounded border border-gray-300 transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              ]"
            >
              About
            </button>
          </RouterLink>
        </nav>

      </div>
    </div>
  </header>
</template>