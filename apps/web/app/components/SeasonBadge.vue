<script setup lang="ts">
const props = defineProps<{
  status: string
}>()

const { getStatusBadge } = useSeasonScoring()
const badge = computed(() => getStatusBadge(props.status))
</script>

<template>
  <UBadge :color="(badge.color as any)" variant="subtle" :label="badge.label" />
</template>
