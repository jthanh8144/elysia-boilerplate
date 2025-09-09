import { Elysia } from 'elysia'

import { loginDto, loginResDto, registerDto } from '../dtos/auth.dto'
import { messageResponse } from '../dtos/common.dto'
import { AuthService } from '../services/auth.service'
import type { AppContext } from '../types'

export const authController = new Elysia<'/auth', AppContext>({
  prefix: '/auth',
  tags: ['Auth'],
})
  .post(
    '/register',
    async ({ body }) => {
      return await AuthService.register(body)
    },
    { body: registerDto, response: messageResponse },
  )
  .post(
    '/login',
    async ({ body, ip }) => {
      return await AuthService.login(body, ip)
    },
    { body: loginDto, response: loginResDto },
  )
