import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/lib/context/auth-context'
import { RegisterSchema, RegisterWriteSchema } from '@Types/schema/registerUserSchema'

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
    const { error } = await registerUser(data.name, data.username, data.password)
    if (error) {
      setError('root', { message: error })
    } else navigate('/')
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
