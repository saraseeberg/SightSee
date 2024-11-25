import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import CategoryDropdown from '../../../components/molecules/CategoryDropdown'

describe('CategoryDropdown', () => {
  const mockOnSelectCategory = vi.fn()

  const renderComponent = () => render(<CategoryDropdown onSelectCategory={mockOnSelectCategory} />)

  it('renders with the default selected category', () => {
    renderComponent()

    const triggerButton = screen.getByRole('button', { name: /all/i })
    expect(triggerButton).toBeInTheDocument()
  })

  it('does not call onSelectCategory when selecting the already selected category', () => {
    renderComponent()

    const triggerButton = screen.getByRole('button', { name: /all/i })
    fireEvent.click(triggerButton)

    const allItem = screen.getByText('All')
    fireEvent.click(allItem)

    expect(mockOnSelectCategory).toHaveBeenCalledTimes(0)
  })
})
