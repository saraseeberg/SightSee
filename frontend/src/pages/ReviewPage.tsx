import StarReview from '@/components/StarReview'
import { GET_DESTINATION_BY_ID } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

const ReviewPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useQuery(GET_DESTINATION_BY_ID, {
    variables: { id },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading destination details.</p>

  const destination = data.getDestination

  if (!destination) return <p>No destination found for the provided ID.</p>

  return (
    <>
      <main className="grid grid-cols-1">
        <div className="grid justify-center mb-10">
          <h1 className="font-extrabold mb-6 bg-clip-text max-sm:text-4xl max-md:text-6xl md:text-7xl text-center">
            {destination.title}
          </h1>
          <h2 className="font-bold mb-2 bg-clip-text max-sm:text-lg max-md:text-xl md:text-2xl text-center">
            {destination.region}, {destination.country}
          </h2>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2">
          <div className="max-w-sm px-3 max-md:mx-auto md:ml-auto">
            <img src={destination.image} alt={`${destination.title}`} className="w-full h-auto" />
            <p className="font-semibold mt-8">Rating:</p>
            <StarReview
              userRating={destination.rating}
              handleStarClick={(rating: number) => console.log(`User clicked on rating ${rating}`)}
            />
          </div>

          <div className="ml-2 px-3 max-md:mt-5">
            {destination.longDescription && <p>{destination.longDescription}</p>}
          </div>
        </section>
      </main>
    </>
  )
}

export default ReviewPage
