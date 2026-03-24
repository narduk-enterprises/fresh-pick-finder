import { and, eq, inArray, like, sql } from 'drizzle-orm'
import { z } from 'zod'
import { useAppDatabase } from '#server/utils/database'
import { locations, seasonalOfferings } from '#server/database/app-schema'

const querySchema = z.object({
  category: z.string().optional(),
  item: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const state = getRouterParam(event, 'state')
  const city = getRouterParam(event, 'city')
  if (!state || !city) {
    throw createError({ statusCode: 400, message: 'Missing state or city parameter.' })
  }

  const query = await getValidatedQuery(event, (value) => querySchema.safeParse(value))
  if (!query.success) {
    throw createError({ statusCode: 400, message: 'Invalid query parameters.' })
  }

  const { category, item } = query.data
  const db = useAppDatabase(event)
  const decodedCity = decodeURIComponent(city)
  const decodedState = decodeURIComponent(state).toUpperCase()

  const conditions = [
    like(locations.city, decodedCity),
    eq(locations.state, decodedState),
  ]

  // Filter by offering fields if provided
  let offeringLocationIds: number[] | undefined
  if (category || item) {
    const offeringConditions = []
    if (category) offeringConditions.push(eq(seasonalOfferings.category, category))
    if (item) offeringConditions.push(eq(seasonalOfferings.item, item))

    const matchingOfferings = await db
      .select({ locationId: seasonalOfferings.locationId })
      .from(seasonalOfferings)
      .where(and(...offeringConditions))
      .all()

    offeringLocationIds = [...new Set(matchingOfferings.map((o) => o.locationId))]
    if (offeringLocationIds.length === 0) {
      return { city: decodedCity, state: decodedState, locations: [], total: 0 }
    }
    conditions.push(inArray(locations.id, offeringLocationIds))
  }

  const whereClause = and(...conditions)

  const locationRows = await db.select().from(locations).where(whereClause).all()

  if (locationRows.length === 0) {
    return { city: decodedCity, state: decodedState, locations: [], total: 0 }
  }

  const locationIds = locationRows.map((l) => l.id)
  const offerings = await db
    .select()
    .from(seasonalOfferings)
    .where(inArray(seasonalOfferings.locationId, locationIds))
    .all()

  const offeringsByLocation = new Map<number, typeof offerings>()
  for (const o of offerings) {
    const arr = offeringsByLocation.get(o.locationId) ?? []
    arr.push(o)
    offeringsByLocation.set(o.locationId, arr)
  }

  return {
    city: decodedCity,
    state: decodedState,
    locations: locationRows.map((l) => ({
      ...l,
      seasonalOfferings: offeringsByLocation.get(l.id) ?? [],
    })),
    total: locationRows.length,
  }
})
