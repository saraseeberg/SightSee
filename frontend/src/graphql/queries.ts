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

export const GET_FEATURED_DESTINATIONS = gql`
  query GetFeaturedDestinations {
    getFeaturedDestinations {
      id
      image
      categories
      titlequestion
      country
    }
  }
`
export const GET_COUNTRIES = gql`
  query {
    getAllDestinations {
      country
    }
  }
`
