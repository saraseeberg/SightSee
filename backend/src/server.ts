import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import cors from 'cors'
import AdminResolver from './resolvers/adminResolver'
import DestinationResolver from './resolvers/destinationResolver'
import reviewResolver from './resolvers/reviewResolver'
import UserResolver from './resolvers/userResolver'
import { graphqlUploadExpress } from 'graphql-upload-minimal'

const typesArray = loadFilesSync(__dirname + '/models/*.graphql')
const resolversArray = [AdminResolver, DestinationResolver, reviewResolver, UserResolver]

export const typeDefs = mergeTypeDefs(typesArray)
export const resolvers = mergeResolvers(resolversArray)

const startServer = async () => {
  // Because of a type error between express and apollo-server-express, we need to cast express to any
  // Disabling the type check is not recommended, but it is the only way to get rid of the error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = express() as any

  app.use(cors())
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: 'bounded',
    csrfPrevention: true
  })
  await server.start()
  server.applyMiddleware({ app })
  app.listen({ port: 3001 }, () => {
    console.log('\x1b[35m--------------------------------- \n')
    console.log('🚀 Server is running on http://localhost:3001/graphql\n')
    console.log('--------------------------------- \x1b[0m\n')
  })
}

startServer().catch((err) => console.error('Server failed to start', err))
