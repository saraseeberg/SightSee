import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Icon } from '@iconify/react/dist/iconify.js'
import { DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { useNavigate } from 'react-router-dom'
import { ConfettiStars } from '../atoms/ConfettiStars'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { useReviewDialog } from '@/hooks/useReviewDialog'
import { Controller } from 'react-hook-form'
import { User } from '@Types/__generated__/resolvers-types'

type ReviewDialogProps = {
  destinationId: string
  refetch: () => void
  onReviewSubmit: () => void
  user: User | null
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({ user, destinationId, refetch, onReviewSubmit }) => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    errors,
    isOpen,
    setIsOpen,
    showConfetti,
    onSubmit,
  } = useReviewDialog({ user, destinationId, refetch, onReviewSubmit })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            if (!user) navigate('/login')
            else setIsOpen(true)
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
                      onClick={() => {
                        setValue('rating', star)
                        clearErrors('rating')
                      }}
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
