export const useCovidApi = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const fetchSummary = async () => {
    return await $fetch(`${apiBase}/api/covid/summary`)
  }

  const fetchContinents = async () => {
    return await $fetch(`${apiBase}/api/covid/continents`)
  }

  const fetchTopCountries = async (metric: string = 'total_cases', limit: number = 10) => {
    return await $fetch(`${apiBase}/api/covid/top-countries`, {
      params: { metric, limit }
    })
  }

  const fetchTimeSeries = async (location: string = 'World', metric: string = 'total_cases') => {
    return await $fetch(`${apiBase}/api/covid/time-series`, {
      params: { location, metric }
    })
  }

  const fetchLocations = async () => {
    return await $fetch<string[]>(`${apiBase}/api/covid/locations`)
  }

  const fetchDateRange = async (location: string, startDate: string, endDate: string) => {
    return await $fetch(`${apiBase}/api/covid/date-range`, {
      params: { location, startDate, endDate }
    })
  }

  return {
    fetchSummary,
    fetchContinents,
    fetchTopCountries,
    fetchTimeSeries,
    fetchLocations,
    fetchDateRange
  }
}
