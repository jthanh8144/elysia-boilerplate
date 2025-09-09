import { Elysia } from 'elysia'

import { idParams, messageResponse } from '../dtos/common.dto'
import { createTodoResDto, todoDto, updateTodoResDto } from '../dtos/todo.dto'
import { authMiddleware } from '../middlewares/auth.middleware'
import { todoRepository } from '../repositories'
import { TodoService } from '../services/todo.service'

export const todoController = new Elysia({ prefix: '/todos', tags: ['Todo'] })
  .use(authMiddleware)
  .post(
    '/',
    async ({ user, body }) => {
      const { title, description } = body
      return await TodoService.save(todoRepository, {
        title,
        description,
        userId: user.id,
      })
    },
    { body: todoDto, response: createTodoResDto },
  )
  .put(
    '/:id',
    async ({ user, params, body }) => {
      const { id } = params
      const { title, description } = body
      return await TodoService.save(todoRepository, {
        id,
        title,
        description,
        userId: user.id,
      })
    },
    { params: idParams, body: todoDto, response: updateTodoResDto },
  )
  .delete(
    '/:id',
    async ({ params }) => {
      return await TodoService.delete(params.id)
    },
    { params: idParams, body: todoDto, response: messageResponse },
  )
