import { z } from 'zod'

const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name must be at most 50 characters long')
      .regex(/^[a-zæøåA-ZÆØÅ\s]*$/, 'Name must only contain letters'),
    username: z
      .string()
      .min(2, 'Username must be at least 2 characters long')
      .max(50, 'Username must be at most 50 characters long')
      .regex(/^[a-zA-Z0-9_-]*$/, 'Username can only contain letters, numbers, underscores or dash'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterWriteSchema = z.infer<typeof RegisterSchema>

export { RegisterSchema, RegisterWriteSchema }
