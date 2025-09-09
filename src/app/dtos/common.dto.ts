import { t } from 'elysia'

export const messageResponse = t.Object({
  message: t.String(),
})

export const idParams = t.Object({
  id: t.Numeric(),
})

export const commonResponse = t.Object({
  id: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  deletedAt: t.Union([t.Date(), t.Null()]),
})
