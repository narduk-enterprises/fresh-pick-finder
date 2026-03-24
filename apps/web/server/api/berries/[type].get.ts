import { and, eq, inArray, sql, desc } from 'drizzle-orm'
import { z } from 'zod'
import { useAppDatabase } from '#server/utils/database'
import { locations, seasonalOfferings } from '#server/database/app-schema'

const querySchema = z.object({
  state: z.string().optional(),
  city: z.string().optional(),
  status: z.enum(['open', 'closed', 'upcoming']).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

export default defineEventHandler(async (event) => {
  const berryType = getRouterParam(event, 'type')
  if (!berryType) {
    throw createError({ statusCode: 400, message: 'Missing berry type parameter.' })
  }

  const query = await getValidatedQuery(event, (value) => querySchema.safeParse(value))
  if (!query.success) {
    throw createError({ statusCode: 400, message: 'Invalid query parameters.' })
  }

  const { state, city, status, page, limit } = query.data
  const offset = (page - 1) * limit
  const db = useAppDatabase(event)

  // Find locations offering this berry type
  const offeringConditions = [
    eq(seasonalOfferings.category, 'berry'),
    eq(seasonalOfferings.item, decodeURIComponent(berryType)),
  ]
  if (status) offeringConditions.push(eq(seasonalOfferings.status, status))

  const matchingOfferings = await db
    .select({ locationId: seasonalOfferings.locationId })
    .from(seasonalOfferings)
    .where(and(...offeringConditions))
    .all()

  const offeringLocationIds = [...new Set(matchingOfferings.map((o) => o.locationId))]
  if (offeringLocationIds.length === 0) {
    return { berryType, locations: [], total: 0, page, limit }
  }

  const locationConditions = [inArray(locations.id, offeringLocationIds)]
  if (state) locationConditions.push(eq(locations.state, state))
  if (city) locationConditions.push(eq(locations.city, city))
  const locationWhere = and(...locationConditions)

  const [totalResult, locationRows] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(locations).where(locationWhere).get(),
    db
      .select()
      .from(locations)
      .where(locationWhere)
      .orderBy(desc(locations.createdAt))
      .limit(limit)
      .offset(offset)
      .all(),
  ])

  const total = Number(totalResult?.count || 0)
  if (locationRows.length === 0) {
    return { berryType, locations: [], total, page, limit }
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
    berryType,
    locations: locationRows.map((l) => ({
      ...l,
      seasonalOfferings: offeringsByLocation.get(l.id) ?? [],
    })),
    total,
    page,
    limit,
  }
})
