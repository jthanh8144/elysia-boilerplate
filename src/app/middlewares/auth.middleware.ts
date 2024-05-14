import { type Elysia } from 'elysia'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

import { verifyToken } from '../utils/jwt'

export const authMiddleware = (app: Elysia) =>
  app.derive(({ headers, error }) => {
    try {
      const token = headers.authorization
        ? headers.authorization.split(' ')[1]
        : ''
      const user = verifyToken(token)
      return { user }
    } catch (err) {
      if (
        err instanceof TokenExpiredError ||
        err instanceof JsonWebTokenError
      ) {
        return error('Unauthorized', { message: err.message })
      } else {
        return error('Internal Server Error', {
          message: err instanceof Error ? err.message : 'some error happened',
        })
      }
    }
  })
