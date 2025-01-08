import { z } from 'zod'

export enum NeedStatus {
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
}

export interface GetNeed {
  id: string
  description: string
  quantity: number
  itemId: string
  status: NeedStatus
  item: {
    name: string
    description: string
  }
  createdAt: Date
  updatedAt: Date
  shelterId: string
}
export interface GetNeedWithItemAndShelter {
  id: string
  description: string
  quantity: number
  itemId: string
  status: NeedStatus
  createdAt: Date
  updatedAt: Date
  shelterId: string
  item: {
    id: string
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
  }
  shelter: {
    name: string
  }
}

export interface PostNeed {
  description: string
  quantity: number
  itemId: string
  status: NeedStatus
  shelterId: string
}
export interface PutNeed extends PostNeed {
  id: string
}

export const getNeedsSchema = z.object({
  id: z.string(),
  description: z.string(),
  status: z.nativeEnum(NeedStatus),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
  quantity: z.number(),
  item: z.object({
    name: z.string(),
    description: z.string(),
  }),
  shelterId: z.string(),
  itemId: z.string(),
})
