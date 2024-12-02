import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/context/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react/dist/iconify.js'
import { RegisterSchema, RegisterWriteSchema } from '@Types/schema/registerUserSchema'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const { registerUser } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterWriteSchema>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit = async (data: RegisterWriteSchema) => {
    try {
      await registerUser(data.name, data.username, data.password)
      navigate('/')
    } catch (error) {
      console.error(error)
      setError('root', { message: 'Noe gikk galt' })
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <Link to={'/'} className="w-full flex justify-end">
          <Icon icon={'ic:baseline-close'} />
        </Link>
        <CardTitle className="text-2xl font-bold">Register</CardTitle>
        <CardDescription>Create your account by filling in the details below</CardDescription>
      </CardHeader>
      <CardContent>
        <section className="space-y-4">
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" error={errors.name?.message} {...register('name', { required: true })} />

            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
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

            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', { required: true })}
            />
            {errors.root && <p className="text-red-500 w-full text-center">{errors.root.message}</p>}
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
          <div className="text-center mt-4">
            <CardDescription>Already have an account?</CardDescription>
            <Link to="/Login">
              <Button variant="link" className="mt-2">
                Login
              </Button>
            </Link>
          </div>
        </section>
      </CardContent>
    </Card>
  )
}

export default Register
