<script setup lang="ts">
import type { LocationWithDetails } from '~/types/locations'

const route = useRoute()
const slug = route.params.slug as string

const { data: location, status, error } = useFetch<LocationWithDetails>(`/api/locations/${slug}`)

const { getSeasonLabel, getStatusBadge } = useSeasonScoring()

const seoTitle = computed(() => location.value?.name ? `${location.value.name} — Berry Picking Farm` : 'Farm Details')
const seoDescription = computed(() => location.value?.description ?? `Berry picking farm details for ${location.value?.name ?? 'this location'}.`)

useSeo({
  title: seoTitle.value,
  description: seoDescription.value,
})
useWebPageSchema({
  name: seoTitle.value,
  description: seoDescription.value,
  type: 'ItemPage',
})

watchEffect(() => {
  if (!location.value) return
  const loc = location.value
  if (loc.address && loc.city && loc.state) {
    useLocalBusinessSchema({
      name: loc.name,
      description: loc.description ?? undefined,
      telephone: loc.phone ?? undefined,
      url: loc.website ?? undefined,
      address: {
        streetAddress: loc.address,
        addressLocality: loc.city,
        addressRegion: loc.state,
        postalCode: loc.postalCode ?? '',
      },
      geo: loc.lat && loc.lng ? { latitude: loc.lat, longitude: loc.lng } : undefined,
    })
  }
})

const { items: breadcrumbItems } = useBreadcrumbs({
  resolveLabel: (segment: string) => {
    if (segment === 'farms') return 'Explore'
    if (segment === slug) return location.value?.name ?? slug
    return undefined
  },
})

useBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Explore', url: '/explore' },
  { name: location.value?.name ?? slug, url: `/farms/${slug}` },
])

const fullAddress = computed(() => {
  if (!location.value) return ''
  const parts = [location.value.address, location.value.city, location.value.state].filter(Boolean)
  if (location.value.postalCode) parts.push(location.value.postalCode)
  return parts.join(', ')
})
</script>

<template>
  <div>
    <!-- 404 -->
    <div v-if="error" class="text-center py-24">
      <UIcon name="i-lucide-map-pin-off" class="text-5xl text-dimmed mb-4" />
      <h1 class="text-2xl font-bold text-default mb-2">Farm Not Found</h1>
      <p class="text-muted mb-6">We couldn't find a farm with that address.</p>
      <UButton to="/explore" color="primary" label="Browse All Farms" icon="i-lucide-compass" />
    </div>

    <!-- Loading -->
    <div v-else-if="status === 'pending'" class="text-center py-24">
      <UIcon name="i-lucide-loader-2" class="animate-spin text-3xl text-muted" />
      <p class="text-muted mt-3">Loading farm details…</p>
    </div>

    <!-- Detail -->
    <div v-else-if="location">
      <UBreadcrumb :items="breadcrumbItems" class="mb-6" />

      <div class="space-y-8">
        <!-- Header -->
        <div>
          <div class="flex flex-wrap items-start gap-3 mb-2">
            <h1 class="text-3xl sm:text-4xl font-bold text-default">{{ location.name }}</h1>
            <UBadge v-if="location.type" color="neutral" variant="outline" :label="location.type" />
          </div>
          <p class="text-lg text-muted">{{ location.city }}, {{ location.state }}</p>
          <p v-if="location.description" class="text-default mt-4 max-w-3xl">{{ location.description }}</p>
        </div>

        <USeparator />

        <!-- Contact & Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard>
            <template #header>
              <h2 class="text-lg font-semibold text-default">Contact &amp; Location</h2>
            </template>
            <dl class="space-y-3 text-sm">
              <div v-if="fullAddress">
                <dt class="text-muted">Address</dt>
                <dd class="text-default">{{ fullAddress }}</dd>
              </div>
              <div v-if="location.phone">
                <dt class="text-muted">Phone</dt>
                <dd class="text-default">{{ location.phone }}</dd>
              </div>
              <div v-if="location.website">
                <dt class="text-muted">Website</dt>
                <dd>
                  <UButton
                    :to="location.website"
                    external
                    target="_blank"
                    color="primary"
                    variant="link"
                    :label="location.website"
                    icon="i-lucide-external-link"
                    trailing
                    size="sm"
                  />
                </dd>
              </div>
              <div v-if="location.lat && location.lng">
                <dt class="text-muted">Coordinates</dt>
                <dd class="text-dimmed text-xs">{{ location.lat }}, {{ location.lng }}</dd>
              </div>
            </dl>
          </UCard>

          <!-- Metadata -->
          <UCard v-if="location.metadata">
            <template #header>
              <h2 class="text-lg font-semibold text-default">Details</h2>
            </template>
            <dl class="space-y-3 text-sm">
              <div v-if="location.metadata.amenities">
                <dt class="text-muted">Amenities</dt>
                <dd class="text-default">{{ location.metadata.amenities }}</dd>
              </div>
              <div>
                <dt class="text-muted">Family Friendly</dt>
                <dd>
                  <UBadge
                    :color="location.metadata.familyFriendly ? 'success' : 'neutral'"
                    variant="subtle"
                    :label="location.metadata.familyFriendly ? 'Yes' : 'No'"
                  />
                </dd>
              </div>
              <div>
                <dt class="text-muted">Reservations</dt>
                <dd>
                  <UBadge
                    :color="location.metadata.reservationsRequired ? 'warning' : 'success'"
                    variant="subtle"
                    :label="location.metadata.reservationsRequired ? 'Required' : 'Not Required'"
                  />
                </dd>
              </div>
              <div v-if="location.metadata.pricingNotes">
                <dt class="text-muted">Pricing</dt>
                <dd class="text-default">{{ location.metadata.pricingNotes }}</dd>
              </div>
              <div v-if="location.metadata.parkingNotes">
                <dt class="text-muted">Parking</dt>
                <dd class="text-default">{{ location.metadata.parkingNotes }}</dd>
              </div>
            </dl>
          </UCard>
        </div>

        <!-- Seasonal Offerings -->
        <UCard v-if="location.seasonalOfferings?.length">
          <template #header>
            <h2 class="text-lg font-semibold text-default">Seasonal Offerings</h2>
          </template>
          <div class="divide-y divide-default">
            <div
              v-for="offering in location.seasonalOfferings"
              :key="offering.id"
              class="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              <BerryTypeBadge :berry-type="offering.item" />
              <span class="text-sm text-muted">
                {{ getSeasonLabel(offering.seasonStart, offering.seasonEnd) }}
              </span>
              <SeasonBadge v-if="offering.status" :status="offering.status" />
              <span v-if="offering.notes" class="text-xs text-dimmed ml-auto">
                {{ offering.notes }}
              </span>
            </div>
          </div>
        </UCard>

        <!-- Map Placeholder -->
        <UCard v-if="location.lat && location.lng">
          <template #header>
            <h2 class="text-lg font-semibold text-default">Location</h2>
          </template>
          <div class="flex flex-col items-center justify-center py-12 text-center">
            <UIcon name="i-lucide-map" class="text-4xl text-dimmed mb-3" />
            <p class="text-sm text-muted">Interactive map coming soon</p>
            <p class="text-xs text-dimmed mt-1">
              {{ location.lat }}, {{ location.lng }}
            </p>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
