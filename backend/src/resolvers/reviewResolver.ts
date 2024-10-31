import { Review, ReviewResolvers } from '@types'
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
  },

  Mutation: {
    createReview: async (_: unknown, { title, text, rating, username }: Review) => {
      const query = 'INSERT INTO reviews (title, text, rating, username) VALUES ($1, $2, $3, $4) RETURNING *'
      const { rows } = await db.query(query, [title, text, rating, username])
      return rows[0]
    },

    deleteReview: async (_: unknown, { id }: Review) => {
      const query = 'DELETE FROM reviews WHERE id = $1 RETURNING *'
      const { rows } = await db.query(query, [id])
      return rows[0]
    },
  },
}

export default reviewResolver
