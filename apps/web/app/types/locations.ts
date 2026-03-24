import type {
  Location,
  SeasonalOffering,
  LocationMetadata,
} from '../../server/database/app-schema'

export interface LocationWithDetails extends Location {
  seasonalOfferings: SeasonalOffering[]
  metadata?: LocationMetadata | null
}

export interface LocationListResponse {
  locations: LocationWithDetails[]
  total: number
  page: number
  limit: number
}

export interface LocationFilters {
  city?: string
  state?: string
  berryType?: string
  status?: string
  page?: number
  limit?: number
}

export interface RegionSummary {
  city: string
  state: string
  locations: LocationWithDetails[]
  summary: {
    totalLocations: number
    berryTypes: string[]
    seasons: string[]
  }
}

export interface BerryTypeResponse {
  locations: LocationWithDetails[]
  total: number
  berryType: string
}

export type BerryType =
  | 'strawberry'
  | 'blueberry'
  | 'blackberry'
  | 'raspberry'
  | 'dewberry'

export const BERRY_TYPES: { value: BerryType; label: string; icon: string; color: string }[] = [
  { value: 'strawberry', label: 'Strawberry', icon: 'i-lucide-cherry', color: 'error' },
  { value: 'blueberry', label: 'Blueberry', icon: 'i-lucide-grape', color: 'info' },
  { value: 'blackberry', label: 'Blackberry', icon: 'i-lucide-circle', color: 'neutral' },
  { value: 'raspberry', label: 'Raspberry', icon: 'i-lucide-cherry', color: 'warning' },
  { value: 'dewberry', label: 'Dewberry', icon: 'i-lucide-flower', color: 'success' },
]

export const STATUS_OPTIONS = [
  { value: 'open', label: 'Open Now', color: 'success' },
  { value: 'upcoming', label: 'Upcoming', color: 'info' },
  { value: 'closed', label: 'Closed', color: 'error' },
  { value: 'unknown', label: 'Unknown', color: 'neutral' },
] as const

export const TEXAS_REGIONS = [
  { state: 'TX', city: 'Austin', label: 'Austin' },
  { state: 'TX', city: 'Dallas', label: 'Dallas' },
  { state: 'TX', city: 'Houston', label: 'Houston' },
  { state: 'TX', city: 'San Antonio', label: 'San Antonio' },
  { state: 'TX', city: 'Fredericksburg', label: 'Fredericksburg' },
  { state: 'TX', city: 'Tyler', label: 'Tyler' },
  { state: 'TX', city: 'Waco', label: 'Waco' },
] as const
