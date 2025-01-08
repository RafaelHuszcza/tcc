import { z } from 'zod'

export const shelteredSchema = z.object({
  name: z.string({ required_error: 'Nome é necessário' }),
  age: z.number({ required_error: 'Idade é necessária' }),
  sex: z.string({ required_error: 'Sexo é necessário' }),
  entryDate: z.string({ required_error: 'Data de entrada é necessária' }),
  exitDate: z.string().optional(),
  shelterId: z.string({ required_error: 'Id do Abrigo é necessário' }),
})
