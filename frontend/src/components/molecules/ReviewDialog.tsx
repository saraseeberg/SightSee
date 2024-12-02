import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react/dist/iconify.js'
import { DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { useAddReviewToUserMutation, useCreateReviewMutation, User } from '@Types/__generated__/resolvers-types'
import { ReviewSchema, ReviewWriteSchema } from '@Types/schema/reviewSchema'
import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ConfettiStars } from '../atoms/ConfettiStars'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

type ReviewDialogProps = {
  destinationId: string
  refetch: () => void
  onReviewSubmit: () => void
  user: User | null
}

const ReviewDialog: FC<ReviewDialogProps> = ({ user, destinationId, refetch, onReviewSubmit }) => {
  const [createReview] = useCreateReviewMutation()
  const [addReviewToUser] = useAddReviewToUserMutation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm<ReviewWriteSchema>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      rating: 0,
    },
  })

  const onSubmit = async (data: ReviewWriteSchema) => {
    if (data.rating === 0) {
      return; 
    }
    try {
      const reviewResponse = await createReview({
        variables: {
          destinationid: destinationId,
          rating: data.rating,
          text: data.description,
          title: data.title,
          username: user?.username || 'Anonymous',
        },
      })

      if (reviewResponse.errors) {
        console.error('Review creation error:', reviewResponse.errors)
        return
      }

      const reviewID = reviewResponse.data?.createReview?.id
      if (!reviewID) {
        console.error('No review ID returned from createReview mutation')
        return
      }
      const userID = user?.id
      if (userID) {
        const userResponse = await addReviewToUser({
          variables: { userID, reviewID },
        })

        if (userResponse.errors) {
          console.error('Error linking review to user:', userResponse.errors)
        }
      } else {
        console.error('No user ID found. User may not be logged in.')
      }
      if (data.rating === 5) {
        setShowConfetti(true)
        setTimeout(() => {
          setShowConfetti(false)
        }, 500)
      }

      reset()
      refetch()
      onReviewSubmit()
      setIsOpen(false)
    } catch (error) {
      console.error('Error during review creation and linking to user:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            if (!user) {
              navigate('/login')
            } else {
              setIsOpen(true)
            }
          }}
        >
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6 rounded-lg shadow-lg text-content">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Write a Review</DialogTitle>
          <DialogDescription>Share your experience by rating and leaving a review below</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <section aria-labelledby="rate-this-place">
            <Label id="rate-this-place" className="font-semibold">
              Rate this place:
            </Label>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Controller
                  key={star}
                  control={control}
                  name="rating"
                  render={({ field }) => (
                    <Icon
                      icon={star <= field.value ? 'ic:round-star' : 'ic:round-star-outline'}
                      onClick={() => setValue('rating', star)} // Dynamically updates rating
                      className="text-yellow-400 cursor-pointer w-8 h-8 mr-1"
                      aria-label={`Rate ${star} star`}
                    />
                  )}
                />
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-xs mt-2" role="alert">
                {errors.rating.message || 'Please select a rating between 1 and 5 stars.'}
              </p>
            )}
          </section>

          <div>
            <Label htmlFor="title">Review Title</Label>
            <Input id="title" type="text" error={errors.title?.message} {...register('title', { required: true })} />
          </div>

          <div>
            <Label htmlFor="description">Review Description</Label>
            <Textarea
              id="description"
              className="resize-none"
              error={errors.description?.message}
              {...register('description', { required: true })}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Review
          </Button>
          <ConfettiStars trigger={showConfetti} />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewDialog