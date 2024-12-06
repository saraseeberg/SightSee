import { gql } from '@apollo/client'

export const GET_PLANNER = gql`
  query GetPlanner {
    planner @client {
      country
      startDate
      endDate
      currentStep
      waypoints {
        destination {
          id
          title
          image
          region
          country
          categories
        }
        startDate
      }
    }
  }
`

export const UPDATE_PLANNER_STATE = gql`
  mutation UpdatePlanner($newPlanner: Planner!) {
    updatePlanner(newPlanner: $newPlanner) @client
  }
`
