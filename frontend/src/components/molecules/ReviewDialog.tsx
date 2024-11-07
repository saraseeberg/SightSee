import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { DialogClose, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useState } from 'react'
import { Label } from '../ui/label'
import { useCreateReviewMutation } from '@types'

const ReviewSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title cannot exceed 50 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  rating: z.number().min(1, 'Rating must be at least 1 star').max(5, 'Rating cannot exceed 5 stars'),
})
type ReviewSchema = z.infer<typeof ReviewSchema>

type ReviewDialogProps = {
  destinationId: string
}

const ReviewDialog: FC<ReviewDialogProps> = ({ destinationId }) => {
  const [createReview] = useCreateReviewMutation()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReviewSchema>({
    resolver: zodResolver(ReviewSchema),
  })

  const [userRating, setUserRating] = useState(0)

  const onSubmit = async (data: ReviewSchema) => {
    const res = await createReview({
      variables: {
        destinationid: destinationId,
        rating: data.rating,
        text: data.description,
        title: data.title,
        username: 'LotteTotten27',
      },
    })
    console.log(res)
    reset()
  }

  const handleStarClick = (star: number) => {
    setUserRating(star)
    setValue('rating', star)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Write a Review</Button>
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
                <Icon
                  key={star}
                  icon={star <= userRating ? 'ic:round-star' : 'ic:round-star-outline'}
                  onClick={() => handleStarClick(star)}
                  className="text-yellow-400 cursor-pointer w-8 h-8 mr-1"
                  aria-label={`Rate ${star} star`}
                />
              ))}
            </div>
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
          <DialogClose asChild>
            <Button type="submit" className="w-full">
              Submit Review
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewDialog
