import AvatarDropDownMenu from '@/components/molecules/AvatarDropDownMenu'
import { useAuth } from '@/lib/context/auth-context'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it, Mock, vi } from 'vitest'

vi.mock('@/lib/context/auth-context', () => ({
  useAuth: vi.fn(),
}))

const fakeUser = {
  username: 'LotteTotten27',
  name: 'Lotte',
}

const renderComponent = (authState: { isLoggedIn: boolean; user?: { username: string } }) => {
  const mockLogout = vi.fn()

  ;(useAuth as Mock).mockReturnValue({
    ...authState,
    logout: mockLogout,
  })

  return {
    ...render(
      <BrowserRouter>
        <AvatarDropDownMenu />
      </BrowserRouter>,
    ),
    mockLogout,
  }
}

describe('AvatarDropDownMenu', () => {
  it('renders login button when user is not logged in', () => {
    renderComponent({ isLoggedIn: false })

    const loginButton = screen.getByRole('link', { name: /logg inn/i })
    expect(loginButton).toBeInTheDocument()
    expect(loginButton).toHaveAttribute('href', '/login')
  })

  it('renders avatar when user is logged in', () => {
    renderComponent({ isLoggedIn: true, user: fakeUser })

    const avatarFallback = screen.getByText('Lo')
    expect(avatarFallback).toBeInTheDocument()
    expect(screen.getByText('Lotte')).toBeInTheDocument()
    expect(screen.getByText('LotteTotten27')).toBeInTheDocument()
  })
})
