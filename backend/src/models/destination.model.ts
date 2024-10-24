import { gql } from 'apollo-server-express'

const Destination = gql`
    type Destination {
        id: Int!
        title: String!
        titleQuestion: String
        description: String!
        categories: [String!]!
        country: String!
        region: String
        image: String!
        alt: String!
        rating: Float!
    }

    type Query {
        getDestination(id: Int!): Destination
        getAllDestinations: [Destination]
    }

    type Mutation {
        createDestination(
            title: String!
            titleQuestion: String
            description: String!
            categories: [String!]!
            country: String!
            region: String
            image: String!
            alt: String!
            rating: Float!
        ): Destination
        deleteDestination(id: Int!): Destination
    }
`

export default Destination
