import { Elysia } from 'elysia'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import { IdParams, MessageResponse } from '../dtos/common.dto'
import { CreateTodoResDto, TodoDto, UpdateTodoResDto } from '../dtos/todo.dto'
import { authMiddleware } from '../middlewares/auth.middleware'
import { todoRepository } from '../repositories'

export const todoController = new Elysia({ prefix: '/todos', tags: ['Todo'] })
  .use(authMiddleware)
  .post(
    '/',
    async ({ user, body }) => {
      try {
        const { title, description } = body
        const todo = await todoRepository.save(
          todoRepository.create({ title, description, userId: user.id }),
        )
        return todo
      } catch (err) {
        throw createHttpError(StatusCodes.INTERNAL_SERVER_ERROR)
      }
    },
    { body: TodoDto, response: CreateTodoResDto },
  )
  .put(
    '/:id',
    async ({ user, params, body }) => {
      const { id } = params
      const { title, description } = body
      const todo = await todoRepository.save(
        todoRepository.create({ id, title, description, userId: user.id }),
      )
      return todo
    },
    { params: IdParams, body: TodoDto, response: UpdateTodoResDto },
  )
  .delete(
    '/:id',
    async ({ params }) => {
      await todoRepository.delete(params.id)
      return { message: 'Deleted' }
    },
    { params: IdParams, body: TodoDto, response: MessageResponse },
  )
