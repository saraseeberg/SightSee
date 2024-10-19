import db from '../db'
import { User } from '@/models/user.model'

const UserResolver = {
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
  },
}

export default UserResolver
