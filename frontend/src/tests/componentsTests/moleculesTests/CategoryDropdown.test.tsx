import CategoryDropdown from '@/components/molecules/CategoryDropdown'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

describe('CategoryDropdown', () => {
  const mockOnSelectCategories = vi.fn()

  const renderComponent = () =>
    render(
      <CategoryDropdown
        onSelectCategories={mockOnSelectCategories}
        selectedCategories={[]}
        availableCategories={new Set(['Activities', 'Entertainment', 'Nightlife', 'Restaurants', 'Shopping', 'Sights'])}
      />,
    )

  it('renders with default label', () => {
    renderComponent()

    expect(screen.getByText('Select categories')).toBeInTheDocument()
  })
})
