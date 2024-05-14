import { Elysia } from 'elysia'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import dataSource from '../../shared/configs/data-source.config'
import { LoginDto, LoginResDto, RegisterDto } from '../dtos/auth.dto'
import { MessageResponse } from '../dtos/common.dto'
import { profileRepository, userRepository } from '../repositories'
import { comparePassword } from '../utils/hash-password'
import { getAccessToken } from '../utils/jwt'

export const authController = new Elysia({ prefix: '/auth', tags: ['Auth'] })
  .post(
    '/register',
    async ({ body, set }) => {
      const { email, password, name, age } = body
      const queryRunner = dataSource.createQueryRunner()
      await queryRunner.connect()
      try {
        await queryRunner.startTransaction()
        const user = await userRepository.registerUser(email, password)
        await profileRepository.createProfile(name, age, user)
        await queryRunner.commitTransaction()
        return { message: 'Register user success!' }
      } catch (err) {
        await queryRunner.rollbackTransaction()
        set.status = StatusCodes.BAD_REQUEST
        return {
          message: err instanceof Error ? err.message : 'Some error happened',
        }
      }
    },
    { body: RegisterDto, response: MessageResponse },
  )
  .post(
    '/login',
    async ({ body }) => {
      try {
        const { email, password } = body
        const user = await userRepository.findOne({
          where: { email },
          relations: { profile: true },
        })
        if (user && comparePassword(password, user.password)) {
          return {
            accessToken: getAccessToken({
              id: user.id,
              email,
              name: user.profile.name,
            }),
          }
        } else {
          throw createHttpError(StatusCodes.UNAUTHORIZED, {
            message: 'Email or password is incorrect!',
          })
        }
      } catch (err) {
        throw createHttpError(StatusCodes.INTERNAL_SERVER_ERROR, {
          message: err instanceof Error ? err.message : 'Some error happened',
        })
      }
    },
    { body: LoginDto, response: LoginResDto },
  )
