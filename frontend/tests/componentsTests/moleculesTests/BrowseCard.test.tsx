import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import BrowseCard from '../../../src/components/molecules/BrowseCard'
import '@testing-library/jest-dom'

vi.mock('@iconify/react', () => ({
  Icon: vi.fn(({ icon }: { icon: string }) => <span data-testid={`icon-${icon}`} />),
}))

describe('BrowseCard', () => {
  const mockCardData = {
    image: 'https://example.com/image.jpg',
    alt: 'Beautiful destination',
    title: 'Tropical Paradise',
    region: 'Caribbean',
    country: 'Bahamas',
    rating: 4.8,
  }

  const mockOnClick = vi.fn()

  it('renders correctly with all props', () => {
    render(<BrowseCard card={mockCardData} onClick={mockOnClick} />)

    const image = screen.getByRole('img', { name: /beautiful destination/i })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockCardData.image)

    const title = screen.getByRole('heading', { name: /Tropical Paradise/i })
    expect(title).toBeInTheDocument()

    expect(screen.getByText('Caribbean, Bahamas')).toBeInTheDocument()

    expect(screen.getByText(mockCardData.rating.toString())).toBeInTheDocument()

    expect(screen.getByTestId('icon-ic:round-star')).toBeInTheDocument()
  })

  it('renders without optional props', () => {
    render(<BrowseCard card={{ title: 'Minimal Card' }} />)

    const title = screen.getByRole('heading', { name: /Minimal Card/i })
    expect(title).toBeInTheDocument()

    expect(screen.queryByText(/caribbean/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/bahamas/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/4.8/i)).not.toBeInTheDocument()

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '')
  })

  it('calls onClick when clicked', () => {
    render(<BrowseCard card={mockCardData} onClick={mockOnClick} />)

    const card = screen.getByRole('article')
    fireEvent.click(card)

    expect(mockOnClick).toHaveBeenCalled()
  })

  it('applies additional class names', () => {
    render(<BrowseCard card={mockCardData} className="extra-class" />)

    const card = screen.getByRole('article')
    expect(card).toHaveClass('extra-class')
  })

  it('handles missing image gracefully', () => {
    render(<BrowseCard card={{ title: 'No Image Card' }} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'Image')
  })
})
