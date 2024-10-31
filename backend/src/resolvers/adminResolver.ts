import { Table, TableResolvers } from '@types'
import db from '../db'

const AdminResolver: TableResolvers = {
  Mutation: {
    createTable: async (_: unknown, { name, columns }: Table) => {
      try {
        const query = `CREATE TABLE IF NOT EXISTS ${name} (${columns.join(', ')})`
        console.log('Creating table with name: ', name, ' columns: ', columns)
        await db.query(query)
        console.log('Created table:', name)
        return { name, columns }
      } catch (error) {
        throw new Error(error as string)
      }
    },
    deleteTable: async (_: unknown, { name }: Table) => {
      try {
        const query = `DROP TABLE IF EXISTS ${name}`
        console.log('Deleting table with name: ', name)
        await db.query(query)
        console.log('Deleted table:', name)
        return { name }
      } catch (error) {
        throw new Error(error as string)
      }
    },
  },
}

export default AdminResolver
