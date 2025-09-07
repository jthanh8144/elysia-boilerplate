import { Elysia } from 'elysia'
import { StatusCodes } from 'http-status-codes'

import dataSource from '../../shared/configs/data-source.config'
import { LoginDto, LoginResDto, RegisterDto } from '../dtos/auth.dto'
import { MessageResponse } from '../dtos/common.dto'
import { profileRepository, userRepository } from '../repositories'
import type { AppContext } from '../types'
import { createUnauthorizedError } from '../utils/errors'
import { comparePassword } from '../utils/hash-password'
import { getAccessToken } from '../utils/jwt'

export const authController = new Elysia<'/auth', AppContext>({
  prefix: '/auth',
  tags: ['Auth'],
})
  .post(
    '/register',
    async ({ body, set }) => {
      const { email, password, name, age } = body
      const emailExists = await userRepository.checkEmailExists(email)
      if (emailExists) {
        set.status = StatusCodes.CONFLICT
        return { message: 'Email already exists!' }
      }
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
        throw err
      } finally {
        await queryRunner.release()
      }
    },
    { body: RegisterDto, response: MessageResponse },
  )
  .post(
    '/login',
    async ({ body, ip }) => {
      // eslint-disable-next-line no-console
      console.log(ip)
      const { email, password } = body
      const user = await userRepository.findOne({
        where: { email },
        relations: { profile: true },
        select: {
          id: true,
          password: true,
          profile: { name: true },
        },
      })
      if (user && comparePassword(password, user.password)) {
        return {
          accessToken: getAccessToken({
            id: user.id,
            email,
            name: user.profile.name,
          }),
        }
      }
      throw createUnauthorizedError('Email or password is incorrect!')
    },
    { body: LoginDto, response: LoginResDto },
  )
