import { eq } from 'drizzle-orm'
import { useAppDatabase } from '#server/utils/database'
import { datasets, analysisResults } from '#server/database/app-schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Missing dataset ID.' })
  }

  const datasetId = Number(id)
  if (!Number.isInteger(datasetId) || datasetId < 1) {
    throw createError({ statusCode: 400, message: 'Invalid dataset ID.' })
  }

  const db = useAppDatabase(event)

  const dataset = await db.select().from(datasets).where(eq(datasets.id, datasetId)).get()
  if (!dataset) {
    throw createError({ statusCode: 404, message: 'Dataset not found.' })
  }

  const analyses = await db
    .select()
    .from(analysisResults)
    .where(eq(analysisResults.datasetId, datasetId))
    .all()

  return {
    datasetId,
    analyses: analyses.map((a) => ({
      ...a,
      resultJson: JSON.parse(a.resultJson),
    })),
  }
})
