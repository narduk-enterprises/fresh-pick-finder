import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import {
  defineAdminMutation,
  withValidatedBody,
} from '#layer/server/utils/mutation'
import { useAppDatabase } from '#server/utils/database'
import {
  analysisResults,
  canonicalRows,
  datasets,
} from '#server/database/app-schema'

const bodySchema = z.object({
  type: z.enum([
    'city-aggregation',
    'berry-aggregation',
    'season-scoring',
    'missing-data',
  ]),
})

// ─── Analysis runners ────────────────────────────────────────
interface CanonicalData {
  name?: string
  city?: string
  state?: string
  slug?: string
  [key: string]: unknown
}

interface CanonicalRowEntry {
  normalizedJson: string
  qualityScore: number | null
  missingFields: string | null
}

function runCityAggregation(rows: CanonicalRowEntry[]) {
  const cities = new Map<string, number>()
  for (const row of rows) {
    const data = JSON.parse(row.normalizedJson) as CanonicalData
    const key = data.city && data.state ? `${data.city}, ${data.state}` : null
    if (key) cities.set(key, (cities.get(key) ?? 0) + 1)
  }
  return Object.fromEntries([...cities.entries()].sort((a, b) => b[1] - a[1]))
}

function runBerryAggregation(rows: CanonicalRowEntry[]) {
  const types = new Map<string, number>()
  for (const row of rows) {
    const data = JSON.parse(row.normalizedJson) as CanonicalData
    const type = typeof data.type === 'string' ? data.type : 'unknown'
    types.set(type, (types.get(type) ?? 0) + 1)
  }
  return Object.fromEntries([...types.entries()].sort((a, b) => b[1] - a[1]))
}

function runSeasonScoring(rows: CanonicalRowEntry[]) {
  const scores = rows.map((row) => row.qualityScore ?? 0)
  const total = scores.reduce((sum, s) => sum + s, 0)
  return {
    averageQuality: scores.length > 0 ? Math.round(total / scores.length) : 0,
    totalRows: rows.length,
    highQuality: scores.filter((s) => s >= 75).length,
    mediumQuality: scores.filter((s) => s >= 50 && s < 75).length,
    lowQuality: scores.filter((s) => s < 50).length,
  }
}

function runMissingData(rows: CanonicalRowEntry[]) {
  const fieldCounts = new Map<string, number>()
  let rowsWithMissing = 0
  for (const row of rows) {
    if (row.missingFields) {
      rowsWithMissing++
      for (const field of row.missingFields.split(',')) {
        const trimmed = field.trim()
        if (trimmed) fieldCounts.set(trimmed, (fieldCounts.get(trimmed) ?? 0) + 1)
      }
    }
  }
  return {
    totalRows: rows.length,
    rowsWithMissingFields: rowsWithMissing,
    missingFieldBreakdown: Object.fromEntries(
      [...fieldCounts.entries()].sort((a, b) => b[1] - a[1]),
    ),
  }
}

// ─── Handler ─────────────────────────────────────────────────
export default defineAdminMutation(
  {
    rateLimit: { namespace: 'analysis-run', maxRequests: 10, windowMs: 60_000 },
    parseBody: withValidatedBody(bodySchema.parse),
  },
  async ({ event, body }) => {
    const datasetId = Number(getRouterParam(event, 'datasetId'))
    if (!datasetId || Number.isNaN(datasetId)) {
      throw createError({ statusCode: 400, message: 'Invalid dataset ID.' })
    }

    const db = useAppDatabase(event)

    // Verify dataset exists
    const dataset = await db
      .select()
      .from(datasets)
      .where(eq(datasets.id, datasetId))
      .get()

    if (!dataset) {
      throw createError({ statusCode: 404, message: 'Dataset not found.' })
    }

    // Fetch canonical rows
    const rows = await db
      .select()
      .from(canonicalRows)
      .where(eq(canonicalRows.datasetId, datasetId))
      .all()

    // Run the requested analysis
    let resultJson: unknown
    switch (body.type) {
      case 'city-aggregation':
        resultJson = runCityAggregation(rows)
        break
      case 'berry-aggregation':
        resultJson = runBerryAggregation(rows)
        break
      case 'season-scoring':
        resultJson = runSeasonScoring(rows)
        break
      case 'missing-data':
        resultJson = runMissingData(rows)
        break
    }

    // Store the result
    const result = await db
      .insert(analysisResults)
      .values({
        datasetId,
        type: body.type,
        resultJson: JSON.stringify(resultJson),
      })
      .returning()
      .get()

    return {
      ...result,
      resultJson,
    }
  },
)
