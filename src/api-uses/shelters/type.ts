import { z } from 'zod'

export enum ShelterStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TEMPORARILY_CLOSED = 'TEMPORARILY_CLOSED',
}

export interface GetShelter {
  id: string
  name: string
  lat: number
  lng: number
  capacity: number
  currentOccupancy: number
  address: string
  phone?: string | null
  serviceHours?: string | null
  whatsApp?: string | null
  description?: string | null
  status: ShelterStatus
  createdAt: Date
  updatedAt: Date
  managerId: string
}
export interface PostShelter {
  name: string
  lat: number
  lng: number
  capacity: number
  currentOccupancy: number
  address: string
  phone?: string | null
  serviceHours?: string | null
  whatsApp?: string | null
  description?: string | null
  status: ShelterStatus
}
export interface PutShelter extends PostShelter {
  id: string
}

export const getShelterSchema = z.object({
  id: z.string(),
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  address: z.string(),
  serviceHours: z.string().optional(),
  whatsApp: z.string().optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(ShelterStatus),
  capacity: z.number(),
  currentOccupancy: z.number(),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
})
