import { CommandGroup, CommandItem } from '@/components/ui/command'
import { GET_PLANNER, UPDATE_PLANNER_STATE } from '@/lib/ApolloStateManegment/queries'
import { IPlannerState } from '@/lib/utils'
import { useMutation, useQuery } from '@apollo/client'
import { useGetAllCountriesQuery } from '@Types/__generated__/resolvers-types'
import { FC, useState } from 'react'
import SearchCommand from '../SearchCommand'

interface PSearchCommandProps {
  defaultValue?: string
  className?: string
}

const PSearchCommand: FC<PSearchCommandProps> = ({ className }) => {
  const planner = useQuery(GET_PLANNER).data.planner as IPlannerState
  const { data } = useGetAllCountriesQuery()
  const [val, setVal] = useState<string | undefined>(undefined)
  const [updatePlanner] = useMutation(UPDATE_PLANNER_STATE)

  const handleSelectCountry = async (country: string) => {
    console.log('Step 1 completed:', country)
    try {
      await updatePlanner({
        variables: {
          newPlanner: {
            ...planner,
            country,
            currentStep: 2,
          },
        },
      })
    } catch (error) {
      console.error(error)
    }
    setVal(country)
  }
  return (
    <SearchCommand defaultValue={planner.country} value={val} placeholder="Search for a country" className={className}>
      <CommandGroup heading="Countries">
        {data?.getAllCountries?.map((country) => (
          <CommandItem
            key={country}
            onSelect={() => handleSelectCountry(country)}
            className="hover:bg-accent-1 hover:text-white"
          >
            <span>{country}</span>
          </CommandItem>
        ))}
      </CommandGroup>
    </SearchCommand>
  )
}

export default PSearchCommand
