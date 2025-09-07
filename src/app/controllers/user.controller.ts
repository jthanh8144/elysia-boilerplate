import { Elysia } from 'elysia'

import { authMiddleware } from '../middlewares/auth.middleware'
import { profileRepository, todoRepository } from '../repositories'

export const userController = new Elysia({ prefix: '/users', tags: ['User'] })
  .use(authMiddleware)
  .get('/profile', async ({ user }) => {
    const profile = await profileRepository.findOne({
      where: { userId: user.id },
    })
    return profile
  })
  .get('/todos', async ({ user }) => {
    const todos = await todoRepository.find({
      where: { userId: user.id },
    })
    return todos
  })
