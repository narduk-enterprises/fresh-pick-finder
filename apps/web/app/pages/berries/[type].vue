<script setup lang="ts">
const route = useRoute()
const berryType = route.params.type as string

const { berryTypes, getBerryType } = useBerryTypes()
const berry = computed(() => getBerryType(berryType))

const { locations, total, status } = useBerryTypeLocations(berryType)

const berryName = computed(() => berry.value?.name ?? berryType.charAt(0).toUpperCase() + berryType.slice(1))

useSeo({
  title: `${berryName.value} Picking — Find U-Pick Farms`,
  description: `Find ${berryName.value.toLowerCase()} picking farms and U-pick orchards near you. Seasonal availability, directions, and pricing included.`,
})
useWebPageSchema({
  name: `${berryName.value} Picking Locations`,
  description: `Find ${berryName.value.toLowerCase()} picking farms and U-pick locations near you.`,
  type: 'CollectionPage',
})

const { items: breadcrumbItems } = useBreadcrumbs({
  resolveLabel: (segment: string) => {
    if (segment === 'berries') return 'Berries'
    if (segment === berryType) return berryName.value
    return undefined
  },
})

const cityFilter = ref('')

const filteredLocations = computed(() => {
  if (!cityFilter.value) return locations.value
  const q = cityFilter.value.toLowerCase()
  return locations.value.filter(
    loc => loc.city.toLowerCase().includes(q) || loc.state.toLowerCase().includes(q),
  )
})
</script>

<template>
  <UPage>
    <div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-6">
      <UBreadcrumb :items="breadcrumbItems" class="mb-6" />

      <!-- Hero -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <span v-if="berry" class="text-4xl">{{ berry.emoji }}</span>
          <h1 class="text-3xl sm:text-4xl font-bold text-default">
            {{ berryName }} Picking
          </h1>
        </div>
        <p class="text-lg text-muted">
          <template v-if="berry">
            Season: {{ berry.seasonDescription }}.
          </template>
          {{ total }} location{{ total !== 1 ? 's' : '' }} available.
        </p>
      </div>

      <!-- Filter -->
      <div class="mb-6">
        <UInput
          v-model="cityFilter"
          placeholder="Filter by city or state..."
          icon="i-lucide-search"
          class="max-w-sm"
        />
      </div>

      <!-- Loading -->
      <div v-if="status === 'pending'" class="flex justify-center py-16">
        <UIcon name="i-lucide-loader-2" class="size-8 animate-spin text-muted" />
      </div>

      <!-- Locations -->
      <template v-else-if="filteredLocations.length > 0">
        <p class="text-sm text-muted mb-4">
          Showing {{ filteredLocations.length }} of {{ total }} location{{ total !== 1 ? 's' : '' }}
        </p>
        <UPageGrid>
          <LocationCard
            v-for="loc in filteredLocations"
            :key="loc.id"
            :location="loc"
          />
        </UPageGrid>
      </template>

      <!-- Empty state -->
      <div v-else class="text-center py-16">
        <UIcon name="i-lucide-search-x" class="size-10 text-dimmed mb-3" />
        <p class="text-muted mb-4">
          <template v-if="cityFilter">
            No {{ berryName.toLowerCase() }} picking locations match "{{ cityFilter }}".
          </template>
          <template v-else>
            No {{ berryName.toLowerCase() }} picking locations found yet.
          </template>
        </p>
        <UButton
          to="/browse"
          label="Browse all locations"
          icon="i-lucide-compass"
        />
      </div>

      <!-- Other berry types -->
      <USeparator class="my-12" />

      <div class="mb-8">
        <h2 class="text-lg font-semibold text-default mb-4">Other Berry Types</h2>
        <div class="flex flex-wrap gap-3">
          <UButton
            v-for="b in berryTypes.filter(b => b.id !== berryType)"
            :key="b.id"
            :to="`/berries/${b.id}`"
            variant="outline"
            size="sm"
          >
            <span>{{ b.emoji }}</span>
            {{ b.name }}
          </UButton>
        </div>
      </div>
    </div>
  </UPage>
</template>
