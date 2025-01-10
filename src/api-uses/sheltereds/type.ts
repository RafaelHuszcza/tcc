import { z } from 'zod'

export interface GetSheltered {
  id: string
  name: string
  age: number
  sex: string
  entryDate: Date
  exitDate?: Date
  updatedAt: Date
  createdAt: Date
  shelterId: string
}

export interface PostSheltered {
  name: string
  age: number
  sex: string
  shelterId: string
  entryDate: Date
  exitDate?: Date
}
export interface PutSheltered extends PostSheltered {
  id: string
}

export const getShelteredSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  sex: z.string(),
  shelterId: z.string(),
  entryDate: z.coerce.date(),
  exitDate: z.coerce.date().optional(),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
})
