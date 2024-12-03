import { useState } from 'react'
import { useAddReviewToUserMutation, useCreateReviewMutation, User } from '@Types/__generated__/resolvers-types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReviewSchema, ReviewWriteSchema } from '@Types/schema/reviewSchema'

type UseReviewDialogProps = {
  user: User | null
  destinationId: string
  refetch: () => void
  onReviewSubmit: () => void
}

export const useReviewDialog = ({ user, destinationId, refetch, onReviewSubmit }: UseReviewDialogProps) => {
  const [createReview] = useCreateReviewMutation()
  const [addReviewToUser] = useAddReviewToUserMutation()
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm<ReviewWriteSchema>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: { rating: 0 },
  })

  const onSubmit = async (data: ReviewWriteSchema) => {
    if (data.rating === 0) return

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

      if (!reviewResponse.data?.createReview) {
        console.error('Review creation failed.')
        return
      }

      const reviewID = reviewResponse.data.createReview.id
      const userID = user?.id

      if (userID) {
        await addReviewToUser({ variables: { userID, reviewID } })
      }

      if (data.rating === 5) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 500)
      }

      reset()
      refetch()
      onReviewSubmit()
      setIsOpen(false)
    } catch (error) {
      console.error('Error during review creation:', error)
    }
  }

  return {
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
  }
}
