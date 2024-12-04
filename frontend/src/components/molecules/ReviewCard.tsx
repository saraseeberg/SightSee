import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Review, useDeleteReviewMutation } from '@Types/__generated__/resolvers-types'
import { FC } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import StarRating from './StarRating'
import { Icon } from '@iconify/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { useAuth } from '@/lib/context/auth-context'
import { useToast } from '@/hooks/use-toast'

interface ReviewCardProps extends Partial<Review> {
  refetch: () => void
}

const ReviewCard: FC<ReviewCardProps> = ({ id, username, title, text, rating, image, refetch }) => {
  const { user, refetchUser } = useAuth()
  const [deleteReview] = useDeleteReviewMutation({ variables: { id: id as string } })
  const toast = useToast()

  const handleDeleteReview = async () => {
    try {
      await deleteReview()
      refetch()
      refetchUser()
      toast.toast({
        title: 'Review Deleted',
        description: 'Your review has been successfully deleted!',
      })
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="max-w-xs h-80 w-full pt-2 overflow-y-auto rounded-lg shadow-lg flex flex-col px-6 space-y-2">
        {/* Profile Picture and Username */}
        <div className="flex justify-between flex-row">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={image as string} alt={`${username}'s profile picture`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-semibold text-sm text-center">{username || 'Anonymous'}</p>
          </div>
          {/* Delete Button */}
          {user?.username === username && (
            <TooltipProvider>
              <Tooltip>
                <TooltipContent className="text-primary bg-background shadow-md text-sm pl-2 pr-2 rounded-md">
                  Delete review
                </TooltipContent>
                <TooltipTrigger asChild>
                  <button onClick={() => handleDeleteReview()} className="rounded-full" aria-label="Delete review">
                    <Icon icon="material-symbols:delete-outline" className="text-content size-8 hover:text-red-500" />
                  </button>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* Rating */}
        <CardContent className="flex flex-col space-y-3">
          <StarRating rating={rating ?? 0} />

          {/* Review Title and Text */}
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription>{text}</CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}

export default ReviewCard
