import type { LocationItem } from './useLocations'

interface RegionLocationsResponse {
  city: string
  state: string
  locations: LocationItem[]
  total: number
}

export function useRegionLocations(
  state: string,
  city: string,
  queryParams?: Record<string, string>,
) {
  const query = computed(() => {
    if (!queryParams) return {}
    return Object.fromEntries(
      Object.entries(queryParams).filter(([, v]) => v !== undefined && v !== ''),
    )
  })

  const { data, status } = useFetch<RegionLocationsResponse>(
    `/api/regions/${encodeURIComponent(state)}/${encodeURIComponent(city)}`,
    { query },
  )

  const locations = computed(() => data.value?.locations ?? [])
  const total = computed(() => data.value?.total ?? 0)
  const resolvedCity = computed(() => data.value?.city ?? city)
  const resolvedState = computed(() => data.value?.state ?? state)

  return {
    locations,
    total,
    city: resolvedCity,
    state: resolvedState,
    status,
  }
}
