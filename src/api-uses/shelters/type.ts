export enum ShelterStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TEMPORARILY_CLOSED = 'TEMPORARILY_CLOSED',
}

export interface GetShelter {
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
export interface PostShelter {
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
}
export interface PutShelter  extends PostShelter {
  id: string;
}


