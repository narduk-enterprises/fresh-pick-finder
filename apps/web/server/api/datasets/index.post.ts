import { eq } from 'drizzle-orm'
import { z } from 'zod'
import {
  defineAdminMutation,
  withValidatedBody,
} from '#layer/server/utils/mutation'
import { useAppDatabase } from '#server/utils/database'
import {
  datasets,
  datasetRows,
  canonicalRows,
} from '#server/database/app-schema'

// ─── Field mapping for normalization ──────────────────────────
const FIELD_MAP: Record<string, string> = {
  'farm name': 'name',
  'farm_name': 'name',
  'name': 'name',
  'city': 'city',
  'town': 'city',
  'state': 'state',
  'province': 'state',
  'zip': 'postalCode',
  'zip_code': 'postalCode',
  'zipcode': 'postalCode',
  'postal_code': 'postalCode',
  'postal code': 'postalCode',
  'address': 'address',
  'street': 'address',
  'phone': 'phone',
  'telephone': 'phone',
  'website': 'website',
  'url': 'website',
  'description': 'description',
  'type': 'type',
  'latitude': 'lat',
  'lat': 'lat',
  'longitude': 'lng',
  'lng': 'lng',
  'lon': 'lng',
}

const REQUIRED_FIELDS = ['name', 'city', 'state'] as const

function generateSlug(name: string, city: string): string {
  return `${name}-${city}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function normalizeRow(raw: Record<string, unknown>): {
  normalized: Record<string, unknown>
  qualityScore: number
  missingFields: string[]
} {
  const normalized: Record<string, unknown> = {}

  for (const [rawKey, value] of Object.entries(raw)) {
    const mapped = FIELD_MAP[rawKey.toLowerCase().trim()]
    if (mapped && value !== null && value !== undefined && value !== '') {
      normalized[mapped] = value
    }
  }

  // Generate slug if name and city are present
  if (typeof normalized.name === 'string' && typeof normalized.city === 'string') {
    normalized.slug = generateSlug(normalized.name, normalized.city)
  }

  // Calculate quality score based on filled fields
  const allFields = [
    'name',
    'city',
    'state',
    'postalCode',
    'address',
    'phone',
    'website',
    'description',
    'type',
    'lat',
    'lng',
  ]
  const filledCount = allFields.filter(
    (f) =>
      normalized[f] !== null &&
      normalized[f] !== undefined &&
      normalized[f] !== '',
  ).length
  const qualityScore = Math.round((filledCount / allFields.length) * 100)

  // Track missing required fields
  const missingFields = REQUIRED_FIELDS.filter(
    (f) =>
      normalized[f] === null ||
      normalized[f] === undefined ||
      normalized[f] === '',
  )

  return { normalized, qualityScore, missingFields }
}

// ─── Schema ──────────────────────────────────────────────────
const bodySchema = z.object({
  name: z.string().min(1),
  rows: z.array(z.record(z.unknown())).min(1),
})

// ─── Handler ─────────────────────────────────────────────────
export default defineAdminMutation(
  {
    rateLimit: { namespace: 'datasets-ingest', maxRequests: 10, windowMs: 60_000 },
    parseBody: withValidatedBody(bodySchema.parse),
  },
  async ({ event, body }) => {
    const db = useAppDatabase(event)

    // 1. Create the dataset
    const dataset = await db
      .insert(datasets)
      .values({ name: body.name, status: 'processing', rowCount: body.rows.length })
      .returning()
      .get()

    // 2. Store raw rows
    await db
      .insert(datasetRows)
      .values(
        body.rows.map((row) => ({
          datasetId: dataset.id,
          rawJson: JSON.stringify(row),
        })),
      )
      .run()

    // 3. Normalize into canonical rows
    const canonicalValues = body.rows.map((row) => {
      const { normalized, qualityScore, missingFields } = normalizeRow(
        row as Record<string, unknown>,
      )
      return {
        datasetId: dataset.id,
        normalizedJson: JSON.stringify(normalized),
        qualityScore,
        missingFields: missingFields.length > 0 ? missingFields.join(',') : null,
      }
    })

    await db.insert(canonicalRows).values(canonicalValues).run()

    // 4. Update dataset status
    await db
      .update(datasets)
      .set({ status: 'processed', processedAt: new Date().toISOString() })
      .where(eq(datasets.id, dataset.id))
      .run()

    return {
      dataset: { ...dataset, status: 'processed' },
      rowCount: body.rows.length,
    }
  }
)
