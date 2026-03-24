import type { ComputedRef } from 'vue'

export interface SeasonalInfo {
  isInSeason: boolean
  label: string
  color: string
  icon: string
}

const OPEN: SeasonalInfo = {
  isInSeason: true,
  label: 'Open Now',
  color: 'success',
  icon: 'i-lucide-circle-check',
}
const COMING_SOON: SeasonalInfo = {
  isInSeason: false,
  label: 'Coming Soon',
  color: 'warning',
  icon: 'i-lucide-clock',
}
const CLOSED: SeasonalInfo = {
  isInSeason: false,
  label: 'Closed',
  color: 'error',
  icon: 'i-lucide-circle-x',
}
const CLOSED_FOR_SEASON: SeasonalInfo = {
  isInSeason: false,
  label: 'Closed for Season',
  color: 'error',
  icon: 'i-lucide-circle-x',
}
const UNKNOWN: SeasonalInfo = {
  isInSeason: false,
  label: 'Unknown',
  color: 'neutral',
  icon: 'i-lucide-help-circle',
}

/** Pure function for computing seasonal status without reactivity. */
export function getSeasonalInfo(
  seasonStart?: string,
  seasonEnd?: string,
  status?: string,
): SeasonalInfo {
  if (status === 'open') return OPEN
  if (status === 'upcoming') return COMING_SOON
  if (status === 'closed') return CLOSED
  if (status === 'unknown') return UNKNOWN

  if (seasonStart && seasonEnd) {
    const currentMonth = new Date().getMonth() + 1
    const start = Number.parseInt(seasonStart, 10)
    const end = Number.parseInt(seasonEnd, 10)

    const isInRange = start <= end
      ? currentMonth >= start && currentMonth <= end
      : currentMonth >= start || currentMonth <= end

    if (isInRange) return OPEN

    const oneMonthBefore = start === 1 ? 12 : start - 1
    if (currentMonth === oneMonthBefore) return COMING_SOON

    return CLOSED_FOR_SEASON
  }

  return UNKNOWN
}

/** Reactive composable returning a computed SeasonalInfo. */
export function useSeasonalStatus(
  seasonStart?: string,
  seasonEnd?: string,
  status?: string,
): ComputedRef<SeasonalInfo> {
  return computed(() => getSeasonalInfo(seasonStart, seasonEnd, status))
}
