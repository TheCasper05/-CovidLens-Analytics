export interface CovidData {
  location: string;
  date: string;
  total_cases: number | null;
  total_deaths: number | null;
}

export interface CovidFilters {
  location?: string;
  continent?: string;
  startDate?: string;
  endDate?: string;
}

export interface ContinentData {
  continent: string;
  total_cases: number;
  total_deaths: number;
}

export interface SummaryData {
  last_update: string;
  total_cases: number;
  total_deaths: number;
  total_vaccinations: number;
}
export interface TopCountryData {
  location: string;
  value: number;
}

export interface timeSeriesData {
  date: string;
  value: number;
}
export interface DateRangeData {
  date: string
  total_cases: number
  total_deaths: number
  new_cases: number
  new_deaths: number
  total_vaccinations: number
}

