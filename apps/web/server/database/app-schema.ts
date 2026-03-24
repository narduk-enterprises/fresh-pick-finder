import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

// ─── Locations ─────────────────────────────────────────────
export const locations = sqliteTable('locations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  type: text('type').notNull(),
  address: text('address'),
  city: text('city').notNull(),
  state: text('state').notNull(),
  postalCode: text('postal_code'),
  lat: real('lat'),
  lng: real('lng'),
  website: text('website'),
  phone: text('phone'),
  description: text('description'),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

// ─── Seasonal Offerings ──────────────────────────────────
export const seasonalOfferings = sqliteTable('seasonal_offerings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  locationId: integer('location_id')
    .notNull()
    .references(() => locations.id, { onDelete: 'cascade' }),
  category: text('category').notNull(),
  item: text('item').notNull(),
  seasonStart: text('season_start'),
  seasonEnd: text('season_end'),
  status: text('status').notNull(),
  notes: text('notes'),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

// ─── Location Metadata ───────────────────────────────────
export const locationMetadata = sqliteTable('location_metadata', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  locationId: integer('location_id')
    .notNull()
    .references(() => locations.id, { onDelete: 'cascade' })
    .unique(),
  amenities: text('amenities'), // JSON-encoded string array, e.g. '["restrooms","picnic_area"]'
  familyFriendly: integer('family_friendly', { mode: 'boolean' }).default(false),
  reservationsRequired: integer('reservations_required', { mode: 'boolean' }).default(false),
  pricingNotes: text('pricing_notes'),
  parkingNotes: text('parking_notes'),
  lastVerifiedAt: text('last_verified_at'),
  sourceUrl: text('source_url'),
  confidenceScore: real('confidence_score'),
})

// ─── Datasets ────────────────────────────────────────────
export const datasets = sqliteTable('datasets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  status: text('status').notNull(),
  rowCount: integer('row_count').default(0),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  processedAt: text('processed_at'),
})

// ─── Dataset Rows ────────────────────────────────────────
export const datasetRows = sqliteTable('dataset_rows', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  datasetId: integer('dataset_id')
    .notNull()
    .references(() => datasets.id, { onDelete: 'cascade' }),
  rawJson: text('raw_json').notNull(),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

// ─── Canonical Rows ──────────────────────────────────────
export const canonicalRows = sqliteTable('canonical_rows', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  datasetId: integer('dataset_id')
    .notNull()
    .references(() => datasets.id, { onDelete: 'cascade' }),
  normalizedJson: text('normalized_json').notNull(),
  qualityScore: real('quality_score'),
  missingFields: text('missing_fields'), // JSON-encoded string array of field names, e.g. '["phone","website"]'
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

// ─── Analysis Results ────────────────────────────────────
export const analysisResults = sqliteTable('analysis_results', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  datasetId: integer('dataset_id')
    .notNull()
    .references(() => datasets.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  resultJson: text('result_json').notNull(),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

// ─── Type helpers ────────────────────────────────────────
export type Location = typeof locations.$inferSelect
export type NewLocation = typeof locations.$inferInsert
export type SeasonalOffering = typeof seasonalOfferings.$inferSelect
export type NewSeasonalOffering = typeof seasonalOfferings.$inferInsert
export type LocationMetadata = typeof locationMetadata.$inferSelect
export type NewLocationMetadata = typeof locationMetadata.$inferInsert
export type Dataset = typeof datasets.$inferSelect
export type NewDataset = typeof datasets.$inferInsert
export type DatasetRow = typeof datasetRows.$inferSelect
export type NewDatasetRow = typeof datasetRows.$inferInsert
export type CanonicalRow = typeof canonicalRows.$inferSelect
export type NewCanonicalRow = typeof canonicalRows.$inferInsert
export type AnalysisResult = typeof analysisResults.$inferSelect
export type NewAnalysisResult = typeof analysisResults.$inferInsert
