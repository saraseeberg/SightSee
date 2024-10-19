import { gql } from 'apollo-server-express'

const adminDB = gql`
  type Table {
    name: String
    columns: [String]
  }

  type Mutation {
    createTable(name: String!, columns: [String!]!): Table
    deleteTable(name: String!): Table
  }
`

export default adminDB
