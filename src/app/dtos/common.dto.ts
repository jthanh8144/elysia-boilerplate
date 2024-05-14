import { t } from 'elysia'

export const MessageResponse = t.Object({
  message: t.String(),
})

export const IdParams = t.Object({
  id: t.Numeric(),
})
