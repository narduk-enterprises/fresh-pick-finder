<script setup lang="ts">
import { BERRY_TYPES, STATUS_OPTIONS } from '~/types/locations'
import type { LocationFilters } from '~/types/locations'

const props = defineProps<{
  modelValue: LocationFilters
}>()

const emit = defineEmits<{
  'update:modelValue': [filters: Partial<LocationFilters>]
  reset: []
}>()

const berryOptions = [{ value: '', label: 'All Berries' }, ...BERRY_TYPES.map(b => ({ value: b.value, label: b.label }))]
const statusOptions = [{ value: '', label: 'Any Status' }, ...STATUS_OPTIONS.map(s => ({ value: s.value, label: s.label }))]

const selectedBerry = computed({
  get: () => props.modelValue.berryType ?? '',
  set: (val: string) => emit('update:modelValue', { berryType: val || undefined }),
})

const selectedStatus = computed({
  get: () => props.modelValue.status ?? '',
  set: (val: string) => emit('update:modelValue', { status: val || undefined }),
})
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <USelect
      v-model="selectedBerry"
      :items="berryOptions"
      value-key="value"
      label-key="label"
      placeholder="All Berries"
      icon="i-lucide-cherry"
      class="w-44"
    />
    <USelect
      v-model="selectedStatus"
      :items="statusOptions"
      value-key="value"
      label-key="label"
      placeholder="Any Status"
      icon="i-lucide-calendar"
      class="w-44"
    />
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-rotate-ccw"
      label="Reset"
      @click="emit('reset')"
    />
  </div>
</template>
