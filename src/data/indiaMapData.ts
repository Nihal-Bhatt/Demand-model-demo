export type MapMetric = 'modelAccuracy' | 'improvement' | 'salesShare' | 'wmape'

export interface TerritoryPoint {
  id: string
  name: string
  coordinates: [number, number]
  modelAccuracy: number
  salesTeamAccuracy: number
  improvement: number
  salesCr: number
}

export interface StateMetrics {
  state: string
  modelAccuracy: number
  salesTeamAccuracy: number
  improvement: number
  salesShare: number
  wmape: number
  salesCr: number
  territories: TerritoryPoint[]
}

/** Normalize GeoJSON state names to our dataset keys */
export function normalizeStateName(raw: string): string {
  const map: Record<string, string> = {
    'NCT of Delhi': 'Delhi',
    'Orissa': 'Odisha',
    'Pondicherry': 'Puducherry',
    'Andaman and Nicobar Islands': 'Andaman & Nicobar',
    'Andaman and Nicobar': 'Andaman & Nicobar',
    'Andaman & Nicobar Island': 'Andaman & Nicobar',
    'Dadra and Nagar Haveli': 'Dadra and Nagar Haveli and Daman and Diu',
    'Daman and Diu': 'Dadra and Nagar Haveli and Daman and Diu',
    'Jammu & Kashmir': 'Jammu and Kashmir',
    'Telangana': 'Telangana',
  }
  return map[raw] ?? raw
}

export const mapMetricLabels: Record<MapMetric, string> = {
  modelAccuracy: 'Model Accuracy',
  improvement: 'Accuracy Improvement',
  salesShare: 'Sales Share',
  wmape: 'Avg wMAPE (inverted)',
}

export const indiaStateMetrics: StateMetrics[] = [
  {
    state: 'Punjab',
    modelAccuracy: 88,
    salesTeamAccuracy: 22,
    improvement: 66,
    salesShare: 8.2,
    wmape: 0.12,
    salesCr: 142,
    territories: [
      { id: 'pun-n', name: 'Punjab North', coordinates: [75.8, 31.4], modelAccuracy: 88, salesTeamAccuracy: 22, improvement: 66, salesCr: 142 },
      { id: 'pun-s', name: 'Punjab South', coordinates: [75.2, 30.2], modelAccuracy: 84, salesTeamAccuracy: 24, improvement: 60, salesCr: 98 },
    ],
  },
  {
    state: 'Maharashtra',
    modelAccuracy: 85,
    salesTeamAccuracy: 19,
    improvement: 66,
    salesShare: 7.4,
    wmape: 0.14,
    salesCr: 128,
    territories: [
      { id: 'mh-w', name: 'Maharashtra West', coordinates: [72.8, 19.1], modelAccuracy: 85, salesTeamAccuracy: 19, improvement: 66, salesCr: 128 },
      { id: 'mh-e', name: 'Maharashtra East', coordinates: [79.1, 20.9], modelAccuracy: 81, salesTeamAccuracy: 21, improvement: 60, salesCr: 94 },
    ],
  },
  {
    state: 'Uttar Pradesh',
    modelAccuracy: 79,
    salesTeamAccuracy: 28,
    improvement: 51,
    salesShare: 6.6,
    wmape: 0.18,
    salesCr: 115,
    territories: [
      { id: 'up-c', name: 'UP Central', coordinates: [80.9, 26.8], modelAccuracy: 79, salesTeamAccuracy: 28, improvement: 51, salesCr: 115 },
      { id: 'up-w', name: 'UP West', coordinates: [78.1, 28.4], modelAccuracy: 76, salesTeamAccuracy: 30, improvement: 46, salesCr: 88 },
    ],
  },
  {
    state: 'Karnataka',
    modelAccuracy: 84,
    salesTeamAccuracy: 24,
    improvement: 60,
    salesShare: 5.7,
    wmape: 0.15,
    salesCr: 98,
    territories: [
      { id: 'ka-s', name: 'Karnataka South', coordinates: [76.5, 12.9], modelAccuracy: 84, salesTeamAccuracy: 24, improvement: 60, salesCr: 98 },
      { id: 'ka-n', name: 'Karnataka North', coordinates: [75.7, 15.3], modelAccuracy: 80, salesTeamAccuracy: 26, improvement: 54, salesCr: 72 },
    ],
  },
  {
    state: 'Gujarat',
    modelAccuracy: 81,
    salesTeamAccuracy: 31,
    improvement: 50,
    salesShare: 5.3,
    wmape: 0.17,
    salesCr: 91,
    territories: [
      { id: 'gj-w', name: 'Gujarat West', coordinates: [71.2, 22.3], modelAccuracy: 81, salesTeamAccuracy: 31, improvement: 50, salesCr: 91 },
    ],
  },
  {
    state: 'Andhra Pradesh',
    modelAccuracy: 76,
    salesTeamAccuracy: 18,
    improvement: 58,
    salesShare: 5.0,
    wmape: 0.16,
    salesCr: 87,
    territories: [
      { id: 'ap-c', name: 'AP Coastal', coordinates: [79.7, 15.9], modelAccuracy: 76, salesTeamAccuracy: 18, improvement: 58, salesCr: 87 },
    ],
  },
  {
    state: 'Rajasthan',
    modelAccuracy: 83,
    salesTeamAccuracy: 27,
    improvement: 56,
    salesShare: 4.4,
    wmape: 0.16,
    salesCr: 76,
    territories: [
      { id: 'rj', name: 'Rajasthan', coordinates: [74.2, 26.9], modelAccuracy: 83, salesTeamAccuracy: 27, improvement: 56, salesCr: 76 },
    ],
  },
  {
    state: 'Madhya Pradesh',
    modelAccuracy: 77,
    salesTeamAccuracy: 21,
    improvement: 56,
    salesShare: 3.9,
    wmape: 0.19,
    salesCr: 68,
    territories: [
      { id: 'mp-c', name: 'MP Central', coordinates: [77.4, 23.2], modelAccuracy: 77, salesTeamAccuracy: 21, improvement: 56, salesCr: 68 },
    ],
  },
  {
    state: 'Telangana',
    modelAccuracy: 82,
    salesTeamAccuracy: 20,
    improvement: 62,
    salesShare: 4.1,
    wmape: 0.14,
    salesCr: 82,
    territories: [
      { id: 'tg-h', name: 'Hyderabad', coordinates: [78.5, 17.4], modelAccuracy: 82, salesTeamAccuracy: 12, improvement: 70, salesCr: 271 },
    ],
  },
  {
    state: 'Haryana',
    modelAccuracy: 80,
    salesTeamAccuracy: 25,
    improvement: 55,
    salesShare: 3.5,
    wmape: 0.17,
    salesCr: 62,
    territories: [{ id: 'hr-k', name: 'Karnal', coordinates: [76.9, 29.7], modelAccuracy: 65, salesTeamAccuracy: 18, improvement: 47, salesCr: 161 }],
  },
  {
    state: 'Tamil Nadu',
    modelAccuracy: 78,
    salesTeamAccuracy: 26,
    improvement: 52,
    salesShare: 4.8,
    wmape: 0.18,
    salesCr: 79,
    territories: [{ id: 'tn-t', name: 'Trichy', coordinates: [78.7, 10.8], modelAccuracy: 74, salesTeamAccuracy: 22, improvement: 52, salesCr: 53 }],
  },
  {
    state: 'West Bengal',
    modelAccuracy: 74,
    salesTeamAccuracy: 29,
    improvement: 45,
    salesShare: 3.2,
    wmape: 0.21,
    salesCr: 55,
    territories: [{ id: 'wb-k', name: 'Kolkata', coordinates: [88.4, 22.6], modelAccuracy: 72, salesTeamAccuracy: 28, improvement: 44, salesCr: 43 }],
  },
  {
    state: 'Bihar',
    modelAccuracy: 71,
    salesTeamAccuracy: 32,
    improvement: 39,
    salesShare: 2.8,
    wmape: 0.22,
    salesCr: 48,
    territories: [{ id: 'br-p', name: 'Patna', coordinates: [85.1, 25.6], modelAccuracy: 68, salesTeamAccuracy: 30, improvement: 38, salesCr: 27 }],
  },
  {
    state: 'Odisha',
    modelAccuracy: 73,
    salesTeamAccuracy: 27,
    improvement: 46,
    salesShare: 2.5,
    wmape: 0.20,
    salesCr: 42,
    territories: [{ id: 'or-c', name: 'Cuttack', coordinates: [85.9, 20.5], modelAccuracy: 70, salesTeamAccuracy: 26, improvement: 44, salesCr: 25 }],
  },
  {
    state: 'Kerala',
    modelAccuracy: 79,
    salesTeamAccuracy: 23,
    improvement: 56,
    salesShare: 2.2,
    wmape: 0.16,
    salesCr: 38,
    territories: [{ id: 'kl', name: 'Kerala Hub', coordinates: [76.3, 10.0], modelAccuracy: 79, salesTeamAccuracy: 23, improvement: 56, salesCr: 38 }],
  },
  {
    state: 'Assam',
    modelAccuracy: 70,
    salesTeamAccuracy: 30,
    improvement: 40,
    salesShare: 1.8,
    wmape: 0.23,
    salesCr: 32,
    territories: [{ id: 'as-g', name: 'Guwahati', coordinates: [91.7, 26.1], modelAccuracy: 68, salesTeamAccuracy: 29, improvement: 39, salesCr: 11 }],
  },
  {
    state: 'Chhattisgarh',
    modelAccuracy: 74,
    salesTeamAccuracy: 24,
    improvement: 50,
    salesShare: 2.0,
    wmape: 0.19,
    salesCr: 35,
    territories: [{ id: 'cg-r', name: 'Raipur', coordinates: [81.6, 21.2], modelAccuracy: 81, salesTeamAccuracy: 13, improvement: 68, salesCr: 91 }],
  },
  {
    state: 'Jharkhand',
    modelAccuracy: 72,
    salesTeamAccuracy: 28,
    improvement: 44,
    salesShare: 1.6,
    wmape: 0.21,
    salesCr: 28,
    territories: [{ id: 'jh-j', name: 'Jabalpur', coordinates: [79.9, 23.2], modelAccuracy: 75, salesTeamAccuracy: 15, improvement: 60, salesCr: 90 }],
  },
]

export const stateMetricsMap = new Map(
  indiaStateMetrics.map((s) => [s.state.toLowerCase(), s]),
)

export function getMetricValue(state: StateMetrics, metric: MapMetric): number {
  if (metric === 'wmape') return Math.round((1 - state.wmape) * 100)
  return state[metric]
}

export function getMetricColor(value: number, metric: MapMetric): string {
  const t = metric === 'wmape' ? value / 100 : value / 100
  if (t >= 0.8) return '#00A9F4'
  if (t >= 0.65) return '#2251FF'
  if (t >= 0.5) return '#6BAED6'
  if (t >= 0.35) return '#1A3D5C'
  return '#0E2E4A'
}

export const INDIA_GEO_URL = '/india-states.geojson'
