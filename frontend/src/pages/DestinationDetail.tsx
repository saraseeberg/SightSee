import { useGetDestinationByIdQuery, useGetReviewsByDestinationIdQuery, useGetFavoritesByUserIdQuery } from '@Types/__generated__/resolvers-types'
import { useParams } from 'react-router-dom'
import StarRating from '@/components/molecules/StarRating'
import ReviewDialog from '@/components/molecules/ReviewDialog'
import ReviewCard from '@/components/molecules/ReviewCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { useAuth } from '@/lib/context/auth-context'
import SaveToggle from '@/components/atoms/SaveToggle'
import { useState } from 'react'

const DestinationDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useGetDestinationByIdQuery({
    variables: { id: id as string },
  })

  const reviewRes = useGetReviewsByDestinationIdQuery({
    variables: { destinationid: id as string },
  })

  const { user } = useAuth()
  const toast = useToast()

  const [favorites, setFavorites] = useState<string[]>([])

  const { refetch: refetchFavorites } = useGetFavoritesByUserIdQuery({
    variables: { id: user?.id || '' },
    skip: !user,
    onCompleted: (favoritesData) => {
      const favoriteIds = favoritesData?.getFavoritesByUserID?.map((fav) => fav.id) || []
      setFavorites(favoriteIds)
    },
  })

  const handleReviewToast = () => {
    toast.toast({
      title: 'Review Submitted',
      description: 'Your review has been successfully added!',
    })
  }

  if (loading || reviewRes.loading) return <p>Loading... </p>
  if (error || reviewRes.error) return <p>Error loading destination details. {reviewRes.error?.message}</p>

  const destination = data?.getDestination ?? null

  if (!destination) return <p>No destination found for the provided ID.</p>

  const handleToggleFavorite = async (destinationId: string, isSaved: boolean) => {
    try {
      setFavorites((prevFavorites) =>
        isSaved ? [...prevFavorites, destinationId] : prevFavorites.filter((id) => id !== destinationId),
      )
      await refetchFavorites()
    } catch (error) {
      console.error('Error updating favorites:', error)
    }
  }
  const isFavorite = favorites.includes(destination.id)

  return (
    <main>
      <div className="flex-col text-center mb-6 md:mb-10">
        <div className="flex flex-row gap-2 justify-center mb-2 mt-4 text-4xl md:text-6xl lg:text-7xl">
          <h1 className="font-extrabold">{destination.title}</h1>
          <div>
            {user && destination.id && (
              <SaveToggle
                destinationId={destination.id}
                isInitiallySaved={isFavorite}
                onToggle={(isSaved) => handleToggleFavorite(destination.id, isSaved)}
                className="text-content mt-1 hover:scale-105"
              />
            )}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <StarRating rating={destination.rating} />
        </div>
        <h2 className="font-bold mb-2 text-lg md:text-xl lg:text-2xl">
          {destination.region}, {destination.country}
        </h2>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch p-2">
        {/* Left Column: Image and Rating */}
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
          <img src={destination.image} alt={destination.title} className="w-full h-auto max-w-md mb-4 rounded-md" />
        </div>

        {/* Right Column: Description */}
        <div className="w-full h-full p-4 flex flex-col">
          <h3 className="font-bold text-xl mb-4 text-center">Description</h3>
          {destination.longdescription && <p className="flex-grow">{destination.longdescription}</p>}
        </div>
      </section>

      {/* Responsive Carousel reviews */}
      <section className="mt-4 relative">
        <div className="text-center mb-6">
          <ReviewDialog
            destinationId={destination.id}
            refetch={reviewRes.refetch}
            onReviewSubmit={handleReviewToast}
            user={user}
          />
        </div>
        <Carousel className="relative lg:mx-36">
          <CarouselContent
            className={
              (reviewRes.data?.getReviewsByDestinationID?.length || 0) < 4
                ? 'max-md: justify-start flex space-x-4 px-4 md:px-5 md:justify-center'
                : 'flex space-x-4 px-4 md:px-5'
            }
          >
            {reviewRes.data?.getReviewsByDestinationID?.map((review) => (
              <CarouselItem key={review.id} className="w-full xs:basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
                <ReviewCard {...review} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {(reviewRes.data?.getReviewsByDestinationID?.length || 0) > 1 && (
            <>
              <CarouselPrevious className="sm:flex left-2 md:left-4 top-1/2 transform -translate-y-1/2" />
              <CarouselNext className="sm:flex right-2 md:right-4 top-1/2 transform -translate-y-1/2" />
            </>
          )}
        </Carousel>
      </section>
      <Toaster />
    </main>
  )
}

export default DestinationDetailsPage
