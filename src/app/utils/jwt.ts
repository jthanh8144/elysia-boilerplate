import { type JwtPayload, sign, verify } from 'jsonwebtoken'
import type { StringValue } from 'ms'

import { environment } from '../../shared/constants'

export interface SignToken {
  id: number
  email: string
  name: string
}

export interface JwtResponse extends JwtPayload {
  id: number
  email: string
  name: string
}

export const getAccessToken = (data: SignToken) => {
  return sign(data, environment.jwt.accessSecret, {
    expiresIn: environment.jwt.accessLife as StringValue,
  })
}

export const verifyToken = (token: string) => {
  return verify(token, environment.jwt.accessSecret) as JwtResponse
}
