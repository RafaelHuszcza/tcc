import { z } from 'zod'

import { NeedStatus } from '@/api-uses/needs/type'

export const needSchema = z.object({
  itemId: z.string({ required_error: 'Id do Item é necessário' }),
  shelterId: z.string({ required_error: 'Id do Abrigo é necessário' }),
  quantity: z.number({ required_error: 'Quantidade é necessária' }),
  description: z.string({ message: 'Descrição é necessário' }),
  status: z.nativeEnum(NeedStatus),
})
