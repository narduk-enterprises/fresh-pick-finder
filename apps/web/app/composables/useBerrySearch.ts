export function useBerrySearch() {
  const searchQuery = useState<string>('berry-search-query', () => '')
  const selectedCity = useState<string>('berry-search-city', () => '')
  const selectedBerryType = useState<string>('berry-search-berry-type', () => '')
  const selectedStatus = useState<string>('berry-search-status', () => '')

  const params = computed(() => ({
    ...(selectedCity.value && { city: selectedCity.value }),
    ...(selectedBerryType.value && { item: selectedBerryType.value }),
    ...(selectedStatus.value && { status: selectedStatus.value }),
    category: 'berry',
  }))

  const { locations, total, status, refresh } = useLocations(params)

  function reset() {
    searchQuery.value = ''
    selectedCity.value = ''
    selectedBerryType.value = ''
    selectedStatus.value = ''
  }

  return {
    searchQuery,
    selectedCity,
    selectedBerryType,
    selectedStatus,
    locations,
    total,
    status,
    refresh,
    reset,
    params,
  }
}
