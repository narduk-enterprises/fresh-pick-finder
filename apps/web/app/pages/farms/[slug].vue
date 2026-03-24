<script setup lang="ts">
import type { SeasonalInfo } from '~/composables/useSeasonalStatus'
import { getSeasonalInfo } from '~/composables/useSeasonalStatus'

const route = useRoute()
const slug = route.params.slug as string

const { location, offerings, metadata, status } = useLocationDetail(slug)

const pageTitle = computed(() =>
  location.value ? `${location.value.name} — Berry Picking` : 'Farm Details — Berry Picking',
)
const pageDescription = computed(() =>
  location.value
    ? (location.value.description ?? `Visit ${location.value.name} for berry picking in ${location.value.city}, ${location.value.state}.`)
    : 'Discover berry picking at this local farm.',
)

useSeo({
  title: pageTitle.value,
  description: pageDescription.value,
})

useWebPageSchema({
  name: pageTitle.value,
  description: pageDescription.value,
  type: 'ItemPage',
})

const { items: breadcrumbItems } = useBreadcrumbs({
  resolveLabel: (segment: string) => {
    if (segment === 'farms') return 'Farms'
    if (segment === slug) return location.value?.name
    return undefined
  },
})

const amenitiesList = computed(() => {
  if (!metadata.value?.amenities) return []
  try {
    const parsed = JSON.parse(metadata.value.amenities)
    return Array.isArray(parsed) ? parsed.map((a: string) => a.replace(/_/g, ' ')) : []
  }
  catch {
    return []
  }
})

const offeringStatuses = computed(() => {
  const map = new Map<number, SeasonalInfo>()
  for (const offering of offerings.value) {
    map.set(offering.id, getSeasonalInfo(
      offering.seasonStart ?? undefined,
      offering.seasonEnd ?? undefined,
      offering.status,
    ))
  }
  return map
})

function getOfferingStatus(id: number): SeasonalInfo {
  return offeringStatuses.value.get(id) ?? { isInSeason: false, label: 'Unknown', color: 'neutral', icon: 'i-lucide-help-circle' }
}

const { markers } = useMapMarkers(computed(() => location.value ? [location.value] : []))
</script>

<template>
  <UPage>
    <div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-6">
      <!-- Loading -->
      <div v-if="status === 'pending'" class="flex justify-center py-24">
        <UIcon name="i-lucide-loader-2" class="size-10 animate-spin text-muted" />
      </div>

      <!-- Not found -->
      <div v-else-if="!location" class="text-center py-24">
        <UIcon name="i-lucide-map-pin-off" class="size-12 text-dimmed mb-4" />
        <h1 class="text-2xl font-bold text-default mb-2">Location Not Found</h1>
        <p class="text-muted mb-6">We couldn't find a farm matching this address.</p>
        <UButton to="/browse" label="Browse all locations" icon="i-lucide-arrow-left" />
      </div>

      <!-- Detail content -->
      <template v-else>
        <UBreadcrumb :items="breadcrumbItems" class="mb-6" />

        <!-- Hero header -->
        <div class="mb-8">
          <div class="flex flex-wrap items-center gap-3 mb-2">
            <h1 class="text-3xl sm:text-4xl font-bold text-default">
              {{ location.name }}
            </h1>
            <UBadge color="neutral" variant="outline" :label="location.type" />
          </div>
          <div class="flex items-center gap-1.5 text-muted">
            <UIcon name="i-lucide-map-pin" class="size-4" />
            <span>
              {{ location.address ? `${location.address}, ` : '' }}{{ location.city }}, {{ location.state }}
              {{ location.postalCode ? location.postalCode : '' }}
            </span>
          </div>
        </div>

        <!-- Main grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <!-- Left column -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Description -->
            <UCard v-if="location.description">
              <div class="prose prose-sm max-w-none">
                <h2 class="text-lg font-semibold text-default mb-2">About</h2>
                <p class="text-muted">{{ location.description }}</p>
              </div>
            </UCard>

            <!-- Seasonal offerings -->
            <div v-if="offerings.length > 0">
              <h2 class="text-lg font-semibold text-default mb-4">Seasonal Offerings</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UCard v-for="offering in offerings" :key="offering.id">
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <p class="font-medium text-default">{{ offering.item }}</p>
                      <p class="text-sm text-muted capitalize">{{ offering.category }}</p>
                    </div>
                    <UBadge
                      :color="getOfferingStatus(offering.id).color as any"
                      variant="subtle"
                      size="sm"
                      :icon="getOfferingStatus(offering.id).icon"
                      :label="getOfferingStatus(offering.id).label"
                    />
                  </div>
                  <div v-if="offering.seasonStart || offering.seasonEnd" class="mt-2 text-xs text-dimmed">
                    Season: {{ offering.seasonStart ?? '?' }} – {{ offering.seasonEnd ?? '?' }}
                  </div>
                  <p v-if="offering.notes" class="mt-2 text-sm text-muted">{{ offering.notes }}</p>
                </UCard>
              </div>
            </div>

            <!-- Metadata -->
            <div v-if="metadata">
              <h2 class="text-lg font-semibold text-default mb-4">Details</h2>
              <UCard>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div v-if="metadata.familyFriendly !== null" class="flex items-center gap-2">
                    <UIcon
                      :name="metadata.familyFriendly ? 'i-lucide-baby' : 'i-lucide-info'"
                      class="size-5 text-muted"
                    />
                    <span class="text-sm text-default">
                      {{ metadata.familyFriendly ? 'Family Friendly' : 'Not specifically family oriented' }}
                    </span>
                  </div>

                  <div v-if="metadata.reservationsRequired" class="flex items-center gap-2">
                    <UIcon name="i-lucide-calendar-check" class="size-5 text-muted" />
                    <span class="text-sm text-default">Reservations Required</span>
                  </div>

                  <div v-if="metadata.pricingNotes" class="flex items-start gap-2">
                    <UIcon name="i-lucide-dollar-sign" class="size-5 text-muted shrink-0 mt-0.5" />
                    <span class="text-sm text-default">{{ metadata.pricingNotes }}</span>
                  </div>

                  <div v-if="metadata.parkingNotes" class="flex items-start gap-2">
                    <UIcon name="i-lucide-car" class="size-5 text-muted shrink-0 mt-0.5" />
                    <span class="text-sm text-default">{{ metadata.parkingNotes }}</span>
                  </div>
                </div>

                <div v-if="amenitiesList.length > 0" class="mt-4">
                  <p class="text-sm font-medium text-default mb-2">Amenities</p>
                  <div class="flex flex-wrap gap-1.5">
                    <UBadge
                      v-for="amenity in amenitiesList"
                      :key="amenity"
                      color="primary"
                      variant="subtle"
                      size="xs"
                      :label="amenity"
                    />
                  </div>
                </div>
              </UCard>
            </div>
          </div>

          <!-- Right column (sidebar) -->
          <div class="space-y-6">
            <!-- Contact -->
            <UCard v-if="location.website || location.phone">
              <h3 class="text-sm font-semibold text-default mb-3">Contact</h3>
              <div class="space-y-2">
                <UButton
                  v-if="location.website"
                  :to="location.website"
                  target="_blank"
                  label="Visit Website"
                  icon="i-lucide-external-link"
                  variant="outline"
                  block
                />
                <UButton
                  v-if="location.phone"
                  :to="`tel:${location.phone}`"
                  :label="location.phone"
                  icon="i-lucide-phone"
                  variant="outline"
                  block
                />
              </div>
            </UCard>

            <!-- Map placeholder -->
            <ClientOnly>
              <div class="bg-muted rounded-lg border border-default flex flex-col items-center justify-center min-h-48 p-6">
                <UIcon name="i-lucide-map-pin" class="size-8 text-primary mb-2" />
                <p class="text-sm font-medium text-default">{{ location.name }}</p>
                <p class="text-xs text-muted mt-1">
                  {{ location.city }}, {{ location.state }}
                </p>
                <p v-if="markers.length > 0" class="text-xs text-dimmed mt-2">
                  {{ markers[0].lat.toFixed(4) }}°, {{ markers[0].lng.toFixed(4) }}°
                </p>
              </div>
            </ClientOnly>

            <!-- Quick nav -->
            <UCard>
              <h3 class="text-sm font-semibold text-default mb-3">Explore More</h3>
              <div class="space-y-2">
                <UButton
                  :to="`/${location.state.toLowerCase()}/${encodeURIComponent(location.city.toLowerCase())}/berry-picking`"
                  :label="`More in ${location.city}`"
                  icon="i-lucide-map"
                  variant="ghost"
                  block
                  class="justify-start"
                />
                <UButton
                  to="/browse"
                  label="Browse all locations"
                  icon="i-lucide-compass"
                  variant="ghost"
                  block
                  class="justify-start"
                />
              </div>
            </UCard>
          </div>
        </div>
      </template>
    </div>
  </UPage>
</template>
