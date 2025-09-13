import { StatusCodes } from 'http-status-codes'

import dataSource from '@/configs/data-source.config'

import type { LoginDto, RegisterDto } from '../dtos/auth.dto'
import { profileRepository, userRepository } from '../repositories'
import { createAppError, createUnauthorizedError } from '../utils/errors'
import { comparePassword } from '../utils/hash-password'
import { getAccessToken } from '../utils/jwt'

export class AuthService {
  static async register({ email, password, name, age }: RegisterDto) {
    const emailExists = await userRepository.checkEmailExists(email)
    if (emailExists) {
      throw createAppError(StatusCodes.CONFLICT, 'Email already exists!')
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
  }

  static async login({ email, password }: LoginDto, ip: string) {
    // eslint-disable-next-line no-console
    console.log(ip)
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
  }
}
