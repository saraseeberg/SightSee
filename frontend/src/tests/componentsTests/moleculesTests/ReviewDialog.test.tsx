import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { User } from '@Types/__generated__/resolvers-types'
import { BrowserRouter as Router } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ReviewDialog from '../../../components/molecules/ReviewDialog'

const mockRefetch = vi.fn()
const mockOnReviewSubmit = vi.fn()
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...(typeof actual === 'object' ? actual : {}),
    useNavigate: vi.fn(() => mockNavigate),
  }
})

vi.mock('../../../src/types/__generated__/resolvers-types', () => ({
  useCreateReviewMutation: vi.fn(() => [
    vi.fn(async () => ({
      data: { createReview: { id: 'review123' } },
    })),
  ]),
  useAddReviewToUserMutation: vi.fn(() => [
    vi.fn(async () => ({
      data: { addReviewToUser: { success: true } },
    })),
  ]),
}))

const destinationId = 'destination1'

const renderComponent = (userProp: User | null = null) =>
  render(
    <Router>
      <MockedProvider>
        <ReviewDialog
          user={userProp}
          destinationId={destinationId}
          refetch={mockRefetch}
          onReviewSubmit={mockOnReviewSubmit}
        />
      </MockedProvider>
    </Router>,
  )

describe('ReviewDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the "Write a Review" button', () => {
    renderComponent()
    expect(screen.getByRole('button', { name: /write a review/i })).toBeInTheDocument()
  })

  it('navigates to login if no user is logged in', () => {
    renderComponent(undefined)
    fireEvent.click(screen.getByRole('button', { name: /write a review/i }))
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('opens the dialog when the "Write a Review" button is clicked by a logged-in user', () => {
    renderComponent()

    const openButton = screen.getByRole('button', { name: /write a review/i })
    fireEvent.click(openButton)

    expect(screen.getByRole('heading', { name: /write a review/i })).toBeInTheDocument()
    expect(screen.getByText(/share your experience by rating and leaving a review below/i)).toBeInTheDocument()
  })

  it('displays validation errors if the form is submitted without required fields', async () => {
    renderComponent()

    fireEvent.click(screen.getByRole('button', { name: /write a review/i }))
    fireEvent.click(screen.getByRole('button', { name: /submit review/i }))

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument()
    expect(await screen.findByText(/description must be at least 10 characters/i)).toBeInTheDocument()
  })
})
