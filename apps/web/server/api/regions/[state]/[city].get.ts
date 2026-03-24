import { and, eq, like, sql } from 'drizzle-orm'
import { useAppDatabase } from '#server/utils/database'
import { locations, seasonalOfferings } from '#server/database/app-schema'

/** Convert a kebab-case slug to a SQL LIKE pattern: "san-antonio" → "%san%antonio%" */
function citySlugToLike(slug: string): string {
  return `%${slug.replace(/-/g, '%')}%`
}

export default defineEventHandler(async (event) => {
  const state = getRouterParam(event, 'state')
  const city = getRouterParam(event, 'city')

  if (!state || !city) {
    throw createError({ statusCode: 400, message: 'Missing state or city parameter.' })
  }

  const db = useAppDatabase(event)

  const locationRows = await db
    .select()
    .from(locations)
    .where(
      and(
        eq(locations.state, state.toUpperCase()),
        like(locations.city, citySlugToLike(city)),
      ),
    )
    .all()

  const locationIds = locationRows.map((l) => l.id)
  if (locationIds.length === 0) {
    return {
      city,
      state,
      locations: [],
      summary: { totalLocations: 0, berryTypes: [], seasons: [] },
    }
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

  const berryTypes = [...new Set(offerings.map((o) => o.item))]
  const seasons = [
    ...new Set(
      offerings
        .filter((o) => o.seasonStart)
        .map((o) => `${o.seasonStart ?? ''}-${o.seasonEnd ?? ''}`),
    ),
  ]

  return {
    city,
    state,
    locations: locationRows.map((loc) => ({
      ...loc,
      seasonalOfferings: offeringsByLocation.get(loc.id) ?? [],
    })),
    summary: {
      totalLocations: locationRows.length,
      berryTypes,
      seasons,
    },
  }
})
