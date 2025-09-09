import { t } from 'elysia'

export const registerDto = t.Object({
  email: t.String(),
  password: t.String(),
  name: t.String(),
  age: t.Number(),
})
export type RegisterDto = typeof registerDto.static

export const loginDto = t.Object({
  email: t.String(),
  password: t.String(),
})
export type LoginDto = typeof loginDto.static

export const loginResDto = t.Object({
  accessToken: t.String(),
})
export type LoginResDto = typeof loginResDto.static
