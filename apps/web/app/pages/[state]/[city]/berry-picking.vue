<script setup lang="ts">
import type { LocationWithDetails } from '~/types/locations'
import { BERRY_TYPES } from '~/types/locations'

const route = useRoute()
const state = (route.params.state as string).toUpperCase()
const citySlug = route.params.city as string
const cityName = citySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

const { data, status, error } = useFetch<{
  city: string
  state: string
  locations: LocationWithDetails[]
  summary: { totalLocations: number; berryTypes: string[]; seasons: string[] }
}>(`/api/regions/${state}/${citySlug}`)

const seoTitle = computed(() => `Berry Picking in ${cityName}, ${state}`)
const seoDescription = computed(() => {
  const count = data.value?.summary?.totalLocations ?? 0
  return `Find ${count} berry picking farms and u-pick locations in ${cityName}, ${state}. Browse seasonal offerings and plan your visit.`
})

useSeo({ title: seoTitle.value, description: seoDescription.value })
useWebPageSchema({ name: seoTitle.value, description: seoDescription.value, type: 'CollectionPage' })

const { items: breadcrumbItems } = useBreadcrumbs({
  resolveLabel: (segment: string) => {
    if (segment === state.toLowerCase()) return state
    if (segment === citySlug) return cityName
    if (segment === 'berry-picking') return 'Berry Picking'
    return undefined
  },
})

useBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: state, url: `/explore?state=${state}` },
  { name: cityName, url: `/${state.toLowerCase()}/${citySlug}/berry-picking` },
  { name: 'Berry Picking', url: `/${state.toLowerCase()}/${citySlug}/berry-picking` },
])

const berryLinks = computed(() =>
  (data.value?.summary?.berryTypes ?? []).map((bt) => {
    const info = BERRY_TYPES.find(b => b.value === bt)
    return {
      value: bt,
      label: info?.label ?? bt,
      icon: info?.icon ?? 'i-lucide-leaf',
      color: info?.color ?? 'neutral',
      to: `/${bt}-picking/${state.toLowerCase()}/${citySlug}`,
    }
  }),
)
</script>

<template>
  <div>
    <!-- Error -->
    <div v-if="error" class="text-center py-24">
      <UIcon name="i-lucide-map-pin-off" class="text-5xl text-dimmed mb-4" />
      <h1 class="text-2xl font-bold text-default mb-2">Region Not Found</h1>
      <p class="text-muted mb-6">We couldn't find berry picking locations for this area.</p>
      <UButton to="/explore" color="primary" label="Browse All Farms" icon="i-lucide-compass" />
    </div>

    <!-- Loading -->
    <div v-else-if="status === 'pending'" class="text-center py-24">
      <UIcon name="i-lucide-loader-2" class="animate-spin text-3xl text-muted" />
      <p class="text-muted mt-3">Loading…</p>
    </div>

    <!-- Content -->
    <div v-else-if="data">
      <UBreadcrumb :items="breadcrumbItems" class="mb-6" />

      <div class="space-y-8">
        <div>
          <h1 class="text-3xl sm:text-4xl font-bold text-default mb-2">
            Berry Picking in {{ cityName }}, {{ state }}
          </h1>
          <p class="text-lg text-muted">
            Discover {{ data.summary.totalLocations }} u-pick farm{{ data.summary.totalLocations !== 1 ? 's' : '' }} in the {{ cityName }} area.
          </p>
        </div>

        <!-- Summary -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <UCard>
            <div class="text-center">
              <p class="text-2xl font-bold text-default">{{ data.summary.totalLocations }}</p>
              <p class="text-sm text-muted">Farms</p>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <p class="text-2xl font-bold text-default">{{ data.summary.berryTypes.length }}</p>
              <p class="text-sm text-muted">Berry Types</p>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <p class="text-2xl font-bold text-default">{{ data.summary.seasons.length }}</p>
              <p class="text-sm text-muted">Seasons</p>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <p class="text-2xl font-bold text-default">{{ state }}</p>
              <p class="text-sm text-muted">State</p>
            </div>
          </UCard>
        </div>

        <!-- Berry Type Links -->
        <div v-if="berryLinks.length">
          <h2 class="text-xl font-semibold text-default mb-3">Browse by Berry Type</h2>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="bl in berryLinks"
              :key="bl.value"
              :to="bl.to"
              :color="(bl.color as any)"
              variant="subtle"
              :icon="bl.icon"
              :label="`${bl.label} Picking`"
            />
          </div>
        </div>

        <USeparator />

        <!-- Location Cards -->
        <div class="space-y-4">
          <h2 class="text-xl font-semibold text-default">Farms in {{ cityName }}</h2>
          <LocationCard
            v-for="loc in data.locations"
            :key="loc.id"
            :location="loc"
          />
          <div v-if="data.locations.length === 0" class="text-center py-8">
            <p class="text-muted">No farms found in this area yet.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
