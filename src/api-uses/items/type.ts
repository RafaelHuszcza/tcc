// import { z } from 'zod'

export interface GetItem {
  id: string
  description: string
  name: number
  createdAt: Date
  updatedAt: Date
}

// export const getNeedsSchema = z.object({
//   id: z.string(),
//   description: z.string(),
//   status: z.nativeEnum(NeedStatus),
//   createdAt: z.string().transform((val) => new Date(val)),
//   updatedAt: z.string().transform((val) => new Date(val)),
//   quantity: z.number(),
//   item: z.object({
//     name: z.string(),
//     description: z.string(),
//   }),
//   shelterId: z.string(),
//   itemId: z.string(),
// })
