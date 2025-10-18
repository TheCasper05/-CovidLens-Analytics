import { useRuntimeConfig } from '#imports'

const apiBase = useRuntimeConfig().public.apiBase

export const fetchSummary = async () => {
  return await $fetch(`${apiBase}/api/covid/summary`)
}

export const fetchContinents = async () => {
  return await $fetch(`${apiBase}/api/covid/continents`)
}

export const fetchTopCountries = async (metric: string = 'total_cases', limit: number = 10) => {
  return await $fetch(`${apiBase}/api/covid/top-countries`, {
    params: { metric, limit }
  })
}

export const fetchTimeSeries = async (location: string = 'World', metric: string = 'total_cases') => {
  return await $fetch(`${apiBase}/api/covid/time-series`, {
    params: { location, metric }
  })
}

export const fetchLocations = async () => {
  return await $fetch<string[]>(`${apiBase}/api/covid/locations`)
}

export const fetchDateRange = async (location: string, startDate: string, endDate: string) => {
  return await $fetch(`${apiBase}/api/covid/date-range`, {
    params: { location, startDate, endDate }
  })
}
