import { eq } from 'drizzle-orm'
import { requireAdmin } from '#layer/server/utils/auth'
import { useAppDatabase } from '#server/utils/database'
import { analysisResults } from '#server/database/app-schema'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const datasetId = Number(getRouterParam(event, 'datasetId'))
  if (!datasetId || Number.isNaN(datasetId)) {
    throw createError({ statusCode: 400, message: 'Invalid dataset ID.' })
  }

  const db = useAppDatabase(event)

  const results = await db
    .select()
    .from(analysisResults)
    .where(eq(analysisResults.datasetId, datasetId))
    .all()

  return {
    datasetId,
    results: results.map((r) => ({
      ...r,
      resultJson: JSON.parse(r.resultJson),
    })),
  }
})
