import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const DATABASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'
const uploadLink = createUploadLink({
  uri: `${DATABASE_URL}/graphql`,
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
  credentials: 'include',
})

const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
