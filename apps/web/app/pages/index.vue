<script setup lang="ts">
definePageMeta({ layout: 'landing' })

const config = useRuntimeConfig()
const appName = config.public.appName || 'Fresh Pick Finder'

useSeo({
  title: `${appName} — Find Fresh Berry Picking Near You`,
  description: 'Discover berry picking farms, orchards, and U-pick locations across the country. Find strawberries, blueberries, blackberries, and more near you.',
})
useWebPageSchema({
  name: `${appName} — Find Fresh Berry Picking Near You`,
  description: 'Discover berry picking farms, orchards, and U-pick locations near you.',
})

const { berryTypes } = useBerryTypes()
const { locations: featuredLocations, status: featuredStatus } = useLocations({ limit: 6, category: 'berry' })

const searchCity = ref('')
const searchBerry = ref('')

const berryOptions = computed(() => [
  { label: 'All Berries', value: '' },
  ...berryTypes.map(b => ({ label: b.name, value: b.id })),
])

function handleSearch() {
  const query: Record<string, string> = {}
  if (searchCity.value) query.city = searchCity.value
  if (searchBerry.value) query.berry = searchBerry.value
  navigateTo({ path: '/browse', query })
}
</script>

<template>
  <UPage>
    <UPageHero
      title="Find Fresh Berry Picking Near You"
      description="Discover U-pick farms, berry orchards, and fresh fruit destinations across the country."
      :ui="{ title: 'text-4xl sm:text-5xl lg:text-6xl', description: 'text-lg sm:text-xl text-muted max-w-2xl' }"
    >
      <template #links>
        <div class="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
          <UInput
            v-model="searchCity"
            placeholder="City or zip code..."
            icon="i-lucide-map-pin"
            size="lg"
            class="flex-1"
            @keyup.enter="handleSearch"
          />
          <USelect
            v-model="searchBerry"
            :items="berryOptions"
            placeholder="Berry type"
            size="lg"
            class="w-full sm:w-48"
          />
          <UButton
            label="Search"
            icon="i-lucide-search"
            size="lg"
            color="primary"
            @click="handleSearch"
          />
        </div>
      </template>
    </UPageHero>

    <UPageSection
      title="Browse by Berry Type"
      description="Find your favorite berries in season near you."
    >
      <UPageGrid>
        <UPageCard
          v-for="berry in berryTypes"
          :key="berry.id"
          :to="`/berries/${berry.id}`"
        >
          <div class="flex items-center gap-3">
            <span class="text-3xl">{{ berry.emoji }}</span>
            <div>
              <p class="font-semibold text-default">{{ berry.name }}</p>
              <p class="text-sm text-muted">{{ berry.seasonDescription }}</p>
            </div>
          </div>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <USeparator />

    <UPageSection
      title="Featured Farms"
      description="Popular berry picking destinations to explore."
    >
      <template #links>
        <UButton
          to="/browse"
          label="View all farms"
          variant="ghost"
          trailing-icon="i-lucide-arrow-right"
        />
      </template>

      <div v-if="featuredStatus === 'pending'" class="flex justify-center py-12">
        <UIcon name="i-lucide-loader-2" class="size-8 animate-spin text-muted" />
      </div>

      <UPageGrid v-else>
        <LocationCard
          v-for="loc in featuredLocations"
          :key="loc.id"
          :location="loc"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection :ui="{ wrapper: 'py-16 sm:py-24' }">
      <div class="text-center max-w-2xl mx-auto">
        <UIcon name="i-lucide-cherry" class="size-12 text-primary mb-4" />
        <h2 class="text-2xl sm:text-3xl font-bold text-default mb-3">
          Ready to Go Picking?
        </h2>
        <p class="text-lg text-muted mb-6">
          Browse our full directory of berry farms, filter by season, and plan your perfect picking day.
        </p>
        <UButton
          to="/browse"
          label="Explore All Locations"
          icon="i-lucide-compass"
          size="xl"
          color="primary"
        />
      </div>
    </UPageSection>
  </UPage>
</template>
