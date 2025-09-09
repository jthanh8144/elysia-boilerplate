import { t } from 'elysia'

import { commonResponse } from './common.dto'

export const userProfileResDto = t.Union([
  t.Composite([
    commonResponse,
    t.Object({
      name: t.String(),
      age: t.Number(),
      birthday: t.Optional(t.String()),
      userId: t.Number(),
    }),
  ]),
  t.Null(),
])

export const userTodosResDto = t.Array(
  t.Composite([
    commonResponse,
    t.Object({
      title: t.String(),
      description: t.String(),
      userId: t.Number(),
    }),
  ]),
)
