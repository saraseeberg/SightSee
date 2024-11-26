import CardDetailsDialog from '@/components/molecules/CardDetailsDialog'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Destination } from '@Types/__generated__/resolvers-types'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

const mockDestination: Partial<Destination> = {
  id: '1',
  title: 'Beautiful Beach',
  region: 'Caribbean',
  country: 'Bahamas',
  image: 'https://example.com/beach.jpg',
  rating: 4.5,
  description: 'A serene beach with crystal clear waters.',
}

describe('CardDetailsDialog', () => {
  const renderComponent = (props: {
    selectedCard: Partial<Destination> | null
    openDialog: boolean
    setOpenDialog: (open: boolean) => void
  }) =>
    render(
      <BrowserRouter>
        <CardDetailsDialog 
          {...props} 
          favorites={[]} 
          onToggleFavorite={vi.fn()} 
        />
      </BrowserRouter>,
    )

  it('renders dialog with selected card details when open', () => {
    const setOpenDialog = vi.fn()
    renderComponent({ selectedCard: mockDestination, openDialog: true, setOpenDialog })

    expect(screen.getByText('Beautiful Beach')).toBeInTheDocument()
    expect(screen.getByText('Caribbean, Bahamas')).toBeInTheDocument()
    expect(screen.getByText('A serene beach with crystal clear waters.')).toBeInTheDocument()

    const image = screen.getByRole('img', { name: /beautiful beach/i })
    expect(image).toHaveAttribute('src', mockDestination.image)

    const discoverButton = screen.getByRole('link', { name: /discover more here!/i })
    expect(discoverButton).toHaveAttribute('href', '/destination/1')
  })

  it('does not render anything when selectedCard is null', () => {
    const setOpenDialog = vi.fn()
    const { container } = renderComponent({ selectedCard: null, openDialog: true, setOpenDialog })

    expect(container).toBeEmptyDOMElement()
  })

  it('calls setOpenDialog when the dialog is closed', () => {
    const setOpenDialog = vi.fn()
    renderComponent({ selectedCard: mockDestination, openDialog: true, setOpenDialog })

    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)

    expect(setOpenDialog).toHaveBeenCalledWith(false)
  })

  it('does not render dialog when openDialog is false', () => {
    const setOpenDialog = vi.fn()
    const { queryByRole } = renderComponent({ selectedCard: mockDestination, openDialog: false, setOpenDialog })

    expect(queryByRole('dialog')).not.toBeInTheDocument()
  })
})
