import { t } from 'elysia'

import { commonResponse } from './common.dto'

export const todoDto = t.Object({
  title: t.String(),
  description: t.String(),
})

export const createTodoResDto = t.Composite([
  commonResponse,
  t.Object({
    title: t.String(),
    description: t.String(),
    userId: t.Number(),
  }),
])

export const updateTodoResDto = t.Object({
  id: t.Number(),
  title: t.String(),
  description: t.String(),
  userId: t.Number(),
  updatedAt: t.Date(),
})
