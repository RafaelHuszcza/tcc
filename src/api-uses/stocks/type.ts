import { z } from 'zod'

export interface GetStock {
  id: string
  quantity: number
  itemId: string
  expirationDate?: Date
  createdAt: Date
  updatedAt: Date
  shelterId: string
  item: {
    name: string
    description: string
  }
}

export interface PostStock {
  expirationDate?: Date
  quantity: number
  itemId: string
  shelterId: string
}

export interface PutStock extends PostStock {
  id: string
}

export const getStocksSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  item: z.object({ name: z.string(), description: z.string() }),
  shelterId: z.string(),
  expirationDate: z.coerce.date().optional(),
  itemId: z.string(),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
})
