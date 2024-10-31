import { gql } from '@apollo/client'

export const CREATE_REVIEW = gql`
  mutation createReview($destinationid: ID!, $title: String!, $text: String!, $rating: Int!, $username: String!) {
    createReview(destinationid: $destinationid, title: $title, text: $text, rating: $rating, username: $username) {
      id
      rating
      title
      username
      text
    }
  }
`

export const GET_REVIEWS_BY_DESTINATIONID = gql`
  query getReviewsByDestinationID($destinationid: ID!) {
    getReviewsByDestinationID(destinationid: $destinationid) {
      id
      rating
      title
      username
      text
    }
  }
`
