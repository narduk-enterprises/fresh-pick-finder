/**
 * Seasonal scoring helpers for determining berry availability.
 * Pure functions — no side effects, Cloudflare Workers safe.
 */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const

export function useSeasonScoring() {
  const currentMonth = computed(() => {
    const now = new Date()
    return String(now.getMonth() + 1).padStart(2, '0')
  })

  function isInSeason(seasonStart?: string | null, seasonEnd?: string | null): boolean {
    if (!seasonStart || !seasonEnd) return false
    const month = currentMonth.value
    if (seasonStart <= seasonEnd) {
      return month >= seasonStart && month <= seasonEnd
    }
    return month >= seasonStart || month <= seasonEnd
  }

  function getSeasonLabel(seasonStart?: string | null, seasonEnd?: string | null): string {
    if (!seasonStart || !seasonEnd) return 'Season unknown'
    const startIdx = Number.parseInt(seasonStart, 10) - 1
    const endIdx = Number.parseInt(seasonEnd, 10) - 1
    if (startIdx < 0 || startIdx > 11 || endIdx < 0 || endIdx > 11) return 'Season unknown'
    return `${MONTH_NAMES[startIdx]} – ${MONTH_NAMES[endIdx]}`
  }

  function getStatusBadge(status: string): { label: string; color: string } {
    switch (status) {
      case 'open':
        return { label: 'Open Now', color: 'success' }
      case 'upcoming':
        return { label: 'Coming Soon', color: 'info' }
      case 'closed':
        return { label: 'Closed', color: 'error' }
      default:
        return { label: 'Unknown', color: 'neutral' }
    }
  }

  return {
    currentMonth,
    isInSeason,
    getSeasonLabel,
    getStatusBadge,
  }
}
