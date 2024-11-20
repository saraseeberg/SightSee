import { z } from "zod"

const LoginSchema = z.object({
    username: z.string().nonempty('Username cannot be empty'),
    password: z.string().nonempty('Password cannot be empty'),
  })

type LoginWriteSchema = z.infer<typeof LoginSchema>

export { LoginSchema, LoginWriteSchema }