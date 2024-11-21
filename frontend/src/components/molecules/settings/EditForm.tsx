import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UpdateUserSchema, UpdateUserWriteSchema } from '@Types/schema/updateUserSchema'
import { useUpdateUserMutation } from '@Types/__generated__/resolvers-types'
import { useAuth } from '@/lib/context/auth-context'

const EditForm = () => {
  const { user } = useAuth()
  const [file, setFile] = useState<string>('')
  const [updateUser] = useUpdateUserMutation()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateUserWriteSchema>({
    resolver: zodResolver(UpdateUserSchema),
  })

  if (!user) {
    window.location.href = '/login'
    return null
  }

  const onSubmit = async (data: UpdateUserWriteSchema) => {
    if (Object.values(data).some((value) => value !== '' && value !== undefined)) {
      const imagebase64 = data.image && (await fileToBase64(data.image))
      const imgPayload = JSON.stringify({ image: imagebase64, filename: data.image?.name, filetype: data.image?.type })

      const res = await updateUser({
        variables: {
          user: {
            id: user.id,
            name: data.name,
            username: data.username,
            password: data.password,
            image: imgPayload,
          },
        },
        context: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      })
      if (res.errors) {
        console.log(res.errors)
      } else {
        console.log('User updated')
        reset()
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
              <img src={file} alt="profile" className=" w-44 aspect-square rounded-full m-4 border-2" />
            ) : (
              <div className="w-44 aspect-square rounded-full m-4 bg-content/20"></div>
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

// Turn the file into base64 so we can send it as json to the server
const fileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

export default EditForm
