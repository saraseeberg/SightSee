import { LoginInput, Resolvers, User, UserInput } from '@Types/__generated__/resolvers-types'
import { UpdateUserSchema } from '@Types/schema/updateUserSchema'
import db from '../db'
import bcrypt from 'bcrypt'
import { ApolloError, AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal'
import { s3 } from '@/s3/s3Provider'

const VALID_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

const UserResolver: Resolvers = {
  Upload: GraphQLUpload,
  Query: {
    getUsers: async () => {
      const query = 'SELECT * FROM users'
      const { rows } = await db.query(query)
      return rows as User[]
    },
    getUsersByID: async (_: unknown, { ids }: { ids: string[] }) => {
      if (ids) {
        const query = 'SELECT * FROM users WHERE id = ANY($1)'
        const { rows } = await db.query(query, [ids])
        return rows as User[]
      }
      const query = 'SELECT * FROM users'
      const { rows } = await db.query(query)
      return rows as User[]
    },
    getUserByID: async (_: unknown, { id }: { id: string }) => {
      console.log('Getting user with id: ', id)
      const query = 'SELECT * FROM users WHERE id = $1'
      const { rows } = await db.query(query, [id])
      const user = rows[0] as User
      return user
    },
    getReviewsByUserID: async (_: unknown, { id }: { id: string }) => {
      try {
        const query = `
          SELECT * FROM reviews
          WHERE id = ANY(
            SELECT UNNEST(reviews) FROM users WHERE id = $1
          )
        `
        const { rows } = await db.query(query, [id])
        return rows
      } catch (error) {
        throw new ApolloError(`Failed to fetch reviews: ${error}`, 'INTERNAL_SERVER_ERROR')
      }
    },
  },

  Mutation: {
    createUser: async (
      _: unknown,
      { name, username, password }: { name: string; username: string; password: string },
    ) => {
      try {
        // Check if user already exists
        const checkQuery = 'SELECT * FROM users WHERE username = $1'
        const checkResult = await db.query(checkQuery, [username])
        if (checkResult.rows.length > 0) {
          throw new ApolloError('User already exists', 'USER_ALREADY_EXISTS')
        }

        const query = 'INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING *'

        const hashedpassword = await bcrypt.hash(password, 10)
        console.log('Creating user with name: ', name, ' username: ', username)
        const { rows } = await db.query(query, [name, username, hashedpassword])
        console.log('Created user: ', username, ' with id: ', rows[0].id)

        const user = rows[0] as User
        const token = jwt.sign(
          {
            user_id: user.id,
            username: user.username,
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn: '2h',
          },
        )

        return {
          user,
          token,
        }
      } catch (error) {
        throw new ApolloError(('Internal Server Error ' + error) as string, 'INTERNAL_SERVER_ERROR')
      }
    },

    updateUser: async (_: unknown, { user }: { user: UserInput }) => {
      try {
        // Have to safe parse as the image is a FileUpload type and not a File type
        const result = UpdateUserSchema.safeParse(user)
        let imgFile = null

        if (!result.success) {
          // Manual image validation as zod does not support FileUpload type
          const imageError = result.error.errors.find((err) => err.path.includes('image'))
          if (imageError) {
            imgFile = await user.image as FileUpload
            if (!VALID_IMAGE_TYPES.includes(imgFile.mimetype)) {
              throw new ApolloError('Invalid image type', 'VALIDATION_ERROR')
            }

          } else {
            throw new ApolloError(result.error.message, 'VALIDATION_ERROR')
          }

        }

        console.log('Updating user with id: ', user.id)

        if (imgFile) {
          const res = await s3.upload(imgFile, user.id)
          console.log('Uploaded image to S3: ', res)
          user.image = res
        }

        // Form the query based on the user object
        let query = "UPDATE users SET "
        let index = 2
        let end = Object.keys(user).length - 1
        Object.entries(user).forEach(([key, val]) => {
          if (key !== 'id' && val) {
            query += `${key}=$${index}`
            if (index < end) {
              query += ', '
            }
            index++

          } else if (!val) {
            // If value is empty, remove the key from the object
            delete (user as Record<string, any>)[key]
            end--
          }
        })
        query += ' WHERE id = $1 RETURNING *'
        console.log('Query: ', query)
        console.log('Values: ', user)

        const { rows } = await db.query(query, Object.values(user))

        return rows[0] as User
      } catch (error) {
        throw new ApolloError(('Failed to update: ' + error) as string, 'INTERNAL_SERVER_ERROR')
      }
    },

    addReviewToUser: async (_: unknown, { userID, reviewID }: { userID: string; reviewID: string }) => {
      try {
        const query = 'UPDATE users SET reviews = array_append(reviews, $2) WHERE id = $1 RETURNING *'
        console.log('Adding review to user with id: ', userID)
        const { rows } = await db.query(query, [userID, reviewID])
        console.log('Added review to user: ', userID)
        return rows[0] as User
      } catch (error) {
        throw new ApolloError(('Failed to add review to user: ' + error) as string, 'INTERNAL_SERVER_ERROR')
      }
    },

    deleteUser: async (_: unknown, { id }: { id: string }) => {
      try {
        const query = 'DELETE FROM users WHERE id = $1 RETURNING *'
        console.log('Deleting user with id: ', id)
        const { rows } = await db.query(query, [id])
        console.log('Deleted user: ', id)
        return rows[0]
      } catch (error) {
        throw new ApolloError(('Could not delete user: ' + error) as string, 'INTERNAL_SERVER_ERROR')
      }
    },
    login: async (_: unknown, { data }: { data: LoginInput }) => {
      try {
        const query = 'SELECT * FROM users WHERE username = $1'
        const { rows } = await db.query(query, [data.username])
        console.log('Logging in user with username: ', data.username)
        const user = rows[0] as User

        if (!user) {
          throw new AuthenticationError('Username or password is incorrect')
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password)

        if (!isValidPassword) {
          throw new AuthenticationError('Username or password is incorrect')
        }

        const token = jwt.sign(
          {
            user_id: user.id,
            username: user.username,
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn: '2h',
          },
        )

        return {
          user,
          token,
        }
      } catch (error) {
        throw new Error(error as string)
      }
    },
  },

  User: {
    reviews: async (user: User) => {
      try {
        const query = 'SELECT * FROM reviews WHERE id = ANY($1)'
        const { rows } = await db.query(query, [user.reviews])
        return rows
      } catch (error) {
        throw new ApolloError(`Failed to fetch reviews: ${error}`, 'INTERNAL_SERVER_ERROR')
      }
    },
  },
}

export default UserResolver
