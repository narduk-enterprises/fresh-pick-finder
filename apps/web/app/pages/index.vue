<script setup lang="ts">
import { BERRY_TYPES, TEXAS_REGIONS } from '~/types/locations'

const seoTitle = 'Fresh Pick Finder — Find Berry Picking Near You'
const seoDescription = 'Discover the best berry picking farms and u-pick locations across Texas. Find strawberry, blueberry, blackberry, and more near you.'

useSeo({ title: seoTitle, description: seoDescription })
useWebPageSchema({ name: seoTitle, description: seoDescription, type: 'SearchResultsPage' })

const searchInput = ref('')
const router = useRouter()

function onSearch() {
  const q = searchInput.value.trim()
  if (q) {
    router.push({ path: '/explore', query: { q } })
  }
  else {
    router.push('/explore')
  }
}

const popularBerries = BERRY_TYPES.slice(0, 3)

const features = [
  {
    icon: 'i-lucide-map-pin',
    title: 'Local Farms',
    description: 'Browse verified berry picking farms near any Texas city.',
  },
  {
    icon: 'i-lucide-calendar',
    title: 'Season Tracker',
    description: 'Know exactly when your favorite berries are ripe and ready.',
  },
  {
    icon: 'i-lucide-filter',
    title: 'Smart Filters',
    description: 'Filter by berry type, status, and region to find the perfect spot.',
  },
]
</script>

<template>
  <UPage>
    <UPageHero
      title="Find Berry Picking Near You"
      description="Discover the best u-pick farms and berry picking locations across Texas."
      :ui="{ title: 'text-4xl sm:text-5xl lg:text-6xl', description: 'text-lg sm:text-xl text-muted max-w-2xl' }"
    >
      <template #links>
        <div class="w-full max-w-lg flex gap-2">
          <UInput
            v-model="searchInput"
            placeholder="Search farms, cities, or berries…"
            icon="i-lucide-search"
            size="lg"
            class="flex-1"
            @keydown.enter="onSearch"
          />
          <UButton
            color="primary"
            size="lg"
            label="Search"
            icon="i-lucide-arrow-right"
            trailing
            @click="onSearch"
          />
        </div>
      </template>
    </UPageHero>

    <!-- Popular Berry Types -->
    <UPageSection title="Popular Berries" description="Jump to your favorite berry type.">
      <div class="flex flex-wrap justify-center gap-3">
        <UButton
          v-for="berry in popularBerries"
          :key="berry.value"
          :to="`/explore?berryType=${berry.value}`"
          :color="(berry.color as any)"
          variant="subtle"
          size="lg"
          :icon="berry.icon"
          :label="`${berry.label} Picking`"
        />
      </div>
    </UPageSection>

    <!-- Texas Regions -->
    <UPageSection title="Explore by Region" description="Find berry picking farms in your area.">
      <div class="flex flex-wrap justify-center gap-2">
        <UButton
          v-for="region in TEXAS_REGIONS"
          :key="region.city"
          :to="`/${region.state.toLowerCase()}/${region.city.toLowerCase().replace(/ /g, '-')}/berry-picking`"
          color="neutral"
          variant="outline"
          :label="region.label"
          icon="i-lucide-map-pin"
        />
      </div>
    </UPageSection>

    <!-- Features -->
    <UPageGrid>
      <UPageCard
        v-for="feature in features"
        :key="feature.title"
        :icon="feature.icon"
        :title="feature.title"
        :description="feature.description"
      />
    </UPageGrid>

    <UPageSection :ui="{ wrapper: 'py-16 sm:py-24 text-center' }">
      <p class="text-lg text-muted mb-2">
        Helping Texans find the freshest berries since 2025.
      </p>
      <UButton
        to="/explore"
        color="primary"
        size="lg"
        label="Browse All Farms"
        icon="i-lucide-compass"
      />
    </UPageSection>
  </UPage>
</template>
