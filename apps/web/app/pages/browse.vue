<script setup lang="ts">
useSeo({
  title: 'Browse Berry Picking Locations',
  description: 'Search and filter berry picking farms, orchards, and U-pick locations. Find the perfect spot for your next picking adventure.',
})
useWebPageSchema({
  name: 'Browse Berry Picking Locations',
  description: 'Search and filter berry picking farms, orchards, and U-pick locations.',
  type: 'CollectionPage',
})

const route = useRoute()

const {
  selectedCity,
  selectedBerryType,
  selectedStatus,
  locations,
  total,
  status,
  reset,
} = useBerrySearch()

const { berryTypes } = useBerryTypes()
const { markers, bounds } = useMapMarkers(locations)

const berryOptions = computed(() => [
  { label: 'All Berries', value: '' },
  ...berryTypes.map(b => ({ label: b.name, value: b.id })),
])

const statusOptions = [
  { label: 'Any Status', value: '' },
  { label: 'Open Now', value: 'open' },
  { label: 'Coming Soon', value: 'upcoming' },
  { label: 'Closed', value: 'closed' },
]

onMounted(() => {
  const q = route.query
  if (q.city) selectedCity.value = String(q.city)
  if (q.berry) selectedBerryType.value = String(q.berry)
  if (q.status) selectedStatus.value = String(q.status)
})
</script>

<template>
  <UPage>
    <UPageHero
      title="Browse Locations"
      description="Find berry picking farms and orchards near you."
      :ui="{ title: 'text-3xl sm:text-4xl', description: 'text-muted' }"
    />

    <div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <!-- Filters -->
      <div class="flex flex-col sm:flex-row gap-3 mb-8">
        <UInput
          v-model="selectedCity"
          placeholder="Filter by city..."
          icon="i-lucide-map-pin"
          class="flex-1"
        />
        <USelect
          v-model="selectedBerryType"
          :items="berryOptions"
          placeholder="Berry type"
          class="w-full sm:w-48"
        />
        <USelect
          v-model="selectedStatus"
          :items="statusOptions"
          placeholder="Status"
          class="w-full sm:w-40"
        />
        <UButton
          label="Reset"
          variant="ghost"
          icon="i-lucide-x"
          @click="reset"
        />
      </div>

      <!-- Results count -->
      <p class="text-sm text-muted mb-4">
        {{ total }} location{{ total !== 1 ? 's' : '' }} found
      </p>

      <!-- Two-column layout -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        <!-- Location list -->
        <div class="lg:col-span-3 space-y-4">
          <div v-if="status === 'pending'" class="flex justify-center py-12">
            <UIcon name="i-lucide-loader-2" class="size-8 animate-spin text-muted" />
          </div>

          <template v-else-if="locations.length > 0">
            <LocationCard
              v-for="loc in locations"
              :key="loc.id"
              :location="loc"
            />
          </template>

          <UCard v-else>
            <div class="text-center py-8">
              <UIcon name="i-lucide-search-x" class="size-10 text-dimmed mb-3" />
              <p class="text-muted">No locations found matching your filters.</p>
              <UButton
                label="Clear filters"
                variant="link"
                class="mt-2"
                @click="reset"
              />
            </div>
          </UCard>
        </div>

        <!-- Map placeholder -->
        <div class="lg:col-span-2">
          <ClientOnly>
            <div
              class="bg-muted rounded-lg border border-default sticky top-4 flex flex-col items-center justify-center min-h-64 lg:min-h-[32rem] p-6"
            >
              <UIcon name="i-lucide-map" class="size-12 text-dimmed mb-3" />
              <p class="text-sm font-medium text-default mb-1">
                Map View
              </p>
              <p class="text-xs text-muted text-center">
                {{ markers.length }} location{{ markers.length !== 1 ? 's' : '' }} with coordinates
              </p>
              <div v-if="bounds" class="mt-3 text-xs text-dimmed text-center">
                <p>Lat: {{ bounds.minLat.toFixed(2) }}° – {{ bounds.maxLat.toFixed(2) }}°</p>
                <p>Lng: {{ bounds.minLng.toFixed(2) }}° – {{ bounds.maxLng.toFixed(2) }}°</p>
              </div>
              <div class="flex flex-wrap gap-1 mt-4 justify-center">
                <UBadge
                  v-for="marker in markers.slice(0, 8)"
                  :key="marker.id"
                  :color="marker.isInSeason ? 'success' : 'neutral'"
                  variant="subtle"
                  size="xs"
                  icon="i-lucide-map-pin"
                  :label="marker.title"
                />
                <UBadge
                  v-if="markers.length > 8"
                  color="neutral"
                  variant="subtle"
                  size="xs"
                  :label="`+${markers.length - 8} more`"
                />
              </div>
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>
  </UPage>
</template>
