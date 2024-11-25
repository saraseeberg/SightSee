import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import StarRating from '@/components/molecules/StarRating'

vi.mock('@iconify/react', () => ({
  Icon: ({ icon, className, 'data-testid': testId }: { icon: string; className: string; 'data-testid': string }) => (
    <span data-testid={testId} className={className}>
      {icon}
    </span>
  ),
}))

describe('StarRating', () => {
  it('renders the correct number of full stars', () => {
    render(<StarRating rating={3} />)

    const fullStars = screen.getAllByTestId('full-star')
    expect(fullStars.length).toBe(3)
  })

  it('renders a half star when the rating includes a fraction', () => {
    render(<StarRating rating={3.5} />)

    const halfStar = screen.getByTestId('half-star')
    expect(halfStar).toBeInTheDocument()
  })

  it('renders the correct number of empty stars', () => {
    render(<StarRating rating={3} />)

    const emptyStars = screen.getAllByTestId('empty-star')
    expect(emptyStars.length).toBe(2)
  })

  it('renders no half star when the rating is an integer', () => {
    render(<StarRating rating={4} />)

    const halfStars = screen.queryByTestId('half-star')
    expect(halfStars).not.toBeInTheDocument()
  })

  it('renders all empty stars for a rating of 0', () => {
    render(<StarRating rating={0} />)

    const emptyStars = screen.getAllByTestId('empty-star')
    expect(emptyStars.length).toBe(5)
  })
})
