import { z } from "zod"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

const EditUserSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name can be at most 50 characters')
      .regex(/^[a-zæøåA-ZÆØÅ\s]*$/, 'Name can only contain letters and spaces')
      .or(z.literal(''))
      .optional(),
    username: z
      .string()
      .min(2, 'Username must be at least 2 characters long')
      .max(50, 'Username must be at most 50 characters long')
      .regex(/^[a-zA-Z0-9_-]*$/, 'Username can only contain letters, numbers, underscores or dash')
      .or(z.literal(''))
      .optional(),
    password: z.string().min(6, 'Password has to be at least 6 characters').or(z.literal('')).optional(),
    confirmPassword: z.string().or(z.literal('')).optional(),
    image: z
      .instanceof(File)
      .refine((data) => data.size <= MAX_FILE_SIZE, {
        message: 'File cannot exceed ' + MAX_FILE_SIZE / (1024 * 1024) + 'MB',
      })
      .refine((data) => SUPPORTED_FORMATS.includes(data.type), {
        message: 'Unsupported file format',
      })
      .or(z.literal(null))
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type EditUserWriteSchema = z.infer<typeof EditUserSchema>

export { EditUserSchema, EditUserWriteSchema }