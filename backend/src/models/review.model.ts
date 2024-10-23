import { gql } from 'apollo-server-express'

const Review = gql`
  type Review {
    id: Int!
    title: String!
    author: Int!
    rating: Float!
    user: User!
  }
`

export default Review
