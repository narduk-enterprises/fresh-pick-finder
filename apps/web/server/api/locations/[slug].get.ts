import { eq, inArray } from 'drizzle-orm'
import { useAppDatabase } from '#server/utils/database'
import { locations, seasonalOfferings, locationMetadata } from '#server/database/app-schema'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Missing slug parameter.' })
  }

  const db = useAppDatabase(event)

  const location = await db.select().from(locations).where(eq(locations.slug, slug)).get()
  if (!location) {
    throw createError({ statusCode: 404, message: 'Location not found.' })
  }

  const [offerings, metadata] = await Promise.all([
    db
      .select()
      .from(seasonalOfferings)
      .where(eq(seasonalOfferings.locationId, location.id))
      .all(),
    db
      .select()
      .from(locationMetadata)
      .where(eq(locationMetadata.locationId, location.id))
      .get(),
  ])

  return {
    ...location,
    seasonalOfferings: offerings,
    metadata: metadata ?? null,
  }
})
