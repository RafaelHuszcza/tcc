import { z } from 'zod'

export const stockSchema = z.object({
  itemId: z.string({ required_error: 'Id do Item é necessário' }),
  shelterId: z.string({ required_error: 'Id do Abrigo é necessário' }),
  quantity: z.number({ required_error: 'Quantidade é necessária' }),
  expirationDate: z.coerce
    .date()
    .optional()
    .refine(
      (date) => {
        if (!date) return true

        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)

        return date > currentDate
      },
      {
        message: 'A data de validade deve ser maior que a data atual',
      },
    ),
})
