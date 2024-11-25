import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Navbar from '../../components/Navbar'

// Opprett en mock Apollo Client med MockedProvider
describe('Navbar Component', () => {
  it('renders the navbar component correctly', () => {
    render(
      <MemoryRouter>
        <MockedProvider>
          <Navbar />
        </MockedProvider>
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /SightSee/i })).toBeInTheDocument()
    expect(screen.getByText('Browse')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /dark mode|light mode/i })).toBeInTheDocument()
  })
})
