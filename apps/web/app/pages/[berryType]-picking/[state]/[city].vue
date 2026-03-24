<script setup lang="ts">
import type { LocationWithDetails } from '~/types/locations'
import { BERRY_TYPES } from '~/types/locations'

const route = useRoute()
const berrySlug = route.params.berryType as string
const state = (route.params.state as string).toUpperCase()
const citySlug = route.params.city as string
const cityName = cityFromSlug(citySlug)

const berryInfo = computed(
  () => BERRY_TYPES.find(b => b.value === berrySlug) ?? { value: berrySlug, label: berrySlug.replace(/\b\w/g, c => c.toUpperCase()), icon: 'i-lucide-leaf', color: 'neutral' },
)

const { data, status, error } = useFetch<{
  berryType: string
  locations: (LocationWithDetails & { seasonalOfferings: { item: string; seasonStart: string | null; seasonEnd: string | null; status: string }[] })[]
}>(`/api/berries/${berrySlug}`, {
  query: { state },
})

const { getSeasonLabel, isInSeason } = useSeasonScoring()

// Filter locations by city
const cityLocations = computed(() =>
  (data.value?.locations ?? []).filter(
    loc => loc.city.toLowerCase().replace(/ /g, '-') === citySlug,
  ),
)

const seasonInfo = computed(() => {
  const offerings = cityLocations.value.flatMap(loc =>
    loc.seasonalOfferings.filter(o => o.item === berrySlug),
  )
  if (!offerings.length) return null
  const first = offerings[0]
  return {
    label: getSeasonLabel(first?.seasonStart, first?.seasonEnd),
    inSeason: isInSeason(first?.seasonStart, first?.seasonEnd),
  }
})

const seoTitle = computed(() => `${berryInfo.value.label} Picking in ${cityName}, ${state}`)
const seoDescription = computed(() => {
  const count = cityLocations.value.length
  return `Find ${count} ${berryInfo.value.label.toLowerCase()} picking farm${count !== 1 ? 's' : ''} in ${cityName}, ${state}. Check seasonal availability and plan your visit.`
})

useSeo({ title: seoTitle.value, description: seoDescription.value })
useWebPageSchema({ name: seoTitle.value, description: seoDescription.value, type: 'CollectionPage' })

const { items: breadcrumbItems } = useBreadcrumbs({
  resolveLabel: (segment: string) => {
    if (segment === `${berrySlug}-picking`) return `${berryInfo.value.label} Picking`
    if (segment === state.toLowerCase()) return state
    if (segment === citySlug) return cityName
    return undefined
  },
})

useBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: `${berryInfo.value.label} Picking`, url: `/explore?berryType=${berrySlug}` },
  { name: state, url: `/${state.toLowerCase()}/${citySlug}/berry-picking` },
  { name: cityName, url: `/${berrySlug}-picking/${state.toLowerCase()}/${citySlug}` },
])
</script>

<template>
  <div>
    <!-- Error -->
    <div v-if="error" class="text-center py-24">
      <UIcon name="i-lucide-search-x" class="text-5xl text-dimmed mb-4" />
      <h1 class="text-2xl font-bold text-default mb-2">Not Found</h1>
      <p class="text-muted mb-6">We couldn't find {{ berryInfo.label.toLowerCase() }} picking locations here.</p>
      <UButton to="/explore" color="primary" label="Browse All Farms" icon="i-lucide-compass" />
    </div>

    <!-- Loading -->
    <div v-else-if="status === 'pending'" class="text-center py-24">
      <UIcon name="i-lucide-loader-2" class="animate-spin text-3xl text-muted" />
      <p class="text-muted mt-3">Loading…</p>
    </div>

    <!-- Content -->
    <div v-else>
      <UBreadcrumb :items="breadcrumbItems" class="mb-6" />

      <div class="space-y-8">
        <div>
          <div class="flex flex-wrap items-center gap-3 mb-2">
            <h1 class="text-3xl sm:text-4xl font-bold text-default">
              {{ berryInfo.label }} Picking in {{ cityName }}, {{ state }}
            </h1>
            <BerryTypeBadge :berry-type="berrySlug" />
          </div>
          <p class="text-lg text-muted">
            {{ cityLocations.length }} farm{{ cityLocations.length !== 1 ? 's' : '' }} offering {{ berryInfo.label.toLowerCase() }} picking.
          </p>
        </div>

        <!-- Season Info -->
        <UCard v-if="seasonInfo">
          <div class="flex flex-wrap items-center gap-4">
            <UIcon :name="berryInfo.icon" class="text-2xl" />
            <div>
              <p class="text-sm text-muted">{{ berryInfo.label }} Season</p>
              <p class="font-semibold text-default">{{ seasonInfo.label }}</p>
            </div>
            <UBadge
              :color="seasonInfo.inSeason ? 'success' : 'neutral'"
              variant="subtle"
              :label="seasonInfo.inSeason ? 'In Season Now' : 'Out of Season'"
            />
          </div>
        </UCard>

        <USeparator />

        <!-- Location Cards -->
        <div class="space-y-4">
          <LocationCard
            v-for="loc in cityLocations"
            :key="loc.id"
            :location="loc"
          />
          <div v-if="cityLocations.length === 0" class="text-center py-12">
            <UIcon name="i-lucide-search-x" class="text-4xl text-dimmed mb-3" />
            <p class="text-muted">No {{ berryInfo.label.toLowerCase() }} picking farms found in {{ cityName }}.</p>
            <UButton
              :to="`/explore?berryType=${berrySlug}`"
              color="primary"
              variant="ghost"
              label="Search All Locations"
              class="mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
