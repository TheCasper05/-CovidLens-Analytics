
import {
  fetchSummary,
  fetchContinents,
  fetchTopCountries,
  fetchTimeSeries,
  fetchLocations,
  fetchDateRange
} from '../services/covidApi'

export const useCovidApi = () => {
  return {
    fetchSummary,
    fetchContinents,
    fetchTopCountries,
    fetchTimeSeries,
    fetchLocations,
    fetchDateRange
  }
}
