<script setup lang="ts">
import { BERRY_TYPES } from '~/types/locations'

const props = defineProps<{
  berryType: string
}>()

const berry = computed(
  () => BERRY_TYPES.find(b => b.value === props.berryType) ?? { label: props.berryType, icon: 'i-lucide-leaf', color: 'neutral' },
)
</script>

<template>
  <UBadge :color="(berry.color as any)" variant="subtle" :icon="berry.icon" :label="berry.label" />
</template>
