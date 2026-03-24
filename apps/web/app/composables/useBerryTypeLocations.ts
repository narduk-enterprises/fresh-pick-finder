import type { Ref } from 'vue'
import type { LocationItem } from './useLocations'

interface BerryTypeLocationsResponse {
  berryType: string
  locations: LocationItem[]
  total: number
  page: number
  limit: number
}

export function useBerryTypeLocations(
  berryType: string,
  params?: Ref<Record<string, string | number | undefined>>,
) {
  const query = computed(() => {
    const raw = toValue(params)
    if (!raw) return {}
    return Object.fromEntries(
      Object.entries(raw).filter(([, v]) => v !== undefined && v !== ''),
    )
  })

  const { data, status, refresh } = useFetch<BerryTypeLocationsResponse>(
    `/api/berries/${encodeURIComponent(berryType)}`,
    { query },
  )

  const resolvedBerryType = computed(() => data.value?.berryType ?? berryType)
  const locations = computed(() => data.value?.locations ?? [])
  const total = computed(() => data.value?.total ?? 0)

  return {
    berryType: resolvedBerryType,
    locations,
    total,
    status,
    refresh,
  }
}
