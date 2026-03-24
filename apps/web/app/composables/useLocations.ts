import type {
  LocationListResponse,
  LocationFilters,
  LocationWithDetails,
} from '~/types/locations'

export function useLocations(initialFilters: LocationFilters = {}) {
  const filters = reactive<LocationFilters>({
    city: initialFilters.city,
    state: initialFilters.state,
    berryType: initialFilters.berryType,
    status: initialFilters.status,
    page: initialFilters.page ?? 1,
    limit: initialFilters.limit ?? 20,
  })

  const queryParams = computed(() => {
    const params: Record<string, string> = {}
    if (filters.city) params.city = filters.city
    if (filters.state) params.state = filters.state
    if (filters.berryType) params.berryType = filters.berryType
    if (filters.status) params.status = filters.status
    if (filters.page) params.page = String(filters.page)
    if (filters.limit) params.limit = String(filters.limit)
    return params
  })

  const { data, status, refresh } = useFetch<LocationListResponse>('/api/locations', {
    query: queryParams,
  })

  const locations = computed<LocationWithDetails[]>(() => data.value?.locations ?? [])
  const total = computed(() => data.value?.total ?? 0)
  const totalPages = computed(() => Math.ceil(total.value / (filters.limit ?? 20)))

  function setPage(page: number) {
    filters.page = page
  }

  function updateFilters(newFilters: Partial<LocationFilters>) {
    Object.assign(filters, newFilters, { page: 1 })
  }

  function resetFilters() {
    filters.city = undefined
    filters.state = undefined
    filters.berryType = undefined
    filters.status = undefined
    filters.page = 1
  }

  return {
    locations,
    total,
    totalPages,
    filters,
    status,
    refresh,
    setPage,
    updateFilters,
    resetFilters,
  }
}
