import { z } from 'zod'
export const itemSchema = z.object({
  name: z.string().min(1, 'O nome não pode estar vazio'),
  description: z.string(),
})
