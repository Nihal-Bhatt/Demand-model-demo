export type NavSection = 'overview' | 'accuracy' | 'performance' | 'forecast' | 'explainability' | 'pipeline'

export const BRAND = {
  name: 'AgriCo',
  product: 'Forecast Command',
  tagline: 'Demand Planning',
} as const

export const LABELS = {
  salesTeam: 'Sales Team',
  salesTeamForecast: 'Sales Team Forecast',
  salesTeamAccuracy: 'Sales Team Accuracy',
  salesTeamBaseline: 'Sales Team baseline',
  salesTeamError: 'Sales Team Error',
} as const

export interface MonthlyMetric {
  month: string
  modelAccuracy: number
  salesTeamAccuracy: number
  modelError: number
  salesTeamError: number
  modelOverForecast: number
  salesTeamOverForecast: number
  modelUnderForecast: number
  salesTeamUnderForecast: number
}

export interface AccuracyBucket {
  range: string
  modelShare: number
  salesTeamShare: number
}

export interface TerritoryPerformance {
  name: string
  salesCr: number
  salesShare: number
  modelAccuracy: number
  salesTeamAccuracy: number
  improvement: number
}

export interface SkuPerformance {
  sku: string
  product: string
  salesShare: number
  modelAccuracy: number
  salesTeamAccuracy: number
  improvement: number
  bestModel: string
  segment: 'High Volume' | 'Medium Volume' | 'Low Volume' | 'Sparse'
}

export interface DashboardData {
  label: string
  subtitle: string
  level: string
  period: string
  summary: {
    modelAccuracy: number
    salesTeamAccuracy: number
    accuracyImprovement: number
    overForecastReduction: number
    underForecastReduction: number
    salesHighAccuracyBucket: number
    salesLowAccuracyBucketSalesTeam: number
    territoriesImproved: number
    territoriesImprovedSalesShare: number
    productsImproved: number
    productsImprovedSalesShare: number
    totalSkus: number
    totalTerritories: number
    forecastHorizon: string
  }
  monthly: MonthlyMetric[]
  buckets: AccuracyBucket[]
  territories: TerritoryPerformance[]
  skus: SkuPerformance[]
  models: { name: string; share: number; avgWmape: number }[]
}

const monthly: MonthlyMetric[] = [
  { month: 'Jul-24', modelAccuracy: 0, salesTeamAccuracy: 0, modelError: 0, salesTeamError: 0, modelOverForecast: 0, salesTeamOverForecast: 0, modelUnderForecast: 0, salesTeamUnderForecast: 0 },
  { month: 'Aug-24', modelAccuracy: 16, salesTeamAccuracy: 23, modelError: 16, salesTeamError: 23, modelOverForecast: 31, salesTeamOverForecast: 41, modelUnderForecast: 49, salesTeamUnderForecast: 49 },
  { month: 'Sep-24', modelAccuracy: 21, salesTeamAccuracy: 23, modelError: 21, salesTeamError: 23, modelOverForecast: 0, salesTeamOverForecast: 45, modelUnderForecast: 19, salesTeamUnderForecast: 0 },
  { month: 'Oct-24', modelAccuracy: 17, salesTeamAccuracy: 23, modelError: 17, salesTeamError: 23, modelOverForecast: 32, salesTeamOverForecast: 59, modelUnderForecast: 0, salesTeamUnderForecast: 31 },
  { month: 'Nov-24', modelAccuracy: 14, salesTeamAccuracy: 26, modelError: 14, salesTeamError: 26, modelOverForecast: 23, salesTeamOverForecast: 31, modelUnderForecast: 0, salesTeamUnderForecast: 0 },
  { month: 'Dec-24', modelAccuracy: 14, salesTeamAccuracy: 14, modelError: 14, salesTeamError: 14, modelOverForecast: 16, salesTeamOverForecast: 23, modelUnderForecast: 0, salesTeamUnderForecast: 0 },
  { month: 'Jan-25', modelAccuracy: 13, salesTeamAccuracy: 14, modelError: 13, salesTeamError: 14, modelOverForecast: 17, salesTeamOverForecast: 18, modelUnderForecast: 18, salesTeamUnderForecast: 18 },
  { month: 'Feb-25', modelAccuracy: 18, salesTeamAccuracy: 12, modelError: 18, salesTeamError: 12, modelOverForecast: 29, salesTeamOverForecast: 18, modelUnderForecast: 16, salesTeamUnderForecast: 19 },
  { month: 'Mar-25', modelAccuracy: 12, salesTeamAccuracy: 18, modelError: 12, salesTeamError: 18, modelOverForecast: 32, salesTeamOverForecast: 18, modelUnderForecast: 15, salesTeamUnderForecast: 20 },
  { month: 'Apr-25', modelAccuracy: 17, salesTeamAccuracy: 10, modelError: 17, salesTeamError: 10, modelOverForecast: 23, salesTeamOverForecast: 15, modelUnderForecast: 18, salesTeamUnderForecast: 15 },
  { month: 'May-25', modelAccuracy: 23, salesTeamAccuracy: 11, modelError: 23, salesTeamError: 11, modelOverForecast: 16, salesTeamOverForecast: 21, modelUnderForecast: 16, salesTeamUnderForecast: 13 },
  { month: 'Jun-25', modelAccuracy: 16, salesTeamAccuracy: 13, modelError: 16, salesTeamError: 13, modelOverForecast: 17, salesTeamOverForecast: 10, modelUnderForecast: 15, salesTeamUnderForecast: 18 },
  { month: 'Jul-25', modelAccuracy: 16, salesTeamAccuracy: 21, modelError: 16, salesTeamError: 21, modelOverForecast: 18, salesTeamOverForecast: 32, modelUnderForecast: 18, salesTeamUnderForecast: 19 },
  { month: 'Aug-25', modelAccuracy: 21, salesTeamAccuracy: 10, modelError: 21, salesTeamError: 10, modelOverForecast: 19, salesTeamOverForecast: 18, modelUnderForecast: 20, salesTeamUnderForecast: 15 },
  { month: 'Sep-25', modelAccuracy: 10, salesTeamAccuracy: 11, modelError: 10, salesTeamError: 11, modelOverForecast: 15, salesTeamOverForecast: 21, modelUnderForecast: 18, salesTeamUnderForecast: 13 },
  { month: 'Oct-25', modelAccuracy: 11, salesTeamAccuracy: 13, modelError: 11, salesTeamError: 13, modelOverForecast: 18, salesTeamOverForecast: 32, modelUnderForecast: 18, salesTeamUnderForecast: 14 },
  { month: 'Nov-25', modelAccuracy: 13, salesTeamAccuracy: 14, modelError: 13, salesTeamError: 14, modelOverForecast: 20, salesTeamOverForecast: 18, modelUnderForecast: 15, salesTeamUnderForecast: 15 },
  { month: 'Dec-25', modelAccuracy: 14, salesTeamAccuracy: 14, modelError: 14, salesTeamError: 14, modelOverForecast: 15, salesTeamOverForecast: 21, modelUnderForecast: 18, salesTeamUnderForecast: 18 },
  { month: 'Jan-26', modelAccuracy: 15, salesTeamAccuracy: 0, modelError: 15, salesTeamError: 0, modelOverForecast: 21, salesTeamOverForecast: 0, modelUnderForecast: 0, salesTeamUnderForecast: 0 },
  { month: 'Feb-26', modelAccuracy: 0, salesTeamAccuracy: 0, modelError: 0, salesTeamError: 0, modelOverForecast: 0, salesTeamOverForecast: 0, modelUnderForecast: 0, salesTeamUnderForecast: 0 },
]

export const agriCoData: DashboardData = {
  label: 'AgriCo',
  subtitle: 'National level · volume weighted by value',
  level: 'Territory × SKU × Month',
  period: "Jul'24 – Feb'26",
  summary: {
    modelAccuracy: 82,
    salesTeamAccuracy: 25,
    accuracyImprovement: 57,
    overForecastReduction: 70,
    underForecastReduction: 22,
    salesHighAccuracyBucket: 67,
    salesLowAccuracyBucketSalesTeam: 41,
    territoriesImproved: 204,
    territoriesImprovedSalesShare: 83,
    productsImproved: 52,
    productsImprovedSalesShare: 84,
    totalSkus: 1240,
    totalTerritories: 312,
    forecastHorizon: 'N+1, N+2, N+3',
  },
  monthly,
  buckets: [
    { range: '<10%', modelShare: 5, salesTeamShare: 41 },
    { range: '10–30%', modelShare: 12, salesTeamShare: 18 },
    { range: '30–60%', modelShare: 16, salesTeamShare: 22 },
    { range: '>60%', modelShare: 67, salesTeamShare: 19 },
  ],
  territories: [
    { name: 'Punjab North', salesCr: 142, salesShare: 8.2, modelAccuracy: 88, salesTeamAccuracy: 22, improvement: 66 },
    { name: 'Maharashtra West', salesCr: 128, salesShare: 7.4, modelAccuracy: 85, salesTeamAccuracy: 19, improvement: 66 },
    { name: 'UP Central', salesCr: 115, salesShare: 6.6, modelAccuracy: 79, salesTeamAccuracy: 28, improvement: 51 },
    { name: 'Karnataka South', salesCr: 98, salesShare: 5.7, modelAccuracy: 84, salesTeamAccuracy: 24, improvement: 60 },
    { name: 'Gujarat West', salesCr: 91, salesShare: 5.3, modelAccuracy: 81, salesTeamAccuracy: 31, improvement: 50 },
    { name: 'AP Coastal', salesCr: 87, salesShare: 5.0, modelAccuracy: 76, salesTeamAccuracy: 18, improvement: 58 },
    { name: 'Rajasthan', salesCr: 76, salesShare: 4.4, modelAccuracy: 83, salesTeamAccuracy: 27, improvement: 56 },
    { name: 'MP Central', salesCr: 68, salesShare: 3.9, modelAccuracy: 77, salesTeamAccuracy: 21, improvement: 56 },
  ],
  skus: [
    { sku: 'AC-1042', product: 'Herbicide Alpha', salesShare: 6.2, modelAccuracy: 91, salesTeamAccuracy: 18, improvement: 73, bestModel: 'XGBoost', segment: 'High Volume' },
    { sku: 'AC-2087', product: 'Fungicide Pro', salesShare: 5.4, modelAccuracy: 86, salesTeamAccuracy: 22, improvement: 64, bestModel: 'LightGBM', segment: 'High Volume' },
    { sku: 'AC-3310', product: 'Insecticide Max', salesShare: 4.8, modelAccuracy: 84, salesTeamAccuracy: 19, improvement: 65, bestModel: 'Prophet', segment: 'High Volume' },
    { sku: 'AC-4421', product: 'Seed Treatment', salesShare: 3.9, modelAccuracy: 78, salesTeamAccuracy: 31, improvement: 47, bestModel: 'AutoARIMA', segment: 'Medium Volume' },
    { sku: 'AC-5563', product: 'Growth Regulator', salesShare: 3.1, modelAccuracy: 72, salesTeamAccuracy: 28, improvement: 44, bestModel: 'LSTM', segment: 'Medium Volume' },
    { sku: 'AC-6678', product: 'Micronutrient Mix', salesShare: 2.4, modelAccuracy: 69, salesTeamAccuracy: 35, improvement: 34, bestModel: 'ETS', segment: 'Low Volume' },
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

export const pipelineSteps = [
  { id: 1, name: 'Data Preprocessing', status: 'complete' as const, duration: '12m' },
  { id: 2, name: 'Feature Engineering', status: 'complete' as const, duration: '28m' },
  { id: 3, name: 'Model Training', status: 'complete' as const, duration: '2h 14m' },
  { id: 4, name: 'wMAPE Ranking', status: 'complete' as const, duration: '18m' },
  { id: 5, name: 'Forecast Generation', status: 'running' as const, duration: 'In progress' },
  { id: 6, name: 'Post Processing', status: 'pending' as const, duration: '—' },
]

export const forecastHorizons = [
  { horizon: 'N+1', modelAccuracy: 84, salesTeamAccuracy: 27, volume: 42 },
  { horizon: 'N+2', modelAccuracy: 79, salesTeamAccuracy: 23, volume: 35 },
  { horizon: 'N+3', modelAccuracy: 74, salesTeamAccuracy: 21, volume: 23 },
]

export const segments = ['All', 'High Volume', 'Medium Volume', 'Low Volume', 'Sparse'] as const

export const pipelineRuns = [
  { id: 'RUN-2847', date: '11 Jun 2026', version: 'v2.5.1', status: 'Running', skus: 1240, duration: '2h 41m' },
  { id: 'RUN-2846', date: '04 Jun 2026', version: 'v2.5.0', status: 'Complete', skus: 1238, duration: '2h 18m' },
  { id: 'RUN-2845', date: '28 May 2026', version: 'v2.5.0', status: 'Complete', skus: 1235, duration: '2h 22m' },
]

export const reviewQueue = [
  { sku: 'AC-1042', territory: 'Punjab North', horizon: 'N+1', modelQty: 12400, salesTeamQty: 9800, variance: 26.5, status: 'Pending Review' },
  { sku: 'AC-2087', territory: 'Maharashtra West', horizon: 'N+2', modelQty: 8200, salesTeamQty: 7900, variance: 3.8, status: 'Approved' },
  { sku: 'AC-3310', territory: 'UP Central', horizon: 'N+1', modelQty: 15600, salesTeamQty: 11200, variance: 39.3, status: 'Change Requested' },
  { sku: 'AC-4421', territory: 'Karnataka South', horizon: 'N+3', modelQty: 4300, salesTeamQty: 4100, variance: 4.9, status: 'Approved' },
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

export const explainabilitySkus = [
  'AC-1042 — Herbicide Alpha',
  'AC-2087 — Fungicide Pro',
  'AC-3310 — Insecticide Max',
  'AC-4421 — Seed Treatment',
]
