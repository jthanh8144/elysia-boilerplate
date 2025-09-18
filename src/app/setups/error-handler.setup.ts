import { type Elysia } from 'elysia'
import { HttpError } from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import { logger } from '../utils/logger'

export const errorHandlerSetup = (app: Elysia) =>
  app.onError(
    { as: 'global' },
    ({ code, error, request, path, set, status }) => {
      if (error instanceof HttpError) {
        return status(error.status, { message: error.message })
      }
      switch (code) {
        case 'VALIDATION': {
          set.headers['content-type'] = 'application/json'
          const errorDetail = error.detail(error.message)
          if (typeof errorDetail === 'string') {
            try {
              const errorObject = JSON.parse(errorDetail) as {
                summary?: string
              }
              return status(StatusCodes.BAD_REQUEST, {
                message: errorObject.summary,
              })
            } catch {
              return errorDetail
            }
          }
          return errorDetail
        }
        case 'NOT_FOUND': {
          return status(StatusCodes.NOT_FOUND, { message: 'Not found' })
        }
      }
      const errorMessage =
        'message' in error ? error.message : 'Some error happened'
      logger.error(
        `[${request.method}] ${path} >> StatusCode:: ${code}, Message:: ${errorMessage}`,
        error,
      )
      return status(StatusCodes.INTERNAL_SERVER_ERROR, {
        message: errorMessage,
      })
    },
  )
