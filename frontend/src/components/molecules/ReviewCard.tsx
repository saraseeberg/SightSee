import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const ReviewSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title cannot exceed 50 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  rating: z.number().min(1, 'Rating must be at least 1 star').max(5, 'Rating cannot exceed 5 stars'),
})
type ReviewSchema = z.infer<typeof ReviewSchema>

function ReviewCard() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReviewSchema>({
    resolver: zodResolver(ReviewSchema),
  })

  const [userRating, setUserRating] = useState(0)

  const onSubmit = (data: ReviewSchema) => {
    console.log(data)
  }

  const handleStarClick = (star: number) => {
    setUserRating(star)
    setValue('rating', star)
  }

  return (
    <Card className="mx-auto max-w-md m-2">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Write a Review</CardTitle>
        <CardDescription>Share your experience by rating and leaving a review below</CardDescription>
      </CardHeader>
      <CardContent>
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

          <Button type="submit" className="w-full">
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ReviewCard
