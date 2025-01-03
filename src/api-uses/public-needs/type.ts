import { z } from 'zod'

enum NeedStatus {
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
}
export interface PublicNeed {
  id: string
  description: string
  status: NeedStatus
  createdAt: Date
  updatedAt: Date
  itemId: string
  shelterId: string
  item: {
    name: string
  }
  shelter: {
    name: string
  }
}

export const publicNeedSchema = z.object({
  id: z.string(),
  description: z.string(),
  status: z.nativeEnum(NeedStatus),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
  itemId: z.string(),
  shelterId: z.string(),
  item: z.object({
    name: z.string(),
  }),
  shelter: z.object({
    name: z.string(),
  }),
})
