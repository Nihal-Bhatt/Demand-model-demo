export type NavSection = 'overview' | 'metrics' | 'sku' | 'drivers' | 'pipeline'

export type ProductCategory = 'Herbicide' | 'Fungicide' | 'Insecticide' | 'Seed Care' | 'Nutrition'

export const BRAND = {
  name: 'AgriCo',
  product: 'Forecast Command',
  tagline: 'Demand Planning',
} as const

export interface MapRegionMeta {
  id: string
  label: string
  territories: string[]
}

export const indiaMapRegions: MapRegionMeta[] = [
  { id: 'north', label: 'North', territories: ['Punjab North', 'Rajasthan'] },
  { id: 'central', label: 'Central', territories: ['UP Central', 'MP Central'] },
  { id: 'west', label: 'West', territories: ['Gujarat West', 'Maharashtra West'] },
  { id: 'south', label: 'South', territories: ['Karnataka South', 'AP Coastal'] },
]

export interface MonthlyMetric {
  month: string
  modelAccuracy: number
  modelError: number
  overForecast: number
  underForecast: number
}

export interface AccuracyBucket {
  range: string
  modelShare: number
}

export interface TerritoryPerformance {
  name: string
  salesCr: number
  salesShare: number
  modelAccuracy: number
  wmape: number
  skuCount: number
}

export interface SkuPerformance {
  sku: string
  product: string
  category: ProductCategory
  salesShare: number
  salesCr: number
  modelAccuracy: number
  wmape: number
  bestModel: string
  segment: 'High Volume' | 'Medium Volume' | 'Low Volume' | 'Sparse'
}

export interface SkuDeepDive extends SkuPerformance {
  description: string
  monthlyAccuracy: { month: string; accuracy: number }[]
  horizonAccuracy: { horizon: string; accuracy: number; forecastQty: number }[]
  territories: { name: string; accuracy: number; salesCr: number; forecastQty: number }[]
  topDrivers: { feature: string; impact: number }[]
}

export interface DashboardData {
  label: string
  subtitle: string
  level: string
  period: string
  summary: {
    modelAccuracy: number
    wmape: number
    highAccuracyCoverage: number
    overForecastRate: number
    underForecastRate: number
    territoriesAboveTarget: number
    territoriesAboveTargetShare: number
    skusAboveTarget: number
    skusAboveTargetShare: number
    totalSkus: number
    totalTerritories: number
    forecastHorizon: string
    accuracyTarget: number
  }
  monthly: MonthlyMetric[]
  buckets: AccuracyBucket[]
  territories: TerritoryPerformance[]
  skus: SkuPerformance[]
  models: { name: string; share: number; avgWmape: number }[]
}

const monthly: MonthlyMetric[] = [
  { month: 'Jul-24', modelAccuracy: 0, modelError: 0, overForecast: 0, underForecast: 0 },
  { month: 'Aug-24', modelAccuracy: 72, modelError: 28, overForecast: 31, underForecast: 18 },
  { month: 'Sep-24', modelAccuracy: 74, modelError: 26, overForecast: 22, underForecast: 19 },
  { month: 'Oct-24', modelAccuracy: 76, modelError: 24, overForecast: 28, underForecast: 14 },
  { month: 'Nov-24', modelAccuracy: 78, modelError: 22, overForecast: 24, underForecast: 12 },
  { month: 'Dec-24', modelAccuracy: 77, modelError: 23, overForecast: 20, underForecast: 15 },
  { month: 'Jan-25', modelAccuracy: 79, modelError: 21, overForecast: 18, underForecast: 16 },
  { month: 'Feb-25', modelAccuracy: 80, modelError: 20, overForecast: 19, underForecast: 14 },
  { month: 'Mar-25', modelAccuracy: 78, modelError: 22, overForecast: 25, underForecast: 13 },
  { month: 'Apr-25', modelAccuracy: 81, modelError: 19, overForecast: 17, underForecast: 15 },
  { month: 'May-25', modelAccuracy: 83, modelError: 17, overForecast: 16, underForecast: 12 },
  { month: 'Jun-25', modelAccuracy: 82, modelError: 18, overForecast: 18, underForecast: 14 },
  { month: 'Jul-25', modelAccuracy: 84, modelError: 16, overForecast: 15, underForecast: 11 },
  { month: 'Aug-25', modelAccuracy: 85, modelError: 15, overForecast: 14, underForecast: 10 },
  { month: 'Sep-25', modelAccuracy: 83, modelError: 17, overForecast: 16, underForecast: 12 },
  { month: 'Oct-25', modelAccuracy: 84, modelError: 16, overForecast: 15, underForecast: 11 },
  { month: 'Nov-25', modelAccuracy: 85, modelError: 15, overForecast: 14, underForecast: 10 },
  { month: 'Dec-25', modelAccuracy: 86, modelError: 14, overForecast: 13, underForecast: 9 },
  { month: 'Jan-26', modelAccuracy: 87, modelError: 13, overForecast: 12, underForecast: 8 },
  { month: 'Feb-26', modelAccuracy: 0, modelError: 0, overForecast: 0, underForecast: 0 },
]

export const agriCoData: DashboardData = {
  label: 'AgriCo',
  subtitle: 'National level · volume weighted by value',
  level: 'Territory × SKU × Month',
  period: "Jul'24 – Feb'26",
  summary: {
    modelAccuracy: 82,
    wmape: 0.17,
    highAccuracyCoverage: 67,
    overForecastRate: 16,
    underForecastRate: 12,
    territoriesAboveTarget: 204,
    territoriesAboveTargetShare: 65,
    skusAboveTarget: 892,
    skusAboveTargetShare: 72,
    totalSkus: 1240,
    totalTerritories: 312,
    forecastHorizon: 'N+1, N+2, N+3',
    accuracyTarget: 75,
  },
  monthly,
  buckets: [
    { range: '<10%', modelShare: 5 },
    { range: '10–30%', modelShare: 12 },
    { range: '30–60%', modelShare: 16 },
    { range: '>60%', modelShare: 67 },
  ],
  territories: [
    { name: 'Punjab North', salesCr: 142, salesShare: 8.2, modelAccuracy: 88, wmape: 0.12, skuCount: 186 },
    { name: 'Maharashtra West', salesCr: 128, salesShare: 7.4, modelAccuracy: 85, wmape: 0.14, skuCount: 172 },
    { name: 'UP Central', salesCr: 115, salesShare: 6.6, modelAccuracy: 79, wmape: 0.18, skuCount: 198 },
    { name: 'Karnataka South', salesCr: 98, salesShare: 5.7, modelAccuracy: 84, wmape: 0.15, skuCount: 154 },
    { name: 'Gujarat West', salesCr: 91, salesShare: 5.3, modelAccuracy: 81, wmape: 0.16, skuCount: 141 },
    { name: 'AP Coastal', salesCr: 87, salesShare: 5.0, modelAccuracy: 76, wmape: 0.19, skuCount: 132 },
    { name: 'Rajasthan', salesCr: 76, salesShare: 4.4, modelAccuracy: 83, wmape: 0.15, skuCount: 118 },
    { name: 'MP Central', salesCr: 68, salesShare: 3.9, modelAccuracy: 77, wmape: 0.18, skuCount: 124 },
  ],
  skus: [
    { sku: 'AC-1042', product: 'Herbicide Alpha', category: 'Herbicide', salesShare: 6.2, salesCr: 108, modelAccuracy: 91, wmape: 0.09, bestModel: 'XGBoost', segment: 'High Volume' },
    { sku: 'AC-2087', product: 'Fungicide Pro', category: 'Fungicide', salesShare: 5.4, salesCr: 94, modelAccuracy: 86, wmape: 0.12, bestModel: 'LightGBM', segment: 'High Volume' },
    { sku: 'AC-3310', product: 'Insecticide Max', category: 'Insecticide', salesShare: 4.8, salesCr: 84, modelAccuracy: 84, wmape: 0.13, bestModel: 'Prophet', segment: 'High Volume' },
    { sku: 'AC-4421', product: 'Seed Treatment', category: 'Seed Care', salesShare: 3.9, salesCr: 68, modelAccuracy: 78, wmape: 0.17, bestModel: 'AutoARIMA', segment: 'Medium Volume' },
    { sku: 'AC-5563', product: 'Growth Regulator', category: 'Nutrition', salesShare: 3.1, salesCr: 54, modelAccuracy: 72, wmape: 0.19, bestModel: 'LSTM', segment: 'Medium Volume' },
    { sku: 'AC-6678', product: 'Micronutrient Mix', category: 'Nutrition', salesShare: 2.4, salesCr: 42, modelAccuracy: 69, wmape: 0.21, bestModel: 'ETS', segment: 'Low Volume' },
    { sku: 'AC-7721', product: 'Weed Shield Plus', category: 'Herbicide', salesShare: 2.1, salesCr: 37, modelAccuracy: 88, wmape: 0.11, bestModel: 'XGBoost', segment: 'Medium Volume' },
    { sku: 'AC-8834', product: 'Crop Guard', category: 'Insecticide', salesShare: 1.8, salesCr: 31, modelAccuracy: 81, wmape: 0.14, bestModel: 'LightGBM', segment: 'Low Volume' },
  ],
  models: [
    { name: 'XGBoost', share: 28, avgWmape: 0.14 },
    { name: 'LightGBM', share: 22, avgWmape: 0.16 },
    { name: 'Prophet', share: 18, avgWmape: 0.18 },
    { name: 'AutoARIMA', share: 14, avgWmape: 0.21 },
    { name: 'LSTM', share: 10, avgWmape: 0.19 },
    { name: 'ETS / Others', share: 8, avgWmape: 0.23 },
  ],
}

const skuDeepDiveBase: Record<string, Omit<SkuDeepDive, keyof SkuPerformance>> = {
  'AC-1042': {
    description: 'Broad-spectrum herbicide for kharif cereals. High seasonality tied to monsoon onset.',
    monthlyAccuracy: monthly.filter((m) => m.modelAccuracy > 0).slice(-8).map((m) => ({ month: m.month, accuracy: m.modelAccuracy + 6 })),
    horizonAccuracy: [
      { horizon: 'N+1', accuracy: 93, forecastQty: 12400 },
      { horizon: 'N+2', accuracy: 89, forecastQty: 11800 },
      { horizon: 'N+3', accuracy: 84, forecastQty: 10900 },
    ],
    territories: [
      { name: 'Punjab North', accuracy: 94, salesCr: 38, forecastQty: 5200 },
      { name: 'UP Central', accuracy: 90, salesCr: 28, forecastQty: 3800 },
      { name: 'Haryana East', accuracy: 88, salesCr: 22, forecastQty: 2400 },
    ],
    topDrivers: [
      { feature: '4-week rolling demand', impact: 0.31 },
      { feature: 'Rainfall (lag 2)', impact: 0.22 },
      { feature: 'Kharif season flag', impact: 0.18 },
      { feature: 'Field app orders', impact: 0.14 },
    ],
  },
  'AC-2087': {
    description: 'Systemic fungicide for rice & wheat. Disease pressure correlates with humidity.',
    monthlyAccuracy: monthly.filter((m) => m.modelAccuracy > 0).slice(-8).map((m) => ({ month: m.month, accuracy: m.modelAccuracy + 2 })),
    horizonAccuracy: [
      { horizon: 'N+1', accuracy: 88, forecastQty: 8200 },
      { horizon: 'N+2', accuracy: 85, forecastQty: 7900 },
      { horizon: 'N+3', accuracy: 80, forecastQty: 7200 },
    ],
    territories: [
      { name: 'Maharashtra West', accuracy: 89, salesCr: 32, forecastQty: 4100 },
      { name: 'Karnataka South', accuracy: 86, salesCr: 24, forecastQty: 2900 },
    ],
    topDrivers: [
      { feature: 'Humidity index', impact: 0.26 },
      { feature: 'Disease alert API', impact: 0.21 },
      { feature: '4-week rolling demand', impact: 0.19 },
    ],
  },
  'AC-3310': {
    description: 'Contact insecticide for cotton & soybean. Peak demand in pest outbreak windows.',
    monthlyAccuracy: monthly.filter((m) => m.modelAccuracy > 0).slice(-8).map((m) => ({ month: m.month, accuracy: m.modelAccuracy })),
    horizonAccuracy: [
      { horizon: 'N+1', accuracy: 86, forecastQty: 15600 },
      { horizon: 'N+2', accuracy: 82, forecastQty: 14200 },
      { horizon: 'N+3', accuracy: 78, forecastQty: 12800 },
    ],
    territories: [
      { name: 'Gujarat West', accuracy: 87, salesCr: 29, forecastQty: 4800 },
      { name: 'MP Central', accuracy: 82, salesCr: 21, forecastQty: 3600 },
    ],
    topDrivers: [
      { feature: 'Pest pressure index', impact: 0.28 },
      { feature: 'Temperature anomaly', impact: 0.17 },
      { feature: 'Crop calendar', impact: 0.15 },
    ],
  },
}

export function getSkuDeepDive(skuId: string): SkuDeepDive | null {
  const base = agriCoData.skus.find((s) => s.sku === skuId)
  if (!base) return null
  const extra = skuDeepDiveBase[skuId] ?? {
    description: `${base.product} — ${base.category} portfolio SKU.`,
    monthlyAccuracy: monthly.filter((m) => m.modelAccuracy > 0).slice(-6).map((m, i) => ({ month: m.month, accuracy: base.modelAccuracy - 2 + (i % 3) })),
    horizonAccuracy: [
      { horizon: 'N+1', accuracy: base.modelAccuracy, forecastQty: 5000 },
      { horizon: 'N+2', accuracy: base.modelAccuracy - 4, forecastQty: 4600 },
      { horizon: 'N+3', accuracy: base.modelAccuracy - 8, forecastQty: 4200 },
    ],
    territories: agriCoData.territories.slice(0, 2).map((t) => ({
      name: t.name,
      accuracy: base.modelAccuracy - 3,
      salesCr: Math.round(t.salesCr * (base.salesShare / 10)),
      forecastQty: 2000,
    })),
    topDrivers: [
      { feature: '4-week rolling demand', impact: 0.24 },
      { feature: 'Seasonality', impact: 0.16 },
      { feature: 'Promo scheme flag', impact: 0.11 },
    ],
  }
  return { ...base, ...extra }
}

export const pipelineSteps = [
  { id: 1, name: 'Data Preprocessing', status: 'complete' as const, duration: '12m' },
  { id: 2, name: 'Feature Engineering', status: 'complete' as const, duration: '28m' },
  { id: 3, name: 'Model Training', status: 'complete' as const, duration: '2h 14m' },
  { id: 4, name: 'wMAPE Ranking', status: 'complete' as const, duration: '18m' },
  { id: 5, name: 'Forecast Generation', status: 'running' as const, duration: 'In progress' },
  { id: 6, name: 'Post Processing', status: 'pending' as const, duration: '—' },
]

export const forecastHorizons = [
  { horizon: 'N+1', modelAccuracy: 84, volume: 42 },
  { horizon: 'N+2', modelAccuracy: 79, volume: 35 },
  { horizon: 'N+3', modelAccuracy: 74, volume: 23 },
]

export const segments = ['All', 'High Volume', 'Medium Volume', 'Low Volume', 'Sparse'] as const

export const productCategories = ['All', 'Herbicide', 'Fungicide', 'Insecticide', 'Seed Care', 'Nutrition'] as const

export const pipelineRuns = [
  { id: 'RUN-2847', date: '11 Jun 2026', version: 'v2.5.1', status: 'Running', skus: 1240, duration: '2h 41m' },
  { id: 'RUN-2846', date: '04 Jun 2026', version: 'v2.5.0', status: 'Complete', skus: 1238, duration: '2h 18m' },
  { id: 'RUN-2845', date: '28 May 2026', version: 'v2.5.0', status: 'Complete', skus: 1235, duration: '2h 22m' },
]

export const reviewQueue = [
  { sku: 'AC-1042', territory: 'Punjab North', horizon: 'N+1', modelQty: 12400, forecastAccuracy: 93, wmape: 0.07, status: 'Pending Review' },
  { sku: 'AC-2087', territory: 'Maharashtra West', horizon: 'N+2', modelQty: 8200, forecastAccuracy: 85, wmape: 0.12, status: 'Approved' },
  { sku: 'AC-3310', territory: 'UP Central', horizon: 'N+1', modelQty: 15600, forecastAccuracy: 86, wmape: 0.11, status: 'Change Requested' },
  { sku: 'AC-4421', territory: 'Karnataka South', horizon: 'N+3', modelQty: 4300, forecastAccuracy: 78, wmape: 0.16, status: 'Approved' },
]

export const modelLeaderboard = [
  { rank: 1, model: 'XGBoost', skus: 348, avgWmape: 0.14, accuracy: 86 },
  { rank: 2, model: 'LightGBM', skus: 273, avgWmape: 0.16, accuracy: 83 },
  { rank: 3, model: 'Prophet', skus: 223, avgWmape: 0.18, accuracy: 80 },
  { rank: 4, model: 'AutoARIMA', skus: 174, avgWmape: 0.21, accuracy: 76 },
  { rank: 5, model: 'LSTM', skus: 124, avgWmape: 0.19, accuracy: 78 },
]

export const externalDrivers = [
  { id: 'weather', name: 'Weather API', category: 'External', source: 'OpenWeather / IMD', impact: 'High', features: 12, status: 'Active', description: 'Rainfall, temperature, humidity — crop cycle correlation' },
  { id: 'cpi', name: 'CPI for Farmers', category: 'External', source: 'Govt. data feed', impact: 'Medium', features: 4, status: 'Active', description: 'Purchasing power index affecting demand elasticity' },
  { id: 'mitra', name: 'Field App Usage', category: 'Behavioural', source: 'AgriCo Mitra App', impact: 'High', features: 8, status: 'Active', description: 'Advisories, orders, engagement signals by territory' },
  { id: 'margin', name: 'SKU Margin Data', category: 'Commercial', source: 'Finance master', impact: 'Medium', features: 3, status: 'Active', description: 'Price/margin context for demand prioritisation' },
  { id: 'season', name: 'Crop Calendar', category: 'Seasonal', source: 'Internal master', impact: 'High', features: 6, status: 'Active', description: 'Sowing/harvest windows by agro-climatic zone' },
  { id: 'competitor', name: 'Competitive Index', category: 'Market', source: 'Market research', impact: 'Low', features: 2, status: 'Planned', description: 'Share-of-voice proxy in key territories' },
]

export const engineeredFeatures = [
  { group: 'Lag & Rolling', features: ['lag_1m', 'lag_3m', 'roll_4w_avg', 'roll_12w_volatility'], count: 18, retained: 14 },
  { group: 'Seasonality', features: ['month_sin', 'month_cos', 'quarter_flag', 'kharif_rabi'], count: 8, retained: 7 },
  { group: 'External Drivers', features: ['rainfall_mm', 'temp_anomaly', 'cpi_index', 'app_sessions'], count: 24, retained: 19 },
  { group: 'Territory-SKU', features: ['territory_encode', 'sku_velocity', 'intermittence_flag'], count: 12, retained: 10 },
  { group: 'Promo & Events', features: ['scheme_active', 'launch_window'], count: 6, retained: 4 },
]

export const shapGlobalImportance = [
  { feature: 'roll_4w_avg_demand', shap: 0.24, direction: 'positive' as const },
  { feature: 'rainfall_mm_lag2', shap: 0.18, direction: 'positive' as const },
  { feature: 'month_sin', shap: 0.14, direction: 'positive' as const },
  { feature: 'app_sessions_4w', shap: 0.11, direction: 'positive' as const },
  { feature: 'cpi_farmers_index', shap: 0.09, direction: 'negative' as const },
  { feature: 'sku_velocity', shap: 0.08, direction: 'positive' as const },
  { feature: 'temp_anomaly', shap: 0.07, direction: 'negative' as const },
  { feature: 'intermittence_flag', shap: -0.06, direction: 'negative' as const },
  { feature: 'scheme_active', shap: 0.05, direction: 'positive' as const },
  { feature: 'margin_pct', shap: 0.04, direction: 'positive' as const },
]

export const shapLocalExample = {
  sku: 'AC-1042',
  product: 'Herbicide Alpha',
  territory: 'Punjab North',
  horizon: 'N+1',
  baseValue: 8420,
  prediction: 12400,
  contributions: [
    { feature: 'roll_4w_avg_demand', value: 2180, shap: 0.31 },
    { feature: 'rainfall_mm_lag2', value: 890, shap: 0.18 },
    { feature: 'kharif_season', value: 620, shap: 0.12 },
    { feature: 'app_sessions_4w', value: 540, shap: 0.11 },
    { feature: 'cpi_farmers_index', value: -320, shap: -0.08 },
    { feature: 'temp_anomaly', value: -180, shap: -0.05 },
    { feature: 'Other features', value: 740, shap: 0.09 },
  ],
}

export const explainabilitySkus = agriCoData.skus.map((s) => `${s.sku} — ${s.product}`)
