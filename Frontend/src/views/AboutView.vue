<script setup lang="ts">
import TopBar from '@/components/layout/TopBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <TopBar />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Project Overview Section -->
      <div class="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            Sobre el Proyecto
          </h1>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded"></div>
        </div>

        <div class="prose prose-lg max-w-none">
          <p class="text-gray-700 text-lg leading-relaxed mb-6">
            <strong class="text-blue-600">CovidLens Analytics</strong> es un dashboard web interactivo
            desarrollado para visualizar y analizar estadísticas globales de COVID-19 en tiempo real.
            El proyecto implementa una arquitectura de tres capas completamente desplegada en la nube,
            permitiendo a los usuarios explorar datos epidemiológicos de más de 230 países y territorios.
          </p>

          <div class="grid md:grid-cols-2 gap-6 my-8">
            <div class="bg-blue-50 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <span class="text-2xl">🎯</span>
                Objetivo
              </h3>
              <p class="text-gray-700">
                Proporcionar una plataforma accesible y visualmente atractiva para comprender
                la evolución de la pandemia COVID-19 mediante gráficas interactivas, filtros
                dinámicos y datos actualizados de fuentes oficiales.
              </p>
            </div>

            <div class="bg-purple-50 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <span class="text-2xl">💾</span>
                Dataset
              </h3>
              <p class="text-gray-700">
                Utilizamos datos de <strong>Our World in Data (OWID)</strong>, con más de
                350,000 registros históricos desde enero 2020, incluyendo métricas de casos,
                muertes, vacunaciones, hospitalizaciones y factores socioeconómicos.
              </p>
            </div>
          </div>

          <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-8">
            <h3 class="text-2xl font-semibold mb-4">🚀 Stack Tecnológico</h3>
            <div class="grid md:grid-cols-3 gap-4">
              <div>
                <h4 class="font-semibold mb-2">Frontend</h4>
                <ul class="text-sm space-y-1 text-blue-100">
                  <li>• Vue.js 3 + TypeScript</li>
                  <li>• Tailwind CSS v4</li>
                  <li>• ApexCharts</li>
                  <li>• Vite + Bun</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Backend</h4>
                <ul class="text-sm space-y-1 text-blue-100">
                  <li>• Flask (Python 3.10)</li>
                  <li>• PostgreSQL 15</li>
                  <li>• psycopg2</li>
                  <li>• REST API</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Deployment</h4>
                <ul class="text-sm space-y-1 text-blue-100">
                  <li>• Vercel (Frontend & Backend)</li>
                  <li>• Supabase (Database)</li>
                  <li>• GitHub (CI/CD)</li>
                  <li>• HTTPS + CDN Global</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">✨ Características Principales</h3>
            <ul class="grid md:grid-cols-2 gap-3 text-gray-700">
              <li class="flex items-start gap-2">
                <span class="text-green-600 font-bold">✓</span>
                <span>Visualización de datos en tiempo real</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-600 font-bold">✓</span>
                <span>Filtros por país, continente y métrica</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-600 font-bold">✓</span>
                <span>Gráficas interactivas (líneas, barras, pastel)</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-600 font-bold">✓</span>
                <span>Diseño responsive (móvil y escritorio)</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-600 font-bold">✓</span>
                <span>+350,000 registros históricos</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-600 font-bold">✓</span>
                <span>Arquitectura serverless escalable</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="mb-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Equipo de Desarrollo
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded"></div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Card 1: Jean Marthe -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="bg-gradient-to-br from-blue-600 to-blue-700 h-32 flex items-center justify-center">
              <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-blue-600 shadow-lg">
                JM
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Jean Marthe</h3>
              <p class="text-blue-600 font-semibold mb-4">Full Stack Developer</p>
              <div class="space-y-2 text-gray-700 text-sm">
                <p class="flex items-start gap-2">
                  <span class="text-blue-600">•</span>
                  <span>Arquitectura del sistema</span>
                </p>
                <p class="flex items-start gap-2">
                  <span class="text-blue-600">•</span>
                  <span>Desarrollo backend (Flask API)</span>
                </p>
                <p class="flex items-start gap-2">
                  <span class="text-blue-600">•</span>
                  <span>Integración con base de datos</span>
                </p>
                <p class="flex items-start gap-2">
                  <span class="text-blue-600">•</span>
                  <span>Deployment en Vercel</span>
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-gray-200">
                <p class="text-xs text-gray-500">
                  <strong>Email:</strong> jeanmarthem@gmail.com
                </p>
              </div>
            </div>
          </div>

          <!-- Card 2: Oscar Gil -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="bg-gradient-to-br from-purple-600 to-purple-700 h-32 flex items-center justify-center">
              <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-purple-600 shadow-lg">
                OG
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Oscar Gil</h3>
              <p class="text-purple-600 font-semibold mb-4">Frontend Developer</p>
              <div class="space-y-2 text-gray-700 text-sm">
                <p class="flex items-start gap-2">
                  <span class="text-purple-600">•</span>
                  <span>Diseño de interfaz (UI/UX)</span>
                </p>
                <p class="flex items-start gap-2">
                  <span class="text-purple-600">•</span>
                  <span>Componentes Vue.js reactivos</span>
                </p>
                <p class="flex items-start gap-2">
                  <span class="text-purple-600">•</span>
                  <span>Visualizaciones con ApexCharts</span>
                </p>
                <p class="flex items-start gap-2">
                  <span class="text-purple-600">•</span>
                  <span>Responsive design con Tailwind</span>
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-gray-200">
                <p class="text-xs text-gray-500">
                  <strong>Universidad:</strong> Universidad del Norte
                </p>
              </div>
            </div>
          </div>

          <!-- Card 3: Juan Palacios -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="bg-gradient-to-br from-indigo-600 to-indigo-700 h-32 flex items-center justify-center">
              <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-indigo-600 shadow-lg">
                JP
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Juan Palacios</h3>
              <p class="text-indigo-600 font-semibold mb-4">Database Engineer</p>
              <div class="space-y-2 text-gray-700 text-sm">
                <p class="flex items-start gap-2">
                  <span class="text-indigo-600">•</span>
                  <span>Diseño de schema PostgreSQL</span>
                </p>
                <p class="flex items-start gap-2">
                  <span class="text-indigo-600">•</span>
                  <span>Optimización de queries SQL</span>
                </p>
                <p class="flex items-start gap-2">
                  <span class="text-indigo-600">•</span>
                  <span>Carga y limpieza de datos (ETL)</span>
                </p>
                <p class="flex items-start gap-2">
                  <span class="text-indigo-600">•</span>
                  <span>Configuración Supabase</span>
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-gray-200">
                <p class="text-xs text-gray-500">
                  <strong>Universidad:</strong> Universidad del Norte
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Academic Info -->
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Información Académica</h3>
          <div class="grid md:grid-cols-3 gap-6 mt-6 text-gray-700">
            <div>
              <p class="font-semibold text-blue-600 mb-1">Universidad</p>
              <p>Universidad del Norte</p>
            </div>
            <div>
              <p class="font-semibold text-blue-600 mb-1">Curso</p>
              <p>Laboratorio de Bases de Datos</p>
            </div>
            <div>
              <p class="font-semibold text-blue-600 mb-1">Año</p>
              <p>2025</p>
            </div>
          </div>
          <div class="mt-8 pt-6 border-t border-gray-200">
            <p class="text-sm text-gray-600">
              🔗 Repositorio:
              <a
                href="https://github.com/TheCasper05/-CovidLens-Analytics"
                target="_blank"
                class="text-blue-600 hover:text-blue-700 font-semibold"
              >
                github.com/TheCasper05/-CovidLens-Analytics
              </a>
            </p>
            <p class="text-sm text-gray-600 mt-2">
              🌐 Demo:
              <a
                href="https://covidlens-frontend.vercel.app"
                target="_blank"
                class="text-blue-600 hover:text-blue-700 font-semibold"
              >
                covidlens-frontend.vercel.app
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
