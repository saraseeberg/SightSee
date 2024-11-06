import { useCreateUserMutation, useLoginMutation, User } from '@types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type AuthContextType = {
  user: User | null
  token: string | null
  registerUser: (name: string, username: string, password: string) => Promise<{ error?: string }>
  loginUser: (username: string, password: string) => Promise<{ error?: string }>
  logout: () => void
  isLoggedIn: () => boolean
}

type Props = { children: React.ReactNode }

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate()
  const [createUser] = useCreateUserMutation()
  const [login] = useLoginMutation()
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (user && token) {
      setUser(JSON.parse(user))
      setToken(token)
    }
    setIsReady(true)
  }, [])

  const registerUser = async (name: string, username: string, password: string): Promise<{ error?: string }> => {
    try {
      const res = await createUser({
        variables: {
          name,
          username,
          password,
        },
      })
      if (res.errors) {
        return { error: res.errors[0].message }
      }
      const user = res.data?.createUser.user as User
      const token = res.data?.createUser.token as string

      setUser(user)
      setToken(token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      navigate('/')
      return {}
    } catch (error) {
      return { error: error as string }
    }
  }

  const loginUser = async (username: string, password: string): Promise<{ error?: string }> => {
    try {
      const res = await login({
        variables: {
          username,
          password,
        },
      })
      if (res.errors) {
        return { error: res.errors[0].message }
      }

      const user = res.data?.login.user as User
      const token = res.data?.login.token as string

      setUser(user)
      setToken(token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      navigate('/')
      return {}
    } catch (error: unknown) {
      return { error: error as string }
    }
  }

  const isLoggedIn = () => {
    return !!user
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, token, registerUser, loginUser, logout, isLoggedIn }}>
      {isReady && children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
