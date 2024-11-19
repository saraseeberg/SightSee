import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, vi, beforeEach, expect } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing'
import ReviewDialog from '../../../src/components/molecules/ReviewDialog'

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

const renderComponent = (userProp?: { id: string; username: string } | null) =>
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
