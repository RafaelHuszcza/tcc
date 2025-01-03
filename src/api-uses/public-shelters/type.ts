import { z } from "zod"
export enum ShelterStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TEMPORARILY_CLOSED = 'TEMPORARILY_CLOSED',
}
export interface Shelter {
  id: string;
  name: string;
  lat: number;
  lng: number;
  capacity: number;
  currentOccupancy: number;
  address: string;
  phone?: string | null;
  serviceHours?: string | null;
  whatsApp?: string | null;
  description?: string | null;
  status: ShelterStatus;
  createdAt: Date;
  updatedAt: Date;
  managerId: string;
}

export const shelterSchema = z.object({
  id: z.string().cuid(),  
  name: z.string().min(1),  
  lat: z.number(),  
  lng: z.number(),  
  capacity: z.number().int().default(0),  
  currentOccupancy: z.number().int().default(0),  
  address: z.string(),
  phone: z.string().nullable().optional(),  
  serviceHours: z.string().nullable().optional(), 
  whatsApp: z.string().nullable().optional(), 
  description: z.string().nullable().optional(), 
  status: z.nativeEnum(ShelterStatus),
  createdAt: z.string().transform((val) => new Date(val)), 
  updatedAt: z.string().transform((val) => new Date(val)), 
  managerId: z.string().cuid(), 
});
