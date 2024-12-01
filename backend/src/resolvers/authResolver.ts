import { generateToken, verifyToken } from '@/auth/utils'
import db from '@/db'
import { s3 } from '@/s3/s3Provider'
import { LoginInput, Resolvers, User } from '@Types/__generated__/resolvers-types'
import { ApolloError, AuthenticationError } from 'apollo-server-express'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

const authResolver: Resolvers = {
  Query: {
    me: async (_: unknown, __: unknown, { req }: { req: Request }) => {
      console.log('Getting user from request')
      const userId = verifyToken(req)
      console.log('User from request', userId)
      if (userId) {
        try {
          const query = 'SELECT * FROM users WHERE id = $1'
          const { rows } = await db.query(query, [userId])
          const user = rows[0] as User

          if (user.image) {
            user.image = await s3.get(user.image)
          }
          return user
        } catch (error) {
          throw new ApolloError('An error occurred while getting user: ' + error, 'INTERNAL_SERVER_ERROR')
        }
      }
      return null
    },
  },
  Mutation: {
    login: async (_: unknown, { data }: { data: LoginInput }, { res }: { res: Response }) => {
      let user: User | null
      try {
        const query = 'SELECT * FROM users WHERE username = $1'
        const { rows } = await db.query(query, [data.username])
        console.log('Logging in user with username: ', data.username)
        user = rows[0] as User
      } catch (error) {
        throw new ApolloError('An error occurred while logging in:' + error, 'INTERNAL_SERVER_ERROR')
      }

      if (!user) {
        throw new AuthenticationError('Username or password is incorrect')
      }

      const isValidPassword = await bcrypt.compare(data.password, user.password)

      if (!isValidPassword) {
        throw new AuthenticationError('Username or password is incorrect')
      }

      try {
        generateToken(res, user)

        if (user.image) {
          user.image = await s3.get(user.image)
        }
        return user
      } catch (error) {
        throw new ApolloError('An error occurred while logging in: ' + error, 'INTERNAL_SERVER_ERROR')
      }
    },

    logout: async (_: unknown, __: unknown, { res }: { res: Response }) => {
      res.clearCookie('accessToken')
      return 'Logged out'
    },
  },
}

export default authResolver
