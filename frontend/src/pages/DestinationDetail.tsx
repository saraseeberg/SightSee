'use client'

import SaveToggle from '@/components/atoms/SaveToggle'
import ReviewCard from '@/components/molecules/ReviewCard'
import ReviewDialog from '@/components/molecules/ReviewDialog'
import StarRating from '@/components/molecules/StarRating'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/lib/context/auth-context'
import {
  useGetDestinationByIdQuery,
  useGetFavoritesByUserIdQuery,
  useGetReviewsByDestinationIdQuery,
} from '@Types/__generated__/resolvers-types'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const DestinationDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data } = useGetDestinationByIdQuery({
    variables: { id: id as string },
  })

  const reviewRes = useGetReviewsByDestinationIdQuery({
    variables: { destinationid: id as string },
  })

  const { user } = useAuth()
  const toast = useToast()

  const [favorites, setFavorites] = useState<string[]>([])

  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])

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

  const reviews = reviewRes.data?.getReviewsByDestinationID || []

  return (
    <main>
      <div className="flex flex-col justify-center items-center mb-8 md:mb-12">
        <div className="flex flex-row items-center justify-center gap-2 mt-4 mb-4 text-4xl md:text-6xl">
          <h1 className="font-extrabold">{destination.title}</h1>
          {user && destination.id && (
            <SaveToggle
              destinationId={destination.id}
              isInitiallySaved={isFavorite}
              onToggle={(isSaved) => handleToggleFavorite(destination.id, isSaved)}
              className="hover:scale-105"
            />
          )}
        </div>
        <StarRating rating={destination.rating} />
        <h2 className="font-bold text-lg md:text-xl mt-2">
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

      <div id="reviews" className="flex justify-center items-center">
        <ReviewDialog
          destinationId={destination.id}
          refetch={reviewRes.refetch}
          onReviewSubmit={handleReviewToast}
          user={user}
        />
      </div>

      {(reviews.length > 0 || reviewRes.loading) && (
        <div className="w-full px-4 py-6">
          <Carousel
            opts={{
              align: 'start',
              loop: false,
            }}
            className="w-full max-w-sm mx-auto md:max-w-5xl relative px-12"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review) => {
                return (
                  <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/3">
                    <ReviewCard refetch={reviewRes.refetch} {...review} />
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <CarouselPrevious className="relative left-0 translate-x-0 bg-background border border-input hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full" />
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <CarouselNext className="relative right-0 translate-x-0 bg-background border border-input hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full" />
            </div>
          </Carousel>
        </div>
      )}
      <Toaster />
    </main>
  )
}

export default DestinationDetailsPage
