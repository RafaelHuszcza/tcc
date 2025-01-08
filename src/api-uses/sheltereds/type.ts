import { z } from 'zod'

export interface GetSheltered {
  id: string
  name: string
  age: number
  sex: string
  entryDate: string
  exitDate?: string
  updatedAt: Date
  createdAt: Date
}

export interface PostSheltered {
  name: string
  age: number
  sex: string
  entryDate: string
  exitDate?: string
}
export interface PutSheltered extends PostSheltered {
  id: string
}

export const getShelteredSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  sex: z.string(),
  entryDate: z.string(),
  exitDate: z.string().optional(),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
})
