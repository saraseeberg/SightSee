'use client'

import SaveToggle from '@/components/atoms/SaveToggle'
import ReviewDialog from '@/components/molecules/ReviewDialog'
import StarRating from '@/components/molecules/StarRating'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/lib/context/auth-context'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import {
  useGetDestinationByIdQuery,
  useGetFavoritesByUserIdQuery,
  useGetReviewsByDestinationIdQuery,
} from '@Types/__generated__/resolvers-types'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

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

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        <img src={destination.image} alt={destination.title} className="w-full rounded-lg shadow-lg mb-4 md:mb-0" />
        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-4">Description</h3>
          <p>{destination.longdescription}</p>
        </div>
      </section>

      <div className="flex justify-center items-center">
        <ReviewDialog
          destinationId={destination.id}
          refetch={reviewRes.refetch}
          onReviewSubmit={handleReviewToast}
          user={user}
        />
      </div>

      <div className="w-full px-4 py-6">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-sm mx-auto md:max-w-5xl relative px-12"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {reviews.map((review) => {
              return (
                <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/3">
                  <Card className="p-4 flex flex-col gap-4">
                    <CardTitle className="flex flex-col justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        {review.user_avatar && (
                          <img src={review.user_avatar} alt={review.username} className="h-8 w-8 rounded-full" />
                        )}
                        <p className="font-semibold text-sm text-muted-foreground text-center">
                          {review.username || 'Anonymous'}
                        </p>
                      </div>

                      <StarRating rating={review.rating} />
                    </CardTitle>
                    <CardContent className="flex flex-col gap-2 p-0 aspect-square">
                      <h2 className="text-xl font-semibold">{review.title}</h2>

                      <ScrollArea className="h-[100px] w-full">
                        <p>{review.text}</p>
                      </ScrollArea>
                    </CardContent>
                  </Card>
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
      <Toaster />
    </main>
  )
}

export default DestinationDetailsPage
