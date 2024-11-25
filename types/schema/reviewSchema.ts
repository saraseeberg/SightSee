import { z } from 'zod'

const ReviewSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title cannot exceed 50 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  rating: z.number().min(1, 'Rating must be at least 1 star').max(5, 'Rating cannot exceed 5 stars'),
})

type ReviewWriteSchema = z.infer<typeof ReviewSchema>

export { ReviewSchema, type ReviewWriteSchema }
