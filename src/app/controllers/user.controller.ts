import { Elysia } from 'elysia'

import { authMiddleware } from '../middlewares/auth.middleware'
import { profileRepository, todoRepository } from '../repositories'

export const userController = new Elysia({ prefix: '/users', tags: ['User'] })
  .use(authMiddleware)
  .get('/profile', async ({ user, error }) => {
    try {
      const profile = await profileRepository.findOne({
        where: { userId: user.id },
      })
      return profile
    } catch (err) {
      return error('Internal Server Error', err)
    }
  })
  .get('/todos', async ({ user, error }) => {
    try {
      const todos = await todoRepository.find({
        where: { userId: user.id },
      })
      return todos
    } catch (err) {
      return error('Internal Server Error', err)
    }
  })
