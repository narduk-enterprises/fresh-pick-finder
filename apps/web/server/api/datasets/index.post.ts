import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { definePublicMutation, withValidatedBody } from '#layer/server/utils/mutation'
import { useAppDatabase } from '#server/utils/database'
import { datasets, datasetRows, canonicalRows } from '#server/database/app-schema'

const bodySchema = z.object({
  name: z.string().min(1).max(200),
  rows: z.array(z.record(z.string(), z.unknown())).min(1).max(1000),
})

const FIELD_MAP: Record<string, string> = {
  name: 'name',
  farm_name: 'name',
  location_name: 'name',
  address: 'address',
  street_address: 'address',
  street: 'address',
  city: 'city',
  town: 'city',
  state: 'state',
  region: 'state',
  zip: 'postalCode',
  zipcode: 'postalCode',
  postal_code: 'postalCode',
  zip_code: 'postalCode',
  latitude: 'lat',
  lat: 'lat',
  longitude: 'lng',
  lng: 'lng',
  lon: 'lng',
  url: 'website',
  website: 'website',
  site: 'website',
  phone: 'phone',
  telephone: 'phone',
  tel: 'phone',
  description: 'description',
  desc: 'description',
  about: 'description',
  type: 'type',
  location_type: 'type',
  kind: 'type',
}

const CANONICAL_FIELDS = [
  'name',
  'address',
  'city',
  'state',
  'postalCode',
  'lat',
  'lng',
  'website',
  'phone',
  'description',
  'type',
] as const

function normalizeRow(raw: Record<string, unknown>) {
  const normalized: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(raw)) {
    const canonicalKey = FIELD_MAP[key.toLowerCase()]
    if (canonicalKey && value != null && value !== '') {
      normalized[canonicalKey] = value
    }
  }
  return normalized
}

function computeQualityScore(normalized: Record<string, unknown>) {
  const filled = CANONICAL_FIELDS.filter(
    (f) => normalized[f] != null && normalized[f] !== '',
  ).length
  return filled / CANONICAL_FIELDS.length
}

function findMissingFields(normalized: Record<string, unknown>) {
  return CANONICAL_FIELDS.filter((f) => normalized[f] == null || normalized[f] === '')
}

export default definePublicMutation(
  {
    parseBody: withValidatedBody((value) => bodySchema.parse(value)),
    rateLimit: { namespace: 'dataset-upload', maxRequests: 10, windowMs: 60_000 },
  },
  async ({ body, event }) => {
    const db = useAppDatabase(event)

    // 1. Create dataset
    const dataset = await db
      .insert(datasets)
      .values({ name: body.name, status: 'processing' })
      .returning()
      .get()

    // 2. Insert raw rows in batch
    await db
      .insert(datasetRows)
      .values(
        body.rows.map((row) => ({
          datasetId: dataset.id,
          rawJson: JSON.stringify(row),
        })),
      )
      .run()

    // 3–4. Normalize and insert canonical rows in batch
    let totalQuality = 0
    const canonicalValues = body.rows.map((row) => {
      const normalized = normalizeRow(row)
      const qualityScore = computeQualityScore(normalized)
      totalQuality += qualityScore
      return {
        datasetId: dataset.id,
        normalizedJson: JSON.stringify(normalized),
        qualityScore,
        missingFields: JSON.stringify(findMissingFields(normalized)),
      }
    })
    await db.insert(canonicalRows).values(canonicalValues).run()

    // 5. Update dataset status
    const now = new Date().toISOString()
    await db
      .update(datasets)
      .set({
        status: 'completed',
        rowCount: body.rows.length,
        processedAt: now,
      })
      .where(eq(datasets.id, dataset.id))
      .run()

    return {
      id: dataset.id,
      name: dataset.name,
      status: 'completed',
      rowCount: body.rows.length,
      averageQuality: body.rows.length > 0 ? totalQuality / body.rows.length : 0,
      processedAt: now,
    }
  },
)
