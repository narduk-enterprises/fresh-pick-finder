import { and, eq, like, sql, desc } from 'drizzle-orm'
import { z } from 'zod'
import { useAppDatabase } from '#server/utils/database'
import {
  locations,
  seasonalOfferings,
  locationMetadata,
} from '#server/database/app-schema'

const querySchema = z.object({
  city: z.string().optional(),
  state: z.string().optional(),
  berryType: z.string().optional(),
  status: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (v) => querySchema.safeParse(v))
  if (!query.success) {
    throw createError({ statusCode: 400, message: 'Invalid query parameters.' })
  }

  const { city, state, berryType, status, page, limit } = query.data
  const offset = (page - 1) * limit
  const db = useAppDatabase(event)

  const conditions = []
  if (city) conditions.push(like(locations.city, `%${city}%`))
  if (state) conditions.push(eq(locations.state, state))

  // When filtering by berryType or status, find matching location IDs first
  let locationIdFilter: number[] | undefined
  if (berryType || status) {
    const offeringConditions = []
    if (berryType) offeringConditions.push(eq(seasonalOfferings.item, berryType))
    if (status) offeringConditions.push(eq(seasonalOfferings.status, status))

    const matchingOfferings = await db
      .select({ locationId: seasonalOfferings.locationId })
      .from(seasonalOfferings)
      .where(and(...offeringConditions))
      .all()

    locationIdFilter = [...new Set(matchingOfferings.map((o) => o.locationId))]
    if (locationIdFilter.length === 0) {
      return { locations: [], total: 0, page, limit }
    }
  }

  // Build the where clause for locations
  const whereClause =
    conditions.length > 0 || locationIdFilter
      ? and(
          ...conditions,
          ...(locationIdFilter
            ? [
                sql`${locations.id} IN (${sql.join(
                  locationIdFilter.map((id) => sql`${id}`),
                  sql`, `,
                )})`,
              ]
            : []),
        )
      : undefined

  const [totalResult, locationRows] = await Promise.all([
    db
      .select({ count: sql<number>`count(*)` })
      .from(locations)
      .where(whereClause)
      .get(),
    db
      .select()
      .from(locations)
      .where(whereClause)
      .orderBy(desc(locations.createdAt))
      .limit(limit)
      .offset(offset)
      .all(),
  ])

  // Fetch offerings and metadata for returned locations
  const locationIds = locationRows.map((l) => l.id)
  if (locationIds.length === 0) {
    return { locations: [], total: 0, page, limit }
  }

  const [offerings, metadata] = await Promise.all([
    db
      .select()
      .from(seasonalOfferings)
      .where(
        sql`${seasonalOfferings.locationId} IN (${sql.join(
          locationIds.map((id) => sql`${id}`),
          sql`, `,
        )})`,
      )
      .all(),
    db
      .select()
      .from(locationMetadata)
      .where(
        sql`${locationMetadata.locationId} IN (${sql.join(
          locationIds.map((id) => sql`${id}`),
          sql`, `,
        )})`,
      )
      .all(),
  ])

  const offeringsByLocation = new Map<number, typeof offerings>()
  for (const o of offerings) {
    const arr = offeringsByLocation.get(o.locationId) ?? []
    arr.push(o)
    offeringsByLocation.set(o.locationId, arr)
  }

  const metadataByLocation = new Map<number, (typeof metadata)[number]>()
  for (const m of metadata) {
    metadataByLocation.set(m.locationId, m)
  }

  const enrichedLocations = locationRows.map((loc) => ({
    ...loc,
    seasonalOfferings: offeringsByLocation.get(loc.id) ?? [],
    metadata: metadataByLocation.get(loc.id) ?? null,
  }))

  return {
    locations: enrichedLocations,
    total: Number(totalResult?.count ?? 0),
    page,
    limit,
  }
})
