import ReviewCard from '@/components/molecules/ReviewCard'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/components/molecules/StarRating', () => ({
  default: vi.fn(({ rating }: { rating: number }) => <div data-testid="star-rating">{`Rating: ${rating}`}</div>),
}))

describe('ReviewCard', () => {
  const mockReview = {
    username: 'JohnDoe',
    title: 'Amazing Service!',
    text: 'I absolutely loved the experience. Highly recommend!',
    rating: 4.5,
  }

  it('renders correctly with all props', () => {
    render(<ReviewCard {...mockReview} />)

    expect(screen.getByText('JohnDoe')).toBeInTheDocument()
    expect(screen.getByText('Amazing Service!')).toBeInTheDocument()
    expect(screen.getByText('I absolutely loved the experience. Highly recommend!')).toBeInTheDocument()
    expect(screen.getByTestId('star-rating')).toHaveTextContent('Rating: 4.5')
  })

  it('renders with default values when props are missing', () => {
    render(<ReviewCard />)

    expect(screen.getByText('Anonymous')).toBeInTheDocument()
    expect(screen.getByTestId('star-rating')).toHaveTextContent('Rating: 0')
    expect(screen.queryByText(/Amazing Service!/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/I absolutely loved the experience/i)).not.toBeInTheDocument()
  })

  it('renders the avatar', () => {
    render(<ReviewCard username="JaneDoe" />)

    const avatarFallback = screen.getByText('J')
    expect(avatarFallback).toBeInTheDocument()
  })

  it('calls StarRating with the correct rating', () => {
    const rating = 3.5
    render(<ReviewCard rating={rating} />)

    expect(screen.getByTestId('star-rating')).toHaveTextContent(`Rating: ${rating}`)
  })

  it('renders correctly with a mix of missing and provided props', () => {
    render(<ReviewCard username="JaneDoe" text="Great product!" />)

    expect(screen.getByText('JaneDoe')).toBeInTheDocument()
    expect(screen.getByText('Great product!')).toBeInTheDocument()
    expect(screen.getByTestId('star-rating')).toHaveTextContent('Rating: 0')
  })
})
