export interface BerryType {
  id: string
  name: string
  emoji: string
  icon: string
  color: string
  seasonDescription: string
}

const berryTypes: BerryType[] = [
  {
    id: 'strawberry',
    name: 'Strawberry',
    emoji: '🍓',
    icon: 'i-lucide-cherry',
    color: 'red',
    seasonDescription: 'March – May',
  },
  {
    id: 'blueberry',
    name: 'Blueberry',
    emoji: '🫐',
    icon: 'i-lucide-grape',
    color: 'blue',
    seasonDescription: 'May – July',
  },
  {
    id: 'blackberry',
    name: 'Blackberry',
    emoji: '🫐',
    icon: 'i-lucide-grape',
    color: 'violet',
    seasonDescription: 'May – June',
  },
  {
    id: 'raspberry',
    name: 'Raspberry',
    emoji: '🍇',
    icon: 'i-lucide-cherry',
    color: 'pink',
    seasonDescription: 'June – July',
  },
  {
    id: 'dewberry',
    name: 'Dewberry',
    emoji: '🫐',
    icon: 'i-lucide-grape',
    color: 'purple',
    seasonDescription: 'April – May',
  },
]

export function useBerryTypes() {
  function getBerryType(id: string): BerryType | undefined {
    return berryTypes.find(b => b.id === id)
  }

  return { berryTypes, getBerryType }
}
