import { ApolloClient, ApolloLink, ApolloProvider } from '@apollo/client'
import { persistCache } from 'apollo-cache-persist'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import './index.css'
import resolvers from './lib/ApolloStateManegment/resolvers.ts'
import typeDefs from './lib/ApolloStateManegment/typeDefs.ts'
import { setupPlannerState } from './lib/utils.ts'

const DATABASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  }))
  return forward(operation)
})

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext()
    const authHeader = context.response.headers.get('Authorization')

    if (authHeader) {
      // cut off the 'Bearer ' part from the header
      const token = authHeader.replace('Bearer ', '')

      localStorage.setItem('token', token)
    }

    return response
  })
})

const uploadLink = createUploadLink({
  uri: `${DATABASE_URL}/graphql`,
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
})

const cache = setupPlannerState()
export const setUpPersistance = async () => {
  try {
    await persistCache({
      cache: cache,
      storage: {
        getItem: (key) => {
          const value = window.localStorage.getItem(key)
          return value ? JSON.parse(value) : null
        },
        setItem: (key, data) => {
          window.localStorage.setItem(key, JSON.stringify(data))
        },
        removeItem: (key) => {
          window.localStorage.removeItem(key)
        },
      },
    })
  } catch (error) {
    console.error('Error restoring Apollo cache', error)
  }
}
const link = ApolloLink.from([afterwareLink, authLink.concat(uploadLink)])

const client = new ApolloClient({
  link: link,
  cache: cache,
  typeDefs: typeDefs,
  resolvers: resolvers,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
      <Toaster />
    </ApolloProvider>
  </StrictMode>,
)
