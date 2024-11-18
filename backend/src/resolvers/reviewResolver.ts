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
    getReviewsByDestinationID: async (_: unknown, { destinationid }: Review) => {
      const query = 'SELECT * FROM reviews WHERE destinationid = $1'
      const { rows } = await db.query(query, [destinationid])
      return rows
    },
    getReviewsByUserID: async (_: unknown, { id }: { id: string }) => {
      const query = 'SELECT * FROM reviews WHERE username = $1';
      const { rows } = await db.query(query, [id]);
      return rows;
    },
  },
  Review: {
    destination: async (review: Review) => {
      const query = 'SELECT * FROM destinations WHERE id = $1';
      const { rows } = await db.query(query, [review.destinationid]);
      return rows[0];
    },
  },

  Mutation: {
    createReview: async (_: unknown, { title, text, rating, username, destinationid }: Review) => {
      const query =
        'INSERT INTO reviews (title, text, rating, username, destinationid) VALUES ($1, $2, $3, $4, $5) RETURNING *'
      const { rows } = await db.query(query, [title, text, rating, username, destinationid])
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
