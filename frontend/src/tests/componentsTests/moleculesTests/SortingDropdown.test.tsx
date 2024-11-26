import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import SortingDropdown from '@/components/molecules/SortingDropdown'

describe('SortingDropdown', () => {
  const mockOnSelectedSorting = vi.fn()

  it('renders the default sorting option', () => {
    render(<SortingDropdown onSelectedSorting={mockOnSelectedSorting} />)

    expect(screen.getByRole('button', { name: /best rated/i })).toBeInTheDocument()
  })
})
