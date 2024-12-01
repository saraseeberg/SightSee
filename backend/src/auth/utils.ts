import { User } from '@Types/__generated__/resolvers-types'
import { ApolloError } from 'apollo-server-express'
import * as cookie from 'cookie'
import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const generateToken = (res: Response, user: User) => {
  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '30d',
    },
  )

  res.cookie('accessToken', token, {
    httpOnly: true,
    sameSite: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  })

  return user.id
}

export const verifyToken = (req: Request) => {
  try {
    if (req && req.headers) {
      const token = req.headers.cookie && cookie.parse(req.headers.cookie).accessToken
      if (!token) {
        throw new ApolloError('Not logged in')
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
      console.log('Decoded jwt:', decoded)

      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        throw new ApolloError('Token expired')
      }
      return decoded.sub
    }
    return null
  } catch {
    return null
  }
}
