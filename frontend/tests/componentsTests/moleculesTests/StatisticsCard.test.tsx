import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import StatisticsCard from '../../../src/components/molecules/StatisticsCard'
import '@testing-library/jest-dom'

vi.mock('../../../src/components/ui/number-ticker', () => ({
  default: ({ value }: { value: number }) => <span>{value}</span>,
}))

describe('StatisticsCard', () => {
  it('renders the title and description', () => {
    render(<StatisticsCard title="Test Title" description="Test Description" />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renders the number when provided', () => {
    render(<StatisticsCard title="Test Title" number={42} />)

    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders "0" when the number is 0', () => {
    render(<StatisticsCard title="Test Title" number={0} />)

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('renders children when number is not provided', () => {
    render(
      <StatisticsCard title="Test Title">
        <div>Child Content</div>
      </StatisticsCard>,
    )

    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })
})
