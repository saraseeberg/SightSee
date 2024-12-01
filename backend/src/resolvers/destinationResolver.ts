import { Destination, DestinationInput, PaginatedDestinations, Resolvers } from '@Types/__generated__/resolvers-types'
import { ApolloError } from 'apollo-server-express'
import db from '../db'

const DestinationResolver: Resolvers = {
  Query: {
    // Henter destinasjon med id
    getDestination: async (_: unknown, { id }: { id: string }) => {
      try {
        const result = await db.query('SELECT * FROM destinations WHERE id = $1', [id])
        return result.rows[0]
      } catch (error) {
        throw new Error(error as string)
      }
    },

    getAllDestinations: async (
      _: unknown,
      {
        page,
        limit,
        country,
        sorting,
        categories,
      }: {
        page: number
        limit: number
        country?: string | null
        sorting?: string | null
        categories?: string[] | null
      },
    ) => {
      try {
        const whereClauses: string[] = []
        const values: (string | number)[] = []
        let idx = 1

        // Remove categories filtering from SQL

        if (country && country !== 'World') {
          whereClauses.push(`country = $${idx}`)
          values.push(country)
          idx++
        }

        let orderByClause = ''
        if (sorting) {
          if (sorting === 'Best Rated') {
            orderByClause = 'ORDER BY rating DESC'
          } else if (sorting === 'Worst Rated') {
            orderByClause = 'ORDER BY rating ASC'
          } else if (sorting === 'A - Z') {
            orderByClause = 'ORDER BY title ASC'
          } else if (sorting === 'Z - A') {
            orderByClause = 'ORDER BY title DESC'
          }
        }

        const whereClause = whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : ''

        // Fetch all data matching the filters except categories
        const dataQuery = `SELECT * FROM destinations ${whereClause} ${orderByClause}`
        const result = await db.query(dataQuery, values)

        // Now, filter the results in TypeScript based on categories
        let destinations = result.rows

        if (categories && categories.length > 0) {
          destinations = destinations.filter((destination: Destination) =>
            categories.some((category) => destination.categories.includes(category)),
          )
        }

        const totalCount = destinations.length

        // Now apply pagination in TypeScript
        const start = (page - 1) * limit
        const paginatedDestinations = destinations.slice(start, start + limit)

        return {
          destinations: paginatedDestinations,
          totalCount,
        } as PaginatedDestinations
      } catch (error) {
        throw new Error(error as string)
      }
    },

    getDestinationsByTextSimilarity: async (_: unknown, { searchText }: { searchText: string }) => {
      try {
        const result = await db.query(
          `SELECT * FROM destinations WHERE title ILIKE $1 OR country ILIKE $1 OR region ILIKE $1`,
          [`${searchText}%`],
        )
        return result.rows
      } catch (error) {
        throw new Error(error as string)
      }
    },

    getAllCountries: async () => {
      try {
        const result = await db.query('SELECT DISTINCT country FROM destinations')
        const countries = result.rows.map((row) => row.country)
        return countries
      } catch (error) {
        throw new Error(error as string)
      }
    },

    getFeaturedDestinations: async () => {
      // get all destination with `titlequestion` field
      try {
        const result = await db.query('SELECT * FROM destinations WHERE titlequestion IS NOT NULL')
        return result.rows
      } catch (error) {
        throw new Error(error as string)
      }
    },
  },

  Mutation: {
    createDestination: async (_: unknown, { destination }: { destination: DestinationInput }) => {
      const { title, titlequestion, description, longdescription, categories, country, region, image, alt, rating } =
        destination

      try {
        const result = await db.query(
          'INSERT INTO destinations (title, titlequestion, description, longdescription, categories, country, region, image, alt, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
          [
            title,
            titlequestion,
            description,
            longdescription,
            JSON.stringify(categories),
            country,
            region,
            image,
            alt,
            rating,
          ],
        )
        return result.rows[0] as Destination
      } catch (error) {
        throw new ApolloError(('Could not create destination ' + title + ': ' + error) as string)
      }
    },

    createDestinations: async (_: unknown, { destinations }: { destinations: DestinationInput[] }) => {
      const query = `
        INSERT INTO destinations
          (title, titlequestion, description, longdescription, categories, country, region, image, alt, rating)
        VALUES
          ${destinations.map((_, i) => `($${i * 10 + 1}, $${i * 10 + 2}, $${i * 10 + 3}, $${i * 10 + 4}, $${i * 10 + 5}::json, $${i * 10 + 6}, $${i * 10 + 7}, $${i * 10 + 8}, $${i * 10 + 9}, $${i * 10 + 10})`).join(', ')}
        RETURNING *;
      `

      const values = destinations.flatMap((destination) => [
        destination.title,
        destination.titlequestion,
        destination.description,
        destination.longdescription,
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
        throw new ApolloError(('Could not create destinations: ' + error) as string)
      }
    },

    // Sletter destinasjon med id
    deleteDestination: async (_: unknown, { id }: { id: string }) => {
      try {
        const result = await db.query('DELETE FROM destinations WHERE id = $1 RETURNING *', [id])
        return result.rows[0] as Destination
      } catch (error) {
        throw new ApolloError(('Could not delete Destination: ' + error) as string)
      }
    },
  },
  Destination: {
    reviews: async (destination: Destination) => {
      try {
        const result = await db.query('SELECT * FROM reviews WHERE destination_id = $1', [destination.id])
        return result.rows
      } catch (error) {
        throw new ApolloError(('Could not get reviews for destination: ' + error) as string)
      }
    },
  },
}

export default DestinationResolver
