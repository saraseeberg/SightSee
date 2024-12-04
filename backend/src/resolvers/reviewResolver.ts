import { authenticateUser } from '@/auth/utils'
import { s3 } from '@/s3/s3Provider'
import { ApolloContext } from '@/server'
import { Review, ReviewResolvers } from '@Types/__generated__/resolvers-types'
import { ReviewSchema } from '@Types/schema/reviewSchema'
import { ApolloError } from 'apollo-server-express'
import { ZodError } from 'zod'
import db from '../db'

const reviewResolver: ReviewResolvers = {
  Query: {
    getReviews: async () => {
      const query = 'SELECT * FROM reviews'
      const { rows } = await db.query(query)
      return rows
    },
    getReviewByID: async (_: unknown, { id }: Review) => {
      const query = 'SELECT * FROM reviews WHERE id = $1'
      const { rows } = await db.query(query, [id])
      return rows[0]
    },
    getReviewsByDestinationID: async (_: unknown, { destinationid }: Review) => {
      const query = `
        SELECT 
          r.id,
          r.title,
          r.text,
          r.rating,
          r.username,
          r.destinationid,
          u.image AS user_avatar
        FROM reviews r
        LEFT JOIN users u ON r.username = u.username
        WHERE r.destinationid = $1
      `

      try {
        const { rows } = await db.query(query, [destinationid])

        console.log('Fetched reviews:', rows)

        // Fetch signed URLs for user avatars if needed
        for (const review of rows) {
          if (review.user_avatar) {
            try {
              review.user_avatar = await s3.get(review.user_avatar)
            } catch (error) {
              console.error('Failed to fetch user avatar from S3:', error)
              review.user_avatar = null // Fallback to null if S3 fetch fails
            }
          }
        }

        console.log('Processed reviews with avatars:', rows)
        return rows
      } catch (error) {
        console.error('Error fetching reviews for destination:', error)
        throw new ApolloError(`Could not get reviews for destination: ${error}`, 'INTERNAL_SERVER_ERROR')
      }
    },
    getReviewsByUserID: async (_: unknown, { id }: { id: string }) => {
      const query = 'SELECT * FROM reviews WHERE username = $1'
      const { rows } = await db.query(query, [id])
      return rows
    },
  },

  Mutation: {
    createReview: async (
      _: unknown,
      { title, text, rating, username, destinationid }: Review,
      contextValue: ApolloContext,
    ) => {
      try {
        ReviewSchema.parse({ title, description: text, rating })
      } catch (error) {
        if (error instanceof ZodError) {
          throw new ApolloError(error.message, 'BAD_USER_INPUT')
        }
      }
      const q = 'SELECT id FROM users WHERE username = $1'
      const res = await db.query(q, [username])
      if (res.rows.length < 1) {
        throw new ApolloError('User not found', 'BAD_USER_INPUT')
      }
      const userid = res.rows[0].id

      authenticateUser(contextValue, userid)
      try {
        const query =
          'INSERT INTO reviews (title, text, rating, username, destinationid) VALUES ($1, $2, $3, $4, $5) RETURNING *'
        const { rows } = await db.query(query, [title, text, rating, username, destinationid])
        return rows[0]
      } catch (error) {
        throw new ApolloError('Could not create review: ' + error, 'INTERNAL_SERVER_ERROR')
      }
    },

    deleteReview: async (_: unknown, { id }: Review) => {
      const query = 'DELETE FROM reviews WHERE id = $1 RETURNING *'
      const { rows } = await db.query(query, [id])
      return rows[0]
    },
  },
}

export default reviewResolver
