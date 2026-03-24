import { and, eq, inArray, like, sql, desc } from 'drizzle-orm'
import { z } from 'zod'
import { useAppDatabase } from '#server/utils/database'
import { locations, seasonalOfferings } from '#server/database/app-schema'

const querySchema = z.object({
  city: z.string().optional(),
  state: z.string().default('TX'),
  type: z.enum(['farm', 'orchard', 'garden', 'ranch']).optional(),
  category: z.string().optional(),
  item: z.string().optional(),
  status: z.enum(['open', 'closed', 'upcoming']).optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (value) => querySchema.safeParse(value))
  if (!query.success) {
    throw createError({ statusCode: 400, message: 'Invalid query parameters.' })
  }

  const { city, state, type, category, item, status, lat, lng, page, limit } = query.data
  const offset = (page - 1) * limit
  const db = useAppDatabase(event)

  const conditions = [eq(locations.state, state)]
  if (city) conditions.push(like(locations.city, city))
  if (type) conditions.push(eq(locations.type, type))

  // When filtering by offering fields, find matching location IDs first
  let offeringLocationIds: number[] | undefined
  if (category || item || status) {
    const offeringConditions = []
    if (category) offeringConditions.push(eq(seasonalOfferings.category, category))
    if (item) offeringConditions.push(eq(seasonalOfferings.item, item))
    if (status) offeringConditions.push(eq(seasonalOfferings.status, status))

    const matchingOfferings = await db
      .select({ locationId: seasonalOfferings.locationId })
      .from(seasonalOfferings)
      .where(and(...offeringConditions))
      .all()

    offeringLocationIds = [...new Set(matchingOfferings.map((o) => o.locationId))]
    if (offeringLocationIds.length === 0) {
      return { locations: [], total: 0, page, limit }
    }
    conditions.push(inArray(locations.id, offeringLocationIds))
  }

  const whereClause = and(...conditions)

  const [totalResult, locationRows] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(locations).where(whereClause).get(),
    db
      .select()
      .from(locations)
      .where(whereClause)
      .orderBy(
        lat != null && lng != null
          ? sql`(${locations.lat} - ${lat}) * (${locations.lat} - ${lat}) + (${locations.lng} - ${lng}) * (${locations.lng} - ${lng})`
          : desc(locations.createdAt),
      )
      .limit(limit)
      .offset(offset)
      .all(),
  ])

  const total = Number(totalResult?.count || 0)
  if (locationRows.length === 0) {
    return { locations: [], total, page, limit }
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
    locations: locationRows.map((l) => ({
      ...l,
      seasonalOfferings: offeringsByLocation.get(l.id) ?? [],
    })),
    total,
    page,
    limit,
  }
})
