import type { LocationWithDetails } from '~/types/locations'

export function useLocationSearch() {
  const searchQuery = ref('')
  const isSearching = ref(false)

  const { data, status, refresh } = useFetch<{ locations: LocationWithDetails[] }>(
    '/api/locations/search',
    {
      query: computed(() => ({
        q: searchQuery.value,
        limit: '10',
      })),
      immediate: false,
      watch: false,
    },
  )

  const results = computed(() => data.value?.locations ?? [])

  async function search(query: string) {
    searchQuery.value = query
    if (query.length < 2) return
    isSearching.value = true
    await refresh()
    isSearching.value = false
  }

  return {
    searchQuery,
    results,
    isSearching,
    status,
    search,
  }
}
