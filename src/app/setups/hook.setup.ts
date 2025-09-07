import { type Elysia } from 'elysia'
import createHttpError, { HttpError } from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import { logger } from '../utils/logger'

export const hookSetup = (app: Elysia) =>
  app
    .onError({ as: 'global' }, ({ code, error, request, path }) => {
      logger.error(
        `[${request.method}] ${path} >> StatusCode:: ${code}, Message:: ${'message' in error ? error.message : 'Some error happened'}`,
        error,
      )
      if (error instanceof HttpError) {
        return error
      }
      switch (code) {
        case 'VALIDATION':
          return error.toResponse()
        case 'NOT_FOUND':
          return createHttpError(StatusCodes.NOT_FOUND)
      }
      return createHttpError(StatusCodes.INTERNAL_SERVER_ERROR, {
        message: 'message' in error ? error.message : 'Some error happened',
      })
    })
    .mapResponse(({ response }) => {
      if (response instanceof Response) {
        return response
      }
      if (typeof response === 'object') {
        return Response.json(response)
      }
    })
