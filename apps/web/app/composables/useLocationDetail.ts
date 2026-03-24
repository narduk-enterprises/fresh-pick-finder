import type { Ref } from 'vue'
import type { LocationItem, LocationOffering } from './useLocations'

export interface LocationMetadataItem {
  id: number
  locationId: number
  amenities: string | null
  familyFriendly: boolean
  reservationsRequired: boolean
  pricingNotes: string | null
  parkingNotes: string | null
  lastVerifiedAt: string | null
  sourceUrl: string | null
  confidenceScore: number | null
}

interface LocationDetailResponse {
  id: number
  name: string
  slug: string
  type: string
  address: string | null
  city: string
  state: string
  postalCode: string | null
  lat: number | null
  lng: number | null
  website: string | null
  phone: string | null
  description: string | null
  createdAt: string
  updatedAt: string
  seasonalOfferings: LocationOffering[]
  metadata: LocationMetadataItem | null
}

export function useLocationDetail(slug: string | Ref<string>) {
  const resolvedSlug = computed(() => toValue(slug))

  const { data, status } = useFetch<LocationDetailResponse>(
    () => `/api/locations/${resolvedSlug.value}`,
  )

  const location = computed<LocationItem | null>(() => {
    if (!data.value) return null
    return data.value
  })

  const offerings = computed(() => data.value?.seasonalOfferings ?? [])
  const metadata = computed(() => data.value?.metadata ?? null)

  return { location, offerings, metadata, status }
}
