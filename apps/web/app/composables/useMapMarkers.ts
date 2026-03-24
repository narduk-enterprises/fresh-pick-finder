import type { Ref } from 'vue'
import type { LocationItem } from './useLocations'

export interface MapMarker {
  id: number
  lat: number
  lng: number
  title: string
  slug: string
  type: string
  city: string
  state: string
  isInSeason: boolean
}

export interface MapBounds {
  minLat: number
  maxLat: number
  minLng: number
  maxLng: number
}

export function useMapMarkers(locations: Ref<LocationItem[] | null | undefined>) {
  const markers = computed<MapMarker[]>(() => {
    const items = locations.value
    if (!items) return []

    return items
      .filter((loc): loc is LocationItem & { lat: number, lng: number } =>
        loc.lat != null && loc.lng != null,
      )
      .map(loc => ({
        id: loc.id,
        lat: loc.lat,
        lng: loc.lng,
        title: loc.name,
        slug: loc.slug,
        type: loc.type,
        city: loc.city,
        state: loc.state,
        isInSeason: loc.seasonalOfferings?.some(o => o.status === 'open') ?? false,
      }))
  })

  const bounds = computed<MapBounds | null>(() => {
    if (markers.value.length === 0) return null

    let minLat = Infinity
    let maxLat = -Infinity
    let minLng = Infinity
    let maxLng = -Infinity

    for (const m of markers.value) {
      if (m.lat < minLat) minLat = m.lat
      if (m.lat > maxLat) maxLat = m.lat
      if (m.lng < minLng) minLng = m.lng
      if (m.lng > maxLng) maxLng = m.lng
    }

    return { minLat, maxLat, minLng, maxLng }
  })

  return { markers, bounds }
}
