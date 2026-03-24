import { eq, sql, desc } from 'drizzle-orm'
import { requireAdmin } from '#layer/server/utils/auth'
import { useAppDatabase } from '#server/utils/database'
import { datasets, datasetRows, canonicalRows } from '#server/database/app-schema'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const db = useAppDatabase(event)

  const datasetList = await db.select().from(datasets).orderBy(desc(datasets.createdAt)).all()

  // Attach row counts for each dataset
  const enriched = await Promise.all(
    datasetList.map(async (ds) => {
      const [rawCount, normalizedCount] = await Promise.all([
        db
          .select({ count: sql<number>`count(*)` })
          .from(datasetRows)
          .where(eq(datasetRows.datasetId, ds.id))
          .get(),
        db
          .select({ count: sql<number>`count(*)` })
          .from(canonicalRows)
          .where(eq(canonicalRows.datasetId, ds.id))
          .get(),
      ])

      return {
        ...ds,
        rawRowCount: Number(rawCount?.count ?? 0),
        canonicalRowCount: Number(normalizedCount?.count ?? 0),
      }
    }),
  )

  return { datasets: enriched }
})
