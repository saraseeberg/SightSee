import { Resolvers, Table } from '@types'
import db from '../db'
import { ApolloError } from 'apollo-server-express'

const AdminResolver: Resolvers = {
  Mutation: {
    createTable: async (_: unknown, { table }: { table: Table }) => {
      try {
        const query = `CREATE TABLE IF NOT EXISTS ${table.name} (${table.columns.join(', ')})`
        console.log('Creating table with name: ', table.name, ' columns: ', table.columns)
        await db.query(query)
        console.log('Created table:', table.name)
        return true
      } catch (error) {
        throw new ApolloError(error as string)
      }
    },
    deleteTable: async (_: unknown, { name }: { name: string }) => {
      try {
        const query = `DROP TABLE IF EXISTS ${name}`
        console.log('Deleting table with name: ', name)
        await db.query(query)
        console.log('Deleted table:', name)
        return `Deleted table: ${name}`
      } catch (error) {
        throw new Error(error as string)
      }
    },
  },
}

export default AdminResolver
