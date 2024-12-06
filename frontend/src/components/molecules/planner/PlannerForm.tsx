import { Draggable } from '@/components/atoms/Draggable'
import SmallDestinationCard from '@/components/atoms/SmallDestinationCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GET_PLANNER } from '@/lib/ApolloStateManegment/queries'
import { useQuery } from '@apollo/client'
import { Destination, useGetDestinationsByTextSimilarityQuery } from '@Types/__generated__/resolvers-types'
import { FC } from 'react'
import InputTimeLine from '../InputTimeLine'
import PSearchCommand from './PSearchCommand'

export type Waypoints = {
  destination: Destination
  startDate: Date
}
interface PlannerFormProps {
  className?: string
}

const PlannerForm: FC<PlannerFormProps> = () => {
  const country = useQuery(GET_PLANNER).data.planner.country
  const { data } = useGetDestinationsByTextSimilarityQuery({
    variables: {
      searchText: country || 'Australia',
    },
  })
  const destinations = data?.getDestinationsByTextSimilarity || undefined

  return (
    <>
      <section className="w-full flex">
        <div className="w-2/3 flex flex-col items-center">
          <InputTimeLine />
        </div>
        <div className="fixed right-0 w-1/3 p-3 bg-background border h-fit rounded-lg flex flex-col">
          <PSearchCommand className="w-fit absolute right-6 z-10 h-fit" />
          <h4 className="text-xl font-semibold w-full mt-16 text-center ">
            Drag and Drop destinations into the timeline
          </h4>
          <ScrollArea className=" h-[300px] border rounded-lg">
            {destinations?.map(
              (destination) =>
                destination && (
                  <Draggable key={destination.id}>
                    <SmallDestinationCard key={destination?.id} draggable className="w-2" destination={destination} />
                  </Draggable>
                ),
            )}
          </ScrollArea>
        </div>
      </section>
    </>
  )
}

export default PlannerForm
