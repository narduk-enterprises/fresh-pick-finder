<script setup lang="ts">
const seoTitle = 'Explore Berry Picking Farms'
const seoDescription = 'Browse and filter berry picking farms across Texas. Find open u-pick locations by berry type, status, and region.'

useSeo({ title: seoTitle, description: seoDescription })
useWebPageSchema({ name: seoTitle, description: seoDescription, type: 'CollectionPage' })

const route = useRoute()

const initialFilters = {
  berryType: (route.query.berryType as string) || undefined,
  status: (route.query.status as string) || undefined,
  state: (route.query.state as string) || undefined,
}

const { locations, total, totalPages, filters, status, setPage, updateFilters, resetFilters } = useLocations(initialFilters)

function onFilterUpdate(newFilters: Record<string, string | undefined>) {
  updateFilters(newFilters)
}

function onReset() {
  resetFilters()
}

const pages = computed(() => {
  const items: { label: string; click?: () => void; active?: boolean; disabled?: boolean }[] = []
  for (let i = 1; i <= totalPages.value; i++) {
    items.push({
      label: String(i),
      click: () => setPage(i),
      active: i === (filters.page ?? 1),
    })
  }
  return items
})
</script>

<template>
  <UPage>
    <UPageHero
      title="Explore Farms"
      :description="`${total} berry picking locations found across Texas.`"
      :ui="{ title: 'text-3xl sm:text-4xl', description: 'text-lg text-muted' }"
    />

    <!-- Filters -->
    <div class="mb-6">
      <LocationFilters :model-value="filters" @update:model-value="onFilterUpdate" @reset="onReset" />
    </div>

    <!-- Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Location List -->
      <div class="lg:col-span-2 space-y-4">
        <div v-if="status === 'pending'" class="text-center py-12">
          <UIcon name="i-lucide-loader-2" class="animate-spin text-2xl text-muted" />
          <p class="text-muted mt-2">Loading farms…</p>
        </div>

        <div v-else-if="locations.length === 0" class="text-center py-12">
          <UIcon name="i-lucide-search-x" class="text-4xl text-dimmed" />
          <p class="text-muted mt-2">No farms match your filters.</p>
          <UButton color="primary" variant="ghost" label="Clear Filters" class="mt-4" @click="onReset" />
        </div>

        <template v-else>
          <LocationCard v-for="loc in locations" :key="loc.id" :location="loc" />
        </template>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center pt-4">
          <div class="flex gap-1">
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-chevron-left"
              :disabled="(filters.page ?? 1) <= 1"
              @click="setPage((filters.page ?? 1) - 1)"
            />
            <UButton
              v-for="p in pages"
              :key="p.label"
              :color="p.active ? 'primary' : 'neutral'"
              :variant="p.active ? 'solid' : 'ghost'"
              :label="p.label"
              @click="p.click?.()"
            />
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-chevron-right"
              :disabled="(filters.page ?? 1) >= totalPages"
              @click="setPage((filters.page ?? 1) + 1)"
            />
          </div>
        </div>
      </div>

      <!-- Map Placeholder -->
      <div class="hidden lg:block">
        <UCard :ui="{ root: 'h-full min-h-96' }">
          <div class="flex flex-col items-center justify-center h-full text-center py-12">
            <UIcon name="i-lucide-map" class="text-4xl text-dimmed mb-3" />
            <p class="text-sm text-muted">Interactive map coming soon</p>
            <p class="text-xs text-dimmed mt-1">
              {{ total }} locations in Texas
            </p>
          </div>
        </UCard>
      </div>
    </div>
  </UPage>
</template>
