import { User, UserResolvers } from '@types'
import db from '../db'

const UserResolver: UserResolvers = {
  Query: {
    getUsers: async () => {
      const query = 'SELECT * FROM users'
      const { rows } = await db.query(query)
      return rows
    },
    getUsersByID: async (_: unknown, { ids }: { ids: string[] }) => {
      if (ids) {
        const query = 'SELECT * FROM users WHERE id = ANY($1)'
        const { rows } = await db.query(query, [ids])
        return rows
      }
      const query = 'SELECT * FROM users'
      const { rows } = await db.query(query)
      return rows
    },
    getUserByID: async (_: unknown, { id }: User) => {
      console.log('Getting user with id: ', id)
      const query = 'SELECT * FROM users WHERE id = $1'
      const { rows } = await db.query(query, [id])
      return rows[0]
    },
  },

  Mutation: {
    createUser: async (_: unknown, { name, username, hashedpassword }: User) => {
      try {
        const query = 'INSERT INTO users (name, username, hashedpassword) VALUES ($1, $2, $3) RETURNING *'
        console.log('Creating user with name: ', name, ' username: ', username, ' password: ', hashedpassword)
        const { rows } = await db.query(query, [name, username, hashedpassword])
        console.log('Created user: ', username, ' with id: ', rows[0].id)
        return rows[0]
      } catch (error) {
        throw new Error(error as string)
      }
    },

    updateUser: async (_: unknown, { user }: { user: User }) => {
      try {
        const query =
          'UPDATE users SET name = $2, username = $3, hashedpassword = $4, reviews = $5, favorites = $6 WHERE id = $1 RETURNING *'
        console.log('Updating user with id: ', user.id)
        const { rows } = await db.query(query, [
          user.id,
          user.name,
          user.username,
          user.hashedpassword,
          user.reviews,
          user.favorites,
        ])
        console.log('Updated user: ', user.id)
        return rows[0]
      } catch (error) {
        throw new Error(error as string)
      }
    },

    deleteUser: async (_: unknown, { id }: User) => {
      try {
        const query = 'DELETE FROM users WHERE id = $1 RETURNING *'
        console.log('Deleting user with id: ', id)
        const { rows } = await db.query(query, [id])
        console.log('Deleted user: ', id)
        return rows[0]
      } catch (error) {
        throw new Error(error as string)
      }
    },
  },
}

export default UserResolver
