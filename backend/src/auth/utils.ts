import { ApolloContext } from '@/server'
import { User } from '@Types/__generated__/resolvers-types'
import { ApolloError } from 'apollo-server-express'
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

  res.setHeader('Authorization', `Bearer ${token}`)

  return user.id
}

export const verifyToken = (req: Request) => {
  try {
    if (req && req.headers) {
      console.log('Request headers:', req.headers)
      const authHeader = req.headers.authorization
      console.log('Auth header:', authHeader)

      if (!authHeader) {
        throw new ApolloError('No authentication header', 'UNAUTHENTICATED')
      }
      const token = authHeader.split(' ')[1]
      console.log('Verifying Token:', token)

      if (!token) {
        throw new ApolloError('No token provided', 'UNAUTHENTICATED')
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
      console.log('Decoded jwt:', decoded)

      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        throw new ApolloError('Token expired', 'UNAUTHENTICATED')
      }
      return decoded.sub
    }
    return null
  } catch {
    return null
  }
}

export const authenticateUser = (context: ApolloContext, targetUserId?: string) => {
  console.log('Authenticating user', context.userId, 'Target user id', targetUserId)
  if (!context.userId) {
    throw new ApolloError('Not authenticated', 'UNAUTHENTICATED')
  }
  console.log('User authenticated')

  if (targetUserId && context.userId !== targetUserId) {
    throw new ApolloError('Not authenticated', 'UNAUTHORISED')
  }

  console.log('User authorised')
}
