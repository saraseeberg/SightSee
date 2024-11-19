import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from '../../src/components/Footer'
import React from 'react'

describe('Footer Component', () => {
  it('renders the footer component correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    
    //Sjekker om teksten er rendret
    expect(screen.getByText("Don't miss out on our newsletter")).toBeInTheDocument()

    //Sjekker at input felt for mail er til stede
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument()

    //Sjekker at abonnere button er til stede
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
  })
})
