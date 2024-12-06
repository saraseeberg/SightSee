import { FetchResult } from '@apollo/client'
import { useCreateUserMutation, useGetMeQuery, useLoginMutation, User } from '@Types/__generated__/resolvers-types'
import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  user: User | null
  refetchUser: () => void
  registerUser: (name: string, username: string, password: string) => Promise<string>
  loginUser: (username: string, password: string) => Promise<FetchResult>
  logout: () => void
}

type Props = { children: React.ReactNode }

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthProvider = ({ children }: Props) => {
  const [createUser] = useCreateUserMutation()
  const [login] = useLoginMutation()
  const { data, loading, refetch } = useGetMeQuery({})
  const [user, setUser] = useState<User | null>(null)
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    if (!loading) {
      if (data?.me) {
        setUser({
          ...data.me,
          password: 'Non ya buisness',
        })
      }
      setIsReady(true)
    }
  }, [data?.me, loading])

  const registerUser = async (name: string, username: string, password: string): Promise<string> => {
    const res = await createUser({
      variables: {
        name,
        username,
        password,
      },
    })
    setUser(res.data?.createUser as User)
    return 'User created'
  }

  const loginUser = async (username: string, password: string) => {
    const res = await login({
      variables: {
        username,
        password,
      },
    })

    setUser(res.data?.login as User)
    return res
  }

  const logout = async () => {
    try {
      localStorage.removeItem('token')
      setUser(null)
    } catch (error) {
      console.error(error)
    }
  }

  const refetchUser = () => {
    console.log('Refetching user')
    refetch()
  }

  return (
    <AuthContext.Provider value={{ user, refetchUser, registerUser, loginUser, logout }}>
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
// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth } //we need to export the AuthProvider and useAuth together
