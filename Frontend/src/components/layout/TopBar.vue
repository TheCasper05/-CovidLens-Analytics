<template>
  <header class="bg-white border-b-4 border-black shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Logo & Title -->
        <div class="flex items-center gap-3">
          <div class="bg-lime-400 border-2 border-black p-2">
            <span class="text-2xl">📊</span>
          </div>
          <div>
            <h1 class="text-xl font-black uppercase tracking-tight">
              COVID-19 Dashboard
            </h1>
            <p class="text-xs text-gray-600">Real-time global statistics</p>
          </div>
        </div>

        <!-- Navegación -->
        <nav class="hidden md:flex items-center gap-2">
          <!-- Botón Dashboard con estado activo -->
          <RouterLink to="/" custom v-slot="{ navigate, isActive }">
            <button
              @click="navigate"
              :class="[
                'px-4 py-2 font-bold uppercase text-sm border-2 border-black transition-all',
                isActive
                  ? 'border-4 bg-lime-500 translate-x-[2px] translate-y-[2px]'
                  : 'bg-lime-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
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
                'px-4 py-2 font-bold uppercase text-sm border-2 border-black transition-all',
                isActive
                  ? 'border-4 bg-cyan-400 translate-x-[2px] translate-y-[2px]'
                  : 'bg-cyan-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
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
