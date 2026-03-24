import { sql, desc } from 'drizzle-orm'
import { requireAdmin } from '#layer/server/utils/auth'
import { useAppDatabase } from '#server/utils/database'
import { datasets, datasetRows, canonicalRows } from '#server/database/app-schema'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const db = useAppDatabase(event)

  const datasetList = await db.select().from(datasets).orderBy(desc(datasets.createdAt)).all()

  if (datasetList.length === 0) {
    return { datasets: [] }
  }

  // Batch-count raw and canonical rows with GROUP BY instead of N+1 queries
  const [rawCounts, canonicalCounts] = await Promise.all([
    db
      .select({
        datasetId: datasetRows.datasetId,
        count: sql<number>`count(*)`,
      })
      .from(datasetRows)
      .groupBy(datasetRows.datasetId)
      .all(),
    db
      .select({
        datasetId: canonicalRows.datasetId,
        count: sql<number>`count(*)`,
      })
      .from(canonicalRows)
      .groupBy(canonicalRows.datasetId)
      .all(),
  ])

  const rawCountMap = new Map(rawCounts.map((r) => [r.datasetId, Number(r.count)]))
  const canonicalCountMap = new Map(canonicalCounts.map((r) => [r.datasetId, Number(r.count)]))

  return {
    datasets: datasetList.map((ds) => ({
      ...ds,
      rawRowCount: rawCountMap.get(ds.id) ?? 0,
      canonicalRowCount: canonicalCountMap.get(ds.id) ?? 0,
    })),
  }
})
