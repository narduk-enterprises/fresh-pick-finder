import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { definePublicMutation, withValidatedBody } from '#layer/server/utils/mutation'
import { useAppDatabase } from '#server/utils/database'
import {
  datasets,
  canonicalRows,
  analysisResults,
} from '#server/database/app-schema'

const bodySchema = z.object({
  datasetId: z.coerce.number().int().positive(),
  modules: z
    .array(
      z.enum([
        'season_scoring',
        'city_aggregation',
        'berry_type_aggregation',
        'missing_data',
      ]),
    )
    .min(1),
})

interface NormalizedData {
  name?: string
  city?: string
  state?: string
  lat?: number
  lng?: number
  type?: string
  seasonStart?: string
  seasonEnd?: string
  category?: string
  item?: string
  [key: string]: unknown
}

function runSeasonScoring(rows: NormalizedData[]) {
  const now = new Date()
  const currentMonth = now.getMonth() + 1

  return rows.map((row, index) => {
    const startMonth = row.seasonStart ? new Date(row.seasonStart).getMonth() + 1 : null
    const endMonth = row.seasonEnd ? new Date(row.seasonEnd).getMonth() + 1 : null

    let inSeason = false
    if (startMonth != null && endMonth != null) {
      inSeason =
        startMonth <= endMonth
          ? currentMonth >= startMonth && currentMonth <= endMonth
          : currentMonth >= startMonth || currentMonth <= endMonth
    }

    return { rowIndex: index, name: row.name ?? 'Unknown', inSeason }
  })
}

function runCityAggregation(rows: NormalizedData[]) {
  const cityMap = new Map<string, number>()
  for (const row of rows) {
    const city = (row.city as string) ?? 'Unknown'
    cityMap.set(city, (cityMap.get(city) ?? 0) + 1)
  }
  return [...cityMap.entries()].map(([city, count]) => ({ city, count }))
}

function runBerryTypeAggregation(rows: NormalizedData[]) {
  const typeMap = new Map<string, number>()
  for (const row of rows) {
    const item = (row.item as string) ?? (row.type as string) ?? 'Unknown'
    typeMap.set(item, (typeMap.get(item) ?? 0) + 1)
  }
  return [...typeMap.entries()].map(([berryType, count]) => ({ berryType, count }))
}

function runMissingData(rows: NormalizedData[]) {
  const requiredFields = ['name', 'city', 'lat', 'lng'] as const
  return rows
    .map((row, index) => {
      const missing = requiredFields.filter((f) => row[f] == null || row[f] === '')
      return missing.length > 0
        ? { rowIndex: index, name: row.name ?? 'Unknown', missingFields: missing }
        : null
    })
    .filter((r) => r !== null)
}

const MODULE_RUNNERS: Record<string, (rows: NormalizedData[]) => unknown> = {
  season_scoring: runSeasonScoring,
  city_aggregation: runCityAggregation,
  berry_type_aggregation: runBerryTypeAggregation,
  missing_data: runMissingData,
}

export default definePublicMutation(
  {
    parseBody: withValidatedBody((value) => bodySchema.parse(value)),
    rateLimit: { namespace: 'analysis-run', maxRequests: 20, windowMs: 60_000 },
  },
  async ({ body, event }) => {
    const db = useAppDatabase(event)

    const dataset = await db
      .select()
      .from(datasets)
      .where(eq(datasets.id, body.datasetId))
      .get()
    if (!dataset) {
      throw createError({ statusCode: 404, message: 'Dataset not found.' })
    }

    const rows = await db
      .select()
      .from(canonicalRows)
      .where(eq(canonicalRows.datasetId, body.datasetId))
      .all()

    const parsedRows: NormalizedData[] = rows.map((r) => JSON.parse(r.normalizedJson))

    const results = []
    for (const moduleName of body.modules) {
      const runner = MODULE_RUNNERS[moduleName]
      if (!runner) continue

      const result = runner(parsedRows)
      const inserted = await db
        .insert(analysisResults)
        .values({
          datasetId: body.datasetId,
          type: moduleName,
          resultJson: JSON.stringify(result),
        })
        .returning()
        .get()

      results.push({
        id: inserted.id,
        type: moduleName,
        result,
      })
    }

    return {
      datasetId: body.datasetId,
      analyses: results,
    }
  },
)
