import { ShelterStatus } from "@/api-uses/shelters/type";
import { z } from "zod";

export const shelterSchema = z.object({
  id: z.string(),
  name: z.string({ required_error: 'Nome é necessário' }).min(1, { message: 'Nome é necessário' }),
  lat: z.number({ required_error: 'Latitude é necessária' }),
  lng: z.number({ required_error: 'Longitude é necessária' }),
  address: z.string({ required_error: 'Endereço é necessário' }),
  serviceHours: z.string({ required_error: 'Horário de funcionamento é necessário' }).optional(),
  whatsApp: z.string({ required_error: 'WhatsApp é necessário' }).optional(),
  phone: z.string({ required_error: 'Telefone é necessário' }).optional(),
  description: z.string({ message: 'Descrição é necessário' }).optional(),
  status : z.nativeEnum(ShelterStatus),
  capacity: z.number({ required_error: 'Capacidade é necessário' }),
  currentOccupancy: z.number({ required_error: 'Ocupação é necessário' }),
}).refine(data => data.capacity >= data.currentOccupancy, {
  path: ['capacity'],
  message: 'A capacidade deve ser maior ou igual a ocupação',
})
