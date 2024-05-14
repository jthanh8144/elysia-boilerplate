import { t } from 'elysia'

export const RegisterDto = t.Object({
  email: t.String(),
  password: t.String(),
  name: t.String(),
  age: t.Number(),
})

export const LoginDto = t.Object({
  email: t.String(),
  password: t.String(),
})

export const LoginResDto = t.Object({
  accessToken: t.String(),
})
