import { InMemoryCache } from '@apollo/client'
import { IPlannerState } from '../utils'
import { GET_PLANNER } from './queries'

const resolvers = {
  Mutation: {
    updatePlanner: (_: unknown, { newPlanner }: { newPlanner: IPlannerState }, { cache }: { cache: InMemoryCache }) => {
      const data = {
        planner: newPlanner,
      }
      cache.writeQuery({
        query: GET_PLANNER,
        data,
      })
    },
  },
}

export default resolvers
