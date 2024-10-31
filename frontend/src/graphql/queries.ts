import { gql } from '@apollo/client'

export const GET_ALL_DESTINATIONS = gql`
  query {
    getAllDestinations {
      id
      title
      country
      region
      image
      description
      rating
      categories
    }
  }
`
export const GET_DESTINATION_BY_ID = gql`
  query GetDestinationById($id: ID!) {
    getDestination(id: $id) {
      id
      title
      region
      rating
      description
      longdescription
      image
      alt
      country
      categories
    }
  }
`
