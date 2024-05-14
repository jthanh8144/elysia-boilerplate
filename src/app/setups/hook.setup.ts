import { type Elysia } from 'elysia'
import createHttpError, { HttpError } from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import { logger } from '../utils/logger'

export const hookSetup = (app: Elysia) =>
  app
    .onError({ as: 'global' }, ({ code, error, request, path }) => {
      logger.error(
        `[${request.method}] ${path} >> StatusCode:: ${code}, Message:: ${error.message}`,
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
    })
    .mapResponse(({ response }) => {
      if (response instanceof Response) {
        return response
      } else if (typeof response === 'object') {
        return Response.json(response)
      }
    })
