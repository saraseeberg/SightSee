import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Review, useDeleteReviewMutation } from '@Types/__generated__/resolvers-types'
import { FC } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import StarRating from './StarRating'
import { useAuth } from '@/lib/context/auth-context'
import { useToast } from '@/hooks/use-toast'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'

interface ReviewCardProps extends Partial<Review> {
  refetch: () => void
}

function getInitials(name: string | undefined): string {
  if (!name) return ''
  const names = name.trim().split(' ')
  const firstInitial = names[0]?.charAt(0).toUpperCase() || ''
  return `${firstInitial}`
}

const ReviewCard: FC<ReviewCardProps> = ({ id, username, user_avatar, title, text, rating, refetch }) => {
  const { user, refetchUser } = useAuth()
  const [deleteReview] = useDeleteReviewMutation()
  const toast = useToast()

  const handleDeleteReview = async () => {
    try {
      await deleteReview({ variables: { id: id as string } })
      refetch()
      refetchUser()
      toast.toast({
        title: 'Review Deleted',
        description: 'Your review has been successfully deleted!',
      })
    } catch (error) {
      console.error('Error deleting review:', error)
      toast.toast({
        title: 'Error',
        description: 'Failed to delete the review. Please try again.',
      })
    }
  }

  return (
    <Card className="p-4 flex flex-col gap-4 overflow-y-auto pt-3">
      <CardTitle className="flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 ">
            <Avatar>
              <AvatarImage src={user_avatar ?? undefined} />
              <AvatarFallback>{getInitials(username)}</AvatarFallback>
            </Avatar>
            <p className="font-semibold text-sm text-muted-foreground text-center">{username || 'Anonymous'}</p>
          </div>
          {user?.username === username && <ConfirmDeleteDialog onConfirm={handleDeleteReview} />}
        </div>
        <div className="mt-1">
          <StarRating rating={rating ?? 0} />
        </div>
      </CardTitle>
      <CardContent className="flex flex-col gap-2 p-0 aspect-square">
        <h2 className="text-xl font-semibold">{title}</h2>
        <ScrollArea className="h-[100px] w-full">
          <p className="text-muted-foreground">{text}</p>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default ReviewCard
