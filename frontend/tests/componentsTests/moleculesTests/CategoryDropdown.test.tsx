import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CategoryDropdown from '../../../src/components/molecules/CategoryDropdown'
import '@testing-library/jest-dom'

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
