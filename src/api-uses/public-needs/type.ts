import { z } from 'zod'

import { NeedStatus } from '../needs/type'

export interface PublicNeed {
  id: string
  description: string
  status: NeedStatus
  createdAt: Date
  updatedAt: Date
  itemId: string
  quantity: number
  shelterId: string
  item: {
    name: string
    description: string
  }
  shelter: {
    name: string
  }
}
export interface PublicNeedWithItemAndShelter {
  id: string
  description: string
  status: NeedStatus
  createdAt: Date
  updatedAt: Date
  itemId: string
  quantity: number
  shelterId: string
  item: {
    name: string
    description: string
  }
  shelter: {
    name: string
    description: string
    address: string
    phone: string
    serviceHours: string
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
    description: z.string(),
  }),
  shelter: z.object({
    name: z.string(),
  }),
})
