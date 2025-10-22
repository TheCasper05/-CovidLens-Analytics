import axios from "axios";
import type { ContinentData, SummaryData, TopCountryData, DateRangeData,timeSeriesData } from "@/types/covid";


const API_BASE_URL = "https://api.covid19api.com";

/* This code snippet is creating an Axios instance named `apliClient` with a specific configuration.
The `axios.create()` method is used to create a new Axios instance with custom configuration
options. In this case, the `baseURL` option is set to the API base URL "https://api.covid19api.com"
and the `headers` option is set to specify that the content type of the requests will be JSON. */

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;


//Fetch Get functions

/**
 * This function retrieves summary data about continents asynchronously.
 * @returns The function `getContinents` is returning the data of continents in an array format.
 */

// Continents summary data
export const getContinents = async () => {
  const response = await apiClient.get<ContinentData[]>("/continents/summary");
  return response.data;
};

/**
 * This function retrieves summary data from an API endpoint using async/await syntax in TypeScript.
 * @returns The `getSummary` function is returning the data obtained from the API endpoint '/summary'.
 */

// Global summary data
export const getSummary = async () => {
  const response = await apiClient.get<SummaryData>("/summary");
  return response.data;
};

/**
 * The function `getTopCountries` retrieves the top countries based on a specified metric and limit.
 * @param {string} metric - The `metric` parameter in the `getTopCountries` function is a string that
 * represents the specific metric by which you want to retrieve the top countries. This could be any
 * type of data that you are interested in, such as population, GDP, happiness index, etc.
 * @param {number} limit - The `limit` parameter specifies the maximum number of top countries to
 * retrieve based on the specified metric. It determines how many countries will be included in the
 * result set returned by the `getTopCountries` function.
 * @returns The function `getTopCountries` is returning data of type `TopCountryData[]`, which is an
 * array of top countries based on a specific metric.
 */
// Top countries by metric
export const getTopCountries = async (metric: string, limit: number) => {
  const response = await apiClient.get<TopCountryData[]>("/top-countries", {
    params: { metric, limit },
  });
  return response.data;
};

/**
 * The function `getLocationData` makes an asynchronous request to fetch location data from an API
 * endpoint and returns the response data as an array of strings.
 * @returns The `getLocationData` function is returning an array of strings that represent location
 * data fetched from the API endpoint "/locations".
 */

// Location data
export const getLocationData = async () => {
  const response = await apiClient.get<string[]>("/locations");
  return response.data;
}

/**
 * The function `getTimeSeriesData` fetches time series data for a specific location and metric using
 * an API call.
 * @param {string} location - Location refers to the specific geographical location for which you want
 * to retrieve time series data. This could be a city, region, country, or any other specific location
 * identifier.
 * @param {string} metric - The `metric` parameter refers to the type of data you want to retrieve for
 * the specified location. It could be a specific measurement or category of data that you are
 * interested in, such as temperature, humidity, air quality index, etc.
 * @returns The function `getTimeSeriesData` is returning the time series data for a specific location
 * and metric fetched from the API endpoint `/time-series//`.
 */

// Time series data for a location and metric
export const getTimeSeriesData = async (location: string, metric: string) => {
  const response = await apiClient.get<timeSeriesData[]>(`/time-series/${location}/${metric}`);
  return response.data;
};
/**
 * The function `getDateRangeData` fetches date range data for a specific location within a given start
 * and end date.
 * @param {string} location - Location refers to the specific place or area for which you want to
 * retrieve data. It could be a city, country, or any other geographical location for which you want to
 * get date range data.
 * @param {string} startDate - The `startDate` parameter in the `getDateRangeData` function represents
 * the starting date of the date range for which you want to retrieve data. It is expected to be a
 * string in a specific date format.
 * @param {string} endDate - The `endDate` parameter in the `getDateRangeData` function represents the
 * end date of the date range for which you want to retrieve data. It is a string that specifies the
 * end date in a specific format, such as "YYYY-MM-DD". This parameter is used to fetch data within the
 * specified
 * @returns The function `getDateRangeData` is returning the data fetched from the API endpoint
 * `/date-range/` for the specified location and date range (startDate to endDate).
 */

// Date range data for a location
export const getDateRangeData = async (location: string, startDate: string, endDate: string) => {
  const response = await apiClient.get<DateRangeData[]>(`/date-range/`, {
    params: { location, startDate, endDate },
  });
  return response.data;
}