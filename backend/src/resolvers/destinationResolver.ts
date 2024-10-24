import db from '../db'

// Oppdaterer typen Destination til å inkludere alle nødvendige felter
type Destination = {
  id: number;
  title: string;
  titleQuestion?: string; // valgfritt felt
  description: string;
  categories: string[]; // kan være en array av strenger
  country: string;
  region?: string; // valgfritt felt
  image: string;
  alt: string;
  rating: number;
};

const DestinationResolver = {
  Query: {
    // Henter destinasjon med id
    getDestination: async (_: unknown, { id }: { id: number }) => {
      try {
        const result = await db.query('SELECT * FROM destinations WHERE id = $1', [id]);
        return result.rows[0]; // Forutsatt at du returnerer én rad
      } catch (error) {
        throw new Error(error as string);
      }
    },

    // Henter alle destinasjoner
    getAllDestinations: async () => {
      try {
        const result = await db.query('SELECT * FROM destinations');
        return result.rows;
      } catch (error) {
        throw new Error(error as string);
      }
    },
  },

  Mutation: {
    // Oppretter en ny destinasjon
    createDestination: async (
      _: unknown,
      { title, titleQuestion, description, categories, country, region, image, alt, rating }: Destination
    ) => {
      try {
        const result = await db.query(
          'INSERT INTO destinations (title, titleQuestion, description, categories, country, region, image, alt, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
          [title, titleQuestion, description, categories, country, region, image, alt, rating]
        );
        return result.rows[0]; // Returnerer den nylig opprettede destinasjonen
      } catch (error) {
        throw new Error(error as string);
      }
    },

    // Sletter destinasjon med id
    deleteDestination: async (_: unknown, { id }: { id: number }) => {
      try {
        const result = await db.query('DELETE FROM destinations WHERE id = $1 RETURNING *', [id]);
        return result.rows[0]; // Returnerer den slettede destinasjonen
      } catch (error) {
        throw new Error(error as string);
      }
    },
  },
};

export default DestinationResolver;
