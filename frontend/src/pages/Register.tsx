import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Link } from 'react-router-dom'

function Register() {
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
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
          <div className="text-center mt-4">
            <CardDescription>Already have an account?</CardDescription>
            <Link to="/Login">
              <Button variant="link" className="mt-2">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Register
