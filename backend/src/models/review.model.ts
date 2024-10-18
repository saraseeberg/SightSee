import { gql } from "apollo-server-express";


const Review = gql`
    type Review {
        id: ID!
        title: String!
        author: ID!
        rating: Int!
        user: User!
    }
`