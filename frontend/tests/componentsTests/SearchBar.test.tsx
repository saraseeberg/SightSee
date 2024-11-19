import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import SearchBar from '../../src/components/SearchBar'
import React from 'react'

const mockApolloClient = new ApolloClient({
  uri: 'https://mockapi', 
  cache: new InMemoryCache(),
})

describe('SearchBar Component', () => {
  it('should render the SearchBar component', () => {
    render(
      <ApolloProvider client={mockApolloClient}>
        <BrowserRouter>
          <SearchBar />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })
})
