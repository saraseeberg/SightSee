import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import './index.css'

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
  console.log('The operation:', operation)
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

const link = ApolloLink.from([afterwareLink, authLink.concat(uploadLink)])
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
      <Toaster />
    </ApolloProvider>
  </StrictMode>,
)
