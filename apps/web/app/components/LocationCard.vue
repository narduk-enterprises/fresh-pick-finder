<script setup lang="ts">
import type { LocationItem } from '~/composables/useLocations'
import { getSeasonalInfo } from '~/composables/useSeasonalStatus'

const props = defineProps<{
  location: LocationItem
}>()

const seasonalStatus = computed(() => {
  const first = props.location.seasonalOfferings?.[0]
  if (!first) return getSeasonalInfo()
  return getSeasonalInfo(
    first.seasonStart ?? undefined,
    first.seasonEnd ?? undefined,
    first.status,
  )
})

const uniqueItems = computed(() => {
  const items = props.location.seasonalOfferings ?? []
  return [...new Set(items.map(o => o.item))]
})

const typeLabel = computed(() => {
  const t = props.location.type
  return t.charAt(0).toUpperCase() + t.slice(1)
})
</script>

<template>
  <UCard class="h-full">
    <div class="flex flex-col gap-3">
      <div class="flex items-start justify-between gap-2">
        <NuxtLink
          :to="`/farms/${location.slug}`"
          class="text-lg font-semibold text-default hover:text-primary transition-colors"
        >
          {{ location.name }}
        </NuxtLink>
        <UBadge
          :color="seasonalStatus.color as any"
          variant="subtle"
          size="sm"
          :icon="seasonalStatus.icon"
          :label="seasonalStatus.label"
        />
      </div>

      <div class="flex items-center gap-1.5 text-sm text-muted">
        <UIcon name="i-lucide-map-pin" class="size-4 shrink-0" />
        <span>{{ location.city }}, {{ location.state }}</span>
      </div>

      <div class="flex flex-wrap gap-1.5">
        <UBadge color="neutral" variant="outline" size="xs" :label="typeLabel" />
        <UBadge
          v-for="item in uniqueItems"
          :key="item"
          color="primary"
          variant="subtle"
          size="xs"
          :label="item"
        />
      </div>
    </div>
  </UCard>
</template>
