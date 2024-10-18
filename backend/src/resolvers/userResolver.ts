import db from "../db";
import { User } from "@/models/user.model";




const UserResolver = {
    Query: {
        users: async (_: any, ids: [number]) => {
            if (ids) {
                const query = 'SELECT * FROM users WHERE id = ANY($1)';
                const { rows } = await db.query(query, [ids]);
                return rows;
            }
            const query = 'SELECT * FROM users';
            const { rows } = await db.query(query);
            return rows;
        },
        user: async (_: any, id: number) => {
            const query = 'SELECT * FROM users WHERE id = $1';
            const { rows } = await db.query(query, [id]);
            return rows[0];
        }

    },

    Mutation: {
        createUser: async (_: any, { name, username, hashedpassword }: User) => {
            try {
                const query = 'INSERT INTO users (name, username, hashedpassword) VALUES ($1, $2, $3) RETURNING *';
                console.log("Creating user with name: ", name, " username: ", username, " password: ", hashedpassword);
                const { rows } = await db.query(query, [name, username, hashedpassword]);
                console.log("User created: ");
                return rows[0];
            } catch (error: any) {
                throw new Error(error);
            }
        }
    }
}

export default UserResolver;