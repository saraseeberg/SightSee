import db from '../db'

type Destination = {
  id: number
  title: string
  titleQuestion?: string
  description: string
  categories: string[]
  country: string
  region?: string
  image: string
  alt: string
  rating: number
}

const DestinationResolver = {
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
    // Oppretter en ny destinasjon
    createDestination: async (
      _: unknown,
      { title, titleQuestion, description, categories, country, region, image, alt, rating }: Destination,
    ) => {
      try {
        const result = await db.query(
          'INSERT INTO destinations (title, titleQuestion, description, categories, country, region, image, alt, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
          [title, titleQuestion, description, categories, country, region, image, alt, rating],
        )
        return result.rows[0]
      } catch (error) {
        throw new Error(error as string)
      }
    },

    // Oppretter flere nye destinasjoner
    createDestinations: async (_: unknown, { destinations }: { destinations: Destination[] }) => {
      const query = `
        INSERT INTO destinations 
          (title, titleQuestion, description, categories, country, region, image, alt, rating) 
        VALUES 
          ${destinations.map((_, i) => `($${i * 9 + 1}, $${i * 9 + 2}, $${i * 9 + 3}, $${i * 9 + 4}, $${i * 9 + 5}, $${i * 9 + 6}, $${i * 9 + 7}, $${i * 9 + 8}, $${i * 9 + 9})`).join(', ')}
        RETURNING *;
      `

      const values = destinations.flatMap((destination) => [
        destination.title,
        destination.titleQuestion,
        destination.description,
        destination.categories,
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
