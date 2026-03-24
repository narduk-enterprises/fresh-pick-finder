<script setup lang="ts">
const route = useRoute()
const state = (route.params.state as string).toUpperCase()
const city = decodeURIComponent(route.params.city as string)

const cityDisplay = computed(() =>
  city.replace(/\b\w/g, c => c.toUpperCase()),
)

const {
  locations,
  total,
  city: resolvedCity,
  state: resolvedState,
  status,
} = useRegionLocations(state, city)

useSeo({
  title: `Berry Picking in ${cityDisplay.value}, ${state}`,
  description: `Find the best berry picking farms and U-pick orchards in ${cityDisplay.value}, ${state}. Seasonal availability and directions included.`,
})
useWebPageSchema({
  name: `Berry Picking in ${cityDisplay.value}, ${state}`,
  description: `Berry picking farms and U-pick locations in ${cityDisplay.value}, ${state}.`,
  type: 'CollectionPage',
})

const { items: breadcrumbItems } = useBreadcrumbs({
  resolveLabel: (segment: string) => {
    if (segment === state.toLowerCase()) return state
    if (segment === city.toLowerCase()) return cityDisplay.value
    if (segment === 'berry-picking') return 'Berry Picking'
    return undefined
  },
})

const { berryTypes, getBerryType } = useBerryTypes()

const berryTypeSummary = computed(() => {
  const counts: Record<string, number> = {}
  for (const loc of locations.value) {
    for (const offering of loc.seasonalOfferings ?? []) {
      const key = offering.item.toLowerCase()
      counts[key] = (counts[key] ?? 0) + 1
    }
  }
  return Object.entries(counts)
    .map(([item, count]) => ({
      item,
      count,
      berry: getBerryType(item),
    }))
    .sort((a, b) => b.count - a.count)
})
</script>

<template>
  <UPage>
    <div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-6">
      <UBreadcrumb :items="breadcrumbItems" class="mb-6" />

      <div class="mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-default mb-2">
          Berry Picking in {{ cityDisplay }}, {{ state }}
        </h1>
        <p class="text-lg text-muted">
          Discover {{ total }} berry picking location{{ total !== 1 ? 's' : '' }} in the {{ cityDisplay }} area.
        </p>
      </div>

      <!-- Berry type summary -->
      <div v-if="berryTypeSummary.length > 0" class="mb-8">
        <h2 class="text-lg font-semibold text-default mb-3">Available Berries</h2>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="summary in berryTypeSummary"
            :key="summary.item"
            color="primary"
            variant="subtle"
            size="md"
          >
            <span v-if="summary.berry">{{ summary.berry.emoji }}</span>
            {{ summary.item }} ({{ summary.count }})
          </UBadge>
        </div>
      </div>

      <USeparator class="mb-8" />

      <!-- Loading -->
      <div v-if="status === 'pending'" class="flex justify-center py-16">
        <UIcon name="i-lucide-loader-2" class="size-8 animate-spin text-muted" />
      </div>

      <!-- Locations list -->
      <template v-else-if="locations.length > 0">
        <UPageGrid>
          <LocationCard
            v-for="loc in locations"
            :key="loc.id"
            :location="loc"
          />
        </UPageGrid>
      </template>

      <!-- Empty state -->
      <div v-else class="text-center py-16">
        <UIcon name="i-lucide-map-pin-off" class="size-10 text-dimmed mb-3" />
        <p class="text-muted mb-4">
          No berry picking locations found in {{ cityDisplay }}, {{ state }}.
        </p>
        <UButton
          to="/browse"
          label="Browse all locations"
          icon="i-lucide-compass"
        />
      </div>
    </div>
  </UPage>
</template>
