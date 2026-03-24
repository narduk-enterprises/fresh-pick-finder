import type { Ref } from 'vue'

export interface LocationOffering {
  id: number
  locationId: number
  category: string
  item: string
  seasonStart: string | null
  seasonEnd: string | null
  status: string
  notes: string | null
  createdAt: string
}

export interface LocationItem {
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
}

interface LocationsResponse {
  locations: LocationItem[]
  total: number
  page: number
  limit: number
}

export function useLocations(
  params?:
    | Ref<Record<string, string | number | undefined>>
    | Record<string, string | number | undefined>,
) {
  const query = computed(() => {
    const raw = toValue(params)
    if (!raw) return {}
    return Object.fromEntries(
      Object.entries(raw).filter(([, v]) => v !== undefined && v !== ''),
    )
  })

  const { data, status, refresh } = useFetch<LocationsResponse>('/api/locations', {
    query,
  })

  const locations = computed(() => data.value?.locations ?? [])
  const total = computed(() => data.value?.total ?? 0)
  const page = computed(() => data.value?.page ?? 1)
  const limit = computed(() => data.value?.limit ?? 20)

  return { locations, total, page, limit, status, refresh }
}
