import { Card } from '@/components/ui/card'
import { GET_DESTINATION_BY_ID } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { Destination, Review } from '@types'
import { useParams } from 'react-router-dom'
import StarRating from '@/components/molecules/StarRating'
import ReviewDialog from '@/components/molecules/ReviewDialog'
import { GET_REVIEWS_BY_DESTINATIONID } from '@/graphql/review'
import ReviewCard from '@/components/molecules/ReviewCard'

const ReviewPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useQuery<{ getDestination: Destination }>(GET_DESTINATION_BY_ID, {
    variables: { id },
  })
  const reviewRes = useQuery<{ getReviewsByDestinationID: Review[] }>(GET_REVIEWS_BY_DESTINATIONID, {
    variables: { destinationid: id },
  })

  if (loading || reviewRes.loading) return <p>Loading... </p>
  if (error || reviewRes.error) return <p>Error loading destination details. {reviewRes.error?.message}</p>

  const destination = data?.getDestination ?? null
  console.log(data)
  console.log(reviewRes.data)

  if (!destination) return <p>No destination found for the provided ID.</p>

  return (
    <main>
      <div className="text-center mb-10">
        <h1 className="font-extrabold mb-6 max-sm:text-4xl max-md:text-6xl md:text-7xl">{destination.title}</h1>
        <h2 className="font-bold mb-2 max-sm:text-lg max-md:text-xl md:text-2xl">
          {destination.region}, {destination.country}
        </h2>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch p-2">
        {/* Left Column: Image and Rating */}
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
          <img src={destination.image} alt={destination.title} className="w-full h-auto max-w-md mb-4 rounded-md" />
          <Card className="text-center p-4 px-14">
            <p className="font-semibold mt-2">Current rating:</p>
            <StarRating rating={destination.rating} />
            <ReviewDialog destinationId={parseInt(destination.id)} />
          </Card>
        </div>

        {/* Right Column: Description */}
        <div className="w-full h-full p-4 flex flex-col">
          <h3 className="font-bold text-xl mb-4 text-center">Description</h3>
          {destination.longdescription && <p className="flex-grow">{destination.longdescription}</p>}
        </div>
      </section>
      <section>
        {reviewRes.data?.getReviewsByDestinationID.map((review) => <ReviewCard key={review.id} {...review} />)}
      </section>
    </main>
  )
}

export default ReviewPage
