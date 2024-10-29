import { gql } from 'apollo-server-express'

const Destination = gql`
  type Destination {
    id: ID!
    title: String!
    titleQuestion: String
    description: String!
    longDescription: String
    categories: [String]!
    country: String!
    region: String
    image: String!
    alt: String!
    rating: Float!
  }

  input DestinationInput {
    title: String!
    titleQuestion: String
    description: String!
    longDescription: String!
    categories: [String]!
    country: String!
    region: String
    image: String!
    alt: String!
    rating: Float!
  }

  type Query {
    getDestination(id: ID!): Destination
    getAllDestinations: [Destination]
  }

  type Mutation {
    createDestination(destination: DestinationInput): Destination

    createDestinations(destinations: [DestinationInput!]!): [Destination!]!

    deleteDestination(id: ID!): Destination
  }
`

export default Destination
