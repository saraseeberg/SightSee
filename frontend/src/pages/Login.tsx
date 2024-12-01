import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/context/auth-context'
import { ApolloError } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react/dist/iconify.js'
import { LoginSchema, LoginWriteSchema } from '@Types/schema/loginSchema'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const { loginUser } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginWriteSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: 'PrettyPony',
      password: 'byn8rwx*qre5NTH-fck',
    },
  })

  const onSubmit = async (data: LoginWriteSchema) => {
    try {
      const res = await loginUser(data.username, data.password)
      console.log(res)
      navigate('/')
    } catch (error) {
      if (error instanceof ApolloError) {
        console.error(error)
        const code = error.graphQLErrors[0].extensions?.code
        if (code === 'USERNAME_TAKEN') {
          setError('root', { message: error.message })
        } else {
          setError('root', { message: 'Something went wrong, please try again' })
        }
      }
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <Link to={'/'} className="w-full flex justify-end">
          <Icon icon={'ic:baseline-close'} />
        </Link>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your username and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="username"
              error={errors.username?.message}
              {...register('username', { required: true })}
            />

            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              error={errors.password?.message}
              {...register('password', { required: true })}
            />
            {errors.root && <p className="text-red-500 w-full text-center text-sm">{errors.root.message}</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="text-center">
            <CardDescription>Don't have an account?</CardDescription>
            <Link to="/Register">
              <Button variant="link" className="mt-2">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Login
