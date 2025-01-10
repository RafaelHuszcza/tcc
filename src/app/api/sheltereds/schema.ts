import { z } from 'zod'

export const shelteredSchema = z.object({
  name: z.string({ required_error: 'Nome é necessário' }).min(3, {
    message: 'Mínimo 3 caracteres',
  }),
  age: z.number({ required_error: 'Idade é necessária' }).min(0, {
    message: 'Idade não pode ser menor que 0',
  }),
  sex: z.string({ required_error: 'Sexo é necessário' }),
  entryDate: z.coerce.date({ required_error: 'Data de entrada é necessária' }),
  exitDate: z.coerce.date().optional(),
  shelterId: z.string({ required_error: 'Id do Abrigo é necessário' }),
})
