import { z } from 'zod'
import { sql } from 'drizzle-orm'
import { useAppDatabase } from '#server/utils/database'
import { locations, seasonalOfferings } from '#server/database/app-schema'

const querySchema = z.object({
  q: z.string().min(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
})

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (v) => querySchema.safeParse(v))
  if (!query.success) {
    throw createError({ statusCode: 400, message: 'Missing or invalid search query.' })
  }

  const { q, limit } = query.data
  const db = useAppDatabase(event)
  const pattern = `%${q}%`

  const results = await db
    .select()
    .from(locations)
    .where(
      sql`${locations.name} LIKE ${pattern} OR ${locations.city} LIKE ${pattern} OR ${locations.description} LIKE ${pattern}`,
    )
    .limit(limit)
    .all()

  // Fetch offerings for matched locations
  const locationIds = results.map((l) => l.id)
  if (locationIds.length === 0) {
    return { locations: [] }
  }

  const offerings = await db
    .select()
    .from(seasonalOfferings)
    .where(
      sql`${seasonalOfferings.locationId} IN (${sql.join(
        locationIds.map((id) => sql`${id}`),
        sql`, `,
      )})`,
    )
    .all()

  const offeringsByLocation = new Map<number, typeof offerings>()
  for (const o of offerings) {
    const arr = offeringsByLocation.get(o.locationId) ?? []
    arr.push(o)
    offeringsByLocation.set(o.locationId, arr)
  }

  return {
    locations: results.map((loc) => ({
      ...loc,
      seasonalOfferings: offeringsByLocation.get(loc.id) ?? [],
    })),
  }
})
