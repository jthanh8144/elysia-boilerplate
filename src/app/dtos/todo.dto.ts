import { t } from 'elysia'

export const TodoDto = t.Object({
  title: t.String(),
  description: t.String(),
})

export const CreateTodoResDto = t.Object({
  id: t.Number(),
  title: t.String(),
  description: t.String(),
  userId: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  deletedAt: t.Union([t.Date(), t.Null()]),
})

export const UpdateTodoResDto = t.Object({
  id: t.Number(),
  title: t.String(),
  description: t.String(),
  userId: t.Number(),
  updatedAt: t.Date(),
})
