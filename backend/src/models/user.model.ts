import { gql } from 'apollo-server-express'

type User = {
  id: number
  name: string
  username: string
  hashedpassword: string
  reviews?: number[]
  favorites?: number[]
}

const UserDB = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    hashedpassword: String!
    reviews: [Int]
    favorites: [Int]
  }

  type Query {
    getUsers: [User]
    getUsersByID(ids: [ID]): [User]
    getUserByID(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, username: String!, hashedpassword: String!): User
    updateUser(id: Int!, data: String!): User
    deleteUser(id: Int!): User
  }
`

export { User, UserDB }
