import { Elysia } from 'elysia'

import { userProfileResDto, userTodosResDto } from '../dtos/user.dto'
import { authMiddleware } from '../middlewares/auth.middleware'
import { UserService } from '../services/user.service'

export const userController = new Elysia({ prefix: '/users', tags: ['User'] })
  .use(authMiddleware)
  .get(
    '/profile',
    async ({ user }) => {
      return await UserService.getUserProfile(user.id)
    },
    { response: userProfileResDto },
  )
  .get(
    '/todos',
    async ({ user }) => {
      return await UserService.getUserTodos(user.id)
    },
    { response: userTodosResDto },
  )
