import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import Navbar from '../../src/components/Navbar'

// Opprett en mock Apollo Client med MockedProvider
describe('Navbar Component', () => {
  it('renders the navbar component correctly', () => {
    render(
      <MemoryRouter>
        <MockedProvider>
          <Navbar />
        </MockedProvider>
      </MemoryRouter>
    )

    //Sjekker om logoen er der
    expect(screen.getByRole('link', { name: /SightSee/i })).toBeInTheDocument()

    //Sjekker om Browse lenken er der
    expect(screen.getByText('Browse')).toBeInTheDocument()

    //Sjekker at darkmode/lightmode button er der
    expect(screen.getByRole('button', { name: /dark mode|light mode/i })).toBeInTheDocument()
  })
})
