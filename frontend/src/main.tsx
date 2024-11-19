import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const DATABASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

const client = new ApolloClient({
  uri: `${DATABASE_URL}/graphql`,
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
