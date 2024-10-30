import { Destination, DestinationResolvers } from '@types'
import db from '../db'

const DestinationResolver: DestinationResolvers = {
  Query: {
    // Henter destinasjon med id
    getDestination: async (_: unknown, { id }: { id: number }) => {
      try {
        const result = await db.query('SELECT * FROM destinations WHERE id = $1', [id])
        return result.rows[0]
      } catch (error) {
        throw new Error(error as string)
      }
    },

    // Henter alle destinasjoner
    getAllDestinations: async () => {
      try {
        const result = await db.query('SELECT * FROM destinations')
        return result.rows
      } catch (error) {
        throw new Error(error as string)
      }
    },
  },

  Mutation: {
    createDestination: async (_: unknown, { destination }: { destination: Destination }) => {
      const { title, titleQuestion, description, longDescription, categories, country, region, image, alt, rating } =
        destination

      try {
        const result = await db.query(
          'INSERT INTO destinations (title, titleQuestion, description, longDescription, categories, country, region, image, alt, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
          [
            title,
            titleQuestion,
            description,
            longDescription,
            JSON.stringify(categories),
            country,
            region,
            image,
            alt,
            rating,
          ],
        )
        return result.rows[0]
      } catch (error) {
        throw new Error(error as string)
      }
    },

    createDestinations: async (_: unknown, { destinations }: { destinations: Destination[] }) => {
      const query = `
        INSERT INTO destinations
          (title, titleQuestion, description, longDescription, categories, country, region, image, alt, rating)
        VALUES
          ${destinations.map((_, i) => `($${i * 10 + 1}, $${i * 10 + 2}, $${i * 10 + 3}, $${i * 10 + 4}, $${i * 10 + 5}::json, $${i * 10 + 6}, $${i * 10 + 7}, $${i * 10 + 8}, $${i * 10 + 9}, $${i * 10 + 10})`).join(', ')}
        RETURNING *;
      `

      const values = destinations.flatMap((destination) => [
        destination.title,
        destination.titleQuestion,
        destination.description,
        destination.longDescription,
        JSON.stringify(destination.categories),
        destination.country,
        destination.region,
        destination.image,
        destination.alt,
        destination.rating,
      ])

      try {
        const result = await db.query(query, values)
        return result.rows
      } catch (error) {
        throw new Error(error as string)
      }
    },

    // Sletter destinasjon med id
    deleteDestination: async (_: unknown, { id }: { id: number }) => {
      try {
        const result = await db.query('DELETE FROM destinations WHERE id = $1 RETURNING *', [id])
        return result.rows[0]
      } catch (error) {
        throw new Error(error as string)
      }
    },
  },
}

export default DestinationResolver
