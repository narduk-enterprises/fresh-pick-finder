import { and, eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { useAppDatabase } from '#server/utils/database'
import { locations, seasonalOfferings } from '#server/database/app-schema'

const querySchema = z.object({
  state: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const type = getRouterParam(event, 'type')
  if (!type) {
    throw createError({ statusCode: 400, message: 'Missing berry type parameter.' })
  }

  const query = await getValidatedQuery(event, (v) => querySchema.safeParse(v))
  if (!query.success) {
    throw createError({ statusCode: 400, message: 'Invalid query parameters.' })
  }

  const { state } = query.data
  const db = useAppDatabase(event)

  // Find offerings matching this berry type
  const matchingOfferings = await db
    .select()
    .from(seasonalOfferings)
    .where(eq(seasonalOfferings.item, type))
    .all()

  const locationIds = [...new Set(matchingOfferings.map((o) => o.locationId))]
  if (locationIds.length === 0) {
    return { berryType: type, locations: [] }
  }

  // Fetch matching locations, optionally filtered by state
  const locationConditions = [
    sql`${locations.id} IN (${sql.join(
      locationIds.map((id) => sql`${id}`),
      sql`, `,
    )})`,
  ]
  if (state) locationConditions.push(eq(locations.state, state))

  const locationRows = await db
    .select()
    .from(locations)
    .where(and(...locationConditions))
    .all()

  // Attach the matching offerings to each location
  const offeringsByLocation = new Map<number, typeof matchingOfferings>()
  for (const o of matchingOfferings) {
    const arr = offeringsByLocation.get(o.locationId) ?? []
    arr.push(o)
    offeringsByLocation.set(o.locationId, arr)
  }

  return {
    berryType: type,
    locations: locationRows.map((loc) => ({
      ...loc,
      seasonalOfferings: offeringsByLocation.get(loc.id) ?? [],
    })),
  }
})
