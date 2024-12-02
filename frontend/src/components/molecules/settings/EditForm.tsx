import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/context/auth-context'
import { cn } from '@/lib/utils'
import { ApolloError } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateUserMutation } from '@Types/__generated__/resolvers-types'
import { UpdateUserSchema, UpdateUserWriteSchema } from '@Types/schema/updateUserSchema'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

const EditForm = () => {
  const { user, refetchUser } = useAuth()
  const [file, setFile] = useState<string>('')
  const [updateUser] = useUpdateUserMutation()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<UpdateUserWriteSchema>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user?.name,
      username: user?.username,
      password: '',
      confirmPassword: '',
    },
  })

  if (!user) {
    window.location.href = '/login'
    return null
  }

  const onSubmit = async (data: UpdateUserWriteSchema) => {
    if (Object.values(data).some((value) => value !== '' && value !== undefined)) {
      try {
        await updateUser({
          variables: {
            user: {
              id: user.id,
              name: data.name,
              username: data.username,
              password: data.password,
              image: data.image,
            },
          },
        })
        alert('User updated')
        refetchUser()
        reset()
      } catch (error) {
        if (error instanceof ApolloError) {
          const code = error.graphQLErrors[0].extensions?.code

          if (code === 'USERNAME_TAKEN') {
            setError('username', { message: error.message })
          } else {
            setError('root', { message: error.message.split(':')[1] })
          }
        }
      }
    }
  }
  return (
    <main>
      <h3 className="text-2xl font-bold">Edit Account</h3>
      <p className="text-sm opacity-50 mb-3">Make changes to your profile here. Click save when you're done.</p>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Name">
          <Input id="name" type="text" {...register('name')} error={errors.name?.message as string} />
        </FormField>
        <FormField label="Username">
          <Input id="username" type="text" {...register('username')} error={errors.username?.message as string} />
        </FormField>
        <FormField label="Password">
          <Input id="password" type="password" {...register('password')} error={errors.password?.message as string} />
        </FormField>
        <FormField label="Confirm Password">
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message as string}
          />
        </FormField>
        <FormField label="Image">
          <div className="md:flex items-center">
            {file ? (
              <div className="w-44 aspect-square rounded-full m-4 bg-content/20 overflow-hidden">
                <img src={file} alt="profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div
                className={cn('w-44 aspect-square rounded-full m-4  overflow-hidden', !user.image && 'bg-content/20')}
              >
                <img src={user.image as string} alt={'Avatar image'} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="text-center">
              <Input
                id="image"
                type="file"
                className="flex-1"
                accept="image/*"
                onChange={(e) => {
                  const Inputfile = e.target.files?.[0]
                  if (Inputfile) {
                    setFile(window.URL.createObjectURL(Inputfile))
                    setValue('image', Inputfile)
                  }
                }}
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message as string}</p>}
            </div>
          </div>
        </FormField>
        {errors.root && <p className="text-red-500 text-sm text-center">{errors.root.message as string}</p>}

        <Button type="submit" variant={'default'}>
          Save
        </Button>
      </form>
    </main>
  )
}

const FormField = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      {children}
    </div>
  )
}

export default EditForm
