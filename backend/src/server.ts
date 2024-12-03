import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express, { Request, Response } from 'express'
import { graphqlUploadExpress } from 'graphql-upload-minimal'
import { verifyToken } from './auth/utils'

const extension = process.env.VITE_FRONTEND_URL ? 'js' : 'ts'

const typesArray = loadFilesSync(__dirname + '/models/*.graphql')
const resolversArray = loadFilesSync(__dirname + `/resolvers/*.${extension}`)

export const typeDefs = mergeTypeDefs(typesArray)
export const resolvers = mergeResolvers(resolversArray)

export interface ApolloContext {
  userId: string
  req: Request
  res: Response
}

const startServer = async () => {
  // Because of a type error between express and apollo-server-express, we need to cast express to any
  // Disabling the type check is not recommended, but it is the only way to get rid of the error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = express() as any

  const corsOptions = {
    origin: [
      'http://it2810-33.idi.ntnu.no',
      'http://localhost:3000',
      'https://studio.apollographql.com/sandbox/explorer',
    ],
    credentials: true,
  }

  app.use(
    cors({
      ...corsOptions,
      exposedHeaders: ['Authorization'],
    }),
  )
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

  const server = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
    cache: 'bounded',
    csrfPrevention: true,
    context: ({ req, res }) => ({
      userId: verifyToken(req),
      req,
      res,
    }),
  })
  await server.start()
  server.applyMiddleware({ app, path: '/graphql', cors: corsOptions })
  app.listen({ port: 3001 }, () => {
    console.log('\x1b[35m--------------------------------- \n')
    console.log('🚀 Server is running on http://localhost:3001/graphql\n')
    console.log('--------------------------------- \x1b[0m\n')
  })
}

startServer().catch((err) => console.error('Server failed to start', err))
