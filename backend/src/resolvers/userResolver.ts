import { s3 } from '@/s3/s3Provider'
import createUpdateQuery from '@/utils/createUpdateQuery'
import { LoginInput, Resolvers, User, UserInput } from '@Types/__generated__/resolvers-types'
import { UpdateUserSchema } from '@Types/schema/updateUserSchema'
import { ApolloError, AuthenticationError } from 'apollo-server-express'
import bcrypt from 'bcrypt'
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal'
import jwt from 'jsonwebtoken'
import db from '../db'

const VALID_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

const UserResolver: Resolvers = {
  Upload: GraphQLUpload,
  Query: {
    getUsers: async () => {
      const query = 'SELECT * FROM users'
      const { rows } = await db.query(query)
      const users = rows as User[]
      users.forEach(async (user) => {
        if (user.image) user.image = await s3.get(user.image)
      })
      return users
    },
    getUsersByID: async (_: unknown, { ids }: { ids: string[] }) => {
      if (ids) {
        const query = 'SELECT * FROM users WHERE id = ANY($1)'
        const { rows } = await db.query(query, [ids])
        return rows as User[]
      }
      const query = 'SELECT * FROM users'
      const { rows } = await db.query(query)
      const users = rows as User[]
      users.forEach(async (user) => {
        if (user.image) user.image = await s3.get(user.image)
      })
      return users
    },
    getUserByID: async (_: unknown, { id }: { id: string }) => {
      console.log('Getting user with id: ', id)
      const query = 'SELECT * FROM users WHERE id = $1'
      const { rows } = await db.query(query, [id])
      const user = rows[0] as User

      if (user.image) user.image = await s3.get(user.image)

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
    getFavoritesByUserID: async (_: unknown, { id }: { id: string }) => {
      try {
        const query = `
          SELECT * FROM destinations 
          WHERE id = ANY(
            SELECT UNNEST(favorites) FROM users WHERE id = $1
          )
        `
        const { rows } = await db.query(query, [id])
        return rows
      } catch (error) {
        throw new ApolloError(`Failed to fetch favorites: ${error}`, 'INTERNAL_SERVER_ERROR')
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
      // Have to safe parse as the image is a FileUpload type and not a File type
      const result = UpdateUserSchema.safeParse(user)
      let imgFile = null

      if (!result.success) {
        // Manual image validation as zod does not support FileUpload type
        const imageError = result.error.errors.find((err) => err.path.includes('image'))
        if (imageError) {
          imgFile = (await user.image) as FileUpload
          if (!VALID_IMAGE_TYPES.includes(imgFile.mimetype)) {
            throw new ApolloError('Invalid image type', 'VALIDATION_ERROR')
          }
        } else {
          throw new ApolloError(result.error.message, 'VALIDATION_ERROR')
        }
      }

      if (user.username) {
        const isUsernameTaken = await db
          .query('SELECT * FROM users WHERE username = $1', [user.username])
          .then((res) => res.rows.length > 0)
        if (isUsernameTaken) throw new ApolloError('Username is already taken', 'USERNAME_TAKEN')
      }

      try {
        console.log('Updating user with id: ', user.id)

        if (imgFile) {
          const res = await s3.upload(imgFile, user.id)
          user.image = res
        }

        // Create the query based on the values given in the user object
        const { query, updatedUser } = createUpdateQuery(user)

        const { rows } = await db.query(query, Object.values(updatedUser))
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

    addFavoriteToUser: async (_: unknown, { userID, destinationID }: { userID: string; destinationID: string }) => {
      try {
        const addFavoriteQuery = `
          UPDATE users 
          SET favorites = array_append(favorites, $2) 
          WHERE id = $1 
          RETURNING *
        `
        console.log('Adding favorite to user with id:', userID)
        const { rows: userRows } = await db.query(addFavoriteQuery, [userID, destinationID])
        const user = userRows[0]

        // Fetch the full Destination objects for the updated favorites
        const getFavoritesQuery = `
          SELECT * 
          FROM destinations 
          WHERE id = ANY($1)
        `
        const { rows: favorites } = await db.query(getFavoritesQuery, [user.favorites])
        console.log('Fetched favorites:', favorites)

        // Attach the resolved favorites to the user object
        return {
          ...user,
          favorites,
        }
      } catch (error) {
        throw new ApolloError('Failed to add favorite to user: ' + error, 'INTERNAL_SERVER_ERROR')
      }
    },

    removeFavoriteFromUser: async (
      _: unknown,
      { userID, destinationID }: { userID: string; destinationID: string },
    ) => {
      try {
        const removeFavoriteQuery = `
          UPDATE users 
          SET favorites = array_remove(favorites, $2) 
          WHERE id = $1 
          RETURNING *;
        `
        console.log('Removing favorite from user with id:', userID)
        const { rows: userRows } = await db.query(removeFavoriteQuery, [userID, destinationID])
        const user = userRows[0]

        const getFavoritesQuery = `
          SELECT * 
          FROM destinations 
          WHERE id = ANY($1);
        `
        const { rows: favorites } = await db.query(getFavoritesQuery, [user.favorites])
        console.log('Updated favorites:', favorites)

        return {
          ...user,
          favorites,
        }
      } catch (error) {
        throw new ApolloError('Failed to remove favorite from user: ' + error, 'INTERNAL_SERVER_ERROR')
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

        if (user.image) user.image = await s3.get(user.image)
        console.log('Logged in user: ', user)
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
