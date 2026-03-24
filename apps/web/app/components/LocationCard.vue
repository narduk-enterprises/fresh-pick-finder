<script setup lang="ts">
import type { LocationWithDetails } from '~/types/locations'

defineProps<{
  location: LocationWithDetails
}>()

const { getStatusBadge } = useSeasonScoring()
</script>

<template>
  <UCard
    :ui="{ root: 'hover:ring-2 hover:ring-primary transition-shadow' }"
  >
    <div class="space-y-3">
      <div class="flex items-start justify-between gap-2">
        <NuxtLink :to="`/farms/${location.slug}`" class="group flex-1 min-w-0">
          <h3 class="text-base font-semibold text-default group-hover:text-primary truncate">
            {{ location.name }}
          </h3>
          <p class="text-sm text-muted mt-0.5">
            {{ location.city }}, {{ location.state }}
          </p>
        </NuxtLink>
        <UBadge
          v-if="location.type"
          color="neutral"
          variant="outline"
          :label="location.type"
          size="sm"
        />
      </div>

      <p v-if="location.description" class="text-sm text-dimmed line-clamp-2">
        {{ location.description }}
      </p>

      <div v-if="location.seasonalOfferings?.length" class="flex flex-wrap gap-1.5">
        <BerryTypeBadge
          v-for="offering in location.seasonalOfferings.slice(0, 4)"
          :key="offering.id"
          :berry-type="offering.item"
        />
        <UBadge
          v-if="location.seasonalOfferings.length > 4"
          color="neutral"
          variant="subtle"
          :label="`+${location.seasonalOfferings.length - 4}`"
        />
      </div>

      <div class="flex items-center justify-between pt-1">
        <div class="flex flex-wrap gap-1.5">
          <template v-for="offering in location.seasonalOfferings?.slice(0, 2)" :key="`status-${offering.id}`">
            <UBadge
              v-if="offering.status && offering.status !== 'unknown'"
              :color="(getStatusBadge(offering.status).color as any)"
              variant="subtle"
              :label="`${offering.item}: ${getStatusBadge(offering.status).label}`"
              size="sm"
            />
          </template>
        </div>
        <UButton
          :to="`/farms/${location.slug}`"
          color="primary"
          variant="ghost"
          label="View"
          icon="i-lucide-arrow-right"
          trailing
          size="sm"
        />
      </div>
    </div>
  </UCard>
</template>
