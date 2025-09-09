import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

export const createAppError = (statusCode: number, message: string) => {
  return createHttpError(statusCode, { message })
}

export const createUnauthorizedError = (message = 'Unauthorized') => {
  return createHttpError(StatusCodes.UNAUTHORIZED, { message })
}

export const createBadRequestError = (message = 'Bad Request') => {
  return createHttpError(StatusCodes.BAD_REQUEST, { message })
}
