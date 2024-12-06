import { gql } from '@apollo/client'

const typeDefs = gql`
  type Planner {
    country: String
    currentStep: Int!
    startDate: Date
    endDate: Date
    waypoints: [IWaypoint]
  }

  type IWaypoint {
    destination: Destination
    startDate: Date
  }

  type Destination {
    id: ID
    title: String
    image: String
    region: String
    country: String
    categories: [String]
  }

  mutation UpdatePlannerState($newPlanner: Planner!) {
    updatePlannerState(newPlanner: $newPlanner) @client
  }
`

export default typeDefs
