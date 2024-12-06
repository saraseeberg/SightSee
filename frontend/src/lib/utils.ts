import { gql, InMemoryCache } from '@apollo/client'
import { Destination } from '@Types/__generated__/resolvers-types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface IPlannerState {
  country: string
  startDate: Date | null
  currentStep: number
  endDate: Date | null
  waypoints:
    | {
        destination: Destination | null
        startDate: Date | null
      }[]
    | null
}

export const initialState: IPlannerState = {
  country: '',
  currentStep: 0,
  startDate: null,
  endDate: null,
  waypoints: null,
}
export const setupPlannerState = () => {
  const cache = new InMemoryCache()

  cache.writeQuery({
    query: gql`
      query GetPlanner {
        planner @client {
          country
          currentStep
          startDate
          endDate
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
    `,
    data: {
      planner: initialState,
    },
  })

  return cache
}
