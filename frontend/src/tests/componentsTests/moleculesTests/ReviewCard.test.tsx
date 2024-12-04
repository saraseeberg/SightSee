import ReviewCard from '@/components/molecules/ReviewCard'
import { ApolloClient } from '@apollo/client'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { useDeleteReviewMutation } from '@Types/__generated__/resolvers-types'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@Types/__generated__/resolvers-types', () => ({
  useDeleteReviewMutation: vi.fn(() => [
    vi.fn(() => Promise.resolve({})), // Mocked mutation function
    { loading: false, error: undefined }, // Mocked state object
  ]),
}))

vi.mock('@/lib/context/auth-context', () => ({
  useAuth: vi.fn(() => ({
    user: { username: 'JohnDoe' },
    refetchUser: vi.fn(),
  })),
}))

vi.mock('@/hooks/use-toast', () => ({
  useToast: vi.fn(() => ({
    toast: vi.fn(),
  })),
}))

vi.mock('@/components/molecules/StarRating', () => ({
  default: vi.fn(({ rating }: { rating: number }) => <div data-testid="star-rating">{`Rating: ${rating}`}</div>),
}))
vi.mock('@/components/molecules/ConfirmDeleteDialog', () => ({
  default: ({ onConfirm }: { onConfirm: () => void }) => (
    <div>
      <button onClick={onConfirm} aria-label="Delete review">
        Trigger Delete
      </button>
    </div>
  ),
}))

describe('ReviewCard', () => {
  const mockReview = {
    id: '1',
    username: 'JohnDoe',
    title: 'Amazing Service!',
    text: 'I absolutely loved the experience. Highly recommend!',
    rating: 4.5,
    image: 'https://example.com/profile.jpg',
  }

  const mockRefetch = vi.fn()

  it('renders correctly with all props', () => {
    render(<ReviewCard {...mockReview} refetch={mockRefetch} />)

    expect(screen.getByText('JohnDoe')).toBeInTheDocument()
    expect(screen.getByText('Amazing Service!')).toBeInTheDocument()
    expect(screen.getByText('I absolutely loved the experience. Highly recommend!')).toBeInTheDocument()
    expect(screen.getByTestId('star-rating')).toHaveTextContent('Rating: 4.5')
  })

  it('renders the delete button when the logged-in user matches the review author', () => {
    render(<ReviewCard {...mockReview} refetch={mockRefetch} />)

    const avatarFallback = screen.getByText('J')
    expect(avatarFallback).toBeInTheDocument()

    const deleteButton = screen.getByRole('button', { name: 'Delete review' })
    expect(deleteButton).toBeInTheDocument()
  })

  it('renders the avatar fallback when no image is provided', () => {
    render(<ReviewCard {...mockReview} image={undefined} refetch={mockRefetch} />)
    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('renders correctly with a mix of missing and provided props', () => {
    render(<ReviewCard username="JaneDoe" text="Great product!" refetch={mockRefetch} />)

    expect(screen.getByText('JaneDoe')).toBeInTheDocument()
    expect(screen.getByText('Great product!')).toBeInTheDocument()
    expect(screen.getByTestId('star-rating')).toHaveTextContent('Rating: 0')
  })

  it('triggers the delete confirmation dialog and calls the onConfirm function', async () => {
    const mockDeleteReview = vi.fn(() => Promise.resolve({}))
    vi.mocked(useDeleteReviewMutation).mockReturnValue([
      mockDeleteReview,
      {
        loading: false,
        error: undefined,
        called: false,
        client: {} as ApolloClient<object>,
        reset: function (): void {
          throw new Error('Function not implemented.')
        },
      },
    ])

    render(<ReviewCard {...mockReview} refetch={mockRefetch} />)

    const deleteButton = screen.getByRole('button', { name: 'Delete review' })
    expect(deleteButton).toBeInTheDocument()

    fireEvent.click(deleteButton)

    expect(mockDeleteReview).toHaveBeenCalledTimes(1)
  })
})
