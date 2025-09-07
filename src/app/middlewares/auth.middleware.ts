import { type Elysia } from 'elysia'
import { StatusCodes } from 'http-status-codes'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

import { verifyToken } from '../utils/jwt'

export const authMiddleware = (app: Elysia) =>
  app.derive(({ headers, status }) => {
    try {
      const token = headers.authorization?.split(' ')[1] ?? ''
      const user = verifyToken(token)
      return { user }
    } catch (err) {
      if (
        err instanceof TokenExpiredError ||
        err instanceof JsonWebTokenError
      ) {
        return status(StatusCodes.UNAUTHORIZED, { message: err.message })
      }
      return status(StatusCodes.INTERNAL_SERVER_ERROR, {
        message: err instanceof Error ? err.message : 'some error happened',
      })
    }
  })
