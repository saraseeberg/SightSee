import { ApolloServer } from "apollo-server-express";
import { UserDB } from "./models/user.model";
import express from 'express';
import UserResolver from "./resolvers/userResolver";



export const typeDefs = UserDB;
export const resolvers = UserResolver;

const startServer = async () => {
    const app = express() as any;

    const server = new ApolloServer({
        typeDefs,
        resolvers
    })
    await server.start();
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () => {
        console.log('\x1b[35m--------------------------------- \n')
        console.log('🚀 Server is running on http://localhost:4000/graphql\n')
        console.log('--------------------------------- \x1b[0m\n')
    })
}

startServer().catch(err => console.error('Server failed to start', err));


