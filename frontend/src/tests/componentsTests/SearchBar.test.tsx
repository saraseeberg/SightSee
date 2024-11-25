import SearchBar from '@/components/SearchBar'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

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
      </ApolloProvider>,
    )

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })
})
